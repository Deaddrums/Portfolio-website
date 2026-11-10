import { useState } from "react";
import './ContactSectionPortfolio.css'

// Moet exact overeenkomen met de name van het formulier in public/__forms.html
const FORM_NAME = "contact";

const EMPTY_FORM = {
    name: "",
    email: "",
    message: "",
    "bot-field": "", // honeypot: mensen zien dit veld niet, spambots vullen het wel in
};

// Netlify Forms accepteert alleen URL-encoded data (geen JSON)
function encode(data) {
    return new URLSearchParams(data).toString();
}

function ContactSectionPortfolio() {

    const [formData, setFormData] = useState(EMPTY_FORM);

    // "idle" | "sending" | "success" | "error"
    const [status, setStatus] = useState("idle");

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((current) => ({ ...current, [name]: value }));

        // Na een melding bij het typen weer netjes terug naar de beginstand
        if (status === "success" || status === "error") {
            setStatus("idle");
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (status === "sending") {
            return;
        }

        setStatus("sending");

        try {
            const response = await fetch("/__forms.html", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: encode({
                    "form-name": FORM_NAME,
                    ...formData,
                }),
            });

            if (!response.ok) {
                throw new Error(`Form submit failed with status ${response.status}`);
            }

            setFormData(EMPTY_FORM);
            setStatus("success");
        } catch (error) {
            console.error("Contact form could not be sent:", error);
            setStatus("error");
        }
    }

    const isSending = status === "sending";

    return <>

        <div
            className="contactOuterWrapper"
        >

            <div
                className="contactInnerWrapper"
            >

                <article
                    className="contactArticle"
                >
                    <form
                        className="contactForm"
                        name={FORM_NAME}
                        method="POST"
                        onSubmit={handleSubmit}
                    >

                        {/* Hoort bij Netlify Forms */}
                        <input type="hidden" name="form-name" value={FORM_NAME} />

                        <h3>I'd love to hear more from you!</h3>
                        <h4>
                            <em>Grabbing a coffee </em>
                            or a tea, but just getting to know people and expanding my network is so much fun
                        </h4>
                        <p>
                            If you want to reach out to me, feel free to send me a message in the form down
                            below!
                        </p>

                        {/* Honeypot: onzichtbaar voor mensen */}
                        <div className="contactHoneypot" aria-hidden="true">
                            <label>
                                Don't fill this out if you're human
                                <input
                                    type="text"
                                    name="bot-field"
                                    tabIndex={-1}
                                    autoComplete="off"
                                    value={formData["bot-field"]}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>

                        <div className="contactGrid">

                            <div className="inputGroup">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder=" "
                                    autoComplete="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="name">Full Name</label>
                            </div>

                            <div className="inputGroup">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder=" "
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="email">Email Address</label>
                            </div>

                        </div>

                        <div className="inputGroup">
                            <textarea
                                id="message"
                                name="message"
                                placeholder=" "
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="message">
                                Send me your details
                            </label>
                        </div>

                        <button
                            className="submitButton"
                            type="submit"
                            disabled={isSending}
                        >
                            <span>{isSending ? "Sending..." : "Submit"}</span>
                            <span className="arrow">
                                →
                            </span>
                        </button>

                        {status === "success" && (
                            <p className="contactStatus contactStatusSuccess" role="status">
                                Thank you! Your message has been sent. I'll get back to you soon.
                            </p>
                        )}

                        {status === "error" && (
                            <p className="contactStatus contactStatusError" role="alert">
                                Something went wrong while sending your message. Please try again,
                                or email me directly at{" "}
                                <a href="mailto:jimhorvath@live.nl">jimhorvath@live.nl</a>.
                            </p>
                        )}

                    </form>

                </article>
            </div>

        </div>

    </>

}

export default ContactSectionPortfolio
