import { useEffect, useRef, useState } from 'react'
import { MotionConfig, motion, useScroll, useMotionValueEvent } from 'framer-motion'
import './App.css'
import { trackEvent } from './analytics'
import { CALENDLY, EMAIL, PHONE_HREF, PHONE_LABEL } from './home/data'
import ConnectionRail from './home/ConnectionRail'
import Hero from './home/Hero'
import LinesStack from './home/LinesStack'
import ProcessFlow from './home/ProcessFlow'
import ProductsRail from './home/ProductsRail'
import Contact from './home/Contact'
import Reveal from './home/Reveal'
import logo from './assets/logo.svg'
import isotipo from './assets/st-isotipo.svg'
import kreaLogo from './assets/krea_logo.svg'
import zonedInLogo from './assets/zonedin_logo.svg'
import stratosLogo from './assets/stratos_logo.svg'
import grupoLogo from './assets/grupocomercial_logo.svg'
import electrosumigLogo from './assets/electrosumig_logo.svg'

const navItems = [['Qué hacemos', 'lineas'], ['Proceso', 'proceso'], ['Productos', 'productos'], ['Contacto', 'contacto']] as const
const clients = [
  { src: kreaLogo, name: 'Krea Proyectos' },
  { src: zonedInLogo, name: 'ZonedIn' },
  { src: stratosLogo, name: 'Stratos' },
  { src: grupoLogo, name: 'Grupo Comercial' },
  { src: electrosumigLogo, name: 'Electrosumig' },
]

function useScroll75() {
  const sent = useRef(false)
  const { scrollYProgress } = useScroll()
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (!sent.current && v >= 0.75) { sent.current = true; trackEvent('scroll_75') }
  })
}

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header className={`topbar ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="wrap topbar-in">
        <a href="#inicio" className="brand" aria-label="Solventech, inicio"><img src={logo} alt="Solventech" width="190" height="21" /></a>
        <button className="menu-btn" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}><span /><span /></button>
        <nav id="menu" className={`menu ${open ? 'is-open' : ''}`} aria-label="Principal">
          {navItems.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}
          <a className="btn btn-dark btn-sm" href={CALENDLY} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('schedule_click', { location: 'header' })}>Agenda una llamada</a>
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

function Billboard() {
  return (
    <section className="billboard" aria-label="Lema Solventech">
      <div className="wrap">
        <Reveal><p className="billboard-en">Everywhere. Anywhere you need.</p></Reveal>
        <p className="billboard-big">
          <motion.span initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.9, ease: [0.2, 0.7, 0.1, 1] }}>En cada sede.</motion.span>
          <motion.span className="accent" initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.9, delay: 0.12, ease: [0.2, 0.7, 0.1, 1] }}>Donde lo necesites.</motion.span>
        </p>
        <Reveal delay={0.2}>
          <a className="btn btn-primary" href={CALENDLY} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('schedule_click', { location: 'billboard' })}>
            Agenda una llamada de 45 min <span className="btn-arrow" aria-hidden="true">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-in">
        <div className="footer-brand">
          <img src={isotipo} alt="" width="56" height="28" />
          <img src={logo} alt="Solventech" width="170" height="19" />
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
      <div className="wrap footer-bottom">
        <p>© {new Date().getFullYear()} Solventech. Todos los derechos reservados.</p>
        {/* TODO: enlazar la política de privacidad cuando esté publicada (Ley 1581). */}
        <span>Política de privacidad</span>
      </div>
    </footer>
  )
}

export default function App() {
  useScroll75()
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
