export const installation_code_buildozer = `# Ensure pyjnius is included in the build
requirements = python3, kivy, pyjnius, android-notify

# Notification Permission
android.permissions = POST_NOTIFICATIONS

# AndroidX dependency
android.gradle_dependencies = androidx.core:core:1.12.0
android.enable_androidx = True`
export const installation_code_buildozer_without_androidx = `requirements = python3, kivy, pyjnius, android-notify==1.60.10.dev0
android.permissions = POST_NOTIFICATIONS
`
export const installation_code_flet = `[tool.flet.android]
dependencies = [
  "pyjnius","android-notify==1.60.10.dev0"
]

[tool.flet.android.permission]
"android.permission.POST_NOTIFICATIONS" = true`
export const installation_code_pip = `pip install android-notify`

export function getInstallCode(tab: string): string {
  const codes: Record<string, string> = {
    pip: installation_code_pip,
    kivy: installation_code_buildozer,
    flet: installation_code_flet,
    pydroid: `# In Pydroid 3 pip section, add:
android-notify==1.60.10.dev0`,
    nox: installation_code_buildozer_without_androidx,
  }
  return codes[tab] || codes.pip
}
export const code = `from android_notify import Notification, NotificationHandler

# Create a simple notification
def send_notification(ans):
    Notification(
        title="Hello From Python",
        message="This is a basic notification."
    ).send()

NotificationHandler.asks_permission(send_notification)
`;
