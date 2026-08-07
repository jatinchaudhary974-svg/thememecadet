'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

/**
 * Official THEMEMECADET logo.
 *
 * Two variants of the SAME logo image (untouched, exactly as provided):
 *   - "transparent" : PNG with no background — used on the dark hero where the
 *                     mark should float seamlessly.
 *   - "boxed"       : PNG with the dark-green brand background baked in — used
 *                     in the navbar, overlay banners, footer and loader; we
 *                     apply a soft rounded corner + subtle gold hairline so it
 *                     sits like a proper brand chip.
 */
export function CadetLogo({
  size = 96,
  variant = 'boxed',       // 'boxed' | 'transparent'
  priority = false,
  animate = false,
  rounded = true,          // only applies to boxed variant
  className = '',
}) {
  const src = variant === 'transparent' ? '/logo-transparent.png' : '/logo-boxed.png'
  const alt = 'THEMEMECADET — the meme Cadet · official logo'

  const Wrapper = animate ? motion.div : 'div'
  const motionProps = animate
    ? {
        initial: { opacity: 0, scale: 0.92, y: 6 },
        animate: { opacity: 1, scale: 1, y: 0 },
        transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
      }
    : {}

  const isBoxed = variant === 'boxed'
  const chipClasses = isBoxed && rounded
    ? 'rounded-xl overflow-hidden ring-1 ring-cadet-gold/25 shadow-[0_6px_24px_-8px_rgba(0,0,0,0.6)]'
    : ''

  return (
    <Wrapper
      {...motionProps}
      className={`relative inline-block ${chipClasses} ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={`${size}px`}
        className={`${isBoxed ? 'object-cover' : 'object-contain'} select-none pointer-events-none`}
        draggable={false}
      />
    </Wrapper>
  )
}

export default CadetLogo
