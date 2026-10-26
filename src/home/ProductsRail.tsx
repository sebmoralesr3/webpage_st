import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from 'react'
import { motion, useScroll, useSpring, useTransform, useReducedMotion, useMotionValue } from 'framer-motion'
import { trackEvent } from '../analytics'
import { CALENDLY, PRODUCTS } from './data'
import { SectionHead } from './Reveal'
import { EASE_OUT, useFinePointer } from './motion'

function useWide() {
  const [wide, setWide] = useState(() => window.matchMedia('(min-width: 981px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 981px)')
    const on = () => setWide(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return wide
}

/** Tarjeta con imagen que se revela de abajo hacia arriba y se inclina levemente con el cursor. */
function ProductCard({ p, i }: { p: (typeof PRODUCTS)[number]; i: number }) {
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 200, damping: 20 })
  const sry = useSpring(ry, { stiffness: 200, damping: 20 })
  const tilt = fine && !reduce
  const move = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 8)
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 6)
  }
  return (
    <motion.article className="pcard" style={tilt ? { rotateX: srx, rotateY: sry, transformPerspective: 1000 } : undefined}
      onPointerMove={tilt ? move : undefined} onPointerLeave={() => { rx.set(0); ry.set(0) }}>
      <motion.div className="pcard-img" initial={{ clipPath: 'inset(100% 0% 0% 0%)' }} whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.9, delay: i * 0.08, ease: EASE_OUT }}>
        <motion.img src={p.image} alt={p.alt} width="300" height="338" loading="lazy" decoding="async" initial={{ scale: 1.15 }} whileInView={{ scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.2, delay: i * 0.08, ease: EASE_OUT }} />
      </motion.div>
      <div className="pcard-body">
        <span className="tag">{p.category}</span>
        <h3>{p.name}</h3>
        <p>{p.text}</p>
        <a className="text-link" href={CALENDLY} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('select_content', { content_type: 'producto', content_id: p.id })}>
          {p.cta} <span className="btn-arrow" aria-hidden="true">→</span>
        </a>
      </div>
    </motion.article>
  )
}

function NextCard() {
  return (
    <article className="pcard pcard-next">
      <span className="tag">Tu proyecto</span>
      <h3>¿El siguiente producto es el tuyo?</h3>
      <p>Lo diseñamos, lo construimos y lo lanzamos con tu marca.</p>
      <a className="btn btn-primary btn-sm" href={CALENDLY} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('schedule_click', { location: 'productos' })}>
        Contar mi idea <span className="btn-arrow" aria-hidden="true">→</span>
      </a>
    </article>
  )
}

const Head = () => <SectionHead num="03" label="Productos Solventech" title="Hechos por Solventech, usados por personas reales." />

/** Escritorio: el scroll vertical mueve los productos de lado (sección fijada). */
function PinnedRail() {
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  useLayoutEffect(() => {
    const measure = () => { if (track.current) setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth)) }
    measure()
    const ro = new ResizeObserver(measure)
    if (track.current) ro.observe(track.current)
    window.addEventListener('resize', measure)
    return () => { ro.disconnect(); window.removeEventListener('resize', measure) }
  }, [])
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 })
  const x = useTransform(smooth, (v) => -v * distance)
  return (
    <section className="section-products is-pinned" id="productos" ref={section} style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="pin">
        <div className="wrap"><Head /></div>
        <motion.div className="ptrack" ref={track} style={{ x }}>
          {PRODUCTS.map((p, i) => <ProductCard key={p.id} p={p} i={i} />)}
          <NextCard />
        </motion.div>
        <div className="wrap"><div className="rail-progress" aria-hidden="true"><motion.span style={{ scaleX: smooth }} /></div></div>
      </div>
    </section>
  )
}

/** Celular o "reducir movimiento": carrusel nativo deslizable. */
function SwipeRail() {
  const rail = useRef<HTMLDivElement>(null)
  const { scrollXProgress } = useScroll({ container: rail })
  return (
    <section className="section section-products" id="productos">
      <div className="wrap"><Head /></div>
      <div className="prail" ref={rail} tabIndex={0} aria-label="Productos, desplazable horizontalmente">
        {PRODUCTS.map((p, i) => <ProductCard key={p.id} p={p} i={i} />)}
        <NextCard />
      </div>
      <div className="wrap"><div className="rail-progress" aria-hidden="true"><motion.span style={{ scaleX: scrollXProgress }} /></div></div>
    </section>
  )
}

export default function ProductsRail() {
  const wide = useWide()
  const reduce = useReducedMotion()
  return wide && !reduce ? <PinnedRail /> : <SwipeRail />
}
