# Android Notify v1.60 — API Reference

## Notification

### init

Initializes the notification instance.

**Returns:** self

| Parameter | Description |
|-----------|-------------|
| `title` | string containing notification title |
| `message` | string containing notification message |
| `progress_current_value` | integer to set progress bar current value (for `PROGRESS` style). |
| `progress_max_value` | integer for max range for progress value. |
| `style` | use ['addLine()','setBigText()','setLargeIcon()','setBigPicture()'] instead. |
| `big_picture_path` | -- use setBigPicture() instead. |
| `large_icon_path` | -- use setLargeIcon() instead. |
| `body` |  -- use setBigText() instead. |
| `callback` | Function executed on notification tap. |
| `channel_name` | Human-readable channel name. |
| `channel_id` | Used to later reference Channel when sending each notification (extracted from channel name if provided or defaults to 'default_channel'). |
| `app_icon` | If not specified, defaults to the app icon. To change it, use a PNG—otherwise it will render as a black box. |
| `logs` | Enable debug logs when not on Android. |
| `id` | a unique integer less than 2_147_483_647 that can be used to reference specific notification or handly to reference old notification instance (Optional, it's created by default). |
| `lines_txt` |  -- use addLine() instead. |

### addButton(text, on_release)

Adds an action button to the notification.

**Returns:** None

| Parameter | Description |
|-----------|-------------|
| `text` | Label for the button. |
| `on_release` | Callback invoked when the button is tapped. |
| `receiver_name` | Optional string to specify a custom BroadcastReceiver for the button action, defaults to None |
| `action` | Optional string to specify a custom intent action for receiver_name BroadcastReceiver, defaults to None |

### removeButtons()

Removes all action buttons from the notification.

**Returns:** None

### removeProgressBar(message?, show_on_update?, title?)

Removes the progress bar and (optionally) updates the title/message.

**Returns:** None

| Parameter | Description |
|-----------|-------------|
| `message` | (Optional) New message; defaults to last. |
| `show_on_update` | If true, briefly shows the updated notification. Defaults to true. |
| `title` | (Optional) New title; defaults to last. |

### send(silent?, persistent?, close_on_click?)

Dispatches the notification.

**Returns:** None

| Parameter | Description |
|-----------|-------------|
| `silent` | If true, suppresses the heads-up alert. |
| `persistent` | If true, the notification survives “Clear All.” |
| `close_on_click` | If true, tapping the notification dismisses it. |

### showInfiniteProgressBar()

Shows an indeterminate progress bar. Remove with `removeProgressBar()` or update with `updateProgressBar()`.

**Returns:** None

### updateMessage(new_message)

Updates the notification message.

**Returns:** None

| Parameter | Description |
|-----------|-------------|
| `new_message` | String for the new message. |

### addNotificationStyle(style, already_sent?)

Applies or updates a notification style (big_text, inbox, images, etc.).

**Returns:** None

| Parameter | Description |
|-----------|-------------|
| `style` | One of ['simple','progress','inbox','big_text','large_icon','big_picture','both_imgs'] |
| `already_sent` | If true, re-dispatches the notification so style changes appear immediately. |

### updateProgressBar(current_value, message?, title?, cooldown?)

Updates a determinate progress bar (0 – max). Internally throttled to 0.5 s.

**Returns:** None

| Parameter | Description |
|-----------|-------------|
| `current_value` | Current progress (number). |
| `message` | (Optional) New message; defaults to last. |
| `title` | (Optional) New title; defaults to last. |
| `cooldown` | Defaults to 0.5secs,buffer time for when changes happen too fast, shouldn't be changed unless tested on specific device |

### updateTitle(new_title)

Updates the notification title.

**Returns:** None

| Parameter | Description |
|-----------|-------------|
| `new_title` | String for the new title. |

### addLine(text)

sets text for new line for inbox-style notification

**Returns:** None

| Parameter | Description |
|-----------|-------------|
| `text` | String for new line of text. |

### setBigPicture(path)

set a Big Picture at the bottom.

**Returns:** None

| Parameter | Description |
|-----------|-------------|
| `path` | Image can be `Relative Path` or `URL`. |

### setLargeIcon(path)

sets Large icon to the right.

**Returns:** None

| Parameter | Description |
|-----------|-------------|
| `path` | Image can be `Relative Path` or `URL`. |

### setSmallIcon(path)

sets small icon to the top left.

**Returns:** None

| Parameter | Description |
|-----------|-------------|
| `path` | Image can be `Relative Path` or `URL`. |

### setBigText(body)

Sets a big text for when drop down button is pressed.

**Returns:** None

| Parameter | Description |
|-----------|-------------|
| `body` | The big text that will be displayed. |
| `title` | You can also set title for big text style, if not provided it nothing displays. |
| `summary` | You can also set summary for big text style, if not provided it nothing displays. |

### setLines(lines)

Sets a inbox lines texts for when drop down button is pressed, each string will be in a new line

**Returns:** None

| Parameter | Description |
|-----------|-------------|
| `lines` | The List of texts that'll be used to create new lines. |

### createChannel(id, name:str, description?,importance:Importance?)

Creates a user visible toggle button for specific notifications, Required For Android 8.0+

**Returns:** bool | None — True if created, False if already exists, None if not on Android

| Parameter | Description |
|-----------|-------------|
| `id` | Used to identify channel and send other notifications later through same channel. |
| `name` | user-visible channel name. |
| `description` | user-visible detail about channel (Not required defaults to empty str). |
| `importance` | ['urgent', 'high', 'medium', 'low', 'none'] defaults to 'urgent' i.e. makes a sound and shows briefly |
| `vibrate` | Boolean if to vibrate when sent for channel, defaults to False |
| `res_sound_name` | String of audio name in your app res/raw to be played when sent from channel, defaults to regular system notification sound |

### deleteChannel(channel_id)

Uses channel_id to delete notification channel

**Returns:** bool | None — True if deleted, False if not found, None if not on Android

| Parameter | Description |
|-----------|-------------|
| `channel_id` | id for specific channel |

### deleteAllChannel()

Delete All notification channels

**Returns:** int — count of channels deleted

### cancel(_id)

Removes Notification instance from tray.

**Returns:** None

| Parameter | Description |
|-----------|-------------|
| `_id` | Not required uses instance id as default |

### cancelAll()

Removes App Notifications from tray.

**Returns:** None

### setPriority(importance)

Sets <div className="reference">Importance</div> For devices less than android 8.

**Returns:** None

| Parameter | Description |
|-----------|-------------|
| `importance` | ['urgent', 'high', 'medium', 'low', 'none'] defaults to 'urgent' i.e. makes a sound and shows briefly. |

### setWhen(secs_ago)

Changes the time the notification was created, it accepts seconds ago as argument so that it can show up as if it was created in the past.

**Returns:** None

| Parameter | Description |
|-----------|-------------|
| `secs_ago` | Int of Seconds ago from current time, it can be used to make notification look like it was created in the past. |

### channelExists(channel_id)

Checks if a channel with given id exists

**Returns:** bool | None — True if exists, False otherwise, None if not on Android

| Parameter | Description |
|-----------|-------------|
| `channel_id` | id for specific channel |

### doChannelsExist(ids)

Accepts a list of channel IDs and returns those that do not exist

**Returns:** list — channel IDs that do NOT exist

| Parameter | Description |
|-----------|-------------|
| `ids` | List of channel ids |

### setSubText(text)

Adds small text near the title (e.g. download time remaining).

**Returns:** None

| Parameter | Description |
|-----------|-------------|
| `text` | The subtext that will be displayed. |

### setColor(color)

changes app icon color using hex code.

**Returns:** None

| Parameter | Description |
|-----------|-------------|
| `color` | either string (red,green,blue) or color in hex code. |

### setData(data_object)

Attach a dictionary of data for possible later use.

**Returns:** None

| Parameter | Description |
|-----------|-------------|
| `data_object` | A dictionary of data that can be accessed later via NotificationHandler's data_object property. |

### fVibrate(pattern)

For when regular notifications vibrate turned off in device settings (useful for Alarms). Uses Single 500ms vibration for pattern.

**Returns:** None

### fill_args(**kwargs)

[object Object]

**Returns:** NotificationCompatBuilder — the builder object, useful for foreground services

| Parameter | Description |
|-----------|-------------|
| `**kwargs` | Same arguments as send method. |

### setVibrate(pattern)

For devices less than Android 8, sets vibration pattern for notification, defaults to a single vibration of 500ms if not provided.

**Returns:** None

| Parameter | Description |
|-----------|-------------|
| `pattern` | Vibration pattern, it accepts a list of ints representing vibration and pause durations in milliseconds, defaults to a single vibration of 500ms if not provided. |

### setSound(res_sound_name)

For devices less than Android 8, changes the default notification sound to a custom sound from app resources.

**Returns:** True | None — True on success, None if not on Android

| Parameter | Description |
|-----------|-------------|
| `res_sound_name` | The name of the sound resource in your app (without file extension). |

### refresh()

Applies new components after using the send() method.

**Returns:** None

## NotificationHandler

### NotificationHandler.bindNotifyListener()

Binds by Default, Attaches a global listener to notification taps—your callbacks will fire when any notification is tapped.

**Returns:** bool | None — True on success, False on failure, None if conditions not met

### NotificationHandler.unbindNotifyListener()

Removes the listener set by `bindNotifyListener()`.

**Returns:** bool — True on success, False on failure

### NotificationHandler.get_name()

Returns the unique string `name` or `id` for the notification or button that opened the app.

**Returns:** str | None — name/id string of the clicked notification, or "Not on Android"

| Parameter | Description |
|-----------|-------------|
| `on_start` | must be True when called from App.on_start(), defaults to False. |

### NotificationHandler.has_permission()

Checks if the app has notification permission. Returns True if granted.

**Returns:** bool — True if notification permission is granted

### NotificationHandler.asks_permission(callback?)

Requests notification permission from the user.

**Returns:** None

| Parameter | Description |
|-----------|-------------|
| `callback` | Optional function called with True if permission is granted. |

## NotificationStyles (deprecated)

### NotificationStyles.DEFAULT

contains default style "simple"

### NotificationStyles.LARGE_ICON

contains 'large_icon' value

### NotificationStyles.BIG_PICTURE

contains 'big_picture' value

### NotificationStyles.BOTH_IMGS

contains 'both_imgs' value

### NotificationStyles.PROGRESS

contains 'progress' value

### NotificationStyles.INBOX

contains 'inbox' value

### NotificationStyles.BIG_TEXT

contains 'big_text' value
