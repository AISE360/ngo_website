// supabase/functions/razorpay-initiate/index.ts
// Deploy: supabase functions deploy razorpay-initiate
// Secrets: supabase secrets set RAZORPAY_KEY_ID=... RAZORPAY_SECRET=...

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
    const { amount, currency = 'INR', receipt } = await req.json()

    if (!amount || amount <= 0) {
      return new Response(JSON.stringify({ error: 'Invalid amount' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const keyId     = Deno.env.get('RAZORPAY_KEY_ID')
    const keySecret = Deno.env.get('RAZORPAY_SECRET')

    if (!keyId || !keySecret) {
      return new Response(JSON.stringify({ error: 'Razorpay keys not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const credentials = btoa(`${keyId}:${keySecret}`)

    const orderRes = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        amount:   Math.round(amount * 100), // paise
        currency,
        receipt:  receipt ?? `RCP-${Date.now()}`,
      }),
    })

    const order = await orderRes.json()

    return new Response(JSON.stringify(order), {
      status:  orderRes.status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    // Log the full error server-side for diagnostics, but return a generic
    // message to the client to avoid leaking sensitive details.
    console.error('[razorpay-initiate] error:', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status:  500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
