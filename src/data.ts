export type Version = string
export const VERSIONS = ['1.58', '1.59', '1.60'] as const

export function getQuickstart() {
  return `from android_notify import Notification

Notification(
    title="Hello!",
    message="Welcome to Android Notify"
).send()`
}

export function getInstallCode(tab: string): string {
  const codes: Record<string, string> = {
    pip: 'pip install android-notify',
    kivy: `# buildozer.spec
requirements = python3, kivy, pyjnius, android-notify
android.permissions = POST_NOTIFICATIONS
android.gradle_dependencies = androidx.core:core:1.12.0
android.enable_androidx = True`,
    flet: `# pyproject.toml
[tool.flet.android]
dependencies = ["pyjnius","android-notify==1.60.10.dev0"]

[tool.flet.android.permission]
"android.permission.POST_NOTIFICATIONS" = true`,
    pydroid: `# In Pydroid 3 pip section, add:
android-notify==1.60.10.dev0`,
    nox: `# buildozer.spec (without AndroidX)
requirements = python3, kivy, pyjnius, android-notify==1.60.10.dev0
android.permissions = POST_NOTIFICATIONS`,
  }
  return codes[tab] || codes.pip
}

const CODES: Record<string, Record<Version, string>> = {
  big_picture: {
    '1.58': `from android_notify import Notification, NotificationStyles

Notification(
    title='Picture Alert!',
    message='This notification includes an image.',
    style=NotificationStyles.BIG_PICTURE,
    big_picture_path="assets/imgs/photo.png"
).send()`,
    '1.59': `from android_notify import Notification

notification = Notification(
    title='Picture Alert!',
    message='This notification includes an image.'
)
notification.setBigPicture("assets/imgs/photo.png")
notification.send()`,
    '1.60': `from android_notify import Notification

notification = Notification(
    title='Picture Alert!',
    message='This notification includes an image.'
)
notification.setBigPicture("assets/imgs/photo.png")
notification.send()`,
  },
  large_icon: {
    '1.58': `from android_notify import Notification, NotificationStyles

Notification(
    title="FabianDev_",
    message="A twitter about some programming stuff",
    style=NotificationStyles.LARGE_ICON,
    large_icon_path="assets/imgs/profile.png"
).send()`,
    '1.59': `from android_notify import Notification

notification = Notification(
    title="FabianDev_",
    message="A twitter about some programming stuff"
)
notification.setLargeIcon("assets/imgs/profile.png")
notification.send()`,
    '1.60': `from android_notify import Notification

notification = Notification(
    title="FabianDev_",
    message="A twitter about some programming stuff"
)
notification.setLargeIcon("assets/imgs/profile.png")
notification.send()`,
  },
  small_icon: {
    '1.58': `from android_notify import Notification

Notification(
    app_icon="assets/icons/download.png",
    title="Custom Icon",
    message="Also persist notification test"
).send(persistent=True)`,
    '1.59': `from android_notify import Notification

notification = Notification(
    title="custom icon notification",
    message="using .setSmallIcon to set notification icon"
)
notification.setSmallIcon("icons/butterfly.png")
notification.send(persistent=True)`,
    '1.60': `from android_notify import Notification

notification = Notification(
    title="custom icon notification",
    message="using .setSmallIcon to set notification icon"
)
notification.setSmallIcon("icons/butterfly.png")
notification.send(persistent=True)`,
  },
  buttons: {
    '1.58': `from android_notify import Notification

notification = Notification(
    title="Jane Dough",
    message="How to use android-notify #coding #purepython"
)

def playVideo():
    print('Playing Video')

def turnOffNoti():
    print('Please Turn Off Updates')

def watchLater():
    print('Add to Watch Later')

notification.addButton(text="Play", on_release=playVideo)
notification.addButton(text="Turn Off", on_release=turnOffNoti)
notification.addButton(text="Watch Later", on_release=watchLater)
notification.send()`,
    '1.59': `from android_notify import Notification

notification = Notification(
    title="Jane Dough",
    message="How to use android-notify #coding #purepython"
)

def playVideo():
    print('Playing Video')

def turnOffNoti():
    print('Please Turn Off Updates')

notification.addButton(text="Play", on_release=playVideo)
notification.addButton(text="Turn Off", on_release=turnOffNoti)
notification.send()`,
    '1.60': `from android_notify import Notification

notification = Notification(
    title="Jane Dough",
    message="How to use android-notify #coding #purepython"
)

def playVideo():
    print('Playing Video')

def turnOffNoti():
    print('Please Turn Off Updates')

notification.addButton(text="Play", on_release=playVideo)
notification.addButton(text="Turn Off", on_release=turnOffNoti)
notification.send()`,
  },
  progressbar: {
    '1.58': `from android_notify import Notification, NotificationStyles
from kivy.clock import Clock

progress = 0
notification = Notification(
    title="Downloading...",
    message="0% downloaded",
    style=NotificationStyles.PROGRESS,
    progress_current_value=0, progress_max_value=100
)
notification.send()

def update_progress(dt):
    global progress
    progress = min(progress + 10, 100)
    notification.updateProgressBar(progress, f"{progress}% downloaded")
    return progress < 100

Clock.schedule_interval(update_progress, 3)`,
    '1.59': `from android_notify import Notification
from kivy.clock import Clock

progress = 0
notification = Notification(
    title="Downloading...",
    message="0% downloaded",
    progress_current_value=0,
    progress_max_value=100
)
notification.send()

def update_progress(dt):
    global progress
    progress = min(progress + 10, 100)
    if progress == 100:
        notification.removeProgressBar(title="File Downloaded", message="super_large_file.zip")
    elif progress >= 80:
        notification.showInfiniteProgressBar()
    else:
        notification.updateProgressBar(progress, f"{progress}% downloaded")
    return progress < 100

Clock.schedule_interval(update_progress, 3)`,
    '1.60': `from android_notify import Notification
from kivy.clock import Clock

progress = 0
notification = Notification(
    title="Downloading...",
    message="0% downloaded",
    progress_current_value=0,
    progress_max_value=100
)
notification.send()

def update_progress(dt):
    global progress
    progress = min(progress + 10, 100)
    if progress == 100:
        notification.removeProgressBar(title="File Downloaded", message="super_large_file.zip")
    elif progress >= 80:
        notification.showInfiniteProgressBar()
    else:
        notification.updateProgressBar(progress, f"{progress}% downloaded")
    return progress < 100

Clock.schedule_interval(update_progress, 3)`,
  },
  inbox: {
    '1.58': `from android_notify import Notification, NotificationStyles

Notification(
    title='Inbox Notification',
    message='Line 1\\nLine 2\\nLine 3',
    style=NotificationStyles.INBOX,
).send()`,
    '1.59': `from android_notify import Notification

notification = Notification(
    title="5 New mails from Frank",
    message="Check them out",
)
notification.addLine("Re: Planning")
notification.addLine("Delivery on its way")
notification.addLine("Follow-up")
notification.send()`,
    '1.60': `from android_notify import Notification

notification = Notification(
    title="5 New mails from Frank",
    message="Check them out",
)
notification.addLine("Re: Planning")
notification.addLine("Delivery on its way")
notification.addLine("Follow-up")
notification.send()`,
  },
  big_text: {
    '1.58': `from android_notify import Notification, NotificationStyles

Notification(
    title="Article",
    message="History of Lorem Ipsum",
    body="Lorem Ipsum is simply dummy text of the printing and ...",
    style=NotificationStyles.BIG_TEXT
).send()`,
    '1.59': `from android_notify import Notification

notification = Notification(
    title="Article",
    message="History of Lorem Ipsum",
)
notification.setBigText("Lorem Ipsum is simply dummy text of the printing and ...")
notification.send()`,
    '1.60': `from android_notify import Notification

notification = Notification(
    title="Article",
    message="History of Lorem Ipsum",
)
notification.setBigText("Lorem Ipsum is simply dummy text of the printing and ...")
notification.send()`,
  },
  sub_text: {
    '1.58': '# Not available in v1.58',
    '1.59': '# Not available in v1.59',
    '1.60': `from android_notify import Notification

notification = Notification(
    title="Downloading...",
    message="70% downloaded",
    progress_max_value=100
)
notification.setSubText("19 secs left")
notification.setColor("#00FF00")
notification.updateProgressBar(70)
notification.send()`,
  },
  channel: {
    '1.58': `from android_notify import Notification

Notification(
    title="Download finished",
    message="How to Catch a Fish.mp4",
    channel_name="Download Notifications",
    channel_id="downloads_notifications"
).send()`,
    '1.59': `from android_notify import Notification

Notification.createChannel(
    id="downloads_notifications",
    name="Download Notifications",
    description="For Receiving download info"
)
Notification(
    title="Download finished",
    message="How to Catch a Fish.mp4",
    channel_id="downloads_notifications"
).send()`,
    '1.60': `from android_notify import Notification

Notification.createChannel(
    id="downloads_notifications",
    name="Download Notifications",
    description="For Receiving download info"
)
Notification(
    title="Download finished",
    message="How to Catch a Fish.mp4",
    channel_id="downloads_notifications"
).send()`,
  },
}

export function getCode(key: string, version: Version): string {
  return CODES[key]?.[version] ?? `# Not available in v${version}`
}

/* ═══ API REFERENCE DATA ═══ */
type Arg = { name: string; desc: string }
type Method = { signature?: string; description?: string; args?: Arg[] }
type Handler = { id: string; signature: string; description: string; args?: Arg[] }
export type RefData = { methods: Record<string, Method>; handlers: Handler[] }

const REF158: RefData = {
  methods: {
    init: { signature: 'Notification(**kwargs)', description: 'Initializes the notification.', args: [
      { name: 'title', desc: 'Notification title' }, { name: 'message', desc: 'Notification message' },
      { name: 'style', desc: "['simple','progress','inbox','big_text','large_icon','big_picture','both_imgs']" },
      { name: 'progress_current_value', desc: 'Progress bar current value' }, { name: 'progress_max_value', desc: 'Progress bar max' },
      { name: 'big_picture_path', desc: 'Path or URL to big image' }, { name: 'large_icon_path', desc: 'Path or URL to large icon' },
      { name: 'body', desc: 'Text for BIG_TEXT style' }, { name: 'callback', desc: 'Function on tap' },
      { name: 'channel_name', desc: 'Channel name' }, { name: 'channel_id', desc: 'Channel ID' },
      { name: 'app_icon', desc: 'Custom PNG icon path' }, { name: 'logs', desc: 'Enable debug logs' },
    ]},
    addButton: { signature: 'addButton(text, on_release)', description: 'Adds an action button.', args: [{ name: 'text', desc: 'Button label' }, { name: 'on_release', desc: 'Callback' }] },
    removeButtons: { signature: 'removeButtons()', description: 'Removes all buttons.' },
    send: { signature: 'send(silent?, persistent?, close_on_click?)', description: 'Dispatches the notification.', args: [{ name: 'silent', desc: 'Suppress heads-up' }, { name: 'persistent', desc: 'Survives Clear All' }, { name: 'close_on_click', desc: 'Dismiss on tap' }] },
    updateTitle: { signature: 'updateTitle(new_title)', description: 'Updates title.' },
    updateMessage: { signature: 'updateMessage(new_message)', description: 'Updates message.' },
    updateProgressBar: { signature: 'updateProgressBar(value, msg?, title?, cooldown?)', description: 'Updates determinate progress bar.', args: [{ name: 'value', desc: 'Current progress' }, { name: 'cooldown', desc: 'Buffer, defaults 0.5s' }] },
    showInfiniteProgressBar: { signature: 'showInfiniteProgressBar()', description: 'Shows indeterminate progress bar.' },
    removeProgressBar: { signature: 'removeProgressBar(msg?, show?, title?)', description: 'Removes progress bar.' },
    addNotificationStyle: { signature: 'addNotificationStyle(style, sent?)', description: 'Applies a notification style.' },
  },
  handlers: [
    { id: 'getIdentifer', signature: 'NotificationHandler.getIdentifer()', description: 'Returns identifier for the notification that opened the app.' },
    { id: 'bindNotifyListener', signature: 'NotificationHandler.bindNotifyListener()', description: 'Global listener to notification taps.' },
    { id: 'unbindNotifyListener', signature: 'NotificationHandler.unbindNotifyListener()', description: 'Removes the global listener.' },
    { id: 'is_on_android', signature: 'NotificationHandler.is_on_android()', description: 'Returns true if on Android.' },
  ],
}

const REF159: RefData = {
  methods: {
    addLine: { signature: 'addLine(text)', description: 'Adds a line for inbox-style.', args: [{ name: 'text', desc: 'Line text' }] },
    setBigPicture: { signature: 'setBigPicture(path)', description: 'Sets big picture.', args: [{ name: 'path', desc: 'Path or URL' }] },
    setLargeIcon: { signature: 'setLargeIcon(path)', description: 'Sets large icon.', args: [{ name: 'path', desc: 'Path or URL' }] },
    setSmallIcon: { signature: 'setSmallIcon(path)', description: 'Sets small icon.', args: [{ name: 'path', desc: 'Path or URL' }] },
    setBigText: { signature: 'setBigText(body)', description: 'Sets big text for drop-down.', args: [{ name: 'body', desc: 'Text content' }] },
    setLines: { signature: 'setLines(lines)', description: 'Sets inbox lines.', args: [{ name: 'lines', desc: 'List of strings' }] },
    createChannel: { signature: 'createChannel(id, name, desc?, importance?)', description: 'Creates notification channel (Android 8+).', args: [
      { name: 'id', desc: 'Channel ID' }, { name: 'name', desc: 'Channel name' },
      { name: 'desc', desc: 'Description' }, { name: 'importance', desc: "['urgent','high','medium','low','none']" },
    ]},
    deleteChannel: { signature: 'deleteChannel(id)', description: 'Deletes a channel.' },
    deleteAllChannel: { signature: 'deleteAllChannel()', description: 'Deletes all channels.' },
    cancel: { signature: 'cancel(_id?)', description: 'Removes notification from tray.' },
    cancelAll: { signature: 'cancelAll()', description: 'Removes all notifications.' },
    setPriority: { signature: 'setPriority(importance)', description: 'Sets importance for pre-Android 8.' },
  },
  handlers: [
    { id: 'get_name', signature: 'NotificationHandler.get_name()', description: 'Returns name/id for the notification that opened the app.' },
    { id: 'bindNotifyListener', signature: 'NotificationHandler.bindNotifyListener()', description: 'Global listener to notification taps.' },
    { id: 'unbindNotifyListener', signature: 'NotificationHandler.unbindNotifyListener()', description: 'Removes the global listener.' },
    { id: 'is_on_android', signature: 'NotificationHandler.is_on_android()', description: 'Returns true if on Android.' },
  ],
}

const REF160: RefData = {
  methods: {
    addButton: { signature: 'addButton(text, on_release, receiver_name?, action?)', description: 'Adds an action button with optional broadcast receiver.', args: [
      { name: 'text', desc: 'Button label' }, { name: 'on_release', desc: 'Callback' },
      { name: 'receiver_name', desc: 'Custom BroadcastReceiver (optional)' }, { name: 'action', desc: 'Intent action for receiver' },
    ]},
    setBigText: { signature: 'setBigText(body, title?, summary?)', description: 'Sets big text for drop-down.', args: [
      { name: 'body', desc: 'Text content' }, { name: 'title', desc: 'Optional title' }, { name: 'summary', desc: 'Optional summary' },
    ]},
    createChannel: { signature: 'createChannel(id, name, desc?, importance?, vibrate?, sound?)', description: 'Creates notification channel (Android 8+).', args: [
      { name: 'id', desc: 'Channel ID' }, { name: 'name', desc: 'Channel name' },
      { name: 'desc', desc: 'Description' }, { name: 'importance', desc: "['urgent','high','medium','low','none']" },
      { name: 'vibrate', desc: 'Enable vibration' }, { name: 'sound', desc: 'Audio resource in res/raw' },
    ]},
    setWhen: { signature: 'setWhen(secs_ago)', description: 'Changes displayed creation time.' },
    channelExists: { signature: 'channelExists(id)', description: 'Checks if a channel exists.' },
    doChannelsExist: { signature: 'doChannelsExist(ids)', description: 'Returns IDs that do not exist.' },
    setSubText: { signature: 'setSubText(text)', description: 'Small text near the title.' },
    setColor: { signature: 'setColor(color)', description: 'Changes app icon color via hex.' },
    setData: { signature: 'setData(dict)', description: 'Attaches data for later use via handler.' },
    fVibrate: { signature: 'fVibrate()', description: 'Triggers 500ms vibration (emergencies).' },
    fill_args: { signature: 'fill_args(**kwargs)', description: 'Fills args without sending. For startForeground from service.' },
    setVibrate: { signature: 'setVibrate(pattern?)', description: 'Vibration pattern for pre-Android 8.' },
    setSound: { signature: 'setSound(name)', description: 'Custom sound for pre-Android 8.' },
    refresh: { signature: 'refresh()', description: 'Applies new components after send().' },
  },
  handlers: [
    { id: 'get_name', signature: 'NotificationHandler.get_name(on_start?)', description: 'Returns name/id. on_start=True when called from App.on_start().', args: [{ name: 'on_start', desc: 'Must be True from App.on_start()' }] },
    { id: 'has_permission', signature: 'NotificationHandler.has_permission()', description: 'Checks notification permission.' },
    { id: 'asks_permission', signature: 'NotificationHandler.asks_permission(callback?)', description: 'Requests permission.', args: [{ name: 'callback', desc: 'Called with True if granted' }] },
  ],
}

const REFS: Record<Version, RefData> = { '1.58': REF158, '1.59': REF159, '1.60': REF160 }
const ALL_V: Version[] = ['1.58', '1.59', '1.60']

export function getRefData(version: Version): RefData {
  const idx = ALL_V.indexOf(version)
  const merged: RefData = { methods: {}, handlers: [] }

  for (let i = 0; i <= idx; i++) {
    const v = ALL_V[i]
    const ref = REFS[v]
    for (const [k, m] of Object.entries(ref.methods)) {
      merged.methods[k] = { ...merged.methods[k], ...m }
      if (m.args) {
        const map = new Map((merged.methods[k].args || []).map(a => [a.name, a]))
        m.args.forEach(a => map.set(a.name, a))
        merged.methods[k].args = Array.from(map.values())
      }
    }
    for (const h of ref.handlers) {
      const ex = merged.handlers.findIndex(x => x.id === h.id)
      if (ex >= 0) merged.handlers[ex] = { ...merged.handlers[ex], ...h }
      else merged.handlers.push({ ...h })
    }
  }

  if (version === '1.60') merged.handlers = merged.handlers.filter(h => h.id !== 'getIdentifer' && h.id !== 'is_on_android')
  if (version === '1.59') merged.handlers = merged.handlers.filter(h => h.id !== 'getIdentifer')
  return merged
}

export function getNavSections() {
  return [
    { label: 'Features', href: '#features' },
    { label: 'Install', href: '#install' },
    { label: 'Components', href: '#components' },
    { label: 'API', href: '#api' },
    { label: 'Changelog', href: '#changelog' },
  ]
}
