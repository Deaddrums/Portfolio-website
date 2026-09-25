import { useState } from "react";
import { useBlogPosts } from "../../hooks/useSupabaseData.js";
import { saveBlogPost, deleteBlogPost } from "../../utils/supabaseData.js";
import { slugify, generateId } from "../../utils/jsModuleSerializer.js";
import {
    TextField,
    TextAreaField,
    TagListEditor,
    DateField,
    ImageUploadField,
    RepeatableListEditor
} from "./AdminFormControls.jsx";

const CONTENT_BLOCK_TYPES = [
    { value: "paragraph", label: "Paragraph" },
    { value: "heading", label: "Heading" },
    { value: "quote", label: "Quote" },
    { value: "list", label: "List" }
];

function createEmptyBlogPost() {
    const today = new Date().toISOString().slice(0, 10);

    return {
        id: generateId("post"),
        category: "",
        title: "",
        subtitle: "",
        content: [{ type: "paragraph", style: "lead", text: "" }],
        media: { heroImage: null, videoUrl: "" },
        links: [],
        seo: { metaTitle: "", metaDescription: "", keywords: [] },
        createdAt: today
    };
}

function ContentBlockFields({ block, onUpdate }) {
    return (
        <div className="adminContentBlock">
            <div className="adminFieldGrid">
                <label className="adminField">
                    <span className="adminFieldLabel">Block type</span>

                    <select
                        className="adminInput"
                        value={block.type}
                        onChange={(event) => {
                            const newType = event.target.value;

                            if (newType === "list") {
                                onUpdate({ type: newType, items: block.items || [] });
                            } else {
                                onUpdate({
                                    type: newType,
                                    text: block.text || "",
                                    style: block.style
                                });
                            }
                        }}
                    >
                        {CONTENT_BLOCK_TYPES.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            {block.type === "paragraph" && (
                <>
                    <TextAreaField
                        label="Paragraph text"
                        value={block.text}
                        onChange={(value) =>
                            onUpdate({ ...block, text: value })
                        }
                        rows={4}
                    />

                    <label className="adminCheckboxField">
                        <input
                            type="checkbox"
                            checked={block.style === "lead"}
                            onChange={(event) =>
                                onUpdate({
                                    ...block,
                                    style: event.target.checked
                                        ? "lead"
                                        : undefined
                                })
                            }
                        />
                        <span>Lead paragraph (grotere, uitgelichte tekst)</span>
                    </label>
                </>
            )}

            {block.type === "heading" && (
                <TextField
                    label="Heading text"
                    value={block.text}
                    onChange={(value) => onUpdate({ ...block, text: value })}
                />
            )}

            {block.type === "quote" && (
                <TextAreaField
                    label="Quote text"
                    value={block.text}
                    onChange={(value) => onUpdate({ ...block, text: value })}
                    rows={3}
                />
            )}

            {block.type === "list" && (
                <TagListEditor
                    label="List items"
                    items={block.items}
                    onChange={(value) => onUpdate({ ...block, items: value })}
                    placeholder="Typ een lijst-item en druk Enter..."
                />
            )}
        </div>
    );
}

function BlogComposer({ post, onChange, onCancel, onSave, isSaving }) {
    function updateField(key, value) {
        onChange({ ...post, [key]: value });
    }

    function updateMedia(key, value) {
        onChange({ ...post, media: { ...post.media, [key]: value } });
    }

    function updateSeo(key, value) {
        onChange({ ...post, seo: { ...post.seo, [key]: value } });
    }

    return (
        <div className="adminComposer">
            <h3>Blog Composer</h3>

            <div className="adminFieldGrid">
                <TextField
                    label="Title"
                    value={post.title}
                    onChange={(value) =>
                        onChange({
                            ...post,
                            title: value,
                            id: post.id.startsWith("post-")
                                ? post.id
                                : post.id
                        })
                    }
                />

                <TextField
                    label="Slug / ID (used in URLs)"
                    value={post.id}
                    onChange={(value) => updateField("id", slugify(value))}
                    hint="Wordt gebruikt als unieke identifier, bv. in /blog/:id"
                />

                <TextField
                    label="Category"
                    value={post.category}
                    onChange={(value) => updateField("category", value)}
                />

                <DateField
                    label="Created at"
                    value={post.createdAt}
                    onChange={(value) => updateField("createdAt", value)}
                />
            </div>

            <TextField
                label="Subtitle"
                value={post.subtitle}
                onChange={(value) => updateField("subtitle", value)}
            />

            <h4 className="adminSubheading">Content blocks</h4>
            <p className="adminSectionHint">
                Bouw je blogtekst op uit blokken. Gebruik "Paragraph" voor
                normale tekst (vink "Lead" aan voor een uitgelichte
                openingsalinea), "Heading" voor subkopjes, "Quote" voor
                een uitgelichte quote, en "List" voor een opsomming.
            </p>

            <RepeatableListEditor
                items={post.content}
                onChange={(value) => updateField("content", value)}
                createEmptyItem={() => ({ type: "paragraph", text: "" })}
                renderSummary={(block) => {
                    const preview =
                        block.type === "list"
                            ? (block.items || []).join(", ")
                            : block.text;

                    return `[${block.type}] ${
                        (preview || "").slice(0, 60) || "(empty)"
                    }`;
                }}
                renderFields={(block, update) => (
                    <ContentBlockFields block={block} onUpdate={update} />
                )}
                addLabel="+ Add content block"
                emptyLabel="Nog geen content-blokken."
            />

            <h4 className="adminSubheading">Media</h4>

            <ImageUploadField
                label="Hero image"
                value={post.media?.heroImage}
                onChange={(value) => updateMedia("heroImage", value)}
                folder="blog"
            />

            <TextField
                label="Video URL (optioneel, voor afspelen op de site)"
                value={post.media?.videoUrl}
                onChange={(value) => updateMedia("videoUrl", value)}
                placeholder="https://..."
                hint="Dit blijft een gewone link, geen upload nodig."
            />

            <h4 className="adminSubheading">Related links</h4>

            <RepeatableListEditor
                items={post.links}
                onChange={(value) => updateField("links", value)}
                createEmptyItem={() => ({ label: "", url: "" })}
                renderSummary={(link) =>
                    `${link.label || "(label)"} → ${link.url || "(url)"}`
                }
                renderFields={(link, update) => (
                    <>
                        <TextField
                            label="Label"
                            value={link.label}
                            onChange={(value) =>
                                update({ ...link, label: value })
                            }
                        />

                        <TextField
                            label="URL"
                            value={link.url}
                            onChange={(value) =>
                                update({ ...link, url: value })
                            }
                        />
                    </>
                )}
                addLabel="+ Add link"
                emptyLabel="Geen links toegevoegd."
            />

            <h4 className="adminSubheading">SEO</h4>

            <TextField
                label="Meta title"
                value={post.seo?.metaTitle}
                onChange={(value) => updateSeo("metaTitle", value)}
            />

            <TextAreaField
                label="Meta description"
                value={post.seo?.metaDescription}
                onChange={(value) => updateSeo("metaDescription", value)}
                rows={3}
            />

            <TagListEditor
                label="Keywords"
                items={post.seo?.keywords}
                onChange={(value) => updateSeo("keywords", value)}
                placeholder="Typ een keyword en druk Enter..."
            />

            <div className="adminComposerActions">
                <button
                    type="button"
                    className="adminPrimaryButton"
                    onClick={onSave}
                    disabled={isSaving}
                >
                    {isSaving ? "Saving..." : "Save post"}
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

function BlogEditor() {
    const { posts, setPosts, loading, error, refetch } = useBlogPosts();
    const [editingPost, setEditingPost] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");

    function startNewPost() {
        setEditingPost(createEmptyBlogPost());
    }

    function startEditPost(post) {
        setEditingPost(post);
    }

    function cancelEditing() {
        setEditingPost(null);
    }

    async function saveEditingPost() {
        if (!editingPost.title.trim()) {
            setStatusMessage("Titel is verplicht voordat je kan opslaan.");
            return;
        }

        setIsSaving(true);
        setStatusMessage("");

        try {
            await saveBlogPost(editingPost);
            await refetch();
            setEditingPost(null);
            setStatusMessage("Post succesvol opgeslagen!");
        } catch (saveError) {
            setStatusMessage(`Opslaan mislukt: ${saveError.message}`);
        } finally {
            setIsSaving(false);
        }
    }

    async function handleDelete(id) {
        const confirmed = window.confirm(
            "Weet je zeker dat je deze post wilt verwijderen? Dit kan niet ongedaan gemaakt worden."
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteBlogPost(id);
            setPosts((prev) => prev.filter((post) => post.id !== id));
            setStatusMessage("Post verwijderd.");
        } catch (deleteError) {
            setStatusMessage(`Verwijderen mislukt: ${deleteError.message}`);
        }
    }

    if (loading) {
        return <p className="adminLoadingState">Blogposts laden...</p>;
    }

    if (error) {
        return <p className="adminErrorState">Fout bij laden: {error}</p>;
    }

    return (
        <div className="adminEditor">

            <h2 className="adminEditorTitle">Blog Editor</h2>
            <p className="adminEditorIntro">
                Schrijf nieuwe blogposts of pas bestaande aan. Wijzigingen
                worden direct naar de database geschreven zodra je op "Save
                post" of "Delete" klikt.
            </p>

            {statusMessage && (
                <p className="adminExportStatus">{statusMessage}</p>
            )}

            {!editingPost && (
                <>
                    <button
                        type="button"
                        className="adminAddButton"
                        onClick={startNewPost}
                    >
                        + Write new blog post
                    </button>

                    <h3 className="adminSubheading">
                        Existing posts ({posts.length})
                    </h3>

                    <div className="adminBlogOverviewList">
                        {posts.length === 0 && (
                            <p className="adminEmptyHint">
                                Nog geen blogposts geschreven.
                            </p>
                        )}

                        {posts.map((post) => (
                            <div className="adminBlogOverviewItem" key={post.id}>
                                <div className="adminBlogOverviewText">
                                    <span className="adminBlogOverviewCategory">
                                        {post.category || "Uncategorized"}
                                    </span>

                                    <strong>{post.title || "(untitled)"}</strong>

                                    <span className="adminBlogOverviewSubtitle">
                                        {post.subtitle}
                                    </span>

                                    <span className="adminBlogOverviewDate">
                                        {post.createdAt}
                                    </span>
                                </div>

                                <div className="adminBlogOverviewActions">
                                    <button
                                        type="button"
                                        className="adminSmallButton"
                                        onClick={() => startEditPost(post)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        className="adminSmallButtonDanger"
                                        onClick={() => handleDelete(post.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {editingPost && (
                <BlogComposer
                    post={editingPost}
                    onChange={setEditingPost}
                    onCancel={cancelEditing}
                    onSave={saveEditingPost}
                    isSaving={isSaving}
                />
            )}
        </div>
    );
}

export default BlogEditor;
