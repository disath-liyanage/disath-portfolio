import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import GlassFilter from './components/GlassFilter'
import MorphFilter from './components/MorphFilter'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CV from './pages/CV'
import NotFound from './pages/NotFound'
import SplashScreen from './components/SplashScreen'
import { Analytics } from "@vercel/analytics/react"

function Home() {
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
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/cv" element={<CV />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  )
}

export default App