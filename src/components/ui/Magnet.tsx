import { useRef, useState, useCallback, type ReactNode } from 'react'

interface MagnetProps {
  children: ReactNode
  className?: string
  padding?: number
  strength?: number
}

export default function Magnet({
  children,
  className,
  padding = 150,
  strength = 3,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distX = e.clientX - centerX
      const distY = e.clientY - centerY

      const halfW = rect.width / 2
      const halfH = rect.height / 2
      const edgeDistX = Math.max(0, Math.abs(distX) - halfW)
      const edgeDistY = Math.max(0, Math.abs(distY) - halfH)
      const edgeDist = Math.sqrt(edgeDistX ** 2 + edgeDistY ** 2)

      if (edgeDist > padding) {
        if (isHovered) {
          setIsHovered(false)
          setPosition({ x: 0, y: 0 })
        }
        return
      }

      if (!isHovered) setIsHovered(true)
      setPosition({ x: distX / strength, y: distY / strength })
    },
    [padding, strength, isHovered],
  )

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    setPosition({ x: 0, y: 0 })
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isHovered
          ? 'transform 0.3s ease-out'
          : 'transform 0.6s ease-in-out',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  )
}
