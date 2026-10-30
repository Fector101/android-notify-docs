import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getSectionsForRoute } from "../assets/js/site-sections";

interface IActiveSectionOptions {
    /** Keep the url hash in sync with the section that is currently in view. */
    updateUrl?: boolean;
}

/**
 * Tracks which section of the current docs page is in view.
 * The active section is the last one whose top edge has scrolled past
 * the header, which also gives sane results for sections nested in a
 * larger wrapper section. Re-initializes whenever the route changes.
 */
export function useActiveSection({ updateUrl = false }: IActiveSectionOptions = {}) {
    const location = useLocation();
    const [activeHash, setActiveHash] = useState(location.hash);

    // Follow deep links / route changes right away, before scrolling starts.
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

        const headerHeight = document.querySelector("header")?.offsetHeight ?? 70;
        const lineOffset = headerHeight + 8;
        let frame = 0;
        let lastHash = "";

        const update = () => {
            frame = 0;

            const line = window.scrollY + lineOffset;
            let current: HTMLElement | null = null;
            let currentTop = -Infinity;
            let first = elements[0];
            let firstTop = Infinity;
            let last = elements[0];
            let lastTop = -Infinity;

            elements.forEach((element) => {
                const top = element.getBoundingClientRect().top + window.scrollY;

                if (top < firstTop) {
                    firstTop = top;
                    first = element;
                }
                if (top > lastTop) {
                    lastTop = top;
                    last = element;
                }
                if (top <= line && top > currentTop) {
                    currentTop = top;
                    current = element;
                }
            });

            // At the very bottom of the page the last section is the one in view.
            const atBottom =
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - 2;
            if (atBottom) current = last;

            // Nothing has scrolled past the header yet, so highlight the first section.
            if (!current) current = first;

            const hash = "#" + current.id;
            if (hash === lastHash) return;
            lastHash = hash;

            setActiveHash(hash);
            if (updateUrl) window.history.replaceState(null, "", hash);
        };

        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [location.pathname, updateUrl]);

    return activeHash;
}
