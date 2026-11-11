import { useLocation, useNavigate } from "react-router-dom";

function ContactLink({ children, className = "", onClick, ...props }) {
    const location = useLocation();
    const navigate = useNavigate();

    const handleClick = (event) => {
        event.preventDefault();
        onClick?.(event);

        if (location.pathname === "/") {
            const contactSection = document.getElementById("contact");

            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });

                window.history.replaceState(null, "", "#contact");
            }

            return;
        }

        navigate("/#contact");
    };

    return (
        <a
            href="/#contact"
            className={className}
            onClick={handleClick}
            {...props}
        >
            {children}
        </a>
    );
}

export default ContactLink;
