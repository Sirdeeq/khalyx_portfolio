import { useState, useEffect } from 'react'

const words = ['Khalyx', 'Khalifa', 'Sirdurx']

export default function TypewriterHeading() {
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex]

    if (!deleting && charIndex < current.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), 120)
      return () => clearTimeout(t)
    }

    if (!deleting && charIndex === current.length) {
      const t = setTimeout(() => setDeleting(true), 1500)
      return () => clearTimeout(t)
    }

    if (deleting && charIndex > 0) {
      const t = setTimeout(() => setCharIndex((c) => c - 1), 60)
      return () => clearTimeout(t)
    }

    if (deleting && charIndex === 0) {
      setDeleting(false)
      setWordIndex((i) => (i + 1) % words.length)
    }
  }, [charIndex, deleting, wordIndex])

  return (
    <span>
      {words[wordIndex].slice(0, charIndex)}
      <span className="animate-pulse">|</span>
    </span>
  )
}
