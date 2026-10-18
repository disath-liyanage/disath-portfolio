import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GlassFilter from '../../components/GlassFilter'
import MorphFilter from '../../components/MorphFilter'
import Footer from '../../components/Footer'
import { ShotSlider } from './3ds-System'
import '../../components/Projects.css'

const timer = '/images/Lensy/timer.png'
const timer_shot = (caption, src = timer, desc = '') => ({ src, caption, desc })

const history = '/images/Lensy/history.png'
const history_shot = (caption, src = history, desc = '') => ({ src, caption, desc })

const reports = '/images/Lensy/reports.png'
const reports_shot = (caption, src = reports, desc = '') => ({ src, caption, desc })

const siri = '/images/Lensy/siri.png'
const siri_shot = (caption, src = siri, desc = '') => ({ src, caption, desc })

const shortcuts = '/images/Lensy/shortcuts.png'
const shortcuts_shot = (caption, src = shortcuts, desc = '') => ({ src, caption, desc })

const LENSY_SIZE = [2655, 1724]

const stats = [
  { value: 'macOS', label: 'Complete' },
  { value: 'iOS', label: 'Up next' },
  { value: 'Native', label: 'SwiftUI' },
]

const tech = [
  { name: 'SwiftUI', tag: 'Interface', mark: 'SU', icon: 'swift', role: 'Native interface for the Mac app, with iOS to follow' },
  { name: 'SwiftData', tag: 'Storage', mark: 'SD', glyph: 'database', role: 'Local storage for every wear session' },
  { name: 'Supabase', tag: 'Sync', mark: 'SB', icon: 'supabase', role: 'Keeps the Mac and iOS versions in step' },
  { name: 'Siri', tag: 'Voice', mark: 'Si', glyph: 'siri', role: 'Control the timer without opening the app' },
  { name: 'Shortcuts', tag: 'Automation', mark: 'SC', glyph: 'shortcuts', role: 'Apple Shortcuts integration for the timer' },
]

const features = [
  {
    heading: 'Wear timer',
    bullets: [
      'Start the timer when you put your lenses in and stop it when you take them out',
      'The timer keeps running if the app is quit and reopened',
      'On the Mac, a menu bar item shows while a timer is active',
    ],
    shots: [timer_shot('Wear timer', timer)],
  },
  {
    heading: 'History and reports',
    bullets: [
      'Every stopped session is saved as a record',
      'Built-in reports let you review your wear history later',
    ],
    shots: [history_shot('History', history), reports_shot('Reports', reports)],
  },
  {
    heading: 'Siri and Shortcuts',
    text: 'Control the timer without opening the app.',
    shots: [siri_shot('Siri', siri), shortcuts_shot('Shortcuts', shortcuts)],
  },
  {
    heading: 'Storage and sync',
    bullets: [
      'Data is stored locally with SwiftData',
      'Synced through Supabase so the Mac and iOS versions stay in step',
    ],
  },
]

const svgProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const ArrowIcon = ({ dir }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" {...svgProps}>
    <line x1={dir === 'right' ? 4 : 20} y1="12" x2={dir === 'right' ? 19 : 5} y2="12" />
    <polyline points={dir === 'right' ? '13 6 19 12 13 18' : '11 6 5 12 11 18'} />
  </svg>
)

const glyphProps = {
  width: 26,
  height: 26,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: '#fff',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  className: 'proj-tech_logo',
}

const glyphs = {
  siri: (
    <svg {...glyphProps} strokeWidth={2.4}>
      <line x1="4" y1="10" x2="4" y2="14" />
      <line x1="8" y1="7" x2="8" y2="17" />
      <line x1="12" y1="4" x2="12" y2="20" />
      <line x1="16" y1="7" x2="16" y2="17" />
      <line x1="20" y1="10" x2="20" y2="14" />
    </svg>
  ),
  shortcuts: (
    <svg {...glyphProps}>
      <rect x="3" y="3" width="12" height="12" rx="3" />
      <rect x="9" y="9" width="12" height="12" rx="3" />
    </svg>
  ),
  database: (
    <svg {...glyphProps}>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
      <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
    </svg>
  ),
}

function TechIcon({ icon, glyph, mark }) {
  const [failed, setFailed] = useState(false)

  let content
  if (glyph && glyphs[glyph]) {
    content = glyphs[glyph]
  } else if (icon && !failed) {
    content = (
      <img
        className="proj-tech_logo"
        src={`https://cdn.simpleicons.org/${icon}/ffffff`}
        alt=""
        loading="lazy"
        onError={() => setFailed(true)}
      />
    )
  } else {
    content = <span className="proj-tech_mark">{mark}</span>
  }

  return <span className="proj-tech_icon">{content}</span>
}

export default function Lensy() {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
    const prevTitle = document.title
    const meta = document.querySelector('meta[name="description"]')
    const prevDesc = meta?.getAttribute('content')
    const canonical = document.querySelector('link[rel="canonical"]')
    const prevCanonical = canonical?.getAttribute('href')

    document.title = 'Lensy | Disath Liyanage'
    meta?.setAttribute('content', 'A native Apple app for tracking how long you wear your contact lenses.')
    canonical?.setAttribute('href', 'https://www.disath.dev/projects/lensy')

    return () => {
      document.title = prevTitle
      if (meta && prevDesc) meta.setAttribute('content', prevDesc)
      if (canonical && prevCanonical) canonical.setAttribute('href', prevCanonical)
    }
  }, [])

  const backToProjects = (e) => {
    e.preventDefault()
    navigate('/')
    let tries = 0
    const scrollToProjects = () => {
      const el = document.getElementById('projects')
      if (el) {
        el.scrollIntoView({ block: 'start' })
      } else if (tries < 40) {
        tries += 1
        setTimeout(scrollToProjects, 50)
      }
    }
    setTimeout(scrollToProjects, 50)
  }

  return (
    <>
      <GlassFilter />
      <MorphFilter />

      <main className="proj-page">
        <Link to="/#projects" className="proj-page_back" onClick={backToProjects}>
          <ArrowIcon dir="left" /> Back to All projects
        </Link>

        <header className="proj-page_header">
          <h1>Lensy</h1>
          <p className="proj-page_tagline">
            A native Apple app for tracking how long you wear your contact lenses.
          </p>
          <p className="proj-page_meta">Developer</p>

          <div className="proj-stats">
            {stats.map((s) => (
              <div key={s.label} className="proj-stat">
                <span className="proj-stat_value">{s.value}</span>
                <span className="proj-stat_label">{s.label}</span>
              </div>
            ))}
          </div>
        </header>

        <section className="proj-sec">
          <h2 className="proj-sec_title">Overview</h2>
          <p className="proj-sec_text">
            Lensy tracks contact lens wear time. You start a timer when you put your lenses in and stop it when you take them out, and each session is saved so you can review your wear history later through built-in reports. The timer keeps running if the app is quit and reopened, and the Mac app also lives in the menu bar while a timer is active. Data is stored locally with SwiftData and synced through Supabase so the Mac and iOS versions stay in step. Siri and Shortcuts support lets you control it without opening the app. The Mac app is complete, with iOS to follow.
          </p>
        </section>

        <section className="proj-sec">
          <h2 className="proj-sec_title">Tech stack</h2>
          <div className="proj-tech">
            {tech.map((t) => (
              <div key={t.name} className="proj-tech_item">
                <div className="proj-tech_top">
                  <TechIcon icon={t.icon} glyph={t.glyph} mark={t.mark} />
                  <span className="proj-tech_tag">{t.tag}</span>
                </div>
                <div className="proj-tech_body">
                  <span className="proj-tech_name">{t.name}</span>
                  <p className="proj-tech_role">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="proj-sec">
          <h2 className="proj-sec_title">Features</h2>
          <div className="proj-groups">
            {features.map((f) => (
              <div key={f.heading} className="proj-group">
                <h3 className="proj-group_title">{f.heading}</h3>
                {f.text && <p className="proj-sec_text">{f.text}</p>}
                {f.bullets && (
                  <ul className="proj-sec_list">
                    {f.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
                {f.shots && <ShotSlider shots={f.shots} size={LENSY_SIZE} />}
              </div>
            ))}
          </div>
        </section>

        <section className="proj-sec">
          <h2 className="proj-sec_title">Platforms</h2>
          <div className="proj-variants">
            <div className="proj-variants_item">
              <h3>macOS</h3>
              <p>Complete, built with SwiftUI, including the menu bar item.</p>
            </div>
            <div className="proj-variants_item">
              <h3>iOS</h3>
              <p>Up next, kept in step with the Mac app through sync.</p>
            </div>
          </div>
        </section>

        <nav className="proj-next proj-next-prev" aria-label="Previous project">
          <span className="proj-next_label">Previous project</span>
          <Link to="/projects/3ds-system" className="proj-next_btn">
            <ArrowIcon dir="left" /> 3D's Distributors System
          </Link>
        </nav>
      </main>

      <Footer />
    </>
  )
}