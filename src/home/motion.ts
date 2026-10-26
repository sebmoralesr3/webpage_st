import { useEffect, useState } from 'react'
import Lenis from 'lenis'

/**
 * Sistema de movimiento de la página.
 * - Entradas y respuestas a la persona: ease-out fuerte (arranca rápido, frena suave).
 * - Cosas que ya están en pantalla y se mueven de un lugar a otro: ease-in-out.
 * - Nada de ease-in para entradas: se siente lento justo cuando la persona mira.
 */
export const EASE_OUT = [0.23, 1, 0.32, 1] as const
export const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const
export const SPRING = { type: 'spring', stiffness: 380, damping: 32, mass: 0.8 } as const
export const SPRING_SOFT = { type: 'spring', stiffness: 160, damping: 26, mass: 1 } as const

/** Entrada estándar de bloques al hacer scroll. */
export const REVEAL = {
  initial: { opacity: 0, y: 24, filter: 'blur(6px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, margin: '0px 0px -10% 0px' },
} as const

function matches(query: string) {
  return typeof window !== 'undefined' && window.matchMedia(query).matches
}

/** true solo con mouse o trackpad: los efectos de cursor no existen en pantallas táctiles. */
export function useFinePointer() {
  const [fine, setFine] = useState(() => matches('(hover: hover) and (pointer: fine)'))
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const on = () => setFine(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return fine
}

/** Scroll con inercia (Lenis). Se apaga con "reducir movimiento". */
export function useSmoothScroll() {
  useEffect(() => {
    if (matches('(prefers-reduced-motion: reduce)')) return
    const lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4), anchors: { offset: -80 }, autoRaf: true })
    document.documentElement.classList.add('lenis')
    return () => { lenis.destroy(); document.documentElement.classList.remove('lenis') }
  }, [])
}

/** Id de la sección que ocupa el centro de la pantalla. */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [ids])
  return active
}
