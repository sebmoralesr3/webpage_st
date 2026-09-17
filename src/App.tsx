import { useState, type FormEvent } from 'react'
import './App.css'
import InitialLoader from './components/InitialLoader'
import Proposal from './sections/Proposal'
import Robot from './components/Robot'
import logo from './assets/logo.svg'
import logoWhite from './assets/logo_blanco.svg'
import kreaLogo from './assets/krea_logo.svg'
import zonedInLogo from './assets/zonedin_logo.svg'
import stratosLogo from './assets/stratos_logo.svg'
import grupoLogo from './assets/grupocomercial_logo.svg'
import electrosumigLogo from './assets/electrosumig_logo.svg'
import linkedinLogo from './assets/linkedin_logo.svg'
import instagramLogo from './assets/instagram_logo.svg'
import contactIllustration from './assets/contact-illustration.png'
import ablePhone from './assets/project-able-phone.png'
import provaliaPhone from './assets/project-provalia-phone.png'
import solvenStockPhone from './assets/project-solvenstock-phone.png'

const navItems = [['Inicio','inicio'],['Servicios','servicios'],['Proyectos','proyectos'],['Nosotros','nosotros'],['Contacto','contacto']]
const projects = {
  ABLE: ['Promueve el bienestar y el desarrollo humano mediante herramientas tecnológicas que fortalecen el seguimiento y el acompañamiento de las personas.','Facilita la identificación temprana de señales de alerta, brindando información que apoya la toma de decisiones de manera oportuna.','Complementa el trabajo de los profesionales, aportando herramientas que fortalecen el acompañamiento sin reemplazar su labor.'],
  Provalia: ['Una solución digital diseñada para acompañar procesos de crecimiento, seguimiento y desarrollo organizacional.','Centraliza información relevante y convierte los datos en herramientas útiles para tomar mejores decisiones.','Su experiencia clara y accesible facilita la adopción por parte de equipos y usuarios.'],
  "Solven N’Stock": ['Una plataforma pensada para simplificar el control de inventario y fortalecer la operación cotidiana de las empresas.','Permite organizar productos, movimientos y existencias desde una experiencia práctica y centralizada.','Transforma tareas repetitivas en procesos medibles, ordenados y fáciles de escalar.'],
}
const projectImages: Record<keyof typeof projects, string> = {
  ABLE: ablePhone,
  Provalia: provaliaPhone,
  "Solven N’Stock": solvenStockPhone,
}
const projectGradients: Record<keyof typeof projects, string> = {
  ABLE: 'linear-gradient(145deg, #009640 0%, #009FE3 38%, #F9B233 70%, #E6332A 100%)',
  Provalia: 'linear-gradient(145deg, #FEAD01 0%, #E86F44 48%, #5CB7A5 100%)',
  "Solven N’Stock": 'linear-gradient(145deg, #000000 0%, #285C94 55%, #243076 100%)',
}
const process = [
  ['Diagnóstico Estratégico','Comprendemos los desafíos, procesos y objetivos de la organización para definir una solución tecnológica alineada con sus necesidades.'],
  ['Diseño y Desarrollo','Convertimos la estrategia en una solución tecnológica a la medida, validando cada etapa para garantizar funcionalidad y escalabilidad.'],
  ['Implementación y Evolución','Implementamos la solución y acompañamos su crecimiento mediante mejoras continuas que aseguren su adopción y generación de valor.'],
]
const faqs = [
  ['¿Qué tipo de soluciones desarrolla SolvenTech?','Creamos desarrollos web y móviles a la medida, plataformas digitales, automatizaciones, soluciones con inteligencia artificial e identidades de marca. Cada proyecto parte de una necesidad real del negocio y se diseña para ser funcional, escalable y fácil de adoptar.'],
  ['¿Cómo trabajan un proyecto desde la idea hasta su lanzamiento?','Comenzamos con un diagnóstico estratégico para entender el problema, los usuarios y los objetivos. Luego diseñamos, desarrollamos y validamos la solución por etapas. Finalmente acompañamos su implementación, medición y evolución.'],
  ['¿Pueden integrarse con las herramientas que nuestra empresa ya utiliza?','Sí. Evaluamos los sistemas y flujos actuales —como hojas de cálculo, formularios, correo, WhatsApp, plataformas internas o servicios externos— para proponer una integración viable sin reemplazar innecesariamente toda la operación.'],
  ['¿Qué demuestran casos como ABLE, Provalia y Solven N’Stock?','Muestran nuestra capacidad para transformar retos distintos en productos digitales concretos: experiencias centradas en las personas, herramientas de seguimiento y plataformas que ordenan procesos operativos. Podemos aplicar el mismo enfoque a una necesidad particular de tu organización.'],
]
const SectionTitle = ({children}:{children:React.ReactNode}) => <h2 className="section-title">{children}</h2>
const Arrow = () => <span className="arrow" aria-hidden="true">↗</span>

function App() {
  const [menuOpen,setMenuOpen] = useState(false)
  const [activeProject,setActiveProject] = useState<keyof typeof projects>('ABLE')
  const [openSteps,setOpenSteps] = useState<number[]>([])
  const [contactType,setContactType] = useState('hola')
  const [openFaq,setOpenFaq] = useState<number | null>(0)
  const [formStatus,setFormStatus] = useState<'idle'|'sending'|'success'|'error'>('idle')
  const toggleStep = (i:number) => setOpenSteps(v => v.includes(i) ? v.filter(x => x !== i) : [...v,i])
  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormStatus('sending')
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    try {
      const response = await fetch('https://formsubmit.co/ajax/direccionejecutiva@solventechglobal.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('No se pudo enviar el formulario')
      form.reset()
      setContactType('hola')
      setFormStatus('success')
    } catch {
      setFormStatus('error')
    }
  }
  return <div className="site-shell">
    <InitialLoader />
    <header className="navbar">
      <a href="#inicio" aria-label="Solventech inicio"><img src={logo} alt="Solventech" /></a>
      <button className="menu-button" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Abrir menú" aria-expanded={menuOpen}><span/><span/><span/></button>
      <nav className={`nav-links ${menuOpen?'open':''}`}>
        {navItems.map(([label,id])=><a key={id} href={`#${id}`} onClick={()=>setMenuOpen(false)}>{label}</a>)}
        <a href="#contacto" className="button button-outline">Contáctanos</a>
      </nav>
    </header>
    <main>
      <div className="hero-screen">
      <section className="hero" id="inicio">
        <div className="hero-copy"><h1>Creamos software y soluciones digitales que impulsan tu negocio.</h1><p className="hero-lead">Diseñamos software a medida, experiencias digitales, automatizaciones inteligentes e identidades de marca para transformar la forma en que las empresas en Colombia operan, conectan y crecen.</p><div className="hero-actions"><a href="#contacto" className="button button-dark">Cuéntanos tu reto</a><a href="https://calendly.com/dptotecnologico-solventechglobal/solventech" target="_blank" rel="noopener noreferrer" className="button button-outline">Agendar cita</a></div></div>
        <div className="hero-robot" aria-label="Robot interactivo de Solventech"><Robot /></div>
      </section>
      <div className="logo-marquee" aria-label="Clientes"><div className="logo-track">{[kreaLogo,zonedInLogo,stratosLogo,grupoLogo,electrosumigLogo,kreaLogo,zonedInLogo,stratosLogo,grupoLogo,electrosumigLogo].map((x,i)=><img src={x} alt="" key={i}/>)}</div></div>
      </div>
      <section className="about" id="nosotros"><i className="spark left">✦</i><i className="spark right">✦</i><SectionTitle>Nosotros</SectionTitle><h3>Solventech es una empresa especializada en desarrollos a la medida para procesos transformacionales.</h3><p>Diseñamos soluciones tecnológicas que se adaptan a las necesidades de cada organización, integrando innovación, estrategia y tecnología para impulsar su transformación y crecimiento.</p></section>
      <section className="value grid-bg"><SectionTitle>Propuesta de valor</SectionTitle><p className="lead">Nuestra forma de trabajar está diseñada para generar valor real en cada etapa del proceso.</p><div className="value-grid">
        <article className="value-card"><Arrow/><h3>Soluciones personalizadas</h3><p>Diseñamos soluciones tecnológicas adaptadas a los procesos, objetivos y necesidades de cada organización, creando soluciones funcionales, escalables y alineadas con su realidad.</p></article>
        <article className="value-card featured"><Arrow/><h3>Tecnología inteligente</h3><p>Integramos inteligencia artificial, automatización y otras tecnologías emergentes en el desarrollo de soluciones tecnológicas, cuando las necesidades de cada organización lo requieran, para optimizar procesos, fortalecer la toma de decisiones y generar mayor valor.</p></article>
        <article className="value-card"><Arrow/><h3>Acompañamiento estratégico</h3><p>Trabajamos como aliados de nuestros clientes, aportando una visión consultiva y acompañándolos en cada etapa para garantizar soluciones con valor y resultados sostenibles.</p></article>
      </div></section>
      <section className="services" id="servicios"><div className="section-heading"><SectionTitle>Servicios</SectionTitle><p>Software a medida, automatización de procesos, diseño de experiencias digitales e identidad de marca.</p></div><div className="service-grid">
        <article className="service-card light"><h3>Desarrollo de software a medida</h3><p>Diseñamos y desarrollamos plataformas web, aplicaciones y soluciones tecnológicas personalizadas que responden a los desafíos de cada organización, creando herramientas funcionales, escalables y alineadas con sus objetivos de transformación.</p><a href="#contacto"><Arrow/>Conocer más</a></article>
        <article className="service-card dark"><h3>Identidad y estrategia de marca</h3><p>Construimos identidades de marca sólidas y coherentes que reflejan la esencia de cada organización, integrando estrategia e identidad visual para fortalecer una marca auténtica, reconocible y consistente.</p><a href="#contacto"><Arrow/>Conocer más</a></article>
      </div></section>
      <div className="appointment-section"><Proposal /></div>
      <section className="projects" id="proyectos"><SectionTitle>Proyectos destacados</SectionTitle><div className="project-tabs" role="tablist">{(Object.keys(projects) as Array<keyof typeof projects>).map(name=><button key={name} className={activeProject===name?'active':''} onClick={()=>setActiveProject(name)} role="tab" aria-selected={activeProject===name}>{name}</button>)}</div><article className="project-card"><div className="project-visual" style={{backgroundImage:projectGradients[activeProject]}}><img key={activeProject} src={projectImages[activeProject]} alt={`Vista de ${activeProject}`}/></div><div key={activeProject} className="project-copy"><h3>{activeProject}</h3>{projects[activeProject].map(x=><p key={x}>{x}</p>)}<a className="project-cta" href="#contacto"><span>Quiero una solución similar</span><span className="project-cta-arrow" aria-hidden="true">→</span></a></div></article></section>
      <section className="process"><SectionTitle>Camino de transformación</SectionTitle><p className="lead">Tres etapas para llevar tu organización al siguiente nivel.</p><div className="process-list">{process.map(([title,desc],i)=>{const open=openSteps.includes(i);return <article className={`process-card ${open?'open':''}`} key={title}><button onClick={()=>toggleStep(i)} aria-expanded={open}><span className="step-number">0{i+1}</span><span>{title}</span><span className="toggle">{open?'−':'+'}</span></button>{open&&<p>{desc}</p>}</article>})}</div></section>
      <section className="faq" id="preguntas"><SectionTitle>Preguntas frecuentes</SectionTitle><p className="lead">Conoce cómo convertimos una necesidad de negocio en una solución digital.</p><div className="faq-list">{faqs.map(([question,answer],i)=>{const open=openFaq===i;return <article className={`faq-item ${open?'open':''}`} key={question}><button onClick={()=>setOpenFaq(open?null:i)} aria-expanded={open}><span>{question}</span><span className="faq-toggle">{open?'−':'+'}</span></button>{open&&<p>{answer}</p>}</article>})}</div><div className="faq-footer"><p>¿Tienes un reto diferente?</p><a href="#contacto">Cuéntanos tu idea <span aria-hidden="true">→</span></a></div></section>
      <section className="contact" id="contacto"><SectionTitle>Contacto</SectionTitle><p className="lead">Cuéntanos sobre tu proyecto y hagamos algo increíble juntos.</p><div className="contact-card"><form onSubmit={handleContactSubmit}><input type="hidden" name="_subject" value="Nuevo contacto desde la web de SolvenTech"/><input type="text" name="_honey" className="form-honeypot" tabIndex={-1} autoComplete="off"/><div className="contact-types"><label><input type="radio" name="tipo_de_contacto" value="Decir hola" checked={contactType==='hola'} onChange={()=>setContactType('hola')}/> Decir Hola</label><label><input type="radio" name="tipo_de_contacto" value="Pedir cotización" checked={contactType==='cotizacion'} onChange={()=>setContactType('cotizacion')}/> Pedir Cotización</label></div><label>Nombre<input type="text" name="nombre" placeholder="Tu nombre" required/></label><label>Email*<input type="email" name="email" placeholder="tu@email.com" required/></label><label>Mensaje*<textarea name="mensaje" placeholder={contactType==='cotizacion'?'Cuéntanos qué necesitas cotizar…':'Cuéntanos sobre tu proyecto…'} required/></label><button type="submit" className="button button-dark" disabled={formStatus==='sending'}>{formStatus==='sending'?'Enviando…':'Enviar mensaje'}</button>{formStatus==='success'&&<div className="form-feedback success" role="status"><strong>¡Mensaje enviado con éxito!</strong><span>Gracias por escribirnos. También puedes <a href="https://calendly.com/dptotecnologico-solventechglobal/solventech" target="_blank" rel="noopener noreferrer">agendar una reunión</a>.</span></div>}{formStatus==='error'&&<div className="form-feedback error" role="alert"><strong>No pudimos enviar el mensaje.</strong><span>Inténtalo nuevamente o escríbenos a direccionejecutiva@solventechglobal.com.</span></div>}</form><img src={contactIllustration} alt="Ilustración abstracta"/></div></section>
    </main>
    <footer><div className="footer-content"><div className="footer-brand"><img src={logoWhite} alt="Solventech"/><nav>{navItems.map(([label,id])=><a key={id} href={`#${id}`}>{label}</a>)}</nav><div className="socials"><a href="https://www.linkedin.com/company/solventechco/" aria-label="LinkedIn"><img src={linkedinLogo} alt=""/></a><a href="https://www.instagram.com/solventech.co/" aria-label="Instagram"><img src={instagramLogo} alt=""/></a></div></div><div className="footer-contact"><h2>Contáctanos:</h2><p>Email: <a href="mailto:direccionejecutiva@solventechglobal.com">direccionejecutiva@solventechglobal.com</a></p><p>Teléfono: <a href="tel:+573156039833">+57 (315) 603-9833</a></p><p>Dirección: Cl. 93 #43-106,<br/>Nte. Centro Histórico, Barranquilla, Atlántico</p></div><form className="newsletter" onSubmit={e=>e.preventDefault()}><input type="email" placeholder="Email" aria-label="Email para suscripción"/><button>Suscribirse</button></form></div><div className="footer-bottom"><p>© {new Date().getFullYear()} Solventech. Todos los derechos reservados.</p><a href="#">Política de privacidad</a></div></footer>
  </div>
}
export default App
