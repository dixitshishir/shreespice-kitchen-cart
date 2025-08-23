import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PaymentVerificationRequest {
  orderId: string;
  transactionId: string;
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
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { orderId, transactionId, amount, customerName, customerPhone }: PaymentVerificationRequest = await req.json();

    console.log("Payment verification request:", { orderId, transactionId, amount, customerName, customerPhone });

    // Create payment record
    const { data: payment, error: paymentError } = await supabase
      .from("payments")
      .insert({
        order_id: orderId,
        transaction_id: transactionId,
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

    // Send WhatsApp notification to admin
    const adminPhone = "9986918992";
    const message = `🔔 New Payment Verification Required!\n\n📦 Order ID: ${orderId}\n💳 Transaction ID: ${transactionId}\n💰 Amount: ₹${amount}\n👤 Customer: ${customerName}\n📱 Phone: ${customerPhone}\n\nPlease verify this payment in the admin dashboard.`;
    
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