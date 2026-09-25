import { useState } from "react";
import { useCvData } from "../../hooks/useSupabaseData.js";
import { saveCvData } from "../../utils/supabaseData.js";
import {
    TextField,
    TextAreaField,
    TagListEditor,
    RepeatableListEditor,
    ImageUploadField,
    SaveStatusBar
} from "./AdminFormControls.jsx";

function CvEditor() {
    const { data: profile, setData: setProfile, loading, error } = useCvData();
    const [isSaving, setIsSaving] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");

    function updatePersonal(key, value) {
        setProfile((prev) => ({
            ...prev,
            personal: { ...prev.personal, [key]: value }
        }));
    }

    function updateDescription(key, value) {
        setProfile((prev) => ({
            ...prev,
            description: { ...prev.description, [key]: value }
        }));
    }

    function updateHero(key, value) {
        setProfile((prev) => ({
            ...prev,
            hero: { ...prev.hero, [key]: value }
        }));
    }

    function updateArrayField(key, value) {
        setProfile((prev) => ({ ...prev, [key]: value }));
    }

    async function handleSave() {
        setIsSaving(true);
        setStatusMessage("");

        try {
            await saveCvData(profile);
            setStatusMessage("CV succesvol opgeslagen in de database!");
        } catch (saveError) {
            setStatusMessage(`Opslaan mislukt: ${saveError.message}`);
        } finally {
            setIsSaving(false);
        }
    }

    if (loading) {
        return <p className="adminLoadingState">CV-data laden...</p>;
    }

    if (error) {
        return <p className="adminErrorState">Fout bij laden: {error}</p>;
    }

    if (!profile) {
        return (
            <p className="adminErrorState">
                Geen CV-data gevonden. Heb je de migratie (stap 10) al
                uitgevoerd?
            </p>
        );
    }

    return (
        <div className="adminEditor">

            <h2 className="adminEditorTitle">CV Editor</h2>
            <p className="adminEditorIntro">
                Bewerk hier je volledige CV-data. Klik onderaan op "Save to
                database" om de wijzigingen direct live te zetten.
            </p>

            {/* ===== PERSONAL ===== */}

            <section className="adminSection">
                <h3>Personal Info</h3>

                <div className="adminFieldGrid">
                    <TextField
                        label="Name"
                        value={profile.personal.name}
                        onChange={(value) => updatePersonal("name", value)}
                    />

                    <TextField
                        label="Title"
                        value={profile.personal.title}
                        onChange={(value) => updatePersonal("title", value)}
                    />

                    <TextField
                        label="Subtitle"
                        value={profile.personal.subtitle}
                        onChange={(value) => updatePersonal("subtitle", value)}
                    />

                    <TextField
                        label="Location"
                        value={profile.personal.location}
                        onChange={(value) => updatePersonal("location", value)}
                    />

                    <TextField
                        label="Phone"
                        value={profile.personal.phone}
                        onChange={(value) => updatePersonal("phone", value)}
                    />

                    <TextField
                        label="Email"
                        value={profile.personal.email}
                        onChange={(value) => updatePersonal("email", value)}
                    />

                    <TextField
                        label="LinkedIn URL"
                        value={profile.personal.linkedin}
                        onChange={(value) =>
                            updatePersonal("linkedin", value)
                        }
                    />
                </div>
            </section>

            {/* ===== SUMMARY / ABOUT ===== */}

            <section className="adminSection">
                <h3>Summary &amp; About</h3>

                <TextAreaField
                    label="Summary (shown on CV export & About page)"
                    value={profile.description.summary}
                    onChange={(value) => updateDescription("summary", value)}
                    rows={7}
                />

                <TextAreaField
                    label="About (personal background story)"
                    value={profile.description.about}
                    onChange={(value) => updateDescription("about", value)}
                    rows={7}
                />
            </section>

            {/* ===== VALUES ===== */}

            <section className="adminSection">
                <h3>Core Values</h3>

                <RepeatableListEditor
                    items={profile.description.values}
                    onChange={(value) => updateDescription("values", value)}
                    createEmptyItem={() => ({
                        core: "",
                        philosophy: "",
                        icon: null
                    })}
                    renderSummary={(item) => item.core || "(untitled value)"}
                    renderFields={(item, update) => (
                        <>
                            <TextField
                                label="Core value title"
                                value={item.core}
                                onChange={(value) =>
                                    update({ ...item, core: value })
                                }
                            />

                            <TextAreaField
                                label="Philosophy"
                                value={item.philosophy}
                                onChange={(value) =>
                                    update({ ...item, philosophy: value })
                                }
                                rows={3}
                            />

                            <ImageUploadField
                                label="Icon"
                                value={item.icon}
                                onChange={(value) =>
                                    update({ ...item, icon: value })
                                }
                                folder="cv-icons"
                                hint="Upload een klein icoon (PNG met transparante achtergrond werkt het best)."
                            />
                        </>
                    )}
                    addLabel="+ Add value"
                />
            </section>

            {/* ===== HERO STATS ===== */}

            <section className="adminSection">
                <h3>Hero Stats</h3>

                <RepeatableListEditor
                    items={profile.hero.stats}
                    onChange={(value) => updateHero("stats", value)}
                    createEmptyItem={() => ({ value: "", label: "" })}
                    renderSummary={(item) =>
                        `${item.value || "?"} — ${item.label || "(no label)"}`
                    }
                    renderFields={(item, update) => (
                        <>
                            <TextField
                                label="Value (e.g. 50+, 97%)"
                                value={item.value}
                                onChange={(value) =>
                                    update({ ...item, value })
                                }
                            />

                            <TextField
                                label="Label"
                                value={item.label}
                                onChange={(value) =>
                                    update({ ...item, label: value })
                                }
                            />
                        </>
                    )}
                    addLabel="+ Add stat"
                />
            </section>

            {/* ===== EXPERIENCE ===== */}

            <section className="adminSection">
                <h3>Experience</h3>
                <p className="adminSectionHint">
                    De volgorde hier bepaalt de volgorde in je CV-export
                    (meest recente bovenaan). Gebruik de pijltjes om te
                    herschikken.
                </p>

                <RepeatableListEditor
                    items={profile.experience}
                    onChange={(value) => updateArrayField("experience", value)}
                    createEmptyItem={() => ({
                        id: Date.now(),
                        role: "",
                        company: "",
                        location: "",
                        period: "",
                        highlights: []
                    })}
                    renderSummary={(item) =>
                        `${item.role || "(role)"} @ ${item.company || "(company)"} — ${item.period || ""}`
                    }
                    renderFields={(item, update) => (
                        <>
                            <TextField
                                label="Role"
                                value={item.role}
                                onChange={(value) =>
                                    update({ ...item, role: value })
                                }
                            />

                            <TextField
                                label="Company"
                                value={item.company}
                                onChange={(value) =>
                                    update({ ...item, company: value })
                                }
                            />

                            <TextField
                                label="Location"
                                value={item.location}
                                onChange={(value) =>
                                    update({ ...item, location: value })
                                }
                            />

                            <TextField
                                label="Period (e.g. 2023 - 2025)"
                                value={item.period}
                                onChange={(value) =>
                                    update({ ...item, period: value })
                                }
                            />

                            <TagListEditor
                                label="Highlights"
                                items={item.highlights}
                                onChange={(value) =>
                                    update({ ...item, highlights: value })
                                }
                                placeholder="Typ een highlight en druk Enter..."
                            />
                        </>
                    )}
                    addLabel="+ Add experience"
                />
            </section>

            {/* ===== SERVICES ===== */}

            <section className="adminSection">
                <h3>Services</h3>

                <RepeatableListEditor
                    items={profile.services}
                    onChange={(value) => updateArrayField("services", value)}
                    createEmptyItem={() => ({ title: "", description: "" })}
                    renderSummary={(item) => item.title || "(untitled service)"}
                    renderFields={(item, update) => (
                        <>
                            <TextField
                                label="Title"
                                value={item.title}
                                onChange={(value) =>
                                    update({ ...item, title: value })
                                }
                            />

                            <TextAreaField
                                label="Description"
                                value={item.description}
                                onChange={(value) =>
                                    update({ ...item, description: value })
                                }
                                rows={3}
                            />
                        </>
                    )}
                    addLabel="+ Add service"
                />
            </section>

            {/* ===== CV PROJECTS (los van portfolio) ===== */}

            <section className="adminSection">
                <h3>CV Projects (case studies)</h3>
                <p className="adminSectionHint">
                    Dit zijn losstaande projectvermeldingen binnen je CV, niet
                    hetzelfde als je portfolio-items.
                </p>

                <RepeatableListEditor
                    items={profile.projects}
                    onChange={(value) => updateArrayField("projects", value)}
                    createEmptyItem={() => ({
                        id: Date.now(),
                        title: "",
                        client: "",
                        category: "",
                        description: "",
                        impact: ""
                    })}
                    renderSummary={(item) =>
                        `${item.title || "(untitled)"} — ${item.client || ""}`
                    }
                    renderFields={(item, update) => (
                        <>
                            <TextField
                                label="Title"
                                value={item.title}
                                onChange={(value) =>
                                    update({ ...item, title: value })
                                }
                            />

                            <TextField
                                label="Client"
                                value={item.client}
                                onChange={(value) =>
                                    update({ ...item, client: value })
                                }
                            />

                            <TextField
                                label="Category"
                                value={item.category}
                                onChange={(value) =>
                                    update({ ...item, category: value })
                                }
                            />

                            <TextAreaField
                                label="Description"
                                value={item.description}
                                onChange={(value) =>
                                    update({ ...item, description: value })
                                }
                                rows={3}
                            />

                            <TextField
                                label="Impact"
                                value={item.impact}
                                onChange={(value) =>
                                    update({ ...item, impact: value })
                                }
                            />
                        </>
                    )}
                    addLabel="+ Add CV project"
                />
            </section>

            {/* ===== SKILLS ===== */}

            <section className="adminSection">
                <h3>Skills</h3>

                <TagListEditor
                    label="Hard Skills"
                    items={profile.hardSkills}
                    onChange={(value) => updateArrayField("hardSkills", value)}
                />

                <TagListEditor
                    label="Audio Skills"
                    items={profile.audioSkills}
                    onChange={(value) =>
                        updateArrayField("audioSkills", value)
                    }
                />

                <TagListEditor
                    label="Soft Skills"
                    items={profile.softSkills}
                    onChange={(value) => updateArrayField("softSkills", value)}
                />

                <TagListEditor
                    label="Programming Languages"
                    items={profile.programmingLanguages}
                    onChange={(value) =>
                        updateArrayField("programmingLanguages", value)
                    }
                />
            </section>

            {/* ===== EDUCATION ===== */}

            <section className="adminSection">
                <h3>Education</h3>

                <RepeatableListEditor
                    items={profile.education}
                    onChange={(value) => updateArrayField("education", value)}
                    createEmptyItem={() => ({
                        school: "",
                        field: "",
                        degree: "",
                        period: ""
                    })}
                    renderSummary={(item) =>
                        `${item.school || "(school)"} — ${item.field || ""}`
                    }
                    renderFields={(item, update) => (
                        <>
                            <TextField
                                label="School"
                                value={item.school}
                                onChange={(value) =>
                                    update({ ...item, school: value })
                                }
                            />

                            <TextField
                                label="Field of study"
                                value={item.field}
                                onChange={(value) =>
                                    update({ ...item, field: value })
                                }
                            />

                            <TextField
                                label="Degree"
                                value={item.degree}
                                onChange={(value) =>
                                    update({ ...item, degree: value })
                                }
                            />

                            <TextField
                                label="Period"
                                value={item.period}
                                onChange={(value) =>
                                    update({ ...item, period: value })
                                }
                            />
                        </>
                    )}
                    addLabel="+ Add education"
                />
            </section>

            {/* ===== PROF. DEVELOPMENT ===== */}

            <section className="adminSection">
                <h3>Professional Development</h3>

                <RepeatableListEditor
                    items={profile.development}
                    onChange={(value) =>
                        updateArrayField("development", value)
                    }
                    createEmptyItem={() => ({ title: "", issuer: "", year: "" })}
                    renderSummary={(item) =>
                        `${item.title || "(title)"} — ${item.issuer || ""} (${item.year || ""})`
                    }
                    renderFields={(item, update) => (
                        <>
                            <TextField
                                label="Title"
                                value={item.title}
                                onChange={(value) =>
                                    update({ ...item, title: value })
                                }
                            />

                            <TextField
                                label="Issuer"
                                value={item.issuer}
                                onChange={(value) =>
                                    update({ ...item, issuer: value })
                                }
                            />

                            <TextField
                                label="Year"
                                value={item.year}
                                onChange={(value) =>
                                    update({ ...item, year: value })
                                }
                            />
                        </>
                    )}
                    addLabel="+ Add training"
                />
            </section>

            {/* ===== CERTIFICATIONS ===== */}

            <section className="adminSection">
                <h3>Certifications</h3>

                <RepeatableListEditor
                    items={profile.certifications}
                    onChange={(value) =>
                        updateArrayField("certifications", value)
                    }
                    createEmptyItem={() => ({ title: "", issuer: "", year: "" })}
                    renderSummary={(item) =>
                        `${item.title || "(title)"} — ${item.issuer || ""} (${item.year || ""})`
                    }
                    renderFields={(item, update) => (
                        <>
                            <TextField
                                label="Title"
                                value={item.title}
                                onChange={(value) =>
                                    update({ ...item, title: value })
                                }
                            />

                            <TextField
                                label="Issuer"
                                value={item.issuer}
                                onChange={(value) =>
                                    update({ ...item, issuer: value })
                                }
                            />

                            <TextField
                                label="Year"
                                value={item.year}
                                onChange={(value) =>
                                    update({ ...item, year: value })
                                }
                            />
                        </>
                    )}
                    addLabel="+ Add certification"
                />
            </section>

            <SaveStatusBar
                label="AboutFulldata (CV)"
                onSave={handleSave}
                isSaving={isSaving}
                statusMessage={statusMessage}
            />
        </div>
    );
}

export default CvEditor;
