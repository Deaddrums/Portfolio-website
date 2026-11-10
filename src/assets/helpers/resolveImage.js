// Zoekt een afbeelding op bestandsnaam in src/assets/images en geeft de echte
// (gebundelde) URL terug. Zo werken afbeeldingen ook op Netlify, ook als in je
// data nog "src/assets/images/Drums/foto.jpg.webp" of alleen "foto.jpg.webp" staat.
//
// Vite zoekt tijdens de build alle afbeeldingen onder src/assets/images en
// neemt ze op in dist/.
const imageModules = import.meta.glob(
    '/src/assets/images/**/*.{png,jpg,jpeg,svg,webp,gif,avif}',
    { eager: true, import: 'default' }
)

// Zoektabel op bestandsnaam, zonder hoofdlettergevoeligheid.
const imagesByFileName = Object.fromEntries(
    Object.entries(imageModules).map(([path, url]) => [
        path.split('/').pop().toLowerCase(),
        url,
    ])
)

export function resolveImage(storedPath) {
    if (!storedPath) {
        return null
    }

    // Volledige URL's, data-URL's en paden uit public/ (/drums/foto.jpg)
    // blijven ongemoeid.
    if (
        /^(https?:)?\/\//.test(storedPath) ||
        storedPath.startsWith('data:') ||
        storedPath.startsWith('/') && !storedPath.startsWith('/src/')
    ) {
        return storedPath
    }

    let fileName = storedPath.split(/[\\/]/).pop()

    try {
        fileName = decodeURIComponent(fileName)
    } catch {
        // geen geldige URL-codering, dan gebruiken we de naam zoals hij is
    }

    const url = imagesByFileName[fileName.toLowerCase()]

    if (!url && import.meta.env?.DEV) {
        console.warn(
            `resolveImage: "${fileName}" niet gevonden in src/assets/images. ` +
            `Controleer de bestandsnaam.`
        )
    }

    return url ?? storedPath
}
