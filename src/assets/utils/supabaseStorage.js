import { supabase } from "./supabaseClient.js";

const BUCKET_NAME = "site-images";

/**
 * Uploadt een bestand naar Supabase Storage en geeft de publieke URL
 * terug.
 *
 * @param {File} file - het bestand uit een <input type="file">.
 * @param {string} folder - submap binnen de bucket, bv. "portfolio" of "blog".
 * @returns {Promise<string>} de publieke URL van de geüploade afbeelding.
 */
export async function uploadImage(file, folder = "misc") {
    if (!file) {
        throw new Error("Geen bestand meegegeven om te uploaden.");
    }

    const safeName = file.name
        .toLowerCase()
        .replace(/[^a-z0-9.]+/g, "-");

    const path = `${folder}/${Date.now()}-${safeName}`;

    const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(path, file, {
            cacheControl: "3600",
            upsert: false
        });

    if (uploadError) {
        throw new Error(`Upload mislukt: ${uploadError.message}`);
    }

    const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(path);

    return data.publicUrl;
}
