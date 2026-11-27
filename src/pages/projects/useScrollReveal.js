import { useEffect } from 'react'

export function useScrollReveal(containerRef) {
  useEffect(() => {
    const root = containerRef.current
    if (!root) return

    const targets = Array.from(root.querySelectorAll('[data-reveal]'))
    if (!targets.length) return

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    targets.forEach((el) => {
      const items = []
      Array.from(el.children).forEach((child) => {
        if (child.matches('.proj-sec_title, .proj-group_title, .proj-sec_text, .shots, .proj-variants_item, .proj-next_group')) {
          items.push(child)
        } else if (child.matches('.proj-sec_list')) {
          items.push(...Array.from(child.children))
        } else if (child.matches('.proj-groups-grid')) {
          items.push(...Array.from(child.children))
        }
      })
      items.forEach((item, idx) => {
        item.classList.add('proj-reveal-item')
        item.style.setProperty('--reveal-i', String(Math.min(idx, 6)))
      })
    })

    if (reduced || typeof IntersectionObserver === 'undefined') {
      targets.forEach((el) => el.classList.add('is-revealed'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.06, rootMargin: '0px 0px -32px 0px' }
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [containerRef])
}