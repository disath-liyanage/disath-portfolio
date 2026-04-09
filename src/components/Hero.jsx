import styles from './Hero.module.css'

function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <p className={styles.kicker}>Hello, I am</p>
      <h1>Disath Liyanage</h1>
      <p className={styles.subtitle}>CS Undergraduate | Developer</p>
      <p className={styles.description}>
        Seeking opportunities to apply my growing skills in software
        development, web design, and practical problem-solving while building
        meaningful digital products.
      </p>
      <div className={styles.actions}>
        <a className={styles.primaryBtn} href="#projects">
          View Projects
        </a>
        <a className={styles.secondaryBtn} href="/Disath-Liyanage-CV.pdf" download>
          Download CV
        </a>
      </div>
      <div className={styles.glow} aria-hidden="true">
        <span></span>
      </div>
    </section>
  )
}

export default Hero
