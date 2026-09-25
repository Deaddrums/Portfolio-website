import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePortfolioItems } from "../../hooks/useSupabaseData.js";
import "./WorkHighlights.css";

function WorkHighlights() {
    const navigate = useNavigate();

    const { items, loading } = usePortfolioItems({ onlyPublished: true });

    const projects = useMemo(() => {
        return [...items]
            .filter((item) => item.type === "project" && item.media?.heroImage)
            .sort((a, b) => {
                return new Date(b.updatedAt) - new Date(a.updatedAt);
            });
    }, [items]);

    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [resumeAutoRotation, setResumeAutoRotation] = useState(null);

    const isAutoMode = selectedProjectId === null;

    const activeProject = useMemo(() => {
        if (projects.length === 0) {
            return null;
        }

        if (selectedProjectId) {
            return (
                projects.find((project) => project.id === selectedProjectId) ||
                projects[activeIndex]
            );
        }

        return projects[activeIndex];
    }, [projects, selectedProjectId, activeIndex]);

    const latestProject = projects[0];

    useEffect(() => {
        if (!isAutoMode || projects.length <= 1) {
            return;
        }

        const rotation = setInterval(() => {
            setActiveIndex((currentIndex) => {
                return (currentIndex + 1) % projects.length;
            });
        }, 4500);

        return () => {
            clearInterval(rotation);
        };
    }, [isAutoMode, projects.length]);

    function handleProjectClick(project, index) {
        setSelectedProjectId(project.id);
        setActiveIndex(index);

        if (resumeAutoRotation) {
            clearTimeout(resumeAutoRotation);
        }

        const timeout = setTimeout(() => {
            setSelectedProjectId(null);
        }, 45000);

        setResumeAutoRotation(timeout);
    }

    useEffect(() => {
        return () => {
            if (resumeAutoRotation) {
                clearTimeout(resumeAutoRotation);
            }
        };
    }, [resumeAutoRotation]);

    function handleViewProjectDetails() {
        if (!activeProject?.slug) {
            return;
        }

        navigate(`/portfolio/${activeProject.slug}`);
    }

    function formatClientName(clientId) {
        if (!clientId) {
            return "Independent / Personal Project";
        }

        return clientId
            .split("-")
            .map((word) => {
                return word.charAt(0).toUpperCase() + word.slice(1);
            })
            .join(" ");
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

    if (loading) {
        return null;
    }

    if (!activeProject || !latestProject) {
        return null;
    }

    return (
        <section className="workHighlightsSection" id="work-highlights">

            <article className="activeProjectPanel">


                <div className="activeProjectVisual">
                    <div className="workHighlightsHeader">
                        <h2 className="workHighlightsTitle">
                            <span className="workHighlightsTitleAccent">Work</span>
                            <span className="workHighlightsTitleMain">highlights</span>
                        </h2>
                    </div>

                    <img
                        src={activeProject.media.heroImage}
                        alt={activeProject.title}
                        className="activeProjectImage"
                    />

                    <div className="projectImageRailWrapper">
                        <div className="projectImageRail">
                            {[...projects, ...projects].map((project, index) => {
                                const isActive = activeProject.id === project.id;

                                return (
                                    <button
                                        type="button"
                                        key={`${project.id}-${index}`}
                                        className={`projectThumbnail ${
                                            isActive ? "active" : ""
                                        }`}
                                        onClick={() => handleProjectClick(project, index % projects.length)}
                                        aria-label={`Show ${project.title}`}
                                    >

                                        <img
                                            src={project.media.heroImage}
                                            alt={project.title}
                                            className="projectThumbnailImage"
                                        />

                                        <div className="projectThumbnailOverlay" />

                                        <span>{project.title}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="activeProjectGradient" />
                </div>

                <div className="activeProjectContent">
                    <h3>{activeProject.title}</h3>

                    <p className="activeProjectSubtitle">
                        {activeProject.subtitle}
                    </p>

                    <p className="activeProjectText">
                        {activeProject.text}
                    </p>

                    {/*<div className="activeProjectInfoBlock">*/}
                    {/*    <h4>Client</h4>*/}
                    {/*    <p>{formatClientName(activeProject.clientId)}</p>*/}
                    {/*</div>*/}

                    <div className="activeProjectInfoGrid">
                        <div className="activeProjectInfoBlock">
                            <h4>My role</h4>
                            <p>{getPrimaryRole(activeProject)}</p>
                        </div>
                    </div>

                    {activeProject.whatIDid?.length > 0 && (
                        <div className="activeProjectListBlock">
                            <h4>Responsibilities</h4>

                            <ul>
                                {activeProject.whatIDid.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/*{activeProject.tags?.length > 0 && (*/}
                    {/*    <div className="activeProjectTags">*/}
                    {/*        {activeProject.tags.map((tag) => (*/}
                    {/*            <span key={tag}>{tag}</span>*/}
                    {/*        ))}*/}
                    {/*    </div>*/}
                    {/*)}*/}

                    <div className="activeProjectActions">
                        {activeProject.links?.url && (
                            <a
                                href={activeProject.links.url}
                                className="projectLink"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Visit project
                            </a>
                        )}

                        <button
                            type="button"
                            className="workHighlightMoveToDetailId"
                            onClick={handleViewProjectDetails}
                            disabled={!activeProject?.slug}
                        >
                            read more about this project
                        </button>
                    </div>
                </div>
            </article>

            <div className="workHighlightsBrowser" />

        </section>
    );
}

export default WorkHighlights;
