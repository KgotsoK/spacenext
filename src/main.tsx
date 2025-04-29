import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css' // Removed: Tailwind directives are now in index.css
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
