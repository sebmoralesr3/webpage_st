import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import { motion, AnimatePresence, useReducedMotion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'
import { trackEvent } from '../analytics'
import { CALENDLY, LINES, PRODUCTS } from './data'
import { BrandScene, WebScene, ProductScene } from './Scenes'
import { EASE_OUT, SPRING, useFinePointer } from './motion'
import Magnetic from './Magnetic'

const CYCLE_MS = 5200
const SCENES = [BrandScene, WebScene, ProductScene]
const TITLES = ['Marca e imagen', 'solventech.com', 'Solven N’Stock']

export default function Hero() {
  const reduce = useReducedMotion()
  const fine = useFinePointer()
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
    if (i === active) return
    setActive(i)
    setAuto(false)
    trackEvent('demo_interact', { location: 'hero', view: LINES[i] })
  }

  // Inclinación 3D de la ventana siguiendo el cursor (máx. 5°).
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 150, damping: 20 })
  const sry = useSpring(ry, { stiffness: 150, damping: 20 })
  const tilt = fine && !reduce
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 10)
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 8)
  }
  const onLeave = () => { rx.set(0); ry.set(0); setHover(false) }

  // Al salir del hero, texto y ventana se separan con distinta velocidad (parallax corto).
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const netY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60])
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 40])
  const copyO = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.2])

  const Scene = SCENES[active]
  const words = ['Tu', 'marca,', 'tu', 'web', 'y', 'tu', 'software.']

  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title" ref={ref}>
      <div className="wrap hero-grid">
        <motion.div className="hero-copy" style={{ y: copyY, opacity: copyO }}>
          <p className="eyebrow rise" style={{ '--d': '0s' } as CSSProperties}>
            <span className="eyebrow-num">Marca · Web · Producto</span>
          </p>
          <h1 className="h1" id="hero-title">
            <span className="sr-only">Tu marca, tu web y tu software. Un solo equipo.</span>
            <span aria-hidden="true">
              {words.map((w, i) => (
                <span className="word" key={i}>
                  <span className="word-in" style={{ '--d': `${0.06 + i * 0.05}s` } as CSSProperties}>{w}</span>
                </span>
              ))}
              <span className="word light">
                <span className="word-in" style={{ '--d': '0.48s' } as CSSProperties}>Un solo equipo.</span>
              </span>
            </span>
          </h1>
          <p className="hero-lead rise" style={{ '--d': '0.62s' } as CSSProperties}>
            Diseñamos cómo se ve tu empresa y construimos la web y las plataformas con las que vende y opera. Con productos propios que lo demuestran.
          </p>
          <div className="hero-actions rise" style={{ '--d': '0.74s' } as CSSProperties}>
            <Magnetic>
              <a className="btn btn-primary" href={CALENDLY} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('click_cta_hero', { location: 'hero' })}>
                Agenda una llamada de 45 min <span className="btn-arrow" aria-hidden="true">→</span>
              </a>
            </Magnetic>
            <a className="text-link" href="#productos">Ver productos ↓</a>
          </div>
          <ul className="hero-products rise" style={{ '--d': '0.86s' } as CSSProperties} aria-label="Productos Solventech">
            {PRODUCTS.map((p) => <li key={p.id}>{p.name}</li>)}
          </ul>
        </motion.div>

        <motion.div className="net" style={{ y: netY }}>
          <div className="net-in rise" style={{ '--d': '0.2s' } as CSSProperties}
            onPointerEnter={() => setHover(true)} onPointerMove={tilt ? onMove : undefined} onPointerLeave={onLeave}>
            <div className="net-nodes" role="group" aria-label="Cambiar vista: marca, web o producto">
              <span className="net-line" aria-hidden="true">
                <motion.span className="net-line-fill" initial={false} animate={{ scaleX: active / 2 }} transition={{ duration: 0.6, ease: EASE_OUT }} />
                {!reduce && <span className="net-pulse" />}
              </span>
              {LINES.map((line, i) => (
                <div className="net-col" key={line}>
                  <button type="button" className={`net-node ${i === active ? 'is-active' : ''} ${i < active ? 'is-done' : ''}`} aria-pressed={i === active} onClick={() => pick(i)}>
                    {i === active && <motion.span layoutId="net-pill" className="net-pill" transition={SPRING} aria-hidden="true" />}
                    <span className="net-num">0{i + 1}</span>
                    <span className="net-label">{line}</span>
                  </button>
                  {i === active && <motion.span layoutId="net-drop" className="net-drop" aria-hidden="true" transition={SPRING} />}
                </div>
              ))}
            </div>

            <motion.div className="window" style={tilt ? { rotateX: srx, rotateY: sry, transformPerspective: 1200 } : undefined}>
              <div className="window-bar">
                <span className="dots" aria-hidden="true"><i /><i /><i /></span>
                <span className="window-title">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span key={active} initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }} transition={{ duration: 0.3, ease: EASE_OUT }}>
                      {TITLES[active]}
                    </motion.span>
                  </AnimatePresence>
                </span>
                {playing && <motion.span key={active} className="window-timer" aria-hidden="true" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: CYCLE_MS / 1000, ease: 'linear' }} />}
              </div>
              <div className="window-stage">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div key={active} className="window-scene"
                    initial={{ opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 1.02, filter: 'blur(6px)' }}
                    transition={{ duration: 0.45, ease: EASE_OUT }}>
                    <Scene />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
