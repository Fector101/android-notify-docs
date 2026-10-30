export interface ISiteSection {
    label: string;
    id: string;
}

export interface ISiteOverviewData {
    title: string;
    route: string;
    sections: ISiteSection[];
}

export const SITE_OVERVIEW_DATA: ISiteOverviewData[] = [
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
            { label: "Start the Service", id: "start-service" },
            { label: "Running the Service", id: "running-the-service" },
            { label: "Add Buttons", id: "add-buttons" },
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

/** Returns the curated sections for a route, or undefined when the page has no "On this page" entries. */
export function getSectionsForRoute(pathname: string): ISiteSection[] | undefined {
    const normalized = pathname.replace(/\/+$/, "") || "/";
    return SITE_OVERVIEW_DATA.find((each) => each.route === normalized)?.sections;
}
