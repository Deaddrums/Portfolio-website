import { useState } from "react";

import "./ServicesCarousel.css";

const services = [
    {
        title: "Producer",
        subtitle: "Fixing issues before they show",
        description:
            "Productions are difficult and can catch you off-guard if you don't pay attention. " +
            "it's all about finding those possible roadblocks ahead of times, and setting safeguards to ensure maximum stuff",
        services: [
            "Risk assessment",
            "Production planning",
            "Issue management",
            "Clear roadmap",
            "Stuff",
            "Making more money",
        ]
    },

    {
        title: "Manager",

        subtitle: "Aligning people, priorities and outcomes",

        description:
            "Strong teams don't happen by accident. Effective management is about creating clarity, removing blockers, aligning stakeholders and ensuring everyone can focus on delivering meaningful results. My goal is to help teams move faster, collaborate better and consistently hit their objectives.",

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
            "Organizations often know where they want to go but struggle with how to get there. As a consultant, I analyze challenges, identify opportunities and create practical solutions that improve workflows, efficiency and business outcomes. The focus is always on delivering measurable value.",

        services: [
            "Business analysis",
            "Workflow optimization",
            "Strategic planning",
            "Risk assessment",
            "Change management",
            "Executive recommendations"
        ]
    }

]


function ServicesCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextService = () => {
        setCurrentIndex((prev) => (prev + 1) % services.length);
    };

    const previousService = () => {
        setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
    };

    const currentService = services[currentIndex];

    return (
        <div className="servicesCarousel">

            <div className="servicesHeader">

                <button
                    type="button"
                    className="navButtonServices"
                    onClick={previousService}
                    aria-label="Previous service"
                >
                    ←
                </button>

                <div className="servicesTitleBlock">

                    <div className="servicesTitleText">
                        <h3 className="servicesTitle">
                            {currentService.title}
                        </h3>

                        <p className="servicesSubtitle">
                            {currentService.subtitle}
                        </p>
                    </div>

                </div>

                <div className="servicesNavigation">

                    <p className="serviceCounter">
                        {String(currentIndex + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                    </p>

                    <button
                        type="button"
                        className="navButtonServices"
                        onClick={nextService}
                        aria-label="Next service"
                    >
                        →
                    </button>

                </div>

            </div>

            <div className="serviceBody">

                <div className="serviceDescription">
                    <p>
                        {currentService.description}
                    </p>
                </div>

                <div className="serviceList">
                    <ul>
                        {currentService.services.map((service, index) => (
                            <li key={index}>
                                {service}
                            </li>
                        ))}
                    </ul>
                </div>

            </div>

        </div>
    );
}

export default ServicesCarousel;
