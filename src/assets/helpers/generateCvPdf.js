import { jsPDF } from "jspdf";
import logo from "../images/clean-logo-transparent.png";

/* =====================================
   CONFIG
===================================== */

const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MARGIN = 14;

const SIDEBAR_WIDTH = 58;
const SIDEBAR_PADDING = 8;

const FULL_CONTENT_X = MARGIN;
const FULL_CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

const SIDEBAR_CONTENT_X = SIDEBAR_WIDTH + 10;
const SIDEBAR_CONTENT_WIDTH = PAGE_WIDTH - SIDEBAR_CONTENT_X - MARGIN;

const MAX_EXPERIENCE_ITEMS = 6;

// Bovengrens voor het aantal portfolio-projecten dat op de extra
// pagina('s) wordt getoond. Verlaag dit als je liever een kortere
// PDF houdt.
const MAX_PORTFOLIO_ITEMS = 12;

const COLORS = {
    brand: [7, 159, 224],
    text: [28, 28, 28],
    muted: [110, 110, 110],
    sidebarBg: [244, 247, 250],
    divider: [222, 227, 232]
};

/* =====================================
   LAGE-NIVEAU HELPERS
===================================== */

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = src;
    });
}

function setFillColor(doc, color) {
    doc.setFillColor(color[0], color[1], color[2]);
}

function setTextColor(doc, color) {
    doc.setTextColor(color[0], color[1], color[2]);
}

function setDrawColor(doc, color) {
    doc.setDrawColor(color[0], color[1], color[2]);
}

function ensureSpace(doc, layout, neededHeight) {
    if (layout.y + neededHeight <= PAGE_HEIGHT - MARGIN) {
        return layout;
    }

    doc.addPage();

    return {
        x: FULL_CONTENT_X,
        width: FULL_CONTENT_WIDTH,
        y: MARGIN
    };
}

function drawSectionHeading(doc, layout, title) {
    const { x, y, width } = layout;

    setFillColor(doc, COLORS.brand);
    doc.rect(x, y, 3, 4.6, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11.5);
    setTextColor(doc, COLORS.text);
    doc.text(title.toUpperCase(), x + 6, y + 4);

    setDrawColor(doc, COLORS.divider);
    doc.setLineWidth(0.3);
    doc.line(x, y + 7.5, x + width, y + 7.5);

    return { ...layout, y: y + 12 };
}

function drawParagraph(doc, layout, text, options = {}) {
    const {
        fontSize = 9,
        lineHeight = 4.3,
        color = COLORS.text
    } = options;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(fontSize);
    setTextColor(doc, color);

    const lines = doc.splitTextToSize(text, layout.width);
    doc.text(lines, layout.x, layout.y);

    return { ...layout, y: layout.y + lines.length * lineHeight };
}

function drawBulletList(doc, layout, items, options = {}) {
    const { fontSize = 8.7, lineHeight = 3.9 } = options;

    let y = layout.y;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(fontSize);
    setTextColor(doc, COLORS.text);

    items.forEach((item) => {
        const lines = doc.splitTextToSize(item, layout.width - 5);

        doc.text("•", layout.x, y);
        doc.text(lines, layout.x + 4.5, y);

        y += lines.length * lineHeight;
    });

    return { ...layout, y };
}

function drawPipedList(doc, layout, items, options = {}) {
    const { fontSize = 8.7, lineHeight = 4.2 } = options;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(fontSize);
    setTextColor(doc, COLORS.text);

    const text = items.join("   |   ");
    const lines = doc.splitTextToSize(text, layout.width);

    doc.text(lines, layout.x, layout.y);

    return { ...layout, y: layout.y + lines.length * lineHeight };
}

function formatClientName(clientId) {
    if (!clientId) {
        return "Independent / Personal Project";
    }

    return clientId
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
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

function drawSidebar(doc, logoImage, profileData) {
    setFillColor(doc, COLORS.sidebarBg);
    doc.rect(0, 0, SIDEBAR_WIDTH, PAGE_HEIGHT, "F");

    setFillColor(doc, COLORS.brand);
    doc.rect(SIDEBAR_WIDTH - 1.5, 0, 1.5, PAGE_HEIGHT, "F");

    let y = MARGIN;
    const x = SIDEBAR_PADDING;
    const width = SIDEBAR_WIDTH - SIDEBAR_PADDING * 2;

    if (logoImage) {
        const logoSize = 26;
        doc.addImage(logoImage, "PNG", x, y, logoSize, logoSize);
        y += logoSize + 8;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16.5);
    setTextColor(doc, COLORS.text);
    const nameLines = doc.splitTextToSize(profileData.personal.name, width);
    doc.text(nameLines, x, y);
    y += nameLines.length * 6 + 3;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    setTextColor(doc, COLORS.brand);
    const titleLines = doc.splitTextToSize(profileData.personal.title, width);
    doc.text(titleLines, x, y);
    y += titleLines.length * 4.6;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.7);
    setTextColor(doc, COLORS.muted);
    const subtitleLines = doc.splitTextToSize(
        profileData.personal.subtitle,
        width
    );
    doc.text(subtitleLines, x, y);
    y += subtitleLines.length * 4 + 8;

    setDrawColor(doc, COLORS.divider);
    doc.setLineWidth(0.3);
    doc.line(x, y, x + width, y);
    y += 7;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    setTextColor(doc, COLORS.brand);
    doc.text("CONTACT", x, y);
    y += 5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    setTextColor(doc, COLORS.text);

    const locationLines = doc.splitTextToSize(
        profileData.personal.location,
        width
    );
    doc.text(locationLines, x, y);
    y += locationLines.length * 4.2;

    doc.text(profileData.personal.phone, x, y);
    y += 4.2;

    setTextColor(doc, COLORS.brand);
    doc.textWithLink(profileData.personal.email, x, y, {
        url: `mailto:${profileData.personal.email}`
    });
    y += 7;

    setTextColor(doc, COLORS.brand);
    doc.textWithLink("LinkedIn Profile", x, y, {
        url: profileData.personal.linkedin
    });
    y += 8;

    setDrawColor(doc, COLORS.divider);
    doc.line(x, y, x + width, y);
    y += 7;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    setTextColor(doc, COLORS.brand);
    doc.text("LANGUAGES SPOKEN", x, y);
    y += 5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    setTextColor(doc, COLORS.text);
    doc.text("Dutch  |  English", x, y);
}

/* =====================================
   PORTFOLIO OVERVIEW — nieuwe extra pagina('s)
===================================== */

function drawPortfolioOverviewSection(doc, portfolioItems) {
    if (!portfolioItems || portfolioItems.length === 0) {
        return;
    }

    // Altijd op een NIEUWE pagina beginnen, los van waar de CV-inhoud
    // eindigde, zodat het duidelijk als eigen sectie herkenbaar is.
    doc.addPage();

    let layout = {
        x: FULL_CONTENT_X,
        width: FULL_CONTENT_WIDTH,
        y: MARGIN
    };

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    setTextColor(doc, COLORS.text);
    doc.text("PORTFOLIO OVERVIEW", layout.x, layout.y + 6);
    layout.y += 10;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    setTextColor(doc, COLORS.muted);
    doc.text(
        "Selected projects, the role I played in each, and key context.",
        layout.x,
        layout.y
    );
    layout.y += 10;

    setDrawColor(doc, COLORS.divider);
    doc.setLineWidth(0.3);
    doc.line(layout.x, layout.y, layout.x + layout.width, layout.y);
    layout.y += 10;

    const projects = [...portfolioItems]
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .slice(0, MAX_PORTFOLIO_ITEMS);

    projects.forEach((project, index) => {
        const isLast = index === projects.length - 1;

        // Ruwe schatting van de benodigde hoogte voor dit blok, zodat
        // ensureSpace tijdig een nieuwe pagina kan starten.
        const estimatedHeight = 4.6 + 4.4 + 4.4 + 10;

        layout = ensureSpace(doc, layout, estimatedHeight);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        setTextColor(doc, COLORS.text);
        doc.text(project.title || "Untitled project", layout.x, layout.y);
        layout.y += 4.8;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(8.6);
        setTextColor(doc, COLORS.brand);
        doc.text(
            `Role: ${getPrimaryRole(project)}`,
            layout.x,
            layout.y
        );
        layout.y += 4.4;

        doc.setFont("helvetica", "italic");
        doc.setFontSize(8.3);
        setTextColor(doc, COLORS.muted);
        const metaLine = [
            formatClientName(project.clientId),
            project.category || null
        ]
            .filter(Boolean)
            .join("  |  ");
        doc.text(metaLine, layout.x, layout.y);
        layout.y += 4.6;

        if (project.subtitle || project.text) {
            layout = drawParagraph(
                doc,
                layout,
                project.subtitle || project.text,
                { fontSize: 8.6, lineHeight: 3.9, color: COLORS.text }
            );
            layout.y += 2;
        }

        if (!isLast) {
            setDrawColor(doc, COLORS.divider);
            doc.setLineWidth(0.2);
            doc.line(layout.x, layout.y + 2, layout.x + layout.width, layout.y + 2);
            layout.y += 8;
        }
    });
}

/* =====================================
   MAIN GENERATOR
   Let op de signatuur: profileData EN portfolioItems worden nu beide
   meegegeven, in plaats van alleen profileData.
===================================== */

export async function generateCvPdf(profileData, portfolioItems = []) {
    if (!profileData) {
        throw new Error(
            "generateCvPdf() heeft profileData nodig als argument. " +
            "Haal de data eerst op via useCvData() of fetchCvData()."
        );
    }

    const doc = new jsPDF({ unit: "mm", format: "a4" });

    doc.setProperties({
        title: `${profileData.personal.name} - CV`,
        author: profileData.personal.name
    });

    let logoImage = null;
    try {
        logoImage = await loadImage(logo);
    } catch (error) {
        console.warn("CV-logo kon niet geladen worden, PDF gaat verder zonder logo.", error);
    }

    drawSidebar(doc, logoImage, profileData);

    let layout = {
        x: SIDEBAR_CONTENT_X,
        width: SIDEBAR_CONTENT_WIDTH,
        y: MARGIN + 2
    };

    /* ---- SUMMARY ---- */

    layout = drawSectionHeading(doc, layout, "Summary");

    const summaryText = profileData.description.summary
        .split("\n")
        .filter(Boolean)[0];

    layout = drawParagraph(doc, layout, summaryText, {
        fontSize: 9,
        lineHeight: 4.3
    });

    layout.y += 6;

    /* ---- EXPERIENCE ---- */

    layout = drawSectionHeading(doc, layout, "Experience");

    const experience = profileData.experience.slice(0, MAX_EXPERIENCE_ITEMS);

    experience.forEach((job) => {
        const estimatedHeight = 4.4 + 4.4 + job.highlights.length * 3.9 + 4;

        layout = ensureSpace(doc, layout, estimatedHeight);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        setTextColor(doc, COLORS.text);
        doc.text(`${job.role}  |  ${job.company}`, layout.x, layout.y);
        layout.y += 4.4;

        doc.setFont("helvetica", "italic");
        doc.setFontSize(8.3);
        setTextColor(doc, COLORS.muted);
        doc.text(`${job.location}  |  ${job.period}`, layout.x, layout.y);
        layout.y += 4.4;

        layout = drawBulletList(doc, layout, job.highlights, {
            fontSize: 8.6,
            lineHeight: 3.9
        });

        layout.y += 4;
    });

    /* ---- HARD SKILLS ---- */

    layout = ensureSpace(doc, layout, 18);
    layout = drawSectionHeading(doc, layout, "Hard Skills");
    layout = drawPipedList(doc, layout, profileData.hardSkills);
    layout.y += 6;

    /* ---- AUDIO SKILLS ---- */

    layout = ensureSpace(doc, layout, 18);
    layout = drawSectionHeading(doc, layout, "Audio Skills");
    layout = drawPipedList(doc, layout, profileData.audioSkills);
    layout.y += 6;

    /* ---- SOFT SKILLS ---- */

    layout = ensureSpace(doc, layout, 18);
    layout = drawSectionHeading(doc, layout, "Soft Skills");
    layout = drawPipedList(doc, layout, profileData.softSkills);
    layout.y += 6;

    /* ---- PROGRAMMING LANGUAGES ---- */

    layout = ensureSpace(doc, layout, 18);
    layout = drawSectionHeading(doc, layout, "Programming Languages");
    layout = drawPipedList(doc, layout, profileData.programmingLanguages);
    layout.y += 6;

    /* ---- EDUCATION ---- */

    layout = ensureSpace(doc, layout, 20);
    layout = drawSectionHeading(doc, layout, "Education");

    profileData.education.forEach((entry) => {
        layout = ensureSpace(doc, layout, 9);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(9.2);
        setTextColor(doc, COLORS.text);
        doc.text(`${entry.school}  |  ${entry.degree}`, layout.x, layout.y);
        layout.y += 4.2;

        doc.setFont("helvetica", "italic");
        doc.setFontSize(8.3);
        setTextColor(doc, COLORS.muted);
        doc.text(`${entry.field}  |  ${entry.period}`, layout.x, layout.y);
        layout.y += 5.2;
    });

    layout.y += 2;

    /* ---- PROJECTS (CV-eigen projecten, uit profileData.projects) ---- */

    const uniqueProjects = [];
    const seenProjectKeys = new Set();

    profileData.projects.forEach((project) => {
        const key = `${project.title}-${project.client}`;

        if (!seenProjectKeys.has(key)) {
            seenProjectKeys.add(key);
            uniqueProjects.push(project);
        }
    });

    layout = ensureSpace(doc, layout, 20);
    layout = drawSectionHeading(doc, layout, "Projects");

    uniqueProjects.forEach((project) => {
        layout = ensureSpace(doc, layout, 12);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(9.2);
        setTextColor(doc, COLORS.text);
        doc.text(`${project.title}  |  ${project.client}`, layout.x, layout.y);
        layout.y += 4.2;

        layout = drawParagraph(
            doc,
            layout,
            `${project.description} ${project.impact}`,
            { fontSize: 8.5, lineHeight: 3.9, color: COLORS.muted }
        );

        layout.y += 3;
    });

    /* ---- PROF. DEVELOPMENT & CERTIFICATIONS ---- */

    const columnGap = 8;
    const columnWidth = (layout.width - columnGap) / 2;

    const rowsNeeded =
        Math.max(
            profileData.development.length,
            profileData.certifications.length
        ) * 4.2 + 12;

    layout = ensureSpace(doc, layout, rowsNeeded);

    const sectionTop = layout.y;

    let leftLayout = { x: layout.x, y: sectionTop, width: columnWidth };
    let rightLayout = {
        x: layout.x + columnWidth + columnGap,
        y: sectionTop,
        width: columnWidth
    };

    leftLayout = drawSectionHeading(doc, leftLayout, "Prof. Development");
    rightLayout = drawSectionHeading(doc, rightLayout, "Certifications");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.6);

    profileData.development.forEach((entry) => {
        setTextColor(doc, COLORS.text);
        doc.text(entry.title, leftLayout.x, leftLayout.y);

        setTextColor(doc, COLORS.muted);
        doc.text(
            `${entry.issuer} | ${entry.year}`,
            leftLayout.x + leftLayout.width,
            leftLayout.y,
            { align: "right" }
        );

        leftLayout.y += 4.2;
    });

    profileData.certifications.forEach((entry) => {
        setTextColor(doc, COLORS.text);
        doc.text(entry.title, rightLayout.x, rightLayout.y);

        setTextColor(doc, COLORS.muted);
        doc.text(
            `${entry.issuer} | ${entry.year}`,
            rightLayout.x + rightLayout.width,
            rightLayout.y,
            { align: "right" }
        );

        rightLayout.y += 4.2;
    });

    /* ---- NIEUW: PORTFOLIO OVERVIEW (extra pagina('s) aan het einde) ---- */

    drawPortfolioOverviewSection(doc, portfolioItems);

    /* ---- OPSLAAN ---- */

    const fileName = `${profileData.personal.name.replace(/\s+/g, "-")}-CV.pdf`;
    doc.save(fileName);

    return doc;
}

export default generateCvPdf;
