import './App.css'
import Navbar from "./assets/components/Navbar/Navbar.jsx";
import Footer from "./assets/components/Footer/Footer.jsx";

import AboutPage from "./assets/Pages/AboutPage/AboutPage.jsx";
import PortfolioPage from "./assets/Pages/PortfolioPage/PortfolioPage.jsx";
import DrumsPage from "./assets/Pages/DrumsPage/DrumsPage.jsx";

import {Routes, Route} from "react-router-dom";
import PortfolioItemContainer from "./assets/components/PortfolioItemContainer/PortfolioItemContainer.jsx";
import BlogPage from "./assets/Pages/BlogPage/BlogPage.jsx";
import ProtectedRoute from './auth/ProtectedRoute.jsx'
import AdminPage from './assets/Pages/AdminPage/AdminPage.jsx'
import CompleteHomePage from "./assets/Pages/CompleteHomePage/CompleteHomePage.jsx";



function App() {


    return (
        <>
            <main
                className="appWrapper"
            >
                <Navbar/>

                <Routes>

                    {/*<Route path="/" element={<HomePage />} />*/}
                    <Route path="/" element={<CompleteHomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/drums" element={<DrumsPage />} />
                    {/*<Route path="/services" element={<ServicesPage />} />*/}
                    <Route path="/portfolio" element={<PortfolioPage />} />
                    {/*<Route path="/contact" element={<ContactPage />} />*/}
                    <Route
                        path="/portfolio/:slug"
                        element={<PortfolioItemContainer />}
                    />
                    <Route path="/blog" element={<BlogPage/>}/>

                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute>
                                <AdminPage />
                            </ProtectedRoute>
                        }
                    />

                    {/* TIJDELIJK — alleen voor de eenmalige Supabase-migratie.
                        Verwijder deze route zodra de migratie is gelukt. */}
                    {/*<Route*/}
                    {/*    path="/run-migration"*/}
                    {/*    element={*/}
                    {/*        <ProtectedRoute>*/}
                    {/*            <MigrationRunner />*/}
                    {/*        </ProtectedRoute>*/}
                    {/*    }*/}
                    {/*/>*/}

                </Routes>

            </main>

            <Footer/>

        </>
    )
}

export default App
