'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8, // Durata della "frenata" (più alto = più morbido)
      easing: (t) => 1 - Math.pow(1 - t, 3), // Curva più immediata
      smoothWheel: true,
      touchMultiplier: 2, // Se vuoi scroll più veloce su trackpad
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Pulizia quando il componente viene smontato
    return () => {
      lenis.destroy()
    }
  }, [])

  return null // Questo componente non renderizza nulla di visibile
}