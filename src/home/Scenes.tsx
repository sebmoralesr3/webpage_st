import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import logo from '../assets/logo.svg'
import isotipo from '../assets/st-isotipo.svg'

const ease = [0.2, 0.7, 0.1, 1] as const
const PALETTE = [
  { name: 'Negro', hex: '#000000' },
  { name: 'Claro', hex: '#F4F4F4' },
  { name: 'Platino', hex: '#54B3E9' },
  { name: 'Medianoche', hex: '#0D105B' },
]

export function BrandScene() {
  return (
    <div className="scene scene-brand">
      <motion.img src={isotipo} alt="Isotipo ST de Solventech" width="112" height="56" className="sb-iso"
        initial={{ opacity: 0, scale: 0.6, rotate: -8 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.8, ease }} />
      <motion.img src={logo} alt="Logotipo de Solventech" width="300" height="33" className="sb-logo"
        initial={{ opacity: 0, y: 14, clipPath: 'inset(0 100% 0 0)' }} animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0% 0 0)' }} transition={{ duration: 0.9, delay: 0.25, ease }} />
      <div className="sb-palette" aria-label="Paleta de marca">
        {PALETTE.map((c, i) => (
          <motion.span key={c.hex} className="sb-chip" style={{ background: c.hex }} title={`${c.name} ${c.hex}`}
            initial={{ opacity: 0, y: 16, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5, delay: 0.7 + i * 0.1, ease }} />
        ))}
      </div>
      <div className="sb-bars" aria-hidden="true">
        {[100, 64, 100].map((w, i) => (
          <motion.i key={i} initial={{ width: 0 }} animate={{ width: `${w}%` }} transition={{ duration: 0.8, delay: 1.1 + i * 0.12, ease }} />
        ))}
      </div>
      <p className="scene-cap"><b>Marca e imagen</b> · identidad y manual de marca <span>Ejemplo: nuestra propia marca</span></p>
    </div>
  )
}

export function WebScene() {
  const reduce = useReducedMotion()
  const [clicked, setClicked] = useState(!!reduce)
  useEffect(() => {
    if (reduce) return
    const t = window.setTimeout(() => setClicked(true), 2300)
    return () => window.clearTimeout(t)
  }, [reduce])
  return (
    <div className="scene scene-web">
      <div className="sw-site">
        <div className="sw-nav">
          <img src={logo} alt="" width="96" height="11" />
          <span aria-hidden="true"><i /><i /><i /></span>
        </div>
        <motion.p className="sw-h" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease }}>
          Tu empresa, en línea y vendiendo.
        </motion.p>
        <div className="sw-text" aria-hidden="true">
          {[92, 74].map((w, i) => (
            <motion.i key={i} initial={{ width: 0 }} animate={{ width: `${w}%` }} transition={{ duration: 0.7, delay: 0.45 + i * 0.12, ease }} />
          ))}
        </div>
        <motion.span className={`sw-btn ${clicked ? 'is-hit' : ''}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: clicked ? [1, 0.94, 1] : 1 }} transition={{ duration: 0.4, delay: clicked ? 0 : 0.7 }}>
          Escríbenos por WhatsApp
        </motion.span>
        <div className="sw-cards" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <motion.i key={i} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.9 + i * 0.12, ease }} />
          ))}
        </div>
        {!reduce && (
          <motion.span className="sw-cursor" aria-hidden="true"
            initial={{ left: '78%', top: '82%', opacity: 0 }} animate={{ left: ['78%', '78%', '22%'], top: ['82%', '82%', '50%'], opacity: [0, 1, 1] }}
            transition={{ duration: 2.1, times: [0, 0.25, 1], ease: 'easeInOut' }} />
        )}
        <AnimatePresence>
          {clicked && (
            <motion.p className="sw-toast" role="status" initial={{ opacity: 0, y: 16, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease }}>
              <span aria-hidden="true">●</span> Nuevo contacto por WhatsApp
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <p className="scene-cap"><b>Web a la medida</b> · rápida, medible y con tu marca <span>Boceto ilustrativo</span></p>
    </div>
  )
}

type Phase = 0 | 1 | 2 | 3
export function ProductScene() {
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState<Phase>(reduce ? 3 : 0)
  useEffect(() => {
    if (reduce) return
    const ts = [900, 2000, 3300].map((ms, i) => window.setTimeout(() => setPhase((i + 1) as Phase), ms))
    return () => ts.forEach((t) => window.clearTimeout(t))
  }, [reduce])

  const breaker = phase === 0 ? 10 : phase < 3 ? 7 : 31
  const sales = phase === 0 ? 11 : 12
  const low = phase === 1 || phase === 2
  const rows = [
    { n: 'Cable THHN 12 AWG', s: 120, pct: 80 },
    { n: low ? 'Breaker 20A · comprar 24' : 'Breaker 20A', s: breaker, pct: Math.round((breaker / 36) * 100), low },
    { n: 'Tomacorriente doble', s: 35, pct: 70 },
    { n: 'Bombillo LED 9W', s: 33, pct: 55 },
  ]
  return (
    <div className="scene scene-product">
      <div className="sp-kpis">
        <div><small>Ventas hoy</small><motion.b key={sales} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>{sales}</motion.b></div>
        <div><small>Productos</small><b>4</b></div>
        <div className={low ? 'is-alert' : ''}><small>Comprar hoy</small><motion.b key={String(low)} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>{low ? 1 : 0}</motion.b></div>
      </div>
      <ul className="sp-rows">
        {rows.map((r) => (
          <li key={r.n.slice(0, 8)} className={r.low ? 'is-alert' : ''}>
            <span>{r.n}</span>
            <span className="sp-bar"><motion.i animate={{ width: `${r.pct}%` }} transition={{ duration: 0.6, ease }} /></span>
            <b>{r.s}</b>
          </li>
        ))}
      </ul>
      <div className="sp-feed" aria-live="polite">
        <AnimatePresence mode="popLayout">
          {phase >= 1 && <motion.p key="v" layout initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}><em>Venta</em> Pedido #1043 · 3 × Breaker 20A</motion.p>}
          {phase >= 2 && <motion.p key="a" layout className="is-alert" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}><em>Alerta</em> Quedan 7 breakers. Sugerencia: comprar 24.</motion.p>}
          {phase >= 3 && <motion.p key="c" layout initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}><em>Compra</em> Orden recibida · stock en 31</motion.p>}
        </AnimatePresence>
      </div>
      <p className="scene-cap"><b>Producto</b> · Solven N’Stock <span>Datos de ejemplo</span></p>
    </div>
  )
}
