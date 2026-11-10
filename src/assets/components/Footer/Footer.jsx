import './Footer.css'
import fb from './../../images/icons/SocialMediaIcons/icons8-facebook-50.png'
import insta from './../../images/icons/SocialMediaIcons/icons8-instagram-50.png'
import link from './../../images/icons/SocialMediaIcons/icons8-linkedin-50.png'
import app from './../../images/icons/SocialMediaIcons/icons8-whatsapp-50.png'
import yt from './../../images/icons/SocialMediaIcons/icons8-youtube-50.png'
import git from './../../images/icons/SocialMediaIcons/icons8-github-50.png'

import { useState } from "react";

function Footer() {

    const socials = [
        { name: "Facebook",  icon: fb,    url: "https://www.facebook.com/jim.horvath.39/" },
        { name: "Instagram", icon: insta, url: "https://www.instagram.com/deaddrums/" },
        { name: "LinkedIn",  icon: link,  url: "https://www.linkedin.com/in/jim-horvath-/" },
        { name: "WhatsApp",  icon: app,   url: "" },
        { name: "YouTube",   icon: yt,    url: "https://www.youtube.com/@deaddrums" },
        { name: "GitHub",    icon: git,   url: "https://github.com/Deaddrums" },
    ]
    const [isOpen, toggleIsOpen] = useState(false)

    return <>

        <div
            className="footerOuterWrapper"
        >

            <div
                className="footerGradientBar"
            >

                <p>
                    <strong>
                        © Jim Horvath
                    </strong>
                </p>

                <p>
                    this site is made by humans
                </p>

                <div className="footerGradientContent">

                    <div className="footerSocials">

                        {socials.map((social) => (

                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.name}
                                className="socialMediaLink"
                            >
                                <img
                                    src={social.icon}
                                    alt={social.name}
                                    className="socialMediaIcons"
                                />
                            </a>

                        ))}

                    </div>

                </div>

                <button
                    className={`footerToggle ${isOpen ? 'open' : ''}`}
                    onClick={() => toggleIsOpen(!isOpen)}
                >
                    &gt;
                </button>

            </div>

            <div
                className={`footerDropDownMenu ${isOpen ? 'open' : ''}`}
            >
                <div className="footerCredits">

                    <h3>Credits</h3>

                    <div className="footerCreditsGrid">

                        <div className="creditRow">
                            <span className="creditName">Jim Horvath</span>
                            <span className="creditRole">Front-End Programming</span>
                        </div>

                        <div className="creditRow">
                            <span className="creditName">Olivier van der Schilde</span>
                            <span className="creditRole">Front-End Programming</span>
                        </div>

                        <div className="creditRow">
                            <span className="creditName">Martijn Horvath</span>
                            <span className="creditRole">Marketing &amp; Dutch Copy</span>
                        </div>

                        <div className="creditRow">
                            <span className="creditName">Fay MacCorquodale-Smith</span>
                            <span className="creditRole">English Translation</span>
                        </div>

                    </div>

                </div>

            </div>

        </div>

    </>

}

export default Footer
