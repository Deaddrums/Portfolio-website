import { Link } from "react-router-dom";
import { usePortfolioItems } from "../../hooks/useSupabaseData.js";
import "./PortfolioOverviewPage.css";

function formatClientName(clientId) {
    if (!clientId) {
        return "Independent / Personal Project";
    }

    return clientId
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

function formatDate(dateString) {
    if (!dateString) {
        return null;
    }

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
        return null;
    }

    return new Intl.DateTimeFormat("en-GB", {
        month: "short",
        year: "numeric"
    }).format(date);
}

function getPrimaryRole(project) {
    if (project.role) {
        return project.role;
    }

    if (project.whatIDid?.length > 0) {
        return project.whatIDid[0];
    }

    return "Production Support";
}

function PortfolioOverviewPage() {
    const { items, loading, error } = usePortfolioItems({ onlyPublished: true });

    if (loading) {
        return (
            <main className="portfolioOverviewPage">
                <p className="portfolioOverviewLoadingState">
                    Loading projects...
                </p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="portfolioOverviewPage">
                <p className="portfolioOverviewErrorState">
                    Something went wrong while loading the projects.
                </p>
            </main>
        );
    }

    const projects = [...items].sort((a, b) => {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

    return (
        <main className="portfolioOverviewPage">
            <section className="portfolioOverviewContainer">

                <header className="portfolioOverviewHeader">
                    <div className="portfolioOverviewTitleRow">
                        <span className="portfolioOverviewIndexLabel">
                            Overview
                        </span>

                        <h1>
                            <span className="portfolioOverviewTitleAccent">
                                Project
                            </span>
                            <span className="portfolioOverviewTitleMain">
                                Experience
                            </span>
                        </h1>
                    </div>

                    <p className="portfolioOverviewIntro">
                        A structured overview of the projects I've worked on,
                        the role I played in each, and the key details behind
                        them.
                    </p>
                </header>

                {projects.length === 0 && (
                    <p className="portfolioOverviewEmptyState">
                        No published projects found yet.
                    </p>
                )}

                <div className="portfolioOverviewGrid">
                    {projects.map((project, index) => {
                        const period = formatDate(project.updatedAt);
                        const responsibilities = project.whatIDid ?? [];
                        const tags = project.tags ?? [];

                        return (
                            <article
                                className="portfolioOverviewCard"
                                key={project.id}
                            >
                                <div className="portfolioOverviewCardHeader">
                                    <span className="portfolioOverviewCardNumber">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <div className="portfolioOverviewCardMeta">
                                        <span className="portfolioOverviewCardCategory">
                                            {project.category || "General"}
                                        </span>

                                        {project.featured && (
                                            <span className="portfolioOverviewFeaturedBadge">
                                                Featured
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <h2 className="portfolioOverviewCardTitle">
                                    {project.title}
                                </h2>

                                {project.subtitle && (
                                    <p className="portfolioOverviewCardSubtitle">
                                        {project.subtitle}
                                    </p>
                                )}

                                <div className="portfolioOverviewCardRoleBlock">
                                    <span className="portfolioOverviewCardRoleLabel">
                                        My role
                                    </span>

                                    <span className="portfolioOverviewCardRoleValue">
                                        {getPrimaryRole(project)}
                                    </span>
                                </div>

                                <dl className="portfolioOverviewCardDetails">
                                    <div>
                                        <dt>Client</dt>
                                        <dd>
                                            {formatClientName(project.clientId)}
                                        </dd>
                                    </div>

                                    {period && (
                                        <div>
                                            <dt>Updated</dt>
                                            <dd>{period}</dd>
                                        </div>
                                    )}
                                </dl>

                                {responsibilities.length > 0 && (
                                    <ul className="portfolioOverviewCardResponsibilities">
                                        {responsibilities
                                            .slice(0, 4)
                                            .map((responsibility, respIndex) => (
                                                <li
                                                    key={`${project.id}-resp-${respIndex}`}
                                                >
                                                    <span aria-hidden="true">
                                                        ↗
                                                    </span>
                                                    {responsibility}
                                                </li>
                                            ))}
                                    </ul>
                                )}

                                {tags.length > 0 && (
                                    <div className="portfolioOverviewCardTags">
                                        {tags.slice(0, 5).map((tag) => (
                                            <span key={tag}>{tag}</span>
                                        ))}
                                    </div>
                                )}

                                {project.slug && (
                                    <Link
                                        to={`/portfolio/${project.slug}`}
                                        className="portfolioOverviewCardLink"
                                    >
                                        <span>View full details</span>
                                        <span aria-hidden="true">→</span>
                                    </Link>
                                )}
                            </article>
                        );
                    })}
                </div>

            </section>
        </main>
    );
}

export default PortfolioOverviewPage;
