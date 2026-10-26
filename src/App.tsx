import { useRef, useState } from 'react'
import { MotionConfig, motion, useScroll, useMotionValueEvent, useTransform, useReducedMotion } from 'framer-motion'
import './App.css'
import { trackEvent } from './analytics'
import { CALENDLY, EMAIL, PHONE_HREF, PHONE_LABEL } from './home/data'
import { EASE_OUT, SPRING, useActiveSection, useSmoothScroll } from './home/motion'
import ConnectionRail from './home/ConnectionRail'
import Hero from './home/Hero'
import LinesStack from './home/LinesStack'
import ProcessFlow from './home/ProcessFlow'
import ProductsRail from './home/ProductsRail'
import Contact from './home/Contact'
import Magnetic from './home/Magnetic'
import logo from './assets/logo.svg'
import isotipo from './assets/st-isotipo.svg'
import kreaLogo from './assets/krea_logo.svg'
import zonedInLogo from './assets/zonedin_logo.svg'
import stratosLogo from './assets/stratos_logo.svg'
import grupoLogo from './assets/grupocomercial_logo.svg'
import electrosumigLogo from './assets/electrosumig_logo.svg'

const navItems = [['Qué hacemos', 'lineas'], ['Proceso', 'proceso'], ['Productos', 'productos'], ['Contacto', 'contacto']] as const
const navIds = ['inicio', ...navItems.map(([, id]) => id)]
const clients = [
  { src: kreaLogo, name: 'Krea Proyectos' },
  { src: zonedInLogo, name: 'ZonedIn' },
  { src: stratosLogo, name: 'Stratos' },
  { src: grupoLogo, name: 'Grupo Comercial' },
  { src: electrosumigLogo, name: 'Electrosumig' },
]

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const active = useActiveSection(navIds)
  const { scrollY } = useScroll()
  // Se esconde al bajar y vuelve apenas la persona sube: más pantalla para el contenido.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 12)
    setHidden(y > 240 && y > prev + 2 && !open)
    if (y < prev - 2) setHidden(false)
  })
  return (
    <header className={`topbar ${scrolled ? 'is-scrolled' : ''} ${hidden ? 'is-hidden' : ''}`}>
      <div className="wrap topbar-in">
        <a href="#inicio" className="brand" aria-label="Solventech, inicio"><img src={logo} alt="Solventech" width="190" height="21" /></a>
        <button className="menu-btn" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}><span /><span /></button>
        <nav id="menu" className={`menu ${open ? 'is-open' : ''}`} aria-label="Principal">
          {navItems.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className={active === id ? 'is-current' : ''} aria-current={active === id ? 'true' : undefined}>
              {active === id && <motion.span layoutId="nav-pill" className="nav-pill" transition={SPRING} aria-hidden="true" />}
              <span>{label}</span>
            </a>
          ))}
          <Magnetic>
            <a className="btn btn-dark btn-sm" href={CALENDLY} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('schedule_click', { location: 'header' })}>Agenda una llamada</a>
          </Magnetic>
        </nav>
      </div>
    </header>
  )
}

function Clients() {
  const row = [...clients, ...clients]
  return (
    <section className="clients" aria-label="Empresas que han trabajado con Solventech">
      <div className="wrap clients-in">
        <p className="clients-label">Empresas que han trabajado con nosotros</p>
        <div className="marquee">
          <ul className="marquee-track">
            {row.map((c, i) => (
              <li key={i} aria-hidden={i >= clients.length ? 'true' : undefined}>
                <img src={c.src} alt={i >= clients.length ? '' : c.name} width="150" height="42" loading="lazy" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/** Valla: dos líneas gigantes que se desplazan en sentidos opuestos según el scroll. */
function Billboard() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x1 = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['4%', '-22%'])
  const x2 = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-24%', '2%'])
  const line = (text: string) => Array.from({ length: 4 }, (_, i) => <span key={i}>{text}<i aria-hidden="true" /></span>)
  return (
    <section className="billboard" ref={ref} aria-label="En cada sede. Donde lo necesites.">
      <div className="billboard-rows" aria-hidden="true">
        <motion.p className="billboard-row" style={{ x: x1 }}>{line('En cada sede')}</motion.p>
        <motion.p className="billboard-row accent" style={{ x: x2 }}>{line('Donde lo necesites')}</motion.p>
      </div>
      <div className="wrap billboard-foot">
        <p className="billboard-en">Everywhere. Anywhere you need.</p>
        <Magnetic>
          <a className="btn btn-primary" href={CALENDLY} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('schedule_click', { location: 'billboard' })}>
            Agenda una llamada de 45 min <span className="btn-arrow" aria-hidden="true">→</span>
          </a>
        </Magnetic>
      </div>
    </section>
  )
}

function Footer() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const reveal = useTransform(scrollYProgress, [0.2, 1], reduce ? ['inset(0% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'] : ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'])
  const y = useTransform(scrollYProgress, [0.2, 1], reduce ? [0, 0] : [60, 0])
  return (
    <footer className="footer" ref={ref}>
      <div className="wrap footer-in">
        <div className="footer-brand">
          <img src={isotipo} alt="" width="56" height="28" />
          <p>Marca, web y software a la medida.<br />Cl. 93 #43-106, Barranquilla, Atlántico</p>
        </div>
        <nav className="footer-links" aria-label="Pie de página">
          {navItems.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>
        <div className="footer-links">
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <a href={PHONE_HREF}>{PHONE_LABEL}</a>
          <a href="https://www.linkedin.com/company/solventechco/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://www.instagram.com/solventech.co/" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
      <div className="wrap footer-mark">
        <motion.img src={logo} alt="Solventech" width="1224" height="135" style={{ clipPath: reveal, y }} transition={{ ease: EASE_OUT }} />
      </div>
      <div className="wrap footer-bottom">
        <p>© {new Date().getFullYear()} Solventech. Todos los derechos reservados.</p>
        {/* TODO: enlazar la política de privacidad cuando esté publicada (Ley 1581). */}
        <span>Política de privacidad</span>
      </div>
    </footer>
  )
}

function useScroll75() {
  const sent = useRef(false)
  const { scrollYProgress } = useScroll()
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (!sent.current && v >= 0.75) { sent.current = true; trackEvent('scroll_75') }
  })
}

export default function App() {
  useScroll75()
  useSmoothScroll()
  return (
    <MotionConfig reducedMotion="user">
      <div className="site">
        <a className="skip" href="#lineas">Saltar al contenido</a>
        <Header />
        <ConnectionRail />
        <main>
          <Hero />
          <Clients />
          <LinesStack />
          <ProcessFlow />
          <ProductsRail />
          <Billboard />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
