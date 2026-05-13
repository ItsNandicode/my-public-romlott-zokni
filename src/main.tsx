import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index-v4.css' // Import your Tailwind v4 styles
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)