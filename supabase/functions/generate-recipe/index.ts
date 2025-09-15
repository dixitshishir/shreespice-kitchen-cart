import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RecipeRequest {
  productName: string;
  productType: string;
}

const spiceKnowledge = {
  'Puliyogare Powder': {
    description: 'Traditional South Indian tamarind rice seasoning blend',
    mainDish: 'Puliyogare (Tamarind Rice)',
    ingredients: ['Cooked rice', 'Tamarind paste', 'Oil', 'Peanuts', 'Curry leaves', 'Mustard seeds', 'Turmeric'],
    cookingTime: '20-25 minutes'
  },
  'Turmeric Powder': {
    description: 'Golden spice known for its anti-inflammatory properties',
    mainDish: 'Turmeric Latte or Curry Base',
    ingredients: ['Milk or coconut milk', 'Honey', 'Black pepper', 'Ginger'],
    cookingTime: '5-10 minutes'
  },
  'Chili Powder': {
    description: 'Fiery red spice blend for heat and flavor',
    mainDish: 'Spicy Curry or Marinade',
    ingredients: ['Vegetables or meat', 'Oil', 'Onions', 'Garlic', 'Tomatoes'],
    cookingTime: '15-30 minutes'
  },
  'Coriander Powder': {
    description: 'Aromatic ground coriander seeds with citrusy flavor',
    mainDish: 'Coriander-Spiced Vegetables',
    ingredients: ['Fresh vegetables', 'Oil', 'Ginger-garlic paste', 'Green chilies'],
    cookingTime: '15-20 minutes'
  }
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { productName, productType }: RecipeRequest = await req.json();
    console.log('Generating recipe for:', productName);

    // Check if it's a powder product
    if (!productName.toLowerCase().includes('powder')) {
      return new Response(
        JSON.stringify({ 
          error: 'Recipe generation is only available for powder products',
          type: 'invalid_product_type'
        }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Get spice knowledge for better context
    const spiceInfo = spiceKnowledge[productName] || {
      description: 'Traditional South Indian spice powder',
      mainDish: 'Traditional curry or dish',
      ingredients: ['Basic ingredients'],
      cookingTime: '15-30 minutes'
    };

    const prompt = `You are a South Indian cooking expert specializing in traditional recipes. Generate a detailed, authentic recipe using ${productName}.

Context about ${productName}:
- ${spiceInfo.description}
- Primary use: ${spiceInfo.mainDish}
- Cooking time: ${spiceInfo.cookingTime}

Please provide:
1. A traditional recipe name
2. Brief description of the dish
3. Detailed ingredients list (including quantities)
4. Step-by-step cooking instructions
5. Serving suggestions
6. Any traditional tips or variations

Make it authentic, family-style, and easy to follow. Focus on South Indian cooking traditions.

Format the response in clean, readable sections with clear headers.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system', 
            content: 'You are an expert South Indian chef who provides authentic, traditional recipes with family-style warmth and detail.'
          },
          {
            role: 'user', 
            content: prompt
          }
        ],
        max_tokens: 1500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const recipe = data.choices[0].message.content;

    console.log('Recipe generated successfully');

    return new Response(
      JSON.stringify({ 
        recipe,
        productName,
        spiceInfo: {
          description: spiceInfo.description,
          cookingTime: spiceInfo.cookingTime,
          mainDish: spiceInfo.mainDish
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in generate-recipe function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        type: 'generation_error'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});