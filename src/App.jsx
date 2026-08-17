import './App.css'
import Navbar from "./assets/components/Navbar/Navbar.jsx";
import MovingBackground from "./assets/components/MovingBackground/MovingBackground.jsx";
import HeroSection from "./assets/Pages/HeroSection/HeroSection.jsx";
import MovingPortfolio from "./assets/helpers/MovingPortfolio/MovingPortfolio.jsx";
import ExperienceSection from "./assets/Pages/ExperienceSection/ExperienceSection.jsx";
import Footer from "./assets/components/Footer/Footer.jsx";
import HowIWorkSection from "./assets/Pages/HowIWorkSection/HowIWorkSection.jsx";
import ContactSectionPortfolio from "./assets/Pages/ContactSectionPortfolio/ContactSectionPortfolio.jsx";

// import {Routes, Route} from "react-router-dom";


function App() {


    return (
        <>

            {/*<MovingBackground/>*/}


            <main
                className="appWrapper"
            >
                <Navbar/>
                <div
                    className="heroSectionContainer"
                >
                    <section
                        id="Hero"
                    >
                        <HeroSection/>

                    </section>

                    <section
                        id="portfolioSum"
                    >
                        <MovingPortfolio/>
                    </section>

                    {/*<section*/}
                    {/*    id="Experience"*/}
                    {/*>*/}
                    {/*    <ExperienceSection/>*/}

                    {/*</section>*/}

                    {/*<section*/}
                    {/*id="HowIWork"*/}
                    {/*>*/}
                    {/*    <HowIWorkSection/>*/}
                    {/*</section>*/}


                    <section
                    id="contact"
                    >
                        <ContactSectionPortfolio/>
                    </section>

                </div>

            </main>


            <Footer/>


        </>
    )
}

export default App
