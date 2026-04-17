"use client";
interface IPageDict {
    [key: string]: { title: string; description: string } | undefined;
}
const pages_dict: IPageDict = {
    "getting-started": {
        title: "Getting Started",
        description:''
            // "Learn how to set up and use the Android-notify library in your projects.",
    },
    components: {
        title: "Components",
        description:
            "Explore the various components.",
            // "Explore the various components available in the Android-notify library.",
    },
// 'general': {
    //     'title': 'General',
    //     'description': 'Learn about the general features and functionalities of the Android-notify library.',
    // },
}

export {pages_dict};

export default function Page() { return null; }
