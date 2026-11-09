import { IReferencePage } from "../../../assets/js/mytypes";
import { component_page, advanced_methods_page as base_advanced_methods_page } from "./1.61";

const advanced_methods_page = {
    ...base_advanced_methods_page,
};


const NOTIFICATION_METHODS = {
    addButton: {
        signature: 'addButton(text, on_release, receiver_name?, action?, dynamic=False)',
        description: 'Adds an action button to the notification. Pass `dynamic=True` to deliver the button to a `BroadcastReceiver` registered at runtime through a package-scoped broadcast (no manifest receiver or Java class needed).',
        args: [
            { name: 'dynamic', desc: 'Boolean — send a package-scoped broadcast to a runtime `BroadcastReceiver`. Requires `action`; `receiver_name` is ignored when True.' }
        ]
    },
};


const HANDLER_METHODS: IReferencePage["HANDLER_METHODS"] = [];


const reference_page: IReferencePage = {
    NOTIFICATION_METHODS,
    HANDLER_METHODS,
    STYLE_ATTRIBUTES: undefined
};

export { component_page, reference_page, advanced_methods_page }
