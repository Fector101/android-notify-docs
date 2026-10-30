import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getSectionsForRoute } from "../assets/js/site-sections";

interface IActiveSectionOptions {
    /** Keep the url hash in sync with the section that is currently in view. */
    updateUrl?: boolean;
}

/**
 * Tracks which section of the current docs page is in view.
 * Re-initializes whenever the route changes so the observer always
 * watches the ids of the page that is actually rendered.
 */
export function useActiveSection({ updateUrl = false }: IActiveSectionOptions = {}) {
    const location = useLocation();
    const [activeHash, setActiveHash] = useState(location.hash);

    // Follow deep links / route changes right away, before the observer has fired.
    useEffect(() => {
        setActiveHash(location.hash);
    }, [location.pathname, location.hash]);

    useEffect(() => {
        const sections = getSectionsForRoute(location.pathname);
        if (!sections?.length) return;

        const elements = sections
            .map((section) => document.getElementById(section.id))
            .filter((element): element is HTMLElement => Boolean(element));
        if (!elements.length) return;

        const visibleSections = new Map<string, number>();

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const id = "#" + entry.target.id;

                    if (entry.isIntersecting) {
                        visibleSections.set(id, entry.intersectionRatio);
                    } else {
                        visibleSections.delete(id);
                    }
                });

                if (visibleSections.size > 0) {
                    const mostVisible = Array.from(visibleSections.entries()).sort(
                        (a, b) => b[1] - a[1]
                    )[0][0];

                    setActiveHash(mostVisible);
                    if (updateUrl) window.history.replaceState(null, "", mostVisible);
                }
            },
            { threshold: [0, 0.1, 0.25, 0.5], rootMargin: "-20px 0px -20px 0px" }
        );

        elements.forEach((element) => observer.observe(element));

        return () => observer.disconnect();
    }, [location.pathname, updateUrl]);

    return activeHash;
}
