import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Habitris error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <div
          style={{
            minHeight: '100vh',
            background: '#0f0f12',
            color: '#e8e8ec',
            padding: '2rem',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <h1 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>오류가 발생했습니다</h1>
          <p style={{ color: '#888899', fontSize: '0.875rem', marginBottom: '1rem' }}>
            {this.state.error.message}
          </p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              padding: '0.5rem 1rem',
              background: '#2a2a32',
              border: '1px solid #2a2a32',
              color: '#e8e8ec',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            다시 시도
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
