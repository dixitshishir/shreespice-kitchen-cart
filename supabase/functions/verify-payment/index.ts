import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PaymentVerificationRequest {
  orderId: string;
  amount: number;
  customerName: string;
  customerPhone: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authentication
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Unauthorized", success: false }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 401,
        }
      );
    }

    // Create authenticated client to verify the user
    const supabaseAuth = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: { headers: { Authorization: authHeader } },
      }
    );

    const {
      data: { user },
      error: authError,
    } = await supabaseAuth.auth.getUser();

    if (authError || !user) {
      console.error("Authentication error:", authError);
      return new Response(
        JSON.stringify({ error: "Invalid token", success: false }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 401,
        }
      );
    }

    console.log("Authenticated user:", user.id);

    // Use service role for database operations
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { orderId, amount, customerName, customerPhone }: PaymentVerificationRequest = await req.json();

    console.log("Payment verification request:", { orderId, amount, customerName, customerPhone, userId: user.id });

    // Validate order exists and belongs to the authenticated user
    const { data: order, error: orderCheckError } = await supabase
      .from("orders")
      .select("id, total, payment_id, user_id")
      .eq("id", orderId)
      .maybeSingle();

    if (orderCheckError) {
      console.error("Order check error:", orderCheckError);
      return new Response(
        JSON.stringify({ error: "Failed to verify order", success: false }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    if (!order) {
      return new Response(
        JSON.stringify({ error: "Order not found", success: false }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 404,
        }
      );
    }

    // Verify the order belongs to this user
    if (order.user_id !== user.id) {
      console.error("User attempting to verify payment for another user's order");
      return new Response(
        JSON.stringify({ error: "Unauthorized - order does not belong to you", success: false }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 403,
        }
      );
    }

    // Check if payment already exists
    if (order.payment_id) {
      return new Response(
        JSON.stringify({ error: "Payment already exists for this order", success: false }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Validate amount matches order total
    if (Number(order.total) !== Number(amount)) {
      console.error("Amount mismatch:", { orderTotal: order.total, requestedAmount: amount });
      return new Response(
        JSON.stringify({ error: "Amount does not match order total", success: false }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Create payment record
    const { data: payment, error: paymentError } = await supabase
      .from("payments")
      .insert({
        order_id: orderId,
        amount: amount,
        user_name: customerName,
        user_phone: customerPhone,
        status: "pending"
      })
      .select()
      .single();

    if (paymentError) {
      console.error("Payment creation error:", paymentError);
      throw paymentError;
    }

    // Update order with payment_id
    const { error: orderUpdateError } = await supabase
      .from("orders")
      .update({ payment_id: payment.id })
      .eq("id", orderId);

    if (orderUpdateError) {
      console.error("Order update error:", orderUpdateError);
      throw orderUpdateError;
    }

    // Get order details for logging
    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .select(`
        *,
        order_items(*)
      `)
      .eq("id", orderId)
      .single();

    if (orderError) {
      console.error("Error fetching order details:", orderError);
    }

    // Send WhatsApp notification to admin
    const adminPhone = "9986918992";
    const message = `🔔 New Payment Verification Required!\n\n📦 Order ID: ${orderId}\n💰 Amount: ₹${amount}\n👤 Customer: ${customerName}\n📱 Phone: ${customerPhone}\n\nPlease verify this payment in the admin dashboard.`;
    
    const waUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
    
    console.log("WhatsApp notification URL generated:", waUrl);

    // Return success response with WhatsApp URL
    return new Response(JSON.stringify({ 
      success: true, 
      paymentId: payment.id,
      whatsappUrl: waUrl,
      message: "Payment verification request submitted successfully" 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Error in verify-payment function:", error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
};

serve(handler);
