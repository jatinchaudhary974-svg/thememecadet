'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronRight, Youtube } from 'lucide-react'
import { CadetLogo } from '@/components/cadet/Logo'

const links = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/#about' },
  { label: 'Manifesto', href: '/manifesto' },
  { label: 'Journey', href: '/#journey' },
  { label: 'Founder', href: '/founder' },
  { label: 'Shorts', href: '/#shorts' },
  { label: 'Contact', href: '/#contact' },
]

export function InnerPageNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-cadet-bone/10 bg-cadet-ink/85 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between sm:h-20">
        <Link href="/#home" className="group flex items-center gap-3">
          <CadetLogo size={40} variant="boxed" />
          <span className="text-xs font-semibold tracking-[0.22em] text-cadet-bone sm:text-sm">THEMEMECADET</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className="px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-cadet-bone/75 transition-colors hover:text-cadet-gold">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a href="https://youtube.com/@thememecadet" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-cadet-gold px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-cadet-night transition-colors hover:bg-cadet-bone">
            <Youtube className="h-4 w-4" /> Watch
          </a>
        </div>

        <button type="button" onClick={() => setOpen((value) => !value)} className="p-2 text-cadet-bone lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-cadet-bone/10 bg-cadet-ink px-6 py-3 lg:hidden" aria-label="Mobile navigation">
          {links.map((link) => (
            <Link key={link.label} href={link.href} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-cadet-bone/5 py-3 text-sm uppercase tracking-[0.16em] text-cadet-bone/85">
              {link.label}<ChevronRight className="h-4 w-4 text-cadet-gold" />
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}

export function InnerPageFooter() {
  return (
    <footer className="border-t border-cadet-bone/10 bg-cadet-night/40">
      <div className="container py-12 sm:py-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-cadet-gold">THEMEMECADET · EST. OCT 2025</div>
            <p className="mt-3 font-display text-2xl text-cadet-bone sm:text-3xl">Vision to Execution.</p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-cadet-bone/55">Built in India. Powered by discipline. A creator brand learning, building and growing with its community.</p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-3 text-xs uppercase tracking-[0.14em] text-cadet-bone/70">
            {links.map((link) => <Link key={link.label} href={link.href} className="transition-colors hover:text-cadet-gold">{link.label}</Link>)}
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-cadet-bone/10 pt-5 font-mono text-[9px] uppercase tracking-[0.2em] text-cadet-khaki sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} THEMEMECADET · All Rights Reserved</span>
          <span>VEER BHOGYA VASUNDHARA</span>
        </div>
      </div>
    </footer>
  )
}
