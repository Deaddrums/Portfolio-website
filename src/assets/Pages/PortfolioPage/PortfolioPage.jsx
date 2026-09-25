import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { usePortfolioItems } from "../../hooks/useSupabaseData.js";
import "./PortfolioPage.css";

function PortfolioPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [expandedIds, setExpandedIds] = useState(new Set());

    const { items, loading, error } = usePortfolioItems({ onlyPublished: true });

    const publishedProjects = useMemo(() => {
        return items.filter((item) => {
            return item.type === "project";
        });
    }, [items]);

    const categories = useMemo(() => {
        const uniqueCategories = publishedProjects
            .map((project) => project.category)
            .filter(Boolean)
            .map((category) => category.trim());

        return ["All", ...new Set(uniqueCategories)];
    }, [publishedProjects]);

    const filteredProjects = useMemo(() => {
        if (activeCategory === "All") {
            return publishedProjects;
        }

        return publishedProjects.filter((project) => {
            return project.category === activeCategory;
        });
    }, [activeCategory, publishedProjects]);

    const getCategoryCount = (category) => {
        if (category === "All") {
            return publishedProjects.length;
        }

        return publishedProjects.filter((project) => {
            return project.category === category;
        }).length;
    };

    function toggleExpand(projectId) {
        setExpandedIds((previousIds) => {
            const nextIds = new Set(previousIds);

            if (nextIds.has(projectId)) {
                nextIds.delete(projectId);
            } else {
                nextIds.add(projectId);
            }

            return nextIds;
        });
    }

    if (loading) {
        return (
            <main className="portfolioPage">
                <p className="portfolioPageLoadingState">
                    Loading portfolio...
                </p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="portfolioPage">
                <p className="portfolioPageErrorState">
                    Something went wrong while loading the portfolio.
                </p>
            </main>
        );
    }

    return (
        <main className="portfolioPage">
            <section className="portfolioElement">

                <header className="portfolioHeader">
                    <div className="portfolioTitleContainer">
                        <div className="portfolioTitleAccent">
                            <h1>Work</h1>
                        </div>

                        <div className="portfolioTitleSecondary">
                            <h1>Portfolio</h1>
                        </div>
                    </div>

                    <div className="portfolioHeaderInfo">
                        <span className="portfolioEyebrow">
                            Selected productions
                        </span>

                        <p>
                            A selection of localization, game, audio, music and
                            broadcast productions.
                        </p>
                    </div>
                </header>

                <div
                    className="portfolioFilters"
                    aria-label="Filter portfolio by category"
                >
                    {categories.map((category) => {
                        const isActive = activeCategory === category;

                        return (
                            <button
                                key={category}
                                type="button"
                                className={`portfolioFilterButton ${
                                    isActive
                                        ? "portfolioFilterButtonActive"
                                        : ""
                                }`}
                                onClick={() => setActiveCategory(category)}
                                aria-pressed={isActive}
                            >
                                <span>{category}</span>

                                <span className="portfolioFilterCount">
                                   <b> {getCategoryCount(category)}</b>
                                </span>
                            </button>
                        );
                    })}
                </div>


                {filteredProjects.length > 0 ? (
                    <div className="portfolioGrid">
                        {filteredProjects.map((project, index) => {
                            const projectUrl = `/portfolio/${project.slug}`;
                            const heroImage = project.media?.heroImage;
                            const projectRoles = project.whatIDid ?? [];
                            const isExpanded = expandedIds.has(project.id);

                            return (
                                <article
                                    key={project.id}
                                    className={`portfolioCard ${
                                        project.featured
                                            ? "portfolioCardFeatured"
                                            : ""
                                    } ${
                                        isExpanded
                                            ? "portfolioCardExpanded"
                                            : ""
                                    }`}
                                >
                                    <Link
                                        to={projectUrl}
                                        className="portfolioImageLink"
                                        aria-label={`View ${project.title}`}
                                    >
                                        <div className="portfolioImageContainer">
                                            {heroImage ? (
                                                <img
                                                    src={heroImage}
                                                    alt={project.title}
                                                    className="portfolioImage"
                                                />
                                            ) : (
                                                <div className="portfolioImageFallback">
                                                    <span>
                                                        {project.title.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                            )}

                                            <div className="portfolioImageOverlay">
                                                <span><b>View project</b></span>

                                                <span
                                                    className="portfolioArrow"
                                                    aria-hidden="true"
                                                >
                                                    ↗
                                                </span>
                                            </div>

                                            <span className="portfolioIndex">
                                                {String(index + 1).padStart(
                                                    2,
                                                    "0"
                                                )}
                                            </span>

                                            {project.featured && (
                                                <span className="portfolioFeaturedLabel">
                                                    Featured
                                                </span>
                                            )}
                                        </div>
                                    </Link>

                                    <div className="portfolioCardHeaderRow">
                                        <Link
                                            to={projectUrl}
                                            className="portfolioCardTitleLink"
                                        >
                                            <h2>{project.title}</h2>
                                        </Link>
                                    </div>

                                    <button
                                        type="button"
                                        className="portfolioCardToggle"
                                        onClick={() => toggleExpand(project.id)}
                                        aria-expanded={isExpanded}
                                    >
                                        <span>
                                            {isExpanded ? "Hide details" : "Show details"}
                                        </span>

                                        <span
                                            className="portfolioCardToggleIcon"
                                            aria-hidden="true"
                                        >
                                            ▾
                                        </span>
                                    </button>

                                    <div className="portfolioCardContent">
                                        <div className="portfolioCardContentInner">
                                            <div className="portfolioCardMeta">
                                                <span>{project.category}</span>

                                                {project.clientId && (
                                                    <span>
                                                        {project.clientId}
                                                    </span>
                                                )}
                                            </div>

                                            {project.subtitle && (
                                                <p className="portfolioCardSubtitle">
                                                    {project.subtitle}
                                                </p>
                                            )}

                                            {projectRoles.length > 0 && (
                                                <div className="portfolioCardRoles">
                                                    {projectRoles
                                                        .slice(0, 3)
                                                        .map((role, roleIndex) => (
                                                            <span
                                                                key={`${project.id}-${role}-${roleIndex}`}
                                                            >
                                                                {role}
                                                            </span>
                                                        ))}

                                                    {projectRoles.length > 3 && (
                                                        <span>
                                                            +
                                                            {projectRoles.length - 3}
                                                        </span>
                                                    )}
                                                </div>
                                            )}

                                            <Link
                                                to={projectUrl}
                                                className="portfolioCardLink"
                                            >
                                                <span>Explore project</span>
                                                <span aria-hidden="true">→</span>
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                ) : (
                    <div className="portfolioEmptyState">
                        <span>00</span>

                        <h2>No projects found</h2>

                        <p>
                            There are currently no published projects in this
                            category.
                        </p>

                        <button
                            type="button"
                            onClick={() => setActiveCategory("All")}
                        >
                            Show all projects
                        </button>
                    </div>
                )}
            </section>
        </main>
    );
}

export default PortfolioPage;
