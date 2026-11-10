import { useEffect, useMemo, useRef, useState } from "react";
import { drumsData } from "../../Data/drumsData.jsx";
import { resolveImage } from "../../helpers/resolveImage.js";
import "./DrumsPage.css";

/* ==========================================================================
   HELPERS
   ========================================================================== */

const PLATFORM_LABELS = {
    spotify: "Spotify",
    soundcloud: "SoundCloud",
    bandcamp: "Bandcamp",
};

const DEFAULT_PLAYER_HEIGHTS = {
    spotify: 152,
    soundcloud: 166,
    bandcamp: 120,
};

const PLAYER_ALLOW =
    "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";

function pad2(value) {
    return String(value).padStart(2, "0");
}

// Externe links openen in een nieuw tabblad, interne links in hetzelfde.
function linkAttrs(href) {
    return /^https?:\/\//i.test(href || "")
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {};
}

function scrollToId(id) {
    const element = document.getElementById(id);

    if (!element) {
        return;
    }

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    element.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
    });
}

function getYouTubeId(url) {
    try {
        const parsed = new URL(url);

        if (parsed.hostname.includes("youtu.be")) {
            return parsed.pathname.slice(1) || null;
        }

        if (parsed.hostname.includes("youtube.com")) {
            const fromQuery = parsed.searchParams.get("v");

            if (fromQuery) {
                return fromQuery;
            }

            const parts = parsed.pathname.split("/").filter(Boolean);

            if (["embed", "shorts", "live"].includes(parts[0])) {
                return parts[1] || null;
            }
        }
    } catch {
        return null;
    }

    return null;
}

function getVimeoId(url) {
    try {
        const parsed = new URL(url);

        if (parsed.hostname.includes("vimeo.com")) {
            const id = parsed.pathname
                .split("/")
                .filter(Boolean)
                .find((part) => /^\d+$/.test(part));

            return id || null;
        }
    } catch {
        return null;
    }

    return null;
}

function getVideoEmbedUrl(url, autoplay = false) {
    const youTubeId = getYouTubeId(url);

    if (youTubeId) {
        return (
            `https://www.youtube-nocookie.com/embed/${youTubeId}` +
            `?rel=0&modestbranding=1${autoplay ? "&autoplay=1" : ""}`
        );
    }

    const vimeoId = getVimeoId(url);

    if (vimeoId) {
        return `https://player.vimeo.com/video/${vimeoId}`;
    }

    // Andere sites: de url is al een embed-link.
    return url;
}

function getMusicEmbedUrl(track) {
    const { platform, url } = track;

    if (platform === "spotify") {
        if (url.includes("open.spotify.com/embed/")) {
            return url;
        }

        return url
            .replace(/\/intl-[a-z]{2}(-[a-z]+)?\//i, "/")
            .replace("open.spotify.com/", "open.spotify.com/embed/");
    }

    if (platform === "soundcloud") {
        return (
            "https://w.soundcloud.com/player/?url=" +
            encodeURIComponent(url) +
            "&auto_play=false&hide_related=true&show_comments=false" +
            "&show_reposts=false&visual=false"
        );
    }

    // Bandcamp: de embed-src wordt direct gebruikt.
    return url;
}

/* ==========================================================================
   SMALL COMPONENTS
   ========================================================================== */

function SectionHeading({ number, title }) {
    return (
        <div className="drumsSectionHeading">
            <span>{pad2(number)}</span>
            <h2>{title}</h2>
        </div>
    );
}

function Ticker({ items }) {
    if (!items.length) {
        return null;
    }

    const loop = Array.from({ length: 6 }).flatMap(() => items);

    return (
        <div className="drumsTicker" aria-hidden="true">
            <div className="drumsTickerTrack">
                {loop.map((item, index) => (
                    <span key={`${item}-${index}`}>
                        {item}
                        <i>✦</i>
                    </span>
                ))}
            </div>
        </div>
    );
}

/* ---------- Roterende foto's ---------- */

function PhotoCarousel({ photos, interval = 5000 }) {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const touchStartX = useRef(null);
    const count = photos.length;

    // Automatisch roteren. Stopt bij hover/focus en bij "reduce motion".
    useEffect(() => {
        if (count < 2 || paused) {
            return undefined;
        }

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return undefined;
        }

        const timer = window.setInterval(() => {
            setIndex((current) => (current + 1) % count);
        }, interval);

        return () => window.clearInterval(timer);
    }, [count, paused, interval, index]);

    if (count === 0) {
        return (
            <div className="drumsCarouselEmpty">
                <span>Add photos in drumsData.js</span>
            </div>
        );
    }

    const step = (direction) => {
        setIndex((current) => (current + direction + count) % count);
    };

    function handleKeyDown(event) {
        if (event.key === "ArrowRight") step(1);
        if (event.key === "ArrowLeft") step(-1);
    }

    function handleTouchStart(event) {
        touchStartX.current = event.touches[0].clientX;
    }

    function handleTouchEnd(event) {
        if (touchStartX.current === null) {
            return;
        }

        const distance = event.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;

        if (Math.abs(distance) > 50) {
            step(distance < 0 ? 1 : -1);
        }
    }

    return (
        <div
            className="drumsCarousel"
            role="region"
            aria-roledescription="carousel"
            aria-label="Drum photos"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            onKeyDown={handleKeyDown}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className="drumsCarouselViewport">

                {photos.map((photo, photoIndex) => (
                    <figure
                        key={`${photo.src}-${photoIndex}`}
                        className={`drumsSlide ${photoIndex === index ? "active" : ""}`}
                        aria-hidden={photoIndex !== index}
                    >
                        <img
                            src={resolveImage(photo.src)}
                            alt={photo.alt || ""}
                            loading={photoIndex === 0 ? "eager" : "lazy"}
                        />

                        {photo.caption && (
                            <figcaption>{photo.caption}</figcaption>
                        )}
                    </figure>
                ))}

                <span className="drumsCarouselCounter">
                    {pad2(index + 1)} / {pad2(count)}
                </span>

                {count > 1 && (
                    <>
                        <button
                            type="button"
                            className="drumsCarouselButton drumsCarouselPrev"
                            onClick={() => step(-1)}
                            aria-label="Previous photo"
                        >
                            ‹
                        </button>

                        <button
                            type="button"
                            className="drumsCarouselButton drumsCarouselNext"
                            onClick={() => step(1)}
                            aria-label="Next photo"
                        >
                            ›
                        </button>
                    </>
                )}

            </div>

            {count > 1 && (
                <div className="drumsDots">
                    {photos.map((photo, photoIndex) => (
                        <button
                            key={`${photo.src}-dot-${photoIndex}`}
                            type="button"
                            className={`drumsDot ${photoIndex === index ? "active" : ""}`}
                            onClick={() => setIndex(photoIndex)}
                            aria-label={`Show photo ${photoIndex + 1}`}
                            aria-current={photoIndex === index}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

/* ---------- Video's ---------- */

function VideoCard({ video }) {
    const [playing, setPlaying] = useState(false);
    const youTubeId = getYouTubeId(video.url);

    return (
        <article className="drumsVideoCard">

            <div className="drumsVideoFrame">
                {youTubeId && !playing ? (
                    <button
                        type="button"
                        className="drumsVideoThumb"
                        onClick={() => setPlaying(true)}
                        aria-label={`Play ${video.title}`}
                    >
                        <img
                            src={`https://i.ytimg.com/vi/${youTubeId}/hqdefault.jpg`}
                            alt=""
                            loading="lazy"
                        />
                        <span className="drumsPlayIcon" aria-hidden="true">▶</span>
                    </button>
                ) : (
                    <iframe
                        src={getVideoEmbedUrl(video.url, playing)}
                        title={video.title}
                        loading="lazy"
                        allow={PLAYER_ALLOW}
                        allowFullScreen
                    />
                )}
            </div>

            <div className="drumsVideoInfo">
                <h3>{video.title}</h3>
                {video.description && <p>{video.description}</p>}
            </div>

        </article>
    );
}

/* ---------- Muziek ---------- */

function MusicSection({ tracks }) {
    const [filter, setFilter] = useState("all");

    const platforms = useMemo(
        () => [...new Set(tracks.map((track) => track.platform))],
        [tracks]
    );

    const visibleTracks =
        filter === "all"
            ? tracks
            : tracks.filter((track) => track.platform === filter);

    return (
        <>
            {platforms.length > 1 && (
                <div className="drumsFilter" role="group" aria-label="Filter music by platform">
                    <button
                        type="button"
                        className={`drumsFilterButton ${filter === "all" ? "active" : ""}`}
                        onClick={() => setFilter("all")}
                    >
                        All
                    </button>

                    {platforms.map((platform) => (
                        <button
                            key={platform}
                            type="button"
                            className={`drumsFilterButton ${filter === platform ? "active" : ""}`}
                            onClick={() => setFilter(platform)}
                        >
                            {PLATFORM_LABELS[platform] || platform}
                        </button>
                    ))}
                </div>
            )}

            <div className="drumsMusicList">
                {visibleTracks.map((track) => (
                    <article
                        key={`${track.platform}-${track.url}`}
                        className="drumsMusicCard"
                    >
                        <div className="drumsMusicMeta">
                            <span className="drumsPlatformTag">
                                {PLATFORM_LABELS[track.platform] || track.platform}
                            </span>

                            <h3>{track.title}</h3>

                            {track.description && <p>{track.description}</p>}
                        </div>

                        <iframe
                            src={getMusicEmbedUrl(track)}
                            title={track.title}
                            height={track.height || DEFAULT_PLAYER_HEIGHTS[track.platform] || 152}
                            loading="lazy"
                            allow={PLAYER_ALLOW}
                        />
                    </article>
                ))}
            </div>
        </>
    );
}

/* ---------- Endorsements ---------- */

function EndorsementCard({ item }) {
    const mainHref = item.page || item.url;

    const logo = item.logo ? (
        <img src={resolveImage(item.logo)} alt={`${item.name} logo`} loading="lazy" />
    ) : (
        <span className="drumsLogoFallback" aria-hidden="true">
            {item.name.charAt(0)}
        </span>
    );

    return (
        <article className="drumsEndorsementCard">

            {mainHref ? (
                <a
                    className="drumsEndorsementLogo"
                    href={mainHref}
                    aria-label={`${item.name} endorsement`}
                    {...linkAttrs(mainHref)}
                >
                    {logo}
                </a>
            ) : (
                <div className="drumsEndorsementLogo">{logo}</div>
            )}

            <div className="drumsEndorsementBody">

                {item.since && (
                    <span className="drumsEyebrow drumsEyebrowBrand">
                        Endorsed since {item.since}
                    </span>
                )}

                <h3>{item.name}</h3>

                {item.quote && <blockquote>{item.quote}</blockquote>}

                {item.description && <p>{item.description}</p>}

                {item.gear?.length > 0 && (
                    <ul className="drumsTags">
                        {item.gear.map((gear) => (
                            <li key={gear}>{gear}</li>
                        ))}
                    </ul>
                )}

                {(item.page || item.url) && (
                    <div className="drumsEndorsementActions">
                        {item.page && (
                            <a
                                className="drumsButton"
                                href={item.page}
                                {...linkAttrs(item.page)}
                            >
                                <span>Endorsement page</span>
                                <span aria-hidden="true">↗</span>
                            </a>
                        )}

                        {item.url && (
                            <a
                                className="drumsButtonGhost"
                                href={item.url}
                                {...linkAttrs(item.url)}
                            >
                                Website
                            </a>
                        )}
                    </div>
                )}

            </div>

        </article>
    );
}

/* ==========================================================================
   PAGE
   ========================================================================== */

function DrumsPage() {

    const {
        hero,
        stats = [],
        ticker = [],
        photos = [],
        story = [],
        details = [],
        videos = [],
        music = [],
        endorsements = [],
        links = [],
        features = {},
        cta,
    } = drumsData;

    const hasVideos = videos.length > 0;
    const hasMusic = music.length > 0;
    const hasEndorsements = endorsements.length > 0;

    const hasSidebar =
        details.length > 0 || features.tapTempo || links.length > 0;

    // Doorlopende sectienummers, ook als een sectie leeg is en dus verdwijnt.
    const videosNumber = story.length + 1;
    const musicNumber = videosNumber + (hasVideos ? 1 : 0);
    const endorsementsNumber = musicNumber + (hasMusic ? 1 : 0);

    const navItems = [
        hasVideos && { id: "drums-videos", label: "Videos" },
        hasMusic && { id: "drums-music", label: "Music" },
        features.playground && { id: "drums-play", label: "Play" },
        hasEndorsements && { id: "drums-endorsements", label: "Endorsements" },
    ].filter(Boolean);

    return (
        <main className="drumsPage">

            <div className="drumsContainer">

                {/* NAVIGATIE */}

                <nav className="drumsNav">

                    <a className="drumsBackLink" href="/">
                        <span>←</span>
                        <span>Back home</span>
                    </a>

                    {navItems.length > 0 && (
                        <div className="drumsNavLinks">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    className="drumsNavLink"
                                    onClick={() => scrollToId(item.id)}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    )}

                </nav>

                {/* HERO */}

                <header className="drumsHero">

                    <div className="drumsHeroContent">

                        <div className="drumsTitleBlock">
                            <div className="drumsTitleAccent">
                                <span>{hero.label}</span>
                            </div>

                            <div className="drumsTitleMain">
                                <h1>{hero.title}</h1>
                            </div>
                        </div>
                            <h2>Jim "Deaddrums" Horvath</h2>
                        {hero.subtitle && (
                            <p className="drumsSubtitle">{hero.subtitle}</p>
                        )}

                        {hero.badges?.length > 0 && (
                            <div className="drumsBadges">
                                {hero.badges.map((badge) => (
                                    <span key={badge} className="drumsBadge">
                                        {badge}
                                    </span>
                                ))}
                            </div>
                        )}

                        {stats.length > 0 && (
                            <ul className="drumsStats">
                                {stats.map((stat) => (
                                    <li key={stat.label} className="drumsStat">
                                        <span className="drumsStatValue">{stat.value}</span>
                                        <span className="drumsStatLabel">{stat.label}</span>
                                    </li>
                                ))}
                            </ul>
                        )}

                    </div>

                    <div className="drumsHeroVisual">
                        <div className="drumsCymbal" aria-hidden="true" />
                        <PhotoCarousel photos={photos} />
                    </div>

                </header>

                {/* LOPENDE TEKSTBAND */}

                <Ticker items={ticker} />

                {/* INHOUD + ZIJBALK */}

                <div className={`drumsContentGrid ${hasSidebar ? "" : "noSidebar"}`}>

                    <div className="drumsMainContent">

                        {story.map((block, blockIndex) => (
                            <section key={block.title} className="drumsSection">

                                <SectionHeading
                                    number={blockIndex + 1}
                                    title={block.title}
                                />

                                {block.paragraphs.map((paragraph, paragraphIndex) => (
                                    <p
                                        key={paragraphIndex}
                                        className={paragraphIndex === 0 ? "drumsLeadText" : undefined}
                                    >
                                        {paragraph}
                                    </p>
                                ))}

                            </section>
                        ))}

                        {hasVideos && (
                            <section id="drums-videos" className="drumsSection">

                                <SectionHeading number={videosNumber} title="Videos" />

                                <div className="drumsVideoGrid">
                                    {videos.map((video) => (
                                        <VideoCard key={video.url} video={video} />
                                    ))}
                                </div>

                            </section>
                        )}

                        {hasMusic && (
                            <section id="drums-music" className="drumsSection">

                                <SectionHeading number={musicNumber} title="Music" />

                                <MusicSection tracks={music} />

                            </section>
                        )}

                    </div>

                    {hasSidebar && (
                        <aside className="drumsSidebar">

                            {details.length > 0 && (
                                <div className="drumsPanel">

                                    <div className="drumsPanelHeader">
                                        <span>Details</span>
                                    </div>

                                    <dl className="drumsDetailsList">
                                        {details.map((detail) => (
                                            <div key={detail.label} className="drumsDetailRow">
                                                <dt>{detail.label}</dt>
                                                <dd>{detail.value}</dd>
                                            </div>
                                        ))}
                                    </dl>

                                </div>
                            )}

                            {links.length > 0 && (
                                <div className="drumsPanel">

                                    <div className="drumsPanelHeader">
                                        <span>Find me</span>
                                    </div>

                                    <div className="drumsExternalLinks">
                                        {links.map((link) => (
                                            <a
                                                key={link.url}
                                                className="drumsExternalLink"
                                                href={link.url}
                                                {...linkAttrs(link.url)}
                                            >
                                                <span>{link.label}</span>
                                                <span aria-hidden="true">↗</span>
                                            </a>
                                        ))}
                                    </div>

                                </div>
                            )}

                        </aside>
                    )}

                </div>


                {/* ENDORSEMENTS */}

                {hasEndorsements && (
                    <section id="drums-endorsements" className="drumsEndorsements">

                        <SectionHeading
                            number={endorsementsNumber}
                            title="Endorsements"
                        />

                        <div className="drumsEndorsementGrid">
                            {endorsements.map((item) => (
                                <EndorsementCard key={item.name} item={item} />
                            ))}
                        </div>

                    </section>
                )}

                {/* AFSLUITBLOK */}

                {cta && (
                    <footer className="drumsFooter">

                        <div>
                            <span className="drumsEyebrow drumsEyebrowBrand">
                                {cta.eyebrow}
                            </span>
                            <h2>{cta.title}</h2>
                        </div>

                        <a
                            className="drumsButton"
                            href={cta.href}
                            {...linkAttrs(cta.href)}
                        >
                            <span>{cta.buttonLabel}</span>
                            <span aria-hidden="true">→</span>
                        </a>

                    </footer>
                )}

            </div>

        </main>
    );
}

export default DrumsPage;
