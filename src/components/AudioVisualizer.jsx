import { useEffect, useRef, useState, useCallback } from 'react'

export default function AudioVisualizer() {
  const canvasRef = useRef(null)
  const audioRef = useRef(null)
  const analyserRef = useRef(null)
  const audioContextRef = useRef(null)
  const animationRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // Gedeckte einfarbige Farbe
  const color = '#5a2a18' // Dunkles Rostbraun

  const initAudio = useCallback(async () => {
    if (audioContextRef.current) return

    const audio = audioRef.current
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    audioContextRef.current = audioContext

    const analyser = audioContext.createAnalyser()
    analyser.fftSize = 256
    analyser.smoothingTimeConstant = 0.85
    analyserRef.current = analyser

    const source = audioContext.createMediaElementSource(audio)
    source.connect(analyser)
    analyser.connect(audioContext.destination)
  }, [])

  // Autoplay versuch + bei Klick irgendwo starten
  useEffect(() => {
    const tryAutoplay = async () => {
      try {
        await initAudio()
        const audio = audioRef.current
        await audio.play()
        setIsPlaying(true)
      } catch (e) {
        // Autoplay blockiert - bei nächstem Klick irgendwo starten
      }
    }

    const startOnClick = async () => {
      if (!isPlaying && audioRef.current) {
        try {
          if (!audioContextRef.current) {
            await initAudio()
          }
          if (audioContextRef.current?.state === 'suspended') {
            await audioContextRef.current.resume()
          }
          await audioRef.current.play()
          setIsPlaying(true)
          document.removeEventListener('click', startOnClick)
        } catch (e) {
          // Ignore
        }
      }
    }

    document.addEventListener('click', startOnClick)
    document.addEventListener('scroll', startOnClick)
    document.addEventListener('touchstart', startOnClick)
    const timer = setTimeout(tryAutoplay, 500)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('click', startOnClick)
      document.removeEventListener('scroll', startOnClick)
      document.removeEventListener('touchstart', startOnClick)
    }
  }, [initAudio, isPlaying])

  // Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let rotation = 0

    const animate = () => {
      const width = canvas.width
      const height = canvas.height
      const centerX = width / 2
      const centerY = height / 2

      // Hintergrund mit leichtem Fade für Trails
      ctx.fillStyle = 'rgba(10, 10, 15, 0.2)'
      ctx.fillRect(0, 0, width, height)

      // Frequenzdaten
      let dataArray = new Uint8Array(128)
      if (analyserRef.current && isPlaying) {
        analyserRef.current.getByteFrequencyData(dataArray)
      } else {
        // Idle Animation wenn keine Musik
        for (let i = 0; i < dataArray.length; i++) {
          dataArray[i] = 30 + Math.sin(Date.now() * 0.002 + i * 0.1) * 20
        }
      }

      const bars = 64
      const barWidth = (Math.PI * 2) / bars
      const maxRadius = Math.min(width, height) * 0.35
      const minRadius = 80

      rotation += 0.002

      // Äußerer Glow
      const bassAvg = dataArray.slice(0, 10).reduce((a, b) => a + b, 0) / 10
      const glowIntensity = bassAvg / 255

      const gradient = ctx.createRadialGradient(centerX, centerY, minRadius, centerX, centerY, maxRadius * 1.5)
      gradient.addColorStop(0, `rgba(90, 42, 24, ${0.2 * glowIntensity})`)
      gradient.addColorStop(0.5, `rgba(90, 42, 24, ${0.1 * glowIntensity})`)
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

      ctx.beginPath()
      ctx.arc(centerX, centerY, maxRadius * 1.5, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      // Kreisförmige Balken
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(rotation)

      for (let i = 0; i < bars; i++) {
        const value = dataArray[i % dataArray.length]
        const normalizedValue = value / 255
        const barHeight = minRadius + (maxRadius - minRadius) * normalizedValue

        const angle = i * barWidth

        // Innerer Balken
        ctx.save()
        ctx.rotate(angle)

        // Glow für den Balken
        ctx.shadowBlur = 15 * normalizedValue
        ctx.shadowColor = color

        // Balken zeichnen
        const barThickness = 3 + normalizedValue * 3
        ctx.beginPath()
        ctx.moveTo(minRadius, 0)
        ctx.lineTo(barHeight, 0)
        ctx.strokeStyle = color
        ctx.lineWidth = barThickness
        ctx.lineCap = 'round'
        ctx.stroke()

        // Spiegelung auf der anderen Seite
        ctx.beginPath()
        ctx.moveTo(-minRadius, 0)
        ctx.lineTo(-barHeight, 0)
        ctx.stroke()

        ctx.restore()
      }

      ctx.restore()

      // Innerer Kreis mit Puls
      const pulseSize = minRadius * (0.8 + glowIntensity * 0.3)

      const innerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, pulseSize)
      innerGradient.addColorStop(0, `rgba(90, 42, 24, ${0.5 + glowIntensity * 0.3})`)
      innerGradient.addColorStop(0.7, `rgba(90, 42, 24, ${0.2 + glowIntensity * 0.15})`)
      innerGradient.addColorStop(1, 'rgba(90, 42, 24, 0)')

      ctx.beginPath()
      ctx.arc(centerX, centerY, pulseSize, 0, Math.PI * 2)
      ctx.fillStyle = innerGradient
      ctx.fill()

      // Wellenringe bei starkem Beat
      if (bassAvg > 150) {
        const ringCount = 3
        for (let r = 0; r < ringCount; r++) {
          const ringProgress = ((Date.now() * 0.003 + r * 0.3) % 1)
          const ringRadius = minRadius + (maxRadius * 1.2 - minRadius) * ringProgress
          const ringAlpha = (1 - ringProgress) * 0.3 * glowIntensity

          ctx.beginPath()
          ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(90, 42, 24, ${ringAlpha})`
          ctx.lineWidth = 2
          ctx.stroke()
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [isPlaying])

  // Cleanup
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          background: 'linear-gradient(180deg, #0a0a0f 0%, #150510 50%, #0a0a0f 100%)'
        }}
      />

      <audio
        ref={audioRef}
        src="/rave-intro.mp3"
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

    </>
  )
}
