import { useRef, useState, type ElementType, type CSSProperties, type ComponentPropsWithoutRef } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'

type AnimatedTextProps<T extends ElementType> = {
  text: string
  className?: string
  style?: CSSProperties
  as?: T
}

export default function AnimatedText<T extends ElementType = 'p'>({
  text,
  className,
  style,
  as,
}: AnimatedTextProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof AnimatedTextProps<T>>) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })
  const [scrollVal, setScrollVal] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setScrollVal(latest)
  })

  const Tag = as ?? 'p'
  const chars = text.split('')
  const total = chars.length

  return (
    <div ref={ref} className={className} style={style}>
      <Tag>
        {chars.map((char, i) => {
          const raw = total > 1
            ? (scrollVal * total - i) / (total - 1)
            : scrollVal
          const opacity = 0.2 + 0.8 * Math.max(0, Math.min(1, raw))

          return (
            <span key={i} style={{ opacity }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          )
        })}
      </Tag>
    </div>
  )
}
