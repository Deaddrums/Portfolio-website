import './TitleMover.css';
import {useEffect, useState} from "react";

const titles = [
    {
        title: "Audio Engineer",
        subtitle: "Making your sound spark."
    },
    {
        title: "Project Manager",
        subtitle: "Turning chaos into clarity."
    },
    {
        title: "Production Consultant",
        subtitle: "Building smarter workflows."
    },
    {
        title: "Producer",
        subtitle: "Creating engaging user experiences."
    }
];

function TitleMover() {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [animate, setAnimate] = useState(true);

    useEffect(() => {

        const interval = setInterval(() => {

            setAnimate(false);

            setTimeout(() => {

                setCurrentIndex(prev =>
                    prev === titles.length - 1
                        ? 0
                        : prev + 1
                );

                setAnimate(true);

            }, 500);

        }, 5000);

        return () => clearInterval(interval);

    }, []);

    return (
        <div className={`titleContainer ${animate ? "slideIn" : "slideOut"}`}>

            <span className="titleText">
                <div className="titleViewport">
                {titles[currentIndex].title}
        </div>
            </span>

            <span className="subtitleText">
                <div className="subtitleViewport">
              <h2>  {titles[currentIndex].subtitle} </h2>
        </div>
            </span>

        </div>
    );
}

export default TitleMover;
