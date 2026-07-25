# Android Notify v1.58 — API Reference

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
| `style` | can be ['simple','progress','inbox','big_text','large_icon','big_picture','both_imgs] |
| `big_picture_path` | path or url to big image (for `BIG_PICTURE` style) |
| `large_icon_path` | path or url to image (for `LARGE_ICON` style) |
| `body` | Detailed text (for `BIG_TEXT` style). |
| `callback` | Function executed on notification tap. |
| `channel_name` | Human-readable channel name. |
| `channel_id` | Used to later reference Channel when sending each notification (extracted from channel name if provided or defaults to 'default_channel'). |
| `app_icon` | If not specified, defaults to the app icon. To change it, use a PNG—otherwise it will render as a black box. |
| `logs` | Enable debug logs when not on Android. |

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

## NotificationHandler

### NotificationHandler.getIdentifer()

Returns the unique string identifier for the notification or button that opened the app.

**Returns:** str | None — name/id string of the clicked notification, or None

### NotificationHandler.bindNotifyListener()

Binds by Default, Attaches a global listener to notification taps—your callbacks will fire when any notification is tapped.

**Returns:** bool | None — True on success, False on failure, None if conditions not met

### NotificationHandler.unbindNotifyListener()

Removes the listener set by `bindNotifyListener()`.

**Returns:** bool — True on success, False on failure

### NotificationHandler.is_on_android()

Returns `true` if running on Android, `false` otherwise—useful for platform checks.

**Returns:** bool — True if on Android, False otherwise

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
