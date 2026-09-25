import './MetricsMover.css'

import {clientData} from '../../Data/clientData.jsx';
import {contentData} from "../../Data/contentData.jsx";

import MetricChildren from "../MetricChildren/MetricChildren.jsx";

function MetricsMover() {

    const metrics = [
        {
            number: "10.000+",
            text: "Cups of coffee"
        },
        {
            number: clientData.length,
            text: "Happy clients"
        },
        {
            number: contentData.length,
            text: "Successful projects"
        },
        {
            number: "97%",
            text: "Client satisfaction"
        },
        {
            number: "15%-30%",
            text: "Margin increases"
        },
        {
            number: "75%",
            text: "Efficiency increase"
        },
        {
            number: "50+",
            text: "Projects Delivered"
        },
        {
            number: "20+",
            text: "Years Experience"
        },
        {
            number: "3",
            text: "Languages Spoken"
        },
        {
            number: "150+",
            text: "Live Events Per Year"
        },
        {
            number: "200K",
            text: "Budget Managed"
        },
        {
            number: "6",
            text: "Engineers Led"
        },
        {
            number: "30%",
            text: "Faster Delivery"
        },
        {
            number: "40%",
            text: "Fewer Production Bugs"
        },
        {
            number: "25%",
            text: "Audience Growth"
        },
        {
            number: "AAA",
            text: "Game Productions"
        },
        {
            number: "360°",
            text: "VR Audio Experience"
        },
        {
            number: "24/7",
            text: "Problem Solving"
        }
    ];

    const duplicatedMetrics = [...metrics, ...metrics];

    return <>

        <div
            className="metricMoverOuterWrapper"
        >

                <div className="metricMoverInnerWrapper">

                    {duplicatedMetrics.map((metric, index) => (
                        <MetricChildren
                            key={index}
                            number={metric.number}
                            text={metric.text}
                        />
                    ))}

                </div>


            </div>

    </>

}

export default MetricsMover