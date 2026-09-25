import quality from './../images/icons/AboutIcons/Quality.png'
import human from './../images/icons/AboutIcons/People.png'
import coms from './../images/icons/AboutIcons/Communication.png'
import beat from './../images/icons/AboutIcons/beatbush.png'
import unique from './../images/icons/AboutIcons/Unique.png'

export const profileData = {
    personal: {
        name: "Jim Horvath",
        title: "Backbone for solid production",
        subtitle: "Audio Engineer, Producer, Project Manager, Consultant",
        location: "Hillegom, The Netherlands",
        phone: "06-83678427",
        email: "jimhorvath@live.nl",
        linkedin: "https://www.linkedin.com/in/jim-horvath-7248b916b/",
    },

    description: {
        summary: "For more than 20 years, I've been the person teams rely on when projects need to move forward, obstacles need to disappear, and deadlines absolutely cannot slip. As an experienced Producer, Audio Engineer, and all-round production backbone, I've led teams through global launches across AAA games, localization, broadcast television, radio, live events, webcasts, and large-scale international productions.\n" +
            "Throughout my career, I've successfully delivered 50+ projects by combining clear communication, practical leadership, and a healthy obsession with getting things done right the first time. Whether coordinating international stakeholders, managing complex production pipelines, or untangling last-minute challenges, I bring structure to chaos and keep teams moving toward a common goal.\n" +
            "My background spans project management, localization, audio production, technical implementation, workflow design, and process optimization. Along the way, I've improved operational efficiency by up to 75%, increased margins through smarter workflows, and built scalable solutions that continue delivering value long after launch.\n" +
            "I'm known for spotting problems before they become expensive, translating complexity into actionable plans, and creating environments where teams can focus on producing great work. Simply put: I help ambitious teams deliver better results, with fewer surprises, and a lot less noise.\n",
        about: "With a dad playing drums there was little chance it wouldn't cross over to Jim. From a young age Jim couldn't wait to jump behind the percussive monster and quickly discovered an undying passion for all things music related.\n" +
            "After finishing cooking school, after some grueling years, he made the decision to learn more about audio engineering, figuring that learning more about what happens around music might be fun. One the first day he absolutely fell in love with everything audio and production related.\n" +
            "The years that followed put Jim on many stages as a drummer, being behind buttons for several high level events, and leading multiple projects to fruition causing doors to open for work on radio, TV, 360 productions and videogames. \n",
        values: [
            {
                core: "Personal communication",
                philosophy: "It's about listening to all respective teams, creating a solid plan for both parties, while keeping things lighthearted and fun throughout production",
                icon: coms,
            },
            {
                core: "Humans first",
                philosophy: "Current times put so much focus on tech, while it's the people that make it happen. Finding the way that tech can improve people's job is much more valuable",
                icon: human,
            },
            {
                core: "Raising the bar",
                philosophy: "Pushing for better is the end result, it's the long term goal that makes for a better result, leading to higher profits",
                icon: quality,
            },
            {
                core: "Finding the unique voice",
                philosophy: "Anyone can create anything at any time is the current landscape, but what makes things unique is the golden nugget in standing out among the flood of content",
                icon: unique,
            },
            {
                core: "Don't beat around the bush",
                philosophy: "I'll tell you when it's good, and I'll tell you when it's bad. No faffing about, just clear talks so we can get what we need",
                icon: beat,
            },
        ]

    },

    hero: {
        headline: "The driving spine of every production",
        description:
            "Experienced Producer and Audio Engineer with a proven track record managing AAA projects across global teams. Led more than 50 projects with a 97% client satisfaction rate while improving efficiency by 75%.",
        stats: [
            {
                value: "50+",
                label: "Projects delivered",
            },
            {
                value: "97%",
                label: "Client satisfaction",
            },
            {
                value: "75%",
                label: "Efficiency increase",
            },
            {
                value: "30%",
                label: "Improved profits",

            },
            {
                value: "3",
                label: "Languages spoken",

            },
            {
                value: "∞",
                label: "Coffees consumed",

            },
        ],
    },

    experience: [
        {
            id: 9,
            role: "Localization producer",
            company: "ZeniMax",
            location: "Remote",
            period: "2025 - Present",
            highlights: [
                "Managing localization audio projects for AAA titles in multiple languages",
                "Overseeing all LOC production from start to finish",
                "Coordinating global studios and cross-functional teams",
            ],
        },
        {
            id: 8,
            role: "Audio engineer",
            company: "SIDE worldwide",
            location: "Remote",
            period: "2025 - Present",
            highlights: [
                "Editing numerous AA and AAA videogame dialog audio",
                "SIDE approved mastering engineer",
                "Cleaning, editing and delivering high quality audio files",
                "Clear communication"
            ],
        },
        {
            id: 7,
            role: "Audio Project Manager",
            company: "Local Heroes",
            location: "Utrecht",
            period: "2023 - 2025",
            highlights: [
                "Managing localization audio projects for AAA titles in multiple languages",
                "Overseeing end-to-end audio production and quality control",
                "Coordinating global studios and cross-functional teams",
                "Delivered over multiple projects with 97% client satisfaction",
            ],
        },

        {
            id: 6,
            role: "Owner",
            company: "Horvath Audio Engineering",
            location: "Hillegom",
            period: "2016 - Present",
            highlights: [
                "Sound design",
                "Recording",
                "Mixing and mastering",
                "Editing and audio cleanup",
                "Built a custom high-end mixing room",
            ],
        },

        {
            id: 5,
            role: "Audio Engineer",
            company: "NEP",
            location: "Hilversum",
            period: "2022 - 2023",
            highlights: [
                "ENG and multi-ENG TV productions",
                "Live and recorded broadcast audio",
                "Live show mixer",
                "Field troubleshooting and production support",
            ],
        },

        {
            id: 4,
            role: "Lead Audio",
            company: "The View",
            location: "Amsterdam",
            period: "2021 - 2022",
            highlights: [
                "360 and VR immersive audio production",
                "Designed custom ambisonic studio",
                "Managed audio alignment across production pipeline",
            ],
        },

        {
            id: 3,
            role: "Technical Manager",
            company: "Success Factory",
            location: "Amsterdam",
            period: "2021 - 2022",
            highlights: [
                "Led multiple disciplinary teams",
                "Managed budgets up to $200,000",
                "Improved operational efficiency by 30%",
            ],
        },

        {
            id: 2,
            role: "Technical Audio Lead",
            company: "Tasty Comedy",
            location: "Scheveningen",
            period: "2016 - 2019",
            highlights: [
                "Led team of 6 engineers",
                "Developed live streaming platform",
                "Reduced production bugs by 40%",
            ],
        },

        {
            id: 1,
            role: "Audio Engineer",
            company: "Patronaat",
            location: "Haarlem",
            period: "2015 - 2020",
            highlights: [
                "150+ concerts and events annually",
                "Live sound engineering",
                "Team mentoring and technical training",
            ],
        },
    ],

    services: [
        {
            title: "Localization Production",
            description:
                "Managing multilingual audio projects from planning through delivery.",
        },
        {
            title: "Project Management",
            description:
                "Stakeholder management, risk mitigation, budget tracking, and process optimization.",
        },
        {
            title: "Audio Production",
            description:
                "Recording, editing, mixing, mastering, ADR, dubbing, and sound design.",
        },
        {
            title: "Technical Consulting",
            description:
                "Workflow improvements, tooling, automation, and production support.",
        },
        {
            title: "Production Support",
            description:
                "Cross-functional coordination between development, vendors, and clients.",
        },
    ],

    projects: [
        {
            id: 1,
            title: "Financial Project Overview Sheet",
            client: "Local Heroes",
            category: "Process Improvement",
            description:
                "Designed and built a custom Excel solution for budget tracking, project filtering, and reporting.",
            impact: "More than tripled operational efficiency.",
        },

        {
            id: 2,
            title: "Haarlemse Popscene on Tour",
            client: "Patronaat",
            category: "Technical Production",
            description:
                "Designed stage plots, technical requirements and coordinated the finale production.",
            impact:
                "Successfully delivered a seamless multi-artist live event.",
        },
    ],

    hardSkills: [
        "Localization",
        "Project Leadership",
        "Budget Tracking",
        "Change Management",
        "Localization software",
        "Clear global planning",
        "LAMS",
        "Slack",
        "Webstorm",
        "IntelliJ",
        "Microsoft 365",
        "Digital Asset Management",
        "Dante",
        "Adobe Suite",
    ],

    audioSkills: [
        "Recording",
        "Field Recording",
        "Foley",
        "ADR",
        "Dubbing",
        "Mixing",
        "Mastering",
        "Editing",
        "Audio Cleaning",
        "Sound Design",
        "Signal Processing",
    ],

    softSkills: [
        "Leadership",
        "Communication",
        "Critical Thinking",
        "Problem Solving",
        "Mentorship",
        "Adaptability",
        "Empathy",
        "Time Management",
        "Prioritization",
        "Open Minded",
    ],

    programmingLanguages: [
        "HTML",
        "CSS",
        "Javascript",
        "Java",
        "React",
        "Springboot",
    ],

    education: [
        {
            school: "Novi Hogeschool",
            field: "Back-end development",
            degree: "HBO",
            period: "Currently in progress",
        },
        {
            school: "Novi Hogeschool",
            field: "Front-end development",
            degree: "HBO",
            period: "2026",
        },
        {
            school: "SAE Amsterdam",
            field: "Audio engineering",
            degree: "Associate Degree",
            period: "2010 - 2011",
        },

        {
            school: "Nova College",
            field: "Self sufficient Chef",
            degree: "Senior Vocational Diploma",
            period: "2008 - 2010",
        },

        {
            school: "Nova College",
            field: "Starting Chef",
            degree: "Intermediate Vocational Diploma",
            period: "2007 - 2008",
        },
    ],

    development: [
        {
            title: "RF training",
            issuer: "NEP",
            year: "2022",
        },
        {
            title: "Boom training",
            issuer: "NEP",
            year: "2022",
        },

        {
            title: "Lavalier hiding training",
            issuer: "URSA",
            year: "2022",
        },

        {
            title: "Network audio training",
            issuer: "NEP",
            year: "2022",
        },
        {
            title: "Ambisonic training",
            issuer: "MSV",
            year: "2021",
        },
        {
            title: "Midas M32 training",
            issuer: "NEP",
            year: "2022",
        },
        {
            title: "SSL-500 desk training",
            issuer: "Patronaat",
            year: "2018",
        },
    ],

    certifications: [
        {
            title: "Operations job simulator",
            issuer: "Goldman Sachs",
            year: "2026",
        },
        {
            title: "Dante Level 2",
            issuer: "Audient",
            year: "2023",
        },

        {
            title: "Dante Level 1",
            issuer: "Audient",
            year: "2023",
        },

        {
            title: "Certified ER Officer",
            issuer: "BHV NL",
            year: "2022",
        },
    ],
};

export default profileData