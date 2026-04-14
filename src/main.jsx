import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/outfit/latin-400.css'
import '@fontsource/outfit/latin-700.css'
import '@fontsource/space-grotesk/latin-400.css'
import '@fontsource/space-grotesk/latin-700.css'
import './index.css'
import App from './App.jsx'
import NotFound from './pages/NotFound.jsx'

const isHomeRoute = window.location.pathname === '/' || window.location.pathname === '/index.html'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isHomeRoute ? <App /> : <NotFound />}
  </StrictMode>,
)
