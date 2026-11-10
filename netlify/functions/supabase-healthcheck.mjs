export default async () => {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY;

    if (!supabaseUrl) {
        throw new Error(
            "SUPABASE_URL is not configured in Netlify."
        );
    }

    if (!supabaseKey) {
        throw new Error(
            "SUPABASE_PUBLISHABLE_KEY is not configured in Netlify."
        );
    }

    const url =
        `${supabaseUrl}/rest/v1/healthcheck` +
        `?id=eq.1&select=id,status`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            Accept: "application/json",
        },
    });

    const responseText = await response.text();

    if (!response.ok) {
        console.error(
            "Supabase healthcheck failed",
            {
                status: response.status,
                response: responseText,
            }
        );

        throw new Error(
            `Supabase returned HTTP ${response.status}`
        );
    }

    console.log(
        "Supabase healthcheck successful",
        {
            time: new Date().toISOString(),
            response: responseText,
        }
    );

    return new Response(
        JSON.stringify({
            ok: true,
            checkedAt: new Date().toISOString(),
        }),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
};


export const config = {
    schedule: "17 6,13,20 * * *",
};