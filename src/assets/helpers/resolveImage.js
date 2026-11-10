// Vite zoekt tijdens de build alle afbeeldingen onder src/assets/images
// en neemt ze op in dist/, zodat ze ook live beschikbaar zijn.
const imageModules = import.meta.glob(
    '/src/assets/images/**/*.{png,jpg,jpeg,svg,webp,gif}',
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

    // Volledige URL's (bijvoorbeeld Supabase Storage) ongemoeid laten.
    if (/^(https?:)?\/\//.test(storedPath) || storedPath.startsWith('data:')) {
        return storedPath
    }

    const fileName = decodeURIComponent(
        storedPath.split(/[\\/]/).pop()
    ).toLowerCase()

    return imagesByFileName[fileName] ?? storedPath
}
