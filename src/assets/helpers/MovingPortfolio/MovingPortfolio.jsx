import { useEffect, useState } from 'react';
import './MovingPortfolio.css';

import dream from './../../images/Clients/dreamhaven.jpg';
import beth from './../../images/Clients/32-324256_product-bethesda-logo-png.png';
import lh from './../../images/Clients/localheroes_clean.webp';
import nep from './../../images/Clients/LOGO-NEP.png';
import pg from './../../images/Clients/playground.png';
import ubi from './../../images/Clients/Ubisoft_logo.svg.webp';
import wb from './../../images/Clients/Warner_Bros._Games_Dec-2023_(without_wordmark).svg';
import xbox from './../../images/Clients/Xbox_Game_Studios.svg';
import zeni from './../../images/Clients/zenimax-lllogo.jpg';
import ps from './../../images/Clients/playstation-3-logo-png-transparent.png';

import baneOfTheTalebearer from './../../images/Showcase materials/Bane of the talebearer.jpg';
import barbearians from './../../images/Showcase materials/Barbeardians.jpg';
import benBorrill from './../../images/Showcase materials/Ben Borrill.jpg';
import binnensteBuiten from './../../images/Showcase materials/BinnensteBuiten.jpg';
import brommerOpZee from './../../images/Showcase materials/brommer op zee.png';
import ditIsDeKwestie from './../../images/Showcase materials/dit is de kwestie.png';
import dreamSchool from './../../images/Showcase materials/DreamSchool.jpg';
import eigenHuisEnTuin from './../../images/Showcase materials/Eigen huis en tuin.webp';
import hogwartsLegacy from './../../images/Showcase materials/Hogwarts Legacy.jpg';
import horizonForbiddenWest from './../../images/Showcase materials/Horizon forbidden west.jpg';
import kkdDivisie from './../../images/Showcase materials/KKD divisie.jpg';
import lantre from './../../images/Showcase materials/Lantre.png';
import lauriefish from './../../images/Showcase materials/Lauriefish.jpg';
import legoHorizon from './../../images/Showcase materials/Lego Horizon.jpg';
import levendleed from './../../images/Showcase materials/Levendleed.jpg';
import loyalty from './../../images/Showcase materials/Loyalty.jpg';
import mk1 from './../../images/Showcase materials/MK1.png';
import mk1Khaos from './../../images/Showcase materials/MK1-Khaos.jpg';
import obskvvr from './../../images/Showcase materials/OBSKVVR.jpg';
import screenshot from './../../images/Showcase materials/Screenshot 2025-09-08 at 15.00.59.png';
import sunderfolk from './../../images/Showcase materials/Sunderfolk.jpg';
import wildgate from './../../images/Showcase materials/Wildgate.jpg';

const clientLogos = [
    dream,
    beth,
    lh,
    nep,
    pg,
    ubi,
    wb,
    xbox,
    zeni,
    ps,
];

const showcaseLogos = [
    baneOfTheTalebearer,
    barbearians,
    benBorrill,
    binnensteBuiten,
    brommerOpZee,
    ditIsDeKwestie,
    dreamSchool,
    eigenHuisEnTuin,
    hogwartsLegacy,
    horizonForbiddenWest,
    kkdDivisie,
    lantre,
    lauriefish,
    legoHorizon,
    levendleed,
    loyalty,
    mk1,
    mk1Khaos,
    obskvvr,
    screenshot,
    sunderfolk,
    wildgate,
];
function MovingPortfolio() {
    const duplicatedLogos = [...clientLogos, ...clientLogos];

    const [activeProject, setActiveProject] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveProject((prev) =>
                prev === showcaseLogos.length - 1
                    ? 0
                    : prev + 1
            );
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="movingPortfolioOuterWrapper">

            <div className="carouselSection">

                <p className="portfolioLabel">
                <u>Trusted By</u>
            </p>

                <div className="carouselContainer">

                    <div className="carouselTrack">

                        {duplicatedLogos.map((logo, index) => (
                            <img
                            key={index}
                            src={logo}
                            alt="client Logo"
                            className="clientLogo"
                            />
                        ))}

                    </div>

                </div>

            </div>

            <div className="showcaseSection">

                <p className="portfolioLabel">
                   <u>Worked On</u>
                </p>

                <div className="showcaseDisplay">

                    <img
                    key={activeProject}
                    src={showcaseLogos[activeProject]}
                    alt="Showcase Logos"
                    className="showcaseLogo"
                    />

                </div>

            </div>

        </section>
    );
}

export default MovingPortfolio;