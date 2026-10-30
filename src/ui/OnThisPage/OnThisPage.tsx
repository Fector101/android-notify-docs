import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { getSectionsForRoute } from "../../assets/js/site-sections";
import { useActiveSection } from "../useActiveSection";
import "./onthispage.css";

/**
 * "On this page" table of contents.
 * Rendered as a sticky rail on the right on large screens and as a
 * collapsible dropdown at the top of the page on smaller screens.
 */
export default function OnThisPage() {
    const location = useLocation();
    const activeHash = useActiveSection();
    const [opened, setOpened] = useState(false);

    const sections = getSectionsForRoute(location.pathname) ?? [];

    // Collapse the dropdown once a section has been selected or the route changes.
    useEffect(() => {
        setOpened(false);
    }, [location.pathname, location.hash]);

    if (!sections.length) return null;

    return (
        <aside id="on-this-page" aria-label="On this page" data-open={opened}>
            <button
                type="button"
                className="toc-toggle no-text-select"
                aria-expanded={opened}
                aria-controls="on-this-page-list"
                onClick={() => setOpened((old) => !old)}
            >
                <span>On this page</span>
                {opened ? <ChevronUp /> : <ChevronDown />}
            </button>

            <div className="toc-panel" id="on-this-page-list">
                <p className="toc-title">On this page</p>
                <ul>
                    {sections.map((each) => {
                        const active = "#" + each.id === activeHash;

                        return (
                            <li key={each.id}>
                                <Link
                                    to={location.pathname + "#" + each.id}
                                    className={active ? "active" : ""}
                                    aria-current={active ? "true" : undefined}
                                >
                                    {each.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </aside>
    );
}
