import jim from './../../images/Jim/Jim in flowers.png';
import studio1 from './../../images/Jim/studio.png';
import studio2 from './../../images/Jim/studiopic (3).jpg';
import studio3 from './../../images/Jim/studiopic (4).jpg';
import studio4 from './../../images/Jim/studiopic (5).jpg';
import studio5 from './../../images/Jim/studiopic (6).jpg';
import { useEffect, useMemo, useRef, useState } from "react";
import { useCvData, usePortfolioItems } from "../../hooks/useSupabaseData.js";
import { generateCvPdf } from "../../helpers/generateCvPdf.js";
import { resolveImage } from "../../helpers/resolveImage.js";
import profileData from "../../Data/AboutFulldata.jsx";
import './AboutPage.css';

const studioImages = [
    studio1,
    studio2,
    studio3,
    studio4,
    studio5
];

const STUDIO_AUTOPLAY_DELAY = 5000;

/* ------------------------------------------------------------------ */
/* SHARED                                                              */
/* ------------------------------------------------------------------ */

function SectionTitle({ accent, title, number }) {
    return (
        <div className="aboutSectionHeading">
            {number && (
                <span className="aboutSectionNumber">
                    {number}
                </span>
            )}

            <div className="aboutSectionTitle">
                <div className="aboutSectionAccent">
                    <h2>{accent}</h2>
                </div>

                <div className="aboutSectionSecondary">
                    <h2>{title}</h2>
                </div>
            </div>
        </div>
    );
}

function SkillGroup({ title, skills }) {
    if (!skills?.length) {
        return null;
    }

    return (
        <section className="skillGroup">
            <div className="skillGroupHeader">
                <h3>{title}</h3>
            </div>

            <ul className="skillList">
                {skills.map((skill) => (
                    <li key={skill} className="skillTag">
                        {skill}
                    </li>
                ))}
            </ul>
        </section>
    );
}

/* Gebruikt de dataset uit Supabase en valt terug op profileData. */
function pickList(primary, fallback) {
    if (Array.isArray(primary) && primary.length > 0) {
        return primary;
    }

    return Array.isArray(fallback) ? fallback : [];
}

/* ------------------------------------------------------------------ */
/* LEARN & BUILD HELPERS                                               */
/* ------------------------------------------------------------------ */

/* Wordt true zodra het element in beeld komt (één keer). */
function useInView(threshold = 0.15) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const element = ref.current;

        if (!element || inView) {
            return undefined;
        }

        if (!("IntersectionObserver" in window)) {
            setInView(true);
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [inView, threshold]);

    return [ref, inView];
}

function isOngoing(period) {
    const text = String(period || "").toLowerCase();

    return text.includes("progress") || text.includes("present");
}

/* Header in dezelfde stijl voor A, B en C */
function GrowthBlockHeader({title, extra }) {
    return (
        <header className="growthPanelHeader">

            <h3>{title}</h3>
            {extra}

        </header>
    );
}

/* ------------------------------------------------------------------ */
/* LEARN & BUILD SECTION                                               */
/* Eén container: links A (Education), rechts B (Certifications) en    */
/* C (Development) onder elkaar.                                       */
/* ------------------------------------------------------------------ */

function GrowthSection({ education, development, certifications }) {
    const [sectionRef, inView] = useInView(0.12);

    const sortedDevelopment = useMemo(() => {
        return [...development].sort(
            (a, b) => Number(b.year) - Number(a.year)
        );
    }, [development]);

    const hasLeft = education.length > 0;
    const hasRight = certifications.length > 0 || sortedDevelopment.length > 0;

    if (!hasLeft && !hasRight) {
        return null;
    }

    return (
        <section
            ref={sectionRef}
            className={`aboutGrowthSection ${inView ? "isVisible" : ""}`}
        >
            <div className="aboutGrowthWrapper">
                <div className="growthIntroLayout">
                    <SectionTitle
                        accent="Learn"
                        title="& Build"
                        number="02"
                    />

                    <p>
                        Classrooms, control rooms and side quests. The schooling,
                        trainings and certificates that keep the toolkit sharp.
                    </p>
                </div>

                <div
                    className={`growthBoard growthReveal ${
                        hasLeft && hasRight ? "" : "growthBoardSingle"
                    }`}
                >

                    {/* ---------- A - EDUCATION ---------- */}

                    {hasLeft && (
                        <div className="growthBoardColumn growthBoardLeft">
                            <GrowthBlockHeader
                                title="Education"
                                count={education.length}
                            />

                            <div className="growthPanelBody">
                                <ol className="growthTimeline">
                                    {education.map((item, index) => {
                                        const live = isOngoing(item.period);

                                        return (
                                            <li
                                                key={`${item.school}-${item.field}`}
                                                className={`growthTimelineItem growthReveal ${
                                                    live ? "isLive" : ""
                                                }`}
                                                style={{ "--i": index + 2 }}
                                            >
                                                <span
                                                    className="growthTimelineMarker"
                                                    aria-hidden="true"
                                                />

                                                <div className="growthTimelineMeta">
                                                    <span className="growthTimelinePeriod">
                                                        {item.period}
                                                    </span>

                                                    {live && (
                                                        <span className="growthLiveBadge">
                                                            <i aria-hidden="true" />
                                                            Rec
                                                        </span>
                                                    )}
                                                </div>

                                                <h4>{item.field}</h4>

                                                <p className="growthTimelineSchool">
                                                    {item.school}
                                                </p>

                                                {item.degree && (
                                                    <span className="growthDegree">
                                                        {item.degree}
                                                    </span>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ol>
                            </div>
                        </div>
                    )}

                    {/* ---------- B + C ---------- */}

                    {hasRight && (
                        <div className="growthBoardColumn growthBoardRight">

                            {certifications.length > 0 && (
                                <div className="growthSubBlock">
                                    <GrowthBlockHeader
                                        title="Certifications"
                                        count={certifications.length}
                                    />

                                    <div className="growthPanelBody">
                                        <ul className="growthStamps">
                                            {certifications.map((item, index) => (
                                                <li
                                                    key={`${item.title}-${item.issuer}`}
                                                    className="growthStamp"
                                                    style={{
                                                        "--i": index,
                                                        "--tilt": index % 2 === 0 ? "-1.4deg" : "1.2deg"
                                                    }}
                                                >
                                                    <span
                                                        className="growthStampSeal"
                                                        aria-hidden="true"
                                                    >
                                                        ✓
                                                    </span>

                                                    <span className="growthStampYear">
                                                        {item.year}
                                                    </span>

                                                    <h4>{item.title}</h4>

                                                    <p>{item.issuer}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {sortedDevelopment.length > 0 && (
                                <div className="growthSubBlock">
                                    <GrowthBlockHeader
                                        title="Development"
                                        count={sortedDevelopment.length}
                                        extra={
                                            <span className="growthEq" aria-hidden="true">
                                                <i />
                                                <i />
                                                <i />
                                                <i />
                                                <i />
                                            </span>
                                        }
                                    />

                                    <div className="growthPanelBody">
                                        <ol className="growthTracklist">
                                            {sortedDevelopment.map((item, index) => (
                                                <li
                                                    key={`${item.title}-${item.issuer}`}
                                                    className="growthTrack growthReveal"
                                                    style={{ "--i": index + 3 }}
                                                >
                                                    <span
                                                        className="growthTrackMarker"
                                                        aria-hidden="true"
                                                    />

                                                    <div className="growthTrackInfo">
                                                        <strong>{item.title}</strong>
                                                        <span>{item.issuer}</span>
                                                    </div>

                                                    <span className="growthTrackYear">
                                                        {item.year}
                                                    </span>
                                                </li>
                                            ))}
                                        </ol>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* PAGE                                                                */
/* ------------------------------------------------------------------ */

function AboutPage() {
    const { data, loading, error } = useCvData();
    const {
        items: portfolioItems,
        loading: portfolioLoading
    } = usePortfolioItems({
        onlyPublished: true
    });

    const [showAll, setShowAll] = useState(false);
    const [isGeneratingCv, setIsGeneratingCv] = useState(false);
    const [cvToast, setCvToast] = useState(null);
    const [activeStudioImage, setActiveStudioImage] = useState(0);
    const [isStudioCarouselPaused, setIsStudioCarouselPaused] = useState(false);

    useEffect(() => {
        if (!cvToast) {
            return undefined;
        }

        const timeout = window.setTimeout(() => {
            setCvToast(null);
        }, 4000);

        return () => window.clearTimeout(timeout);
    }, [cvToast]);

    useEffect(() => {
        if (studioImages.length <= 1 || isStudioCarouselPaused) {
            return undefined;
        }

        const interval = window.setInterval(() => {
            setActiveStudioImage((current) =>
                (current + 1) % studioImages.length
            );
        }, STUDIO_AUTOPLAY_DELAY);

        return () => window.clearInterval(interval);
    }, [isStudioCarouselPaused]);

    const liveHeroStats = useMemo(() => {
        if (!data?.hero?.stats) {
            return [];
        }

        if (portfolioLoading) {
            return data.hero.stats;
        }

        const projectCount = portfolioItems.length;

        return data.hero.stats.map((stat) => {
            const isProjectsStat = stat.label
                ?.toLowerCase()
                .includes("projects");

            if (!isProjectsStat) {
                return stat;
            }

            return {
                ...stat,
                value: `${projectCount}+`
            };
        });
    }, [data, portfolioItems, portfolioLoading]);

    async function handleResumeDownload() {
        if (isGeneratingCv || !data) {
            return;
        }

        setIsGeneratingCv(true);
        setCvToast(null);

        try {
            await generateCvPdf(data, portfolioItems);

            setCvToast({
                type: "success",
                message: "Your CV was downloaded successfully."
            });
        } catch (pdfError) {
            console.error("CV-PDF kon niet gegenereerd worden:", pdfError);

            setCvToast({
                type: "error",
                message: "Something went wrong while generating your CV. Please try again."
            });
        } finally {
            setIsGeneratingCv(false);
        }
    }

    function showPreviousStudioImage() {
        setActiveStudioImage((current) =>
            current === 0
                ? studioImages.length - 1
                : current - 1
        );
    }

    function showNextStudioImage() {
        setActiveStudioImage((current) =>
            (current + 1) % studioImages.length
        );
    }

    function handleStudioKeyDown(event) {
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            showPreviousStudioImage();
        }

        if (event.key === "ArrowRight") {
            event.preventDefault();
            showNextStudioImage();
        }
    }

    if (loading) {
        return (
            <p className="aboutPageLoadingState">
                Loading...
            </p>
        );
    }

    if (error || !data) {
        return (
            <p className="aboutPageLoadingState">
                Something went wrong while loading this page.
            </p>
        );
    }

    const visibleExperiences = showAll
        ? data.experience
        : data.experience.slice(0, 6);

    const growthData = {
        education: pickList(data.education, profileData?.education),
        development: pickList(data.development, profileData?.development),
        certifications: pickList(data.certifications, profileData?.certifications)
    };

    return (
        <main className="aboutPage">
            {cvToast && (
                <div
                    className={`cvToast ${
                        cvToast.type === "success"
                            ? "cvToastSuccess"
                            : "cvToastError"
                    }`}
                    role="status"
                    aria-live="polite"
                >
                    <span className="cvToastIcon" aria-hidden="true">
                        {cvToast.type === "success" ? "✓" : "!"}
                    </span>

                    <span className="cvToastMessage">
                        {cvToast.message}
                    </span>

                    <button
                        type="button"
                        className="cvToastClose"
                        onClick={() => setCvToast(null)}
                        aria-label="Dismiss notification"
                    >
                        ×
                    </button>
                </div>
            )}

            {/* ============================================================ */}
            {/* HERO                                                         */}
            {/* ============================================================ */}

            <section className="aboutHeroSection">
                <div className="aboutHeroContent">
                    <div className="aboutHeroLeft">
                        <div className="aboutTitleContainer">
                            <div className="aboutJimContainer">
                                <h1 className="aboutJim">Jim</h1>
                            </div>

                            <div className="aboutHorvathContainer">
                                <h1 className="aboutHorvath">Horvath</h1>
                            </div>
                        </div>

                        <div className="aboutHeroText">
                            <span className="aboutEyebrow">
                                Producer • Audio Engineer • Project Manager
                            </span>

                            <h2>{data.personal.title}</h2>

                            <p className="aboutSummary">
                                {data.description.summary}
                            </p>
                        </div>

                        <div className="aboutContactBlock">
                            <div>
                                <strong>Email</strong>
                                <a href={`mailto:${data.personal.email}`}>
                                    {data.personal.email}
                                </a>
                            </div>

                            <div>
                                <strong>Location</strong>
                                <span>{data.personal.location}</span>
                            </div>

                            <div>
                                <strong>LinkedIn</strong>
                                <a
                                    href={data.personal.linkedin}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    View profile ↗
                                </a>
                            </div>
                        </div>

                        <ul className="heroStats">
                            {liveHeroStats.map((stat, index) => (
                                <li
                                    key={`${stat.label}-${index}`}
                                    className="heroStat"
                                >
                                    <span className="heroStatValue">
                                        {stat.value}
                                    </span>

                                    <span className="heroStatLabel">
                                        {stat.label}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="aboutHeroRight">
                        <div className="aboutImageWrapper">
                            <img
                                src={jim}
                                alt="Portrait of Jim Horvath"
                            />
                        </div>

                        <button
                            type="button"
                            className="resumeButton"
                            onClick={handleResumeDownload}
                            disabled={isGeneratingCv}
                        >
                            <span>
                                {isGeneratingCv
                                    ? "Generating..."
                                    : "Download resume"}
                            </span>

                            <span aria-hidden="true">↓</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* ============================================================ */}
            {/* WORK EXPERIENCE                                              */}
            {/* ============================================================ */}

            <section className="aboutExperienceSection">
                <div className="aboutExperienceWrapper">
                    <div className="aboutSectionHeader">
                        <SectionTitle
                            accent="Work"
                            title="Experience"
                            number="01"
                        />

                        {data.experience.length > 6 && (
                            <button
                                type="button"
                                className="showMoreButton"
                                onClick={() => setShowAll((current) => !current)}
                                aria-expanded={showAll}
                            >
                                {showAll
                                    ? "Show less"
                                    : "Show all experience"}
                            </button>
                        )}
                    </div>

                    <div className="experienceGrid">
                        {visibleExperiences.map((job, index) => (
                            <article
                                key={job.id}
                                className="experienceCard"
                            >
                                <div
                                    className="experienceIndex"
                                    aria-hidden="true"
                                >
                                    {String(index + 1).padStart(2, "0")}
                                </div>

                                <div className="experienceCardTop">
                                    <span className="experienceCompany">
                                        {job.company}
                                    </span>

                                    <span className="experiencePeriod">
                                        {job.period}
                                    </span>
                                </div>

                                <h3>{job.role}</h3>

                                <p className="experienceLocation">
                                    {job.location}
                                </p>

                                <ul className="experienceHighlights">
                                    {job.highlights.map((highlight, highlightIndex) => (
                                        <li key={highlightIndex}>
                                            {highlight}
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================================ */}
            {/* LEARN & BUILD (NIEUW)                                        */}
            {/* ============================================================ */}

            <GrowthSection
                education={growthData.education}
                development={growthData.development}
                certifications={growthData.certifications}
            />

            {/* ============================================================ */}
            {/* CORE VALUES                                                  */}
            {/* ============================================================ */}

            <section className="aboutValuesSection">
                <div className="aboutValuesWrapper">
                    <div className="valuesIntroLayout">
                        <SectionTitle
                            accent="Core"
                            title="Values"
                            number="03"
                        />

                        <p>
                            The foundations that shape every production,
                            every team and every decision.
                        </p>
                    </div>

                    <div className="valuesList">
                        {data.description.values.map((value, index) => (
                            <article
                                key={value.core}
                                className="valueRow"
                            >
                                <span className="valueNumber">
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                <div className="valueIconContainer">
                                    <img
                                        src={resolveImage(value.icon)}
                                        alt=""
                                        aria-hidden="true"
                                    />
                                </div>

                                <h3>{value.core}</h3>
                                <p>{value.philosophy}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================================ */}
            {/* STUDIO                                                       */}
            {/* ============================================================ */}

            <section className="studioSection">
                <div className="studioWrapper">
                    <div
                        className="studioVisualColumn"
                        onMouseEnter={() => setIsStudioCarouselPaused(true)}
                        onMouseLeave={() => setIsStudioCarouselPaused(false)}
                        onFocusCapture={() => setIsStudioCarouselPaused(true)}
                        onBlurCapture={() => setIsStudioCarouselPaused(false)}
                    >
                        <div
                            className="studioCarousel"
                            role="region"
                            aria-roledescription="carousel"
                            aria-label="Studio images"
                            tabIndex="0"
                            onKeyDown={handleStudioKeyDown}
                        >
                            <div className="studioImageContainer">
                                {studioImages.map((image, index) => (
                                    <img
                                        key={image}
                                        src={image}
                                        alt={`Studio view ${index + 1}`}
                                        className={`studioSlide ${
                                            index === activeStudioImage
                                                ? "active"
                                                : ""
                                        }`}
                                        aria-hidden={index !== activeStudioImage}
                                    />
                                ))}

                                <div
                                    className="studioCarouselCounter"
                                    aria-live="polite"
                                >
                                    {String(activeStudioImage + 1).padStart(2, "0")}
                                    <span>/</span>
                                    {String(studioImages.length).padStart(2, "0")}
                                </div>

                                <button
                                    type="button"
                                    className="studioCarouselButton studioCarouselPrev"
                                    onClick={showPreviousStudioImage}
                                    aria-label="Show previous studio image"
                                >
                                    ‹
                                </button>

                                <button
                                    type="button"
                                    className="studioCarouselButton studioCarouselNext"
                                    onClick={showNextStudioImage}
                                    aria-label="Show next studio image"
                                >
                                    ›
                                </button>

                                <span className="studioImageLabel">
                                    Eindhoven • NL
                                </span>
                            </div>
                        </div>

                        <a
                            href="https://nkd-studio.web.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="studioWebsiteButton"
                        >
                            <span>Visit studio website</span>
                            <span aria-hidden="true">↗</span>
                        </a>
                    </div>

                    <div className="studioContent">
                        <span className="studioEyebrow">
                            My studio
                        </span>

                        <h2>Horvath Audio Engineering</h2>

                        <p>
                            Built from a lifelong obsession with great sound,
                            Horvath Audio Engineering is where technical accuracy
                            meets creativity.
                        </p>

                        <p>
                            The studio focuses on recording, editing, audio restoration,
                            mixing and mastering for games, broadcast, podcasts,
                            commercial productions and independent artists.
                        </p>

                        <p>
                            Every workflow, piece of equipment and acoustic treatment
                            has been carefully selected to create an environment that
                            delivers consistent results while staying flexible enough
                            for unique productions.
                        </p>

                        <div className="studioStats">
                            <div className="studioStat">
                                <span>10+</span>
                                <small>Years operating</small>
                            </div>

                            <div className="studioStat">
                                <span>1000+</span>
                                <small>Hours recorded</small>
                            </div>

                            <div className="studioStat">
                                <span>∞</span>
                                <small>Coffees consumed</small>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================ */}
            {/* CORE SKILLS                                                  */}
            {/* ============================================================ */}

            <section className="skillsSection">
                <div className="skillsWrapper">
                    <div className="skillsIntroLayout">
                        <SectionTitle
                            accent="Core"
                            title="Skills"
                            number="04"
                        />

                        <p>
                            Over two decades of production, technical and leadership
                            experience distilled into a practical toolkit for solving
                            problems, guiding teams and delivering results.
                        </p>
                    </div>

                    <div className="skillsGroups">
                        <SkillGroup
                            title="Soft skills"
                            skills={data.softSkills}
                        />

                        <SkillGroup
                            title="Production & technical skills"
                            skills={data.hardSkills}
                        />

                        <SkillGroup
                            title="Audio skills"
                            skills={data.audioSkills}
                        />

                        <SkillGroup
                            title="Programming languages"
                            skills={data.programmingLanguages}
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}

export default AboutPage;
