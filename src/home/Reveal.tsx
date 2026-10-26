import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { EASE_OUT } from './motion'

/** Aparece suave al entrar en pantalla. Con "reducir movimiento" se muestra sin desplazamiento. */
export default function Reveal({ children, delay = 0, className, as = 'div' }: { children: ReactNode; delay?: number; className?: string; as?: 'div' | 'li' | 'article' }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.7, delay, ease: EASE_OUT }}
    >
      {children}
    </Tag>
  )
}

/** Título de sección con número estilo "01 | Nombre" y un conector que se dibuja. */
export function SectionHead({ num, label, title, lead }: { num: string; label: string; title: ReactNode; lead?: ReactNode }) {
  return (
    <div className="sec-head">
      <Reveal>
        <p className="eyebrow">
          <span className="eyebrow-num">{num}</span>
          <motion.span className="eyebrow-line" aria-hidden="true" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE_OUT }} />
          {label}
        </p>
      </Reveal>
      <Reveal delay={0.08}><h2 className="h2">{title}</h2></Reveal>
      {lead && <Reveal delay={0.16}><p className="lead">{lead}</p></Reveal>}
    </div>
  )
}
