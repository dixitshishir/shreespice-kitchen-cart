import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Complete product catalog for context
const productCatalog = `
## Shree Spices and Snacks - Complete Product Catalog

### New Items
1. Homemade Protein Bar (₹150/500g) - Nutritious homemade protein bar with nuts, dates, and oats. Perfect post-workout snack made with natural ingredients.
2. Homemade Protein Powder (₹350/500g) - Natural protein powder made from roasted almonds, dates, and seeds. Chemical-free and made fresh daily.

### Powders (Spice Mixes)
1. Bisibelebath Powder (₹150/500g) - Traditional Karnataka style bisibelebath powder blend. Made with authentic spices for perfect flavor. Used to make the famous South Indian rice dish Bisibelebath.
2. Vangibath Powder (₹140/500g) - Aromatic powder for delicious brinjal rice. Traditional recipe with perfect spice balance.
3. Hulipudi Powder (₹130/500g) - Tangy and spicy powder perfect for mixing with rice. Traditional South Indian flavor.
4. Rasam Powder (₹120/500g) - Authentic rasam powder blend for perfect South Indian rasam soup.
5. Kootu Powder (₹110/500g) - Traditional powder for delicious vegetable kootu curry.

### Sweets (Traditional South Indian Sweets)
1. Antina Unde (₹200/500g) - Traditional sesame seed laddus made with pure ghee. Rich in flavor and nutrition.
2. Kai Kadubu (₹180/500g) - Steamed rice dumplings with jaggery filling. Made with pure ghee.
3. Hoorna Kadubu (₹190/500g) - Sweet steamed rice dumplings with coconut and jaggery.
4. Mysore Pak (₹250/500g) - Famous Mysore pak made with pure ghee and gram flour. Melts in your mouth.
5. Besan Ladoo (₹220/500g) - Classic besan laddus made with pure ghee and roasted gram flour.
6. Shenga Ladoo (₹240/500g) - Nutritious peanut laddus made with jaggery and pure ghee.
7. Tambittu (₹200/500g) - Traditional festival sweet made with rice flour and jaggery.

### Ready to Eat
1. Menthe Hittu (₹160/500g) - Ready to eat fenugreek powder mix. Just add hot rice and ghee.
2. Puliyogre Gojju (₹140/500g) - Tangy tamarind rice paste for instant puliyogre.
3. Shenga Chutney Pudi (₹120/500g) - Roasted peanut chutney powder. Mix with oil for instant chutney.
4. Hurgadle Chutney Pudi (₹110/500g) - Roasted horse gram chutney powder.
5. Dal Chutney Pudi (₹100/500g) - Mixed dal chutney powder. Protein-rich instant chutney mix.

### Snacks
1. Kodbele (₹180/500g) - Traditional ring-shaped snacks made with rice flour and spices.
2. Avalakki (₹80/500g) - Premium quality beaten rice flakes for breakfast and snacks.
3. Shankar Pole Masala (₹200/500g) - Crispy masala-flavored traditional snack.
4. Shankar Pole Sweet (₹220/500g) - Sweet version made with jaggery.

## About Shree Spices and Snacks
- All products are 100% homemade and natural
- Made with pure ghee (no artificial ingredients)
- Made fresh to order
- Traditional South Indian (Karnataka) recipes
- All products come in 500g packaging
- Contact: WhatsApp at 9986918992
`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { question } = await req.json();

    if (!question) {
      return new Response(
        JSON.stringify({ error: "Question is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are a helpful customer service assistant for "Shree Spices and Snacks", a family-owned business selling authentic homemade South Indian spices, sweets, and snacks.

Your role:
- Answer questions about products, prices, ingredients, and usage
- Help customers find the right products for their needs
- Provide cooking tips and serving suggestions
- Be warm, friendly, and helpful

Important guidelines:
- All prices are in Indian Rupees (₹)
- All products come in 500g packaging
- Products are 100% homemade with pure ghee and natural ingredients
- For orders, direct customers to WhatsApp: 9986918992
- Keep responses concise and helpful (2-3 sentences max unless more detail is needed)
- If you don't know something, say so honestly

Here is the complete product catalog:
${productCatalog}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: question }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("Failed to get response from AI");
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || "I apologize, I couldn't process your question. Please try again.";

    return new Response(
      JSON.stringify({ answer }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Product assistant error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "An error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
