// supabase/functions/whatsapp-notify/index.ts
// Notifies ADMIN on new donation / volunteer / contact / csr.
// Deploy: supabase functions deploy whatsapp-notify
// Secrets: WA_PHONE_ID, WA_ACCESS_TOKEN, ADMIN_WHATSAPP (e.g. 919876543210), ADMIN_EMAIL (optional, via Resend)

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

async function sendWA(phoneId: string, token: string, to: string, message: string) {
  const phone = to.replace(/[\s\-()]/g, '').replace(/^0/, '91')
  const res = await fetch(`https://graph.facebook.com/v18.0/${phoneId}/messages`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ messaging_product: 'whatsapp', to: phone, type: 'text', text: { body: message, preview_url: false } }),
  })
  return res.json()
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  try {
    const payload = await req.json()
    const phoneId = Deno.env.get('WA_PHONE_ID')
    const token = Deno.env.get('WA_ACCESS_TOKEN')
    const adminWA = Deno.env.get('ADMIN_WHATSAPP') ?? ''

    // Backward-compat: direct { to, message } send
    if (payload.to && payload.message) {
      if (!phoneId || !token) return new Response(JSON.stringify({ queued: true, note: 'WA creds missing — log only' }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
      const data = await sendWA(phoneId, token, payload.to, payload.message)
      return new Response(JSON.stringify(data), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    // Event style from website forms
    const { type, name, phone, email, amount, program, interest, message, paymentId, org } = payload
    const lines: Record<string, string> = {
      donation: `💛 New Donation — Thoughtful Hearts\nName: ${name}\nPhone: ${phone}\nAmount: Rs.${amount} (${program})\nPayment: ${paymentId ?? 'pending'}`,
      volunteer: `🙋 New Volunteer\nName: ${name}\nPhone: ${phone}\nInterest: ${interest}\nNote: ${message ?? '-'}`,
      contact: `✉️ New Contact Message\nName: ${name}\nPhone: ${phone}\nMsg: ${message}`,
      csr: `🤝 New CSR Inquiry\nOrg: ${org}\nContact: ${name ?? payload.contact}\nPhone: ${phone}\nMsg: ${message ?? '-'}`,
    }
    const text = lines[type] ?? `🔔 New ${type} event\n${JSON.stringify(payload).slice(0, 800)}`
    console.log('[whatsapp-notify]', text)

    if (!phoneId || !token || !adminWA) {
      return new Response(JSON.stringify({ queued: true, note: 'admin WA not configured — logged only' }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }
    const data = await sendWA(phoneId, token, adminWA, text)
    void email
    return new Response(JSON.stringify({ ok: true, data }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error('[whatsapp-notify] error:', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }
})
