import './Navbar.css'
import logo from './../../images/Clean logo.jpg'

function Navbar () {

    return <>

        <div
        className="navOuterWrapper"
        >

            <div
                className="navInnerWrapper">

<div className="navLogoAndName">
    <img id="logoJh"
         src={logo}
         alt="Logo van Jim Horvath"/>

    <h1>Jim Horvath</h1>

</div>

                <div
                className="navListItems"
                >
                    <ul>
                        <li>
                            About
                        </li>
                        <li>
                            Work
                        </li>
                        <li>
                            Services
                        </li>
                        <li>
                            Blogs
                        </li>
                    </ul>
                </div>

            </div>

<div
className="navBackgroundGradient"
>

</div>

        </div>

    </>

}

export default Navbar