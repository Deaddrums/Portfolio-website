import { useNavigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

function Auth0ProviderWithNavigate({ children }) {
    const navigate = useNavigate();

    const domain = import.meta.env.VITE_AUTH0_DOMAIN;
    const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
    const redirectUri = window.location.origin;

    function onRedirectCallback(appState) {
        navigate(appState?.returnTo || "/admin");
    }

    if (!domain || !clientId) {
        // Fail loud tijdens development als de .env niet correct is ingesteld.
        console.error(
            "Auth0 configuratie ontbreekt. Controleer VITE_AUTH0_DOMAIN en " +
            "VITE_AUTH0_CLIENT_ID in je .env bestand."
        );
    }

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: redirectUri
            }}
            onRedirectCallback={onRedirectCallback}
            cacheLocation="localstorage"
            useRefreshTokens={true}
        >
            {children}
        </Auth0Provider>
    );
}

export default Auth0ProviderWithNavigate;
