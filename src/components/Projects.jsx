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
    title: 'Nymo.lk',
    description: 'Leading development of Nymo, a unified apparel e-commerce platform for underrated sellers, including a responsive storefront and vendor dashboard focused on clean UI, smooth navigation, and accessibility.',
    tech: ['React', 'Next.js', 'Express', 'PostgreSQL'],
    github: 'https://github.com/isblu/Nymo  ',
    live: 'https://preview.store.nymo.lk/',
  },
  {
    id: 2,
    title: '3D\'s Distributors System',
    description: 'Full-stack business management platform for a real distribution company, handling role-based access, multi-level invoice approval workflows, rep collections and expense tracking, HR/payroll with EPF/ETF compliance, attendance tracking, loan management, sales targets, and reporting.',
    tech: ['Next.js 14', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Turborepo'],
    github: 'https://github.com/disath-liyanage/3ds-system',
    live: 'https://www.3dsdis.com',
  },
  {
    id: 3,
    title: 'Heritage Family Restaurant',
    description: 'Restaurant website with an authenticated admin dashboard for managing menu items, pricing, and content, built with SEO optimization for local search discoverability.',
    tech: ['Next.js 14', 'Sanity CMS', 'Tailwind CSS', 'Cloudinary', 'SEO'],
    github: 'https://github.com/disath-liyanage/heritage-website',
    live: 'https://heritagefamilyrest.com/',
  },
  {
    id: 4,
    title: 'LCPMT Website',
    description: 'SEO-focused website for a Leo Club showcasing completed and upcoming community service projects, with a board member admin panel for content management.',
    tech: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Supabase'],
    github: 'https://github.com/disath-liyanage/LCPMT-website',
    live: null,
  },
  {
    id: 5,
    title: 'Personal Portfolio Website',
    description: 'A responsive personal portfolio website showcasing projects, skills, and contact information with structured content and SEO-optimized implementation for better discoverability.',
    tech: ['React', 'Vite', 'CSS Modules', 'SEO'],
    github: 'https://github.com/disath-liyanage/disath-portfolio',
    live: 'https://disathliyanage.com',
  },
  {
    id: 6,
    title: 'OceaVia',
    description: 'A responsive awareness platform supporting UN SDG 14 - Life Below Water, with structured content, smooth navigation, and accessibility-focused implementation.',
    tech: ['Figma', 'UI/UX Design'],
    github: 'https://github.com/disath-liyanage/OceaVia-Website',
    live: 'https://disath-liyanage.github.io/OceaVia-Website/',
  },
  {
    id: 7,
    title: 'Agri Guide',
    description: 'An innovative farming assistance app UI/UX concept designed in Figma to help farmers maximize harvest and reduce losses using practical guidance.',
    tech: ['Python', 'TensorFlow', 'Keras', 'NumPy'],
    github: null,
    live: 'https://www.figma.com/proto/OHTMHKOPT4xmmnnuMXiwAF/AgriGuide?node-id=0-1&t=M0fWFkKwpwlsn9mz-1',
  },
  {
    id: 8,
    title: 'Task Manager',
    description: 'A Python-based task manager with add, update, and priority organization features (high, medium, low) for efficient daily workload management.',
    tech: ['Python'],
    github: 'https://github.com/disath-liyanage/Personal-Task-Manager',
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
  
  const displayItems = PROJECTS.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);
  const measuringItems = PROJECTS.slice(0, PER_PAGE);

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
        
        <div className="projects-carousel-wrapper">
          
          <div className="projects-grid measuring-stick" aria-hidden="true">
            {measuringItems.map((proj) => (
              <ProjectCard key={`measure-${proj.id}`} project={proj} />
            ))}
          </div>

          <div className={`projects-grid active-layer animate-swipe-${direction}`} key={page}>
            {displayItems.map((proj) => (
              <ProjectCard key={proj.id} project={proj} />
            ))}
          </div>

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