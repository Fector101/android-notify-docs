import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router'
import { CodeBlock } from "../ui/CodeBlock/CodeBlock";
import { ScrollToSection } from "../ui/ScrollAssist";
import '../assets/css/advmethodspage.css'
import { Iversion } from '../assets/js/mytypes';
import { isLegacyVersion, isAtLeastVersion } from '../assets/js/helper';
import { useAdvancedMethodsData } from './versions-data/useAdvancedMethodsData';

export default function NotificationDataPage({ version, setVersion }: { version: Iversion; setVersion: React.Dispatch<React.SetStateAction<string>> }) {
    const data = useAdvancedMethodsData(version);
    const hasDataApi = isAtLeastVersion(version, "1.60");

    return (
        <div className="main-page page adv-methods-page">
            <ScrollToSection />

            <section id="getting-identifier" className="page-section" tabIndex={0}>
                <h2 className="long-title">Getting Name</h2>
                <hr />
                <p className="paragraph">To get the exact notification (or button) that opened the app, use <span className="code">NotificationHandler{isLegacyVersion(version) ? ".getIdentifer" : '.get_name'}</span> to get the unique identifier string:</p>
                {isLegacyVersion(version) && (
                    <p className="code warning yellow paragraph block width-max-con">In the next version `identifer` will be renamed to `name` and NotificationHandler.getIdentifer to NotificationHandler.get_name.</p>
                )}
                <CodeBlock title="Identifier" code={data?.getting_identifier_code || ''} has_pydroid_support={false}/>
            </section>

            <section id="notification-data" className="page-section" tabIndex={0}>
                <h2 className="long-title">Mutable Data</h2>
                <hr />
                {hasDataApi ? (
                    <>
                        <p className="paragraph">Attach extra data to a notification with <span className="code">setData(data_object)</span>, then read it back via <span className="code">NotificationHandler.data_object</span> when the app is opened (<span className="code">App.on_start</span>) or resumed (<span className="code">App.on_resume</span>). This is useful for passing dynamic context (e.g. a file path or url) alongside the notification name.</p>
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
                    </>
                ) : (
                    <p className="paragraph">
                        Attaching extra data (<span className="code">setData</span>, <span className="code">NotificationHandler.data_object</span>) was added in <span className='link-design' onClick={() => setVersion("1.60")}>v1.60</span>.
                    </p>
                )}
            </section>

            <span className='flex next-page-btns-box space-between'>
                <Link className='next-page-btn' to='/notification-behaviour'>
                    <ChevronLeft />
                    <span>
                        <p className='next-txt'>Previous</p>
                        <p className='page-name'>Notification Behaviour</p>
                    </span>
                </Link>
                <Link className='next-page-btn' to='/notification-control'>
                    <span>
                        <p className='next-txt'>Next</p>
                        <p className='page-name'>Notification Control</p>
                    </span>
                    <ChevronRight />
                </Link>
            </span>
        </div>
    )
}