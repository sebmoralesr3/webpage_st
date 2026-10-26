import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'framer-motion'
import { trackEvent } from '../analytics'
import { CALENDLY, LINES, PRODUCTS } from './data'
import { SectionHead } from './Reveal'
import isotipo from '../assets/st-isotipo.svg'
import logo from '../assets/logo.svg'

const ease = [0.2, 0.7, 0.1, 1] as const

function Chain({ current }: { current: number }) {
  return (
    <ol className="chain" aria-label={`Paso ${current + 1} de 3: ${LINES[current]}`}>
      {LINES.map((l, i) => (
        <li key={l} className={i === current ? 'is-on' : i < current ? 'is-done' : ''}><span>{l}</span></li>
      ))}
    </ol>
  )
}

function BrandVisual() {
  const reduce = useReducedMotion()
  return (
    <div className="lv lv-brand" aria-hidden="true">
      <motion.img src={isotipo} alt="" width="130" height="65" animate={reduce ? undefined : { rotate: [0, -4, 0, 4, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
      <div className="lv-bars">
        {[100, 62, 100].map((w, i) => (
          <motion.i key={i} initial={{ width: '8%' }} whileInView={{ width: `${w}%` }} viewport={{ once: false, amount: 0.6 }} transition={{ duration: 1, delay: i * 0.12, ease }} />
        ))}
      </div>
      <div className="lv-sw">
        {['#000000', '#F4F4F4', '#54B3E9', '#0D105B'].map((c, i) => (
          <motion.i key={c} style={{ background: c }} initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.08, type: 'spring', stiffness: 260, damping: 18 }} />
        ))}
      </div>
    </div>
  )
}

function WebVisual() {
  const reduce = useReducedMotion()
  const code = ['<Hero marca="solventech" />', '<Catalogo productos={4} />', '<Pedidos estado="nuevo" />', '<WhatsApp conectado />']
  return (
    <div className="lv lv-web" aria-hidden="true">
      <div className="lv-code">
        {code.map((line, i) => (
          <motion.code key={line} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ delay: 0.2 + i * 0.25, duration: 0.5, ease }}>
            {line}
          </motion.code>
        ))}
        {!reduce && <motion.span className="lv-caret" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} />}
      </div>
      <motion.span className="lv-link" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ delay: 0.9, duration: 0.8, ease }} />
      <div className="lv-preview">
        <img src={logo} alt="" width="90" height="10" />
        {[0, 1, 2].map((i) => (
          <motion.i key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ delay: 1.2 + i * 0.2, duration: 0.5, ease }} />
        ))}
      </div>
    </div>
  )
}

function ProductVisual() {
  const reduce = useReducedMotion()
  return (
    <div className="lv lv-products" aria-hidden="true">
      {PRODUCTS.map((p, i) => (
        <motion.img key={p.id} src={p.image} alt="" width="200" height="226" className={`lv-phone lv-phone-${i}`}
          animate={reduce ? undefined : { y: [0, -12, 0] }} transition={{ duration: 5, delay: i * 0.8, repeat: Infinity, ease: 'easeInOut' }} />
      ))}
    </div>
  )
}

type Card = { tone: 'white' | 'claro' | 'night'; title: string; text: string; items: string[]; cta: { label: string; href: string; external?: boolean }; visual: ReactNode }

function StackCard({ card, index, total, progress }: { card: Card; index: number; total: number; progress: MotionValue<number> }) {
  const reduce = useReducedMotion()
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - 1 - index) * 0.045])
  return (
    <div className="stack-slot" style={{ top: `calc(96px + ${index * 26}px)` }}>
      <motion.article className={`stack-card tone-${card.tone}`} style={{ scale: reduce ? 1 : scale }}>
        <div className="stack-copy">
          <Chain current={index} />
          <h3>{card.title}</h3>
          <p>{card.text}</p>
          <ul className="ticks">{card.items.map((it) => <li key={it}>{it}</li>)}</ul>
          <a className={`btn ${card.tone === 'night' ? 'btn-primary' : 'btn-dark'} btn-sm`} href={card.cta.href}
            {...(card.cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            onClick={() => card.cta.external && trackEvent('schedule_click', { location: `linea_${LINES[index].toLowerCase()}` })}>
            {card.cta.label} <span className="btn-arrow" aria-hidden="true">→</span>
          </a>
        </div>
        {card.visual}
      </motion.article>
    </div>
  )
}

export default function LinesStack() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const cards: Card[] = [
    { tone: 'white', title: 'Marca e imagen', text: 'Le damos a tu empresa una identidad que se reconoce y un manual para que todo lo que publiques se vea igual de bien.', items: ['Logotipo e isotipo', 'Paleta y tipografías', 'Manual de marca', 'Piezas para redes y web'], cta: { label: 'Hablemos de tu marca', href: CALENDLY, external: true }, visual: <BrandVisual /> },
    { tone: 'claro', title: 'Web y software a la medida', text: 'Sitios que venden y plataformas que ordenan tu operación. Diseñados con tu marca, construidos para tu proceso.', items: ['Sitios y landings', 'Plataformas web y apps', 'Automatización e IA', 'Integración con lo que ya usas'], cta: { label: 'Cotizar mi proyecto', href: CALENDLY, external: true }, visual: <WebVisual /> },
    { tone: 'night', title: 'Productos Solventech', text: 'Soluciones que ya construimos y que puedes usar desde ya, o adaptar a tu organización.', items: ['Solven N’Stock · inventario', 'Provalia · proyectos con IA', 'ABLE · inclusión y aprendizaje', 'Versión para tu organización'], cta: { label: 'Ver productos', href: '#productos' }, visual: <ProductVisual /> },
  ]
  return (
    <section className="section" id="lineas">
      <div className="wrap">
        <SectionHead num="01" label="Tres formas de trabajar con nosotros" title="Empieza por donde lo necesites. Todo se conecta." lead="La misma gente que define cómo se ve tu marca construye la web y el sistema que la hacen funcionar." />
        <div className="stack" ref={ref}>
          {cards.map((c, i) => <StackCard key={c.title} card={c} index={i} total={cards.length} progress={scrollYProgress} />)}
        </div>
      </div>
    </section>
  )
}
