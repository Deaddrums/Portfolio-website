import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter as Router} from "react-router-dom"
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate.jsx";




createRoot(document.getElementById('root')).render(
    <StrictMode>

        <Router>

            <Auth0ProviderWithNavigate>
                <App/>
            </Auth0ProviderWithNavigate>

        </Router>

    </StrictMode>,
)
