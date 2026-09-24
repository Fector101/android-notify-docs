import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router'
import { CodeBlock } from "../ui/CodeBlock/CodeBlock";
import { ScrollToSection } from "../ui/ScrollAssist";
import '../assets/css/advmethodspage.css'
import channelimg from '../assets/imgs/channelname.jpg'
import { Iversion } from '../assets/js/mytypes';
import { isAtLeastVersion } from '../assets/js/helper';
import { useAdvancedMethodsData } from './versions-data/useAdvancedMethodsData';

const vibratePermissionCode = `android.permissions = VIBRATE`

const soundBuildozerCode = `android.add_resources = res
source.include_exts = wav`

const readingChannelsCode = `from android_notify import Notification

# Check if a single channel exists
exists = Notification.channelExists("downloads_notifications")
print("Channel exists:", exists)

# Check a list of channels -> returns only the ones missing
missing = Notification.doChannelsExist(
    ["downloads_notifications", "alerts", "updates"]
)
print("Missing channels:", missing)

# List every channel created by the app
channels = Notification.getChannels()
print("All channels:", channels) # [{id: "downloads_notifications", name: "Downloads", description: "Notifications for download updates", state: True, j_obj: <java_object>},...]`

const readingChannelsCode60 = `from android_notify import Notification

# Check if a single channel exists
exists = Notification.channelExists("downloads_notifications")
print("Channel exists:", exists)

# Check a list of channels -> returns only the ones missing
missing = Notification.doChannelsExist(
    ["downloads_notifications", "alerts", "updates"]
)
print("Missing channels:", missing)`

const absolutePathSoundCode = `from android_notify import Notification
Notification.createChannel(
    id="local_sound",
    name="Local Sound",
    sound_path="/storage/emulated/0/Download/sneeze.wav"
)

# Using a content URI (e.g., from media store)
Notification.createChannel(
    id="uri_sound",
    name="URI Sound",
    sound_path="content://media/external/audio/media/123"
)

# Send notification with custom sound path
n = Notification(
    title="Custom Sound",
    message="Playing from local path",
    channel_id="local_sound"
)
n.setSound(sound_path="/storage/emulated/0/Download/sneeze.wav")
n.send()`

export default function ChannelsPage({ version, setVersion }: { version: Iversion; setVersion: React.Dispatch<React.SetStateAction<string>> }) {
    const data = useAdvancedMethodsData(version);

    const hasReadChannelsApi = isAtLeastVersion(version, "1.60");
    const hasGetChannelsApi = isAtLeastVersion(version, "1.61");
    const hasDeleteChannelsApi = isAtLeastVersion(version, "1.59");
    const hasChannelSoundApi = isAtLeastVersion(version, "1.60");
    const hasSoundPathApi = isAtLeastVersion(version, "1.61");

    return (
        <div className="main-page page adv-methods-page">
            <ScrollToSection />

            <p className="paragraph">
                Need a notification inside a foreground service? See the <Link to='/foreground-services'>Foreground Services</Link> page.
            </p>

            <section id="channel-management" className="page-section" tabIndex={0}>
                <h2 className="long-title">Channel Management</h2>
                <hr />
                <p className="paragraph">From Android 8.0 above channels are required, android-notify use <span className="code">Default Channel</span> if no channel specified.</p>
                <p className="paragraph">You can customize the channel name and ID:</p>
                <ul className="inner-section-2 paragraph">
                    <li>If not specified <span className="code">channel_id</span> will be auto generated from <span className="code">channel_name</span></li>
                    <li className="inner-section-2">Using this format <span className="code">.lower().replace(' ', '_')</span> </li>
                    <li>Custom Channel Name's Gives User ability to turn on/off specific notifications</li>
                </ul>
                <CodeBlock title='Channel Management' code={data?.channel_management_code || ''} img={channelimg} />

                <h3 id="reading-channels" className="underline text-xl mt-[10px] mb-[0]">Reading Channels:</h3>
                {hasReadChannelsApi ? (
                    <>
                        <p className="paragraph">You can inspect the channels that exist on the device before sending:</p>
                        <ul className="inner-section-2 paragraph">
                            <li><span className="code">channelExists(channel_id)</span> - check if one channel exists, returns <span className="code">True</span>/<span className="code">False</span></li>
                            <li><span className="code">doChannelsExist(ids)</span> - pass a list of ids, returns the ids that do <strong>not</strong> exist</li>
                            {hasGetChannelsApi && <li><span className="code">getChannels()</span> - returns a list of dicts {'{id, name, description, state, j_obj} '}</li>}
                        </ul>
                        <CodeBlock title="Reading Channels" code={hasGetChannelsApi ? readingChannelsCode : readingChannelsCode60} has_pydroid_support={false}/>
                        {!hasGetChannelsApi && (
                            <p className="paragraph">
                                Listing channels (<span className="code">getChannels</span>) was added in <span className='link-design' onClick={() => setVersion("1.61")}>v1.61</span>.
                            </p>
                        )}
                    </>
                ) : (
                    <p className="paragraph">
                        Reading channels (<span className="code">channelExists</span>, <span className="code">doChannelsExist</span>) was added in <span className='link-design' onClick={() => setVersion("1.60")}>v1.60</span>, <span className="code">getChannels</span> in <span className='link-design' onClick={() => setVersion("1.61")}>v1.61</span>.
                    </p>
                )}

                <h3 id="deleting-channels" className="underline text-xl mt-[10px] mb-[0]">Deleting Channels:</h3>
                {hasDeleteChannelsApi ? (
                    <>
                        <p className="paragraph">Channels can be deleted at runtime. Once deleted, notifications using that channel are no longer shown</p>
                        <ul className="inner-section-2 paragraph">
                            <li><span className="code">deleteChannel(channel_id)</span> - deletes a single channel, returns <span className="code">True</span> if deleted, <span className="code">False</span> if not found</li>
                            <li><span className="code">deleteAllChannel()</span> - deletes every channel, returns the count deleted</li>
                        </ul>
                        <CodeBlock title="Deleting Channels" code={`from android_notify import Notification

# Delete one channel
deleted = Notification.deleteChannel("downloads_notifications")

# Delete every channel -> returns how many were removed
count = Notification.deleteAllChannel()
print(f"Deleted {count} channels")`} has_pydroid_support={false}/>
                    </>
                ) : (
                    <p className="paragraph">
                        Deleting channels (<span className="code">deleteChannel</span>, <span className="code">deleteAllChannel</span>) was added in <span className='link-design' onClick={() => setVersion("1.59")}>v1.59</span>.
                    </p>
                )}

                <h3 id="custom-sound" className="underline text-xl mt-[10px] mb-[0]">Custom Sound:</h3>
                <p className="paragraph">The Sound your notification makes when sent can be customized:</p>
                <ul className="inner-section-2 paragraph">
                    <li>By using audio files in your app's <span className="code">res/raw</span> folder</li>
                    {hasSoundPathApi && <li>By passing in the absolute path to an audio file on the device.
                    </li>}
                </ul>
                <p className="paragraph">For Android 8+, the sound is set on the channel. For Android 7 and below, the sound is set on the notification itself.</p>
                
                <p className="paragraph">If you use a long audio file, it will be played till the user swipes down the notification tray.</p>

                
                <h4 className="text-lg font-semibold mt-[20px] mb-[0] underline">Method 1: Using Audio Files in res/raw</h4>
                <p className="paragraph">Make sure to not include the file extension. Pass in <span className="code">sneeze</span> instead of <span className="code">sneeze.wav</span></p>
                <p className="paragraph">Put your audio files (e.g. <span className="code">sneeze.wav</span>) in <span className="code">res/raw</span>, then configure <span className="code">buildozer.spec</span>:</p>
                <CodeBlock title="buildozer.spec" code={soundBuildozerCode} has_pydroid_support={false}/>
                {hasChannelSoundApi ? (
                    <CodeBlock has_pydroid_support={false} title="Custom Sound Channel" code={data?.custom_sound_code || ''} />
                ) : (
                    <p className="paragraph">
                        Channel sounds (<span className="code">res_sound_name</span>) were added in <span className='link-design' onClick={() => setVersion("1.60")}>v1.60</span>.
                    </p>
                )}
                
                {hasSoundPathApi && (
                    <>
                        <h4 className="text-lg font-semibold mt-[20px] mb-[0] underline">Method 2: Using Absolute Path to Audio File</h4>
                        <p className="paragraph">You can also use an absolute path to an audio file on the device, if you have permission to access it.</p>
                        <p className="paragraph">For example, if you have a sound file at <span className="code">/storage/emulated/0/Download/sneeze.wav</span>, you can set it like this:</p>
                        <CodeBlock title="Custom Sound Absolute Path" has_pydroid_support={false} code={absolutePathSoundCode} />
                    </>
                )}

                <h3 id="vibration" className="underline text-xl mt-[10px] mb-[0]">Vibration:</h3>
                <p className="paragraph">For the vibrate feature to work correctly, make sure to use version <span className="code">1.61.0</span> or later.</p>
                <p className="paragraph">You can make the phone vibrate when a notification arrives. For Android 8+, enable vibration on the channel.</p>
                <p className="paragraph">You also need to add the <span className="code">VIBRATE</span> permission in your <span className="code">buildozer.spec</span>:</p>
                <CodeBlock title="buildozer.spec" code={vibratePermissionCode} has_pydroid_support={false}/>
                {hasChannelSoundApi ? (
                    <CodeBlock title="Vibrate Channel" has_pydroid_support={false} code={data?.vibrate_code || ''} />
                ) : (
                    <p className="paragraph">
                        Channel vibration (<span className="code">vibrate</span>) was added in <span className='link-design' onClick={() => setVersion("1.60")}>v1.60</span>.
                    </p>
                )}
            </section>

            <span className='flex next-page-btns-box space-between'>
                <Link className='next-page-btn' to='/components'>
                    <ChevronLeft />
                    <span>
                        <p className='next-txt'>Previous</p>
                        <p className='page-name'>Components</p>
                    </span>
                </Link>
                <Link className='next-page-btn' to='/notification-behaviour'>
                    <span>
                        <p className='next-txt'>Next</p>
                        <p className='page-name'>Notification Behaviour</p>
                    </span>
                    <ChevronRight />
                </Link>
            </span>
        </div>
    )
}