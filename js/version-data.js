// Version data for Components, Advanced Methods, and Reference pages
const VERSIONS_DATA = {
  "1.58": {
    component_page: {
      big_picture_code: `from android_notify import Notification, NotificationStyles

Notification(
    title='Picture Alert!',
    message='This notification includes an image.',
    style=NotificationStyles.BIG_PICTURE,
    big_picture_path="assets/imgs/photo.png"
).send()`,
      large_icon_code: `from android_notify import Notification, NotificationStyles

Notification(
    title="FabianDev_",
    message="A twitter about some programming stuff",
    style=NotificationStyles.LARGE_ICON,
    large_icon_path="assets/imgs/profile.png"
).send()`,
      how_to_add_both_imgs: `<p class="paragraph">For Both Images pass in <span class="code">NotificationStyles.BOTH_IMGS</span> as argument to <span class="code">style</span> and provide both paths</p>`,
      small_icon_code: `from android_notify import Notification

Notification(
    app_icon="assets/icons/download.png",
    title="Custom Icon",
    message="Also persist notification test"
).send(persistent=True)`,
      buttons_code: `from android_notify import Notification

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

notification.addButton(text="Play",on_release=playVideo)
notification.addButton(text="Turn Off",on_release=turnOffNoti)
notification.addButton(text="Watch Later",on_release=watchLater)
notification.send()`,
      progressbar_code: `from android_notify import Notification, NotificationStyles
from kivy.clock import Clock

progress = 0

notification = Notification(
    title="Downloading...",
    message="0% downloaded",
    style=NotificationStyles.PROGRESS,
    progress_current_value=0,progress_max_value=100
    )
notification.send()

def update_progress(dt):
    global progress
    progress = min(progress + 10, 100)
    notification.updateProgressBar(
        progress, f"{progress}% downloaded"
    )
    return progress < 100  # Stops when reaching 100%

Clock.schedule_interval(update_progress, 3)`,
      inbox_style_code: `from android_notify import Notification, NotificationStyles

Notification(
    title='Inbox Notification',
    message='Line 1\\nLine 2\\nLine 3',
    style=NotificationStyles.INBOX,
).send()`,
      big_text_style_code: `from android_notify import Notification, NotificationStyles

Notification(
    title="Article",
    message="Histroy of Loerm Ipsuim",
    body="Lorem Ipsum is simply dummy text of the printing and ...",
    style=NotificationStyles.BIG_TEXT
).send()`,
      sub_text_code: null,
      an_colored_basic_small: null,
      an_colored_basic_large: null,
      colored_text_code: null
    },
    advanced_methods_page: {
      channel_management_code: `from android_notify import Notification

Notification(
    title="Download finished",
    message="How to Catch a Fish.mp4",
    channel_name="Download Notifications",
    channel_id="downloads_notifications"
).send()`,
      getting_identifier_code: `
from kivymd.app import MDApp
from android_notify import Notification, NotificationHandler

class Myapp(MDApp):
    
    def on_start(self):
        Notification(
            title="Change Page",
            message="Click to change App page.",
            identifer='change_app_page'
        ).send()

        Notification(
            title="Change Color",
            message="Click to change App Color",
            identifer='change_app_color'
        ).send()

    def on_resume(self):
        notify_identifer = NotificationHandler.getIdentifer()
        if notify_identifer == 'change_app_page':
            pass
        elif notify_identifer == 'change_app_color':
            pass`,
      custom_sound_code: null,
      vibrate_code: null
    },
    reference_page: {
      NOTIFICATION_METHODS: {
        init: {
          signature: "init",
          description: "Initializes the notification instance.",
          args: [
            { name: "title", desc: "string containing notification title" },
            { name: "message", desc: "string containing notification message" },
            { name: "progress_current_value", desc: "integer to set progress bar current value (for PROGRESS style)." },
            { name: "progress_max_value", desc: "integer for max range for progress value." },
            { name: "style", desc: "can be ['simple','progress','inbox','big_text','large_icon','big_picture','both_imgs']" },
            { name: "big_picture_path", desc: "path or url to big image (for BIG_PICTURE style)" },
            { name: "large_icon_path", desc: "path or url to image (for LARGE_ICON style)" },
            { name: "body", desc: "Detailed text (for BIG_TEXT style)." },
            { name: "callback", desc: "Function executed on notification tap." },
            { name: "channel_name", desc: "Human-readable channel name." },
            { name: "channel_id", desc: "Used to later reference Channel when sending each notification." },
            { name: "app_icon", desc: "If not specified, defaults to the app icon. To change it, use a PNG." },
            { name: "logs", desc: "Enable debug logs when not on Android." }
          ]
        },
        addButton: { signature: "addButton(text, on_release)", description: "Adds an action button to the notification.", args: [{ name: "text", desc: "Label for the button." }, { name: "on_release", desc: "Callback invoked when the button is tapped." }] },
        removeButtons: { signature: "removeButtons()", description: "Removes all action buttons from the notification." },
        removeProgressBar: { signature: "removeProgressBar(message?, show_on_update?, title?)", description: "Removes the progress bar and (optionally) updates the title/message.", args: [{ name: "message", desc: "(Optional) New message; defaults to last." }, { name: "show_on_update", desc: "If true, briefly shows the updated notification. Defaults to true." }, { name: "title", desc: "(Optional) New title; defaults to last." }] },
        send: { signature: "send(silent?, persistent?, close_on_click?)", description: "Dispatches the notification.", args: [{ name: "silent", desc: "If true, suppresses the heads-up alert." }, { name: "persistent", desc: "If true, the notification survives Clear All." }, { name: "close_on_click", desc: "If true, tapping the notification dismisses it." }] },
        showInfiniteProgressBar: { signature: "showInfiniteProgressBar()", description: "Shows an indeterminate progress bar. Remove with removeProgressBar() or update with updateProgressBar()." },
        updateMessage: { signature: "updateMessage(new_message)", description: "Updates the notification message.", args: [{ name: "new_message", desc: "String for the new message." }] },
        addNotificationStyle: { signature: "addNotificationStyle(style, already_sent?)", description: "Applies or updates a notification style (big_text, inbox, images, etc.).", args: [{ name: "style", desc: "One of ['simple','progress','inbox','big_text','large_icon','big_picture','both_imgs']" }, { name: "already_sent", desc: "If true, re-dispatches the notification so style changes appear immediately." }] },
        updateProgressBar: { signature: "updateProgressBar(current_value, message?, title?, cooldown?)", description: "Updates a determinate progress bar (0 - max). Internally throttled to 0.5 s.", args: [{ name: "current_value", desc: "Current progress (number)." }, { name: "message", desc: "(Optional) New message; defaults to last." }, { name: "title", desc: "(Optional) New title; defaults to last." }, { name: "cooldown", desc: "Defaults to 0.5secs, buffer time for when changes happen too fast." }] },
        updateTitle: { signature: "updateTitle(new_title)", description: "Updates the notification title.", args: [{ name: "new_title", desc: "String for the new title." }] }
      },
      HANDLER_METHODS: [
        { id: "getIdentifer", signature: "NotificationHandler.getIdentifer()", description: "Returns the unique string identifier for the notification or button that opened the app." },
        { id: "bindNotifyListener", signature: "NotificationHandler.bindNotifyListener()", description: "Binds by Default, Attaches a global listener to notification taps." },
        { id: "unbindNotifyListener", signature: "NotificationHandler.unbindNotifyListener()", description: "Removes the listener set by bindNotifyListener()." },
        { id: "is_on_android", signature: "NotificationHandler.is_on_android()", description: "Returns true if running on Android, false otherwise." }
      ],
      STYLE_ATTRIBUTES: [
        { id: "simple", signature: "NotificationStyles.DEFAULT", description: 'contains default style "simple"' },
        { id: "LARGE_ICON", signature: "NotificationStyles.LARGE_ICON", description: "contains 'large_icon' value" },
        { id: "BIG_PICTURE", signature: "NotificationStyles.BIG_PICTURE", description: "contains 'big_picture' value" },
        { id: "BOTH_IMGS", signature: "NotificationStyles.BOTH_IMGS", description: "contains 'both_imgs' value" },
        { id: "PROGRESS", signature: "NotificationStyles.PROGRESS", description: "contains 'progress' value" },
        { id: "INBOX", signature: "NotificationStyles.INBOX", description: "contains 'inbox' value" },
        { id: "BIG_TEXT", signature: "NotificationStyles.BIG_TEXT", description: "contains 'big_text' value" }
      ]
    }
  },

  "1.59": {
    component_page: {
      big_picture_code: `from android_notify import Notification

notification = Notification(
    title='Picture Alert!',
    message='This notification includes an image.'
)
notification.setBigPicture("assets/imgs/photo.png")
notification.send()`,
      large_icon_code: `from android_notify import Notification

notification = Notification(
    title="FabianDev_",
    message="A twitter about some programming stuff"
)
notification.setLargeIcon("assets/imgs/profile.png")
notification.send()`,
      how_to_add_both_imgs: `<p class="paragraph">For Both Images use <span class="code">Notification.setBigPicture</span> and <span class="code">Notification.setLargeIcon</span> together</p>`,
      small_icon_code: `from android_notify import Notification

notification = Notification(
    title="custom icon notification",
    message="using .setSmallIcon to set notification icon"
)
notification.setSmallIcon("icons/butterfly.png")
notification.send(persistent=True)`,
      buttons_code: `from android_notify import Notification

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

notification.addButton(text="Play",on_release=playVideo)
notification.addButton(text="Turn Off",on_release=turnOffNoti)
notification.addButton(text="Watch Later",on_release=watchLater)
notification.send()`,
      progressbar_code: `from android_notify import Notification
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
    
    if progress==100:
        notification.removeProgressBar(title="File Downloaded", message="super_large_file.zip")
    elif progress >= 80:
        notification.showInfiniteProgressBar()
    else:
        notification.updateProgressBar(progress, f"{progress}% downloaded")

    return progress < 100  # Ends loop when reaching 100%

Clock.schedule_interval(update_progress, 3)`,
      inbox_style_code: `from android_notify import Notification

notification = Notification(
    title="5 New mails from Frank",
    message="Check them out",
)
notification.addLine("Re: Planning")
notification.addLine("Delivery on its way")
notification.addLine("Follow-up")
notification.send()`,
      big_text_style_code: `from android_notify import Notification

notification = Notification(
    title="Article",
    message="Histroy of Loerm Ipsuim",
)
notification.setBigText("Lorem Ipsum is simply dummy text of the printing and ...")
notification.send()`,
      sub_text_code: null,
      an_colored_basic_small: null,
      an_colored_basic_large: null,
      colored_text_code: null
    },
    advanced_methods_page: {
      channel_management_code: `from android_notify import Notification

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
      getting_identifier_code: `
from kivymd.app import MDApp
from android_notify import Notification, NotificationHandler

class Myapp(MDApp):
    
    def build(self):
        Notification(
            title="Change Page",
            message="Click to change App page.",
            name='change_app_page'
        ).send()

        Notification(
            title="Change Color",
            message="Click to change App Color",
            name='change_app_color'
        ).send()

    def on_resume(self):
        name = NotificationHandler.get_name()
        if name == 'change_app_page':
            pass
        elif name == 'change_app_color':
            pass`,
      custom_sound_code: null,
      vibrate_code: null
    },
    reference_page: {
      NOTIFICATION_METHODS: {
        init: {
          signature: "init",
          description: "Initializes the notification instance.",
          args: [
            { name: "id", desc: "a unique integer less than 2_147_483_647 that can be used to reference specific notification (Optional)." },
            { name: "body", desc: " -- use setBigText() instead." },
            { name: "lines_txt", desc: " -- use addLine() instead." },
            { name: "big_picture_path", desc: "-- use setBigPicture() instead." },
            { name: "large_icon_path", desc: "-- use setLargeIcon() instead." },
            { name: "style", desc: "use ['addLine()','setBigText()','setLargeIcon()','setBigPicture()'] instead." }
          ]
        },
        addLine: { signature: "addLine(text)", description: "sets text for new line for inbox-style notification", args: [{ name: "text", desc: "String for new line of text." }] },
        setBigPicture: { signature: "setBigPicture(path)", description: "set a Big Picture at the bottom.", args: [{ name: "path", desc: "Image can be Relative Path or URL." }] },
        setLargeIcon: { signature: "setLargeIcon(path)", description: "sets Large icon to the right.", args: [{ name: "path", desc: "Image can be Relative Path or URL." }] },
        setSmallIcon: { signature: "setSmallIcon(path)", description: "sets small icon to the top left.", args: [{ name: "path", desc: "Image can be Relative Path or URL." }] },
        setBigText: { signature: "setBigText(body)", description: "Sets a big text for when drop down button is pressed.", args: [{ name: "body", desc: "The big text that will be displayed." }] },
        setLines: { signature: "setLines(lines)", description: "Sets inbox lines texts for when drop down button is pressed.", args: [{ name: "lines", desc: "The List of texts that will be used to create new lines." }] },
        addButton: { signature: "addButton(text, on_release)", description: "Adds an action button to the notification.", args: [{ name: "text", desc: "Label for the button." }, { name: "on_release", desc: "Callback invoked when the button is tapped." }] },
        createChannel: { signature: "createChannel(id, name, description?, importance?)", description: "Creates a user visible toggle button for specific notifications, Required For Android 8.0+", args: [{ name: "id", desc: "Used to identify channel." }, { name: "name", desc: "user-visible channel name." }, { name: "description", desc: "user-visible detail about channel." }, { name: "importance", desc: "['urgent', 'high', 'medium', 'low', 'none'] defaults to 'urgent'." }] },
        deleteChannel: { signature: "deleteChannel(channel_id)", description: "Uses channel_id to delete notification channel", args: [{ name: "channel_id", desc: "id for specific channel" }] },
        deleteAllChannel: { signature: "deleteAllChannel()", description: "Delete All notification channels" },
        cancel: { signature: "cancel(_id)", description: "Removes Notification instance from tray.", args: [{ name: "_id", desc: "Not required uses instance id as default" }] },
        cancelAll: { signature: "cancelAll()", description: "Removes App Notifications from tray." },
        setPriority: { signature: "setPriority(importance)", description: "Sets Importance For devices less than android 8.", args: [{ name: "importance", desc: "['urgent', 'high', 'medium', 'low', 'none'] defaults to 'urgent'." }] },
        removeButtons: { signature: "removeButtons()", description: "Removes all action buttons from the notification." },
        removeProgressBar: { signature: "removeProgressBar(message?, show_on_update?, title?)", description: "Removes the progress bar and (optionally) updates the title/message.", args: [{ name: "message", desc: "(Optional) New message; defaults to last." }, { name: "show_on_update", desc: "If true, briefly shows the updated notification." }, { name: "title", desc: "(Optional) New title; defaults to last." }] },
        send: { signature: "send(silent?, persistent?, close_on_click?)", description: "Dispatches the notification.", args: [{ name: "silent", desc: "If true, suppresses the heads-up alert." }, { name: "persistent", desc: "If true, the notification survives Clear All." }, { name: "close_on_click", desc: "If true, tapping the notification dismisses it." }] },
        showInfiniteProgressBar: { signature: "showInfiniteProgressBar()", description: "Shows an indeterminate progress bar." },
        updateMessage: { signature: "updateMessage(new_message)", description: "Updates the notification message.", args: [{ name: "new_message", desc: "String for the new message." }] },
        updateProgressBar: { signature: "updateProgressBar(current_value, message?, title?, cooldown?)", description: "Updates a determinate progress bar (0 - max).", args: [{ name: "current_value", desc: "Current progress (number)." }, { name: "message", desc: "(Optional) New message." }, { name: "title", desc: "(Optional) New title." }, { name: "cooldown", desc: "Defaults to 0.5secs." }] },
        updateTitle: { signature: "updateTitle(new_title)", description: "Updates the notification title.", args: [{ name: "new_title", desc: "String for the new title." }] }
      },
      HANDLER_METHODS: [
        { id: "get_name", signature: "NotificationHandler.get_name()", description: "Returns the unique string name or id for the notification or button that opened the app." },
        { id: "bindNotifyListener", signature: "NotificationHandler.bindNotifyListener()", description: "Attaches a global listener to notification taps." },
        { id: "unbindNotifyListener", signature: "NotificationHandler.unbindNotifyListener()", description: "Removes the listener set by bindNotifyListener()." },
        { id: "is_on_android", signature: "NotificationHandler.is_on_android()", description: "Returns true if running on Android." }
      ],
      STYLE_ATTRIBUTES: [
        { id: "LARGE_ICON", signature: "NotificationStyles.LARGE_ICON", description: "contains 'large_icon' value" },
        { id: "BIG_PICTURE", signature: "NotificationStyles.BIG_PICTURE", description: "contains 'big_picture' value" },
        { id: "BOTH_IMGS", signature: "NotificationStyles.BOTH_IMGS", description: "contains 'both_imgs' value" },
        { id: "PROGRESS", signature: "NotificationStyles.PROGRESS", description: "contains 'progress' value" },
        { id: "INBOX", signature: "NotificationStyles.INBOX", description: "contains 'inbox' value" }
      ]
    }
  },

  "1.60": {
    component_page: {
      big_picture_code: `from android_notify import Notification

notification = Notification(
    title='Picture Alert!',
    message='This notification includes an image.'
)
notification.setBigPicture("assets/imgs/photo.png")
notification.send()`,
      large_icon_code: `from android_notify import Notification

notification = Notification(
    title="FabianDev_",
    message="A twitter about some programming stuff"
)
notification.setLargeIcon("assets/imgs/profile.png")
notification.send()`,
      how_to_add_both_imgs: `<p class="paragraph">For Both Images use <span class="code">Notification.setBigPicture</span> and <span class="code">Notification.setLargeIcon</span> together</p>`,
      small_icon_code: `from android_notify import Notification

notification = Notification(
    title="custom icon notification",
    message="using .setSmallIcon to set notification icon"
)
notification.setSmallIcon("icons/butterfly.png")
notification.send(persistent=True)`,
      buttons_code: `from android_notify import Notification

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

notification.addButton(text="Play",on_release=playVideo)
notification.addButton(text="Turn Off",on_release=turnOffNoti)
notification.addButton(text="Watch Later",on_release=watchLater)
notification.send()`,
      progressbar_code: `from android_notify import Notification
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
    
    if progress==100:
        notification.removeProgressBar(title="File Downloaded", message="super_large_file.zip")
    elif progress >= 80:
        notification.showInfiniteProgressBar()
    else:
        notification.updateProgressBar(progress, f"{progress}% downloaded")

    return progress < 100

Clock.schedule_interval(update_progress, 3)`,
      inbox_style_code: `from android_notify import Notification

notification = Notification(
    title="5 New mails from Frank",
    message="Check them out",
)
notification.addLine("Re: Planning")
notification.addLine("Delivery on its way")
notification.addLine("Follow-up")
notification.send()`,
      big_text_style_code: `from android_notify import Notification

notification = Notification(
    title="Article",
    message="Histroy of Loerm Ipsuim",
)
notification.setBigText("Lorem Ipsum is simply dummy text of the printing and ...")
notification.send()`,
      sub_text_code: `from android_notify import Notification

notification = Notification(
    title="Downloading...",
    message="70% downloaded",
    progress_max_value=100
)
notification.setSubText("19 secs left")

notification.setColor("#00FF00")
notification.updateProgressBar(70)
notification.send()`,
      an_colored_basic_small: `<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="vertical">

    <TextView
        android:id="@+id/title"
        android:layout_width="wrap_content"
        android:layout_height="0dp"
        android:layout_weight="1"
    />

</LinearLayout>`,
      an_colored_basic_large: `<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="vertical">

    <TextView
        android:id="@+id/title"
        android:layout_width="wrap_content"
        android:layout_height="0dp"
        android:layout_weight="1"
    />

    <TextView
        android:id="@+id/message"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="4dp"
    />

</LinearLayout>`,
      colored_text_code: `from android_notify import Notification

Notification(title="Title Color", message="Testing Color",title_color="red").send()`
    },
    advanced_methods_page: {
      channel_management_code: `from android_notify import Notification

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
      getting_identifier_code: `
from kivymd.app import MDApp
from android_notify import Notification, NotificationHandler


def use_name(name):
    if name == 'change_app_page':
        pass
    elif name == 'change_app_color':
        pass


class Myapp(MDApp):

    def on_start(self):
        name = NotificationHandler.get_name(on_start=True)
        use_name(name)

    def build(self):
        Notification(
            title="Change Page",
            message="Click to change App page.",
            name='change_app_page'
        ).send()

        Notification(
            title="Change Color",
            message="Click to change App Color",
            name='change_app_color'
        ).send()

    def on_resume(self):
        name = NotificationHandler.get_name()
        use_name(name)`,
      custom_sound_code: `from android_notify import Notification

Notification.createChannel(
    id="weird_sound_tester",
    name="Weird Sound Tester",
    description="A test channel for custom sounds from the res/raw folder.",
    res_sound_name="sneeze"
)

n = Notification(
    title="Custom Sound Notification",
    message="This tests playback of a custom sound (sneeze.wav) stored in res/raw.",
    channel_id="weird_sound_tester"
)
n.setSound("sneeze")
n.send()`,
      vibrate_code: `from android_notify import Notification

Notification.createChannel(
    id='shake',
    name="Shake Passage",
    vibrate=True
)

n = Notification(
    title='Vibrate',
    channel_id='shake'
)
n.setVibrate()
n.fVibrate()
n.send()`
    },
    reference_page: {
      NOTIFICATION_METHODS: {
        addButton: { signature: "addButton(text, on_release)", description: "Adds an action button to the notification.", args: [{ name: "text", desc: "Label for the button." }, { name: "on_release", desc: "Callback invoked when the button is tapped." }, { name: "receiver_name", desc: "Optional string to specify a custom BroadcastReceiver." }, { name: "action", desc: "Optional string to specify a custom intent action." }] },
        setBigText: { signature: "setBigText(body)", description: "Sets a big text for when drop down button is pressed.", args: [{ name: "body", desc: "The big text that will be displayed." }, { name: "title", desc: "You can also set title for big text style." }, { name: "summary", desc: "You can also set summary for big text style." }] },
        createChannel: { signature: "createChannel(id, name, description?, importance?)", description: "Creates a user visible toggle button for specific notifications, Required For Android 8.0+", args: [{ name: "id", desc: "Used to identify channel." }, { name: "name", desc: "user-visible channel name." }, { name: "description", desc: "user-visible detail about channel." }, { name: "importance", desc: "['urgent', 'high', 'medium', 'low', 'none'] defaults to 'urgent'." }, { name: "vibrate", desc: "Boolean if to vibrate when sent for channel." }, { name: "sound", desc: "String of audio name in res/raw to be played." }] },
        setWhen: { signature: "setWhen(secs_ago)", description: "Changes the time the notification was created.", args: [{ name: "secs_ago", desc: "Int of Seconds ago from current time." }] },
        channelExists: { signature: "channelExists(channel_id)", description: "Checks if a channel with given id exists", args: [{ name: "channel_id", desc: "id for specific channel" }] },
        doChannelsExist: { signature: "doChannelsExist(ids)", description: "Accepts a list of channel IDs and returns those that do not exist", args: [{ name: "ids", desc: "List of channel ids" }] },
        setSubText: { signature: "setSubText(text)", description: "Adds small text near the title.", args: [{ name: "text", desc: "The subtext that will be displayed." }] },
        setColor: { signature: "setColor(color)", description: "changes app icon color using hex code.", args: [{ name: "color", desc: "either string (red,green,blue) or color in hex code." }] },
        setData: { signature: "setData(data_object)", description: "Attach a dictionary of data for possible later use.", args: [{ name: "data_object", desc: "A dictionary of data that can be accessed later." }] },
        fVibrate: { signature: "fVibrate(pattern)", description: "For when regular notifications vibrate turned off in device settings." },
        fill_args: { signature: "fill_args(**kwargs)", description: "Takes same Arguments as send method. Returns builder object. Fills notification args without sending.", args: [{ name: "**kwargs", desc: "Same arguments as send method." }] },
        setVibrate: { signature: "setVibrate(pattern)", description: "For devices less than Android 8, sets vibration pattern.", args: [{ name: "pattern", desc: "Vibration pattern, accepts a list of ints." }] },
        setSound: { signature: "setSound(res_sound_name)", description: "For devices less than Android 8, changes the default notification sound.", args: [{ name: "res_sound_name", desc: "The name of the sound resource in your app." }] },
        refresh: { signature: "refresh()", description: "Applies new components after using the send() method." },
        addLine: { signature: "addLine(text)", description: "sets text for new line for inbox-style notification", args: [{ name: "text", desc: "String for new line of text." }] },
        setBigPicture: { signature: "setBigPicture(path)", description: "set a Big Picture at the bottom.", args: [{ name: "path", desc: "Image can be Relative Path or URL." }] },
        setLargeIcon: { signature: "setLargeIcon(path)", description: "sets Large icon to the right.", args: [{ name: "path", desc: "Image can be Relative Path or URL." }] },
        setSmallIcon: { signature: "setSmallIcon(path)", description: "sets small icon to the top left.", args: [{ name: "path", desc: "Image can be Relative Path or URL." }] },
        setLines: { signature: "setLines(lines)", description: "Sets inbox lines texts.", args: [{ name: "lines", desc: "The List of texts." }] },
        deleteChannel: { signature: "deleteChannel(channel_id)", description: "Uses channel_id to delete notification channel", args: [{ name: "channel_id", desc: "id for specific channel" }] },
        deleteAllChannel: { signature: "deleteAllChannel()", description: "Delete All notification channels" },
        cancel: { signature: "cancel(_id)", description: "Removes Notification instance from tray.", args: [{ name: "_id", desc: "Not required uses instance id as default" }] },
        cancelAll: { signature: "cancelAll()", description: "Removes App Notifications from tray." },
        setPriority: { signature: "setPriority(importance)", description: "Sets Importance For devices less than android 8.", args: [{ name: "importance", desc: "['urgent', 'high', 'medium', 'low', 'none'] defaults to 'urgent'." }] },
        removeButtons: { signature: "removeButtons()", description: "Removes all action buttons from the notification." },
        removeProgressBar: { signature: "removeProgressBar(message?, show_on_update?, title?)", description: "Removes the progress bar and (optionally) updates the title/message.", args: [{ name: "message", desc: "(Optional) New message." }, { name: "show_on_update", desc: "If true, briefly shows the updated notification." }, { name: "title", desc: "(Optional) New title." }] },
        send: { signature: "send(silent?, persistent?, close_on_click?)", description: "Dispatches the notification.", args: [{ name: "silent", desc: "If true, suppresses the heads-up alert." }, { name: "persistent", desc: "If true, the notification survives Clear All." }, { name: "close_on_click", desc: "If true, tapping the notification dismisses it." }] },
        showInfiniteProgressBar: { signature: "showInfiniteProgressBar()", description: "Shows an indeterminate progress bar." },
        updateMessage: { signature: "updateMessage(new_message)", description: "Updates the notification message.", args: [{ name: "new_message", desc: "String for the new message." }] },
        updateProgressBar: { signature: "updateProgressBar(current_value, message?, title?, cooldown?)", description: "Updates a determinate progress bar (0 - max).", args: [{ name: "current_value", desc: "Current progress (number)." }, { name: "message", desc: "(Optional) New message." }, { name: "title", desc: "(Optional) New title." }, { name: "cooldown", desc: "Defaults to 0.5secs." }] },
        updateTitle: { signature: "updateTitle(new_title)", description: "Updates the notification title.", args: [{ name: "new_title", desc: "String for the new title." }] }
      },
      HANDLER_METHODS: [
        { id: "get_name", signature: "NotificationHandler.get_name()", description: "Returns the unique string name or id for the notification or button that opened the app.", args: [{ name: "on_start", desc: "must be True when called from App.on_start(), defaults to False." }] },
        { id: "has_permission", signature: "NotificationHandler.has_permission()", description: "Checks if the app has notification permission. Returns True if granted." },
        { id: "asks_permission", signature: "NotificationHandler.asks_permission(callback?)", description: "Requests notification permission from the user.", args: [{ name: "callback", desc: "Optional function called with True if permission is granted." }] }
      ],
      STYLE_ATTRIBUTES: undefined
    }
  }
};

// Merge logic: each version inherits from previous
function getMergedVersionData(version) {
  const ORDER = ["1.58", "1.59", "1.60"];
  const idx = ORDER.indexOf(version);
  if (idx === -1) return VERSIONS_DATA["1.60"];

  const REMOVALS = {
    "1.60": { handlers: ["getIdentifer", "is_on_android"] },
    "1.59": { handlers: ["getIdentifer"] }
  };

  // Merge component_page
  let component = {};
  for (let i = 0; i <= idx; i++) {
    const v = VERSIONS_DATA[ORDER[i]];
    if (v && v.component_page) component = { ...component, ...v.component_page };
  }

  // Merge advanced_methods_page
  let advanced = {};
  for (let i = 0; i <= idx; i++) {
    const v = VERSIONS_DATA[ORDER[i]];
    if (v && v.advanced_methods_page) advanced = { ...advanced, ...v.advanced_methods_page };
  }

  // Merge reference_page with removals
  let methods = {};
  let handlers = [];
  let styles = [];
  const removal = REMOVALS[version];

  for (let i = 0; i <= idx; i++) {
    const v = VERSIONS_DATA[ORDER[i]];
    if (!v || !v.reference_page) continue;

    // Merge methods
    const rm = v.reference_page.NOTIFICATION_METHODS || {};
    for (const key in rm) {
      if (!methods[key]) {
        methods[key] = { ...rm[key] };
      } else {
        const prev = methods[key];
        const next = rm[key];
        if (next.signature) prev.signature = next.signature;
        if (next.description) prev.description = next.description;
        if (next.args) {
          const argMap = new Map((prev.args || []).map(a => [a.name, a]));
          next.args.forEach(a => argMap.set(a.name, a));
          prev.args = Array.from(argMap.values());
        }
      }
    }

    // Merge handlers
    const rh = v.reference_page.HANDLER_METHODS || [];
    const handlerMap = new Map(handlers.map(h => [h.id, h]));
    rh.forEach(h => handlerMap.set(h.id, { ...handlerMap.get(h.id), ...h }));
    handlers = Array.from(handlerMap.values());

    // Merge styles
    const rs = v.reference_page.STYLE_ATTRIBUTES;
    if (rs) {
      const styleMap = new Map(styles.map(s => [s.id, s]));
      rs.forEach(s => styleMap.set(s.id, { ...styleMap.get(s.id), ...s }));
      styles = Array.from(styleMap.values());
    }
  }

  // Apply removals
  if (removal && removal.handlers) {
    handlers = handlers.filter(h => !removal.handlers.includes(h.id));
  }

  return {
    component_page: component,
    advanced_methods_page: advanced,
    reference_page: {
      NOTIFICATION_METHODS: methods,
      HANDLER_METHODS: handlers,
      STYLE_ATTRIBUTES: styles.length > 0 ? styles : undefined
    }
  };
}

// Installation code snippets
const INSTALLATION_CODE = {
  buildozer: `# Ensure pyjnius is included in the build
requirements = python3, kivy, pyjnius, android-notify

# Notification Permission
android.permissions = POST_NOTIFICATIONS

# AndroidX dependency
android.gradle_dependencies = androidx.core:core:1.12.0
android.enable_androidx = True`,
  buildozer_no_androidx: `requirements = python3, kivy, pyjnius, android-notify==1.60.10.dev0
android.permissions = POST_NOTIFICATIONS`,
  flet: `[tool.flet.android]
dependencies = [
  "pyjnius","android-notify==1.60.10.dev0"
]

[tool.flet.android.permission]
"android.permission.POST_NOTIFICATIONS" = true`,
  pip: `pip install android-notify`,
  basic_usage: `from android_notify import Notification, NotificationHandler

# Create a simple notification
def send_notification(ans):
    Notification(
        title="Hello From Python",
        message="This is a basic notification."
    ).send()

NotificationHandler.asks_permission(send_notification)`,
  pydroid: `# Testing with "android-notify==1.60.10.dev0" on pydroid
from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.button import Button
from android_notify import Notification
from android_notify.core import asks_permission_if_needed


class AndroidNotifyDemoApp(App):
    def build(self):
        layout = BoxLayout(orientation='vertical', spacing=10, padding=20)
        layout.add_widget(Button(
            text="Ask Notification Permission",
            on_release=self.request_permission
        ))
        layout.add_widget(Button(
            text="Send Notification",
            on_release=self.send_notification
        ))
        return layout

    def request_permission(self, *args):
        asks_permission_if_needed(legacy=True)

    def send_notification(self, *args):
        Notification(
            title="Hello from Android Notify",
            message="This is a basic notification."
        ).send()


if __name__ == "__main__":
    AndroidNotifyDemoApp().run()`
};
