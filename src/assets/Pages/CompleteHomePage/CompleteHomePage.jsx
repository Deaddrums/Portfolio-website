import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TitleMover from "../../helpers/TitleMover/TitleMover.jsx";
import { clientData } from "../../Data/clientData.jsx";
import { usePortfolioItems } from "../../hooks/useSupabaseData.js";
import jimHero from "../../images/Jim/80c2d305-8df8-452d-b779-ca9dad64e868.JPG";
import jimAbout from "../../images/Jim/c7dde56e-76e9-48d3-a8eb-20ec6009618c.JPG";
import "./CompleteHomePage.css";

const FORM_NAME = "contact";

const EMPTY_FORM = {
    name: "",
    email: "",
    message: "",
    "bot-field": ""
};

const SECTION_IDS = ["Hero", "portfoliohighlights", "AboutMeMed", "contact"];

const SECTION_SCROLL_DURATION = 750;
const SECTION_SCROLL_MIN_WIDTH = 1001;

const services = [
    {
        title: "Producer",
        subtitle: "Fixing issues before they show",
        description:
            "Productions are difficult and can catch you off-guard if you don't pay attention. I focus on finding possible roadblocks early, putting safeguards in place and keeping teams focused on the work that matters.",
        services: [
            "Risk assessment",
            "Production planning",
            "Issue management",
            "Clear roadmaps",
            "Cross-team coordination",
            "Budget awareness"
        ]
    },
    {
        title: "Manager",
        subtitle: "Aligning people, priorities and outcomes",
        description:
            "Strong teams do not happen by accident. Effective management means creating clarity, removing blockers, aligning stakeholders and giving people the space to deliver meaningful results.",
        services: [
            "Team leadership",
            "Stakeholder management",
            "Project planning",
            "Resource allocation",
            "Process improvement",
            "Performance tracking"
        ]
    },
    {
        title: "Consultant",
        subtitle: "Turning complexity into clear action",
        description:
            "Organizations often know where they want to go but struggle with how to get there. I analyze the problem, simplify the moving parts and turn complexity into practical, measurable next steps.",
        services: [
            "Business analysis",
            "Workflow optimization",
            "Strategic planning",
            "Risk assessment",
            "Change management",
            "Executive recommendations"
        ]
    }
];

function encode(data) {
    return new URLSearchParams(data).toString();
}

/* Herhaalt een lijst totdat er genoeg items zijn om een rail breed te vullen. */
function fillList(list, minimum) {
    if (!list?.length) {
        return [];
    }

    const result = [];

    while (result.length < minimum) {
        result.push(...list);
    }

    return result;
}


function Marquee({ children, speed = 40, className = "" }) {
    const trackRef = useRef(null);
    const groupRef = useRef(null);
    const offsetRef = useRef(0);
    const pausedRef = useRef(false);

    useEffect(() => {
        let frameId;
        let lastTime = null;

        function step(time) {
            if (lastTime === null) {
                lastTime = time;
            }

            const delta = Math.min((time - lastTime) / 1000, 0.1);
            lastTime = time;

            const groupWidth = groupRef.current?.offsetWidth || 0;

            if (groupWidth > 0 && trackRef.current) {
                if (!pausedRef.current) {
                    offsetRef.current += speed * delta;

                    if (offsetRef.current >= groupWidth) {
                        offsetRef.current -= groupWidth;
                    }
                }

                trackRef.current.style.transform =
                    `translate3d(${offsetRef.current - groupWidth}px, 0, 0)`;
            }

            frameId = window.requestAnimationFrame(step);
        }

        frameId = window.requestAnimationFrame(step);

        return () => window.cancelAnimationFrame(frameId);
    }, [speed]);

    return (
        <div
            className={`homeMarquee ${className}`}
            onMouseEnter={() => {
                pausedRef.current = true;
            }}
            onMouseLeave={() => {
                pausedRef.current = false;
            }}
        >
            <div className="homeMarqueeTrack" ref={trackRef}>
                <div className="homeMarqueeGroup" ref={groupRef}>
                    {children}
                </div>

                <div className="homeMarqueeGroup" aria-hidden="true">
                    {children}
                </div>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* SMOOTH SECTION SCROLL HELPERS                                       */
/* ------------------------------------------------------------------ */

function getScrollParent(element) {
    let parent = element?.parentElement;

    while (parent && parent !== document.body) {
        const overflowY = window.getComputedStyle(parent).overflowY;

        if (
            (overflowY === "auto" || overflowY === "scroll") &&
            parent.scrollHeight > parent.clientHeight
        ) {
            return parent;
        }

        parent = parent.parentElement;
    }

    return window;
}

function getScrollTop(container) {
    return container === window ? window.scrollY : container.scrollTop;
}

function setScrollTop(container, value) {
    if (container === window) {
        window.scrollTo(0, value);
    } else {
        container.scrollTop = value;
    }
}

function getViewportTop(container) {
    return container === window ? 0 : container.getBoundingClientRect().top;
}

function getViewportHeight(container) {
    return container === window ? window.innerHeight : container.clientHeight;
}

function getSectionOffset(section) {
    return parseFloat(window.getComputedStyle(section).scrollMarginTop) || 0;
}

function getTargetScrollTop(container, section) {
    const sectionTop = section.getBoundingClientRect().top;

    return (
        sectionTop -
        getViewportTop(container) +
        getScrollTop(container) -
        getSectionOffset(section)
    );
}

function easeInOutCubic(progress) {
    return progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

function animateScroll(container, targetTop, onDone) {
    const startTop = getScrollTop(container);
    const distance = targetTop - startTop;
    const startTime = performance.now();

    function step(time) {
        const progress = Math.min(
            (time - startTime) / SECTION_SCROLL_DURATION,
            1
        );

        setScrollTop(container, startTop + distance * easeInOutCubic(progress));

        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            onDone?.();
        }
    }

    window.requestAnimationFrame(step);
}

/* ------------------------------------------------------------------ */
/* PAGE                                                                */
/* ------------------------------------------------------------------ */

function CompleteHomePage() {
    const location = useLocation();
    const navigate = useNavigate();
    const pageRef = useRef(null);
    const isAnimatingRef = useRef(false);

    const { items, loading } = usePortfolioItems({
        onlyPublished: true
    });

    const [activeProjectIndex, setActiveProjectIndex] = useState(0);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [serviceIndex, setServiceIndex] = useState(0);
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [formStatus, setFormStatus] = useState("idle");

    const projects = useMemo(() => {
        return [...items]
            .filter((item) => item.type === "project" && item.media?.heroImage)
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }, [items]);

    const heroProjects = useMemo(() => {
        const featured = projects.filter((project) => project.featured);
        const source = featured.length > 0 ? featured : projects;

        return fillList(source.slice(0, 10), 10);
    }, [projects]);

    const heroClients = useMemo(() => fillList(clientData, 10), []);

    const railProjects = useMemo(() => projects.slice(0, 12), [projects]);

    const activeProject = useMemo(() => {
        if (projects.length === 0) {
            return null;
        }

        if (selectedProjectId) {
            return (
                projects.find((project) => project.id === selectedProjectId) ||
                projects[activeProjectIndex % projects.length]
            );
        }

        return projects[activeProjectIndex % projects.length];
    }, [projects, selectedProjectId, activeProjectIndex]);

    const activeService = services[serviceIndex];

    /* ---------- #contact vanuit andere pagina's ---------- */

    useEffect(() => {
        if (location.hash !== "#contact") {
            return undefined;
        }

        const timeoutId = window.setTimeout(() => {
            const section = document.getElementById("contact");

            if (!section) {
                return;
            }

            const container = getScrollParent(section);

            animateScroll(container, getTargetScrollTop(container, section));
        }, 50);

        return () => window.clearTimeout(timeoutId);
    }, [location.hash, loading]);

    /* ---------- Project timer ---------- */

    useEffect(() => {
        if (selectedProjectId || projects.length <= 1) {
            return undefined;
        }

        const interval = window.setInterval(() => {
            setActiveProjectIndex((current) => (current + 1) % projects.length);
        }, 5500);

        return () => window.clearInterval(interval);
    }, [projects.length, selectedProjectId]);

    /* Na 45 seconden zonder klik weer terug naar automatisch roteren. */
    useEffect(() => {
        if (!selectedProjectId) {
            return undefined;
        }

        const timeout = window.setTimeout(() => {
            setSelectedProjectId(null);
        }, 45000);

        return () => window.clearTimeout(timeout);
    }, [selectedProjectId]);

    /* ---------- Smooth section scrolling ---------- */

    useEffect(() => {
        function getSections() {
            return SECTION_IDS
                .map((id) => document.getElementById(id))
                .filter(Boolean);
        }

        function handleWheel(event) {
            if (window.innerWidth < SECTION_SCROLL_MIN_WIDTH || event.ctrlKey) {
                return;
            }

            const page = pageRef.current;

            if (!page || !page.contains(event.target)) {
                return;
            }

            if (isAnimatingRef.current) {
                event.preventDefault();
                return;
            }

            if (Math.abs(event.deltaY) < 4) {
                return;
            }

            const sections = getSections();

            if (sections.length === 0) {
                return;
            }

            const container = getScrollParent(sections[0]);
            const viewportTop = getViewportTop(container);
            const viewportBottom = viewportTop + getViewportHeight(container);

            let currentIndex = 0;
            let closestDistance = Number.POSITIVE_INFINITY;

            sections.forEach((section, index) => {
                const distance = Math.abs(
                    section.getBoundingClientRect().top -
                    viewportTop -
                    getSectionOffset(section)
                );

                if (distance < closestDistance) {
                    closestDistance = distance;
                    currentIndex = index;
                }
            });

            const direction = event.deltaY > 0 ? 1 : -1;
            const currentSection = sections[currentIndex];
            const currentRect = currentSection.getBoundingClientRect();

            /* Is de huidige sectie hoger dan het scherm? Dan eerst normaal scrollen binnen die sectie. */
            if (direction > 0 && currentRect.bottom > viewportBottom + 4) {
                return;
            }

            if (
                direction < 0 &&
                currentRect.top < viewportTop + getSectionOffset(currentSection) - 4
            ) {
                return;
            }

            const nextIndex = currentIndex + direction;

            if (nextIndex < 0 || nextIndex >= sections.length) {
                return;
            }

            event.preventDefault();
            isAnimatingRef.current = true;

            animateScroll(
                container,
                getTargetScrollTop(container, sections[nextIndex]),
                () => {
                    window.setTimeout(() => {
                        isAnimatingRef.current = false;
                    }, 120);
                }
            );
        }

        window.addEventListener("wheel", handleWheel, { passive: false });

        return () => window.removeEventListener("wheel", handleWheel);
    }, []);

    /* ---------- Project helpers ---------- */

    function selectProject(project) {
        const index = projects.findIndex((item) => item.id === project.id);

        setSelectedProjectId(project.id);
        setActiveProjectIndex(index >= 0 ? index : 0);
    }

    function showPreviousProject() {
        if (!projects.length) {
            return;
        }

        setSelectedProjectId(null);
        setActiveProjectIndex((current) =>
            current === 0 ? projects.length - 1 : current - 1
        );
    }

    function showNextProject() {
        if (!projects.length) {
            return;
        }

        setSelectedProjectId(null);
        setActiveProjectIndex((current) => (current + 1) % projects.length);
    }

    function getPrimaryRole(project) {
        return project?.role || project?.whatIDid?.[0] || "Production Support";
    }

    /* ---------- Contact form ---------- */

    function handleFormChange(event) {
        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value
        }));

        if (formStatus === "success" || formStatus === "error") {
            setFormStatus("idle");
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (formStatus === "sending") {
            return;
        }

        setFormStatus("sending");

        try {
            const response = await fetch("/__forms.html", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: encode({
                    "form-name": FORM_NAME,
                    ...formData
                })
            });

            if (!response.ok) {
                throw new Error(`Form submit failed with status ${response.status}`);
            }

            setFormData(EMPTY_FORM);
            setFormStatus("success");
        } catch (error) {
            console.error("Contact form could not be sent:", error);
            setFormStatus("error");
        }
    }

    const projectNumber = projects.length
        ? (activeProjectIndex % projects.length) + 1
        : 0;

    return (
        <main className="completeHomePage" ref={pageRef}>

            {/* ============================================================ */}
            {/* HERO                                                         */}
            {/* ============================================================ */}

            <section className="homeSection homeHeroSection" id="Hero">
                <div className="homeHeroShell">

                    <div className="homeHeroLeft">

                        <div className="homeHeroIntro">
                            <div className="homeEyebrow">
                                <span />
                                Versatile Creative Professional
                            </div>

                            <h1 className="homeHeroTitle">
                                <TitleMover />
                            </h1>

                            <p className="homeHeroDescription">
                                Helping teams, creators and businesses bring ambitious
                                ideas to life through production, project management,
                                audio engineering, localization and technical solutions.
                            </p>

                            <div className="homeHeroUSP">
                                <strong>20+ years of kick-ass experience</strong>
                                <span>Production • Audio • Management • Localization</span>
                            </div>
                        </div>

                        <div className="homeHeroRows">

                            <div className="homeHeroRow">
                                <div className="homeHeroRowLabel">
                                    {/*<span>01</span>*/}
                                    <strong>Trusted by</strong>
                                </div>

                                <Marquee speed={35} className="homeClientMarquee">
                                    {heroClients.map((client, index) => (
                                        <a
                                            key={`${client.website}-${index}`}
                                            href={client.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="homeClientLogo"
                                        >
                                            <img src={client.logo} alt="Client logo" />
                                        </a>
                                    ))}
                                </Marquee>
                            </div>

                            <div className="homeHeroRow">
                                <div className="homeHeroRowLabel">
                                    {/*<span>02</span>*/}
                                    <strong>Worked on</strong>
                                </div>

                                <Marquee speed={45} className="homePortfolioMarquee">
                                    {heroProjects.map((project, index) => (
                                        <button
                                            key={`${project.id}-${index}`}
                                            type="button"
                                            className="homePortfolioTile"
                                            onClick={() => {
                                                if (project.slug) {
                                                    navigate(`/portfolio/${project.slug}`);
                                                }
                                            }}
                                        >
                                            <img
                                                src={project.media.heroImage}
                                                alt=""
                                                aria-hidden="true"
                                            />
                                            <span>{project.title}</span>
                                        </button>
                                    ))}
                                </Marquee>
                            </div>

                        </div>
                    </div>

                    <div className="homeHeroPortrait">
                        <img src={jimHero} alt="Jim Horvath" />
                    </div>

                </div>
            </section>

            {/* ============================================================ */}
            {/* WORK HIGHLIGHTS                                              */}
            {/* ============================================================ */}

            {!loading && activeProject && (
                <section className="homeSection homeWorkSection" id="portfoliohighlights">
                    <div className="homeWorkComponent">

                        <div className="homeWorkBody">

                            <div className="homeProjectVisual">
                                <img
                                    key={activeProject.id}
                                    src={activeProject.media.heroImage}
                                    alt={activeProject.title}
                                />

                                <h2 className="homeWorkBadge">
                                    <span>Work</span>
                                    <strong>Highlights</strong>
                                </h2>

                                <div className="homeProjectCounter">
                                    {String(projectNumber).padStart(2, "0")}
                                    <span>/</span>
                                    {String(projects.length).padStart(2, "0")}
                                </div>

                                <button
                                    type="button"
                                    className="homeProjectArrow homeProjectArrowPrev"
                                    onClick={showPreviousProject}
                                    aria-label="Previous project"
                                >
                                    ‹
                                </button>

                                <button
                                    type="button"
                                    className="homeProjectArrow homeProjectArrowNext"
                                    onClick={showNextProject}
                                    aria-label="Next project"
                                >
                                    ›
                                </button>
                            </div>

                            <div className="homeProjectContent">
                                <span className="homeProjectKicker">Selected project</span>

                                <h3 className="homeProjectTitle">{activeProject.title}</h3>

                                {activeProject.subtitle && (
                                    <p className="homeProjectSubtitle">
                                        {activeProject.subtitle}
                                    </p>
                                )}

                                <p className="homeProjectDescription">
                                    {activeProject.text}
                                </p>

                                <div className="homeProjectMetaGrid">
                                    <div className="homeProjectRole">
                                        <small>My role</small>
                                        <strong>{getPrimaryRole(activeProject)}</strong>
                                    </div>

                                    {activeProject.whatIDid?.length > 0 && (
                                        <div className="homeResponsibilities">
                                            <small>Responsibilities</small>
                                            <ul>
                                                {activeProject.whatIDid
                                                    .slice(0, 6)
                                                    .map((item) => (
                                                        <li key={item}>{item}</li>
                                                    ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                <div className="homeProjectActions">
                                    {activeProject.links?.url && (
                                        <a
                                            href={activeProject.links.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Visit project ↗
                                        </a>
                                    )}

                                    <button
                                        type="button"
                                        disabled={!activeProject.slug}
                                        onClick={() => {
                                            if (activeProject.slug) {
                                                navigate(`/portfolio/${activeProject.slug}`);
                                            }
                                        }}
                                    >
                                        Read project
                                    </button>
                                </div>
                            </div>

                        </div>

                        <Marquee speed={30} className="homeProjectRail">
                            {railProjects.map((project) => (
                                <button
                                    key={project.id}
                                    type="button"
                                    className={`homeRailTile ${
                                        activeProject.id === project.id ? "active" : ""
                                    }`}
                                    onClick={() => selectProject(project)}
                                    aria-label={`Show ${project.title}`}
                                >
                                    <img
                                        src={project.media.heroImage}
                                        alt=""
                                        aria-hidden="true"
                                    />
                                    <span>{project.title}</span>
                                </button>
                            ))}
                        </Marquee>

                    </div>
                </section>
            )}

            {/* ============================================================ */}
            {/* ABOUT                                                        */}
            {/* ============================================================ */}

            <section className="homeSection homeAboutSection" id="AboutMeMed">
                <div className="homeAboutShell">

                    <div className="homeAboutCopy">
                        <span className="homeAboutEyebrow">About Jim</span>

                        <h2 className="homeGradientTitle">
                            Productions are my blood.
                        </h2>

                        <blockquote>
                            Nothing gets me going more than being right in the middle
                            of it. It is that feeling of flying, not thinking, just
                            moving and getting things done.
                        </blockquote>

                        <p>
                            With 20+ years of production experience, I bring structure,
                            discipline, clear communication, high standards and practical
                            value. Tight coordination and budget control matter, but
                            people are the backbone.
                        </p>

                        <p>
                            My background combines audio engineering, project management,
                            localization, coding and hands-on production. That mix lets me
                            bridge creative, technical and operational challenges.
                        </p>

                        <button
                            type="button"
                            className="homePrimaryButton"
                            onClick={() => navigate("/About")}
                        >
                            Read complete profile →
                        </button>
                    </div>


                    <div className="homeAboutRightComponent">
                        <div className="homeAboutImage">
                            <img src={jimAbout} alt="Jim working on a production" />
                            <span>20+ years in production</span>
                        </div>

                        <div className="homeServices">
                            <div className="homeServicesTop">
                                <span className="homeServicesEyebrow">What I bring</span>

                                <div className="homeServiceControls">
                                    <button
                                        type="button"
                                        aria-label="Previous service"
                                        onClick={() =>
                                            setServiceIndex(
                                                (serviceIndex - 1 + services.length) %
                                                services.length
                                            )
                                        }
                                    >
                                        ←
                                    </button>

                                    <span>
                                        {String(serviceIndex + 1).padStart(2, "0")}
                                        <em>/</em>
                                        {String(services.length).padStart(2, "0")}
                                    </span>

                                    <button
                                        type="button"
                                        aria-label="Next service"
                                        onClick={() =>
                                            setServiceIndex(
                                                (serviceIndex + 1) % services.length
                                            )
                                        }
                                    >
                                        →
                                    </button>
                                </div>
                            </div>

                            <div className="homeServiceContent">
                                <div className="homeServiceTitle">
                                    <h3>{activeService.title}</h3>
                                    <p>{activeService.subtitle}</p>
                                </div>

                                <p className="homeServiceDescription">
                                    {activeService.description}
                                </p>

                                <ul className="homeServiceList">
                                    {activeService.services.map((service) => (
                                        <li key={service}>{service}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* ============================================================ */}
            {/* CONTACT                                                      */}
            {/* ============================================================ */}

            <section className="homeSection homeContactSection" id="contact">
                <div className="contactOuterWrapper">
                    <div className="contactInnerWrapper">
                        <article className="contactArticle">
                            <form
                                className="contactForm"
                                name={FORM_NAME}
                                method="POST"
                                onSubmit={handleSubmit}
                            >
                                <input type="hidden" name="form-name" value={FORM_NAME} />

                                <h3>I'd love to hear more from you!</h3>

                                <h4>
                                    <em>Grabbing a coffee </em>
                                    or a tea, but just getting to know people and
                                    expanding my network is so much fun
                                </h4>

                                <p>
                                    If you want to reach out to me, feel free to send me a
                                    message in the form down below!
                                </p>

                                <div className="contactHoneypot" aria-hidden="true">
                                    <label>
                                        Don't fill this out if you're human
                                        <input
                                            type="text"
                                            name="bot-field"
                                            tabIndex={-1}
                                            autoComplete="off"
                                            value={formData["bot-field"]}
                                            onChange={handleFormChange}
                                        />
                                    </label>
                                </div>

                                <div className="contactGrid">
                                    <div className="inputGroup">
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder=" "
                                            autoComplete="name"
                                            value={formData.name}
                                            onChange={handleFormChange}
                                            required
                                        />
                                        <label htmlFor="name">Full Name</label>
                                    </div>

                                    <div className="inputGroup">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder=" "
                                            autoComplete="email"
                                            value={formData.email}
                                            onChange={handleFormChange}
                                            required
                                        />
                                        <label htmlFor="email">Email Address</label>
                                    </div>
                                </div>

                                <div className="inputGroup">
                                    <textarea
                                        id="message"
                                        name="message"
                                        placeholder=" "
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleFormChange}
                                        required
                                    />
                                    <label htmlFor="message">Send me your details</label>
                                </div>

                                <button
                                    className="submitButton"
                                    type="submit"
                                    disabled={formStatus === "sending"}
                                >
                                    <span>
                                        {formStatus === "sending" ? "Sending..." : "Submit"}
                                    </span>
                                    <span className="arrow">→</span>
                                </button>

                                {formStatus === "success" && (
                                    <p className="contactStatus contactStatusSuccess" role="status">
                                        Thank you! Your message has been sent. I'll get back
                                        to you soon.
                                    </p>
                                )}

                                {formStatus === "error" && (
                                    <p className="contactStatus contactStatusError" role="alert">
                                        Something went wrong while sending your message.
                                        Please try again, or email me directly at{" "}
                                        <a href="mailto:jimhorvath@live.nl">
                                            jimhorvath@live.nl
                                        </a>.
                                    </p>
                                )}
                            </form>
                        </article>
                    </div>
                </div>
            </section>

        </main>
    );
}

export default CompleteHomePage;
