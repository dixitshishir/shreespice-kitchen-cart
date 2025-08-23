import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { crypto } from "https://deno.land/std@0.190.0/crypto/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-razorpay-signature",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const razorpaySecret = Deno.env.get("RAZORPAY_KEY_SECRET");
    if (!razorpaySecret) {
      throw new Error("RAZORPAY_KEY_SECRET not configured");
    }

    // Get the raw body and signature
    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      throw new Error("Missing Razorpay signature");
    }

    // Verify the webhook signature
    const expectedSignature = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(body + razorpaySecret)
    );
    
    const expectedHex = Array.from(new Uint8Array(expectedSignature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    if (signature !== expectedHex) {
      console.error("Invalid webhook signature");
      return new Response("Invalid signature", { status: 400 });
    }

    const event = JSON.parse(body);
    console.log("Razorpay webhook event:", event);

    // Handle payment success
    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;
      const orderId = payment.notes?.order_id;

      if (orderId) {
        // Update payment status in database
        const { error: paymentError } = await supabase
          .from("payments")
          .update({ 
            status: "completed",
            verification_notes: `Razorpay Payment ID: ${payment.id}`
          })
          .eq("order_id", orderId);

        if (paymentError) {
          console.error("Error updating payment:", paymentError);
        }

        // Update order status
        const { error: orderError } = await supabase
          .from("orders")
          .update({ status: "confirmed" })
          .eq("id", orderId);

        if (orderError) {
          console.error("Error updating order:", orderError);
        }

        console.log(`Payment confirmed for order ${orderId}`);
      }
    }

    return new Response("OK", { 
      headers: corsHeaders,
      status: 200 
    });

  } catch (error) {
    console.error("Error in razorpay-webhook function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
};

serve(handler);