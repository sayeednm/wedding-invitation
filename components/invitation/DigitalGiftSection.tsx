import type { DigitalGift } from '@/lib/types'

interface Props {
  gifts: DigitalGift[]
  templateId: string
}

const themeColors: Record<string, string> = {
  luxury: '#C9A84C',
  floral: '#f9a8d4',
  midnight: '#818cf8',
}

export default function DigitalGiftSection({ gifts, templateId }: Props) {
  const accent = themeColors[templateId] || themeColors.luxury

  return (
    <div className="px-6 py-8" style={{ background: 'rgba(0,0,0,0.2)' }}>
      <p className="text-xs tracking-widest uppercase mb-2 text-center" style={{ color: accent }}>Amplop Digital</p>
      <h2 className="text-center mb-6" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, color: 'white' }}>
        Hadiah & Doa
      </h2>
      <div className="space-y-4">
        {gifts.map(gift => (
          <div key={gift.id} className="rounded-xl p-4" style={{ background: `${accent}10`, border: `1px solid ${accent}30` }}>
            {gift.bank_name && (
              <div>
                <p className="text-xs text-gray-400 mb-1">{gift.bank_name}</p>
                <p className="font-mono text-lg" style={{ color: accent }}>{gift.account_number}</p>
                <p className="text-sm text-gray-300">{gift.account_holder}</p>
              </div>
            )}
            {gift.qris_url && (
              <div className="mt-3">
                <p className="text-xs text-gray-400 mb-2">QRIS</p>
                <img src={gift.qris_url} alt="QRIS" className="w-32 h-32 mx-auto rounded-lg" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
