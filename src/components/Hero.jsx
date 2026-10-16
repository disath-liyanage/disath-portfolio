import { useState, useEffect } from 'react'
import styles from './Hero.module.css'
import MorphFilter from './MorphFilter.jsx'
import InteractiveBackground from './InteractiveBackground.jsx'

function Hero() {
  const [showBackground, setShowBackground] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBackground(true)
    }, 7500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="home" className={styles.hero}>
      <InteractiveBackground isActive={showBackground} />
      <MorphFilter />

      <h1 className={styles.morphContainer} aria-label="Hey, I'm Disath Liyanage">
        <span className={styles.word} aria-hidden="true">Hey</span>
        <span className={styles.word} aria-hidden="true">I&apos;m</span>
        <span className={`${styles.word} ${styles.finalWord}`} aria-hidden="true">
          Disath Liyanage
        </span>
      </h1>

      <p className={styles.subtext}>
        Computer Science Undergraduate
      </p>

      <div className={styles.scrollIndicator} aria-hidden="true">
        <div className={styles.mouse}>
          <div className={styles.wheel} />
        </div>
      </div>
    </section>
  )
}

export default Hero