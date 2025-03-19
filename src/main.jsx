import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/style/index.css'
import App from './App.jsx'

window.getImgUrl = function getImageUrl(path) {
  return new URL(path, import.meta.url).href
}
import { toyService } from './services/toy.service.js'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <App />
  // </StrictMode>,
)
