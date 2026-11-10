/* ==========================================================================
   DRUMS PAGE: ALLE CONTENT STAAT HIER
   --------------------------------------------------------------------------
   Je past alleen dit bestand aan om foto's, video's, muziek, teksten en
   endorsements toe te voegen. De pagina zelf (DrumsPage.jsx) hoef je niet
   aan te raken.

   - Een lege lijst ([]) verbergt die sectie automatisch.
   - Voeg een item toe door een regel te kopieren en aan te passen.
   - Foto's en logo's zet je in  public/drums/  en verwijs je naar als
     "/drums/bestandsnaam.jpg". Gebruik kleine letters, zonder spaties.
   ========================================================================== */

export const drumsData = {

    /* ---------- Titel bovenaan ---------- */
    hero: {
        label: "Behind the player",
        title: "Drums",
        name: "Jim 'Deaddrums' Horvath",
        subtitle:
            "Fast metal, phat grooves, smooth sounds and way too much fun. " +
            "This is where you can checkout my work, the photos, videos, music and the gear I play." +
            " \n I also own my own recording studio for near 24/7 session work, feel free to reach out for session work and live shows",
        // badges: ["Metal", "Double bass", "Studio", "Live"],
    },

    /* ---------- Cijfers naast de titel (max. 4 is mooi) ---------- */
    stats: [
        { value: "30+ years of playing", label: "and still loving it" },
        { value: "Shows played", label: "200+ and still counting" },
        { value: "Sticks broken", label: " ... too many " },
    ],

    /* ---------- Lopende tekstband ---------- */
    ticker: [
        "Fast metal",
        "Double bass",
        "Blast beats",
        "Tight grooves",
        "Studio work",
        "Live energy",
    ],

    /* ---------- Roterende foto's ----------
       src     bestandsnaam van de foto (in src/assets/images/Drums/)
       alt     korte beschrijving (voor schermlezers)
       caption tekst op de foto (mag leeg blijven)                          */
    photos: [
        { src: "Versie 5 Grade.00_15_06_03.Still005.jpg.webp", alt: "Jim behind the drum kit", caption: "Behind the kit" },
        { src: "106494015_1451318311714411_5089887790328924265_o.jpg.webp", alt: "Close-up of the snare", caption: "Live" },
        { src: "106505685_1451318478381061_2440719020922473953_o.jpg.webp", alt: "Live on stage", caption: "Live" },
        { src: "Versie 2.00_07_47_13.Still006.jpg.webp", alt: "Recording session", caption: "Focussed plaing" },
        { src: "Versie 4.00_01_38_22.Still004_0.jpg.webp", alt: "Recording session", caption: "Talking about Soultone" },
    ],


    /* ---------- Teksten ----------
       Elk blok wordt een eigen sectie. De eerste alinea is de grote
       introtekst. Voeg zoveel blokken toe als je wilt.                      */
    story: [
        {
            title: "How it started",
            paragraphs: [
                "With a dad who played drums there was little chance of me not playing",
                "From an early age I really honed in on the drums, and became obsessed during my teens. ",
            ],
        },
        {
            title: "How I play",
            paragraphs: [
                "Describe your style, your influences and what you are working on right now.",
            ],
        },
    ],

    /* ---------- Details in de zijbalk ---------- */
    details: [
        { label: "Styles", value: "Metal, Avant-garde, Jazz, Hiphop, Drum and bass, Rock and more" },
        { label: "Drums", value: "Tama starclassic bubinga\n22x18 Bass drum\n10x8 tom\n12x9 tom\n16x14 floor tom" },
        { label: "Cymbals", value: "Soultone cymbals\n17” Brilliant china\n18” custom crash\n14” sunburst vintage hihat\n10” custom brilliant splash\n10” custom brilliant mini china\n16” FXO crash\n21” JG ride\n18” custom brilliant crash\n19”FXO china" },
        { label: "Snares", value: "14x6.5 Mapex black panther\n10x5 Pearl firecracker" },
        { label: "Hardware", value: "Tama 910 speedcobra pedals\nTama 910 hi-hat\nPearl racks\nPearl cymbal stands" },
        { label: "Electronics", value: "Roland Tm2 triggers\nRoland TD-9 drumkit" },
    ],

    /* ---------- Video's ----------
       Plak een gewone YouTube- of Vimeo-link. Andere sites: plak de
       embed-link (de src van de iframe).
       De eerste video wordt groot getoond.                                  */
    videos: [
        {
            title: "The making of Are you ready?! by the Barbeardians",
            url: "https://youtu.be/2Q5UJ-B-8o4?si=KaskkNfmnDDViK2Z",
            description: "The behind the scene of Are you ready?!.",
        },
        {
            title: "The Platters - The great pretender (cover)",
            url: "https://youtu.be/qkA_XGALpQE?si=hBbKM5H1-0DBz9r3",
            description: "Playing the old classic for a session",
        },
        {
            title: "Susan Santos - Skin and bones (cover)",
            url: "https://youtu.be/BqvnvesHLWs?si=DTp8yQ64cuHugsEX",
            description: "Try out for a tour",
        },
        {
            title: "Kus - gaat los (cover)",
            url: "https://youtu.be/bXWPVEq6f_0?si=yaREG_kyG1lvBWxa",
            description: "One of the most fun songs I got to play",
        },
        {
            title: "Yui session - Rompeltierock",
            url: "https://youtu.be/Tz4yWMvvFHU?si=Jjb8W7cFedKrGqnU",
            description: "Nailing a very difficult song within a day",
        },
    ],

    /* ---------- Muziek ----------
       platform: "spotify" | "soundcloud" | "bandcamp"

       spotify     plak de gewone link van het nummer, album of de playlist
       soundcloud  plak de gewone link van het nummer
       bandcamp    plak de src uit  Share / Embed > Embed this album/track
                   (begint met https://bandcamp.com/EmbeddedPlayer/...)
       height      optioneel, de hoogte van de speler in pixels              */
    music: [
        {
            title: "Meat loaf - Paradise by the dashboard light (cover)",
            platform: "soundcloud",
            url: "https://soundcloud.com/audict-noise/meat-loaf-paradise-by-the-dashboard-light-cover?si=805f3f825b8e4209a812bb968e25c20e&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
            description: "",
        },
        {
            title: "Barbeardians - Groovin' panda",
            platform: "spotify",
            url: "https://open.spotify.com/track/2QMpdDuzinyv2d7kaas7Td?si=833c08b15c434d0e",
            description: "",
        },
        {
            title: "Barbeardians - Ready or not",
            platform: "soundcloud",
            url: "https://soundcloud.com/thebarbeardians/the-barbeardians-ready-or-not?si=3708c984cd9044a382d3404d0d9b1147&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
            description: "",
        },
        {
            title: "Barbeardians - The awesome that is me",
            platform: "soundcloud",
            url: "https://soundcloud.com/thebarbeardians/the-barbeardians-the-awesome-that-is-me?si=b6320e939a5a48f3970843813bfb68a6&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
            description: "",
        },
        {
            title: "Jimi Hendrix - All among the watchtower (cover)",
            platform: "soundcloud",
            url: "https://soundcloud.com/audict-noise/all-along-the-watchtower-final-productionmp3?si=062bf155727e4b2ea0c1cee8a2e9969e&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
            description: "",
        },

    ],

    /* ---------- Endorsements ----------
       name         naam van het merk
       logo         pad naar het logo (public/drums/...), mag leeg blijven
       since        sinds wanneer (mag leeg)
       quote        eigen tekst of citaat (mag leeg)
       description  korte uitleg (mag leeg)
       gear         lijst met producten die je speelt
       page         link naar de endorsement-pagina (artist page, of een
                    eigen pagina zoals "/drums/vic-firth")
       url          link naar de website van het merk

       Het logo klikt door naar "page", en als die leeg is naar "url".       */
    endorsements: [
        {
            name: "Soultone cymbals",
            logo: "WhatsApp Image 2026-10-26 at 14.44.27.jpeg",
            since: "2018",
            quote: "",
            description: "Why you play this brand and what you use.",
            gear: ["Cymbals"],
            page: "https://www.soultonecymbals.com/artist/jim-horvath",
            url: "https://www.soultonecymbals.com",
        },

        // {
        //     name: "Another Brand",
        //     logo: "/drums/brand-2.png",
        //     since: "",
        //     quote: "",
        //     description: "",
        //     gear: [],
        //     page: "",
        //     url: "https://example.com",
        // },
    ],

    /* ---------- Links in de zijbalk ---------- */
    links: [
        { label: "YouTube channel", url: "https://www.youtube.com/@your-channel" },
        { label: "SoundCloud", url: "https://soundcloud.com/your-profile" },
        { label: "Instagram", url: "https://www.instagram.com/your-profile" },
    ],

    /* ---------- Interactieve extra's aan of uit ---------- */
    features: {
        tapTempo: true,    // BPM-teller in de zijbalk
        playground: true,  // speelbare drumpads
    },

    /* ---------- Afsluitblok onderaan (verwijder het blok om te verbergen) ---------- */
    cta: {
        eyebrow: "Need a drummer?",
        title: "Let's make some noise",
        buttonLabel: "Get in touch",
        href: "/contact",
    },
};
