import './HeroSection.css'
// import logo from '../../images/clean-logo-transparent.png'
import jim from '../../images/Jim/80c2d305-8df8-452d-b779-ca9dad64e868.JPG'
import TitleMover from "../../helpers/TitleMover/TitleMover.jsx";
import MovingPortfolio from "../../helpers/MovingPortfolio/MovingPortfolio.jsx";

function HeroSection() {

    return (
        <section className="heroSection">

            <div className="heroGrid">

                <div className="heroContent">

                    <div className="heroTag">

                        <span className="heroTagLine"></span>

                        <span className="heroTagText">
                            Versatile Creative Professional
                        </span>

                    </div>

                    <h1 className="heroTitle">
                        <TitleMover/>
                    </h1>

                    <p className="heroDescription">
                        Helping teams, creators and businesses bring
                        ambitious ideas to life through production,
                        project management, audio engineering,
                        localization and technical solutions.
                    </p>

                    <div className="heroActions">

                        <div className="heroUSP">

                            <span>
                                20+ Years of kick-ass experience
                            </span>

                            <small>
                                Production, Audio & Management
                            </small>

                        </div>

                    </div>

                </div>

                {/* Right Side */}

                <div className="heroImageContainer">

                    <div className="heroImageFrame">

                        <img
                            src={jim}
                            alt="Jim Horvath Logo"
                        />

                    </div>

                </div>

                {/* Full width strip */}

                <div className="heroPortfolioRow">
                    <MovingPortfolio/>
                </div>

            </div>

        </section>
    );

}

export default HeroSection
