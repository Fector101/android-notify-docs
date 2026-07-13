import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToSection = () => {
    const location = useLocation();
    useEffect(() => {
        if (location.hash) {
            const section = document.querySelector(location.hash) as HTMLElement;
            if (section) {
                const headerHeight = 70;
                window.scrollTo({
                    top: section.offsetTop - headerHeight,
                    behavior: "smooth",
                });
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [location]);

    return null;
};

export { ScrollToSection };
