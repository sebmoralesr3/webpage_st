import { useEffect, useState, type CSSProperties } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { trackEvent } from '../analytics'
import { CALENDLY, LINES, PRODUCTS } from './data'
import { BrandScene, WebScene, ProductScene } from './Scenes'

const ease = [0.2, 0.7, 0.1, 1] as const
const CYCLE_MS = 5200
const SCENES = [BrandScene, WebScene, ProductScene]

export default function Hero() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(true)
  const [hover, setHover] = useState(false)
  const playing = auto && !hover && !reduce

  useEffect(() => {
    if (!playing) return
    const t = window.setTimeout(() => setActive((a) => (a + 1) % LINES.length), CYCLE_MS)
    return () => window.clearTimeout(t)
  }, [playing, active])

  const pick = (i: number) => {
    setActive(i)
    setAuto(false)
    trackEvent('demo_interact', { location: 'hero', view: LINES[i] })
  }
  const Scene = SCENES[active]
  const words = ['Tu', 'marca,', 'tu', 'web', 'y', 'tu', 'software.']

  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow rise" style={{ '--d': '0s' } as CSSProperties}>
            <span className="eyebrow-num">Marca · Web · Producto</span>
          </p>
          <h1 className="h1" id="hero-title">
            <span className="sr-only">Tu marca, tu web y tu software. Un solo equipo.</span>
            <span aria-hidden="true">
              {words.map((w, i) => (
                <span className="word" key={i}>
                  <span className="word-in" style={{ '--d': `${0.08 + i * 0.06}s` } as CSSProperties}>{w}</span>
                </span>
              ))}
              <span className="word light">
                <span className="word-in" style={{ '--d': '0.55s' } as CSSProperties}>Un solo equipo.</span>
              </span>
            </span>
          </h1>
          <p className="hero-lead rise" style={{ '--d': '0.7s' } as CSSProperties}>
            Diseñamos cómo se ve tu empresa y construimos la web y las plataformas con las que vende y opera. Con productos propios que lo demuestran.
          </p>
          <div className="hero-actions rise" style={{ '--d': '0.85s' } as CSSProperties}>
            <a className="btn btn-primary" href={CALENDLY} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('click_cta_hero', { location: 'hero' })}>
              Agenda una llamada de 45 min <span className="btn-arrow" aria-hidden="true">→</span>
            </a>
            <a className="text-link" href="#productos">Ver productos ↓</a>
          </div>
          <ul className="hero-products rise" style={{ '--d': '1s' } as CSSProperties} aria-label="Productos Solventech">
            {PRODUCTS.map((p) => <li key={p.id}>{p.name}</li>)}
          </ul>
        </div>

        <motion.div className="net" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3, ease }}>
          <div className="net-nodes" role="group" aria-label="Cambiar vista: marca, web o producto">
            <span className="net-line" aria-hidden="true">
              <motion.span className="net-line-fill" animate={{ width: `${active * 50}%` }} transition={{ duration: 0.7, ease }} />
              {!reduce && <span className="net-pulse" />}
            </span>
            {LINES.map((line, i) => (
              <div className="net-col" key={line}>
                <button type="button" className={`net-node ${i === active ? 'is-active' : ''} ${i < active ? 'is-done' : ''}`} aria-pressed={i === active} onClick={() => pick(i)}>
                  <span className="net-num">0{i + 1}</span>{line}
                </button>
                {i === active && <motion.span layoutId="net-drop" className="net-drop" aria-hidden="true" transition={{ duration: 0.6, ease }} />}
              </div>
            ))}
          </div>

          <div className="window">
            <div className="window-bar">
              <span className="dots" aria-hidden="true"><i /><i /><i /></span>
              <span className="window-title">{['Marca e imagen', 'solventech.com', 'Solven N’Stock'][active]}</span>
              {playing && <motion.span key={active} className="window-timer" aria-hidden="true" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: CYCLE_MS / 1000, ease: 'linear' }} />}
            </div>
            <div className="window-stage">
              <AnimatePresence mode="wait">
                <motion.div key={active} className="window-scene" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.45, ease }}>
                  <Scene />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
