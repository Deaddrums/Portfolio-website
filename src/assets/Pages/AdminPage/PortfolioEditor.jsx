import { useState } from "react";
import { usePortfolioItems } from "../../hooks/useSupabaseData.js";
import { savePortfolioItem, deletePortfolioItem } from "../../utils/supabaseData.js";
import { slugify, generateId } from "../../utils/jsModuleSerializer.js";
import {
    TextField,
    TextAreaField,
    TagListEditor,
    CheckboxField,
    SelectField,
    DateField,
    ImageUploadField
} from "./AdminFormControls.jsx";

function createEmptyProject() {
    return {
        id: generateId("project"),
        slug: "",
        title: "",
        subtitle: "",
        category: "",
        clientId: "",
        role: "",
        type: "project",
        featured: false,
        published: false,
        updatedAt: new Date().toISOString().slice(0, 10),
        text: "",
        whatIDid: [],
        tags: [],
        links: { url: "" },
        media: { heroImage: null, videoUrls: [] }
    };
}

function ProjectComposer({ project, onChange, onCancel, onSave, isSaving }) {
    return (
        <div className="adminComposer">
            <h3>Project Composer</h3>

            <div className="adminFieldGrid">
                <TextField
                    label="Title"
                    value={project.title}
                    onChange={(value) =>
                        onChange({
                            ...project,
                            title: value,
                            slug: project.slug || slugify(value)
                        })
                    }
                />

                <TextField
                    label="Slug (URL: /portfolio/:slug)"
                    value={project.slug}
                    onChange={(value) =>
                        onChange({ ...project, slug: slugify(value) })
                    }
                    hint="Automatisch ingevuld op basis van titel, mag aangepast worden."
                />

                <TextField
                    label="Subtitle"
                    value={project.subtitle}
                    onChange={(value) =>
                        onChange({ ...project, subtitle: value })
                    }
                />

                <TextField
                    label="Category"
                    value={project.category}
                    onChange={(value) =>
                        onChange({ ...project, category: value })
                    }
                />

                <TextField
                    label="Client ID"
                    value={project.clientId}
                    onChange={(value) =>
                        onChange({ ...project, clientId: value })
                    }
                    hint="Bv. 'zenimax-media' — wordt geformatteerd naar 'Zenimax Media'."
                />

                <TextField
                    label="Your role"
                    value={project.role}
                    onChange={(value) => onChange({ ...project, role: value })}
                />

                <SelectField
                    label="Type"
                    value={project.type}
                    onChange={(value) => onChange({ ...project, type: value })}
                    options={[
                        { value: "project", label: "Project" },
                        { value: "personal", label: "Personal" }
                    ]}
                />

                <DateField
                    label="Updated at"
                    value={project.updatedAt}
                    onChange={(value) =>
                        onChange({ ...project, updatedAt: value })
                    }
                />
            </div>

            <div className="adminCheckboxRow">
                <CheckboxField
                    label="Published (zichtbaar op de site)"
                    checked={project.published}
                    onChange={(value) =>
                        onChange({ ...project, published: value })
                    }
                />

                <CheckboxField
                    label="Featured (toont in showcase/carousel)"
                    checked={project.featured}
                    onChange={(value) =>
                        onChange({ ...project, featured: value })
                    }
                />
            </div>

            <TextAreaField
                label="Text / description"
                value={project.text}
                onChange={(value) => onChange({ ...project, text: value })}
                rows={4}
            />

            <TagListEditor
                label="Responsibilities (whatIDid)"
                items={project.whatIDid}
                onChange={(value) =>
                    onChange({ ...project, whatIDid: value })
                }
                placeholder="Typ een verantwoordelijkheid en druk Enter..."
            />

            <TagListEditor
                label="Tags"
                items={project.tags}
                onChange={(value) => onChange({ ...project, tags: value })}
                placeholder="Typ een tag en druk Enter..."
            />

            <TextField
                label="External link URL"
                value={project.links?.url}
                onChange={(value) =>
                    onChange({
                        ...project,
                        links: { ...project.links, url: value }
                    })
                }
            />

            <ImageUploadField
                label="Hero image"
                value={project.media?.heroImage}
                onChange={(value) =>
                    onChange({
                        ...project,
                        media: { ...project.media, heroImage: value }
                    })
                }
                folder="portfolio"
            />

            {/* ===== VIDEO URLS ===== */}

            <TagListEditor
                label="Video URLs (YouTube, etc.)"
                items={project.media?.videoUrls}
                onChange={(value) =>
                    onChange({
                        ...project,
                        media: { ...project.media, videoUrls: value }
                    })
                }
                placeholder="Plak een video-URL en druk Enter..."
            />

            <div className="adminComposerActions">
                <button
                    type="button"
                    className="adminPrimaryButton"
                    onClick={onSave}
                    disabled={isSaving}
                >
                    {isSaving ? "Saving..." : "Save project"}
                </button>

                <button
                    type="button"
                    className="adminSecondaryButton"
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

function PortfolioEditor() {
    const { items, setItems, loading, error, refetch } = usePortfolioItems();
    const [editingProject, setEditingProject] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");

    function startNewProject() {
        setEditingProject(createEmptyProject());
    }

    function startEditProject(project) {
        setEditingProject(project);
    }

    function cancelEditing() {
        setEditingProject(null);
    }

    async function saveEditingProject() {
        if (!editingProject.title.trim()) {
            setStatusMessage("Titel is verplicht voordat je kan opslaan.");
            return;
        }

        if (!editingProject.slug.trim()) {
            setStatusMessage("Slug is verplicht voordat je kan opslaan.");
            return;
        }

        setIsSaving(true);
        setStatusMessage("");

        try {
            await savePortfolioItem(editingProject);
            await refetch();
            setEditingProject(null);
            setStatusMessage("Project succesvol opgeslagen!");
        } catch (saveError) {
            setStatusMessage(`Opslaan mislukt: ${saveError.message}`);
        } finally {
            setIsSaving(false);
        }
    }

    async function handleDelete(id) {
        const confirmed = window.confirm(
            "Weet je zeker dat je dit project wilt verwijderen? Dit kan niet ongedaan gemaakt worden."
        );

        if (!confirmed) {
            return;
        }

        try {
            await deletePortfolioItem(id);
            setItems((prev) => prev.filter((item) => item.id !== id));
            setStatusMessage("Project verwijderd.");
        } catch (deleteError) {
            setStatusMessage(`Verwijderen mislukt: ${deleteError.message}`);
        }
    }

    if (loading) {
        return <p className="adminLoadingState">Portfolio-items laden...</p>;
    }

    if (error) {
        return <p className="adminErrorState">Fout bij laden: {error}</p>;
    }

    return (
        <div className="adminEditor">

            <h2 className="adminEditorTitle">Portfolio Editor</h2>
            <p className="adminEditorIntro">
                Beheer hier al je portfolio-items. Wijzigingen worden direct
                naar de database geschreven zodra je op "Save project" of
                "Delete" klikt.
            </p>

            {statusMessage && (
                <p className="adminExportStatus">{statusMessage}</p>
            )}

            {!editingProject && (
                <>
                    <button
                        type="button"
                        className="adminAddButton"
                        onClick={startNewProject}
                    >
                        + Add new project
                    </button>

                    <div className="adminBlogOverviewList">
                        {items.length === 0 && (
                            <p className="adminEmptyHint">
                                Nog geen portfolio-items.
                            </p>
                        )}

                        {items.map((item) => (
                            <div className="adminBlogOverviewItem" key={item.id}>
                                <div className="adminBlogOverviewText">
                                    <span className="adminBlogOverviewCategory">
                                        {item.category || "Uncategorized"}{" "}
                                        {item.published ? "🟢" : "⚪"}{" "}
                                        {item.featured ? "★" : ""}
                                    </span>

                                    <strong>{item.title || "(untitled)"}</strong>

                                    <span className="adminBlogOverviewSubtitle">
                                        {item.subtitle}
                                    </span>
                                </div>

                                <div className="adminBlogOverviewActions">
                                    <button
                                        type="button"
                                        className="adminSmallButton"
                                        onClick={() => startEditProject(item)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        className="adminSmallButtonDanger"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {editingProject && (
                <ProjectComposer
                    project={editingProject}
                    onChange={setEditingProject}
                    onCancel={cancelEditing}
                    onSave={saveEditingProject}
                    isSaving={isSaving}
                />
            )}
        </div>
    );
}

export default PortfolioEditor;
