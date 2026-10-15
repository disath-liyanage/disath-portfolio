import { useEffect, useRef } from 'react'
import styles from './InteractiveBackground.module.css'

export default function InteractiveBackground({ isActive }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!isActive) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId
    
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = canvas.parentElement.clientHeight
    }
    setCanvasSize()

    let particles = []
    
    const MOUSE_RADIUS = 160
    const SPRING_FACTOR = 0.015
    const FRICTION = 0.92

    let mouse = {
      x: -1000,
      y: -1000
    }

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = event.clientX - rect.left
      mouse.y = event.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    const handleResize = () => {
      setCanvasSize()
      init()
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseout', handleMouseLeave)
    window.addEventListener('resize', handleResize)

    class Particle {
      constructor(x, y, size) {
        this.baseX = x
        this.baseY = y
        this.x = x
        this.y = y
        this.vx = 0
        this.vy = 0
        this.size = size
        this.color = 'rgba(255, 255, 255, 0.25)' 
        
        this.angle = Math.random() * Math.PI * 2
        this.angleSpeed = Math.random() * 0.015 + 0.005
        this.waveRadius = Math.random() * 25 + 10
      }

      update() {
        this.angle += this.angleSpeed
        let targetX = this.baseX + Math.cos(this.angle) * this.waveRadius
        let targetY = this.baseY + Math.sin(this.angle) * this.waveRadius

        let dx = mouse.x - this.x
        let dy = mouse.y - this.y
        let distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < MOUSE_RADIUS) {
          let forceDirectionX = dx / distance
          let forceDirectionY = dy / distance
          let force = Math.pow((MOUSE_RADIUS - distance) / MOUSE_RADIUS, 2)
          
          this.vx -= forceDirectionX * force * 1.2
          this.vy -= forceDirectionY * force * 1.2
        }

        let springDx = targetX - this.x
        let springDy = targetY - this.y
        
        this.vx += springDx * SPRING_FACTOR
        this.vy += springDy * SPRING_FACTOR

        this.vx *= FRICTION
        this.vy *= FRICTION

        this.x += this.vx
        this.y += this.vy
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
      const numParticles = 250 

      for (let i = 0; i < numParticles; i++) {
        let x = Math.random() * canvas.width
        let y = Math.random() * canvas.height
        let size = Math.random() * 2 + 0.5 
        
        particles.push(new Particle(x, y, size))
      }
    }

    function animate() {
      animationFrameId = requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
      }
    }

    init()
    animate()

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
    />
  )
}