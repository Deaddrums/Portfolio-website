import { useEffect, useState } from "react";
import "./MovingPortfolio.css";

import { clientData } from "../../Data/clientData.jsx";
import { usePortfolioItems } from "../../hooks/useSupabaseData.js";

function MovingPortfolio() {
    const duplicatedClients = clientData.length
        ? [...clientData, ...clientData]
        : [];

    const { items, loading } = usePortfolioItems({ onlyPublished: true });

    const featuredProjects = items.filter((project) => project.featured);

    const [activeProject, setActiveProject] = useState(0);

    useEffect(() => {
        if (featuredProjects.length <= 1) {
            return undefined;
        }

        const interval = window.setInterval(() => {
            setActiveProject((previousProject) =>
                previousProject === featuredProjects.length - 1
                    ? 0
                    : previousProject + 1
            );
        }, 4000);

        return () => window.clearInterval(interval);
    }, [featuredProjects.length]);

    if (loading) {
        return null;
    }

    const currentProject = featuredProjects[activeProject];

    return (
        <section
            className="movingPortfolioOuterWrapper"
            aria-label="Selected clients and featured work"
        >
            <div className="carouselSection">
                <div className="movingPortfolioSectionHeader">
                    <span className="movingPortfolioSectionNumber">
                        01
                    </span>

                    <p className="portfolioLabel">
                        Trusted By
                    </p>
                </div>

                <div className="carouselContainer">
                    <div className="carouselTrack">
                        {duplicatedClients.map((client, index) => (
                            <a
                                className="clientLogoLink"
                                href={client.website}
                                key={index}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src={client.logo}
                                    alt="Client logo"
                                    className="clientLogo"
                                />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div className="showcaseSection">
                <div className="movingPortfolioSectionHeader">
                    <span className="movingPortfolioSectionNumber">
                        02
                    </span>

                    <p className="portfolioLabel">
                        Worked On
                    </p>
                </div>

                <div className="showcaseDisplay">
                    {currentProject?.media?.heroImage ? (
                        <img
                            key={currentProject.id}
                            src={currentProject.media.heroImage}
                            alt="Showcase project"
                            className="showcaseLogo"
                        />
                    ) : (
                        <div
                            className="showcaseFallback"
                            aria-label="No featured project image available"
                        >
                            <span>
                                {currentProject?.title
                                    ?.charAt(0)
                                    .toUpperCase() ?? "J"}
                            </span>
                        </div>
                    )}

                    {currentProject?.title && (
                        <span className="showcaseProjectTitle">
                            {currentProject.title}
                        </span>
                    )}
                </div>
            </div>
        </section>
    );
}

export default MovingPortfolio;
