import './MovingBackground.css'

function MovingBackground ({children}) {

    return <>

        <div className="backgroundLayer">

        <div
        className="smallRed"
        ></div>

        <div
            className="medRed"
        ></div>

        <div
            className="largeRed"
        ></div>

        <div
            className="smallBlue"
        ></div>

        <div
            className="medBlue"
        ></div>

        <div
            className="largeBlue"
        ></div>

        <div
            className="smallOrange"
        ></div>

        <div
            className="medOrange"
        ></div>

        <div
            className="largeOrange"
        ></div>

        </div>


        <div className="contentLayer">
            {children}
        </div>

    </>

}

export default MovingBackground