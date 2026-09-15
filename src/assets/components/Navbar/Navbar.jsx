import './Navbar.css'
import logo from './../../images/clean-logo-transparent.png'
import { NavLink } from "react-router-dom";

function Navbar() {

    // const isActive = true;

    return <>

        <div className="navOuterWrapper">

            <div className="navInnerWrapper">

                <div className="navLogoAndName">

                    <NavLink to="/">
                    <img src={logo} alt="Logo"/>
                </NavLink>

                    <h1><u><strong>Jim Horvath</strong></u></h1>
                </div>

                <nav className="navListItems">
                    <ul>
                        <ul>
                            <li>
                                <NavLink
                                    to="/AboutPage"
                                    className={({ isActive }) =>
                                        isActive ? "navLink active" : "navLink"
                                    }
                                >
                                    About
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/PortfolioPage"
                                    className={({ isActive }) =>
                                        isActive ? "navLink active" : "navLink"
                                    }
                                >
                                    Portfolio
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
                                    to="/Blog"
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