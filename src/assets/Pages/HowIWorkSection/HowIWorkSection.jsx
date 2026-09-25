import './HowIWorkSection.css'

import image from './../../images/Jim/79e94911-e924-4cdf-bd7b-e5950382adcc.JPG'
import ImageAndTextOverlay from "../../components/ImageAndTextOverlay/ImageAndTextOverlay.jsx";
import ServicesCarousel from "../../components/ServicesCarousel/ServicesCarousel.jsx";

function HowIWorkSection() {

    const items = [
        {
            number: "01",
            title: "Interview",
            description: "We set up a call to discuss your project"
        },
        {
            number: "02",
            title: "Setting deliverables",
            description: "We find your goals and values and set clear instructions to deliver"
        },
        {
            number: "03",
            title: "Stuff",
            description: "We do some stuff, some stuff that was birds and things"
        },
        {
            number: "04",
            title: "Interview2",
            description: "We set up a call to discuss your project"
        },
        {
            number: "05",
            title: "Post mortem",
            description: "We discuss how your project went, what we can improve, etc"
        },
    ];


    return <>

        <div
            className="howIWorkOuterWrapper"
        >

            <div
                className="servicesContainer"
            >
                <h1
                >Services</h1>
                <ServicesCarousel/>

            </div>

            <div
                className="howIWorkInnerWrapper"
            >


                <div
                    className="howIWorkContainer"
                >

                    {/*<h3>How I Work</h3>*/}
                    <h2>How I work with you</h2>
                    {/*<p><em>My process is</em></p>*/}

                    <div className="servicesList">
                        {items.map((item) => (
                            <div key={item.number} className="serviceItem">
                                <div className="serviceNumber">
                                    {item.number}
                                </div>

                                <div className="serviceContent">
                                    <h4><strong>{item.title}</strong></h4>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>


                </div>

                <ImageAndTextOverlay
                    id="working-Jim 2"
                    key="Working Jim 2"
                    image={image}
                    alt="Directing Jim"
                    h4="Communication"
                    p="Directing a session for a virtual robotic tour guide in VR"
                />

            </div>


        </div>

    </>

}

export default HowIWorkSection