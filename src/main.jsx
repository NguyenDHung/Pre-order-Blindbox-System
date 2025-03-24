import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CLIENT_ID } from './utils/GoogleAuth.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <CartProvider>
        <App />
      </CartProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
