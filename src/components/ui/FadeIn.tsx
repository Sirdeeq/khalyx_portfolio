import { useMemo, type ComponentPropsWithoutRef, type ElementType } from 'react'
import { motion } from 'framer-motion'

type FadeInProps<T extends ElementType> = {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  x?: number
  y?: number
  as?: T
}

export default function FadeIn<T extends ElementType = 'div'>({
  children,
  className,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as,
  ...rest
}: FadeInProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof FadeInProps<T>>) {
  const Component = useMemo(() => motion.create(as ?? 'div'), [as])

  return (
    <Component
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
      {...rest}
    >
      {children}
    </Component>
  )
}
