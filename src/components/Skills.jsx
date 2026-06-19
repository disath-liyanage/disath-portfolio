import { useEffect, useRef } from 'react'
import styles from './Skills.module.css'

const SKILLS = {
  Frontend: [
    'React',
    'JavaScript',
    'HTML',
    'CSS',
    'Tailwind CSS',
    'Vite',
    'GSAP',
  ],
  Backend: [
    'Node.js',
    'Express',
    'Python',
    'REST APIs',
    'MySQL',
    'MongoDB',
  ],
  General: [
    'Java',
    'JavaScript',
    'Git',
    'GitHub',
    'Figma',
    'Linux',
  ],
  'Soft Skills': [
    'Problem Solving',
    'Teamwork',
    'Communication',
    'Time Management',
    'Adaptability',
    'Attention to Detail',
  ],
}

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

  useEffect(() => {
    const loadScript = (src) =>
      new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve()
          return
        }
        const s = document.createElement('script')
        s.src = src
        s.onload = resolve
        s.onerror = reject
        document.head.appendChild(s)
      })

    Promise.all([
      loadScript('https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js'),
      loadScript('https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/SplitText.min.js'),
    ]).then(() => {
      const { gsap, SplitText } = window
      if (!gsap || !SplitText) return

      gsap.registerPlugin(SplitText)

      const panels = panelsRef.current
      const activeIndex = activeIndexRef.current

      splitsRef.current = panels.map((el, i) => {
        const textNodes = el.querySelectorAll('.' + styles.skillText)

        return SplitText.create(textNodes, {
          type: 'lines',
          mask: 'lines',
          linesClass: styles.splitLine,
          autoSplit: true,
          onSplit(self) {
            gsap.set(el, { opacity: 1 })
            if (i === activeIndex) {
              gsap.set(self.lines, { yPercent: 0, opacity: 1 })
            } else {
              gsap.set(self.lines, { yPercent: Y_OFFSET, opacity: 1 })
            }
          },
        })
      })
    })

    return () => {
      splitsRef.current.forEach((s) => s?.revert?.())
    }
  }, [])

  const switchTab = (nextIndex) => {
    const { gsap } = window
    if (!gsap) return
    if (nextIndex === activeIndexRef.current) return

    if (isAnimatingRef.current) {
      queuedIndexRef.current = nextIndex
      return
    }

    isAnimatingRef.current = true

    btnRefs.current.forEach((btn, i) => {
      if (!btn) return
      btn.classList.toggle(styles.active, i === nextIndex)
    })

    const currentLines = splitsRef.current[activeIndexRef.current]?.lines
    const nextLines = splitsRef.current[nextIndex]?.lines

    if (!currentLines || !nextLines) {
      activeIndexRef.current = nextIndex
      isAnimatingRef.current = false
      return
    }

    gsap.killTweensOf(currentLines)
    gsap.killTweensOf(nextLines)
    gsap.set(currentLines, { yPercent: 0, opacity: 1 })
    gsap.set(nextLines, { yPercent: Y_OFFSET, opacity: 1 })

    tlRef.current?.kill()

    tlRef.current = gsap.timeline({
      onComplete: () => {
        activeIndexRef.current = nextIndex
        isAnimatingRef.current = false

        if (
          queuedIndexRef.current !== null &&
          queuedIndexRef.current !== activeIndexRef.current
        ) {
          const q = queuedIndexRef.current
          queuedIndexRef.current = null
          switchTab(q)
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
  }

  return (
    <section id="skills" className={styles.skills} ref={sectionRef}>
      <div className={styles.tabs}>
        {TABS.map((tab, i) => (
          <button
            key={tab}
            ref={(el) => (btnRefs.current[i] = el)}
            className={`${styles.tab} ${i === 0 ? styles.active : ''}`}
            onClick={() => switchTab(i)}
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
            className={styles.panel}
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