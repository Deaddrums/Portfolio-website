import './Navbar.css'
import logo from './../../images/clean-logo-transparent.png'
import { NavLink } from "react-router-dom";
import ContactLink from "../../helpers/ContactLink/ContactLink.jsx";

function Navbar() {

    // const isActive = true;

    return <>

        <div className="navOuterWrapper">

            <div className="navInnerWrapper">

                <div className="navLogoAndName">

                    {/*<NavLink to="/">*/}
                    <img src={logo} alt="Logo"/>
                {/*</NavLink>*/}

                    <h1><u><strong>Jim Horvath</strong></u></h1>
                </div>

                <nav className="navListItems">
                    <ul>
                        <ul>

                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        isActive ? "navLink active" : "navLink"
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/about"
                                    className={({ isActive }) =>
                                        isActive ? "navLink active" : "navLink"
                                    }
                                >
                                    About
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/portfolio"
                                    className={({ isActive }) =>
                                        isActive ? "navLink active" : "navLink"
                                    }
                                >
                                    Portfolio
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/drums"
                                    className={({ isActive }) =>
                                        isActive ? "navLink active" : "navLink"
                                    }
                                >
                                    Drums
                                </NavLink>
                            </li>

                            {/*<li>*/}
                            {/*    <NavLink*/}
                            {/*        to="/ServicesPage"*/}
                            {/*        className={({ isActive }) =>*/}
                            {/*            isActive ? "navLink active" : "navLink"*/}
                            {/*        }*/}
                            {/*    >*/}
                            {/*        Services*/}
                            {/*    </NavLink>*/}
                            {/*</li>*/}

                            <li>
                                <NavLink
                                    to="/blog"
                                    className={({ isActive }) =>
                                        isActive ? "navLink active" : "navLink"
                                    }
                                >
                                    Blogs
                                </NavLink>
                            </li>
                        </ul>

                    </ul>
                </nav>

                <div className="navButtonWrapper">
                    <ContactLink className="navButton">
                        Let's Talk
                    </ContactLink>
                </div>


            </div>

            <div className="navBackgroundGradient"></div>

        </div>

    </>

}

export default Navbar