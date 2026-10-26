import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion'
import { SECTIONS } from './data'

/** Riel fijo que une todas las secciones: se llena con el scroll y marca dónde está el visitante. */
export default function ConnectionRail() {
  const { scrollYProgress } = useScroll()
  const reduce = useReducedMotion()
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 })
  const [active, setActive] = useState<string>(SECTIONS[0].id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id) })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    SECTIONS.forEach(({ id }) => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  const activeIndex = SECTIONS.findIndex((s) => s.id === active)

  return (
    <nav className="rail" aria-label="Recorrido de la página">
      <span className="rail-track" aria-hidden="true">
        <motion.span className="rail-fill" style={{ scaleY: reduce ? scrollYProgress : fill }} />
      </span>
      <ol>
        {SECTIONS.map((s, i) => (
          <li key={s.id} className={i <= activeIndex ? 'is-on' : ''}>
            <a href={`#${s.id}`} aria-current={s.id === active ? 'true' : undefined}>
              <span className="rail-dot" aria-hidden="true" />
              <span className="rail-label">{s.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
