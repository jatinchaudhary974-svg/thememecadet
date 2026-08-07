'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

/**
 * Official THEMEMECADET logo.
 * The source image is used exactly as provided — no cropping, no filters.
 * We only scale it responsively.
 */
export function CadetLogo({ size = 96, priority = false, className = '', animate = false }) {
  const Wrapper = animate ? motion.div : 'div'
  const motionProps = animate
    ? {
        initial: { opacity: 0, scale: 0.92, y: 6 },
        animate: { opacity: 1, scale: 1, y: 0 },
        transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
      }
    : {}

  return (
    <Wrapper
      {...motionProps}
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/logo.png"
        alt="THEMEMECADET — official logo"
        fill
        priority={priority}
        sizes={`${size}px`}
        className="object-contain select-none pointer-events-none"
        draggable={false}
      />
    </Wrapper>
  )
}

export default CadetLogo
