import { useState } from 'react'
import styles from './About.module.css'
import headshot from '../assets/Headshot.jpeg'

function About() {
  const [showFallback, setShowFallback] = useState(false)

  return (
    <section id="about" className={styles.about}>
      <div className={styles.content}>
        <h2>About Me</h2>
        <p>
          I am Disath Liyanage, a Computer Science undergraduate who loves
          turning ideas into products people can actually use. I enjoy building
          practical web experiences that feel fast, clear, and purposeful.
        </p>
        <p>
          From UI design decisions to clean frontend architecture, I focus on
          creating polished interfaces, solving real problems, and continuously
          leveling up my skills through hands-on projects and teamwork.
        </p>
        <h3>Education</h3>
        <p>Computer Science Undergraduate</p>
      </div>
      <div className={styles.photoCard} aria-label="Disath Liyanage profile">
        {!showFallback ? (
          <img
            src={headshot}
            alt="Disath Liyanage"
            className={styles.photo}
            onError={() => setShowFallback(true)}
          />
        ) : (
          <span>DL</span>
        )}
      </div>
    </section>
  )
}

export default About
