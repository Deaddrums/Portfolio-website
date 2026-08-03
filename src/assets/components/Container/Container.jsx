import './Container.css'

function Container({
                       title,
                       children,
                       width = '100%',
                       height
                   }) {

    return <>

        <div
        className="containerBorder"
        >


        <article
            className="containerOuterWrapper"
            style={{
                width,
                ...(height ? { height } : {})
                }}
        >

            <div
                className="containerInnerWrapper"
            >

                <header
                    className="containerTitle"
                >
                    <h3>{title}</h3>
                </header>

                <section
                className="containerContent"
                >
                    {children}

                </section>

            </div>

        </article>
        </div>
    </>

}

export default Container