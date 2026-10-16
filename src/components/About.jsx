import { Fragment, useEffect, useRef, useState } from 'react'
import styles from './About.module.css'

const BIO =
    "I study Computer Science at the University of Westminster and spend " +
    "most of my time building: full-stack web products and native Apple " +
    "apps in SwiftUI, taken from first sketch to live. Most of what I " +
    "know came from real projects with real users, and I'm always in " +
    "the middle of something new."

const WORDS = BIO.split(' ')

function About() {
  const wrapperRef = useRef(null)
  const stickyRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    let frame = null

    const measure = () => {
      const el = wrapperRef.current
      const sticky = stickyRef.current
      if (!el || !sticky) return
      const rect = el.getBoundingClientRect()
      const scrollable = el.offsetHeight - sticky.offsetHeight
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
    window.addEventListener('resize', onScroll)
    measure()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section id="about" className={styles.about} ref={wrapperRef}>
      <div className={styles.sticky} ref={stickyRef}>
        <p className={styles.text}>
          {WORDS.map((word, i) => {
            const reveal = Math.min(Math.max(activeIndex - i, 0), 1)
            return (
              <Fragment key={i}>
                <span
                  className={`${styles.word} ${reveal > 0.5 ? styles.wordActive : ''}`}
                  style={{ opacity: 0.25 + reveal * 0.75 }}
                  data-text={word}
                >
                  {word}
                </span>{' '}
              </Fragment>
            )
          })}
        </p>
      </div>
    </section>
  )
}

export default About