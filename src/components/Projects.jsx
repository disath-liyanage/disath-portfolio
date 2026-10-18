import { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
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
    slug: '3ds-system',
    title: '3D\'s Distributors System',
    description: 'Business management platform for a live distribution company: invoice approvals, collections, auto-generated payroll, stock, expenses and reports, with role-based access.',
    tech: ['Next.js 14', 'TypeScript', 'Supabase', 'Turborepo', 'Tailwind CSS'],
    github: 'https://github.com/disath-liyanage/3ds-system',
    live: 'https://www.3dsdis.com',
    details: {
      tagline: 'A full sales, collections and payroll system for a distribution company, in production for 6+ months.',
      role: 'Full-stack developer',
      status: 'Live for 6+ months',
      stats: ['~10 workers', '5-6 users', '10-30 invoices/day'],
      overview: 'A business management platform built for 3D\'s Distributors (PVT) Ltd. It handles the whole sales cycle for admins, managers, sales reps and drivers: invoice requests and approvals, out-of-stock handling through supplier orders, customer collections with cheque reminders, automatic payroll with commissions and incentives, expenses and profit tracking, a product photo gallery for use in front of customers, and configurable reports. It has been running in production for over six months.',
      sections: [
        {
          heading: 'Sales dashboard',
          text: 'Managers see performance at a glance without opening a report.',
          bullets: [
            'Animated progress bars showing each sales rep\'s sales against their target',
            'Cards for today\'s orders, today\'s collections and low stock',
          ],
        },
        {
          heading: 'Invoice requests and approval',
          bullets: [
            'Sales reps request invoices',
            'Managers and admins approve, reject, or edit the added products and then approve',
            'Reps can add out-of-stock items to a request, but managers cannot approve those lines as they stand',
          ],
        },
        {
          heading: 'Out-of-stock handling and supplier orders',
          text: 'Instead of blocking the invoice, the manager can send the shortage to the supplier.',
          bullets: [
            'A "send to supplier" option moves the short quantity into the supplier orders table, under that supplier\'s name',
            'Out-of-stock quantities are highlighted in a separate colour so managers and admins spot them immediately',
          ],
        },
        {
          heading: 'Collections',
          bullets: [
            'Sales reps and drivers record customer collections',
            'The manager selects which user made each collection, which feeds commission',
            'Cheque deposit dates entered during collection trigger notifications for managers',
          ],
        },
        {
          heading: 'Payroll and salary slips',
          text: 'Salary slips are generated automatically for every worker.',
          bullets: [
            'Basic salary + sales commission + collection commission',
            'Target incentives when the target is achieved',
            'Attendance incentives based on recorded attendance',
            'EPF/ETF compliance',
            'Loans spread over a number of months chosen by the manager, and salary advances before payday',
          ],
        },
        {
          heading: 'Notifications',
          bullets: [
            'Managers are notified when a sales rep adds an invoice or a customer',
            'Managers are notified on the cheque deposit date set during a collection',
          ],
        },
        {
          heading: 'Product gallery and cart',
          text: 'Built for reps in front of a customer.',
          bullets: [
            'Managers and admins upload product photos',
            'Reps show the photos to the customer and add quantities to a cart',
            'Checkout opens the new-invoice page prefilled with the cart, where items can still be edited or removed',
          ],
        },
        {
          heading: 'Expenses and profit',
          bullets: [
            'Expenses recorded against a selected user',
            'Expense reports, and profit calculated from sales and expenses',
          ],
        },
        {
          heading: 'Reports',
          text: 'Sales, customer and stock reports, each adjustable with its own filters.',
        },
        {
          heading: 'Admin tools',
          bullets: [
            'Database backups',
            'User and worker management with role-based access',
          ],
        },
        {
          heading: 'Variants',
          text: 'The core was reused for two other clients.',
          bullets: [
            'Lite version: managers and admins only, no sales-rep invoice requests, no payroll or attendance',
            'Manufacturing version: manufactured and distributed products invoiced to the same customer',
          ],
        },
      ],
    },
  },
  {
    id: 2,
    title: 'Nymo.lk',
    description: 'Leading development of Nymo, a unified apparel e-commerce platform for underrated sellers, including a responsive storefront and vendor dashboard focused on clean UI, smooth navigation, and accessibility.',
    tech: ['React', 'Next.js', 'Express', 'PostgreSQL'],
    github: 'https://github.com/isblu/Nymo',
    live: 'https://preview.store.nymo.lk/',
  },
  {
    id: 3,
    title: 'Leo Club of Pannipitiya Metro Titans Website',
    description: 'SEO-focused website for a Leo Club showcasing completed and upcoming community service projects, with a board member admin panel for content management.',
    tech: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Resend', 'Cloudflare Email Routing', 'Supabase', 'SEO'],
    github: 'https://github.com/disath-liyanage/LCPMT-website',
    live: 'https://www.titanleos.org',
  },
  {
    id: 4,
    slug: 'lensy',
    title: 'Lensy',
    description: 'Contact lens wear tracker for Mac and iOS: a timer that survives restarts, wear reports, cloud sync, and Siri and Shortcuts support.',
    tech: ['SwiftUI', 'SwiftData', 'Supabase', 'Siri', 'Shortcuts'],
    github: null,
    live: null,
    details: {
      tagline: 'A native Apple app for tracking how long you wear your contact lenses.',
      role: 'Developer',
      status: 'In development',
      overview: 'Lensy tracks contact lens wear time. You start a timer when you put your lenses in and stop it when you take them out, and each session is saved so you can review your wear history later through built-in reports. The timer keeps running if the app is quit and reopened, and the Mac app also lives in the menu bar while a timer is active. Data is stored locally with SwiftData and synced through Supabase so the Mac and iOS versions stay in step. Siri and Shortcuts support lets you control it without opening the app. The Mac version comes first, with iOS to follow.',
      sections: [
        {
          heading: 'Features',
          bullets: [
            'Wear timer that survives quitting and reopening the app',
            'Every stopped session is saved as a record to review later',
            'Reports on wear history',
            'Menu bar item while a timer is running',
            'Siri and Apple Shortcuts integration',
            'Local storage with SwiftData, synced across devices with Supabase',
          ],
        },
        {
          heading: 'Platforms',
          bullets: [
            'macOS first, built with SwiftUI',
            'iOS version planned next',
          ],
        },
      ],
    },
  },
  {
    id: 5,
    title: 'Heritage Family Restaurant Website',
    description: 'Restaurant website with an authenticated admin dashboard for managing menu items, pricing, and content, built with SEO optimization for local search discoverability.',
    tech: ['Next.js 14', 'Supabase', 'Tailwind CSS', 'Google Cloud Console', 'SEO'],
    github: 'https://github.com/disath-liyanage/heritage-website',
    live: 'https://heritagefamilyrest.com/',
  },
  {
    id: 6,
    title: 'Personal Portfolio Website',
    description: 'A responsive personal portfolio website showcasing projects, skills, and contact information with structured content and SEO-optimized implementation for better discoverability.',
    tech: ['React', 'Vite', 'CSS Modules', 'SEO'],
    github: 'https://github.com/disath-liyanage/disath-portfolio',
    live: 'https://www.disath.dev',
  },
];

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
          {project.details ? (
            <Link
              to={`/projects/${project.slug}`}
              className="proj-btn proj-btn-live"
              aria-label={`Learn more about ${project.title}`}
            >
              Learn more →
            </Link>
          ) : (
            <>
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
                  Preview
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  useEffect(() => {
    if (window.location.hash === '#projects') {
      document.getElementById('projects')?.scrollIntoView();
    }
  }, []);

  return (
    <section id="projects" className="projects-section">
      <h2 className="projects-heading">Projects</h2>

      <div className="projects-layout">
        <div className="projects-carousel-wrapper">
          <div className="projects-grid">
            {PROJECTS.map((proj) => (
              <ProjectCard key={proj.id} project={proj} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProjectPage() {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.slug === slug && p.details);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  useEffect(() => {
    if (!project) return;
    const prevTitle = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute('content');
    document.title = `${project.title} | Disath Liyanage`;
    meta?.setAttribute('content', project.details.tagline || project.description);
    return () => {
      document.title = prevTitle;
      if (meta && prevDesc) meta.setAttribute('content', prevDesc);
    };
  }, [project]);

  if (!project) return <Navigate to="/" replace />;

  const d = project.details;
  const sections = d.sections || [];
  const others = PROJECTS.filter((p) => p.details && p.slug !== project.slug);

  return (
    <main className="proj-page">
      <Link to="/#projects" className="proj-page_back">← All projects</Link>

      <header className="proj-page_header">
        <h1>{project.title}</h1>
        {d.tagline && <p className="proj-page_tagline">{d.tagline}</p>}
        {(d.role || d.status) && (
          <p className="proj-page_meta">{[d.role, d.status].filter(Boolean).join(' - ')}</p>
        )}

        {d.stats && (
          <div className="proj-card_pills">
            {d.stats.map((s) => <span key={s} className="tech-pill">{s}</span>)}
          </div>
        )}

        <div className="proj-card_links">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="proj-btn proj-btn-gh">
              <GitHubIcon /> GitHub
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="proj-btn proj-btn-live">
              <ExternalLinkIcon /> Preview
            </a>
          )}
        </div>
      </header>

      <section className="proj-page_section">
        <h2>Overview</h2>
        <p>{d.overview || project.description}</p>
      </section>

      <section className="proj-page_section">
        <h2>Tech stack</h2>
        <div className="proj-card_pills">
          {project.tech.map((t) => <span key={t} className="tech-pill">{t}</span>)}
        </div>
      </section>

      {sections.map((s) => (
        <section key={s.heading} className="proj-page_section">
          <h2>{s.heading}</h2>
          {s.text && <p>{s.text}</p>}
          {s.bullets && (
            <ul>{s.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
          )}
          {s.images && (
            <div className="proj-page_images">
              {s.images.map((img) => (
                <figure key={img.src}>
                  <img src={img.src} alt={img.caption || s.heading} loading="lazy" />
                  {img.caption && <figcaption>{img.caption}</figcaption>}
                </figure>
              ))}
            </div>
          )}
        </section>
      ))}

      {others.length > 0 && (
        <nav className="proj-page_more" aria-label="More projects">
          <h2>More projects</h2>
          <div className="proj-card_links">
            {others.map((p) => (
              <Link key={p.slug} to={`/projects/${p.slug}`} className="proj-btn proj-btn-live">
                {p.title}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </main>
  );
}