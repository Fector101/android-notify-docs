import { Link, useLocation } from "react-router";
import { ChevronDown, ChevronUp } from "lucide-react";
import "./siteoverview.css";
import { useEffect, useState } from "react";

interface ISiteSection {
    label: string;
    id: string;
}

interface ISiteOverviewData {
    title: string;
    route: string;
    sections: ISiteSection[];
}

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
    const location = useLocation();
    const [hash, setHash] = useState(location.hash);

    // Update active hash based on scroll position using Intersection Observer
    useEffect(() => {
        // Only observe sections in the main content area (not sidebar)
        const mainContent = document.querySelector('main.flex.fd-column');
        if (!mainContent) return;

        const sections = mainContent.querySelectorAll('[id]');
        const visibleSections = new Map<string, number>();

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const id = '#' + entry.target.id;
                    // Skip if it's the site-overview sidebar
                    if (entry.target.id === 'site-overview') return;
                    
                    if (entry.isIntersecting) {
                        visibleSections.set(id, entry.intersectionRatio);
                    } else {
                        visibleSections.delete(id);
                    }
                });

                // Update hash to the most visible section
                if (visibleSections.size > 0) {
                    const mostVisible = Array.from(visibleSections.entries()).sort(
                        (a, b) => b[1] - a[1]
                    )[0][0];
                    
                    setHash(mostVisible);
                    window.history.replaceState(null, '', mostVisible);
                }
            },
            // { threshold: [0.1, 0.5, 1.0], rootMargin: '-50px 0px -50% 0px' }
             { threshold: [0, 0.1, 0.25, 0.5], rootMargin: '-20px 0px -20px 0px' }
        );

        sections.forEach((section) => {
            if (section.id && section.id !== 'site-overview') {
                observer.observe(section);
            }
        });

        return () => observer.disconnect();
    }, []);

    const data: ISiteOverviewData[] = [
        {
            title: "Getting Started",
            route: "/getting-started",
            sections: [
                { label: "Introduction", id: "introduction" },
                { label: "Features", id: "features" },
                { label: "Installation", id: "installation" },
                { label: "Basic Usage", id: "basic-usage" },
            ],
        },
        {
            title: "Components",
            route: "/components",
            sections: [
                { label: "Images", id: "images" },
                { label: "Buttons", id: "buttons" },
                { label: "Progress Bars", id: "progress-bars" },
                { label: "Texts", id: "texts" },
            ],
        },
        {
            title: "Channels",
            route: "/channels",
            sections: [
                { label: "Channel Management", id: "channel-management" },
                { label: "Reading Channels", id: "reading-channels" },
                { label: "Deleting Channels", id: "deleting-channels" },
                { label: "Custom Sound", id: "custom-sound" },
                { label: "Vibration", id: "vibration" },
            ],
        },
        {
            title: "Notification Behaviour",
            route: "/notification-behaviour",
            sections: [
                { label: "Heads-Up Alerts", id: "only-alert-once" },
                { label: "Obey User Clear", id: "obey-user-clear" },
                { label: "Is In Tray", id: "is-in-tray" },
            ],
        },
        {
            title: "Notification Data",
            route: "/notification-data",
            sections: [
                { label: "Getting Name", id: "getting-identifier" },
                { label: "Mutable Data", id: "notification-data" },
            ],
        },
        {
            title: "Notification Control",
            route: "/notification-control",
            sections: [
                { label: "Cancelling", id: "cancel-notifications" },
                { label: "Timestamps", id: "timestamps" },
                { label: "Priority", id: "priority" },
            ],
        },
        {
            title: "Foreground Services",
            route: "/foreground-services",
            sections: [
                { label: "Overview", id: "overview" },
                { label: "Register the Service", id: "register-the-service" },
                { label: "Required Permissions", id: "required-permissions" },
                { label: "Foreground Service Types", id: "foreground-service-types" },
                { label: "Real-World Example", id: "real-world-example" },
            ],
        },
        {
            title: "Reference",
            route: "/reference",
            sections: [
                { label: "Notification Class", id: "notification-class" },
                { label: "NotificationHandler Class", id: "notificationhandler-class" },
                { label: "NotificationStyles Class", id: "notificationstyles-class" },
            ],
        },
        {
            title: "Help",
            route: "/help",
            sections: [
                { label: "How to update", id: "how-to-update" },
                { label: "Debugging Tips", id: "debugging-tips" },
                { label: "Contributing-Issues", id: "contributing-issues" },
                { label: "Support Project", id: "support-project" },
                { label: "Credits", id: "credits" },
            ],
        },
    ];

    // update active hash when route changes
    useEffect(() => {
        setHash(location.hash);
    }, [location]);
    return (
        <div id="site-overview">
            {data.map((each) => (
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