import { useState } from "react";
import { uploadImage } from "../../utils/supabaseStorage.js";

/* =====================================
   BASIC FIELDS
===================================== */

export function TextField({ label, value, onChange, placeholder, hint }) {
    return (
        <label className="adminField">
            <span className="adminFieldLabel">{label}</span>

            <input
                type="text"
                className="adminInput"
                value={value ?? ""}
                placeholder={placeholder}
                onChange={(event) => onChange(event.target.value)}
            />

            {hint && <span className="adminFieldHint">{hint}</span>}
        </label>
    );
}

export function DateField({ label, value, onChange, hint }) {
    return (
        <label className="adminField">
            <span className="adminFieldLabel">{label}</span>

            <input
                type="date"
                className="adminInput"
                value={value ?? ""}
                onChange={(event) => onChange(event.target.value)}
            />

            {hint && <span className="adminFieldHint">{hint}</span>}
        </label>
    );
}

export function CheckboxField({ label, checked, onChange }) {
    return (
        <label className="adminCheckboxField">
            <input
                type="checkbox"
                checked={!!checked}
                onChange={(event) => onChange(event.target.checked)}
            />

            <span>{label}</span>
        </label>
    );
}

export function TextAreaField({ label, value, onChange, rows = 5, hint }) {
    return (
        <label className="adminField">
            <span className="adminFieldLabel">{label}</span>

            <textarea
                className="adminTextarea"
                rows={rows}
                value={value ?? ""}
                onChange={(event) => onChange(event.target.value)}
            />

            {hint && <span className="adminFieldHint">{hint}</span>}
        </label>
    );
}

export function SelectField({ label, value, onChange, options, hint }) {
    return (
        <label className="adminField">
            <span className="adminFieldLabel">{label}</span>

            <select
                className="adminInput"
                value={value ?? ""}
                onChange={(event) => onChange(event.target.value)}
            >
                <option value="">-- Select --</option>

                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {hint && <span className="adminFieldHint">{hint}</span>}
        </label>
    );
}

/* =====================================
   IMAGE UPLOAD FIELD
   Uploadt naar Supabase Storage en slaat de publieke URL op als
   gewone string (geen imports meer nodig).
===================================== */

export function ImageUploadField({ label, value, onChange, folder = "misc", hint }) {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");

    async function handleFileChange(event) {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        setIsUploading(true);
        setUploadError("");

        try {
            const publicUrl = await uploadImage(file, folder);
            onChange(publicUrl);
        } catch (error) {
            setUploadError(error.message);
        } finally {
            setIsUploading(false);
            event.target.value = "";
        }
    }

    return (
        <div className="adminField">
            <span className="adminFieldLabel">{label}</span>

            {value && (
                <div className="adminImagePreviewRow">
                    <img
                        src={value}
                        alt="Preview"
                        className="adminImagePreview"
                    />

                    <button
                        type="button"
                        className="adminSmallButtonDanger"
                        onClick={() => onChange(null)}
                    >
                        Remove
                    </button>
                </div>
            )}

            <input
                type="file"
                accept="image/*"
                className="adminInput"
                onChange={handleFileChange}
                disabled={isUploading}
            />

            {isUploading && (
                <span className="adminFieldHint">Uploading...</span>
            )}

            {uploadError && (
                <span className="adminFieldError">{uploadError}</span>
            )}

            {hint && !uploadError && (
                <span className="adminFieldHint">{hint}</span>
            )}
        </div>
    );
}

/* =====================================
   TAG LIST EDITOR — voor string-arrays
   (hardSkills, tags, keywords, etc.)
===================================== */

export function TagListEditor({ label, items, onChange, placeholder }) {
    const [draft, setDraft] = useState("");

    function addTag() {
        const trimmed = draft.trim();

        if (!trimmed) {
            return;
        }

        onChange([...(items || []), trimmed]);
        setDraft("");
    }

    function removeTag(index) {
        const next = [...items];
        next.splice(index, 1);
        onChange(next);
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            addTag();
        }
    }

    return (
        <div className="adminField">
            <span className="adminFieldLabel">{label}</span>

            <div className="adminTagInputRow">
                <input
                    type="text"
                    className="adminInput"
                    value={draft}
                    placeholder={placeholder || "Typ en druk Enter..."}
                    onChange={(event) => setDraft(event.target.value)}
                    onKeyDown={handleKeyDown}
                />

                <button
                    type="button"
                    className="adminSmallButton"
                    onClick={addTag}
                >
                    Add
                </button>
            </div>

            <div className="adminTagList">
                {(items || []).map((item, index) => (
                    <span key={`${item}-${index}`} className="adminTag">
                        {item}
                        <button
                            type="button"
                            className="adminTagRemove"
                            onClick={() => removeTag(index)}
                            aria-label={`Remove ${item}`}
                        >
                            ×
                        </button>
                    </span>
                ))}

                {(!items || items.length === 0) && (
                    <span className="adminEmptyHint">No items yet.</span>
                )}
            </div>
        </div>
    );
}

/* =====================================
   REPEATABLE LIST EDITOR
   Generieke lijst-editor voor arrays van objecten die als GEHEEL
   worden opgeslagen (bv. binnen de CV-jsonb-blob: experience,
   education, values, ...). Niet gebruikt voor top-level
   portfolio/blog items, want die worden nu per stuk direct
   gepersisteerd naar hun eigen databasetabel/rij.
===================================== */

export function RepeatableListEditor({
                                         items,
                                         onChange,
                                         createEmptyItem,
                                         renderSummary,
                                         renderFields,
                                         addLabel = "+ Add item",
                                         emptyLabel = "No items yet."
                                     }) {
    const [editingIndex, setEditingIndex] = useState(null);

    const list = items || [];

    function startAdd() {
        const next = [...list, createEmptyItem()];
        onChange(next);
        setEditingIndex(next.length - 1);
    }

    function updateItem(index, updatedItem) {
        const next = [...list];
        next[index] = updatedItem;
        onChange(next);
    }

    function removeItem(index) {
        const next = [...list];
        next.splice(index, 1);
        onChange(next);

        if (editingIndex === index) {
            setEditingIndex(null);
        }
    }

    function moveItem(index, direction) {
        const targetIndex = index + direction;

        if (targetIndex < 0 || targetIndex >= list.length) {
            return;
        }

        const next = [...list];
        const [moved] = next.splice(index, 1);
        next.splice(targetIndex, 0, moved);
        onChange(next);

        if (editingIndex === index) {
            setEditingIndex(targetIndex);
        }
    }

    return (
        <div className="adminRepeatableList">
            {list.length === 0 && (
                <p className="adminEmptyHint">{emptyLabel}</p>
            )}

            {list.map((item, index) => (
                <div className="adminRepeatableItem" key={index}>
                    <div className="adminRepeatableItemHeader">
                        <span className="adminRepeatableItemSummary">
                            {renderSummary(item, index)}
                        </span>

                        <div className="adminRepeatableItemActions">
                            <button
                                type="button"
                                className="adminIconButton"
                                onClick={() => moveItem(index, -1)}
                                aria-label="Move up"
                                title="Move up"
                            >
                                ↑
                            </button>

                            <button
                                type="button"
                                className="adminIconButton"
                                onClick={() => moveItem(index, 1)}
                                aria-label="Move down"
                                title="Move down"
                            >
                                ↓
                            </button>

                            <button
                                type="button"
                                className="adminSmallButton"
                                onClick={() =>
                                    setEditingIndex(
                                        editingIndex === index ? null : index
                                    )
                                }
                            >
                                {editingIndex === index ? "Close" : "Edit"}
                            </button>

                            <button
                                type="button"
                                className="adminSmallButtonDanger"
                                onClick={() => removeItem(index)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>

                    {editingIndex === index && (
                        <div className="adminRepeatableItemBody">
                            {renderFields(item, (updatedItem) =>
                                updateItem(index, updatedItem)
                            )}
                        </div>
                    )}
                </div>
            ))}

            <button
                type="button"
                className="adminAddButton"
                onClick={startAdd}
            >
                {addLabel}
            </button>
        </div>
    );
}

/* =====================================
   SAVE STATUS BAR
   Vervangt de oude ExportActionBar (copy/download code). Toont nu
   een directe "Save to database"-knop plus statusmelding.
===================================== */

export function SaveStatusBar({ onSave, isSaving, statusMessage, label }) {
    return (
        <div className="adminExportBar">
            <div className="adminExportInfo">
                <strong>{label}</strong>
                <span>
                    Wijzigingen worden direct naar je Supabase-database
                    geschreven zodra je op Save klikt.
                </span>
            </div>

            <div className="adminExportButtons">
                <button
                    type="button"
                    className="adminPrimaryButton"
                    onClick={onSave}
                    disabled={isSaving}
                >
                    {isSaving ? "Saving..." : "Save to database"}
                </button>
            </div>

            {statusMessage && (
                <span className="adminExportStatus">{statusMessage}</span>
            )}
        </div>
    );
}
