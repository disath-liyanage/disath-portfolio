import { useEffect, useRef } from 'react'
import styles from './InteractiveBackground.module.css'

const GRID_SPACING = 36
const MOUSE_RADIUS = 90
const HOVER_BUFFER = 28
const BUFFER_PUSH = 0.012
const SPRING_FACTOR = 0.015
const FRICTION = 0.9
const MAX_SPEED = 1.5
const FIELD_RADIUS_EASE = 0.14

const HOME_DRIFT_RATE = 0.05
const MAX_HOME_DRIFT = GRID_SPACING * 0.45
const HOME_HEAL_RATE = 0.009

const WAVE_SPEED = 11
const WAVE_LIFE = 110
const WAVE_WIDTH = 150
const WAVE_AMPLITUDE = 26

export default function InteractiveBackground({ isActive }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!isActive) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const parent = canvas.parentElement

    let animationFrameId
    let particles = []
    let waves = []
    let lastTime = performance.now()

    const pointer = { clientX: -1000, clientY: -1000, active: false }
    const field = {
      x: -1000,
      y: -1000,
      px: -1000,
      py: -1000,
      sx: 0,
      sy: 0,
      len2: 0,
      radius: 0,
      initialized: false,
    }

    const clamp = (v, min, max) => Math.min(max, Math.max(min, v))

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = parent.clientHeight
    }

    const closestOnSweep = (x, y) => {
      let t = 0
      if (field.len2 > 0.0001) {
        t = clamp(
          ((x - field.px) * field.sx + (y - field.py) * field.sy) / field.len2,
          0,
          1
        )
      }
      return [field.px + field.sx * t, field.py + field.sy * t]
    }

    class Particle {
      constructor(x, y) {
        this.originX = x
        this.originY = y
        this.baseX = x
        this.baseY = y
        this.x = x
        this.y = y
        this.vx = 0
        this.vy = 0
        this.waveX = 0
        this.waveY = 0

        this.size = Math.random() * 1.4 + 0.7

        this.angle = Math.random() * Math.PI * 2
        this.angleSpeed = Math.random() * 0.008 + 0.01
        this.waveRadius = Math.random() * 7 + 5
      }

      update(dt, friction) {
        this.angle += this.angleSpeed * dt

        const targetX = this.baseX + Math.cos(this.angle) * this.waveRadius
        const targetY = this.baseY + Math.sin(this.angle) * this.waveRadius

        let touched = false

        if (field.radius > 0) {
          const [cx, cy] = closestOnSweep(this.x, this.y)
          const dx = this.x - cx
          const dy = this.y - cy
          const boundary = field.radius + this.size
          const reach = boundary + HOVER_BUFFER
          const d2 = dx * dx + dy * dy

          if (d2 < reach * reach) {
            touched = true
            const distance = Math.sqrt(d2)
            const nx = distance > 0.001 ? dx / distance : 1
            const ny = distance > 0.001 ? dy / distance : 0

            const depth = reach - distance
            this.vx += nx * depth * BUFFER_PUSH * dt
            this.vy += ny * depth * BUFFER_PUSH * dt

            const influence = Math.min(1, depth / HOVER_BUFFER)
            const drift = HOME_DRIFT_RATE * influence * dt
            this.baseX += (this.x - this.baseX) * drift
            this.baseY += (this.y - this.baseY) * drift
          }
        }

        if (!touched) {
          const heal = HOME_HEAL_RATE * dt
          this.baseX += (this.originX - this.baseX) * heal
          this.baseY += (this.originY - this.baseY) * heal
        }
        this.baseX = clamp(
          this.baseX,
          this.originX - MAX_HOME_DRIFT,
          this.originX + MAX_HOME_DRIFT
        )
        this.baseY = clamp(
          this.baseY,
          this.originY - MAX_HOME_DRIFT,
          this.originY + MAX_HOME_DRIFT
        )

        this.vx += (targetX - this.x) * SPRING_FACTOR * dt
        this.vy += (targetY - this.y) * SPRING_FACTOR * dt

        this.vx *= friction
        this.vy *= friction

        const speed2 = this.vx * this.vx + this.vy * this.vy
        if (speed2 > MAX_SPEED * MAX_SPEED) {
          const scale = MAX_SPEED / Math.sqrt(speed2)
          this.vx *= scale
          this.vy *= scale
        }

        this.x += this.vx * dt
        this.y += this.vy * dt

        if (field.radius > 0) {
          const [cx, cy] = closestOnSweep(this.x, this.y)
          const dx = this.x - cx
          const dy = this.y - cy
          const boundary = field.radius + this.size
          const d2 = dx * dx + dy * dy

          if (d2 < boundary * boundary) {
            const distance = Math.sqrt(d2)
            const nx = distance > 0.001 ? dx / distance : 1
            const ny = distance > 0.001 ? dy / distance : 0

            this.x = cx + nx * boundary
            this.y = cy + ny * boundary

            const inward = this.vx * nx + this.vy * ny
            if (inward < 0) {
              this.vx -= nx * inward * 1.12
              this.vy -= ny * inward * 1.12
            }
          }
        }

        let wx = 0
        let wy = 0
        for (const wave of waves) {
          const dx = this.x - wave.x
          const dy = this.y - wave.y
          const d = Math.hypot(dx, dy)
          const delta = d - wave.age * WAVE_SPEED

          if (delta > -WAVE_WIDTH && delta < WAVE_WIDTH) {
            const envelope = 0.5 * (1 + Math.cos((Math.PI * delta) / WAVE_WIDTH))
            const ripple = Math.sin((Math.PI * delta) / WAVE_WIDTH) * envelope
            const fade = Math.pow(1 - wave.age / WAVE_LIFE, 1.5)
            const offset = ripple * fade * WAVE_AMPLITUDE

            const nx = d > 0.001 ? dx / d : 1
            const ny = d > 0.001 ? dy / d : 0
            wx += nx * offset
            wy += ny * offset
          }
        }
        this.waveX = wx
        this.waveY = wy
      }
    }

    function init() {
      particles = []

      const columns = Math.ceil(canvas.width / GRID_SPACING)
      const rows = Math.ceil(canvas.height / GRID_SPACING)
      const cellWidth = canvas.width / columns
      const cellHeight = canvas.height / rows

      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          const x =
            (column + 0.5) * cellWidth +
            (Math.random() - 0.5) * cellWidth * 0.7

          const y =
            (row + 0.5) * cellHeight +
            (Math.random() - 0.5) * cellHeight * 0.7

          particles.push(new Particle(x, y))
        }
      }
    }

    function animate(now) {
      animationFrameId = requestAnimationFrame(animate)

      const dt = Math.min((now - lastTime) / 16.667, 3)
      lastTime = now
      const friction = Math.pow(FRICTION, dt)
      const radiusEase = 1 - Math.pow(1 - FIELD_RADIUS_EASE, dt)

      if (pointer.active) {
        const rect = canvas.getBoundingClientRect()
        const mx = pointer.clientX - rect.left
        const my = pointer.clientY - rect.top

        if (!field.initialized) {
          field.x = mx
          field.y = my
          field.initialized = true
        }

        field.px = field.x
        field.py = field.y
        field.x = mx
        field.y = my

        field.radius += (MOUSE_RADIUS - field.radius) * radiusEase
      } else {
        field.px = field.x
        field.py = field.y
        field.radius += (0 - field.radius) * radiusEase
        if (field.radius < 0.1) field.initialized = false
      }

      if (field.radius < 0.1) field.radius = 0

      field.sx = field.x - field.px
      field.sy = field.y - field.py
      field.len2 = field.sx * field.sx + field.sy * field.sy

      for (const wave of waves) wave.age += dt
      waves = waves.filter((wave) => wave.age < WAVE_LIFE)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = 'rgba(255, 255, 255, 0.23)'
      ctx.beginPath()
      for (const particle of particles) {
        particle.update(dt, friction)
        const drawX = particle.x + particle.waveX
        const drawY = particle.y + particle.waveY
        ctx.moveTo(drawX + particle.size, drawY)
        ctx.arc(drawX, drawY, particle.size, 0, Math.PI * 2)
      }
      ctx.fill()
    }

    const handleMouseMove = (event) => {
      pointer.clientX = event.clientX
      pointer.clientY = event.clientY
      pointer.active = true
    }

    const handleMouseLeave = () => {
      pointer.active = false
    }

    const handleMouseDown = (event) => {
      const rect = canvas.getBoundingClientRect()
      waves.push({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        age: 0,
      })
      if (waves.length > 6) waves.shift()
    }

    const handleResize = () => {
      const w = window.innerWidth
      const h = parent.clientHeight
      if (w === canvas.width && h === canvas.height) return
      setCanvasSize()
      init()
    }

    setCanvasSize()
    init()
    animationFrameId = requestAnimationFrame(animate)

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(parent)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown, { passive: true })
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('blur', handleMouseLeave)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('blur', handleMouseLeave)
      window.removeEventListener('resize', handleResize)
      resizeObserver.disconnect()
      cancelAnimationFrame(animationFrameId)
    }
  }, [isActive])

  return (
    <canvas
      ref={canvasRef}
      className={`${styles.canvas} ${isActive ? styles.visible : ''}`}
      aria-hidden="true"
    />
  )
}