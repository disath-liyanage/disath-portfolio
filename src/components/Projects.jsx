import styles from './Projects.module.css'

const projects = [
  {
    title: 'Nymo.lk',
    description:
      'Leading development of Nymo, a unified apparel e-commerce platform for underrated sellers, including a responsive storefront and vendor dashboard focused on clean UI, smooth navigation, and accessibility.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    github: 'https://github.com/disath-liyanage',
  },
  {
    title: 'OceaVia',
    description:
      'A responsive awareness platform supporting UN SDG 14 - Life Below Water, with structured content, smooth navigation, and accessibility-focused implementation.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/disath-liyanage',
  },
  {
    title: 'Agri Guide',
    description:
      'An innovative farming assistance app UI/UX concept designed in Figma to help farmers maximize harvest and reduce losses using practical guidance.',
    tech: ['Figma', 'UI/UX Design'],
  },
  {
    title: 'CoreUp',
    description:
      'A co-developed fitness platform (MEAN stack) for tracking workouts, reps, weights, and calorie intake through a comprehensive and intuitive experience.',
    tech: ['MongoDB', 'Express', 'Angular', 'Node.js'],
  },
  {
    title: 'Task Manager',
    description:
      'A Python-based task manager with add, update, and priority organization features (high, medium, low) for efficient daily workload management.',
    tech: ['Python'],
    github: 'https://github.com/disath-liyanage',
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
            {(project.github || project.demo) && (
              <div className={styles.actions}>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noreferrer">
                    Live Demo
                  </a>
                )}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

export default Projects
