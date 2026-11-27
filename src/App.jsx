import { lazy, Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import GlassFilter from './components/GlassFilter'
import MorphFilter from './components/MorphFilter'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import SplashScreen from './components/SplashScreen'
import { Analytics } from "@vercel/analytics/react"

const CV = lazy(() => import('./pages/CV'))
const NotFound = lazy(() => import('./pages/NotFound'))
const ErpSystem = lazy(() => import('./pages/projects/ErpSystem'))
const Lensy = lazy(() => import('./pages/projects/Lensy'))

function Home() {
  const location = useLocation()

  useEffect(() => {
    const targetId = location.state?.scrollTo || (location.hash ? location.hash.slice(1) : null)
    if (!targetId) return

    window.scrollTo({ top: 0, behavior: 'instant' })
    const timer = setTimeout(() => {
      const el = document.getElementById(targetId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      if (location.state?.focusField) {
        document.getElementById(location.state.focusField)?.focus({ preventScroll: true })
      }
    }, 120)

    return () => clearTimeout(timer)
  }, [location])

  return (
    <>
      <GlassFilter />
      <MorphFilter />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

function App() {
  const [showSplash, setShowSplash] = useState(true)
  return (
    <BrowserRouter>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cv" element={<CV />} />
          <Route path="/projects/erp-system" element={<ErpSystem />} />
          <Route path="/projects/3ds-system" element={<Navigate to="/projects/erp-system" replace />} />
          <Route path="/projects/lensy" element={<Lensy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Analytics />
    </BrowserRouter>
  )
}

export default App