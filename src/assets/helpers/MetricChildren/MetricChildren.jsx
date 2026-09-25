import './MetricChildren.css'


function MetricChildren ({number, text}) {

    return <>

        <div
            className="metricMoverChildren"
        >

            <h3>
                {number}
            </h3>
            <p>{text}</p>
        </div>

    </>

}

export default MetricChildren