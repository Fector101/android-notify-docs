import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router'
import { CodeBlock } from "../ui/CodeBlock/CodeBlock";
import { ScrollToSection } from "../ui/ScrollAssist";
import '../assets/css/advmethodspage.css'
import { Iversion } from '../assets/js/mytypes';
import { isAtLeastVersion } from '../assets/js/helper';
import { useAdvancedMethodsData } from './versions-data/useAdvancedMethodsData';

export default function NotificationBehaviourPage({ version, setVersion }: { version: Iversion; setVersion: React.Dispatch<React.SetStateAction<string>> }) {
    const data = useAdvancedMethodsData(version);
    const hasBehaviourApi = isAtLeastVersion(version, "1.61");

    return (
        <div className="main-page page adv-methods-page">
            <ScrollToSection />

            <section id="notification-behaviour" className="page-section" tabIndex={0}>
                <h2 className="long-title">Notification Behaviour{!hasBehaviourApi && ' '}
                    {!hasBehaviourApi && <span className="feature-badge">v1.61+</span>}
                </h2>
                <hr />
                {hasBehaviourApi && data ? (
                    <>
                        <p className="paragraph">Fine-tune how updates behave in the tray: suppress heads-up popups, respect a user's clear, and check whether the notification is still around.</p>

                        <h3 id="only-alert-once" className="underline text-xl mt-[10px] mb-[0]">Heads-Up Alerts — <span className="code">setOnlyAlertOnce</span></h3>
                        <p className="paragraph">By default every update can trigger a <strong>heads-up popup</strong>. Use <span className="code">setOnlyAlertOnce(True)</span> so only the first send pops up while updates stay quiet in the tray:</p>
                        <CodeBlock title="Suppress Heads-Up on Updates" code={data?.only_alert_once_code || ''} />

                        <h3 id="obey-user-clear" className="underline text-xl mt-[10px] mb-[0]">Reappear After User Clears — <span className="code">setObeyUserClear</span></h3>
                        <p className="paragraph">If the user swipes your notification away, an update from the app can bring it back. Use <span className="code">setObeyUserClear(True)</span> to respect the clear and keep it gone (Android 6+):</p>
                        <CodeBlock title="Don't Reappear After User Clears" code={data?.obey_user_clear_code || ''} />

                        <h3 id="is-in-tray" className="underline text-xl mt-[10px] mb-[0]">Check Tray Presence — <span className="code">isInTray</span></h3>
                        <p className="paragraph">Check whether this notification is currently in the system tray before deciding to update or resend (Android 6+):</p>
                        <CodeBlock title="Is It Still In The Tray?" code={data?.is_intray_code || ''} />
                    </>
                ) : (
                    <p className="paragraph">
                        These methods (<span className="code">setOnlyAlertOnce</span>, <span className="code">setObeyUserClear</span>, <span className="code">isInTray</span>) were added in <span className='link-design' onClick={() => setVersion("1.61")}>v1.61</span>. Switch the version to see examples.
                    </p>
                )}
            </section>

            <span className='flex next-page-btns-box space-between'>
                <Link className='next-page-btn' to='/channels'>
                    <ChevronLeft />
                    <span>
                        <p className='next-txt'>Previous</p>
                        <p className='page-name'>Channels</p>
                    </span>
                </Link>
                <Link className='next-page-btn' to='/notification-data'>
                    <span>
                        <p className='next-txt'>Next</p>
                        <p className='page-name'>Notification Data</p>
                    </span>
                    <ChevronRight />
                </Link>
            </span>
        </div>
    )
}