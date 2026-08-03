import './ClientImageMover.css'
import './TrustedBy.css';
import sony from '../../images/Clients/PlayStation_Icon.png'
import dreamhaven from '../../images/Clients/Dreamhaven-Logo-Dark-Thumb-Square.png'
import bethesda from '../../images/Clients/bethesda-game-studios-logo.png'
import nep from '../../images/Clients/689103b3747ce241534d57d1_White_NEP_Group_Logo.png'
import zenimax from '../../images/Clients/zenimax-lllogo.jpg'
import xbox from '../../images/Clients/Xbox_Game_Studios_logotype.png'

const clientLogos = [
    sony,
    bethesda,
    dreamhaven,
    nep,
    zenimax,
    xbox,
];

export default function ClientImageMover() {
    const duplicatedLogos = [...clientLogos, ...clientLogos];

    return (
        <div className="carouselContainer">
            <div className="carouselTrack">
                {duplicatedLogos.map((logo, index) => (
                    <img
                        key={index}
                        src={logo}
                        alt="Client logo"
                        className="clientLogo"
                    />
                ))}
            </div>
        </div>
    );
}



export function TrustedBy() {
    return (
        <section className="trustedBy">

            <p className="trustedByTitle">
                TRUSTED BY INDUSTRY LEADERS
            </p>

            <div className="trustedByRow">

                {clientLogos.map((logo, index) => (
                    <img
                        key={index}
                        src={logo}
                        alt="Client logo"
                        className="clientLogo"
                    />
                ))}

            </div>

        </section>
    );
}