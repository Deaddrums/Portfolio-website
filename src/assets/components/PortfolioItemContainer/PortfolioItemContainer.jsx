import { Link, useParams } from "react-router-dom";
import { usePortfolioItems } from "../../hooks/useSupabaseData.js";
import { getEmbeddableVideoUrl } from "../../utils/videoEmbed.js";
import "./PortfolioItemContainer.css";

function PortfolioItemContainer() {
    const { slug } = useParams();
    const { items, loading, error } = usePortfolioItems({ onlyPublished: true });

    if (loading) {
        return (
            <main className="portfolioItemPage">
                <p className="portfolioItemLoadingState">Loading project...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="portfolioItemPage">
                <p className="portfolioItemErrorState">
                    Something went wrong while loading this project.
                </p>
            </main>
        );
    }

    const item = items.find((contentItem) => contentItem.slug === slug);

    if (!item) {
        return (
            <main className="portfolioItemPage">
                <section className="portfolioItemNotFound">
                    <span className="portfolioItemNotFoundNumber">404</span>

                    <h1>Portfolio item not found</h1>

                    <p>
                        This project does not exist or is currently unavailable.
                    </p>

                    <Link
                        to="/portfolio"
                        className="portfolioItemPrimaryButton"
                    >
                        Back to portfolio
                    </Link>
                </section>
            </main>
        );
    }

    const heroImage = item.media?.heroImage;
    const gallery = item.media?.gallery ?? [];
    const videoUrls = item.media?.videoUrls ?? [];
    const roles = item.whatIDid ?? [];
    const results = item.results ?? [];
    const tags = item.tags ?? [];

    const externalLinks = [
        {
            label: "Visit project website",
            url: item.links?.url,
        },
        {
            label: "View GitHub project",
            url: item.links?.github,
        },
        {
            label: "Read case study",
            url: item.links?.caseStudy,
        },
    ].filter((link) => {
        return typeof link.url === "string" && link.url.trim().length > 0;
    });

    const formattedClient = item.clientId
        ? item.clientId
            .split("-")
            .map((word) => {
                return word.charAt(0).toUpperCase() + word.slice(1);
            })
            .join(" ")
        : null;

    const formatDate = (dateString) => {
        if (!dateString) {
            return null;
        }

        const date = new Date(dateString);

        if (Number.isNaN(date.getTime())) {
            return null;
        }

        return new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }).format(date);
    };

    const createdDate = formatDate(item.createdAt);
    const updatedDate = formatDate(item.updatedAt);

    return (
        <main className="portfolioItemPage">
            <article className="portfolioItemContainer">
                <nav
                    className="portfolioItemNavigation"
                    aria-label="Portfolio navigation"
                >
                    <Link
                        to="/portfolioPage"
                        className="portfolioItemBackLink"
                    >
                        <span aria-hidden="true">←</span>
                        <span>Back to portfolio</span>
                    </Link>

                    <span className="portfolioItemNavigationCategory">
                        {item.category}
                    </span>
                </nav>

                <header className="portfolioItemHero">
                    <div className="portfolioItemHeroContent">
                        <div className="portfolioItemTitleBlock">
                            <div className="portfolioItemTitleAccent">
                                <span>{item.category}</span>
                            </div>

                            <div className="portfolioItemTitleMain">
                                <h1>{item.title}</h1>
                            </div>
                        </div>

                        {item.subtitle && (
                            <p className="portfolioItemSubtitle">
                                {item.subtitle}
                            </p>
                        )}

                        <div className="portfolioItemHeroMeta">
                            {item.type && (
                                <span className="portfolioItemMetaBadge">
                                    {item.type}
                                </span>
                            )}

                            {formattedClient && (
                                <span className="portfolioItemMetaBadge">
                                    {formattedClient}
                                </span>
                            )}

                            {item.featured && (
                                <span className="portfolioItemMetaBadge portfolioItemMetaBadgeFeatured">
                                    Featured project
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="portfolioItemIndexLabel">
                        <span>Selected work</span>
                    </div>
                </header>

                <div className="portfolioItemContentGrid">
                    <div className="portfolioItemMainContent">
                        {item.text && (
                            <section className="portfolioItemSection portfolioItemOverviewSection">
                                <div className="portfolioItemSectionHeading">
                                    <span>01</span>
                                    <h2>Project overview</h2>
                                </div>

                                <p className="portfolioItemLeadText">
                                    {item.text}
                                </p>
                            </section>
                        )}

                        {item.challenges && (
                            <section className="portfolioItemSection">
                                <div className="portfolioItemSectionHeading">
                                    <span>02</span>
                                    <h2>The challenge</h2>
                                </div>

                                <p>{item.challenges}</p>
                            </section>
                        )}

                        {roles.length > 0 && (
                            <section className="portfolioItemSection">
                                <div className="portfolioItemSectionHeading">
                                    <span>03</span>
                                    <h2>What I did</h2>
                                </div>

                                <ul className="portfolioItemResponsibilityList">
                                    {item.role && (
                                        <li>
                                            <span
                                                className="portfolioItemListMarker"
                                                aria-hidden="true"
                                            >
                                                ↗
                                            </span>

                                            <span>{item.role}</span>
                                        </li>
                                    )}

                                    {roles.map((role, index) => (
                                        <li key={`${item.id}-role-${index}`}>
                                            <span
                                                className="portfolioItemListMarker"
                                                aria-hidden="true"
                                            >
                                                ↗
                                            </span>

                                            <span>{role}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {item.role && roles.length === 0 && (
                            <section className="portfolioItemSection">
                                <div className="portfolioItemSectionHeading">
                                    <span>03</span>
                                    <h2>My role</h2>
                                </div>

                                <p>{item.role}</p>
                            </section>
                        )}

                        {results.length > 0 && (
                            <section className="portfolioItemSection portfolioItemResultsSection">
                                <div className="portfolioItemSectionHeading">
                                    <span>04</span>
                                    <h2>Results</h2>
                                </div>

                                <ul className="portfolioItemResultsList">
                                    {results.map((result, index) => (
                                        <li key={`${item.id}-result-${index}`}>
                                            <span className="portfolioItemResultNumber">
                                                {String(index + 1).padStart(
                                                    2,
                                                    "0"
                                                )}
                                            </span>

                                            <span>{result}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* =====================================
                            VIDEOS — meerdere externe video's
                            (bv. YouTube), netjes onder elkaar.

                            BELANGRIJK: de kritieke afmetingen staan
                            hier als INLINE styles, zodat de video
                            altijd correct wordt getoond, ongeacht of
                            de externe CSS-klasse
                            (.portfolioItemVideoWrapper) daadwerkelijk
                            is toegevoegd aan PortfolioItemContainer.css.
                        ===================================== */}

                        {videoUrls.length > 0 && (
                            <section className="portfolioItemSection portfolioItemVideosSection">
                                <div className="portfolioItemSectionHeading">
                                    <span>05</span>
                                    <h2>Videos</h2>
                                </div>

                                <div
                                    className="portfolioItemVideoList"
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "28px"
                                    }}
                                >
                                    {videoUrls.map((url, index) => {
                                        const embedUrl =
                                            getEmbeddableVideoUrl(url);

                                        if (!embedUrl) {
                                            return null;
                                        }

                                        return (
                                            <div
                                                className="portfolioItemVideoWrapper"
                                                key={`${item.id}-video-${index}`}
                                                style={{
                                                    position: "relative",
                                                    width: "100%",
                                                    aspectRatio: "16 / 9",
                                                    minHeight: "220px",
                                                    overflow: "hidden",
                                                    border: "2px solid var(--brand-light)",
                                                    boxShadow: "6px 6px var(--border)",
                                                    background: "#000"
                                                }}
                                            >
                                                <iframe
                                                    src={embedUrl}
                                                    title={`${item.title} — video ${index + 1}`}
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    allowFullScreen
                                                    loading="lazy"
                                                    style={{
                                                        position: "absolute",
                                                        inset: 0,
                                                        width: "100%",
                                                        height: "100%",
                                                        border: "none",
                                                        display: "block"
                                                    }}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        )}
                    </div>

                    <aside className="portfolioItemSidebar">

                        <div className="portfolioItemHeroImageContainer">
                            {heroImage ? (
                                <img
                                    src={heroImage}
                                    alt={item.title}
                                    className="portfolioItemHeroImage"
                                />
                            ) : (
                                <div className="portfolioItemImageFallback">
                                <span>
                                    {item.title.charAt(0).toUpperCase()}
                                </span>
                                </div>
                            )}

                            <div className="portfolioItemImageCategory">
                                {item.category}
                            </div>
                        </div>

                        <div className="portfolioItemDetailsPanel">
                            <div className="portfolioItemPanelHeader">
                                <span>Project details</span>
                            </div>

                            <dl className="portfolioItemDetailsList">
                                <div className="portfolioItemDetailRow">
                                    <dt>Category</dt>
                                    <dd>{item.category}</dd>
                                </div>

                                {formattedClient && (
                                    <div className="portfolioItemDetailRow">
                                        <dt>Client</dt>
                                        <dd>{formattedClient}</dd>
                                    </div>
                                )}

                                {item.role && (
                                    <div className="portfolioItemDetailRow">
                                        <dt>Role</dt>
                                        <dd>{item.role}</dd>
                                    </div>
                                )}

                                {createdDate && (
                                    <div className="portfolioItemDetailRow">
                                        <dt>Added</dt>
                                        <dd>{createdDate}</dd>
                                    </div>
                                )}

                                {updatedDate &&
                                    updatedDate !== createdDate && (
                                        <div className="portfolioItemDetailRow">
                                            <dt>Updated</dt>
                                            <dd>{updatedDate}</dd>
                                        </div>
                                    )}
                            </dl>
                        </div>

                        {tags.length > 0 && (
                            <div className="portfolioItemTagsPanel">
                                <div className="portfolioItemPanelHeader">
                                    <span>Tags</span>
                                </div>

                                <ul className="portfolioItemTags">
                                    {tags.map((tag, index) => (
                                        <li key={`${item.id}-tag-${index}`}>
                                            {tag}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {externalLinks.length > 0 && (
                            <div className="portfolioItemLinksPanel">
                                <div className="portfolioItemPanelHeader">
                                    <span>Project links</span>
                                </div>

                                <div className="portfolioItemExternalLinks">
                                    {externalLinks.map((link) => (
                                        <a
                                            key={link.label}
                                            href={link.url}
                                            className="portfolioItemExternalLink"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <span>{link.label}</span>
                                            <span aria-hidden="true">↗</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </aside>
                </div>

                {gallery.length > 0 && (
                    <section className="portfolioItemGallerySection">
                        <div className="portfolioItemSectionHeading">
                            <span>06</span>
                            <h2>Project gallery</h2>
                        </div>

                        <div className="portfolioItemGallery">
                            {gallery.map((image, index) => (
                                <div
                                    className="portfolioItemGalleryImageContainer"
                                    key={`${item.id}-gallery-${index}`}
                                >
                                    <img
                                        src={image}
                                        alt={`${item.title} gallery image ${index + 1}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {(item.media?.video || item.media?.audio) && (
                    <section className="portfolioItemMediaSection">
                        <div className="portfolioItemSectionHeading">
                            <span>07</span>
                            <h2>Project media</h2>
                        </div>

                        <div className="portfolioItemMediaGrid">
                            {item.media.video && (
                                <div className="portfolioItemMediaPanel">
                                    <h3>Video</h3>

                                    <video controls preload="metadata" src={item.media.video}>
                                        Your browser does not support video.
                                    </video>
                                </div>
                            )}

                            {item.media.audio && (
                                <div className="portfolioItemMediaPanel">
                                    <h3>Audio</h3>

                                    <audio controls preload="metadata" src={item.media.audio}>
                                        Your browser does not support audio.
                                    </audio>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {item.seo?.description && (
                    <section className="portfolioItemAdditionalSection">
                        <span className="portfolioItemAdditionalLabel">
                            Additional context
                        </span>

                        <p>{item.seo.description}</p>
                    </section>
                )}

                <footer className="portfolioItemFooter">
                    <div>
                        <span className="portfolioItemFooterEyebrow">
                            More selected work
                        </span>

                        <h2>Explore the complete portfolio.</h2>
                    </div>

                    <Link
                        to="/portfolioPage"
                        className="portfolioItemPrimaryButton"
                    >
                        <span>View all projects</span>
                        <span aria-hidden="true">→</span>
                    </Link>
                </footer>
            </article>
        </main>
    );
}

export default PortfolioItemContainer;
