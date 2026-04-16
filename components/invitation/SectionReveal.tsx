'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface Props {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade' | 'blur' | 'flip'
  className?: string
  once?: boolean
}

const variants = {
  up:    { hidden: { opacity: 0, y: 40 },                    visible: { opacity: 1, y: 0 } },
  down:  { hidden: { opacity: 0, y: -30 },                   visible: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: -40 },                   visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 40 },                    visible: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.9 },               visible: { opacity: 1, scale: 1 } },
  fade:  { hidden: { opacity: 0 },                           visible: { opacity: 1 } },
  blur:  { hidden: { opacity: 0, filter: 'blur(8px)', scale: 0.98 }, visible: { opacity: 1, filter: 'blur(0px)', scale: 1 } },
  flip:  { hidden: { opacity: 0, rotateX: 20, y: 30 },      visible: { opacity: 1, rotateX: 0, y: 0 } },
}

const durations = {
  up: 0.55, down: 0.5, left: 0.55, right: 0.55,
  scale: 0.5, fade: 0.6, blur: 0.65, flip: 0.6,
}

export default function SectionReveal({ children, delay = 0, direction = 'up', className, once = true }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin: '0px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants[direction]}
      transition={{
        duration: durations[direction],
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ willChange: 'transform, opacity' }}
      className={className}>
      {children}
    </motion.div>
  )
}
