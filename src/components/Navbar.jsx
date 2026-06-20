import { useEffect, useState } from 'react'
import styles from './Navbar.module.css'
import logo from '../assets/logo.png'

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' }
]

function Navbar() {
  const [active, setActive] = useState('home')
  const [pastHero, setPastHero] = useState(false)

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

  return (
    <header className={`${styles.wrap} ${pastHero ? styles.visible : ''}`}>
      {/* FIX: Removed liquidGlass entirely */}
      <nav className={styles.glass} aria-label="Primary">
        <a href="#home" className={styles.logo} aria-label="Home">
          <img src={logo} alt="Disath Liyanage" width="32" height="32" />
        </a>

        <div className={styles.links}>
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={active === link.id ? styles.active : ''}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Navbar