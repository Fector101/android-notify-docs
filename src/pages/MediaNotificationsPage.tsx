import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router'
import { ScrollToSection } from "../ui/ScrollAssist";
import { CodeBlock } from "../ui/CodeBlock/CodeBlock";
import '../assets/css/advmethodspage.css'
import '../assets/css/media-notifications-page.css'

const gradleLine = `android.gradle_dependencies = io.github.fector101:android-notify-music-bridge:1.0.1`

const permissionsLine = `android.permissions = POST_NOTIFICATIONS, (name=android.permission.READ_EXTERNAL_STORAGE;maxSdkVersion=32), READ_MEDIA_AUDIO`

const permissionCode = `from android_notify.media.music import MediaPermissionHandler

if not MediaPermissionHandler.has_permission_to_access_audio_files():
    MediaPermissionHandler.ask_permission_to_access_audio_files(callback=on_granted)
    return`

const scanCode = `from jnius import autoclass
from android_notify.config import get_python_activity_context


def scan_audio_files():
    resolver = get_python_activity_context().getContentResolver()
    collection = autoclass("android.provider.MediaStore$Audio$Media").EXTERNAL_CONTENT_URI
    cursor = resolver.query(
        collection, ["_id", "title", "artist", "duration"], None, None, None
    )

    tracks = []
    id_idx = cursor.getColumnIndex("_id")
    title_idx = cursor.getColumnIndex("title")
    artist_idx = cursor.getColumnIndex("artist")
    duration_idx = cursor.getColumnIndex("duration")

    while cursor.moveToNext():
        media_id = cursor.getLong(id_idx)
        tracks.append({
            "uri": "content://media/external/audio/media/" + str(media_id),
            "title": cursor.getString(title_idx) or "(unknown title)",
            "artist": cursor.getString(artist_idx) or "",
            "duration": cursor.getLong(duration_idx),
        })
    cursor.close()
    return tracks`

const minimalCode = `import os

from kivy.app import App
from kivy.uix.button import Button

from android_notify.media import MediaNotification
from android_notify.media.music import SoundLoader

TRACK = "/storage/emulated/0/Ringtones/my_ringtone.ogg"


class MyApp(App):
    def build(self):
        self.sound = SoundLoader.load(TRACK)
        self.sound.loop = True
        self.sound.bind(on_load=self.on_loaded)
        
        self.notification = MediaNotification(
            self.sound,
            on_next=self.next_track,
            on_previous=self.previous_track,
        )
        self.notification.setNowPlaying(
            os.path.splitext(os.path.basename(TRACK))[0], "Example Artist"
        )
        return Button(text="Playing...")

    def on_loaded(self, *_):
        self.sound.play()

    def next_track(self):
        print("point this at the next file in your queue")

    def previous_track(self):
        print("point this at the previous file in your queue")

    def on_stop(self):
        self.sound.stop()
        self.sound.unload()
        self.notification.release()


if __name__ == "__main__":
    MyApp().run()`

const plainControllerCode = `from android_notify.media import MediaNotification
from kivy.core.audio_output import SoundLoader as KivySoundLoader

TRACK = "/storage/emulated/0/Ringtones/my_ringtone.ogg"

class MyMediaController:
    def __init__(self, path):
        self._sound = KivySoundLoader.load(path, audio_output_provider="android")

# --- MediaController contract -----------------------------------------
    @property
    def source(self):
        return self._sound.source

    @property
    def state(self):
        return "play" if self._playing else "pause"

    @property
    def length(self):
        return self._sound.length
        
    def play(self):
        self._sound.play()
        if self._used_paused:
            # Kivy's Sound cannot resume in place, so play before seek when paused.
            self._sound.seek(self._pos)
            self._used_paused = False

        self._playing = True

    def pause(self):
        # Kivy Sound has no pause(); stop and remember.
        self._used_paused = True
        self._playing = False
        
        self._pos = self.get_pos()
        self._sound.stop()  
        

    def seek(self, seconds):
        self._pos = float(max(0.0, seconds))
        self._sound.seek(self._pos)

    def get_pos(self):
        return self._sound.get_pos() if self._playing else self._pos


class MeloApp(App):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

        self.sound = MyMediaController(TRACK)
        self.sound.play()
        
        self.notification = MediaNotification(
            self.sound,
            on_next=self.next_track,
            on_previous=self.previous_track,
        )
        self.notification.setNowPlaying(
            os.path.splitext(os.path.basename(TRACK))[0], "Example Artist"
        )
    
    def play_song(self):
        self.sound.play()
        self.notification.syncPlaybackState() # sync the notification with the new state
    
    def pause_song(self):
        self.sound.pause()
        self.notification.syncPlaybackState() # sync the notification with the new state
    
    def seek_song(self, seconds):
        self.sound.seek(seconds)
        self.notification.syncPlaybackState() # sync the notification with the new state

    def next_track(self):
        print("load the next file in your queue and call self.sound.play()")
        
    def previous_track(self):
        print("load the previous file in your queue and call self.sound.play()")

    def on_stop(self):
        self.sound.stop()
        self.sound.unload()
        self.notification.release()
`

const gettingFilePathSnippet = `cursor = resolver.query(
        collection, ["_id", "title", "artist", "duration", "_data"], None, None, None
)
data_idx = cursor.getColumnIndex("_data")
# while cursor.moveToNext():
tracks.append(
    {..., "path": cursor.getString(data_idx)"}
)
`
export default function MediaNotificationsPage() {
    return (
        <div className="main-page page adv-methods-page foreground-services-page media-notifications-page">
            <ScrollToSection />

            <section id="overview" className="page-section" tabIndex={0}>
                <h2 className="long-title large-title">Media Notifications</h2>
                <p className="paragraph">
                    Android Notify v1.62.0+ ships a media-style notification backed by a system <span className="code">MediaSession</span>.
                    Play / pause, next / previous and the seek bar appear on the notification, the lock screen and Quick Settings,
                    and transport commands are routed back into your player automatically.
                </p>
                <p className="paragraph">
                    The media notifcation is Kivy only and hasn't been tested on Flet.
                </p>
                <p className="paragraph">
                    The media notification does not depend on a specific <span className='code'>MediaController</span>. It works with any that provides:
                </p>
                <table className="media-controller-table">
                    <thead>
                        <tr>
                            <th>Controller member</th>
                            <th>Kind</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td><span className="code">source</span></td><td>Attribute</td></tr>
                        <tr><td><span className="code">state</span></td><td>Attribute</td></tr>
                        <tr><td><span className="code">length</span></td><td>Attribute</td></tr>
                        <tr><td><span className="code">play()</span></td><td>Method</td></tr>
                        <tr><td><span className="code">pause()</span></td><td>Method</td></tr>
                        <tr><td><span className="code">seek(seconds)</span></td><td>Method</td></tr>
                        <tr><td><span className="code">get_pos()</span></td><td>Method</td></tr>
                    </tbody>
                </table>
                <p className="paragraph">
                    <span className="code">android_notify.media.music.helper.SoundLoader</span> already implements that contract, But you can easier create a class that implements it with kivy.
                </p>
                <p className='paragraph'>
                    If <span className="code">get_pos</span> or <span className="code">seek</span> doesn't work for your device on Kivy 2.3.1 move to kivy 3.0.0 or <span className="code">android_notify.media.music.helper.SoundLoader</span>
                </p>
                <p className="paragraph">
                    <span className="code">MediaNotification</span> is a singleton: construct it again for a new track and it refreshes the bound controller,
                    skip callbacks and metadata. Call <span className="code">release()</span> once in <span className="code">App.on_stop()</span>.
                </p>
            </section>

            <section id="setup" className="page-section" tabIndex={0}>
                <h2 className="long-title underline">Setup</h2>
                <p className="paragraph">
                    Add the pre-compiled media bridge from Maven Central.
                    The bridge carries transport events from the Android <span className="code">MediaSession</span> back to Python.
                </p>
                <CodeBlock title="buildozer.spec" code={gradleLine} lang="ini" has_pydroid_support={false} />
                <p className="paragraph">
                    <span className="code">mavenCentral()</span> is already included in the Gradle project buildozer generates.
                    If the bridge isn't included the notification still builds, but the media buttons do nothing.
                </p>
                <p className="paragraph">
                    The media notification is Android + Kivy only. It builds on <span className="code">pyjnius</span> and Kivy's
                    <span className="code">EventDispatcher</span>, so it does not run on desktop.
                </p>
            </section>

            <section id="permissions" className="page-section" tabIndex={0}>
                <h2 className="long-title underline">Permissions</h2>
                <p className="paragraph">
                    Playing audio needs <span className="code">READ_MEDIA_AUDIO</span> on Android 13+ and
                    <span className="code">READ_EXTERNAL_STORAGE</span> on Android 12 and below. Declare both plus
                    <span className="code">POST_NOTIFICATIONS</span> for the notification:
                </p>
                <CodeBlock title="buildozer.spec" code={permissionsLine} lang="ini" has_pydroid_support={false} />
                <p className="paragraph">Check and request runtime access to audio files:</p>
                <CodeBlock title="Python Code" code={permissionCode} has_pydroid_support={false} />
                <p>
                    Without the audio permission a file load fails with <span className="code">Couldn't open asset</span>.
                </p>
                
            </section>

            <section id="reading-audio" className="page-section" tabIndex={0}>
                <h2 className="long-title underline">Reading Audio Files</h2>
                <p className="paragraph">
                    <span className="code">android_notify.media.music.helper.SoundLoader.load()</span> accepts an absolute file path or a <span className="code">content://</span> URI.
                </p>
                
                <p className="paragraph">
                    Querying MediaStore for is the fastest away to get audio files on Android.
                </p>
                
                <CodeBlock title="Python Code" code={scanCode} has_pydroid_support={false} />
                <p className="paragraph">
                    If your'e using kivy <span className="code">SoundLoader</span> you can access the file <span className='code'>path</span> by using the below to edit the code above in the <span className="code">scan_audio_files()</span> function:
                <CodeBlock title="Getting File Path Snippet" code={gettingFilePathSnippet} has_pydroid_support={false} />
                </p>
                <p className="paragraph">
                    Avoid <span className="code">MANAGE_EXTERNAL_STORAGE</span> ("All files access"); it is a restricted permission under
                    Google Play policy. All Tracks under <span className="code">Music</span>, <span className="code">Download</span>,
                    <span className="code">Ringtones</span> and app-specific folders all show up in the same MediaStore index.
                </p>
            </section>

            <section id="minimal-example" className="page-section" tabIndex={0}>
                <h2 className="long-title underline">Minimal Example</h2>
                <p className="paragraph">
                    <span className="code">android_notify.media.music.helper.SoundLoader.SoundLoader</span> prepares the Android <span className="code">MediaPlayer</span> asynchronously and fires
                    <span className="code">on_load</span> when it is ready.
                </p>
                <p className="paragraph">
                    If you're using Kivy <span className="code">SoundLoader</span> the audio file loads synchronously so NO need for the <span className="code">on_load</span> method, You can call <span className="code">play()</span> right after <span className="code">load()</span>.
                </p>
                <CodeBlock title="main.py" code={minimalCode} has_pydroid_support={false} />
                <p className="paragraph">
                    Ready-to-run variants live in the repository under <span className="code">examples/music/</span>:
                </p>
                <table className="media-controller-table media-examples-table" style={{"maxWidth": "750px"}}>
                    <thead>
                        <tr>
                            <th>Example</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><span className="code">kivy2_android_only/simple_example.py</span></td>
                            <td>Scan and play audio</td>
                        </tr>
                        <tr>
                            <td><span className="code">kivy2_android_only/example_1.py</span></td>
                            <td>Compact player</td>
                        </tr>
                        <tr>
                            <td><span className="code">kivy2_android_only/full_app_example.py</span></td>
                            <td>Full player</td>
                        </tr>
                        <tr>
                            <td><span className="code">kivy3/example.py</span></td>
                            <td>Plain controller</td>
                        </tr>
                        <tr>
                            <td><span className="code">kivy3/full_app_example.py</span></td>
                            <td>Full player using a plain controller</td>
                        </tr>
                        <tr>
                            <td><a href="https://github.com/Fector101/Melo" target="_blank" rel="noreferrer">Melo</a></td>
                            <td>Real app using media notifications</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section id="plain-controllers" className="page-section" tabIndex={0}>
                <h2 className="long-title underline">Kivy Default Sound Controllers</h2>
                <p className="paragraph">
                    Kivy's default soundLoader only dispatches <span className="code">on_play</span>, <span className="code">on_stop</span>, So you'll have to call <span className="code">syncPlaybackState()</span> after every <span className="code">pause()</span> and <span className="code">seek()</span> to keep the notification in sync with your In-App player.

                </p>
                <p className="paragraph">
                    <span className="code">syncPlaybackState()</span> is useful when you change the Audio state from any where but the notification, like a button in your App or a timer, It flips the play/pause icon, syncs the seek bar and rebuilds the notification if needed.
                </p>
                <CodeBlock title="Plain controller" code={plainControllerCode} has_pydroid_support={false} />
                <p className="paragraph"> Kivy's default SDL3 provider suspends its audio device when the activity pauses, so music stops when the app is backgrounded or the screen turns off.
                </p>
                <p className="paragraph">
                    So request <span className='code'>audio_output_provider="android"</span> from <span className="code"> SoundLoader.load </span> to keep the audio device alive in the background.
                    </p>
<hr className="my-[30px]"/>                    
                <p className="paragraph">
                    Track metadata is different: <span className="code">setNowPlaying(title, artist)</span>, <span className="code">setTitle()</span> and
                    <span className="code">setArtist()</span> update the live notification directly, so they do not need a manual sync.
                </p>

            </section>

            <section id="reference" className="page-section" tabIndex={0}>
                <h2 className="long-title underline">Reference</h2>
                <p className="paragraph">
                    <span className="code">MediaNotification(mediaController, on_next=None, on_previous=None)</span> creates the notification and binds a controller.
                </p>
                <div className="feature-body">
                    <div className="feature-item"><strong>setNowPlaying(title, artist)</strong><span>Set both fields and refresh once. Preferred on a track change.</span></div>
                    <div className="feature-item"><strong>setTitle(text) / setArtist(text)</strong><span>Update one field; the live notification follows if it has been built.</span></div>
                    <div className="feature-item"><strong>setLargeIcon(music_path=None, img_path=None)</strong><span>Use embedded art or an explicit image. Artless tracks fall back to the default app icon.</span></div>
                    <div className="feature-item"><strong>setMediaController(controller)</strong><span>Bind or replace the player. Re-binding the same instance is a no-op.</span></div>
                    <div className="feature-item"><strong>setNext(callback) / setPrev(callback)</strong><span>Set or clear (with None) the skip actions and their MediaSession actions.</span></div>
                    <div className="feature-item"><strong>syncPlaybackState()</strong><span>Flip the play/pause icon, sync the seek bar and build the notification if needed. Use after app-driven changes on plain controllers.</span></div>
                    <div className="feature-item"><strong>syncMediaSession()</strong><span>Lower-level seek-bar and playback-state sync (called automatically).</span></div>
                    <div className="feature-item"><strong>refresh()</strong><span>Re-post the notification, re-applying now-playing metadata and artwork first.</span></div>
                    <div className="feature-item"><strong>release()</strong><span>Final MediaSession teardown. Call once in App.on_stop(), not between tracks.</span></div>
                </div>
                <p className="paragraph">
                    <span className="code">SoundLoader.load(source)</span> returns the singleton player. It exposes
                    <span className="code">state</span>, <span className="code">loop</span>, <span className="code">length</span>,
                    <span className="code">play()</span>, <span className="code">pause()</span>, <span className="code">stop()</span>,
                    <span className="code">seek(seconds)</span>, <span className="code">get_pos()</span>, <span className="code">unload()</span>
                    and the events <span className="code">on_load</span>, <span className="code">on_play</span>, <span className="code">on_pause</span>,
                    <span className="code">on_stop</span>, <span className="code">on_seek</span> and <span className="code">on_complete</span>.
                </p>
                
            </section>

            <span className='flex next-page-btns-box space-between'>
                <Link className='next-page-btn' to='/foreground-services'>
                    <ChevronLeft />
                    <span>
                        <p className='next-txt'>Previous</p>
                        <p className='page-name'>Foreground Services</p>
                    </span>
                </Link>
                <Link className='next-page-btn' to='/reference'>
                    <span>
                        <p className='next-txt'>Next</p>
                        <p className='page-name'>Reference</p>
                    </span>
                    <ChevronRight />
                </Link>
            </span>
        </div>
    )
}
