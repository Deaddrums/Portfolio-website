import './Footer.css'
import fb from './../../images/icons/SocialMediaIcons/icons8-facebook-50.png'
import insta from './../../images/icons/SocialMediaIcons/icons8-instagram-50.png'
import link from './../../images/icons/SocialMediaIcons/icons8-linkedin-50.png'
import app from './../../images/icons/SocialMediaIcons/icons8-whatsapp-50.png'
import mess from './../../images/icons/SocialMediaIcons/icons8-facebook-messenger-50.png'
import yt from './../../images/icons/SocialMediaIcons/icons8-youtube-50.png'
import git from './../../images/icons/SocialMediaIcons/icons8-github-50.png'

import { useState } from "react";

function Footer() {

    const icons = [
        fb,
        insta,
        link,
        app,
        mess,
        yt,
        git
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

                        {icons.map((icons, index) => (

                            <img
                                key={index}
                                src={icons}
                                alt="Social media icons"
                                className="socialMediaIcons"
                            />

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
                            <span className="creditRole">Marketing & Dutch Copy</span>
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