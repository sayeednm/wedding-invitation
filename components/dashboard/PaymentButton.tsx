'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  userId: string
  userEmail: string
}

export default function PaymentButton({ userId, userEmail }: Props) {
  const [loading, setLoading] = useState(false)
  const [snapReady, setSnapReady] = useState(false)
  const router = useRouter()

  // Poll until window.snap is available (loaded via Script tag in layout)
  useEffect(() => {
    if ((window as any).snap) {
      setSnapReady(true)
      return
    }
    const interval = setInterval(() => {
      if ((window as any).snap) {
        setSnapReady(true)
        clearInterval(interval)
      }
    }, 200)
    return () => clearInterval(interval)
  }, [])

  async function handlePayment() {
    if (!snapReady) return
    setLoading(true)
    try {
      const res = await fetch('/api/payment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, userEmail }),
      })
      const data = await res.json()

      if (data.token) {
        ;(window as any).snap.pay(data.token, {
          onSuccess: () => { router.push('/dashboard/welcome') },
          onPending: () => { setLoading(false) },
          onError: () => { setLoading(false) },
          onClose: () => { setLoading(false) },
        })
      } else {
        setLoading(false)
      }
    } catch {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handlePayment}
      disabled={loading || !snapReady}
      className="px-6 py-3 rounded-full font-medium text-sm transition-all hover:opacity-90 disabled:opacity-50 whitespace-nowrap"
      style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', color: '#0D1B2A' }}
    >
      {loading ? 'Memproses...' : !snapReady ? 'Memuat...' : 'Bayar Rp 99.000'}
    </button>
  )
}
