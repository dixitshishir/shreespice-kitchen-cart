import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CreateOrderRequest {
  orderId: string;
  amount: number;
  customerName: string;
  customerPhone: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { orderId, amount, customerName, customerPhone }: CreateOrderRequest = await req.json();

    const razorpayKeyId = Deno.env.get("RAZORPAY_KEY_ID");
    const razorpayKeySecret = Deno.env.get("RAZORPAY_KEY_SECRET");

    if (!razorpayKeyId || !razorpayKeySecret) {
      throw new Error("Razorpay credentials not configured");
    }

    // Create Razorpay order
    const razorpayOrder = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: orderId,
      notes: {
        order_id: orderId,
        customer_name: customerName,
        customer_phone: customerPhone
      }
    };

    const authHeader = btoa(`${razorpayKeyId}:${razorpayKeySecret}`);

    const razorpayResponse = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${authHeader}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(razorpayOrder),
    });

    if (!razorpayResponse.ok) {
      const errorText = await razorpayResponse.text();
      console.error("Razorpay API error:", errorText);
      throw new Error(`Razorpay API error: ${razorpayResponse.status}`);
    }

    const razorpayOrderData = await razorpayResponse.json();

    // Create payment record
    const { data: payment, error: paymentError } = await supabase
      .from("payments")
      .insert({
        order_id: orderId,
        amount: amount,
        user_name: customerName,
        user_phone: customerPhone,
        status: "pending",
        verification_notes: `Razorpay Order ID: ${razorpayOrderData.id}`
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

    return new Response(JSON.stringify({ 
      success: true,
      razorpayOrder: razorpayOrderData,
      paymentId: payment.id
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Error in create-razorpay-order function:", error);
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