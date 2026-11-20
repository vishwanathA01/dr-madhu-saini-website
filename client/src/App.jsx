import React, { useEffect, useState } from 'react'
import {
  ArrowRight, Award, BriefcaseMedical, CalendarDays, CheckCircle2, ChevronDown, Clock3, ExternalLink,
  GraduationCap, Hospital, MapPin, Menu, Navigation, Phone, Send, Siren, X
} from 'lucide-react'
import { doctor } from './data/doctor'
import Admin from './Admin'

const api = import.meta.env.VITE_API_URL || '' // same domain; dev server proxies /api
const DEFAULT_WA_TEXT = `Hi ${doctor.shortName}, I would like to book an appointment.`
const waLink = (text = DEFAULT_WA_TEXT) => `https://wa.me/${doctor.whatsapp}?text=${encodeURIComponent(text)}`
const mapEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(doctor.hospital.mapQuery)}&z=15&output=embed`
const mapDirections = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(doctor.hospital.mapQuery)}`
const NAV = [['Home', 'home'], ['About', 'about'], ['Services', 'services'], ['FAQs', 'faqs'], ['Contact', 'contact']]
const INTERESTS = [...doctor.categories, 'General consultation']
const EMPTY_FORM = { name: '', phone: '', email: '', interest: '', preferredDate: '', preferredTime: '', message: '', consent: false }

function WhatsAppIcon({ size = 20 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.28-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9a11.82 11.82 0 0 0-3.48-8.41Z"/></svg>
}

function isSunday(value) {
  const [y, m, d] = value.split('-').map(Number)
  return new Date(y, m - 1, d).getDay() === 0
}

function buildWhatsAppText(f) {
  const lines = [DEFAULT_WA_TEXT, '', `Name: ${f.name}`, `Phone: ${f.phone}`]
  if (f.email) lines.push(`Email: ${f.email}`)
  if (f.interest) lines.push(`Interested in: ${f.interest}`)
  if (f.preferredDate) lines.push(`Preferred date: ${f.preferredDate}${f.preferredTime ? ` (${f.preferredTime})` : ''}`)
  else if (f.preferredTime) lines.push(`Preferred session: ${f.preferredTime}`)
  if (f.message) lines.push(`Message: ${f.message}`)
  return lines.join('\n')
}

function useActiveSection() {
  const [active, setActive] = useState('home')
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id) })
    }, { rootMargin: '-45% 0px -50% 0px' })
    NAV.forEach(([, id]) => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])
  return active
}

function TopBar() {
  return <div className="topbar"><div className="container topbar-inner">
    <div className="topbar-info">
      <span className="topbar-hours"><Clock3 size={14}/> OPD: {doctor.hoursShort}</span>
      <span><MapPin size={14}/> {doctor.hospital.name}, {doctor.hospital.area}</span>
    </div>
    <a href={`tel:${doctor.phone.tel}`} className="topbar-call"><Phone size={14}/> Call {doctor.phone.display}</a>
  </div></div>
}

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection()
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <header className={scrolled ? 'header scrolled' : 'header'}><div className="container nav">
    <a className="brand" href="#home" aria-label={`${doctor.name} – home`}><img src={doctor.images.logo} alt={`${doctor.name} – Physician & Diabetologist`} width="216" height="62"/></a>
    <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>{open ? <X/> : <Menu/>}</button>
    <nav className={open ? 'nav-links show' : 'nav-links'}>
      {NAV.map(([label, id]) => <a key={id} href={`#${id}`} className={active === id ? 'active' : undefined} onClick={() => setOpen(false)}>{label}</a>)}
      <a className="btn primary nav-cta" href="#contact" onClick={() => setOpen(false)}><CalendarDays size={16}/> Book Appointment</a>
    </nav>
  </div></header>
}

function Hero() {
  const badges = [`${doctor.experienceYears}+ Years Experience`, `MD Medicine – ${doctor.college}`, doctor.title]
  return <section className="hero" id="home">
    <div className="hero-ring ring-one"/><div className="hero-ring ring-two"/>
    <svg className="hero-ecg" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 48H930l14-30 18 56 18-70 15 44 11-10 10 10H1440" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke"/></svg>
    <div className="container hero-grid">
      <div className="hero-copy">
        <span className="hero-chip"><MapPin size={14}/> {doctor.hospital.name} · {doctor.hospital.area}</span>
        <h1>General Physician &amp; <em>Diabetologist</em> in Hisar<span className="h1-name">{doctor.name}</span></h1>
        <p className="hero-lead">Expert care for diabetes, blood pressure, thyroid, fever, infections and adult medical problems — with careful diagnosis and treatment that is explained clearly.</p>
        <p className="hero-qual"><GraduationCap size={18}/> {doctor.degrees} from {doctor.college} · {doctor.experienceYears} years of experience, including Fortis Hospital, Mohali</p>
        <ul className="hero-badges">{badges.map(b => <li key={b}><CheckCircle2 size={15}/> {b}</li>)}</ul>
        <div className="hero-actions">
          <a className="btn light" href="#contact"><CalendarDays size={17}/> Book an Appointment</a>
          <a className="btn outline-light" href={`tel:${doctor.phone.tel}`}><Phone size={17}/> Call {doctor.phone.display}</a>
        </div>
      </div>
      <div className="portrait-wrap">
        <div className="portrait-card">
          <img src={doctor.images.portrait} alt={`${doctor.name}, ${doctor.specialty} in Hisar`} width="1200" height="800" fetchpriority="high"/>
          <div className="portrait-caption"><span className="caption-dot"/><div><b>{doctor.name}</b><small>{doctor.title}</small></div></div>
        </div>
        <div className="counter-card"><b>{doctor.experienceYears}+</b><span>Years of<br/>care</span></div>
        <div className="floating-note"><span className="note-icon"><Clock3 size={18}/></span><div><b>OPD Mon – Sat</b><small>10 AM – 3 PM · 5:30 – 7 PM</small></div></div>
      </div>
    </div>
  </section>
}

function Highlights() {
  const items = [
    [GraduationCap, `MD Medicine`, doctor.college],
    [Award, `${doctor.experienceYears}+ Years`, 'Adult medicine & diabetes'],
    [Clock3, 'Mon – Sat OPD', 'Morning & evening sessions'],
    [Siren, '24×7 Emergency', doctor.emergency.display]
  ]
  return <section className="highlights" aria-label="Highlights"><div className="container highlight-grid">
    {items.map(([Icon, title, sub]) => <div className="highlight" key={title}><span className="icon-chip"><Icon size={22}/></span><div><b>{title}</b><small>{sub}</small></div></div>)}
  </div></section>
}

function About() {
  const credIcon = { degree: GraduationCap, current: Hospital, past: BriefcaseMedical }
  return <section className="section" id="about"><div className="container about-grid">
    <div className="about-media">
      <div className="about-photo"><img src={doctor.images.opd} alt={`${doctor.name} in her OPD at ${doctor.hospital.name}, Hisar`} width="1077" height="895" loading="lazy"/></div>
      <div className="about-tag"><span className="icon-chip"><Hospital size={20}/></span><div><b>{doctor.hospital.name}</b><small>{doctor.hospital.area}</small></div></div>
    </div>
    <div>
      <span className="eyebrow">About the doctor</span>
      <h2>{doctor.name} – Physician &amp; <em>Diabetologist</em> in Hisar</h2>
      {doctor.about.map(p => <p className="lead-text" key={p.slice(0, 20)}>{p}</p>)}
      <ul className="cred-list">{doctor.credentials.map(c => { const Icon = credIcon[c.kind]; return <li key={c.text} className={c.kind}><span className="icon-chip small"><Icon size={17}/></span>{c.text}</li> })}</ul>
      <div className="about-actions">
        <a className="btn whatsapp" href={waLink()} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={18}/> Talk to us on WhatsApp</a>
        <a className="btn ghost" href="#contact">Book an appointment <ArrowRight size={16}/></a>
      </div>
    </div>
  </div></section>
}

function Services({ onBook }) {
  const [filter, setFilter] = useState('All')
  const tabs = ['All', ...doctor.categories]
  const count = t => t === 'All' ? doctor.services.length : doctor.services.filter(s => s.category === t).length
  const shown = filter === 'All' ? doctor.services : doctor.services.filter(s => s.category === filter)
  return <section className="section services-section" id="services"><div className="container">
    <div className="section-heading">
      <div><span className="eyebrow">Services</span><h2>General Medicine &amp; <em>Diabetes Care</em></h2></div>
      <p>From a fever that won't settle to long-term diabetes, BP and thyroid control — complete adult medical care under one roof at {doctor.hospital.name}.</p>
    </div>
    <div className="tabs" role="tablist" aria-label="Filter services">
      {tabs.map(t => <button key={t} role="tab" aria-selected={filter === t} className={filter === t ? 'tab active' : 'tab'} onClick={() => setFilter(t)}>{t}<span>{count(t)}</span></button>)}
    </div>
    <div className="service-grid">
      {shown.map(s => { const Icon = s.icon; return <article className="service-card" key={s.title}>
        <div className="service-top"><span className="icon-chip"><Icon size={22}/></span><span className="service-tag">{s.category}</span></div>
        <h3>{s.title}</h3>
        <p>{s.text}</p>
        <a href="#contact" className="service-link" onClick={() => onBook(s.category)}>Book for this <ArrowRight size={15}/></a>
      </article> })}
    </div>
  </div></section>
}

function Faqs() {
  return <section className="section faq-section" id="faqs"><div className="container faq-grid">
    <div>
      <span className="eyebrow">Good to know</span>
      <h2>Frequently asked <em>questions</em></h2>
      <div className="help-card">
        <b>Still have a question?</b>
        <p>Call or WhatsApp the appointment desk during OPD hours.</p>
        <div className="help-actions">
          <a className="btn light small" href={`tel:${doctor.phone.tel}`}><Phone size={15}/> Call</a>
          <a className="btn whatsapp small" href={waLink()} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={15}/> WhatsApp</a>
        </div>
      </div>
    </div>
    <div className="faq-list">{doctor.faqs.map((f, i) => <details key={f.q} open={i === 0}><summary>{f.q}<ChevronDown size={18}/></summary><p>{f.a}</p></details>)}</div>
  </div></section>
}

function Contact({ form, setForm }) {
  const [status, setStatus] = useState({ state: 'idle', message: '', wa: '' })
  const update = e => setForm({ ...form, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })
  const today = new Date().toLocaleDateString('en-CA')

  async function submit(e) {
    e.preventDefault()
    if (!form.consent) return setStatus({ state: 'error', message: 'Please agree to be contacted about this appointment enquiry.', wa: '' })
    if (form.preferredDate && isSunday(form.preferredDate)) return setStatus({ state: 'error', message: 'The OPD is closed on Sundays. Please choose a day from Monday to Saturday.', wa: '' })
    const wa = waLink(buildWhatsAppText(form))
    setStatus({ state: 'loading', message: '', wa: '' })
    try {
      const res = await fetch(`${api}/api/appointments`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.message || (res.status === 429 ? 'Too many enquiries from this device. Please try again later.' : 'We could not send your enquiry.'))
      setStatus({ state: 'success', message: `Thank you, ${form.name.split(' ')[0]}. Your enquiry has been received — the clinic will call you to confirm a time.`, wa })
      setForm(EMPTY_FORM)
    } catch (err) {
      const reason = err instanceof TypeError ? 'We could not reach the server.' : err.message
      setStatus({ state: 'error', message: `${reason} You can send the same enquiry on WhatsApp instead.`, wa })
    }
  }

  return <section className="section contact-section" id="contact"><div className="container">
    <div className="section-heading center">
      <div><span className="eyebrow">Contact us</span><h2>Book an <em>Appointment</em></h2></div>
      <p>Call or WhatsApp to book directly, or send an enquiry below and the team will call you back to confirm.</p>
    </div>
    <div className="contact-grid">
      <div className="contact-cards">
        <div className="contact-card">
          <span className="icon-chip"><Phone size={20}/></span>
          <div><small>Appointments (Call / WhatsApp)</small><a href={`tel:${doctor.phone.tel}`} className="contact-value">{doctor.phone.display}</a>
            <div className="mini-actions"><a href={`tel:${doctor.phone.tel}`}><Phone size={14}/> Call</a><a href={waLink()} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={14}/> WhatsApp</a></div></div>
        </div>
        <div className="contact-card emergency">
          <span className="icon-chip"><Siren size={20}/></span>
          <div><small>Hospital Emergency (24×7)</small><a href={`tel:${doctor.emergency.tel}`} className="contact-value">{doctor.emergency.display}</a></div>
        </div>
        <div className="contact-card">
          <span className="icon-chip"><MapPin size={20}/></span>
          <div><small>Location</small><b>{doctor.hospital.name}</b><p>{doctor.hospital.street}, {doctor.hospital.city}</p>
            <div className="mini-actions"><a href={mapDirections} target="_blank" rel="noopener noreferrer"><Navigation size={14}/> Get directions</a></div></div>
        </div>
        <div className="contact-card">
          <span className="icon-chip"><Clock3 size={20}/></span>
          <div><small>OPD Hours · Mon – Sat</small>{doctor.hours.map(h => <p className="hours-row" key={h.label}><span>{h.label}</span><b>{h.time}</b></p>)}<p className="muted-note">Closed on Sundays · Emergency open 24×7</p></div>
        </div>
      </div>

      <form className="appointment-form" onSubmit={submit}>
        <div className="form-title"><div><small>Appointment enquiry</small><h3>Send an enquiry</h3></div><span className="icon-chip"><CalendarDays size={20}/></span></div>
        <div className="form-row">
          <label>Name<input name="name" value={form.name} onChange={update} placeholder="Your full name" required minLength="2" maxLength="100" autoComplete="name"/></label>
          <label>Phone<input name="phone" type="tel" value={form.phone} onChange={update} placeholder="+91 98765 43210" required pattern="[0-9+\s\-]{8,18}" autoComplete="tel"/></label>
        </div>
        <div className="form-row">
          <label>Email <span>(optional)</span><input type="email" name="email" value={form.email} onChange={update} placeholder="you@example.com" autoComplete="email"/></label>
          <label>Interested in<select name="interest" value={form.interest} onChange={update}><option value="">Select a service</option>{INTERESTS.map(i => <option key={i}>{i}</option>)}</select></label>
        </div>
        <div className="form-row">
          <label>Preferred date <span>(Mon – Sat)</span><input type="date" name="preferredDate" value={form.preferredDate} onChange={update} min={today}/></label>
          <label>Preferred session<select name="preferredTime" value={form.preferredTime} onChange={update}><option value="">No preference</option><option value="Morning">Morning · 10 AM – 3 PM</option><option value="Evening">Evening · 5:30 – 7 PM</option></select></label>
        </div>
        <label>Message <span>(optional — please don't share sensitive medical details)</span><textarea name="message" value={form.message} onChange={update} rows="3" maxLength="500" placeholder="Anything the clinic should know when scheduling?"/></label>
        <label className="consent"><input type="checkbox" name="consent" checked={form.consent} onChange={update}/> I agree to be contacted by the clinic about this appointment enquiry.</label>
        {status.message && <div className={`form-status ${status.state}`} role="status">
          <span>{status.message}</span>
          {status.wa && <a className="btn whatsapp small" href={status.wa} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={15}/> {status.state === 'success' ? 'Also send on WhatsApp' : 'Send on WhatsApp'}</a>}
        </div>}
        <button className="btn primary submit" disabled={status.state === 'loading'}>{status.state === 'loading' ? 'Sending…' : <>Send Enquiry <Send size={16}/></>}</button>
        <small className="form-note">An enquiry is not a confirmed booking. For emergencies call {doctor.emergency.display} (24×7).</small>
      </form>
    </div>

    <div className="map-card">
      <iframe title={`Map to ${doctor.hospital.name}, Hisar`} src={mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen/>
      <a className="btn primary small map-btn" href={mapDirections} target="_blank" rel="noopener noreferrer"><Navigation size={15}/> Get directions</a>
    </div>
  </div></section>
}

function Footer() {
  return <footer><div className="container footer-grid">
    <div className="footer-brand">
      <a className="footer-logo" href="#home" aria-label={`${doctor.name} – home`}><img src={doctor.images.logo} alt={doctor.name} width="167" height="48" loading="lazy"/></a>
      <p>{doctor.specialty} in Hisar. {doctor.degrees} from {doctor.college}, with {doctor.experienceYears} years of experience.</p>
      <a className="footer-ext" href={doctor.hospital.website} target="_blank" rel="noopener noreferrer">{doctor.hospital.name} <ExternalLink size={13}/></a>
    </div>
    <div><h4>Quick Links</h4><ul>{NAV.map(([label, id]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}</ul></div>
    <div><h4>Services</h4><ul>{doctor.footerServices.map(s => <li key={s}><a href="#services">{s}</a></li>)}</ul></div>
    <div><h4>Contact</h4><ul className="footer-contact">
      <li><Phone size={15}/><a href={`tel:${doctor.phone.tel}`}>{doctor.phone.display}</a></li>
      <li><MapPin size={15}/><span>{doctor.hospital.street}, {doctor.hospital.city}</span></li>
      <li><Clock3 size={15}/><span>{doctor.hoursShort}</span></li>
      <li><Siren size={15}/><span>Emergency 24×7: <a href={`tel:${doctor.emergency.tel}`}>{doctor.emergency.display}</a></span></li>
    </ul></div>
  </div>
  <div className="container footer-bottom">
    <span>© {new Date().getFullYear()} {doctor.name}. All rights reserved.</span>
    <span>This website is for general awareness only and is not a substitute for a medical consultation.</span>
  </div></footer>
}

function FloatingActions() {
  return <div className="fab-stack">
    <a className="fab whatsapp" href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"><WhatsAppIcon size={26}/></a>
    <a className="fab call" href={`tel:${doctor.phone.tel}`} aria-label={`Call ${doctor.phone.display}`}><Phone size={22}/></a>
  </div>
}

function Site() {
  const [form, setForm] = useState(EMPTY_FORM)
  const bookFor = interest => setForm(f => ({ ...f, interest }))
  return <>
    <TopBar/>
    <Header/>
    <main>
      <Hero/>
      <Highlights/>
      <About/>
      <Services onBook={bookFor}/>
      <Faqs/>
      <Contact form={form} setForm={setForm}/>
    </main>
    <Footer/>
    <FloatingActions/>
  </>
}

export default function App() {
  if (window.location.pathname === '/admin') return <Admin/>
  return <Site/>
}
