import { useNavigate } from "react-router-dom";

import './AboutMeMed.css'
import ServicesCarousel from "../../components/ServicesCarousel/ServicesCarousel.jsx";
import Jimage from './../../images/Jim/c7dde56e-76e9-48d3-a8eb-20ec6009618c.JPG'

function AboutMeMed() {

    const navigate = useNavigate();

    function handleNavigateToAboutPage() {
        navigate("/AboutPage");
    }

    return (
       // <div className="AboutMeMedOuterContainer">
        <div className="aboutMeMedOuterWrapper">

            <div className="aboutMeMedInnerWrapper">

                <div className="aboutMeMedContainer">

                    <h2>About Jim</h2>

                    <h3>Productions <em><u>are</u></em> my blood</h3>

                    <p>
                        <em>
                            Nothing gets me going more than being right in the middle of it. 

                            {/*<br/>*/}
                             It's that feeling of flying, not thinking, just moving and getting things done
                        </em>
                    </p>

                    <p>
                        with 20+ years of experience in production I bring
                        structure, discipline, clear communication, high standards and great value.
                        But tight cöordination, calmness and budget control isn't everything.
                        <br/>
                        <em>It's the people who are the backbone</em>
                        <br/>
                        I enjoying finding the best in people and pushing them beyond the limits they themselves set.
                    </p>

                    <p>
                        With a technical background in audio engineering, proven track record in project management,

                        knowledge of coding, and great communication like you're talking with your buddy at a bar,

                        there is a plethora of knowledge to set any project up on the path to success.
                    </p>

                    <button
                        type="button"
                        className="aboutMeMedNavigateButton"
                        onClick={handleNavigateToAboutPage}
                    >
                        Click here to read my complete profile
                    </button>

                </div>

                <img
                    src={Jimage}
                    alt="Jim op set"
                    className="aboutMeMedImage"
                />

            </div>

            <ServicesCarousel/>

        </div>
       // </div>
    );

}

export default AboutMeMed
