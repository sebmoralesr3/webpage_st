import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion'
import { trackEvent } from '../analytics'
import { STEPS } from './data'
import { SectionHead } from './Reveal'
import { EASE_OUT, SPRING } from './motion'

const ease = EASE_OUT
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
            <motion.span className="flow-fill" initial={false} animate={{ scaleX: pct / 100 }} transition={{ duration: 0.8, ease }} />
            {!reduce && inView && <span className="flow-pulse" />}
          </div>
          <ol className="flow-steps">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <button type="button" className={`flow-node ${i === active ? 'is-active' : ''} ${i < active ? 'is-done' : ''}`} aria-pressed={i === active} onClick={() => pick(i)}>
                  <span className="flow-dot">
                    {i === active && <motion.span layoutId="flow-ring" className="flow-ring" transition={SPRING} aria-hidden="true" />}
                    <span className="flow-n">0{i + 1}</span>
                  </span>
                  <span className="flow-name">{s.title}</span>
                  <span className="flow-time">{s.time}</span>
                </button>
              </li>
            ))}
          </ol>
          <div className="flow-detail" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div key={active} className="flow-card" initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }} transition={{ duration: 0.35, ease }}>
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
