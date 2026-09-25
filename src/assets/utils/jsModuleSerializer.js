
function indent(level) {
    return "    ".repeat(level);
}

function isRawRef(value) {
    return (
        value &&
        typeof value === "object" &&
        !Array.isArray(value) &&
        Object.prototype.hasOwnProperty.call(value, "__raw")
    );
}

function serializeString(value) {
    // Gebruikt altijd dubbele quotes en escaped correct.
    const escaped = value
        .replace(/\\/g, "\\\\")
        .replace(/"/g, '\\"')
        .replace(/\n/g, "\\n");

    return `"${escaped}"`;
}

function isValidIdentifierKey(key) {
    return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key);
}

function serializeKey(key) {
    return isValidIdentifierKey(key) ? key : serializeString(key);
}

export function serializeValue(value, level = 0) {
    if (value === null || value === undefined) {
        return "null";
    }

    if (isRawRef(value)) {
        return value.__raw;
    }

    if (typeof value === "string") {
        return serializeString(value);
    }

    if (typeof value === "number" || typeof value === "boolean") {
        return String(value);
    }

    if (Array.isArray(value)) {
        if (value.length === 0) {
            return "[]";
        }

        const items = value
            .map(
                (item) => `${indent(level + 1)}${serializeValue(item, level + 1)}`
            )
            .join(",\n");

        return `[\n${items}\n${indent(level)}]`;
    }

    if (typeof value === "object") {
        const keys = Object.keys(value);

        if (keys.length === 0) {
            return "{}";
        }

        const entries = keys
            .map((key) => {
                const serializedValue = serializeValue(value[key], level + 1);
                return `${indent(level + 1)}${serializeKey(key)}: ${serializedValue}`;
            })
            .join(",\n");

        return `{\n${entries}\n${indent(level)}}`;
    }

    return "null";
}

/**
 * Bouwt de volledige tekst van een databestand op.
 *
 * @param {string} importsBlock - de import-statements bovenaan het bestand
 *                                (als raw string, inclusief newlines).
 * @param {string} exportName   - naam van de geëxporteerde const
 *                                (bv. "profileData", "contentData", "blogData").
 * @param {*} data               - de daadwerkelijke data (object of array).
 * @returns {string} volledige bestandsinhoud, klaar om te plakken.
 */
export function buildModuleFile(importsBlock, exportName, data) {
    const serialized = serializeValue(data, 0);

    const header = importsBlock ? `${importsBlock}\n\n` : "";

    return (
        `${header}export const ${exportName} = ${serialized};\n\n` +
        `export default ${exportName}\n`
    );
}

export function downloadTextFile(filename, text) {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}

export async function copyTextToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
    }

    // Fallback voor oudere browsers.
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    let succeeded = false;
    try {
        succeeded = document.execCommand("copy");
    } catch (error) {
        succeeded = false;
    }

    document.body.removeChild(textarea);
    return succeeded;
}

export function slugify(text) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

export function generateId(prefix = "item") {
    return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}
