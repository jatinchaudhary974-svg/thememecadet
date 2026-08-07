'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CadetLogo } from './Logo'

export default function BrandLoader() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    // Only show on first visit within a session.
    if (typeof window === 'undefined') return
    const seen = sessionStorage.getItem('mc:loaded')
    if (seen) {
      setShow(false)
      return
    }
    const t = setTimeout(() => {
      sessionStorage.setItem('mc:loaded', '1')
      setShow(false)
    }, 1600)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-cadet-ink"
        >
          {/* corner ticks */}
          {['top-6 left-6', 'top-6 right-6 rotate-90', 'bottom-6 left-6 -rotate-90', 'bottom-6 right-6 rotate-180'].map((p, i) => (
            <div key={i} className={`absolute ${p} w-5 h-5 pointer-events-none`}>
              <div className="absolute top-0 left-0 w-full h-px bg-cadet-gold/70" />
              <div className="absolute top-0 left-0 h-full w-px bg-cadet-gold/70" />
            </div>
          ))}

          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <CadetLogo size={128} variant="boxed" priority />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-mono text-[10px] tracking-[0.45em] text-cadet-khaki uppercase"
            >
              THEMEMECADET · Loading
            </motion.div>

            <div className="relative w-40 h-px bg-cadet-bone/10 overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.4, ease: 'easeInOut' }}
                className="absolute inset-y-0 left-0 w-1/2 bg-cadet-gold"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
