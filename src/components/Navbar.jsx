import { useEffect, useRef, useState } from 'react'
import styles from './Navbar.module.css'
import glass from './liquidGlass.module.css'

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

function Navbar() {
  const navRef = useRef(null)
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  // Cheap "liquid glass" specular highlight that follows the pointer,
  // done with a CSS custom property instead of a per-pixel WebGL shader.
  useEffect(() => {
    const el = navRef.current
    if (!el) return
    const handleMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      el.style.setProperty('--pointer-x', `${x}%`)
    }
    el.addEventListener('pointermove', handleMove)
    return () => el.removeEventListener('pointermove', handleMove)
  }, [])

  // Track which section is in view to highlight the active link.
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

  return (
    <header className={styles.wrap}>
      <nav ref={navRef} className={`${styles.glass} ${glass.liquidGlass}`} aria-label="Primary">
        <a href="#home" className={styles.logo} onClick={handleLinkClick}>
          DL
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
