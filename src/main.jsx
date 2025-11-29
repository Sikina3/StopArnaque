import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './views/App'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={"720295708835-7iv458n6e59s7c61sekevmg57d1v2g0m.apps.googleusercontent.com"}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
)
