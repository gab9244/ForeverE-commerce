import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Styles/index.css'
import './Styles/App.css'
import './Styles/Header.css'
import { Pages } from './Components/Pages'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Pages />
  </StrictMode>,
)
