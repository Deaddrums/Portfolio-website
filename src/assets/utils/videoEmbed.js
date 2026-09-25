export function getEmbeddableVideoUrl(rawUrl) {
    if (!rawUrl || typeof rawUrl !== "string") {
        return null;
    }

    const trimmedUrl = rawUrl.trim();

    const youtubeIdMatch = trimmedUrl.match(
        /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );

    if (youtubeIdMatch) {
        return `https://www.youtube.com/embed/${youtubeIdMatch[1]}`;
    }

    return trimmedUrl;
}
