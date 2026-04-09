import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/outfit'
import '@fontsource/outfit/700.css'
import '@fontsource/space-grotesk'
import '@fontsource/space-grotesk/700.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
