import { IReferencePage } from "../../../assets/js/mytypes";
import { component_page, advanced_methods_page as base_advanced_methods_page } from "./1.60";

const only_alert_once_code = `from android_notify import Notification

n = Notification(
    title="Downloading update...",
    message="0% downloaded",
)
n.setOnlyAlertOnce(True)  # only the FIRST send pops up as a heads-up alert
n.send()

# Later updates stay quiet — no heads-up popup
n.updateProgressBar(50, "50% downloaded")`

const obey_user_clear_code = `from android_notify import Notification

n = Notification(title="Task", message="Working...")
n.send()

# When True, updating this notification after the user already cleared it
# will NOT bring it back to the tray
n.setObeyUserClear(True)`

const is_intray_code = `from android_notify import Notification

n = Notification(
    title="Status",
    message="Is this still around?",
)
n.send()

if n.isInTray():
    print("Notification is still in the tray")
else:
    print("Notification was cleared")`

const advanced_methods_page = {
    ...base_advanced_methods_page,
    only_alert_once_code,
    obey_user_clear_code,
    is_intray_code,
};


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