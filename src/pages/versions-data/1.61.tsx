import { IReferencePage } from "../../assets/js/mytypes";
import { component_page, advanced_methods_page } from "./1.60";


const NOTIFICATION_METHODS = {
    getChannels: {
        signature: 'getChannels()',
        description: 'Returns a list of dicts for every existing channel, each with readable per-channel details (`id`, `name`, `description`, `state`, `j_obj`).',
        returns: 'list[dict] — readable per-channel details',
        args: []
    },
    setOnlyAlertOnce: {
        signature: 'setOnlyAlertOnce(state)',
        description: 'Control whether updates to this notification show a heads-up popup.',
        args: [
            { name: 'state', desc: 'Boolean — True means only the first send alerts (updates stay quiet); False means every update alerts.' }
        ]
    },
    setObeyUserClear: {
        signature: 'setObeyUserClear(state)',
        description: 'Control whether the notification reappears when the app updates it after the user cleared it. Android 6+.',
        args: [
            { name: 'state', desc: 'Boolean — True to reappear when updated after being cleared by the user.' }
        ]
    },
    isInTray: {
        signature: 'isInTray()',
        description: 'Check whether this notification is currently present in the system tray. Android 6+.',
        returns: 'bool — True if the notification is active in the tray, otherwise False',
        args: []
    },
};


const HANDLER_METHODS: any[] = [];


const reference_page: IReferencePage = {
    NOTIFICATION_METHODS,
    HANDLER_METHODS,
    STYLE_ATTRIBUTES: undefined
};

export { component_page, reference_page, advanced_methods_page }