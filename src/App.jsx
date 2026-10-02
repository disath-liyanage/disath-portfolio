import Navbar from './components/Navbar'
import GlassFilter from './components/GlassFilter'
import MorphFilter from './components/MorphFilter'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { Analytics } from "@vercel/analytics/react";

function App() {
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
      <Analytics />
    </>
  )
}

export default App