'use client'

import { Component, type ReactNode } from 'react'

interface Props { children: ReactNode }
interface State { hasError: boolean }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center text-center px-6"
          style={{ background: '#0D1B2A' }}>
          <div>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 48, color: '#C9A84C' }}>✦</p>
            <p style={{ color: '#C9A84C', fontSize: 18, marginBottom: 8 }}>Ups, ada kesalahan</p>
            <p style={{ color: '#9ca3af', fontSize: 14, marginBottom: 24 }}>Coba refresh halaman ini</p>
            <button onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-full text-sm font-medium"
              style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C97A)', color: '#0D1B2A' }}>
              Refresh
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
