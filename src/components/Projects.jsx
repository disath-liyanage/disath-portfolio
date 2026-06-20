import { useState } from 'react';
import LiquidGlassBtn from './LiquidGlassBtn';
import './Projects.css';

const GitHubIcon = () => (
  <svg
    width="15" height="15"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387
      .599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416
      -.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729
      1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997
      .107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931
      0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176
      0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005
      2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23
      .653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221
      0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222
      v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12
      c0-6.627-5.373-12-12-12z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg
    width="13" height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const PROJECTS = [
  {
    id: 1,
    title: 'Project Alpha',
    description: 'A full-stack web application with user authentication, real-time updates, and a fully responsive UI built with modern technologies.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    github: 'https://github.com/disath-liyanage/project-alpha',
    live: 'https://project-alpha.vercel.app',
  },
  {
    id: 2,
    title: 'Portfolio V1',
    description: 'Previous iteration of my personal portfolio site. Built with vanilla HTML, CSS, and JavaScript without any frameworks.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/disath-liyanage/portfolio-v1',
    live: null,
  },
  {
    id: 3,
    title: 'Task Manager API',
    description: 'RESTful API built with Spring Boot. Implements full CRUD, JWT authentication, and MySQL persistence.',
    tech: ['Java', 'Spring Boot', 'MySQL', 'JWT'],
    github: 'https://github.com/disath-liyanage/task-api',
    live: null,
  },
  {
    id: 4,
    title: 'Data Viz Dashboard',
    description: 'Interactive data visualization dashboard pulling from public APIs. Features charts, filters, and CSV export.',
    tech: ['React', 'D3.js', 'Python', 'FastAPI'],
    github: 'https://github.com/disath-liyanage/data-viz',
    live: 'https://data-viz.vercel.app',
  },
  {
    id: 5,
    title: 'CLI Dev Tool',
    description: 'A command-line utility that automates repetitive development tasks and scaffolding. Published to npm.',
    tech: ['Node.js', 'Commander.js'],
    github: 'https://github.com/disath-liyanage/cli-tool',
    live: null,
  },
  {
    id: 6,
    title: 'Real-time Chat',
    description: 'Real-time chat application with rooms, private messaging, and file sharing powered by Socket.io and Redis.',
    tech: ['React', 'Socket.io', 'Node.js', 'Redis'],
    github: 'https://github.com/disath-liyanage/chat-app',
    live: 'https://chat-app.vercel.app',
  },
  {
    id: 7,
    title: 'ML Classifier',
    description: 'CNN-based image classification model trained on a custom dataset. Achieved 95% top-1 accuracy on the test split.',
    tech: ['Python', 'TensorFlow', 'Keras', 'NumPy'],
    github: 'https://github.com/disath-liyanage/ml-classifier',
    live: null,
  },
];

const PER_PAGE = 6;

function ProjectCard({ project }) {
  return (
    <article className="proj-card">
      <div className="proj-card_body">
        <h3 className="proj-card_title">{project.title}</h3>
        <p className="proj-card_desc">{project.description}</p>

        <div className="proj-card_pills">
          {project.tech.map((t) => (
            <span key={t} className="tech-pill">{t}</span>
          ))}
        </div>

        <div className="proj-card_links">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="proj-btn proj-btn-gh"
            >
              <GitHubIcon />
              GitHub
            </a>
          )}

          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="proj-btn proj-btn-live"
            >
              <ExternalLinkIcon />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState('next');

  const totalPages = Math.ceil(PROJECTS.length / PER_PAGE);
  const showNav = PROJECTS.length > PER_PAGE;
  
  const slice = PROJECTS.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);
  
  const displayItems = [...slice];
  const templateItem = slice[0] || PROJECTS[0];

  while (displayItems.length < PER_PAGE) {
    displayItems.push({ 
      ...templateItem, 
      id: `ghost-${displayItems.length}`, 
      isGhost: true 
    });
  }

  const isFirst = page === 0;
  const isLast = page === totalPages - 1;

  const handlePrev = () => {
    setDirection('prev');
    setPage((p) => p - 1);
  };

  const handleNext = () => {
    setDirection('next');
    setPage((p) => p + 1);
  };

  const handleDot = (i) => {
    setDirection(i > page ? 'next' : 'prev');
    setPage(i);
  };

  return (
    <section id="projects" className="projects-section">
      <h2 className="projects-heading">Projects</h2>

      <div className="projects-layout">
        
        <div className={`projects-grid animate-swipe-${direction}`} key={page}>
          {displayItems.map((proj) => {
            if (proj.isGhost) {
              return (
                <div key={proj.id} className="ghost-card" aria-hidden="true">
                  <ProjectCard project={proj} />
                </div>
              );
            }
            return <ProjectCard key={proj.id} project={proj} />;
          })}
        </div>

        {showNav && (
          <div className="projects-bottom-nav">
            
            <div className="nav-side nav-side-left">
              {!isFirst && (
                <LiquidGlassBtn direction="prev" onClick={handlePrev} />
              )}
            </div>

            <div className="projects-dots" role="tablist" aria-label="Project pages">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={page === i}
                  aria-label={`Page ${i + 1}`}
                  className={`dot${page === i ? ' dot-active' : ''}`}
                  onClick={() => handleDot(i)}
                  type="button"
                />
              ))}
            </div>

            <div className="nav-side nav-side-right">
              {!isLast && (
                <LiquidGlassBtn direction="next" onClick={handleNext} />
              )}
            </div>

          </div>
        )}

      </div>
    </section>
  );
}