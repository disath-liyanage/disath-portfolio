"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import InteractiveBackground from "../components/InteractiveBackground"

export default function NotFound() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fade-in", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      })

      gsap.to(".float-4-1", {
        y: -25,
        rotation: -12,
        x: -15,
        duration: 4.2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      })

      gsap.to(".float-0", {
        y: 35,
        rotation: 10,
        x: 12,
        duration: 5.5,
        delay: 0.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      })

      gsap.to(".float-4-2", {
        y: -18,
        rotation: 8,
        x: 20,
        duration: 6.1, 
        delay: 1.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={containerRef} 
      style={{ 
        position: 'relative',
        minHeight: '100svh', 
        width: '100%',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        overflow: 'hidden',
        padding: 'clamp(1rem, 5vw, 2rem)',
        boxSizing: 'border-box'
      }}
    >
      <InteractiveBackground isActive={true} />

      <div 
        style={{ 
          display: 'flex', 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'center',
          width: '100%',
          maxWidth: '1200px',
          flexWrap: 'wrap-reverse', 
          gap: 'clamp(2rem, 8vw, 4rem)',
          zIndex: 1
        }}
      >
        
        <div 
          style={{ 
            flex: '1 1 min(100%, 400px)', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1.5rem', 
            zIndex: 2,
            textAlign: 'left'
          }}
        >
          <h1 
            className="fade-in" 
            style={{ 
              fontSize: 'clamp(3rem, 10vw, 5rem)', 
              fontWeight: 700, 
              margin: 0, 
              lineHeight: 1.1,
              userSelect: 'none',
              WebkitUserSelect: 'none'
            }}
          >
            Oops!
          </h1>
          
          <p 
            className="fade-in" 
            style={{ 
              fontSize: 'clamp(1rem, 4vw, 1.8rem)', 
              color: 'var(--text-muted, #ccc)', 
              margin: 0,
              userSelect: 'none',
              WebkitUserSelect: 'none'
            }}
          >
            You Seem To Be Lost!
          </p>

          <div className="fade-in" style={{ marginTop: '1rem' }}>
            <button
              onClick={() => window.location.replace("/")}
              style={{
                fontFamily: 'Outfit, Helvetica Neue, sans-serif',
                fontSize: '0.9rem',
                letterSpacing: '0.1em',
                fontWeight: 500,
                backgroundColor: 'var(--glass-bg, rgba(255, 255, 255, 0.07))',
                border: '1px solid var(--glass-border, rgba(255, 255, 255, 0.18))',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)', 
                borderRadius: '9999px',
                color: 'var(--text, #fff)',
                padding: '0.8rem 2.2rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
                userSelect: 'none',
                WebkitUserSelect: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'
                e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--glass-bg, rgba(255, 255, 255, 0.07))'
                e.currentTarget.style.border = '1px solid var(--glass-border, rgba(255, 255, 255, 0.18))'
              }}
            >
              TAKE ME HOME
            </button>
          </div>
        </div>

        <div 
          style={{ 
            flex: '1 1 min(100%, 500px)', 
            position: 'relative', 
            height: 'clamp(250px, 50vw, 500px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            userSelect: 'none',
            WebkitUserSelect: 'none'
          }}
        >
          <span 
            className="float-4-1"
            style={{ 
              position: 'absolute',
              left: '0%',
              top: '15%',
              fontSize: 'clamp(8rem, 28vw, 22rem)',
              fontWeight: 800, 
              lineHeight: 1,
              color: 'var(--text, #fff)'
            }}
          >
            4
          </span>

          <span 
            className="float-0"
            style={{ 
              position: 'absolute',
              left: '35%',
              top: '-10%',
              fontSize: 'clamp(8rem, 28vw, 22rem)',
              fontWeight: 800, 
              lineHeight: 1,
              color: 'var(--text, #fff)'
            }}
          >
            0
          </span>

          <span 
            className="float-4-2"
            style={{ 
              position: 'absolute',
              right: '0%', 
              top: '40%',
              fontSize: 'clamp(8rem, 28vw, 22rem)', 
              fontWeight: 800, 
              lineHeight: 1,
              color: 'var(--text, #fff)'
            }}
          >
            4
          </span>
        </div>

      </div>
    </section>
  )
}