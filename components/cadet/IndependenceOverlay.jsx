'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { CadetLogo } from './Logo'

/**
 * Premium Independence Day welcome overlay.
 * - Shows ONLY on 15 August (any year), based on the visitor's local date.
 * - Shows only once per browser session.
 * - Closes smoothly with a fade into the homepage.
 */
export default function IndependenceOverlay() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    // Manual preview: allow ?welcome=india to force the overlay for testing.
    try {
      const params = new URLSearchParams(window.location.search)
      if (params.get('welcome') === 'india') {
        setShow(true)
        return
      }
    } catch {}
    const today = new Date()
    const isIndependenceDay = today.getMonth() === 7 && today.getDate() === 15 // 7 = August
    if (!isIndependenceDay) return
    const seen = sessionStorage.getItem('mc:ind-day')
    if (seen) return
    setShow(true)
  }, [])

  const close = () => {
    try { sessionStorage.setItem('mc:ind-day', '1') } catch {}
    setShow(false)
  }

  useEffect(() => {
    if (!show) return
    // lock scroll while visible
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = original
      window.removeEventListener('keydown', onKey)
    }
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="ind-day"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[110] flex items-center justify-center bg-cadet-ink"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ind-day-title"
        >
          {/* Backdrop layers */}
          <div className="absolute inset-0 grid-lines opacity-40" />
          <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_45%,rgba(31,46,34,0.5)_0%,rgba(5,7,6,0)_70%)]" />

          {/* Saffron / White / Green subtle top + bottom bars */}
          <div className="absolute top-0 inset-x-0 h-1.5 flex">
            <div className="flex-1 bg-[#FF9933]" />
            <div className="flex-1 bg-[#F5F3EE]" />
            <div className="flex-1 bg-[#138808]" />
          </div>
          <div className="absolute bottom-0 inset-x-0 h-1.5 flex">
            <div className="flex-1 bg-[#138808]" />
            <div className="flex-1 bg-[#F5F3EE]" />
            <div className="flex-1 bg-[#FF9933]" />
          </div>

          {/* Corner crosshairs */}
          {['top-6 left-6', 'top-6 right-6 rotate-90', 'bottom-6 left-6 -rotate-90', 'bottom-6 right-6 rotate-180'].map((p, i) => (
            <div key={i} className={`absolute ${p} w-5 h-5 pointer-events-none`}>
              <div className="absolute top-0 left-0 w-full h-px bg-cadet-gold/70" />
              <div className="absolute top-0 left-0 h-full w-px bg-cadet-gold/70" />
            </div>
          ))}

          {/* Close */}
          <button
            onClick={close}
            aria-label="Close welcome overlay"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 border border-cadet-bone/20 text-cadet-bone/80 hover:text-cadet-gold hover:border-cadet-gold transition-colors bg-cadet-ink/70 backdrop-blur"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Content */}
          <div className="relative z-[1] w-full max-w-2xl mx-auto px-6 sm:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center gap-3 mb-6 sm:mb-8"
            >
              <span className="h-px w-8 sm:w-12 bg-cadet-gold/70" />
              <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.4em] text-cadet-khaki uppercase">
                15 · August · भारत
              </span>
              <span className="h-px w-8 sm:w-12 bg-cadet-gold/70" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mb-6 sm:mb-8"
            >
              <CadetLogo size={96} priority className="sm:!w-[120px] sm:!h-[120px]" />
            </motion.div>

            <motion.h2
              id="ind-day-title"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-black tracking-tight leading-[1.05] text-balance text-[clamp(1.75rem,6vw,3.25rem)]"
            >
              <span aria-hidden className="mr-2">🇮🇳</span>
              Happy <span className="text-cadet-gold">Independence Day</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7 }}
              className="mt-5 sm:mt-6 max-w-lg mx-auto text-sm sm:text-base md:text-lg text-cadet-bone/75 leading-relaxed"
            >
              Celebrating the spirit of freedom, courage, discipline and service.
              Welcome to <span className="text-cadet-bone">THEMEMECADET</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 sm:mt-10 inline-flex items-center gap-3"
            >
              <span className="h-px w-6 sm:w-8 bg-cadet-gold" />
              <span className="font-mono text-xs sm:text-sm tracking-[0.45em] text-cadet-gold">
                JAI HIND
              </span>
              <span aria-hidden>🇮🇳</span>
              <span className="h-px w-6 sm:w-8 bg-cadet-gold" />
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.05, duration: 0.6 }}
              onClick={close}
              className="mt-10 sm:mt-12 inline-flex items-center justify-center gap-2 px-6 py-3 border border-cadet-bone/25 text-cadet-bone hover:border-cadet-gold hover:text-cadet-gold transition-colors font-medium tracking-[0.22em] text-[11px] sm:text-[12px] uppercase"
            >
              Enter Headquarters
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
