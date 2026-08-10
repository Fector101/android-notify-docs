import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router'
import { CodeBlock } from "../ui/CodeBlock/CodeBlock";
import { ScrollToSection } from "../ui/ScrollAssist";
import '../assets/css/advmethodspage.css'
// import { adding_image_code, channel_management_code, getting_identifer, progress_bar_update, title_and_message_update } from "./versions-data/advmethodspage";
import channelimg from '../assets/imgs/channelname.jpg'
import { useEffect, useState } from 'react';
import { Iversion } from '../assets/js/mytypes';
import { isLegacyVersion } from '../assets/js/helper';

const vibratePermissionCode = `android.permissions = VIBRATE`

const soundBuildozerCode = `android.add_resources = res
source.include_exts = wav`


interface IAdvancedMethodsPage {
    title_and_message_update_code: string;
    progress_bar_update_code: string;
    adding_image_code: string;
    channel_management_code: string;
    getting_identifier_code: string;
    custom_sound_code?: string;
    vibrate_code?: string;
}

export default function AdvancedMethodsPage({ version }: { version: Iversion }) {
    const [data, setData] = useState<IAdvancedMethodsPage>()

    async function changeVersionData(version: Iversion) {

        const v1 = await import(`./versions-data/1.58.tsx`);
        const v2 = await import(`./versions-data/1.59.tsx`);
        const data = await import(`./versions-data/${version}.tsx`);
        setData({...v1.advanced_methods_page,...v2.advanced_methods_page,...data.advanced_methods_page})
    }
    useEffect(() => {
        changeVersionData(version)
    }, [version])
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
                <p className="paragraph">You can inspect the channels that exist on the device before sending:</p>
                <ul className="inner-section-2 paragraph">
                    <li><span className="code">channelExists(channel_id)</span> - check if one channel exists, returns <span className="code">True</span>/<span className="code">False</span></li>
                    <li><span className="code">doChannelsExist(ids)</span> - pass a list of ids, returns the ids that do <strong>not</strong> exist</li>
                    <li><span className="code">getChannels()</span> - returns a list of all notification channels</li>
                </ul>
                <CodeBlock title="Reading Channels" code={`from android_notify import Notification

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
print("All channels:", channels)`} has_pydroid_support={false}/>

                <h3 id="deleting-channels" className="underline text-xl mt-[10px] mb-[0]">Deleting Channels:</h3>
                <p className="paragraph">Channels can be deleted at runtime. Once deleted, notifications using that channel are no longer shown and the user has to re-create it:</p>
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

                <h3 id="custom-sound" className="underline text-xl mt-[10px] mb-[0]">Custom Sound:</h3>
                <p className="paragraph">You can assign a custom sound from your app's <span className="code">res/raw</span> folder to a notification channel for Android 8+:</p>
                <p className="paragraph">Put your audio files (e.g. <span className="code">sneeze.wav</span>) in <span className="code">res/raw</span>, then configure <span className="code">buildozer.spec</span>:</p>
                <CodeBlock title="buildozer.spec" code={soundBuildozerCode} has_pydroid_support={false}/>
                <CodeBlock has_pydroid_support={false} title="Custom Sound Channel" code={data?.custom_sound_code || ''} />
                <p className="paragraph">For devices below Android 8, use <span className="code">setSound</span> on the notification object.</p>

                <h3 id="vibration" className="underline text-xl mt-[10px] mb-[0]">Vibration:</h3>
                <p className="paragraph">For the vibrate feature to work correctly, make sure to use version <span className="code">1.61.0</span> or later.</p>
                <p className="paragraph">You can make the phone vibrate when a notification arrives. For Android 8+, enable vibration on the channel.</p>
                <p className="paragraph">You also need to add the <span className="code">VIBRATE</span> permission in your <span className="code">buildozer.spec</span>:</p>
                <CodeBlock title="buildozer.spec" code={vibratePermissionCode} has_pydroid_support={false}/>
                <CodeBlock title="Vibrate Channel" code={data?.vibrate_code || ''} />
                <p className="paragraph">For the vibrate feature to work correctly, make sure to use version <span className="code">1.61.0</span> or later.</p>
            </section>

            <section id="getting-identifer" className="page-section" tabIndex={0}>
                <h2 className="long-title">Getting Identifer</h2>
                <hr />
                <p>If you want to get the Exact Notification Clicked to Open App, you can use NotificationHandler to get unique identifer (str) <span className="code">NotificationHandler{isLegacyVersion(version) ? ".getIdentifer" : '.get_name'}</span></p>

                <p>
                    {isLegacyVersion(version) && <span className="code warning yellow paragraph block width-max-con">In next version identifer will be changed to `name` and NotificationHandler.getIdentifer to NotificationHandler.get_name</span>}
                </p>
                <CodeBlock title="Identifer" code={data?.getting_identifier_code || ''} has_pydroid_support={false}/>
            </section>

            <section id="notification-data" className="page-section" tabIndex={0}>
                <h2 className="long-title">Notification Data</h2>
                <hr />
                <p className="paragraph">Attach extra data to a notification with <span className="code">setData(data_object)</span>, then read it back anywhere in the app via <span className="code">NotificationHandler.data_object</span>. This is useful for passing context (e.g. a file path or url) alongside the notification name.</p>
                <CodeBlock title="Sending and Reading Data" code={`from android_notify import Notification, NotificationHandler

n = Notification(
    title="Download Finished",
    message="file.zip",
    name="download_done",
)
n.setData({"path": "/storage/emulated/0/file.zip", "size": "2GB"})
n.send()

# Later, when the notification opens the app:
data = NotificationHandler.data_object
if data:
    print(data.get("path"), data.get("size"))`} has_pydroid_support={false}/>
            </section>

            <section id="notification-control" className="page-section" tabIndex={0}>
                <h2 className="long-title">Cancelling & Controlling Notifications</h2>
                <hr />
                <h3 id="cancel-notifications" className="underline text-xl mt-[10px] mb-[0]">Cancelling:</h3>
                <p className="paragraph">Remove notifications from the tray with <span className="code">cancel()</span> and <span className="code">cancelAll()</span>. If you no longer have the original instance, create a new one with the same <span className="code">id</span> and call <span className="code">cancel()</span>:</p>
                <CodeBlock title="Cancelling Notifications" code={`from android_notify import Notification

n = Notification(title="Task", message="Working...")
n.send()

# Remove this notification
n.cancel()

# Remove by id, no instance needed
Notification(title="Old", message="Stale", id=7).send()
Notification(id=7).cancel()

# Remove every notification from the app
Notification.cancelAll()`} has_pydroid_support={false}/>

                <h3 id="timestamps" className="underline text-xl mt-[10px] mb-[0]">Timestamps:</h3>
                <p className="paragraph">Use <span className="code">setWhen(secs_ago)</span> to make a notification appear as if it was posted in the past:</p>
                <CodeBlock title="Set Timestamp" code={`from android_notify import Notification

n = Notification(
    title="Reminder",
    message="You had a meeting",
)
n.setWhen(3600)   # show as posted 1 hour ago (60 = 1 minute, 86400 = 1 day)
n.send()`} has_pydroid_support={false}/>

                <h3 id="priority" className="underline text-xl mt-[10px] mb-[0]">Priority (Android &lt; 8):</h3>
                <p className="paragraph">On devices below Android 8 there are no channels, so importance is set per notification with <span className="code">setPriority()</span>. For Android 8+ use the channel's <span className="code">importance</span> instead.</p>
                <CodeBlock title="Set Priority" code={`from android_notify import Notification

n = Notification(title="Important", message="Read me now")
n.setPriority("urgent")  # ['urgent','high','medium','low','none']
n.send()`} has_pydroid_support={false}/>
            </section>


            <span className='flex next-page-btns-box space-between'>
                <Link className='next-page-btn' to='/components'>
                    <ChevronLeft />
                    <span>
                        <p className='next-txt'>Previous</p>
                        <p className='page-name'>Components</p>
                    </span>
                </Link>
                <Link className='next-page-btn' to='/foreground-services'>
                    <span>
                        <p className='next-txt'>Next</p>
                        <p className='page-name'>Foreground Services</p>
                    </span>
                    <ChevronRight />
                </Link>

            </span>
            {/* <Compo */}
            {/* <h3 className="page-subtitle">Updating Notification</h3>
            <p className="page-text"> You can update a notification after it has been created by using the <code>update</code> method. This method takes an object with the same properties as the original notification, and updates the notification with the new values.</p> */}

        </div>
    )
}