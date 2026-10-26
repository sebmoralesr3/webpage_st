import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { trackEvent } from '../analytics'
import { CALENDLY, PRODUCTS } from './data'
import { SectionHead } from './Reveal'

const ease = [0.2, 0.7, 0.1, 1] as const

export default function ProductsRail() {
  const rail = useRef<HTMLDivElement>(null)
  const { scrollXProgress } = useScroll({ container: rail })
  const progress = useSpring(scrollXProgress, { stiffness: 140, damping: 26 })
  const move = (dir: number) => {
    const el = rail.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('.pcard')
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 380) + 20), behavior: 'smooth' })
  }

  return (
    <section className="section section-products" id="productos">
      <div className="wrap rail-head">
        <SectionHead num="03" label="Productos Solventech" title="Hechos por Solventech, usados por personas reales." />
        <div className="rail-ctrl">
          <button type="button" className="round" onClick={() => move(-1)} aria-label="Producto anterior">←</button>
          <button type="button" className="round" onClick={() => move(1)} aria-label="Producto siguiente">→</button>
        </div>
      </div>
      <div className="prail" ref={rail} tabIndex={0} aria-label="Productos, desplazable horizontalmente">
        {PRODUCTS.map((p, i) => (
          <motion.article key={p.id} className="pcard" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, delay: i * 0.1, ease }}>
            <div className="pcard-img"><img src={p.image} alt={p.alt} width="300" height="338" loading="lazy" decoding="async" /></div>
            <div className="pcard-body">
              <span className="tag">{p.category}</span>
              <h3>{p.name}</h3>
              <p>{p.text}</p>
              <a className="text-link" href={CALENDLY} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('select_content', { content_type: 'producto', content_id: p.id })}>
                {p.cta} <span className="btn-arrow" aria-hidden="true">→</span>
              </a>
            </div>
          </motion.article>
        ))}
        <motion.article className="pcard pcard-next" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, delay: 0.3, ease }}>
          <span className="tag">Tu proyecto</span>
          <h3>¿El siguiente producto es el tuyo?</h3>
          <p>Lo diseñamos, lo construimos y lo lanzamos con tu marca.</p>
          <a className="btn btn-primary btn-sm" href={CALENDLY} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('schedule_click', { location: 'productos' })}>
            Contar mi idea <span className="btn-arrow" aria-hidden="true">→</span>
          </a>
        </motion.article>
      </div>
      <div className="wrap"><div className="rail-progress" aria-hidden="true"><motion.span style={{ scaleX: progress }} /></div></div>
    </section>
  )
}
