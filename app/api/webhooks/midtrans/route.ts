import { NextRequest, NextResponse } from 'next/server'
import { createClient as createServerClient } from '@supabase/supabase-js'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { order_id, status_code, gross_amount, signature_key, transaction_status, fraud_status } = body

    // Verify Midtrans signature
    const serverKey = process.env.MIDTRANS_SERVER_KEY!
    const hash = crypto
      .createHash('sha512')
      .update(`${order_id}${status_code}${gross_amount}${serverKey}`)
      .digest('hex')

    if (hash !== signature_key) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 403 })
    }

    // Use service role to bypass RLS
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const isSuccess = transaction_status === 'capture' && fraud_status === 'accept'
      || transaction_status === 'settlement'

    if (isSuccess) {
      // Update order status
      await supabase.from('orders').update({ status: 'success' }).eq('order_id', order_id)

      // Get user_id from order and set is_premium = true
      const { data: order } = await supabase.from('orders').select('user_id').eq('order_id', order_id).single()
      if (order) {
        await supabase.from('profiles').update({ is_premium: true }).eq('id', order.user_id)
      }
    } else if (transaction_status === 'deny' || transaction_status === 'cancel' || transaction_status === 'expire') {
      await supabase.from('orders').update({ status: 'failed' }).eq('order_id', order_id)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Webhook error:', err)
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 })
  }
}
