// supabase/functions/whatsapp-notify/index.ts
// Deploy: supabase functions deploy whatsapp-notify
// Secrets: supabase secrets set WA_PHONE_ID=... WA_ACCESS_TOKEN=...

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { to, message, templateName, templateParams } = await req.json()

    if (!to || !message) {
      return new Response(JSON.stringify({ error: 'to and message are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const phoneId    = Deno.env.get('WA_PHONE_ID')
    const accessToken = Deno.env.get('WA_ACCESS_TOKEN')

    if (!phoneId || !accessToken) {
      return new Response(JSON.stringify({ error: 'WhatsApp credentials not set' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Normalise phone number: strip spaces/dashes, add country code if missing
    const phone = to.replace(/[\s\-\(\)]/g, '').replace(/^0/, '91')

    const body = templateName
      ? {
          messaging_product: 'whatsapp',
          to: phone,
          type: 'template',
          template: {
            name: templateName,
            language: { code: 'en' },
            components: templateParams ? [{ type: 'body', parameters: templateParams }] : [],
          },
        }
      : {
          messaging_product: 'whatsapp',
          to: phone,
          type: 'text',
          text: { body: message, preview_url: false },
        }

    const res = await fetch(
      `https://graph.facebook.com/v18.0/${phoneId}/messages`,
      {
        method:  'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type':  'application/json',
        },
        body: JSON.stringify(body),
      }
    )

    const data = await res.json()

    return new Response(JSON.stringify(data), {
      status:  res.status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status:  500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
