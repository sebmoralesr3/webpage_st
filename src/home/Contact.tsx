import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { trackEvent } from '../analytics'
import { CALENDLY, EMAIL, NEEDS, PHONE_HREF, PHONE_LABEL } from './data'
import { SectionHead } from './Reveal'

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const [needs, setNeeds] = useState<string[]>([])
  const [status, setStatus] = useState<Status>('idle')
  const toggle = (n: string) => setNeeds((v) => (v.includes(n) ? v.filter((x) => x !== n) : [...v, n]))

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('sending')
    const form = event.currentTarget
    const data = { ...Object.fromEntries(new FormData(form).entries()), necesidades: needs.join(', ') || 'Sin especificar' }
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('No se pudo enviar el formulario')
      form.reset()
      setNeeds([])
      setStatus('success')
      trackEvent('generate_lead', { form_name: 'contacto', needs: needs.join('|') || 'none' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="section section-contact" id="contacto">
      <div className="wrap contact-grid">
        <div>
          <SectionHead num="04" label="Contacto" title="Cuéntanos qué necesitas." lead="Déjanos tus datos y te escribimos. ¿Prefieres hablar ya? Agenda una llamada de 45 minutos." />
          <div className="contact-alt">
            <a className="text-link" href={CALENDLY} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('schedule_click', { location: 'contacto' })}>Agendar directamente <span className="btn-arrow" aria-hidden="true">→</span></a>
            <a href={PHONE_HREF}>{PHONE_LABEL}</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
        </div>
        <motion.form className="form" onSubmit={submit} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: [0.2, 0.7, 0.1, 1] }}>
          <input type="hidden" name="_subject" value="Nuevo contacto desde la web de Solventech" />
          <label className="form-honeypot">No completar este campo<input type="text" name="_honey" tabIndex={-1} autoComplete="off" /></label>
          <fieldset className="full">
            <legend>¿Qué necesitas?</legend>
            <div className="needs">
              {NEEDS.map((n) => (
                <button type="button" key={n} className={`need ${needs.includes(n) ? 'is-on' : ''}`} aria-pressed={needs.includes(n)} onClick={() => toggle(n)}>{n}</button>
              ))}
            </div>
          </fieldset>
          <label>Nombre<input type="text" name="nombre" autoComplete="name" required /></label>
          <label>Empresa<input type="text" name="empresa" autoComplete="organization" required /></label>
          <label>Email<input type="email" name="email" autoComplete="email" required /></label>
          <label>WhatsApp<input type="tel" name="whatsapp" autoComplete="tel" placeholder="+57" /></label>
          <label className="full">Cuéntanos un poco más<textarea name="mensaje" rows={3} placeholder="Ej.: queremos renovar la marca y tener una web que reciba pedidos." /></label>
          <button type="submit" className="btn btn-dark full" disabled={status === 'sending'}>
            {status === 'sending' ? 'Enviando…' : 'Enviar'} <span className="btn-arrow" aria-hidden="true">→</span>
          </button>
          <AnimatePresence>
            {status === 'success' && (
              <motion.p className="form-msg full" role="status" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <b>Recibido.</b> Te escribimos muy pronto. Si quieres adelantar, <a href={CALENDLY} target="_blank" rel="noopener noreferrer">agenda una llamada</a>.
              </motion.p>
            )}
            {status === 'error' && (
              <motion.p className="form-msg is-error full" role="alert" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <b>No pudimos enviar el mensaje.</b> Inténtalo de nuevo o escríbenos a {EMAIL}.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  )
}
