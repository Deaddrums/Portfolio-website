import HeroSection from "../HeroSection/HeroSection.jsx";
import MovingPortfolio from "../../helpers/MovingPortfolio/MovingPortfolio.jsx";
import WorkHighlights from "../WorkHighlights/WorkHighlights.jsx";
import ExperienceSection from "../ExperienceSection/ExperienceSection.jsx";
import ContactSectionPortfolio from "../ContactSectionPortfolio/ContactSectionPortfolio.jsx";
import AboutMeMed from "../AboutMeMed/AboutMeMed.jsx";
import HowIWorkSection from "../HowIWorkSection/HowIWorkSection.jsx";

function HomePage () {

    return <>
        <div
            className="heroSectionContainer"
        >
            <section
                id="Hero"
            >
                <HeroSection/>

            </section>

            {/*<section*/}
            {/*    id="portfolioSum"*/}
            {/*>*/}
            {/*    <MovingPortfolio/>*/}
            {/*</section>*/}

            {/*<section*/}
            {/*    id="Experience"*/}
            {/*>*/}
            {/*    <ExperienceSection/>*/}

            <section
                id="portfoliohighlights"
            >
                <WorkHighlights/>
            </section>

            {/*</section>*/}

            {/*<section*/}
            {/*id="HowIWork"*/}
            {/*>*/}
            {/*    <HowIWorkSection/>*/}
            {/*</section>*/}


            <section
                id="AboutMeMed"
            >
                <AboutMeMed/>
            </section>

            <section
                id="contact"
            >
                <ContactSectionPortfolio/>
            </section>

        </div>
    </>

}

export default HomePage