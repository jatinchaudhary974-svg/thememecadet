'use client'
import { motion } from 'framer-motion'

export function CadetMark({ size = 72, className = '' }) {
  return (
    <motion.svg
      initial={{ opacity: 0, scale: 0.9, rotate: -6 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={className}
    >
      <defs>
        <linearGradient id="goldStroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E7C982" />
          <stop offset="50%" stopColor="#C9A961" />
          <stop offset="100%" stopColor="#9C7F3E" />
        </linearGradient>
      </defs>

      {/* Outer hex badge */}
      <polygon
        points="60,4 108,32 108,88 60,116 12,88 12,32"
        fill="#0B120D"
        stroke="url(#goldStroke)"
        strokeWidth="1.5"
      />
      {/* Inner ring */}
      <polygon
        points="60,14 98,36 98,84 60,106 22,84 22,36"
        fill="none"
        stroke="#EDEAE0"
        strokeOpacity="0.18"
        strokeWidth="1"
      />
      {/* Crosshair */}
      <circle cx="60" cy="60" r="22" fill="none" stroke="url(#goldStroke)" strokeWidth="1.25" />
      <line x1="60" y1="30" x2="60" y2="46" stroke="url(#goldStroke)" strokeWidth="1.25" />
      <line x1="60" y1="74" x2="60" y2="90" stroke="url(#goldStroke)" strokeWidth="1.25" />
      <line x1="30" y1="60" x2="46" y2="60" stroke="url(#goldStroke)" strokeWidth="1.25" />
      <line x1="74" y1="60" x2="90" y2="60" stroke="url(#goldStroke)" strokeWidth="1.25" />
      {/* Center M */}
      <text
        x="60"
        y="68"
        textAnchor="middle"
        fontFamily="Playfair Display, serif"
        fontWeight="800"
        fontSize="26"
        fill="#EDEAE0"
        letterSpacing="1"
      >
        MC
      </text>
      {/* Chevrons */}
      <path d="M40 96 L60 88 L80 96" fill="none" stroke="url(#goldStroke)" strokeWidth="1.25" />
      <path d="M44 100 L60 93 L76 100" fill="none" stroke="url(#goldStroke)" strokeOpacity="0.7" strokeWidth="1" />
    </motion.svg>
  )
}

export default CadetMark
