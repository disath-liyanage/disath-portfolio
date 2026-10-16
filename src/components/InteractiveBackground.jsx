import { useEffect, useRef } from 'react'
import styles from './InteractiveBackground.module.css'

const GRID_SPACING = 48
const MOUSE_RADIUS = 90
const HOVER_BUFFER = 32
const SPRING_FACTOR = 0.012
const FRICTION = 0.91
const MAX_SPEED = 0.75

export default function InteractiveBackground({ isActive }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!isActive) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    let animationFrameId
    let particles = []

    const mouse = { x: -1000, y: -1000, active: false }
    const field = { x: -1000, y: -1000, radius: 0 }

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = canvas.parentElement.clientHeight
    }

    class Particle {
      constructor(x, y) {
        this.baseX = x
        this.baseY = y
        this.x = x
        this.y = y
        this.vx = 0
        this.vy = 0

        this.size = Math.random() * 1.4 + 0.7
        this.color = 'rgba(255, 255, 255, 0.23)'

        this.angle = Math.random() * Math.PI * 2
        this.angleSpeed = Math.random() * 0.008 + 0.01
        this.waveRadius = Math.random() * 7 + 5

        this.orbitDirection = Math.random() < 0.5 ? -1 : 1
        this.orbitSpeed = Math.random() * 0.025 + 0.015
      }

      update() {
        this.angle += this.angleSpeed

        let targetX =
          this.baseX + Math.cos(this.angle) * this.waveRadius
        let targetY =
          this.baseY + Math.sin(this.angle) * this.waveRadius

        const dx = this.x - field.x
        const dy = this.y - field.y
        const distance = Math.hypot(dx, dy)
        const boundary = field.radius + this.size

        if (field.radius > 0 && distance < boundary + HOVER_BUFFER) {
          const nx = distance > 0.001 ? dx / distance : 1
          const ny = distance > 0.001 ? dy / distance : 0

          const proximity = Math.max(
            0,
            1 - Math.max(0, distance - boundary) / HOVER_BUFFER
          )
          const influence = proximity * proximity * (3 - 2 * proximity)

          const tangentX = -ny
          const tangentY = nx
          const orbitTargetDistance = boundary + 10

          const orbitTargetX =
            field.x + nx * orbitTargetDistance + tangentX * this.orbitDirection * 18
          const orbitTargetY =
            field.y + ny * orbitTargetDistance + tangentY * this.orbitDirection * 18

          targetX += (orbitTargetX - targetX) * influence
          targetY += (orbitTargetY - targetY) * influence

          const penetration = Math.max(0, boundary + 14 - distance)
          this.vx += nx * penetration * 0.003
          this.vy += ny * penetration * 0.003
          this.vx += tangentX * this.orbitDirection * this.orbitSpeed * influence
          this.vy += tangentY * this.orbitDirection * this.orbitSpeed * influence
        }

        this.vx += (targetX - this.x) * SPRING_FACTOR
        this.vy += (targetY - this.y) * SPRING_FACTOR

        this.vx *= FRICTION
        this.vy *= FRICTION

        const speed = Math.hypot(this.vx, this.vy)
        if (speed > MAX_SPEED) {
          this.vx = (this.vx / speed) * MAX_SPEED
          this.vy = (this.vy / speed) * MAX_SPEED
        }

        this.x += this.vx
        this.y += this.vy

        const nextDx = this.x - field.x
        const nextDy = this.y - field.y
        const nextDistance = Math.hypot(nextDx, nextDy)
        const nextBoundary = field.radius + this.size

        if (field.radius > 0 && nextDistance < nextBoundary) {
          const nx = nextDistance > 0.001 ? nextDx / nextDistance : 1
          const ny = nextDistance > 0.001 ? nextDy / nextDistance : 0

          this.x = field.x + nx * nextBoundary
          this.y = field.y + ny * nextBoundary

          const inwardSpeed = this.vx * nx + this.vy * ny
          if (inwardSpeed < 0) {
            this.vx -= nx * inwardSpeed * 1.12
            this.vy -= ny * inwardSpeed * 1.12
          }
        }
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
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

    function animate() {
      animationFrameId = requestAnimationFrame(animate)

      if (mouse.active) {
        const dx = mouse.x - field.x
        const dy = mouse.y - field.y
        const distance = Math.hypot(dx, dy)
        const maxStep = 12

        if (distance > maxStep) {
          field.x += (dx / distance) * maxStep
          field.y += (dy / distance) * maxStep
        } else {
          field.x = mouse.x
          field.y = mouse.y
        }

        field.radius += (MOUSE_RADIUS - field.radius) * 0.08
      } else {
        field.radius += (0 - field.radius) * 0.08
      }

      if (field.radius < 0.1) {
        field.radius = 0
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update()
        particle.draw()
      }
    }

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = event.clientX - rect.left
      mouse.y = event.clientY - rect.top
      mouse.active = true

      if (field.x < -500) {
        field.x = mouse.x
        field.y = mouse.y
      }
    }

    const handleMouseLeave = (event) => {
      if (!event.relatedTarget) {
        mouse.active = false
      }
    }

    const handleResize = () => {
      setCanvasSize()
      init()
    }

    setCanvasSize()
    init()
    animate()

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseout', handleMouseLeave)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseout', handleMouseLeave)
      window.removeEventListener('resize', handleResize)
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