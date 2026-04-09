import styles from './Projects.module.css'

const projects = [
  {
    title: 'Nymo',
    description:
      'A focused productivity app that helps users capture tasks, prioritize work, and track progress with a clean dashboard.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    github: 'https://github.com/disath-liyanage/nymo',
    demo: 'https://nymo.vercel.app/',
  },
  {
    title: 'CodeSprint Tracker',
    description:
      'A coding challenge tracker that visualizes solved problems, streaks, and topic performance for consistent daily practice.',
    tech: ['React', 'Chart.js', 'Firebase'],
    github: 'https://github.com/disath-liyanage/codesprint-tracker',
    demo: 'https://codesprint-tracker.vercel.app/',
  },
  {
    title: 'Campus Connect',
    description:
      'A student collaboration platform for sharing notices, project ideas, and event updates in one streamlined interface.',
    tech: ['React', 'Vite', 'Supabase'],
    github: 'https://github.com/disath-liyanage/campus-connect',
    demo: 'https://campus-connect.vercel.app/',
  },
]

function Projects() {
  return (
    <section id="projects" className={styles.projects}>
      <h2>Projects</h2>
      <div className={styles.grid}>
        {projects.map((project) => (
          <article key={project.title} className={styles.card}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className={styles.tags}>
              {project.tech.map((tech) => (
                <span key={tech} className={styles.tag}>
                  {tech}
                </span>
              ))}
            </div>
            <div className={styles.actions}>
              <a href={project.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href={project.demo} target="_blank" rel="noreferrer">
                Live Demo
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Projects
