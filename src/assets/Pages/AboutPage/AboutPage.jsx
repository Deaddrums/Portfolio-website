import jim from './../../images/Jim/Jim in flowers.png'
import studio from './../../images/Jim/studio.png'
import { useEffect, useState } from "react";
import { useCvData } from "../../hooks/useSupabaseData.js";
import { generateCvPdf } from "../../helpers/generateCvPdf.js";
import './AboutPage.css'

function AboutPage () {

    const { data, loading, error } = useCvData();

    const [showAll, setShowAll] = useState(false);
    const [isGeneratingCv, setIsGeneratingCv] = useState(false);
    const [cvToast, setCvToast] = useState(null);

    useEffect(() => {
        if (!cvToast) {
            return undefined;
        }

        const timeout = setTimeout(() => {
            setCvToast(null);
        }, 4000);

        return () => clearTimeout(timeout);
    }, [cvToast]);

    async function handleResumeDownload() {
        if (isGeneratingCv || !data) {
            return;
        }

        setIsGeneratingCv(true);
        setCvToast(null);

        try {
            await generateCvPdf(data);

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

    if (loading) {
        return <p className="aboutPageLoadingState">Loading...</p>;
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

    return <>

        {cvToast && (
            <div
                className={`cvToast ${
                    cvToast.type === "success" ? "cvToastSuccess" : "cvToastError"
                }`}
                role="status"
            >
                <span className="cvToastIcon">
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
                            <h1 className="aboutJim">
                                Jim
                            </h1>
                        </div>

                        <div className="aboutHorvathContainer">
                            <h1 className="aboutHorvath">
                                Horvath
                            </h1>
                        </div>

                    </div>

                    <div className="aboutHeroText">

                <span className="aboutEyebrow">
                    Producer • Audio Engineer • Project Manager
                </span>

                        <h2>
                            {data.personal.title}
                        </h2>

                        <p className="aboutSummary">
                            {data.description.summary}
                        </p>

                        <div className="aboutContactBlock">

                            <div>
                                <strong>Email</strong>
                                <span>{data.personal.email}</span>
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
                                    View Profile
                                </a>

                            </div>

                        </div>

                    </div>

                    <ul className="heroStats">

                        {data.hero.stats.map((stat, index) => (

                            <li
                                key={index}
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
                            alt="foto van jim"
                        />

                    </div>

                    <button
                        type="button"
                        className="resumeButton"
                        onClick={handleResumeDownload}
                        disabled={isGeneratingCv}
                    >
                        {isGeneratingCv ? "Generating..." : "Download Resume"}
                    </button>

                </div>

            </div>

        </section>

        <section className="aboutExperienceSection">

            <div className="aboutExperienceWrapper">

                <div className="aboutSectionHeader">

                    <div className="aboutSectionTitle">

                        <div className="aboutSectionAccent">
                            <h2>Work</h2>
                        </div>

                        <div className="aboutSectionSecondary">
                            <h2>Experience</h2>
                        </div>

                    </div>

                    {data.experience.length > 6 && (
                        <button
                            className="showMoreButton"
                            onClick={() => setShowAll(!showAll)}
                        >
                            {showAll
                                ? "Show less"
                                : "Show all experience"}
                        </button>
                    )}

                </div>

                <div className="experienceGrid">

                    {visibleExperiences.map((job) => (

                        <article
                            key={job.id}
                            className="experienceCard"
                        >

                            <div className="experienceCardTop">

                        <span className="experienceCompany">
                            {job.company}
                        </span>

                                <span className="experiencePeriod">
                            {job.period}
                        </span>

                            </div>

                            <h3>
                                {job.role}
                            </h3>

                            <p className="experienceLocation">
                                {job.location}
                            </p>

                            <ul className="experienceHighlights">

                                {job.highlights.map((highlight, index) => (

                                    <li key={index}>
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

                <div className="aboutSectionTitle">

                    <div className="aboutSectionAccent">
                        <h2>Core</h2>
                    </div>

                    <div className="aboutSectionSecondary">
                        <h2>Values</h2>
                    </div>

                </div>

                <div className="valuesIntro">

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

                            <div className="valueRowHeader">

                                <div className="valueIconContainer">

                                    <img
                                        src={value.icon}
                                        alt={value.core}
                                    />

                                </div>

                                <div className="valueTitleContainer">

                            <span className="valueNumber">
                                {String(index + 1).padStart(2, "0")}
                            </span>

                                    <h3>
                                        {value.core}
                                    </h3>

                                </div>

                            </div>

                            <p>
                                {value.philosophy}
                            </p>

                        </article>

                    ))}

                </div>

            </div>

        </section>

        <section className="studioSection">

            <div className="studioWrapper">

                <div className="studioImageContainer">

                    <img
                        src={studio}
                        alt="Studio foto"
                    />

                </div>

                <div className="studioContent">

            <span className="studioEyebrow">
                My studio
            </span>

                    <h2>
                        Horvath Audio Engineering
                    </h2>

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

                <div className="aboutSectionTitle">

                    <div className="aboutSectionAccent">
                        <h2>Core</h2>
                    </div>

                    <div className="aboutSectionSecondary">
                        <h2>Skills</h2>
                    </div>

                </div>

                <div className="skillsIntro">

                    <p>
                        Over two decades of production, technical
                        and leadership experience distilled into a
                        practical toolkit for solving problems,
                        guiding teams and delivering results.
                    </p>

                </div>

                {/* SOFT SKILLS */}

                <div className="skillGroup">

                    <div className="skillGroupHeader">
                        <h3>Soft Skills</h3>
                    </div>

                    <ul className="skillList">

                        {data.softSkills.map((skill) => (

                            <li
                                key={skill}
                                className="skillTag"
                            >
                                {skill}
                            </li>

                        ))}

                    </ul>

                </div>

                {/* HARD SKILLS */}

                <div className="skillGroup">

                    <div className="skillGroupHeader">
                        <h3>Production & Technical Skills</h3>
                    </div>

                    <ul className="skillList">

                        {data.hardSkills.map((skill) => (

                            <li
                                key={skill}
                                className="skillTag"
                            >
                                {skill}
                            </li>

                        ))}

                    </ul>

                </div>

                {/* AUDIO SKILLS */}

                <div className="skillGroup">

                    <div className="skillGroupHeader">
                        <h3>Audio Skills</h3>
                    </div>

                    <ul className="skillList">

                        {data.audioSkills.map((skill) => (

                            <li
                                key={skill}
                                className="skillTag"
                            >
                                {skill}
                            </li>

                        ))}

                    </ul>

                </div>

                <div className="skillGroup">

                    <div className="skillGroupHeader">
                        <h3>Programming languages</h3>
                    </div>

                    <ul className="skillList">

                        {data.programmingLanguages.map((skill) => (

                            <li
                                key={skill}
                                className="skillTag"
                            >
                                {skill}
                            </li>

                        ))}

                    </ul>

                </div>

            </div>

        </section>

    </>

}

export default AboutPage
