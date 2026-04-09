import styles from './About.module.css'

const education = [
  'Computer Science Undergraduate',
  'Academic focus: Software Engineering and Web Development',
  'Based in Sri Lanka',
]

function About() {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.content}>
        <h2>About Me</h2>
        <p>
          I am Disath Liyanage, a Computer Science Undergraduate from Sri Lanka.
          I enjoy turning ideas into products through frontend development,
          full-stack experimentation, and continuous learning. I care about
          maintainable code, accessible interfaces, and shipping projects that
          solve real user problems.
        </p>
        <h3>Education</h3>
        <ul>
          {education.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className={styles.photoCard} aria-label="Disath Liyanage profile placeholder">
        <span>DL</span>
      </div>
    </section>
  )
}

export default About
