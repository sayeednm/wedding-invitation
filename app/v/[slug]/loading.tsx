export default function InvitationLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #071a0e 0%, #1B4332 50%, #0D1B2A 100%)' }}>
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-6">
          {/* Spinning ring */}
          <svg className="animate-spin w-16 h-16" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="28" stroke="rgba(201,168,76,0.15)" strokeWidth="3"/>
            <path d="M32 4 A28 28 0 0 1 60 32" stroke="#C9A84C" strokeWidth="3" strokeLinecap="round"/>
          </svg>
          {/* Center star */}
          <svg className="absolute inset-0 m-auto w-6 h-6" viewBox="0 0 16 16" fill="none">
            <path d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5 Z" fill="#C9A84C" opacity="0.8"/>
          </svg>
        </div>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16, color: 'rgba(201,168,76,0.7)', fontStyle: 'italic' }}>
          Membuka undangan...
        </p>
      </div>
    </div>
  )
}
