import { useCallback, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import styles from './Skills.module.css'

gsap.registerPlugin(SplitText)

const SKILLS = {
  Frontend: [
    'React',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'HTML & CSS',
    'GSAP',
    'Vite',
    'Tailwind CSS',
  ],

  'Backend & Data': [
    'Node.js',
    'Express',
    'REST APIs',
    'Supabase',
    'PostgreSQL',
    'Python',
    'Java',
  ],
  'Mobile & Desktop': [
    'Swift',
    'SwiftUI',
    'SwiftData',
    'React Native',
    'Figma',
  ],
  'Tools & Services': [
    'Git & GitHub',
    'Vercel',
    'SEO',
    'Google Places API',
    'Turborepo',
    'Resend',
    'Cloudflare Email Routing',
  ],
};

const TABS = Object.keys(SKILLS)

const DURATION = 0.4
const STAGGER = 0.05
const OVERLAP = '<0.2'
const Y_OFFSET = 110

function Skills() {
  const activeIndexRef = useRef(0)
  const isAnimatingRef = useRef(false)
  const queuedIndexRef = useRef(null)
  const tlRef = useRef(null)
  const splitsRef = useRef([])
  const panelsRef = useRef([])
  const btnRefs = useRef([])
  const sectionRef = useRef(null)
  const timerRef = useRef(null)
  const switchTabRef = useRef(null)

  const switchTab = useCallback((nextIndex) => {
    const prevIndex = activeIndexRef.current
    if (nextIndex === prevIndex) return

    if (isAnimatingRef.current) {
      queuedIndexRef.current = nextIndex
      return
    }

    isAnimatingRef.current = true

    btnRefs.current.forEach((btn, i) => {
      if (!btn) return
      btn.classList.toggle(styles.active, i === nextIndex)
    })

    const prevPanel = panelsRef.current[prevIndex]
    const nextPanel = panelsRef.current[nextIndex]
    const currentLines = splitsRef.current[prevIndex]?.lines
    const nextLines = splitsRef.current[nextIndex]?.lines

    panelsRef.current.forEach((panel, i) => {
      if (!panel) return
      if (i !== prevIndex && i !== nextIndex) {
        gsap.set(panel, { opacity: 0, pointerEvents: 'none' })
      }
    })

    if (!currentLines || !nextLines) {
      if (prevPanel) gsap.set(prevPanel, { opacity: 0, pointerEvents: 'none' })
      if (nextPanel) gsap.set(nextPanel, { opacity: 1, pointerEvents: 'auto' })
      activeIndexRef.current = nextIndex
      isAnimatingRef.current = false
      return
    }

    if (prevPanel) gsap.set(prevPanel, { opacity: 1, pointerEvents: 'none' })
    if (nextPanel) gsap.set(nextPanel, { opacity: 1, pointerEvents: 'auto' })

    gsap.killTweensOf(currentLines)
    gsap.killTweensOf(nextLines)
    gsap.set(currentLines, { yPercent: 0, opacity: 1 })
    gsap.set(nextLines, { yPercent: Y_OFFSET, opacity: 1 })

    tlRef.current?.kill()

    tlRef.current = gsap.timeline({
      onComplete: () => {
        if (prevPanel) gsap.set(prevPanel, { opacity: 0, pointerEvents: 'none' })
        activeIndexRef.current = nextIndex
        isAnimatingRef.current = false

        if (
          queuedIndexRef.current !== null &&
          queuedIndexRef.current !== activeIndexRef.current
        ) {
          const q = queuedIndexRef.current
          queuedIndexRef.current = null
          switchTabRef.current?.(q)
        }
      },
    })

    tlRef.current.to(currentLines, {
      yPercent: -Y_OFFSET,
      duration: DURATION,
      stagger: STAGGER,
      ease: 'power1.in',
    })

    tlRef.current.to(
      nextLines,
      {
        yPercent: 0,
        duration: DURATION,
        stagger: STAGGER,
        ease: 'power1.out',
      },
      OVERLAP
    )
  }, [])

  useEffect(() => {
    switchTabRef.current = switchTab
    let cancelled = false

    const init = async () => {
      if (document.fonts?.ready) {
        await document.fonts.ready
      }
      if (cancelled) return

      const panels = panelsRef.current

      splitsRef.current = panels.map((el, i) => {
        if (!el) return null
        const textNodes = el.querySelectorAll('.' + styles.skillText)

        return SplitText.create(textNodes, {
          type: 'lines',
          mask: 'lines',
          linesClass: styles.splitLine,
          autoSplit: true,
          onSplit(self) {
            const isActive = i === activeIndexRef.current
            gsap.set(el, {
              opacity: isActive ? 1 : 0,
              pointerEvents: isActive ? 'auto' : 'none',
            })
            gsap.set(self.lines, {
              yPercent: isActive ? 0 : Y_OFFSET,
              opacity: 1,
            })
          },
        })
      })

      timerRef.current = setInterval(() => {
        if (document.hidden) return
        const nextIndex = (activeIndexRef.current + 1) % TABS.length
        switchTab(nextIndex)
      }, 3000)
    }

    init()

    return () => {
      cancelled = true
      tlRef.current?.kill()
      splitsRef.current.forEach((s) => s?.revert?.())
      splitsRef.current = []
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [switchTab])

  const handleManualClick = (index) => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    switchTab(index)
  }

  return (
    <section id="skills" className={styles.skills} ref={sectionRef}>
      <div className={styles.tabs}>
        {TABS.map((tab, i) => (
          <button
            key={tab}
            ref={(el) => (btnRefs.current[i] = el)}
            className={`${styles.tab} ${i === 0 ? styles.active : ''}`}
            onClick={() => handleManualClick(i)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={styles.contentWrapper}>
        {TABS.map((tab, i) => (
          <div
            key={tab}
            ref={(el) => (panelsRef.current[i] = el)}
            className={`${styles.panel} ${tab === 'Soft Skills' ? styles.wideGap : styles.narrowGap}`}
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            {SKILLS[tab].map((skill) => (
              <div key={skill} className={styles.skillWrapper}>
                <div className={styles.skillText}>{skill}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills