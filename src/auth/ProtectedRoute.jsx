
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { registerAuth0Client } from "../assets/utils/supabaseClient.js";

const ALLOWED_ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

function ProtectedRoute({ children }) {
    const auth0 = useAuth0();
    const {
        isAuthenticated,
        isLoading,
        loginWithRedirect,
        user,
        logout
    } = auth0;

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            loginWithRedirect({
                appState: { returnTo: window.location.pathname }
            });
        }
    }, [isLoading, isAuthenticated, loginWithRedirect]);

    // Registreert de Auth0-client bij Supabase zodra de gebruiker is
    // ingelogd, ongeacht welke beveiligde pagina dit component wrapt.
    useEffect(() => {
        if (isAuthenticated) {
            registerAuth0Client(auth0);
        }
    }, [isAuthenticated, auth0]);

    if (isLoading) {
        return (
            <div className="adminAuthState">
                <p>Checking your session…</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="adminAuthState">
                <p>Redirecting to login…</p>
            </div>
        );
    }

    // Extra client-side check (defense in depth). De echte beveiliging
    // zit in de Auth0 Action die niet-toegestane e-mails al bij login
    // weigert — zie instructies stap 5.
    if (
        ALLOWED_ADMIN_EMAIL &&
        user?.email?.toLowerCase() !== ALLOWED_ADMIN_EMAIL.toLowerCase()
    ) {
        return (
            <div className="adminAuthState">
                <p>
                    Access denied. This account is not authorized to view
                    this page.
                </p>

                <button
                    type="button"
                    className="adminSecondaryButton"
                    onClick={() =>
                        logout({
                            logoutParams: {
                                returnTo: window.location.origin
                            }
                        })
                    }
                >
                    Log out
                </button>
            </div>
        );
    }

    return children;
}

export default ProtectedRoute;
