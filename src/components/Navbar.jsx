import { useEffect, useRef, useState } from 'react'
import styles from './Navbar.module.css'
import glass from './liquidGlass.module.css'
import logo from '../assets/logo.png'

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

function Navbar() {
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [pastHero, setPastHero] = useState(false)
  const glassRef = useRef(null)
  const frame = useRef(null)

  useEffect(() => {
    const hero = document.getElementById('home')
    if (!hero) {
      setPastHero(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { rootMargin: '-80% 0px 0px 0px' }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean)
    if (!sections.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const handleLinkClick = () => setMenuOpen(false)

  const handleMouseMove = (e) => {
    const el = glassRef.current
    if (!el) return
    const { clientX, clientY } = e
    if (frame.current) cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect()
      const x = ((clientX - rect.left) / rect.width) * 100
      const y = ((clientY - rect.top) / rect.height) * 100
      el.style.setProperty('--mx', `${x}%`)
      el.style.setProperty('--my', `${y}%`)
    })
  }

  const handleMouseLeave = () => {
    const el = glassRef.current
    if (!el) return
    el.style.setProperty('--mx', '50%')
    el.style.setProperty('--my', '0%')
  }

  return (
    <header className={`${styles.wrap} ${pastHero ? styles.visible : ''}`}>
      <nav
        ref={glassRef}
        className={`${styles.glass} ${glass.liquidGlass}`}
        aria-label="Primary"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <a href="#home" className={styles.logo} onClick={handleLinkClick} aria-label="Home">
          <img src={logo} alt="Disath Liyanage" width="32" height="32" />
        </a>

        <ul className={`${styles.links} ${menuOpen ? styles.linksOpen : ''}`}>
  {LINKS.map((link) => (
    <li key={link.id}>
      <a
        href={`#${link.id}`}
        className={active === link.id ? styles.active : ''}
        onClick={handleLinkClick}
      >
        {link.label}
      </a>
    </li>
  ))}
</ul>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </nav>
    </header>
  )
}

export default Navbar