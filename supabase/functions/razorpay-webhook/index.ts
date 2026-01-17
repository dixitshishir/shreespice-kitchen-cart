import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-razorpay-signature",
};

// Helper function to compute HMAC-SHA256
async function computeHmacSha256(secret: string, message: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const messageData = encoder.encode(message);

  // Import the secret as a CryptoKey
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  // Sign the message with HMAC-SHA256
  const signature = await crypto.subtle.sign("HMAC", cryptoKey, messageData);

  // Convert to hex string
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
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

    const razorpaySecret = Deno.env.get("RAZORPAY_KEY_SECRET");
    if (!razorpaySecret) {
      console.error("RAZORPAY_KEY_SECRET not configured");
      throw new Error("RAZORPAY_KEY_SECRET not configured");
    }

    // Get the raw body and signature
    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      console.error("Missing Razorpay signature header");
      return new Response("Missing signature", { status: 401 });
    }

    // Verify the webhook signature using proper HMAC-SHA256
    const expectedSignature = await computeHmacSha256(razorpaySecret, body);

    if (signature !== expectedSignature) {
      console.error("Invalid webhook signature", {
        received: signature.substring(0, 10) + "...",
        expected: expectedSignature.substring(0, 10) + "..."
      });
      return new Response("Invalid signature", { status: 401 });
    }

    const event = JSON.parse(body);
    console.log("Razorpay webhook event received:", { 
      eventType: event.event,
      eventId: event.id 
    });

    // Handle payment success
    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;
      const orderId = payment.notes?.order_id;

      if (orderId) {
        // Verify order exists and isn't already confirmed (idempotency check)
        const { data: existingOrder, error: orderCheckError } = await supabase
          .from("orders")
          .select("id, status")
          .eq("id", orderId)
          .single();

        if (orderCheckError || !existingOrder) {
          console.error("Order not found:", orderId);
          return new Response("Order not found", { status: 404 });
        }

        if (existingOrder.status === "confirmed") {
          console.log("Order already confirmed, skipping:", orderId);
          return new Response("Already processed", { status: 200 });
        }

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

        console.log(`Payment confirmed for order ${orderId}, Razorpay Payment ID: ${payment.id}`);
      } else {
        console.warn("Payment captured but no order_id in notes:", payment.id);
      }
    }

    return new Response("OK", { 
      headers: corsHeaders,
      status: 200 
    });

  } catch (error) {
    console.error("Error in razorpay-webhook function:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
};

serve(handler);
