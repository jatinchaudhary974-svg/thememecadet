'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  Youtube, Mail, Instagram, ArrowUpRight, ChevronRight,
  Menu, X, Target, Compass, Flame, ShieldCheck, Radio,
  Play, ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CadetMark } from '@/components/cadet/Logo'

/* ---------- Small primitives ---------- */
const Eyebrow = ({ children, className = '' }) => (
  <span className={`inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-cadet-khaki font-mono ${className}`}>
    <span className="inline-block w-6 h-px bg-cadet-gold/70" />
    {children}
  </span>
)

const SectionLabel = ({ index, title }) => (
  <div className="flex items-center gap-4 mb-10">
    <span className="font-mono text-[11px] tracking-[0.28em] text-cadet-gold">{index}</span>
    <span className="h-px flex-1 bg-cadet-bone/10" />
    <span className="font-mono text-[11px] tracking-[0.28em] text-cadet-khaki uppercase">{title}</span>
  </div>
)

/* ---------- NAV ---------- */
function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'YouTube', href: '#youtube' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur-xl bg-cadet-ink/70 border-b border-cadet-bone/5'
          : 'bg-transparent'
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        <a href="#home" className="flex items-center gap-3 group">
          <CadetMark size={34} />
          <div className="leading-none">
            <div className="text-[13px] md:text-sm font-semibold tracking-[0.22em] text-cadet-bone">
              THEMEMECADET
            </div>
            <div className="hidden md:block text-[9px] font-mono tracking-[0.35em] text-cadet-khaki mt-1">
              EST · X · 2025
            </div>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative px-4 py-2 text-[13px] tracking-[0.15em] uppercase text-cadet-bone/80 hover:text-cadet-gold transition-colors"
            >
              {l.label}
              <span className="absolute left-4 right-4 -bottom-0.5 h-px scale-x-0 hover:scale-x-100 origin-left bg-cadet-gold transition-transform" />
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <a
            href="https://youtube.com/@thememecadet"
            target="_blank"
            rel="noreferrer"
            className="btn-shine inline-flex items-center gap-2 px-4 py-2 text-[12px] tracking-[0.2em] uppercase font-medium bg-cadet-gold text-cadet-night hover:bg-cadet-bone transition-colors"
          >
            <Youtube className="w-4 h-4" /> Watch
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 text-cadet-bone"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-cadet-bone/5 bg-cadet-ink/95 backdrop-blur-xl"
          >
            <div className="container py-6 flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-3 border-b border-cadet-bone/5 text-cadet-bone/90 uppercase tracking-[0.2em] text-sm"
                >
                  {l.label} <ChevronRight className="w-4 h-4 text-cadet-gold" />
                </a>
              ))}
              <a
                href="https://youtube.com/@thememecadet"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-3 text-[12px] tracking-[0.2em] uppercase font-medium bg-cadet-gold text-cadet-night"
              >
                <Youtube className="w-4 h-4" /> Watch on YouTube
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

/* ---------- HERO ---------- */
function Hero() {
  const { scrollY } = useScroll()
  const yBg = useTransform(scrollY, [0, 600], [0, 120])
  const opacityBg = useTransform(scrollY, [0, 500], [1, 0.4])

  return (
    <section id="home" className="relative min-h-[100svh] flex items-center overflow-hidden pt-24 md:pt-28">
      {/* Background layers */}
      <motion.div style={{ y: yBg, opacity: opacityBg }} className="absolute inset-0 grid-lines" />
      <div className="absolute inset-0 radial-fade" />

      {/* corner crosshairs */}
      <div className="absolute inset-6 md:inset-10 pointer-events-none">
        {[
          'top-0 left-0',
          'top-0 right-0 rotate-90',
          'bottom-0 left-0 -rotate-90',
          'bottom-0 right-0 rotate-180',
        ].map((pos, i) => (
          <div key={i} className={`absolute ${pos} w-6 h-6`}>
            <div className="absolute top-0 left-0 w-full h-px bg-cadet-gold/60" />
            <div className="absolute top-0 left-0 h-full w-px bg-cadet-gold/60" />
          </div>
        ))}
      </div>

      {/* Vertical side text */}
      <div className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2 rotate-180 [writing-mode:vertical-rl] font-mono text-[10px] tracking-[0.5em] text-cadet-khaki">
        NO. 001 — OFFICIAL HEADQUARTERS
      </div>
      <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 [writing-mode:vertical-rl] font-mono text-[10px] tracking-[0.5em] text-cadet-khaki">
        VISION · DISCIPLINE · EXECUTION
      </div>

      <div className="container relative z-10 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center max-w-5xl mx-auto"
        >
          <div className="mb-8 md:mb-10">
            <CadetMark size={104} />
          </div>

          <Eyebrow className="mb-6">Official Brand Headquarters</Eyebrow>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] text-balance"
          >
            THEME<span className="text-cadet-gold">M</span>E<br className="md:hidden" />
            CADET
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-8 md:mt-10 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-cadet-gold" />
            <span className="font-mono text-xs md:text-sm tracking-[0.4em] text-cadet-bone/90">
              VEER BHOGYA VASUNDHARA
            </span>
            <span className="h-px w-8 bg-cadet-gold" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7 }}
            className="mt-6 max-w-2xl text-base md:text-lg text-cadet-bone/70 leading-relaxed"
          >
            A premium creator brand built on discipline, creativity and meaningful
            short-form content. Motto — <span className="text-cadet-bone">Vision to Execution</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          >
            <a
              href="https://youtube.com/@thememecadet"
              target="_blank"
              rel="noreferrer"
              className="btn-shine group inline-flex items-center gap-3 px-7 py-4 bg-cadet-gold text-cadet-night font-medium tracking-[0.22em] text-[12px] uppercase hover:bg-cadet-bone transition-colors"
            >
              <Youtube className="w-4 h-4" /> Watch on YouTube
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 px-7 py-4 border border-cadet-bone/25 text-cadet-bone hover:border-cadet-gold hover:text-cadet-gold transition-colors font-medium tracking-[0.22em] text-[12px] uppercase"
            >
              Contact
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-14 md:mt-20 grid grid-cols-3 gap-6 md:gap-10 w-full max-w-2xl"
          >
            {[
              { k: 'EST', v: 'OCT · 2025' },
              { k: 'DIVISION', v: 'CREATOR CORPS' },
              { k: 'STATUS', v: 'ACTIVE' },
            ].map((s) => (
              <div key={s.k} className="text-center border-t border-cadet-bone/10 pt-4">
                <div className="font-mono text-[10px] tracking-[0.3em] text-cadet-khaki">{s.k}</div>
                <div className="mt-1 text-sm md:text-base text-cadet-bone tracking-widest">{s.v}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom marquee */}
      <div className="absolute bottom-0 inset-x-0 border-y border-cadet-bone/10 bg-cadet-night/60 backdrop-blur-sm overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee py-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-8 pr-8 font-mono text-[11px] tracking-[0.4em] text-cadet-bone/70">
              {[
                'VISION TO EXECUTION',
                '★',
                'VEER BHOGYA VASUNDHARA',
                '★',
                'DISCIPLINE. CREATIVITY. CONSISTENCY.',
                '★',
                'EST · OCTOBER · 2025',
                '★',
                'THEMEMECADET / OFFICIAL',
                '★',
              ].map((t, j) => (
                <span key={j} className={t === '★' ? 'text-cadet-gold' : ''}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- ABOUT ---------- */
function About() {
  const pillars = [
    { icon: ShieldCheck, k: '01', t: 'Discipline', d: 'A daily commitment to standards, showing up when it is inconvenient.' },
    { icon: Flame,       k: '02', t: 'Creativity',  d: 'Ideas engineered with intent — every frame, cut and caption serves the mission.' },
    { icon: Compass,     k: '03', t: 'Consistency', d: 'A steady drumbeat of work. Compounding across weeks, months and years.' },
    { icon: Target,      k: '04', t: 'Meaning',     d: 'Short-form content that says something. Sharp, memorable, human.' },
  ]

  return (
    <section id="about" className="relative py-24 md:py-36">
      <div className="container">
        <SectionLabel index="§ 01" title="About the Brand" />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black leading-[1.02] tracking-tight text-balance">
              A creator brand built like an <span className="text-cadet-gold">institution</span>.
            </h2>
            <div className="hairline my-8" />
            <p className="font-mono text-[11px] tracking-[0.3em] text-cadet-khaki uppercase">
              File · Manifesto — v1.0
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7 space-y-6 text-cadet-bone/80 text-lg leading-relaxed"
          >
            <p>
              <span className="text-cadet-bone font-semibold">THEMEMECADET</span> is not a page.
              It is a headquarters. A creator brand designed with the seriousness of an
              institution and the sharpness of modern culture — where every piece of content
              is a small operation, planned, produced and deployed with intent.
            </p>
            <p>
              We stand on four pillars: <span className="text-cadet-gold">discipline</span>,
              <span className="text-cadet-gold"> creativity</span>,
              <span className="text-cadet-gold"> consistency</span> and
              <span className="text-cadet-gold"> meaning</span>. Short-form content is our
              medium — a discipline of clarity in seconds. Long-form is our depth.
              The brand is the container that gives it all identity.
            </p>
            <p>
              Our motto — <span className="text-cadet-bone">Vision to Execution</span> —
              is the loop we run every day. Vision is direction. Execution is proof.
              Everything published under THEMEMECADET carries both.
            </p>

            <div className="pt-4 flex items-center gap-4 font-mono text-[11px] tracking-[0.3em] text-cadet-khaki">
              <Radio className="w-4 h-4 text-cadet-gold" />
              SIGNAL · CLEAR · TRANSMITTING
            </div>
          </motion.div>
        </div>

        {/* Pillars */}
        <div className="mt-20 md:mt-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-cadet-bone/10">
          {pillars.map((p, i) => (
            <motion.div
              key={p.k}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative p-8 md:p-10 border-b border-r border-cadet-bone/10 hover:bg-cadet-olive/20 transition-colors"
            >
              <div className="flex items-center justify-between">
                <p.icon className="w-6 h-6 text-cadet-gold" strokeWidth={1.4} />
                <span className="font-mono text-[10px] tracking-[0.35em] text-cadet-khaki">— {p.k}</span>
              </div>
              <h3 className="mt-8 font-display text-2xl md:text-3xl font-bold tracking-tight">
                {p.t}
              </h3>
              <p className="mt-3 text-sm text-cadet-bone/60 leading-relaxed">
                {p.d}
              </p>
              <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-cadet-gold transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- YOUTUBE ---------- */
function YouTubeSection() {
  return (
    <section id="youtube" className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-cadet-night/40 via-cadet-ink to-cadet-ink" />

      <div className="container relative">
        <SectionLabel index="§ 02" title="Primary Platform" />

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6"
          >
            <Eyebrow className="mb-6">Broadcast Channel</Eyebrow>
            <h2 className="font-display text-4xl md:text-6xl font-black leading-[1] tracking-tight text-balance">
              Deployed on <span className="text-cadet-gold">YouTube</span>.
            </h2>
            <p className="mt-6 text-lg text-cadet-bone/70 leading-relaxed max-w-xl">
              YouTube is our primary theatre of operations — where the vision is executed,
              week after week. Subscribe to be part of the corps.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="https://youtube.com/@thememecadet"
                target="_blank"
                rel="noreferrer"
                className="btn-shine group inline-flex items-center gap-3 px-8 py-4 bg-cadet-gold text-cadet-night font-medium tracking-[0.22em] text-[12px] uppercase hover:bg-cadet-bone transition-colors"
              >
                <Youtube className="w-4 h-4" /> Subscribe on YouTube
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="https://youtube.com/@thememecadet"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[11px] tracking-[0.3em] text-cadet-khaki hover:text-cadet-gold transition-colors uppercase"
              >
                youtube.com/@thememecadet ↗
              </a>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              {[
                { k: 'FORMAT', v: 'SHORT-FORM' },
                { k: 'CADENCE', v: 'DAILY-ISH' },
                { k: 'TONE',    v: 'PREMIUM' },
              ].map((s) => (
                <div key={s.k} className="border-t border-cadet-bone/10 pt-3">
                  <div className="font-mono text-[10px] tracking-[0.3em] text-cadet-khaki">{s.k}</div>
                  <div className="mt-1 text-sm text-cadet-bone tracking-widest">{s.v}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6"
          >
            <div className="relative aspect-[4/5] sm:aspect-video lg:aspect-[4/5] w-full border border-cadet-bone/15 bg-cadet-night overflow-hidden group">
              {/* Scan line */}
              <div className="absolute inset-x-0 h-24 bg-gradient-to-b from-cadet-gold/10 to-transparent animate-scan pointer-events-none" />
              {/* Corner ticks */}
              {['top-3 left-3','top-3 right-3','bottom-3 left-3','bottom-3 right-3'].map((p,i)=>(
                <div key={i} className={`absolute ${p} w-4 h-4 border-cadet-gold`}>
                  <div className="absolute top-0 left-0 w-full h-px bg-cadet-gold" />
                  <div className="absolute top-0 left-0 h-full w-px bg-cadet-gold" />
                </div>
              ))}

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
                <CadetMark size={72} />
                <div className="mt-6 font-display text-3xl md:text-4xl font-black tracking-tight">
                  @thememecadet
                </div>
                <div className="mt-2 font-mono text-[11px] tracking-[0.35em] text-cadet-khaki uppercase">
                  Live Broadcast / Channel
                </div>

                <a
                  href="https://youtube.com/@thememecadet"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-10 inline-flex items-center justify-center w-16 h-16 rounded-full border border-cadet-gold/60 text-cadet-gold hover:bg-cadet-gold hover:text-cadet-night transition-colors"
                  aria-label="Play"
                >
                  <Play className="w-6 h-6 fill-current" />
                </a>
              </div>

              {/* Metadata bar */}
              <div className="absolute bottom-0 inset-x-0 flex items-center justify-between px-4 py-3 border-t border-cadet-bone/10 bg-cadet-ink/70 backdrop-blur">
                <span className="font-mono text-[10px] tracking-[0.35em] text-cadet-khaki">REC · 00:00:01</span>
                <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.35em] text-cadet-gold">
                  <span className="w-2 h-2 rounded-full bg-cadet-gold animate-pulse" /> ON AIR
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ---------- CONTACT ---------- */
function Contact() {
  const socials = [
    {
      icon: Youtube,
      label: 'YouTube',
      handle: '@thememecadet',
      href: 'https://youtube.com/@thememecadet',
    },
    {
      icon: Instagram,
      label: 'Instagram',
      handle: '@thememecadet',
      href: 'https://instagram.com/thememecadet',
    },
    {
      icon: Mail,
      label: 'Email',
      handle: 'thememecadet974@gmail.com',
      href: 'mailto:thememecadet974@gmail.com',
    },
  ]

  return (
    <section id="contact" className="relative py-24 md:py-36 border-t border-cadet-bone/10">
      <div className="container">
        <SectionLabel index="§ 03" title="Contact & Signals" />

        <div className="grid lg:grid-cols-12 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <h2 className="font-display text-4xl md:text-6xl font-black leading-[1] tracking-tight text-balance">
              Establish <span className="text-cadet-gold">contact</span>.
            </h2>
            <p className="mt-6 text-lg text-cadet-bone/70 leading-relaxed max-w-lg">
              For collaborations, partnerships, press or just to say hello — the
              channel is open. Response within 48 hours.
            </p>

            <a
              href="mailto:thememecadet974@gmail.com"
              className="mt-10 inline-flex items-center gap-3 font-display text-2xl md:text-3xl font-semibold text-cadet-bone hover:text-cadet-gold transition-colors group"
            >
              thememecadet974@gmail.com
              <ArrowUpRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="border-t border-cadet-bone/10">
              {socials.map((s, i) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="group flex items-center justify-between py-6 md:py-8 border-b border-cadet-bone/10 hover:pl-3 transition-all"
                >
                  <div className="flex items-center gap-5 md:gap-8">
                    <span className="font-mono text-[11px] tracking-[0.3em] text-cadet-khaki w-10">
                      0{i + 1}
                    </span>
                    <s.icon className="w-5 h-5 md:w-6 md:h-6 text-cadet-gold" strokeWidth={1.4} />
                    <div>
                      <div className="text-lg md:text-xl font-medium tracking-wide text-cadet-bone group-hover:text-cadet-gold transition-colors">
                        {s.label}
                      </div>
                      <div className="text-sm text-cadet-bone/50 mt-0.5 break-all">
                        {s.handle}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-cadet-bone/40 group-hover:text-cadet-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ---------- FOOTER ---------- */
function Footer() {
  const year = new Date().getFullYear()
  const soon = ['Projects', 'Timeline', 'Merchandise', 'Community', 'Blog']

  return (
    <footer className="relative border-t border-cadet-bone/10 bg-cadet-night/40">
      <div className="container py-16 md:py-24">
        <div className="grid md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <CadetMark size={44} />
              <div>
                <div className="text-lg font-semibold tracking-[0.22em]">THEMEMECADET</div>
                <div className="font-mono text-[10px] tracking-[0.35em] text-cadet-khaki mt-1">
                  EST · OCT · 2025
                </div>
              </div>
            </div>

            <div className="mt-6 font-mono text-[11px] tracking-[0.35em] text-cadet-gold">
              VEER BHOGYA VASUNDHARA
            </div>
            <div className="mt-2 text-cadet-bone/70 tracking-wide">
              Vision to Execution.
            </div>
            <p className="mt-6 max-w-sm text-sm text-cadet-bone/50 leading-relaxed">
              Official headquarters. A premium creator brand built on discipline,
              creativity and meaningful short-form content.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="font-mono text-[11px] tracking-[0.3em] text-cadet-khaki uppercase mb-5">
              Navigation
            </div>
            <ul className="space-y-3 text-sm">
              {['Home','About','YouTube','Contact'].map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase()}`} className="text-cadet-bone/80 hover:text-cadet-gold transition-colors tracking-wide">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="font-mono text-[11px] tracking-[0.3em] text-cadet-khaki uppercase mb-5">
              Divisions · Coming Soon
            </div>
            <ul className="flex flex-wrap gap-2">
              {soon.map((s) => (
                <li key={s} className="px-3 py-1.5 border border-cadet-bone/15 text-[11px] tracking-[0.2em] uppercase text-cadet-bone/70">
                  {s}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center gap-3">
              <a href="https://youtube.com/@thememecadet" target="_blank" rel="noreferrer" className="w-10 h-10 border border-cadet-bone/15 flex items-center justify-center hover:border-cadet-gold hover:text-cadet-gold transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://instagram.com/thememecadet" target="_blank" rel="noreferrer" className="w-10 h-10 border border-cadet-bone/15 flex items-center justify-center hover:border-cadet-gold hover:text-cadet-gold transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="mailto:thememecadet974@gmail.com" className="w-10 h-10 border border-cadet-bone/15 flex items-center justify-center hover:border-cadet-gold hover:text-cadet-gold transition-colors" aria-label="Email">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="hairline my-12" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-[10px] tracking-[0.3em] text-cadet-khaki uppercase">
          <div>© {year} THEMEMECADET · All Rights Reserved</div>
          <div>Vision to Execution · No. 001 / v1.0</div>
        </div>
      </div>

      {/* Giant brand wordmark */}
      <div className="overflow-hidden select-none pointer-events-none">
        <div className="font-display text-[18vw] leading-none font-black tracking-tighter text-center bg-gradient-to-b from-cadet-bone/10 to-transparent bg-clip-text text-transparent pb-2">
          THEMEMECADET
        </div>
      </div>
    </footer>
  )
}

/* ---------- APP ---------- */
function App() {
  return (
    <main className="relative bg-cadet-ink text-cadet-bone min-h-screen grain">
      <Nav />
      <Hero />
      <About />
      <YouTubeSection />
      <Contact />
      <Footer />
    </main>
  )
}

export default App
