// import jim from './../../images/Jim/Jim in flowers.png'
// import studio from './../../images/Jim/studio.png'
// import { useEffect, useMemo, useState } from "react";
// import { useCvData, usePortfolioItems } from "../../hooks/useSupabaseData.js";
// import { generateCvPdf } from "../../helpers/generateCvPdf.js";
// import './AboutPage.css'
// import { resolveImage } from "../../helpers/resolveImage.js";
//
// function AboutPage () {
//
//     const { data, loading, error } = useCvData();
//     const { items: portfolioItems, loading: portfolioLoading } = usePortfolioItems({
//         onlyPublished: true
//     });
//
//     const [showAll, setShowAll] = useState(false);
//     const [isGeneratingCv, setIsGeneratingCv] = useState(false);
//     const [cvToast, setCvToast] = useState(null);
//
//     useEffect(() => {
//         if (!cvToast) {
//             return undefined;
//         }
//
//         const timeout = setTimeout(() => {
//             setCvToast(null);
//         }, 4000);
//
//         return () => clearTimeout(timeout);
//     }, [cvToast]);
//
//     // De hero-stats komen uit de CV-data (statisch), maar de metric
//     // "Projects delivered" moet het daadwerkelijke, live aantal
//     // gepubliceerde portfolio-items uit Supabase tonen. Hier wordt
//     // die ene stat vervangen, de rest blijft ongewijzigd.
//     const liveHeroStats = useMemo(() => {
//         if (!data?.hero?.stats) {
//             return [];
//         }
//
//         if (portfolioLoading) {
//             return data.hero.stats;
//         }
//
//         const projectCount = portfolioItems.length;
//
//         return data.hero.stats.map((stat) => {
//             const isProjectsStat = stat.label
//                 ?.toLowerCase()
//                 .includes("projects");
//
//             if (!isProjectsStat) {
//                 return stat;
//             }
//
//             return {
//                 ...stat,
//                 value: `${projectCount}+`
//             };
//         });
//     }, [data, portfolioItems, portfolioLoading]);
//
//     async function handleResumeDownload() {
//         if (isGeneratingCv || !data) {
//             return;
//         }
//
//         setIsGeneratingCv(true);
//         setCvToast(null);
//
//         try {
//             await generateCvPdf(data, portfolioItems);
//
//             setCvToast({
//                 type: "success",
//                 message: "Your CV was downloaded successfully."
//             });
//         } catch (pdfError) {
//             console.error("CV-PDF kon niet gegenereerd worden:", pdfError);
//
//             setCvToast({
//                 type: "error",
//                 message: "Something went wrong while generating your CV. Please try again."
//             });
//         } finally {
//             setIsGeneratingCv(false);
//         }
//     }
//
//     if (loading) {
//         return <p className="aboutPageLoadingState">Loading...</p>;
//     }
//
//     if (error || !data) {
//         return (
//             <p className="aboutPageLoadingState">
//                 Something went wrong while loading this page.
//             </p>
//         );
//     }
//
//     const visibleExperiences = showAll
//         ? data.experience
//         : data.experience.slice(0, 6);
//
//     return <>
//
//         {cvToast && (
//             <div
//                 className={`cvToast ${
//                     cvToast.type === "success" ? "cvToastSuccess" : "cvToastError"
//                 }`}
//                 role="status"
//             >
//                 <span className="cvToastIcon">
//                     {cvToast.type === "success" ? "✓" : "!"}
//                 </span>
//
//                 <span className="cvToastMessage">
//                     {cvToast.message}
//                 </span>
//
//                 <button
//                     type="button"
//                     className="cvToastClose"
//                     onClick={() => setCvToast(null)}
//                     aria-label="Dismiss notification"
//                 >
//                     ×
//                 </button>
//             </div>
//         )}
//
//         <section className="aboutHeroSection">
//
//             <div className="aboutHeroContent">
//
//                 <div className="aboutHeroLeft">
//
//                     <div className="aboutTitleContainer">
//
//                         <div className="aboutJimContainer">
//                             <h1 className="aboutJim">
//                                 Jim
//                             </h1>
//                         </div>
//
//                         <div className="aboutHorvathContainer">
//                             <h1 className="aboutHorvath">
//                                 Horvath
//                             </h1>
//                         </div>
//
//                     </div>
//
//                     <div className="aboutHeroText">
//
//                 <span className="aboutEyebrow">
//                     Producer • Audio Engineer • Project Manager
//                 </span>
//
//                         <h2>
//                             {data.personal.title}
//                         </h2>
//
//                         <p className="aboutSummary">
//                             {data.description.summary}
//                         </p>
//
//                         <div className="aboutContactBlock">
//
//                             <div>
//                                 <strong>Email</strong>
//                                 <span>{data.personal.email}</span>
//                             </div>
//
//                             <div>
//                                 <strong>Location</strong>
//                                 <span>{data.personal.location}</span>
//                             </div>
//
//                             <div>
//                                 <strong>LinkedIn</strong>
//
//                                 <a
//                                     href={data.personal.linkedin}
//                                     target="_blank"
//                                     rel="noreferrer"
//                                 >
//                                     View Profile
//                                 </a>
//
//                             </div>
//
//                         </div>
//
//                     </div>
//
//                     <ul className="heroStats">
//
//                         {liveHeroStats.map((stat, index) => (
//
//                             <li
//                                 key={index}
//                                 className="heroStat"
//                             >
//
//                         <span className="heroStatValue">
//                             {stat.value}
//                         </span>
//
//                                 <span className="heroStatLabel">
//                             {stat.label}
//                         </span>
//
//                             </li>
//
//                         ))}
//
//                     </ul>
//
//                 </div>
//
//                 <div className="aboutHeroRight">
//
//                     <div className="aboutImageWrapper">
//
//                         <img
//                             src={jim}
//                             alt="foto van jim"
//                         />
//
//                     </div>
//
//                     <button
//                         type="button"
//                         className="resumeButton"
//                         onClick={handleResumeDownload}
//                         disabled={isGeneratingCv}
//                     >
//                         {isGeneratingCv ? "Generating..." : "Download Resume"}
//                     </button>
//
//                 </div>
//
//             </div>
//
//         </section>
//
//         <section className="aboutExperienceSection">
//
//             <div className="aboutExperienceWrapper">
//
//                 <div className="aboutSectionHeader">
//
//                     <div className="aboutSectionTitle">
//
//                         <div className="aboutSectionAccent">
//                             <h2>Work</h2>
//                         </div>
//
//                         <div className="aboutSectionSecondary">
//                             <h2>Experience</h2>
//                         </div>
//
//                     </div>
//
//                     {data.experience.length > 6 && (
//                         <button
//                             className="showMoreButton"
//                             onClick={() => setShowAll(!showAll)}
//                         >
//                             {showAll
//                                 ? "Show less"
//                                 : "Show all experience"}
//                         </button>
//                     )}
//
//                 </div>
//
//                 <div className="experienceGrid">
//
//                     {visibleExperiences.map((job) => (
//
//                         <article
//                             key={job.id}
//                             className="experienceCard"
//                         >
//
//                             <div className="experienceCardTop">
//
//                         <span className="experienceCompany">
//                             {job.company}
//                         </span>
//
//                                 <span className="experiencePeriod">
//                             {job.period}
//                         </span>
//
//                             </div>
//
//                             <h3>
//                                 {job.role}
//                             </h3>
//
//                             <p className="experienceLocation">
//                                 {job.location}
//                             </p>
//
//                             <ul className="experienceHighlights">
//
//                                 {job.highlights.map((highlight, index) => (
//
//                                     <li key={index}>
//                                         {highlight}
//                                     </li>
//
//                                 ))}
//
//                             </ul>
//
//                         </article>
//
//                     ))}
//
//                 </div>
//
//             </div>
//
//         </section>
//
//         <section className="aboutValuesSection">
//
//             <div className="aboutValuesWrapper">
//
//                 <div className="aboutSectionTitle">
//
//                     <div className="aboutSectionAccent">
//                         <h2>Core</h2>
//                     </div>
//
//                     <div className="aboutSectionSecondary">
//                         <h2>Values</h2>
//                     </div>
//
//                 </div>
//
//                 <div className="valuesIntro">
//
//                     <p>
//                         The foundations that shape every production,
//                         every team and every decision.
//                     </p>
//
//                 </div>
//
//                 <div className="valuesList">
//
//                     {data.description.values.map((value, index) => (
//
//                         <article
//                             key={value.core}
//                             className="valueRow"
//                         >
//
//                             <div className="valueRowHeader">
//
//                                 <div className="valueIconContainer">
//
//                                     <img
//                                         src={resolveImage(value.icon)}
//                                         alt={value.core}
//                                     />
//
//                                 </div>
//
//                                 <div className="valueTitleContainer">
//
//                             <span className="valueNumber">
//                                 {String(index + 1).padStart(2, "0")}
//                             </span>
//
//                                     <h3>
//                                         {value.core}
//                                     </h3>
//
//                                 </div>
//
//                             </div>
//
//                             <p>
//                                 {value.philosophy}
//                             </p>
//
//                         </article>
//
//                     ))}
//
//                 </div>
//
//             </div>
//
//         </section>
//
//         <section className="studioSection">
//
//             <div className="studioWrapper">
//
//                 <div className="studioImageContainer">
//
//                     <img
//                         src={studio}
//                         alt="Studio foto"
//                     />
//
//                 </div>
//
//                 <div className="studioContent">
//
//             <span className="studioEyebrow">
//                 My studio
//             </span>
//
//                     <h2>
//                         Horvath Audio Engineering
//                     </h2>
//
//                     <p>
//                         Built from a lifelong obsession with great sound,
//                         Horvath Audio Engineering is where technical accuracy
//                         meets creativity.
//                     </p>
//
//                     <p>
//                         The studio focuses on recording, editing, audio restoration,
//                         mixing and mastering for games, broadcast, podcasts,
//                         commercial productions and independent artists.
//                     </p>
//
//                     <p>
//                         Every workflow, piece of equipment and acoustic treatment
//                         has been carefully selected to create an environment that
//                         delivers consistent results while staying flexible enough
//                         for unique productions.
//                     </p>
//
//                     <div className="studioStats">
//
//                         <div className="studioStat">
//                             <span>10+</span>
//                             <small>Years operating</small>
//                         </div>
//
//                         <div className="studioStat">
//                             <span>1000+</span>
//                             <small>Hours recorded</small>
//                         </div>
//
//                         <div className="studioStat">
//                             <span>∞</span>
//                             <small>Coffees consumed</small>
//                         </div>
//
//                     </div>
//
//
//                 </div>
//             </div>
//         </section>
//
//         <section className="skillsSection">
//
//             <div className="skillsWrapper">
//
//                 <div className="aboutSectionTitle">
//
//                     <div className="aboutSectionAccent">
//                         <h2>Core</h2>
//                     </div>
//
//                     <div className="aboutSectionSecondary">
//                         <h2>Skills</h2>
//                     </div>
//
//                 </div>
//
//                 <div className="skillsIntro">
//
//                     <p>
//                         Over two decades of production, technical
//                         and leadership experience distilled into a
//                         practical toolkit for solving problems,
//                         guiding teams and delivering results.
//                     </p>
//
//                 </div>
//
//                 {/* SOFT SKILLS */}
//
//                 <div className="skillGroup">
//
//                     <div className="skillGroupHeader">
//                         <h3>Soft Skills</h3>
//                     </div>
//
//                     <ul className="skillList">
//
//                         {data.softSkills.map((skill) => (
//
//                             <li
//                                 key={skill}
//                                 className="skillTag"
//                             >
//                                 {skill}
//                             </li>
//
//                         ))}
//
//                     </ul>
//
//                 </div>
//
//                 {/* HARD SKILLS */}
//
//                 <div className="skillGroup">
//
//                     <div className="skillGroupHeader">
//                         <h3>Production & Technical Skills</h3>
//                     </div>
//
//                     <ul className="skillList">
//
//                         {data.hardSkills.map((skill) => (
//
//                             <li
//                                 key={skill}
//                                 className="skillTag"
//                             >
//                                 {skill}
//                             </li>
//
//                         ))}
//
//                     </ul>
//
//                 </div>
//
//                 {/* AUDIO SKILLS */}
//
//                 <div className="skillGroup">
//
//                     <div className="skillGroupHeader">
//                         <h3>Audio Skills</h3>
//                     </div>
//
//                     <ul className="skillList">
//
//                         {data.audioSkills.map((skill) => (
//
//                             <li
//                                 key={skill}
//                                 className="skillTag"
//                             >
//                                 {skill}
//                             </li>
//
//                         ))}
//
//                     </ul>
//
//                 </div>
//
//                 <div className="skillGroup">
//
//                     <div className="skillGroupHeader">
//                         <h3>Programming languages</h3>
//                     </div>
//
//                     <ul className="skillList">
//
//                         {data.programmingLanguages.map((skill) => (
//
//                             <li
//                                 key={skill}
//                                 className="skillTag"
//                             >
//                                 {skill}
//                             </li>
//
//                         ))}
//
//                     </ul>
//
//                 </div>
//
//             </div>
//
//         </section>
//
//     </>
//
// }
//
// export default AboutPage

import jim from './../../images/Jim/Jim in flowers.png';
import studio1 from './../../images/Jim/studio.png';
import studio2 from './../../images/Jim/studiopic (3).jpg';
import studio3 from './../../images/Jim/studiopic (4).jpg';
import studio4 from './../../images/Jim/studiopic (5).jpg';
import studio5 from './../../images/Jim/studiopic (6).jpg';
import { useEffect, useMemo, useState } from "react";
import { useCvData, usePortfolioItems } from "../../hooks/useSupabaseData.js";
import { generateCvPdf } from "../../helpers/generateCvPdf.js";
import { resolveImage } from "../../helpers/resolveImage.js";
import './AboutPage.css';

const studioImages = [
    studio1,
    studio2,
    studio3,
    studio4,
    studio5
];

const STUDIO_AUTOPLAY_DELAY = 5000;

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

            <section className="aboutValuesSection">
                <div className="aboutValuesWrapper">
                    <div className="valuesIntroLayout">
                        <SectionTitle
                            accent="Core"
                            title="Values"
                            number="02"
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

            <section className="skillsSection">
                <div className="skillsWrapper">
                    <div className="skillsIntroLayout">
                        <SectionTitle
                            accent="Core"
                            title="Skills"
                            number="03"
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




