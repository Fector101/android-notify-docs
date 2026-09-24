import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router'
import { CodeBlock } from "../ui/CodeBlock/CodeBlock";
import { ScrollToSection } from "../ui/ScrollAssist";
import '../assets/css/advmethodspage.css'
import { Iversion } from '../assets/js/mytypes';
import { isAtLeastVersion } from '../assets/js/helper';

export default function NotificationControlPage({ version, setVersion }: { version: Iversion; setVersion: React.Dispatch<React.SetStateAction<string>> }) {
    const hasCancelApi = isAtLeastVersion(version, "1.59");
    const hasPriorityApi = isAtLeastVersion(version, "1.59");
    const hasWhenApi = isAtLeastVersion(version, "1.60");

    return (
        <div className="main-page page adv-methods-page">
            <ScrollToSection />

            <section id="notification-control" className="page-section" tabIndex={0}>
                <h2 className="long-title">Cancelling & Controlling Notifications</h2>
                <hr />
                <h3 id="cancel-notifications" className="underline text-xl mt-[10px] mb-[0]">Cancelling:</h3>
                {hasCancelApi ? (
                    <>
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
                    </>
                ) : (
                    <p className="paragraph">
                        Cancelling notifications (<span className="code">cancel</span>, <span className="code">cancelAll</span>) was added in <span className='link-design' onClick={() => setVersion("1.59")}>v1.59</span>.
                    </p>
                )}

                <h3 id="timestamps" className="underline text-xl mt-[10px] mb-[0]">Timestamps:</h3>
                {hasWhenApi ? (
                    <>
                        <p className="paragraph">Use <span className="code">setWhen(secs_ago)</span> to make a notification appear as if it was posted in the past:</p>
                        <CodeBlock title="Set Timestamp" code={`from android_notify import Notification

n = Notification(
    title="Reminder",
    message="You had a meeting",
)
n.setWhen(3600)   # show as posted 1 hour ago (60 = 1 minute, 86400 = 1 day)
n.send()`} has_pydroid_support={false}/>
                    </>
                ) : (
                    <p className="paragraph">
                        Timestamps (<span className="code">setWhen</span>) were added in <span className='link-design' onClick={() => setVersion("1.60")}>v1.60</span>.
                    </p>
                )}

                <h3 id="priority" className="underline text-xl mt-[10px] mb-[0]">Priority (Android &lt; 8):</h3>
                {hasPriorityApi ? (
                    <>
                        <p className="paragraph">On devices below Android 8 there are no channels, so importance is set per notification with <span className="code">setPriority()</span>. For Android 8+ use the channel's <span className="code">importance</span> instead.</p>
                        <CodeBlock title="Set Priority" code={`from android_notify import Notification

n = Notification(title="Important", message="Read me now")
n.setPriority("urgent")  # ['urgent','high','medium','low','none']
n.send()`} has_pydroid_support={false}/>
                    </>
                ) : (
                    <p className="paragraph">
                        Priority (<span className="code">setPriority</span>) was added in <span className='link-design' onClick={() => setVersion("1.59")}>v1.59</span>.
                    </p>
                )}
            </section>

            <span className='flex next-page-btns-box space-between'>
                <Link className='next-page-btn' to='/notification-data'>
                    <ChevronLeft />
                    <span>
                        <p className='next-txt'>Previous</p>
                        <p className='page-name'>Notification Data</p>
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
        </div>
    )
}