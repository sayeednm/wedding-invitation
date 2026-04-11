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
  up:    { hidden: { opacity: 0, y: 60 },                    visible: { opacity: 1, y: 0 } },
  down:  { hidden: { opacity: 0, y: -40 },                   visible: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: -60 },                   visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 60 },                    visible: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.85 },              visible: { opacity: 1, scale: 1 } },
  fade:  { hidden: { opacity: 0 },                           visible: { opacity: 1 } },
  blur:  { hidden: { opacity: 0, filter: 'blur(12px)', scale: 0.96 }, visible: { opacity: 1, filter: 'blur(0px)', scale: 1 } },
  flip:  { hidden: { opacity: 0, rotateX: 30, y: 40 },      visible: { opacity: 1, rotateX: 0, y: 0 } },
}

const durations = {
  up: 0.75, down: 0.6, left: 0.7, right: 0.7,
  scale: 0.7, fade: 0.8, blur: 0.9, flip: 0.8,
}

export default function SectionReveal({ children, delay = 0, direction = 'up', className, once = true }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin: '-60px' })

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
      className={className}>
      {children}
    </motion.div>
  )
}
