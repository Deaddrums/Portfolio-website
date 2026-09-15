import './App.css'
import Navbar from "./assets/components/Navbar/Navbar.jsx";
// import MovingBackground from "./assets/components/MovingBackground/MovingBackground.jsx";
// import HeroSection from "./assets/Pages/HeroSection/HeroSection.jsx";
// import MovingPortfolio from "./assets/helpers/MovingPortfolio/MovingPortfolio.jsx";
// import ExperienceSection from "./assets/Pages/ExperienceSection/ExperienceSection.jsx";
import Footer from "./assets/components/Footer/Footer.jsx";
// import HowIWorkSection from "./assets/Pages/HowIWorkSection/HowIWorkSection.jsx";
// import ContactSectionPortfolio from "./assets/Pages/ContactSectionPortfolio/ContactSectionPortfolio.jsx";
// import PortfolioHighlights from "./assets/Pages/PortfolioHighlights/PortfolioHighlights.jsx";
// import WorkHighlights from "./assets/Pages/WorkHighlights/WorkHighlights.jsx";
// import AboutMeMed from "./assets/Pages/AboutMeMed/AboutMeMed.jsx";
import HomePage from "./assets/Pages/HomePage/HomePage.jsx";
import AboutPage from "./assets/Pages/AboutPage/AboutPage.jsx";
import PortfolioPage from "./assets/Pages/PortfolioPage/PortfolioPage.jsx";
import BlogData from "./assets/Data/BlogData.jsx";

import {Routes, Route} from "react-router-dom";
import PortfolioItemContainer from "./assets/components/PortfolioItemContainer/PortfolioItemContainer.jsx";
import BlogPage from "./assets/Pages/BlogPage/BlogPage.jsx";

function App() {


    return (
        <>

            {/*<MovingBackground/>*/}


            <main
                className="appWrapper"
            >
                <Navbar/>

                <Routes>

                    <Route path="/" element={<HomePage />} />
                    <Route path="/aboutPage" element={<AboutPage />} />
                    {/*<Route path="/services" element={<ServicesPage />} />*/}
                    <Route path="/PortfolioPage" element={<PortfolioPage />} />
                    {/*<Route path="/contact" element={<ContactPage />} />*/}
                    <Route
                        path="/portfolio/:slug"
                        element={<PortfolioItemContainer />}
                    />
                    <Route path="/Blog" element={<BlogPage/>}/>
                </Routes>



            </main>


            <Footer/>


        </>
    )
}

export default App
