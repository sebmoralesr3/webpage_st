import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion'
import { trackEvent } from '../analytics'
import { STEPS } from './data'
import { SectionHead } from './Reveal'

const ease = [0.2, 0.7, 0.1, 1] as const
const STEP_MS = 2800

/** Línea de proceso: un pulso recorre las etapas y cada una se activa en orden. */
export default function ProcessFlow() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.4 })
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(true)

  useEffect(() => {
    if (!inView || !auto || reduce) return
    const t = window.setTimeout(() => setActive((a) => (a + 1) % STEPS.length), STEP_MS)
    return () => window.clearTimeout(t)
  }, [inView, auto, reduce, active])

  const pick = (i: number) => { setActive(i); setAuto(false); trackEvent('process_step', { step: STEPS[i].title }) }
  const step = STEPS[active]
  const pct = (active / (STEPS.length - 1)) * 100

  return (
    <section className="section section-process" id="proceso">
      <div className="wrap">
        <SectionHead num="02" label="Cómo trabajamos" title="De la llamada al lanzamiento, sin perderte en el camino." />
        <div className="flow" ref={ref}>
          <div className="flow-track" aria-hidden="true">
            <motion.span className="flow-fill" animate={{ width: `${pct}%` }} transition={{ duration: 0.9, ease }} />
            {!reduce && inView && <span className="flow-pulse" />}
          </div>
          <ol className="flow-steps">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <button type="button" className={`flow-node ${i === active ? 'is-active' : ''} ${i < active ? 'is-done' : ''}`} aria-pressed={i === active} onClick={() => pick(i)}>
                  <span className="flow-dot"><span>0{i + 1}</span></span>
                  <span className="flow-name">{s.title}</span>
                  <span className="flow-time">{s.time}</span>
                </button>
              </li>
            ))}
          </ol>
          <div className="flow-detail" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div key={active} className="flow-card" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.45, ease }}>
                <span className="flow-big" aria-hidden="true">0{active + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
                <p className="flow-get"><span>Recibes</span>{step.get}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
