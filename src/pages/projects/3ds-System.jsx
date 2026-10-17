import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import GlassFilter from '../../components/GlassFilter'
import MorphFilter from '../../components/MorphFilter'
import Footer from '../../components/Footer'
import '../../components/Projects.css'

const GitHubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387 .599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416 -.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997 .107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23 .653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12 c0-6.627-5.373-12-12-12z" />
  </svg>
)

const ExternalLinkIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

export default function DistributionSystem() {
  useEffect(() => {
    window.scrollTo(0, 0)
    const prevTitle = document.title
    const meta = document.querySelector('meta[name="description"]')
    const prevDesc = meta?.getAttribute('content')

    document.title = "3D's Distributors System | Disath Liyanage"
    meta?.setAttribute('content', "A full sales, collections and payroll system for a distribution company, in production for 6+ months.")

    return () => {
      document.title = prevTitle
      if (meta && prevDesc) meta.setAttribute('content', prevDesc)
    }
  }, [])

  const tech = ['Next.js 14', 'TypeScript', 'Supabase', 'Turborepo', 'Tailwind CSS']
  const stats = ['~10 workers', '5-6 users', '10-30 invoices/day']

  return (
    <>
      <GlassFilter />
      <MorphFilter />

      <main className="proj-page">
        <Link to="/#projects" className="proj-page_back">← All projects</Link>

        <header className="proj-page_header">
          <h1>3D's Distributors System</h1>
          <p className="proj-page_tagline">
            A full sales, collections and payroll system for a distribution company, in production for 6+ months.
          </p>
          <p className="proj-page_meta">Full-stack developer — Live for 6+ months</p>

          <div className="proj-card_pills">
            {stats.map((s) => (
              <span key={s} className="tech-pill">{s}</span>
            ))}
          </div>

          <div className="proj-card_links">
            <a
              href="https://github.com/disath-liyanage/3ds-system"
              target="_blank"
              rel="noopener noreferrer"
              className="proj-btn proj-btn-gh"
            >
              <GitHubIcon /> GitHub
            </a>
            <a
              href="https://www.3dsdis.com"
              target="_blank"
              rel="noopener noreferrer"
              className="proj-btn proj-btn-live"
            >
              <ExternalLinkIcon /> Preview
            </a>
          </div>
        </header>

        <section className="proj-page_section">
          <h2>Overview</h2>
          <p>
            A business management platform built for 3D's Distributors (PVT) Ltd. It handles the whole sales cycle for admins, managers, sales reps and drivers: invoice requests and approvals, out-of-stock handling through supplier orders, customer collections with cheque reminders, automatic payroll with commissions and incentives, expenses and profit tracking, a product photo gallery for use in front of customers, and configurable reports. It has been running in production for over six months.
          </p>
        </section>

        <section className="proj-page_section">
          <h2>Tech stack</h2>
          <div className="proj-card_pills">
            {tech.map((t) => (
              <span key={t} className="tech-pill">{t}</span>
            ))}
          </div>
        </section>

        <section className="proj-page_section">
          <h2>Sales dashboard</h2>
          <p>Managers see performance at a glance without opening a report.</p>
          <ul>
            <li>Animated progress bars showing each sales rep's sales against their target</li>
            <li>Cards for today's orders, today's collections and low stock</li>
          </ul>
        </section>

        <section className="proj-page_section">
          <h2>Invoice requests and approval</h2>
          <ul>
            <li>Sales reps request invoices</li>
            <li>Managers and admins approve, reject, or edit the added products and then approve</li>
            <li>Reps can add out-of-stock items to a request, but managers cannot approve those lines as they stand</li>
          </ul>
        </section>

        <section className="proj-page_section">
          <h2>Out-of-stock handling and supplier orders</h2>
          <p>Instead of blocking the invoice, the manager can send the shortage to the supplier.</p>
          <ul>
            <li>A "send to supplier" option moves the short quantity into the supplier orders table, under that supplier's name</li>
            <li>Out-of-stock quantities are highlighted in a separate colour so managers and admins spot them immediately</li>
          </ul>
        </section>

        <section className="proj-page_section">
          <h2>Collections</h2>
          <ul>
            <li>Sales reps and drivers record customer collections</li>
            <li>The manager selects which user made each collection, which feeds commission</li>
            <li>Cheque deposit dates entered during collection trigger notifications for managers</li>
          </ul>
        </section>

        <section className="proj-page_section">
          <h2>Payroll and salary slips</h2>
          <p>Salary slips are generated automatically for every worker.</p>
          <ul>
            <li>Basic salary + sales commission + collection commission</li>
            <li>Target incentives when the target is achieved</li>
            <li>Attendance incentives based on recorded attendance</li>
            <li>EPF/ETF compliance</li>
            <li>Loans spread over a number of months chosen by the manager, and salary advances before payday</li>
          </ul>
        </section>

        <section className="proj-page_section">
          <h2>Notifications</h2>
          <ul>
            <li>Managers are notified when a sales rep adds an invoice or a customer</li>
            <li>Managers are notified on the cheque deposit date set during a collection</li>
          </ul>
        </section>

        <section className="proj-page_section">
          <h2>Product gallery and cart</h2>
          <p>Built for reps in front of a customer.</p>
          <ul>
            <li>Managers and admins upload product photos</li>
            <li>Reps show the photos to the customer and add quantities to a cart</li>
            <li>Checkout opens the new-invoice page prefilled with the cart, where items can still be edited or removed</li>
          </ul>
        </section>

        <section className="proj-page_section">
          <h2>Expenses and profit</h2>
          <ul>
            <li>Expenses recorded against a selected user</li>
            <li>Expense reports, and profit calculated from sales and expenses</li>
          </ul>
        </section>

        <section className="proj-page_section">
          <h2>Reports</h2>
          <p>Sales, customer and stock reports, each adjustable with its own filters.</p>
        </section>

        <section className="proj-page_section">
          <h2>Admin tools</h2>
          <ul>
            <li>Database backups</li>
            <li>User and worker management with role-based access</li>
          </ul>
        </section>

        <section className="proj-page_section">
          <h2>Variants</h2>
          <p>The core was reused for two other clients.</p>
          <ul>
            <li>Lite version: managers and admins only, no sales-rep invoice requests, no payroll or attendance</li>
            <li>Manufacturing version: manufactured and distributed products invoiced to the same customer</li>
          </ul>
        </section>

        <nav className="proj-page_more" aria-label="More projects">
          <h2>More projects</h2>
          <div className="proj-card_links">
            <Link to="/projects/lensy" className="proj-btn proj-btn-live">
              Lensy →
            </Link>
          </div>
        </nav>
      </main>

      <Footer />
    </>
  )
}
