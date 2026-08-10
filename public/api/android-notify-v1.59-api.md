# Android Notify v1.59 — API Reference

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

Sets the notification importance for devices less than Android 8.

**Returns:** None

| Parameter | Description |
|-----------|-------------|
| `importance` | ['urgent', 'high', 'medium', 'low', 'none'] defaults to 'urgent' i.e. makes a sound and shows briefly. |

## NotificationHandler

### NotificationHandler.bindNotifyListener()

Binds by Default, Attaches a global listener to notification taps—your callbacks will fire when any notification is tapped.

**Returns:** bool | None — True on success, False on failure, None if conditions not met

### NotificationHandler.unbindNotifyListener()

Removes the listener set by `bindNotifyListener()`.

**Returns:** bool — True on success, False on failure

### NotificationHandler.is_on_android()

Returns `true` if running on Android, `false` otherwise—useful for platform checks.

**Returns:** bool — True if on Android, False otherwise

### NotificationHandler.get_name()

Returns the unique string `name` or `id` for the notification or button that opened the app.

**Returns:** str | None — name/id string of the clicked notification, or "Not on Android"

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
