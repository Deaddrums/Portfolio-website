import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { registerAuth0Client } from "../../utils/supabaseClient.js";
import CvEditor from "./CvEditor.jsx";
import PortfolioEditor from "./PortfolioEditor.jsx";
import BlogEditor from "./BlogEditor.jsx";
import "./AdminPage.css";

const TABS = [
    { id: "cv", label: "CV" },
    { id: "portfolio", label: "Portfolio" },
    { id: "blog", label: "Blogs" }
];

function AdminPage() {
    const [activeTab, setActiveTab] = useState("cv");
    const auth0 = useAuth0();
    const { user, logout } = auth0;

    // Registreert de Auth0-client bij de Supabase-client zodra deze
    // pagina laadt, zodat elke supabase.from(...)-aanroep vanaf nu
    // automatisch het juiste ID-token meestuurt.
    useEffect(() => {
        registerAuth0Client(auth0);
    }, [auth0]);

    return (
        <div className="adminPage">

            <header className="adminHeader">
                <div className="adminHeaderLeft">
                    <span className="adminHeaderBadge">Admin</span>
                    <h1>Content Manager</h1>
                </div>

                <div className="adminHeaderRight">
                    {user && (
                        <span className="adminUserEmail">{user.email}</span>
                    )}

                    <button
                        type="button"
                        className="adminLogoutButton"
                        onClick={() =>
                            logout({
                                logoutParams: {
                                    returnTo: window.location.origin
                                }
                            })
                        }
                    >
                        Log out
                    </button>
                </div>
            </header>

            <nav className="adminTabBar">
                {TABS.map((tab) => (
                    <button
                        type="button"
                        key={tab.id}
                        className={`adminTabButton ${
                            activeTab === tab.id ? "active" : ""
                        }`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </nav>

            <main className="adminContent">
                {activeTab === "cv" && <CvEditor />}
                {activeTab === "portfolio" && <PortfolioEditor />}
                {activeTab === "blog" && <BlogEditor />}
            </main>

        </div>
    );
}

export default AdminPage;
