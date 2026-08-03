import './Navbar.css'
import logo from './../../images/clean-logo-transparent.png'

function Navbar() {

    return <>

        <div className="navOuterWrapper">

            <div className="navInnerWrapper">

                <div className="navLogoAndName">
                    <img src={logo} alt="Logo"/>

                    <h1><u><strong>Jim Horvath</strong></u></h1>
                </div>

                <nav className="navListItems">
                    <ul>
                        <li>About</li>
                        <li>Work</li>
                        <li>Services</li>
                        <li>Blogs</li>
                    </ul>
                </nav>

                <div className="navButtonWrapper">
                    <button className="navButton">
                        Let's Talk
                    </button>
                </div>

            </div>

            <div className="navBackgroundGradient"></div>

        </div>

    </>

}

export default Navbar