import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()
  const [secondsLeft, setSecondsLeft] = useState(5)

  useEffect(() => {
    if (secondsLeft <= 0) {
      navigate('/', { replace: true })
      return undefined
    }

    const timer = setTimeout(() => {
      setSecondsLeft((prev) => prev - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [secondsLeft, navigate])

  const goHomeNow = () => {
    navigate('/', { replace: true })
  }

  return (
    <main
      style={{
        minHeight: '100svh',
        display: 'grid',
        placeItems: 'center',
        padding: '1.2rem clamp(0.7rem, 1.6vw, 1.05rem)'
      }}
    >
      <section
        style={{
          width: 'min(100%, 560px)',
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          boxShadow: 'var(--shadow)',
          padding: '2rem 1.5rem',
          textAlign: 'center'
        }}
      >
        <h1 style={{ fontSize: 'clamp(1.8rem, 4.5vw, 2.5rem)', marginBottom: '0.75rem' }}>
          404 — Page Not Found
        </h1>
        <p style={{ marginBottom: '1.25rem' }}>
          This page does not exist. Redirecting to home in {secondsLeft} second{secondsLeft === 1 ? '' : 's'}.
        </p>
        <button
          type="button"
          onClick={goHomeNow}
          style={{
            fontFamily: 'Outfit, Helvetica Neue, sans-serif',
            fontWeight: 700,
            border: 'none',
            borderRadius: '999px',
            backgroundColor: 'var(--accent)',
            color: 'var(--bg)',
            padding: '0.7rem 1.2rem',
            cursor: 'pointer'
          }}
        >
          Go Home
        </button>
      </section>
    </main>
  )
}

export default NotFound
