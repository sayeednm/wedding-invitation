'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { DigitalGift } from '@/lib/types'

interface Props {
  gifts: DigitalGift[]
  accentColor: string
}

// Logo bank sederhana pakai SVG text
function BankLogo({ name }: { name: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    'BCA': { bg: '#003d82', text: '#fff' },
    'MANDIRI': { bg: '#003087', text: '#f5a623' },
    'BRI': { bg: '#003087', text: '#fff' },
    'BNI': { bg: '#f47920', text: '#fff' },
    'BSI': { bg: '#4caf50', text: '#fff' },
    'CIMB': { bg: '#c8102e', text: '#fff' },
    'DANA': { bg: '#118eea', text: '#fff' },
    'OVO': { bg: '#4c3494', text: '#fff' },
    'GOPAY': { bg: '#00aed6', text: '#fff' },
  }
  const upper = name.toUpperCase()
  const style = Object.entries(colors).find(([k]) => upper.includes(k))?.[1] || { bg: '#333', text: '#fff' }

  return (
    <div className="px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider"
      style={{ background: style.bg, color: style.text, minWidth: 60, textAlign: 'center' }}>
      {name.toUpperCase()}
    </div>
  )
}

// Chip kartu kredit SVG
function CardChip() {
  return (
    <svg width="36" height="28" viewBox="0 0 36 28" fill="none">
      <rect width="36" height="28" rx="4" fill="#d4a843"/>
      <rect x="4" y="4" width="28" height="20" rx="2" fill="none" stroke="#b8922e" strokeWidth="0.8"/>
      <line x1="18" y1="4" x2="18" y2="24" stroke="#b8922e" strokeWidth="0.8"/>
      <line x1="4" y1="14" x2="32" y2="14" stroke="#b8922e" strokeWidth="0.8"/>
      <line x1="4" y1="9" x2="18" y2="9" stroke="#b8922e" strokeWidth="0.5"/>
      <line x1="18" y1="19" x2="32" y2="19" stroke="#b8922e" strokeWidth="0.5"/>
    </svg>
  )
}

function BankCard({ gift, accentColor }: { gift: DigitalGift; accentColor: string }) {
  const [copied, setCopied] = useState(false)

  function copyNumber() {
    if (!gift.account_number) return
    navigator.clipboard.writeText(gift.account_number)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl p-5 relative overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>

      {/* Shimmer background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top right, ${accentColor}08, transparent 60%)` }}/>

      <div className="relative z-10">
        {/* Header: logo + chip */}
        <div className="flex items-center justify-between mb-4">
          {gift.bank_name && <BankLogo name={gift.bank_name}/>}
          <CardChip/>
        </div>

        {/* Nomor rekening */}
        <div className="mb-3">
          <p className="text-xs text-gray-500 mb-1">No Rekening</p>
          <p className="font-mono text-lg tracking-wider" style={{ color: 'white' }}>
            {gift.account_number}
          </p>
        </div>

        {/* Nama + tombol salin */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-gray-500 mb-1">Atas Nama</p>
            <p className="text-sm italic" style={{ color: 'rgba(255,255,255,0.85)', fontFamily: 'Cormorant Garamond, serif', fontSize: 16 }}>
              {gift.account_holder}
            </p>
          </div>
          <button onClick={copyNumber}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium transition-all"
            style={{ background: copied ? 'rgba(74,222,128,0.2)' : `${accentColor}20`, color: copied ? '#4ade80' : accentColor, border: `1px solid ${copied ? 'rgba(74,222,128,0.3)' : accentColor + '30'}` }}>
            {copied ? (
              <>✓ Disalin</>
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                </svg>
                Salin
              </>
            )}
          </button>
        </div>

        {/* QRIS */}
        {gift.qris_url && (
          <div className="mt-4 pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <p className="text-xs text-gray-500 mb-2">QRIS</p>
            <img src={gift.qris_url} alt="QRIS" className="w-28 h-28 rounded-xl object-cover"/>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function WeddingGiftSection({ gifts, accentColor }: Props) {
  if (!gifts.length) return null

  return (
    <div className="px-5 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-center mb-6">
        <h2 style={{ fontFamily: 'Great Vibes, cursive', fontSize: 36, color: accentColor }}>Wedding Gift</h2>
        <p className="text-sm text-gray-400 mt-2 leading-relaxed" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 15 }}>
          Doa Restu Anda merupakan karunia yang sangat berarti bagi kami.
        </p>
        <p className="text-sm text-gray-500 mt-1" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 14 }}>
          Dan jika memberi adalah ungkapan tanda kasih, Anda dapat memberi melalui di bawah ini.
        </p>
      </motion.div>

      <div className="space-y-4">
        {gifts.map(gift => (
          <BankCard key={gift.id} gift={gift} accentColor={accentColor}/>
        ))}
      </div>
    </div>
  )
}
