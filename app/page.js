'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  Youtube, Mail, Instagram, ArrowUpRight, ChevronRight,
  Menu, X, Target, Compass, Flame, ShieldCheck,
  Play, ArrowRight, Sparkles, Rocket, Flag, Milestone,
} from 'lucide-react'
import { CadetLogo } from '@/components/cadet/Logo'
import BrandLoader from '@/components/cadet/Loader'
import IndependenceOverlay from '@/components/cadet/IndependenceOverlay'

/* =============================================================
   PRIMITIVES
   ============================================================= */

const EASE = [0.22, 1, 0.36, 1]

const Eyebrow = ({ children, className = '' }) => (
  <span className={`inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-cadet-khaki font-mono ${className}`}>
    <span className="inline-block w-5 sm:w-6 h-px bg-cadet-gold/70" />
    {children}
  </span>
)

const SectionLabel = ({ index, title }) => (
  <div className="flex items-center gap-3 sm:gap-4 mb-10 sm:mb-14">
    <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.28em] text-cadet-gold">{index}</span>
    <span className="h-px flex-1 bg-cadet-bone/10" />
    <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.28em] text-cadet-khaki uppercase">{title}</span>
  </div>
)

/* =============================================================
   NAV
   ============================================================= */
function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Home',    href: '#home' },
    { label: 'About',   href: '#about' },
    { label: 'Shorts',  href: '#shorts' },
    { label: 'Journey', href: '#journey' },
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
      <div className="container flex items-center justify-between h-14 sm:h-16 md:h-20">
        <a href="#home" className="flex items-center gap-2.5 sm:gap-3 group">
          <CadetLogo size={38} priority />
          <div className="leading-none">
            <div className="text-[12px] sm:text-[13px] md:text-sm font-semibold tracking-[0.22em] text-cadet-bone">
              THEMEMECADET
            </div>
            <div className="hidden sm:block text-[9px] font-mono tracking-[0.35em] text-cadet-khaki mt-1">
              EST · X · 2025
            </div>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative px-3 lg:px-4 py-2 text-[12px] lg:text-[13px] tracking-[0.18em] uppercase text-cadet-bone/80 hover:text-cadet-gold transition-colors"
            >
              {l.label}
              <span className="absolute left-3 right-3 lg:left-4 lg:right-4 -bottom-0.5 h-px scale-x-0 group-hover:scale-x-100 origin-left bg-cadet-gold transition-transform duration-500" />
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <a
            href="https://youtube.com/@thememecadet"
            target="_blank"
            rel="noreferrer"
            className="btn-shine inline-flex items-center gap-2 px-4 py-2 text-[11px] lg:text-[12px] tracking-[0.2em] uppercase font-medium bg-cadet-gold text-cadet-night hover:bg-cadet-bone transition-colors"
          >
            <Youtube className="w-4 h-4" /> Watch
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 -mr-2 text-cadet-bone"
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
            transition={{ duration: 0.35, ease: EASE }}
            className="md:hidden overflow-hidden border-t border-cadet-bone/5 bg-cadet-ink/95 backdrop-blur-xl"
          >
            <div className="container py-4 flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-3.5 border-b border-cadet-bone/5 text-cadet-bone/90 uppercase tracking-[0.2em] text-sm"
                >
                  {l.label} <ChevronRight className="w-4 h-4 text-cadet-gold" />
                </a>
              ))}
              <a
                href="https://youtube.com/@thememecadet"
                target="_blank"
                rel="noreferrer"
                className="mt-4 mb-2 inline-flex items-center justify-center gap-2 px-4 py-3.5 text-[12px] tracking-[0.2em] uppercase font-medium bg-cadet-gold text-cadet-night"
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

/* =============================================================
   HERO STATS — live signal strip
   ============================================================= */
function useCountUp(target, { duration = 1400, start = false } = {}) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!start) return
    let raf
    const t0 = performance.now()
    const step = (now) => {
      const p = Math.min(1, (now - t0) / duration)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, start])
  return val
}

function formatK(n) {
  if (n >= 1000) {
    const k = n / 1000
    return `${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)}K`
  }
  return `${n}`
}

function HeroStats() {
  const [started, setStarted] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 1200)
    return () => clearTimeout(t)
  }, [])

  const views  = useCountUp(50000, { duration: 1600, start: started })
  const subs   = useCountUp(36,    { duration: 1400, start: started })
  const weeks  = useCountUp(6,     { duration: 1200, start: started })

  const items = [
    { k: 'Views',       v: `${formatK(views)}+`,     sub: 'Impressions' },
    { k: 'Subscribers', v: `${subs}`,                sub: 'Cadets Enlisted' },
    { k: 'Consistency', v: `${weeks} WK`,            sub: 'Weeks Deployed' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.15, duration: 0.8, ease: EASE }}
      className="mt-8 sm:mt-10 w-full max-w-xl sm:max-w-2xl"
    >
      <div className="relative flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-5 py-3 sm:py-4 border border-cadet-bone/12 bg-cadet-night/40 backdrop-blur-sm">
        {/* corner ticks */}
        {['top-0 left-0','top-0 right-0','bottom-0 left-0','bottom-0 right-0'].map((p, i) => (
          <span key={i} className={`absolute ${p} w-2.5 h-2.5 pointer-events-none`}>
            <span className="absolute top-0 left-0 w-full h-px bg-cadet-gold/80" />
            <span className="absolute top-0 left-0 h-full w-px bg-cadet-gold/80" />
          </span>
        ))}

        {items.map((it, i) => (
          <div key={it.k} className="flex-1 min-w-0 text-center relative">
            {i > 0 && (
              <span className="absolute -left-1 sm:-left-2 top-1/2 -translate-y-1/2 h-8 sm:h-10 w-px bg-cadet-bone/10" aria-hidden />
            )}
            <div className="font-display font-black tracking-tight leading-none text-cadet-bone text-[clamp(1.25rem,4.2vw,2rem)]">
              <span className="text-cadet-gold">{it.v}</span>
            </div>
            <div className="mt-1.5 font-mono text-[9px] sm:text-[10px] tracking-[0.28em] sm:tracking-[0.32em] text-cadet-bone/85 uppercase truncate">
              {it.k}
            </div>
            <div className="mt-0.5 font-mono text-[8px] sm:text-[9px] tracking-[0.28em] text-cadet-khaki uppercase hidden sm:block">
              {it.sub}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-between px-1 font-mono text-[9px] sm:text-[10px] tracking-[0.3em] text-cadet-khaki uppercase">
        <span className="flex items-center gap-1.5">
          <span className="relative flex w-1.5 h-1.5">
            <span className="absolute inset-0 rounded-full bg-cadet-gold animate-ping opacity-60" />
            <span className="relative w-1.5 h-1.5 rounded-full bg-cadet-gold" />
          </span>
          Live Signal
        </span>
        <span className="hidden sm:inline">Updated · Field Report</span>
      </div>
    </motion.div>
  )
}

/* =============================================================
   HERO — logo as the centerpiece
   ============================================================= */
function Hero() {
  const reduce = useReducedMotion()
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacityBg = useTransform(scrollYProgress, [0, 1], [1, 0.2])
  const logoY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])
  const logoScale = useTransform(scrollYProgress, [0, 1], [1, 0.94])

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[100svh] flex items-center overflow-hidden pt-20 sm:pt-24 md:pt-28"
    >
      {/* Background */}
      <motion.div style={{ y: yBg, opacity: opacityBg }} className="absolute inset-0 grid-lines" />
      <div className="absolute inset-0 radial-fade" />
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_100%,rgba(11,18,13,0.9),transparent_60%)]" />

      {/* Corner crosshairs */}
      <div className="absolute inset-4 sm:inset-6 md:inset-10 pointer-events-none">
        {['top-0 left-0','top-0 right-0 rotate-90','bottom-0 left-0 -rotate-90','bottom-0 right-0 rotate-180'].map((pos, i) => (
          <div key={i} className={`absolute ${pos} w-5 h-5 sm:w-6 sm:h-6`}>
            <div className="absolute top-0 left-0 w-full h-px bg-cadet-gold/60" />
            <div className="absolute top-0 left-0 h-full w-px bg-cadet-gold/60" />
          </div>
        ))}
      </div>

      {/* Side vertical labels — desktop only */}
      <div className="hidden lg:block absolute left-6 top-1/2 -translate-y-1/2 rotate-180 [writing-mode:vertical-rl] font-mono text-[10px] tracking-[0.5em] text-cadet-khaki">
        NO. 001 — OFFICIAL HEADQUARTERS
      </div>
      <div className="hidden lg:block absolute right-6 top-1/2 -translate-y-1/2 [writing-mode:vertical-rl] font-mono text-[10px] tracking-[0.5em] text-cadet-khaki">
        VISION · DISCIPLINE · EXECUTION
      </div>

      <div className="container relative z-10 py-12 sm:py-16 md:py-24">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">

          {/* Logo — centerpiece */}
          <motion.div
            style={reduce ? undefined : { y: logoY, scale: logoScale }}
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
            className="relative"
          >
            {/* Gold aura */}
            <div className="absolute inset-0 -m-8 sm:-m-10 rounded-full bg-cadet-gold/10 blur-2xl" aria-hidden />
            {/* Faint concentric ring */}
            <div className="absolute inset-0 -m-4 sm:-m-6 rounded-full border border-cadet-gold/15" aria-hidden />
            <div className="absolute inset-0 -m-8 sm:-m-12 rounded-full border border-cadet-bone/5" aria-hidden />

            <motion.div
              animate={reduce ? {} : { y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <CadetLogo size={220} priority className="sm:!w-[280px] sm:!h-[280px] md:!w-[340px] md:!h-[340px]" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: EASE }}
            className="mt-8 sm:mt-10 flex items-center gap-3"
          >
            <span className="h-px w-6 sm:w-8 bg-cadet-gold" />
            <span className="font-mono text-[10px] sm:text-xs md:text-sm tracking-[0.35em] sm:tracking-[0.4em] text-cadet-bone/90 whitespace-nowrap">
              VEER BHOGYA VASUNDHARA
            </span>
            <span className="h-px w-6 sm:w-8 bg-cadet-gold" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.9, ease: EASE }}
            className="mt-5 sm:mt-6 font-display font-black tracking-tight leading-[0.95] text-balance text-[clamp(2.5rem,9vw,6.5rem)]"
          >
            Vision <span className="italic text-cadet-gold">to</span> Execution.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95, duration: 0.7 }}
            className="mt-5 sm:mt-6 max-w-md sm:max-w-lg text-sm sm:text-base text-cadet-bone/60 leading-relaxed"
          >
            A premium creator brand. Est. October 2025.
          </motion.p>

          {/* Live stats strip */}
          <HeroStats />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.7, ease: EASE }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto"
          >
            <a
              href="https://youtube.com/@thememecadet"
              target="_blank"
              rel="noreferrer"
              className="btn-shine group inline-flex items-center justify-center gap-3 px-6 sm:px-7 py-3.5 sm:py-4 bg-cadet-gold text-cadet-night font-medium tracking-[0.22em] text-[12px] uppercase hover:bg-cadet-bone transition-colors"
            >
              <Youtube className="w-4 h-4" /> Watch on YouTube
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-3 px-6 sm:px-7 py-3.5 sm:py-4 border border-cadet-bone/25 text-cadet-bone hover:border-cadet-gold hover:text-cadet-gold transition-colors font-medium tracking-[0.22em] text-[12px] uppercase"
            >
              Contact
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-3 gap-4 sm:gap-8 md:gap-10 w-full max-w-md sm:max-w-xl"
          >
            {[
              { k: 'EST',      v: 'OCT · 2025' },
              { k: 'DIVISION', v: 'CREATOR CORPS' },
              { k: 'STATUS',   v: 'ACTIVE' },
            ].map((s) => (
              <div key={s.k} className="text-center border-t border-cadet-bone/10 pt-3 sm:pt-4">
                <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.28em] sm:tracking-[0.3em] text-cadet-khaki">{s.k}</div>
                <div className="mt-1 text-[11px] sm:text-sm md:text-base text-cadet-bone tracking-wider sm:tracking-widest">{s.v}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Marquee */}
      <div className="absolute bottom-0 inset-x-0 border-y border-cadet-bone/10 bg-cadet-night/60 backdrop-blur-sm overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee py-2.5 sm:py-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-6 sm:gap-8 pr-6 sm:pr-8 font-mono text-[10px] sm:text-[11px] tracking-[0.35em] sm:tracking-[0.4em] text-cadet-bone/70">
              {['VISION TO EXECUTION','★','VEER BHOGYA VASUNDHARA','★','DISCIPLINE. CREATIVITY. CONSISTENCY.','★','EST · OCTOBER · 2025','★','THEMEMECADET / OFFICIAL','★'].map((t, j) => (
                <span key={j} className={t === '★' ? 'text-cadet-gold' : ''}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* =============================================================
   ABOUT — tighter copy
   ============================================================= */
function About() {
  const pillars = [
    { icon: ShieldCheck, k: '01', t: 'Discipline',  d: 'Show up when it is inconvenient.' },
    { icon: Flame,       k: '02', t: 'Creativity',  d: 'Every frame serves the mission.' },
    { icon: Compass,     k: '03', t: 'Consistency', d: 'A steady drumbeat that compounds.' },
    { icon: Target,      k: '04', t: 'Meaning',     d: 'Sharp. Memorable. Human.' },
  ]

  return (
    <section id="about" className="relative py-20 sm:py-24 md:py-36">
      <div className="container">
        <SectionLabel index="§ 01" title="About the Brand" />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: EASE }}
            className="lg:col-span-6"
          >
            <h2 className="font-display font-black leading-[1.02] tracking-tight text-balance text-[clamp(2rem,6vw,3.75rem)]">
              A creator brand built like an <span className="text-cadet-gold">institution</span>.
            </h2>
            <div className="hairline my-6 sm:my-8" />
            <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.3em] text-cadet-khaki uppercase">
              File · Manifesto — v1.0
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="lg:col-span-6 space-y-5 sm:space-y-6 text-cadet-bone/80 text-base sm:text-lg leading-relaxed"
          >
            <p>
              THEMEMECADET is a headquarters, not a page. Every piece of content is a small
              operation — planned, produced, deployed with intent.
            </p>
            <p>
              Our motto — <span className="text-cadet-bone">Vision to Execution</span> —
              is the loop we run every day.
            </p>
          </motion.div>
        </div>

        {/* Pillars */}
        <div className="mt-16 sm:mt-20 md:mt-28 grid grid-cols-2 lg:grid-cols-4 border-t border-l border-cadet-bone/10">
          {pillars.map((p, i) => (
            <motion.div
              key={p.k}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
              className="group relative p-5 sm:p-8 md:p-10 border-b border-r border-cadet-bone/10 hover:bg-cadet-olive/20 transition-colors"
            >
              <div className="flex items-center justify-between">
                <p.icon className="w-5 h-5 sm:w-6 sm:h-6 text-cadet-gold" strokeWidth={1.4} />
                <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.35em] text-cadet-khaki">— {p.k}</span>
              </div>
              <h3 className="mt-6 sm:mt-8 font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
                {p.t}
              </h3>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-cadet-bone/60 leading-relaxed">
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

/* =============================================================
   SHORTS — YouTube Shorts grid (lite embed for performance)
   ============================================================= */
const SHORTS = [
  { id: '3lJCnZGhiaU', label: '01' },
  { id: 'VtBAqmZjb8g', label: '02' },
  { id: 'GLYPbZXZ6BM', label: '03' },
  { id: 'lYYQYCahVcI', label: '04' },
]

function ShortCard({ id, label, index }) {
  const [play, setPlay] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
      className="group relative"
    >
      <div className="relative aspect-[9/16] w-full bg-cadet-night overflow-hidden border border-cadet-bone/10 group-hover:border-cadet-gold/40 transition-colors">
        {!play ? (
          <button
            onClick={() => setPlay(true)}
            className="absolute inset-0 w-full h-full text-left"
            aria-label={`Play short ${label}`}
          >
            <Image
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt={`THEMEMECADET short ${label}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cadet-ink via-cadet-ink/30 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-cadet-gold/95 text-cadet-night group-hover:scale-105 transition-transform">
                <Play className="w-6 h-6 fill-current" />
              </span>
            </div>
            {/* Corner ticks */}
            {['top-2 left-2','top-2 right-2','bottom-2 left-2','bottom-2 right-2'].map((p, i) => (
              <div key={i} className={`absolute ${p} w-3 h-3 opacity-70`}>
                <div className="absolute top-0 left-0 w-full h-px bg-cadet-gold" />
                <div className="absolute top-0 left-0 h-full w-px bg-cadet-gold" />
              </div>
            ))}
            {/* Metadata */}
            <div className="absolute bottom-0 inset-x-0 flex items-center justify-between px-3 py-2.5 font-mono text-[9px] sm:text-[10px] tracking-[0.3em] text-cadet-bone/80">
              <span>SHORT · {label}</span>
              <span className="flex items-center gap-1.5 text-cadet-gold">
                <span className="w-1.5 h-1.5 rounded-full bg-cadet-gold" /> LIVE
              </span>
            </div>
          </button>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title={`THEMEMECADET short ${label}`}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
      </div>
      <a
        href={`https://youtube.com/shorts/${id}`}
        target="_blank"
        rel="noreferrer"
        className="mt-3 sm:mt-4 inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-[0.28em] text-cadet-khaki hover:text-cadet-gold transition-colors uppercase"
      >
        Open on YouTube <ArrowUpRight className="w-3 h-3" />
      </a>
    </motion.div>
  )
}

function ShortsSection() {
  return (
    <section id="shorts" className="relative py-20 sm:py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-cadet-night/40 via-cadet-ink to-cadet-ink" />

      <div className="container relative">
        <SectionLabel index="§ 02" title="Primary Platform · Latest Shorts" />

        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-2xl">
            <Eyebrow className="mb-4 sm:mb-5">Broadcast Channel</Eyebrow>
            <h2 className="font-display font-black leading-[1] tracking-tight text-balance text-[clamp(2rem,6vw,3.75rem)]">
              Latest on <span className="text-cadet-gold">YouTube</span>.
            </h2>
          </div>
          <a
            href="https://youtube.com/@thememecadet"
            target="_blank"
            rel="noreferrer"
            className="btn-shine group inline-flex items-center gap-3 px-5 sm:px-6 py-3 sm:py-3.5 bg-cadet-gold text-cadet-night font-medium tracking-[0.22em] text-[11px] sm:text-[12px] uppercase hover:bg-cadet-bone transition-colors self-stretch sm:self-auto justify-center"
          >
            <Youtube className="w-4 h-4" /> Subscribe
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {SHORTS.map((s, i) => (
            <ShortCard key={s.id} id={s.id} label={s.label} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* =============================================================
   JOURNEY / TIMELINE
   ============================================================= */
const MILESTONES = [
  {
    date: 'OCT · 2025',
    title: 'Established',
    body: 'THEMEMECADET founded. Motto set: Vision to Execution.',
    icon: Flag,
    status: 'DONE',
  },
  {
    date: '31 · OCT · 2025',
    title: 'First Upload',
    body: 'The first transmission goes live on YouTube.',
    icon: Rocket,
    status: 'DONE',
  },
  {
    date: 'Q1 · 2026',
    title: 'First 100 Subscribers',
    body: 'The first hundred cadets join the corps.',
    icon: Sparkles,
    status: 'MISSION',
  },
]

function Journey() {
  return (
    <section id="journey" className="relative py-20 sm:py-24 md:py-36">
      <div className="container">
        <SectionLabel index="§ 03" title="The Journey" />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: EASE }}
            className="lg:col-span-7"
          >
            <h2 className="font-display font-black leading-[1] tracking-tight text-balance text-[clamp(2rem,6vw,3.75rem)]">
              From day one, on the <span className="text-cadet-gold">record</span>.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="lg:col-span-5 flex items-end"
          >
            <p className="text-cadet-bone/70 leading-relaxed">
              A public ledger of missions completed and missions ahead.
            </p>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* vertical rail */}
          <div className="absolute left-4 sm:left-5 top-0 bottom-0 w-px bg-cadet-bone/10" aria-hidden />
          <ul className="space-y-8 sm:space-y-10">
            {MILESTONES.map((m, i) => (
              <motion.li
                key={m.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
                className="relative pl-14 sm:pl-20"
              >
                {/* node */}
                <div className="absolute left-0 top-1 flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-cadet-gold/40 bg-cadet-ink">
                  <m.icon className="w-4 h-4 sm:w-5 sm:h-5 text-cadet-gold" strokeWidth={1.5} />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-8 pb-6 sm:pb-8 border-b border-cadet-bone/10">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.3em] text-cadet-gold">{m.date}</span>
                      <span
                        className={`font-mono text-[9px] sm:text-[10px] tracking-[0.28em] px-2 py-0.5 border ${
                          m.status === 'DONE'
                            ? 'text-cadet-bone/80 border-cadet-bone/25'
                            : 'text-cadet-gold border-cadet-gold/40'
                        }`}
                      >
                        {m.status}
                      </span>
                    </div>
                    <h3 className="mt-2 sm:mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                      {m.title}
                    </h3>
                    <p className="mt-2 text-sm sm:text-base text-cadet-bone/60 leading-relaxed max-w-xl">
                      {m.body}
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-cadet-khaki whitespace-nowrap pt-2">
                    <Milestone className="w-3.5 h-3.5" />
                    NO. {String(i + 1).padStart(3, '0')}
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* =============================================================
   CONTACT
   ============================================================= */
function Contact() {
  const socials = [
    { icon: Youtube,   label: 'YouTube',   handle: '@thememecadet',            href: 'https://youtube.com/@thememecadet' },
    { icon: Instagram, label: 'Instagram', handle: '@thememecadet',            href: 'https://instagram.com/thememecadet' },
    { icon: Mail,      label: 'Email',     handle: 'thememecadet974@gmail.com', href: 'mailto:thememecadet974@gmail.com' },
  ]

  return (
    <section id="contact" className="relative py-20 sm:py-24 md:py-36 border-t border-cadet-bone/10">
      <div className="container">
        <SectionLabel index="§ 04" title="Contact & Signals" />

        <div className="grid lg:grid-cols-12 gap-10 sm:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: EASE }}
            className="lg:col-span-5"
          >
            <h2 className="font-display font-black leading-[1] tracking-tight text-balance text-[clamp(2rem,6vw,3.75rem)]">
              Establish <span className="text-cadet-gold">contact</span>.
            </h2>
            <p className="mt-5 sm:mt-6 text-base sm:text-lg text-cadet-bone/70 leading-relaxed max-w-lg">
              Collabs. Partnerships. Press. The channel is open.
            </p>

            <a
              href="mailto:thememecadet974@gmail.com"
              className="mt-8 sm:mt-10 inline-flex items-center gap-3 font-display text-xl sm:text-2xl md:text-3xl font-semibold text-cadet-bone hover:text-cadet-gold transition-colors group break-all"
            >
              thememecadet974@gmail.com
              <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="lg:col-span-7"
          >
            <div className="border-t border-cadet-bone/10">
              {socials.map((s, i) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="group flex items-center justify-between py-5 sm:py-8 border-b border-cadet-bone/10 hover:pl-2 sm:hover:pl-3 transition-all"
                >
                  <div className="flex items-center gap-4 sm:gap-8 min-w-0">
                    <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.3em] text-cadet-khaki w-8 sm:w-10 shrink-0">
                      0{i + 1}
                    </span>
                    <s.icon className="w-5 h-5 sm:w-6 sm:h-6 text-cadet-gold shrink-0" strokeWidth={1.4} />
                    <div className="min-w-0">
                      <div className="text-base sm:text-xl font-medium tracking-wide text-cadet-bone group-hover:text-cadet-gold transition-colors">
                        {s.label}
                      </div>
                      <div className="text-xs sm:text-sm text-cadet-bone/50 mt-0.5 truncate">
                        {s.handle}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 text-cadet-bone/40 group-hover:text-cadet-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0 ml-3" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* =============================================================
   FOOTER
   ============================================================= */
function Footer() {
  const year = new Date().getFullYear()
  const soon = ['Projects', 'Timeline', 'Merchandise', 'Community', 'Blog']

  return (
    <footer className="relative border-t border-cadet-bone/10 bg-cadet-night/40">
      <div className="container py-14 sm:py-16 md:py-24">
        <div className="grid md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <CadetLogo size={48} />
              <div>
                <div className="text-base sm:text-lg font-semibold tracking-[0.22em]">THEMEMECADET</div>
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
            <p className="mt-5 sm:mt-6 max-w-sm text-sm text-cadet-bone/50 leading-relaxed">
              Official headquarters. A premium creator brand built on discipline,
              creativity and meaningful short-form content.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="font-mono text-[11px] tracking-[0.3em] text-cadet-khaki uppercase mb-5">
              Navigation
            </div>
            <ul className="space-y-3 text-sm">
              {['Home','About','Shorts','Journey','Contact'].map((l) => (
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

        <div className="hairline my-10 sm:my-12" />

        {/* Brand statement — India + discipline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mb-10 sm:mb-12 text-center"
        >
          <div className="inline-flex flex-col items-center gap-2.5 sm:gap-3">
            <div className="flex items-center gap-3">
              <span className="h-px w-6 sm:w-10 bg-cadet-gold/70" />
              <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.4em] text-cadet-khaki uppercase">
                Field Statement
              </span>
              <span className="h-px w-6 sm:w-10 bg-cadet-gold/70" />
            </div>
            <div className="font-display font-semibold text-cadet-bone leading-tight tracking-tight text-[clamp(1.1rem,3.4vw,1.75rem)]">
              Built in India.
            </div>
            <div className="font-display font-semibold text-cadet-bone leading-tight tracking-tight text-[clamp(1.1rem,3.4vw,1.75rem)]">
              Powered by <span className="text-cadet-gold">Discipline</span>.
            </div>
            <div className="font-display italic font-medium text-cadet-bone/80 leading-tight tracking-tight text-[clamp(1rem,3vw,1.5rem)]">
              Vision to Execution.
            </div>
          </div>
        </motion.div>

        <div className="hairline mb-10 sm:mb-12" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-[10px] tracking-[0.3em] text-cadet-khaki uppercase">
          <div>© {year} THEMEMECADET · All Rights Reserved</div>
          <div>Vision to Execution · No. 001 / v1.0</div>
        </div>
      </div>

      {/* Giant brand wordmark */}
      <div className="overflow-hidden select-none pointer-events-none">
        <div className="font-display leading-none font-black tracking-tighter text-center bg-gradient-to-b from-cadet-bone/10 to-transparent bg-clip-text text-transparent pb-2 text-[18vw]">
          THEMEMECADET
        </div>
      </div>
    </footer>
  )
}

/* =============================================================
   APP
   ============================================================= */
function App() {
  return (
    <>
      <BrandLoader />
      <IndependenceOverlay />
      <main className="relative bg-cadet-ink text-cadet-bone min-h-screen grain">
        <Nav />
        <Hero />
        <About />
        <ShortsSection />
        <Journey />
        <Contact />
        <Footer />
      </main>
    </>
  )
}

export default App
