import { useEffect, useRef, useState } from 'react'
import styles from './About.module.css'

const BIO =
  "I am Disath Liyanage, a Computer Science undergraduate at University " +
  "of Westminster who loves turning ideas into products " +
  "people can actually use. I build practical, performance-focused web " +
  "experiences with clean code and thoughtful frontend architecture, " +
  "and I'm always leveling up through hands-on projects and teamwork."

const WORDS = BIO.split(' ')

function About() {
  const wrapperRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    let frame = null

    const measure = () => {
      const el = wrapperRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      const scrolled = -rect.top
      const progress = scrollable > 0 ? Math.min(Math.max(scrolled / scrollable, 0), 1) : 0
      setActiveIndex(progress * WORDS.length)
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        measure()
        frame = null
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    measure()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section id="about" className={styles.about} ref={wrapperRef}>
      <div className={styles.sticky}>
        <p className={styles.text}>
          {WORDS.map((word, i) => {
            const reveal = Math.min(Math.max(activeIndex - i, 0), 1)
            return (
              <span
                key={i}
                className={`${styles.word} ${reveal > 0.5 ? styles.wordActive : ''}`}
                style={{ opacity: 0.25 + reveal * 0.75 }}
              >
                {word}{' '}
              </span>
            )
          })}
        </p>
      </div>
    </section>
  )
}

export default About
