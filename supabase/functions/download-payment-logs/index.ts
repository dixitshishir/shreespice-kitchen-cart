import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('GOOGLE_SHEETS_API_KEY');
    const spreadsheetId = Deno.env.get('GOOGLE_SHEETS_SPREADSHEET_ID');
    
    if (!apiKey || !spreadsheetId) {
      console.error('Missing Google Sheets configuration');
      return new Response(JSON.stringify({ error: 'Google Sheets not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get data from Google Sheets
    const getUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1?key=${apiKey}`;
    
    const response = await fetch(getUrl);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Sheets API error:', errorText);
      throw new Error(`Google Sheets API error: ${response.status}`);
    }

    const result = await response.json();
    const rows = result.values || [];

    // Convert to CSV format
    let csvContent = "Timestamp,Customer Name,Phone,Amount,Transaction ID,Status,Order Items\n";
    
    rows.forEach((row: string[]) => {
      const csvRow = row.map(cell => `"${cell || ''}"`).join(',');
      csvContent += csvRow + '\n';
    });

    return new Response(csvContent, {
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="payment-logs.csv"'
      },
    });

  } catch (error) {
    console.error('Error downloading payment logs:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});