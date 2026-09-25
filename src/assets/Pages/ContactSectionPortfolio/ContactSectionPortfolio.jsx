import './ContactSectionPortfolio.css'

function ContactSectionPortfolio() {


    return <>

        <div
            className="contactOuterWrapper"
        >

            <div
                className="contactInnerWrapper"
            >

                {/*<div*/}
                {/*    className="contactInfo"*/}
                {/*>*/}
                {/*    <h1>*/}
                {/*        Let's build <span>something worth <u>remembering</u></span>*/}
                {/*    </h1>*/}

                {/*    <h4>*/}
                {/*        Whether you work with a massive studio, a global music act, creative content creator, or just starting out on your endeavour,*/}
                {/*        I cherish the opportunity to work with you.*/}
                {/*        <p>collaborations with organizations big and small that value balance between high*/}
                {/*            standards and creative bravery.</p>*/}
                {/*    </h4>*/}
                {/*</div>*/}

                <article
                    className="contactArticle"
                >
                    <form className="contactForm">

                        <h3>I'd love to hear more from you!</h3>
                        <h4>
                            <em>Grabbing a coffee </em>
                            or a tea, but just getting to know people and expanding my network is so much fun
                        </h4>
                        <p>please click the button bellow to tell me more about your project, wishes, philosophy and
                            more</p>
                        {/*<button>Tell me more about your project</button>*/}
                        <p>And if you just want to reach out me, feel free to send me a message in the form down
                            below!</p>


                        <div className="contactGrid">

                            <div className="inputGroup">
                                <input
                                    type="text"
                                    id="name"
                                    placeholder=" "
                                    required
                                />
                                <label htmlFor="name">Full Name</label>
                            </div>

                            <div className="inputGroup">
                                <input
                                    type="email"
                                    id="email"
                                    placeholder=" "
                                    required
                                />
                                <label htmlFor="email">Email Address</label>
                            </div>

                        </div>

                        {/*<div className="inputGroup">*/}
                        {/*    <select id="service" defaultValue="">*/}
                        {/*        <option value="" disabled*/}
                        {/*                className="contactOptionText"*/}
                        {/*        >*/}
                        {/*            Interested in...*/}
                        {/*        </option>*/}

                        {/*        <option>Frontend Development</option>*/}
                        {/*        <option>Product Management</option>*/}
                        {/*        <option>Audio Design</option>*/}
                        {/*        <option>Full Enneagram Strategy</option>*/}
                        {/*    </select>*/}

                        {/*    <label htmlFor="service">*/}
                        {/*        Service Category*/}
                        {/*    </label>*/}
                        {/*</div>*/}

                        <div className="inputGroup">
                    <textarea
                        id="message"
                        placeholder=" "
                        rows="5"
                    />

                            <label htmlFor="message">
                                Send me your details
                            </label>
                        </div>

                        <button
                            className="submitButton"
                            type="submit"
                        >
                            <span>Submit</span>
                            <span className="arrow">
                    →
                    </span>
                        </button>

                    </form>


                </article>
            </div>

        </div>

    </>

}

export default ContactSectionPortfolio