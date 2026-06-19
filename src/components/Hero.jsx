import styles from './Hero.module.css'

function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <h1 className={styles.morphContainer} aria-label="Hey, I'm Disath Liyanage">
        <span className={styles.word} aria-hidden="true">Hey</span>
        <span className={styles.word} aria-hidden="true">I&apos;m</span>
        <span className={`${styles.word} ${styles.finalWord}`} aria-hidden="true">
          Disath Liyanage
        </span>
      </h1>

      <p className={styles.subtext}>Computer Science Undergraduate</p>

      <div className={styles.scrollIndicator} aria-hidden="true">
        <div className={styles.mouse}>
          <div className={styles.wheel} />
        </div>
      </div>
    </section>
  )
}

export default Hero