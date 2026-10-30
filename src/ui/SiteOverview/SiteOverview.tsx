import { Link } from "react-router";
import { ChevronDown, ChevronUp } from "lucide-react";
import "./siteoverview.css";
import { useEffect, useState } from "react";
import { SITE_OVERVIEW_DATA, type ISiteSection } from "../../assets/js/site-sections";
import { useActiveSection } from "../useActiveSection";

function DropDown({
    title,
    sections,
    hash,
    route,
}: {
    route: string;
    title: string;
    sections: ISiteSection[];
    hash: string;
}) {
    const [opened, setOpened] = useState(false);

    function togglePreview() {
        setOpened((old) => !old);
    }

    // auto open if hash belongs here
    useEffect(() => {
        const match = sections.some((each) => "#" + each.id === hash);
        if (match) setOpened(true);
    }, [hash, sections]);

    return (
        <div className="dropdown flex fd-column align-items-cen justify-content-cen no-text-select">
            <div className="header flex align-items-cen width100per space-between">
                <p>{title}</p>

                <button
                    onClick={togglePreview}
                    className="flex align-items-cen justify-content-cen"
                >
                    {opened ? <ChevronUp /> : <ChevronDown />}
                </button>
            </div>

            <ul
                className="content width100per flex fd-column"
                style={{ height: opened ? "auto" : "0px" }}
            >
                {sections.length ? (
                    sections.map((each) => {
                        const active = "#" + each.id === hash;

                        return (
                            <li key={each.label}>
                                <Link
                                    className={active ? "active" : ""}
                                    to={route + "#" + each.id}
                                    tabIndex={opened ? 0 : -1}
                                >
                                    {each.label}
                                </Link>
                            </li>
                        );
                    })
                ) : (
                    <li>No Content</li>
                )}
            </ul>
        </div>
    );
}

export default function SiteOverview() {
    const hash = useActiveSection({ updateUrl: true });

    return (
        <div id="site-overview" className="border-r border-[#454444]">
            {SITE_OVERVIEW_DATA.map((each) => (
                <DropDown
                    key={each.title}
                    hash={hash}
                    title={each.title}
                    route={each.route}
                    sections={each.sections}
                />
            ))}
        </div>
    );
}