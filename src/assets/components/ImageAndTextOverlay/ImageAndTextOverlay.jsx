import './ImageAndTextOverlay.css'

function ImageAndTextOverlay ({id, key, image, h4, p}) {


    return <>

        <div
        className="ImageAndTextOverlayContainer"
        >
           <img
           id={id}
           key={key}
           src={image}
           />

            <div
            className="ImageAndTextOverlayText"
            >
                <h4>{h4}</h4>
                <p>{p}</p>

            </div>
        </div>

    </>

}

export default ImageAndTextOverlay