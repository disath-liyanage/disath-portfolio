import { useState } from 'react'
import styles from './About.module.css'
import headshot from '../assets/Headshot.jpeg'

const education = [
  'BSc (Hons) in Computer Science, IIT (Affiliated to University of Westminster) - Jan 2025 to Present',
  'Foundation in Higher Education, IIT - Sep 2023 to May 2024 (Merit Pass)',
  'G.C.E Advanced Level (Commerce Stream), Applied Private - Jun 2024 to Nov 2024',
  'G.C.E Ordinary Level, Hanwella Rajasinghe Central College - Jan 2017 to May 2023',
]

function About() {
  const [showFallback, setShowFallback] = useState(false)

  return (
    <section id="about" className={styles.about}>
      <div className={styles.content}>
        <h2>About Me</h2>
        <p>
          I am Disath Liyanage, a Computer Science undergraduate at the
          University of Westminster (via IIT), based in Panagoda, Homagama. I
          have built academic and team projects in Python and web development,
          and I enjoy combining clean implementation, practical problem-solving,
          and collaboration to deliver useful software.
        </p>
        <h3>Education</h3>
        <ul>
          {education.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className={styles.photoCard} aria-label="Disath Liyanage profile">
        {!showFallback ? (
          <img
            src={headshot}
            alt="Disath Liyanage headshot"
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
