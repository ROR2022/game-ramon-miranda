'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, AudioLines, Camera, MapPin, Menu, Pause, Play, Volume2, X } from 'lucide-react'
import { experience, type Adventure } from '@/data/experience'

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="section-label"><span>{number}</span><span>{children}</span><i /></div>
}

function Header({ onAudio }: { onAudio: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const links = [['01', 'INICIO', '#home'], ['02', 'PERSONAJES', '#characters'], ['03', 'LA CIUDAD', '#city'], ['04', 'AVENTURAS', '#adventures'], ['05', 'FEED', '#feed'], ['06', 'ARCHIVO', '#archive']]
  return <header className="site-header">
    <a className="mini-brand" href="#home" aria-label="Ramon y Miranda, inicio">RM<span> / </span></a>
    <nav className={menuOpen ? 'main-nav nav-open' : 'main-nav'} aria-label="Navegación principal">
      {links.map(([n, text, href]) => <a key={n} href={href} onClick={() => setMenuOpen(false)}><small>{n}</small>{text}</a>)}
    </nav>
    <div className="header-actions"><span className="live-dot" /> <span className="header-time">22:48 — COUNTY TIME</span><button className="audio-mini" onClick={onAudio} aria-label="Control de radio"><AudioLines size={16} /></button><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button></div>
  </header>
}

function CharacterCard({ character, index }: { character: (typeof experience.characters)[number]; index: number }) {
  return <article className={`character-card character-${index + 1}`} style={{ '--character': character.color } as React.CSSProperties}>
    <div className="character-photo" style={{ backgroundImage: `linear-gradient(0deg, rgba(8,10,18,.82), transparent 56%), linear-gradient(90deg, ${character.color}33, transparent 60%), url(${character.portrait})`, backgroundPosition: index === 0 ? 'center 48%' : 'center 25%' }} role="img" aria-label={`Paisaje de Sunset County, retrato editorial de ${character.name}`}>
      <span className="photo-index">PERSONAJE 0{index + 1} / 02</span><span className="portrait-mark">{character.name.slice(0, 1)}</span>
      <div className="character-name"><span>{character.alias}</span><h3>{character.name}</h3></div>
    </div>
    <div className="character-info"><div className="role-line"><span className="role-dot" />{character.role}</div><p>{character.description}</p><blockquote>{character.quote}</blockquote>
      <div className="stats-list">{character.stats.map((stat) => <div className="stat" key={stat.label}><span>{stat.label}</span><div className="stat-track"><i style={{ width: `${stat.value}%` }} /></div><b>{stat.value}</b></div>)}</div>
    </div>
  </article>
}

function AdventureDialog({ adventure, onClose }: { adventure: Adventure; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'Tab') {
        const focusable = Array.from(document.querySelectorAll<HTMLElement>('[role="dialog"] button, [role="dialog"] a, [role="dialog"] [tabindex]:not([tabindex="-1"])'))
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])
  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <section className="adventure-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <button ref={closeRef} className="modal-close" onClick={onClose} aria-label="Cerrar aventura"><X /></button>
      <div className="modal-image" style={{ backgroundImage: `linear-gradient(0deg, #080a12, transparent 65%), url(${adventure.image})`, backgroundPosition: adventure.imagePosition }} />
      <div className="modal-content"><span className="eyebrow">MEMORIA {adventure.number} / {adventure.status}</span><h2 id="modal-title">{adventure.title}</h2><p>{adventure.description}</p><div className="modal-meta"><span><MapPin size={14} />{adventure.location}</span><span>{adventure.date}</span><span>{adventure.duration}</span></div></div>
    </section>
  </div>
}

export function SunsetExperience() {
  const [entered, setEntered] = useState(false)
  const [adventure, setAdventure] = useState<Adventure | null>(null)
  const [audioNotice, setAudioNotice] = useState('')
  const [menuAudio, setMenuAudio] = useState(false)
  const prevFocus = useRef<HTMLElement | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const closeAdventure = () => { setAdventure(null); window.setTimeout(() => prevFocus.current?.focus(), 0) }
  const toggleAudio = async () => {
    const audio = audioRef.current
    if (!audio || !experience.radioTrack) { setAudioNotice('SUNSET RADIO · Próximamente'); return }
    if (audio.paused) { try { await audio.play(); setMenuAudio(true); setAudioNotice('SUNSET RADIO · En directo') } catch { setAudioNotice('No se pudo iniciar el audio') } }
    else { audio.pause(); setMenuAudio(false); setAudioNotice('SUNSET RADIO · En pausa') }
  }
  return <main>
    <div className={`intro-screen ${entered ? 'intro-exited' : ''}`} aria-hidden={entered}>
      <div className="intro-image" />
      <div className="intro-content"><span className="intro-kicker">A STORY IN MOTION <i /> EST. 2026</span><div className="intro-logo"><span>RAMON</span><span>MIRANDA</span></div><p className="intro-subtitle">{experience.subtitle}</p><p className="intro-tagline">{experience.tagline}</p><button className="enter-button" onClick={() => { setEntered(true); void toggleAudio() }}><span>ENTRAR A LA HISTORIA</span><ArrowRight size={18} /></button><div className="intro-coordinates">25°46′ N &nbsp; 80°08′ W <span>·</span> COASTAL DISTRICT</div></div>
      <span className="intro-side">NO HAY UN CAMINO DE VUELTA</span><span className="intro-bottom">RM — ARCHIVO PERSONAL / 2026</span>
    </div>
    <div className="experience-content" inert={!entered}>
      <Header onAudio={() => void toggleAudio()} />
      <section className="hero" id="home" style={{ backgroundImage: `url(${experience.heroImage})` }}>
        <div className="hero-grain" /><div className="hero-topline"><span>FLORIDA KEYS · 25°46′ N</span><span>ISSUE Nº 001 <i /> SUMMER 2026</span></div>
        <div className="hero-copy"><span className="eyebrow"><i className="live-dot" /> WELCOME TO THEIR STORY</span><h1>RAMON<br /><em>MIRANDA</em></h1><p>Una ciudad de luces largas,<br />carreteras calientes y aventuras<br />que nunca aparecen en el plan.</p><div className="hero-buttons"><a className="button-primary" href="#city">EXPLORAR LA CIUDAD <ArrowDownRight size={16} /></a><a className="button-quiet" href="#characters"><Play size={14} /> VER LA HISTORIA</a></div></div>
        <div className="hero-bottom"><div className="hero-location"><MapPin size={15} /><span>COASTAL DISTRICT<br /><b>22:48 — NIGHT DRIVE</b></span></div><span className="hero-note">TWO SIBLINGS<br />ONE LONG WAY HOME</span><a href="#characters" className="scroll-cue" aria-label="Desplazarse a personajes"><span>SCROLL TO EXPLORE</span><ArrowDown size={16} /></a></div>
        <div className="hero-stamp">RM<br /><small>STORY</small><i>✳</i></div>
      </section>
      <section className="characters-section section-pad" id="characters"><SectionLabel number="01">THE MAIN CHARACTERS</SectionLabel><div className="section-heading"><h2>Dos formas<br />de <em>perderse.</em></h2><p>Se conocen de memoria.<br />La ciudad todavía no.</p></div><div className="characters-grid">{experience.characters.map((character, index) => <CharacterCard key={character.name} character={character} index={index} />)}</div><div className="characters-foot"><span>UN VÍNCULO FUERA DE MAPA</span><span>01 — 02 <i /></span></div></section>
      <section className="city-section section-pad" id="city"><SectionLabel number="02">THE CITY IS THE STORY</SectionLabel><div className="city-heading"><div><p className="eyebrow">SIX STOPS. NO SET ROUTE.</p><h2>La ciudad<br />también <em>recuerda.</em></h2></div><p>Una colección de esquinas, desvíos<br />y lugares que ahora son nuestros.</p></div><div className="zone-grid">{experience.zones.map((zone, index) => <article className={`zone-card zone-card-${index + 1}`} key={zone.code} style={{ '--zone-color': zone.color } as React.CSSProperties}><div className="zone-image" style={{ backgroundImage: `linear-gradient(180deg, transparent 20%, rgba(8,10,18,.8)), url(${zone.image})`, backgroundPosition: zone.imagePosition }} /><div className="zone-top"><span>{zone.code}</span><ArrowUpRight size={16} /></div><div className="zone-copy"><span className="zone-coordinate">{zone.coordinates}</span><h3>{zone.name}</h3><p>{zone.description}</p></div><span className="zone-index">0{index + 1}</span></article>)}</div><div className="city-caption"><span>UN MAPA HECHO DE RECUERDOS</span><span>NO ESTÁ A ESCALA <i /></span></div></section>
      <section className="adventures-section section-pad" id="adventures"><SectionLabel number="03">THE ADVENTURES</SectionLabel><div className="adventure-heading"><h2>La noche<br />todavía <em>es joven.</em></h2><span>SEIS HISTORIAS<br />Y CONTANDO <ArrowDownRight size={16} /></span></div><div className="adventure-grid">{experience.adventures.map((item, index) => <button className={`adventure-card ${item.featured ? 'adventure-featured' : ''}`} key={item.number} onClick={(event) => { prevFocus.current = event.currentTarget; setAdventure(item) }} aria-label={`Abrir aventura ${item.number}: ${item.title}`}><div className="adventure-image" style={{ backgroundImage: `linear-gradient(180deg, transparent 20%, rgba(8,10,18,.82)), url(${item.image})`, backgroundPosition: item.imagePosition }}><span className="adventure-number">MEMORY / {item.number}</span><span className="adventure-open"><ArrowUpRight size={18} /></span><span className="adventure-status">{item.status}</span></div><div className="adventure-copy"><span>{item.location} <i /> {item.date}</span><h3>{item.title}</h3><p>{item.description}</p></div></button>)}</div></section>
      <section className="feed-section section-pad" id="feed"><SectionLabel number="04">EVERY CITY HAS A STORY</SectionLabel><div className="feed-heading"><div><span className="eyebrow"><span className="feed-flash">✳</span> RAMON / MIRANDA SOCIAL CLUB</span><h2>STORY<br /><em>FEED</em></h2></div><p>Momentos que no cabían<br />en el carrete de la cámara.</p></div><div className="feed-grid">{experience.socialPosts.map((post, index) => <article className={`social-card social-card-${index + 1}`} key={`${post.username}-${post.time}`}><div className="social-top"><span className="avatar">{index === 1 ? 'R' : 'M'}</span><div><b>{post.username}</b><span>{post.location} · {post.time}</span></div><button aria-label="Más opciones" className="dots">···</button></div><div className="social-image" style={{ backgroundImage: `url(${post.image})`, backgroundPosition: post.position }} role="img" aria-label={`Recuerdo de ${post.location}`}><span className="social-place"><MapPin size={11} /> {post.location.toUpperCase()}</span></div><div className="social-actions"><span>♡</span><span>◯</span><span>↗</span><span className="social-save">⌑</span></div><p className="social-caption">{post.text}</p><div className="social-stats">♥ {post.likes} <span>COMMENTS {post.comments}</span></div></article>)}</div><div className="feed-bottom"><span>RM SOCIAL / SOLO BUENOS RECUERDOS</span><span>TRANSMITIENDO DESDE EL CONDADO <i /></span></div></section>
      <section className="archive-section section-pad" id="archive"><SectionLabel number="05">EL ARCHIVO / 2026</SectionLabel><div className="archive-heading"><h2>La vida entre<br /><em>aventuras.</em></h2><span>ROLL Nº 04<br />24 FOTOGRAMAS / SEG</span></div><div className="archive-grid"><button className="archive-tile archive-large" onClick={(event) => { prevFocus.current = event.currentTarget; setAdventure(experience.adventures[0]) }} aria-label="Ver recuerdo del atardecer"><div className="archive-hero-image" style={{ '--archive-desktop-image': `url(${experience.archiveImages[0].image})`, '--archive-mobile-image': `url(${experience.archiveImages[0].mobileImage ?? experience.archiveImages[0].image})`, backgroundPosition: experience.archiveImages[0].position } as React.CSSProperties} /><span>{experience.archiveImages[0].label}</span><Camera size={17} /></button><button className="archive-tile archive-tall" onClick={(event) => { prevFocus.current = event.currentTarget; setAdventure(experience.adventures[1]) }} aria-label="Ver recuerdo de la ciudad"><div style={{ backgroundImage: `url(${experience.archiveImages[1].image})`, backgroundPosition: experience.archiveImages[1].position }} /><span>{experience.archiveImages[1].label}</span><Camera size={17} /></button><button className="archive-tile archive-small" onClick={(event) => { prevFocus.current = event.currentTarget; setAdventure(experience.adventures[2]) }} aria-label="Ver recuerdo entre palmeras"><div style={{ backgroundImage: `url(${experience.archiveImages[2].image})`, backgroundPosition: experience.archiveImages[2].position }} /><span>{experience.archiveImages[2].label}</span><Camera size={17} /></button><div className="archive-note"><span>UN ROLLO<br />SIN REVELAR</span><div>“La mejor parte<br />nunca estaba<br />en el plan.”</div><span>RM / 22:48 <ArrowDownRight size={16} /></span></div><button className="archive-tile archive-wide" onClick={(event) => { prevFocus.current = event.currentTarget; setAdventure(experience.adventures[3]) }} aria-label="Ver recuerdo en la costa"><div style={{ backgroundImage: `url(${experience.archiveImages[3].image})`, backgroundPosition: experience.archiveImages[3].position }} /><span>{experience.archiveImages[3].label}</span><Camera size={17} /></button></div></section>
      <section className="final-scene" id="final" style={{ '--final-desktop-image': `url(${experience.heroImage})`, '--final-mobile-image': `url(${experience.finalMobileImage})` } as React.CSSProperties}><div className="final-content"><span className="eyebrow">A NOTE FROM THE COUNTY</span><h2>NO TODAS LAS AVENTURAS<br />NECESITAN <em>UN PLAN.</em></h2><div className="final-bottom"><span className="final-line" /><p>{experience.finalMessage}</p><a href="#home" className="back-top">VOLVER AL INICIO <ArrowLeft size={15} /></a></div></div><span className="final-city">RAMON / MIRANDA <i /> EST. 2026</span><span className="final-credit">THE STORY CONTINUES</span></section>
      <section className="story-cta" aria-labelledby="story-cta-title"><div><span className="eyebrow">RM / CREATIVE STUDIO</span><h2 id="story-cta-title">EL PRÓXIMO CAPÍTULO<br />PUEDE SER <em>EL TUYO.</em></h2><p>Creamos experiencias visuales únicas a partir de tus momentos reales.</p></div><a className="story-cta-button" href="https://wa.me/5217777937484?text=Hola%2C%20quiero%20crear%20mi%20propia%20historia" target="_blank" rel="noreferrer">HABLAR POR WHATSAPP <ArrowRight size={16} /></a></section>
      <footer className="site-footer"><a href="#home" className="footer-brand">RAMON<br />MIRANDA<span>®</span></a><p>{experience.footerNote}<br />UNA CIUDAD FICTICIA. UN RECUERDO REAL.</p><div className="footer-end"><span>HECHO CON LUZ DE ATARDECER</span><a href="#home" aria-label="Volver arriba">↑</a></div></footer>
    </div>
    <div className="radio-widget"><div className="radio-icon"><AudioLines size={17} /></div><div className="radio-label"><span>{experience.radioName}</span><b>{audioNotice || 'LATE NIGHT STORIES'}</b></div><button onClick={() => void toggleAudio()} aria-label={menuAudio ? 'Pausar radio' : 'Reproducir radio'}><span className={menuAudio ? 'radio-bars playing' : 'radio-bars'}><i /><i /><i /><i /></span>{menuAudio ? <Pause size={14} /> : <Volume2 size={15} />}</button><audio ref={audioRef} src={experience.radioTrack || undefined} loop preload="none" onError={() => setAudioNotice('Audio no disponible')} /></div>
    {audioNotice && <span className="sr-only" role="status" aria-live="polite">{audioNotice}</span>}
    {!entered && <button className="intro-audio" onClick={() => void toggleAudio()} aria-label="Escuchar Sunset Radio"><AudioLines size={16} /><span>RADIO OFF</span></button>}
    {adventure && <AdventureDialog adventure={adventure} onClose={closeAdventure} />}
  </main>
}
