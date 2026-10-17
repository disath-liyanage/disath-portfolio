import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import GlassFilter from '../../components/GlassFilter'
import MorphFilter from '../../components/MorphFilter'
import Footer from '../../components/Footer'
import '../../components/Projects.css'

export default function Lensy() {
  useEffect(() => {
    window.scrollTo(0, 0)
    const prevTitle = document.title
    const meta = document.querySelector('meta[name="description"]')
    const prevDesc = meta?.getAttribute('content')

    document.title = "Lensy | Disath Liyanage"
    meta?.setAttribute('content', "A native Apple app for tracking how long you wear your contact lenses.")

    return () => {
      document.title = prevTitle
      if (meta && prevDesc) meta.setAttribute('content', prevDesc)
    }
  }, [])

  const tech = ['SwiftUI', 'SwiftData', 'Supabase', 'Siri', 'Shortcuts']

  return (
    <>
      <GlassFilter />
      <MorphFilter />

      <main className="proj-page">
        <Link to="/#projects" className="proj-page_back">← All projects</Link>

        <header className="proj-page_header">
          <h1>Lensy</h1>
          <p className="proj-page_tagline">
            A native Apple app for tracking how long you wear your contact lenses.
          </p>
          <p className="proj-page_meta">Developer — In development</p>
        </header>

        <section className="proj-page_section">
          <h2>Overview</h2>
          <p>
            Lensy tracks contact lens wear time. You start a timer when you put your lenses in and stop it when you take them out, and each session is saved so you can review your wear history later through built-in reports. The timer keeps running if the app is quit and reopened, and the Mac app also lives in the menu bar while a timer is active. Data is stored locally with SwiftData and synced through Supabase so the Mac and iOS versions stay in step. Siri and Shortcuts support lets you control it without opening the app. The Mac version comes first, with iOS to follow.
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
          <h2>Features</h2>
          <ul>
            <li>Wear timer that survives quitting and reopening the app</li>
            <li>Every stopped session is saved as a record to review later</li>
            <li>Reports on wear history</li>
            <li>Menu bar item while a timer is running</li>
            <li>Siri and Apple Shortcuts integration</li>
            <li>Local storage with SwiftData, synced across devices with Supabase</li>
          </ul>
        </section>

        <section className="proj-page_section">
          <h2>Platforms</h2>
          <ul>
            <li>macOS first, built with SwiftUI</li>
            <li>iOS version planned next</li>
          </ul>
        </section>

        <nav className="proj-page_more" aria-label="More projects">
          <h2>More projects</h2>
          <div className="proj-card_links">
            <Link to="/projects/3ds-system" className="proj-btn proj-btn-live">
              3D's Distributors System →
            </Link>
          </div>
        </nav>
      </main>

      <Footer />
    </>
  )
}
