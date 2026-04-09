import styles from './Hero.module.css'

function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <p className={styles.kicker}>Hello, I am</p>
      <h1>Disath Liyanage</h1>
      <p className={styles.subtitle}>CS Undergraduate | Web Developer in Sri Lanka</p>
      <p className={styles.description}>
        I am Disath, and this is the official portfolio of Disath Liyanage.
        I build practical and performance-focused web experiences with clean
        code, modern frontend architecture, and thoughtful user interactions.
      </p>
      <div className={styles.actions}>
        <a className={styles.primaryBtn} href="#projects">
          View Projects
        </a>
        <a className={styles.secondaryBtn} href="/Disath-Liyanage-CV.pdf" download>
          Download CV
        </a>
      </div>
      <nav className={styles.sectionLinks} aria-label="Section links">
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>
      <div className={styles.glow} aria-hidden="true">
        <span></span>
      </div>
    </section>
  )
}

export default Hero
