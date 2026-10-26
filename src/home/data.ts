import solvenStockPhone from '../assets/project-solvenstock-phone.webp'
import provaliaPhone from '../assets/project-provalia-phone.webp'
import ablePhone from '../assets/project-able-phone.webp'

export const CALENDLY = 'https://calendly.com/dptotecnologico-solventechglobal/solventech'
export const EMAIL = 'direccionejecutiva@solventechglobal.com'
export const PHONE_LABEL = '+57 315 603 9833'
export const PHONE_HREF = 'tel:+573156039833'

/** Secciones que recorre el riel de conexión, en orden. */
export const SECTIONS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'lineas', label: 'Qué hacemos' },
  { id: 'proceso', label: 'Proceso' },
  { id: 'productos', label: 'Productos' },
  { id: 'contacto', label: 'Contacto' },
] as const

export const LINES = ['Marca', 'Web', 'Producto'] as const
export type Line = (typeof LINES)[number]

export const PRODUCTS = [
  {
    id: 'solvenstock',
    name: 'Solven N’Stock',
    category: 'Inventario',
    image: solvenStockPhone,
    alt: 'Solven N’Stock: pantalla de gestión de inventario en un celular',
    text: 'Productos, movimientos y existencias en un solo lugar, desde el celular. Para comercios y distribuidoras.',
    cta: 'Pedir una demo',
  },
  {
    id: 'provalia',
    name: 'Provalia',
    category: 'Proyectos con IA',
    image: provaliaPhone,
    alt: 'Provalia: pantalla de inicio en un celular',
    text: 'Ideas que se convierten en proyectos: cuatro pasos guiados con inteligencia artificial hasta un documento listo para presentar.',
    cta: 'Llevarlo a mi organización',
  },
  {
    id: 'able',
    name: 'ABLE',
    category: 'Inclusión y aprendizaje',
    image: ablePhone,
    alt: 'ABLE: plataforma de inclusión con sus juegos en Google Play',
    text: 'Comunidades diversas conectadas por la educación y el juego, con apps publicadas en Google Play.',
    cta: 'Conocer ABLE',
  },
] as const

export const STEPS = [
  { title: 'Llamada', time: '45 minutos', text: 'Entendemos tu marca, tu operación y lo que quieres lograr.', get: 'Un diagnóstico claro, aunque no trabajemos juntos.' },
  { title: 'Propuesta', time: 'Después de la llamada', text: 'Convertimos lo que hablamos en un plan concreto.', get: 'Alcance, fases, plazo e inversión en una sola página.' },
  { title: 'Diseño y desarrollo', time: 'Por fases', text: 'Diseñamos y construimos en ciclos cortos que pruebas con tu equipo.', get: 'Versiones funcionando, no presentaciones.' },
  { title: 'Lanzamiento', time: 'Y acompañamiento', text: 'Publicamos, capacitamos a tu equipo y medimos que funcione.', get: 'Tu marca, tu web o tu sistema en uso real.' },
] as const

export const NEEDS = ['Marca e imagen', 'Una web', 'Una plataforma o app', 'Un producto Solventech'] as const
