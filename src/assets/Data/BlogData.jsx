export const blogData = [
    {
        id: "why-production-planning-saves-projects",

        category: "Production",

        title: "Why Production Planning Saves Projects",

        subtitle: "The unglamorous work that prevents the glamorous disasters",

        // De main text bestaat uit een array van content-blokken.
        // Elk blok heeft een "type" waarmee de component later kan
        // bepalen hoe het gerenderd/gestyled moet worden:
        //   - "paragraph": normale tekstalinea (optioneel met "style" voor
        //                  bv. een lead-paragraaf of nadruk)
        //   - "heading":   subkopje binnen de blogtekst
        //   - "quote":     uitgelichte quote/statement
        //   - "list":      opsomming van punten
        content: [
            {
                type: "paragraph",
                style: "lead",
                text:
                    "Every production looks calm from the outside, right up until " +
                    "the moment it isn't. The difference between a project that " +
                    "survives that moment and one that doesn't almost never comes " +
                    "down to talent. It comes down to planning."
            },
            {
                type: "heading",
                text: "Roadblocks are predictable, not random"
            },
            {
                type: "paragraph",
                text:
                    "Most production issues aren't surprises if you look closely " +
                    "enough. Vendor delays, unclear approvals, missing assets, " +
                    "scope creep, these patterns repeat across almost every " +
                    "project. Planning is simply the discipline of writing those " +
                    "patterns down before they happen instead of reacting to them " +
                    "after."
            },
            {
                type: "quote",
                text:
                    "A risk you saw coming is a line item. A risk you didn't is a " +
                    "crisis."
            },
            {
                type: "heading",
                text: "What good planning actually includes"
            },
            {
                type: "list",
                items: [
                    "A realistic timeline with buffer built in, not hoped for",
                    "Clear ownership for every deliverable and decision",
                    "A short list of known risks and what triggers each one",
                    "A communication rhythm stakeholders can rely on"
                ]
            },
            {
                type: "paragraph",
                text:
                    "None of this is exciting. It won't show up in a showreel. " +
                    "But it's the reason the exciting parts of a production get " +
                    "to happen at all."
            }
        ],

        media: {
            heroImage: "",
            videoUrl: ""
        },

        links: [
            {
                label: "Related case study",
                url: "/portfolio/example-project-slug"
            },
            {
                label: "External reference",
                url: "https://example.com/production-planning"
            }
        ],

        seo: {
            metaTitle: "Why Production Planning Saves Projects | Jim Horvath",
            metaDescription:
                "A look at why disciplined production planning, not talent " +
                "alone, is what determines whether a project survives its " +
                "hardest moments.",
            keywords: [
                "production planning",
                "risk assessment",
                "project management",
                "production support"
            ]
        },

        createdAt: "2026-09-14T10:00:00.000Z"
    }
];

export default blogData;
