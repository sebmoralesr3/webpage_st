import { useRef, type ReactNode, type PointerEvent } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { useFinePointer } from './motion'

/** Atrae suavemente su contenido hacia el cursor (máx. ~8 px). Solo con mouse y sin "reducir movimiento". */
export default function Magnetic({ children, strength = 0.22, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 })
  const on = fine && !reduce

  const move = (e: PointerEvent) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    x.set(Math.max(-8, Math.min(8, (e.clientX - (r.left + r.width / 2)) * strength)))
    y.set(Math.max(-8, Math.min(8, (e.clientY - (r.top + r.height / 2)) * strength)))
  }
  const reset = () => { x.set(0); y.set(0) }

  return (
    <motion.span ref={ref} className={`magnetic ${className ?? ''}`} style={on ? { x: sx, y: sy } : undefined}
      onPointerMove={on ? move : undefined} onPointerLeave={on ? reset : undefined}>
      {children}
    </motion.span>
  )
}
