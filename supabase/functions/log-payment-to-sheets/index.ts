import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PaymentLogRequest {
  customerName: string;
  customerPhone: string;
  amount: number;
  transactionId: string;
  status: string;
  timestamp: string;
  orderItems: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customerName, customerPhone, amount, transactionId, status, timestamp, orderItems }: PaymentLogRequest = await req.json();
    
    const apiKey = Deno.env.get('GOOGLE_SHEETS_API_KEY');
    const spreadsheetId = Deno.env.get('GOOGLE_SHEETS_SPREADSHEET_ID');
    
    if (!apiKey || !spreadsheetId) {
      console.error('Missing Google Sheets configuration');
      return new Response(JSON.stringify({ error: 'Google Sheets not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Format data for Google Sheets
    const values = [[
      new Date(timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      customerName,
      customerPhone,
      `₹${amount}`,
      transactionId,
      status,
      orderItems
    ]];

    // Append data to Google Sheets
    const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1:append?valueInputOption=RAW&key=${apiKey}`;
    
    const response = await fetch(appendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: values
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Sheets API error:', errorText);
      throw new Error(`Google Sheets API error: ${response.status}`);
    }

    const result = await response.json();
    console.log('Payment logged to Google Sheets:', result);

    return new Response(JSON.stringify({ success: true, result }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error logging payment to Google Sheets:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});