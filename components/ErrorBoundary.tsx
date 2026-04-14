'use client'

import { Component, type ReactNode } from 'react'

interface Props { children: ReactNode; fallback?: ReactNode }
interface State { hasError: boolean; error?: Error }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    // Log to console in dev — could send to Sentry/etc in prod
    if (process.env.NODE_ENV === 'development') {
      console.error('[ErrorBoundary]', error, info.componentStack)
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div className="min-h-screen flex items-center justify-center text-center px-6"
          style={{ background: 'linear-gradient(135deg, #071a0e, #0D1B2A)' }}>
          <div>
            <p style={{ fontFamily: 'Great Vibes, cursive', fontSize: 48, color: '#C9A84C', marginBottom: 8 }}>
              Ups...
            </p>
            <p style={{ color: '#C9A84C', fontSize: 18, marginBottom: 8, fontFamily: 'Cormorant Garamond, serif' }}>
              Ada sesuatu yang tidak beres
            </p>
            <p style={{ color: '#9ca3af', fontSize: 14, marginBottom: 24 }}>
              Coba refresh halaman. Jika masalah berlanjut, hubungi kami.
            </p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => window.location.reload()}
                className="px-6 py-2.5 rounded-full text-sm font-medium transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C97A)', color: '#0D1B2A' }}>
                Refresh Halaman
              </button>
              <a href="/"
                className="px-6 py-2.5 rounded-full text-sm font-medium border transition-all hover:bg-white/5"
                style={{ borderColor: 'rgba(201,168,76,0.3)', color: '#C9A84C' }}>
                Ke Beranda
              </a>
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
