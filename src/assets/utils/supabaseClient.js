// src/assets/utils/supabaseClient.js

import { createClient } from "@supabase/supabase-js";

let auth0ClientRef = null;

export function registerAuth0Client(auth0Client) {
    auth0ClientRef = auth0Client;
}

export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY,
    {
        accessToken: async () => {
            if (!auth0ClientRef || !auth0ClientRef.isAuthenticated) {
                return null;
            }

            try {
                const claims = await auth0ClientRef.getIdTokenClaims();
                return claims?.__raw ?? null;
            } catch (error) {
                console.error("Kon Auth0 ID-token niet ophalen:", error);
                return null;
            }
        }
    }
);