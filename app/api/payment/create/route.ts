import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
// @ts-ignore
import midtransClient from 'midtrans-client'

export async function POST(req: NextRequest) {
  try {
    const { userId, userEmail } = await req.json()

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || user.id !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const orderId = `ORDER-${userId.slice(0, 8)}-${Date.now()}`
    const amount = 99000

    // Save order to DB
    await supabase.from('orders').insert({
      user_id: userId,
      order_id: orderId,
      amount,
      status: 'pending',
    })

    const snap = new midtransClient.Snap({
      isProduction: true,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    })

    const transaction = await snap.createTransaction({
      transaction_details: { order_id: orderId, gross_amount: amount },
      customer_details: { email: userEmail },
      item_details: [{ id: 'PREMIUM', price: amount, quantity: 1, name: 'Akses Premium Undangan Digital' }],
    })

    return NextResponse.json({ token: transaction.token })
  } catch (err) {
    console.error('Payment error:', err)
    return NextResponse.json({ error: 'Payment failed' }, { status: 500 })
  }
}
