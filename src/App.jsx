import './App.css'
import Navbar from "./assets/components/Navbar/Navbar.jsx";
import MovingBackground from "./assets/components/MovingBackground/MovingBackground.jsx";
import HeroSection from "./assets/Pages/HeroSection/HeroSection.jsx";
import MovingPortfolio from "./assets/helpers/MovingPortfolio/MovingPortfolio.jsx";
// import {Routes, Route} from "react-router-dom";



function App() {


  return (
    <>

<MovingBackground />

      <Navbar></Navbar>



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
    </div>
    </>
  )
}

export default App
