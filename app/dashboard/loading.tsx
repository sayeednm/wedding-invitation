export default function DashboardLoading() {
  return (
    <div>
      {/* Header skeleton */}
      <div className="mb-8">
        <div className="h-3 w-24 rounded-full mb-2 animate-pulse" style={{ background: 'rgba(201,168,76,0.2)' }} />
        <div className="h-8 w-48 rounded-xl animate-pulse" style={{ background: 'rgba(255,255,255,0.08)' }} />
      </div>

      {/* Card skeleton */}
      <div className="rounded-2xl p-6 mb-8 animate-pulse" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.15)' }}>
        <div className="h-5 w-48 rounded-lg mb-2" style={{ background: 'rgba(201,168,76,0.15)' }} />
        <div className="h-4 w-72 rounded-lg" style={{ background: 'rgba(255,255,255,0.06)' }} />
      </div>

      {/* Grid skeleton */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="rounded-2xl overflow-hidden animate-pulse" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.1)' }}>
            <div className="h-40" style={{ background: 'rgba(255,255,255,0.06)' }} />
            <div className="p-4 space-y-2">
              <div className="h-4 w-3/4 rounded-lg" style={{ background: 'rgba(255,255,255,0.08)' }} />
              <div className="h-3 w-1/2 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
