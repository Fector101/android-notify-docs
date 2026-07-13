import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router'
import { ScrollToSection } from '../ui/ScrollAssist';
import { CodeBlock } from '../ui/CodeBlock/CodeBlock';
import { InstallSection } from '../ui/InstallSection';
import '../assets/css/mainpage.css'
import { code } from './versions-data/mainpage';

export default function MainPage() {

    return (
        <div className="page main-page flex fd-column">
            <ScrollToSection />
            <section className="page-section" id="introduction">
                <h2>Introduction</h2>
                <hr />
                <p className="intro-text">
                    Android-Notify makes creating and managing Android notifications easy with <span className="code green">Python</span>. It handles all Java details so you can focus on notification content.
                </p>
                <div className="intro-info">
                    <span className="intro-tag">Built with Pyjnius</span>
                    <span className="intro-tag">No extra APIs or services needed</span>
                </div>
            </section>

            <section className="page-section" id="features">
                <h2>Features</h2>
                <hr />

                <div className="features-accordion">
                    <details className="feature-details">
                        <summary>
                            {/* <div className="feature-icon"><Type size={18} /></div> */}
                            <span>Notification Components & Design</span>
                        </summary>
                        <div className="feature-body">
                            <div className="feature-item"><strong>Texts</strong><span>Simple, big text, inbox-style, sub texts, coloured texts</span></div>
                            <div className="feature-item"><strong>Images</strong><span>Large icons, big pictures, custom & coloured app icons</span></div>
                            <div className="feature-item"><strong>Progress Bars</strong><span>Determinate and indeterminate with real-time updates</span></div>
                            <div className="feature-item"><strong>Buttons</strong><span>Action buttons with callbacks and broadcast receivers</span></div>
                        </div>
                    </details>

                    <details className="feature-details">
                        <summary>
                            {/* <div className="feature-icon"><Zap size={18} /></div> */}
                            <span>Behaviours / Runtime Functions</span>
                        </summary>
                        <div className="feature-body">
                            <div className="feature-item"><strong>Send Modes</strong><span>Normal, silent, persistent, or vibrate</span></div>
                            <div className="feature-item"><strong>Live Updates</strong><span>Update title, message, images, and progress after sending</span></div>
                            <div className="feature-item"><strong>Buttons</strong><span>Add or remove buttons at runtime</span></div>
                            <div className="feature-item"><strong>Click Handlers</strong><span>Open app on notification click, custom callbacks</span></div>
                            <div className="feature-item"><strong>Sound & Vibration</strong><span>Custom sound and vibration per notification</span></div>
                            <div className="feature-item"><strong>Timestamps & Clear</strong><span>Set timestamps, clear single or all notifications</span></div>
                        </div>
                    </details>

                    <details className="feature-details">
                        <summary>
                            {/* <div className="feature-icon"><Radio size={18} /></div> */}
                            <span>Channels <span className="feature-badge">Android 8.0+</span></span>
                        </summary>
                        <div className="feature-body">
                            <div className="feature-item"><strong>Manage Channels</strong><span><Link to="/advanced-methods#channel-management">Create, delete, delete all</Link></span></div>
                            <div className="feature-item"><strong>Configure</strong><span>Set importance, vibration, and sound</span></div>
                        </div>
                    </details>

                    <details className="feature-details">
                        <summary>
                            {/* <div className="feature-icon"><Shield size={18} /></div> */}
                            <span>Permissions</span>
                        </summary>
                        <div className="feature-body">
                            <div className="feature-item"><strong>Permission Handling</strong><span>Ask and check notification permission with callback</span></div>
                        </div>
                    </details>
                </div>

            </section>

            <section className="page-section" id='installation'>
                <InstallSection />
            </section>


            <section className="page-section" id='basic-usage'>

                <h2>Basic Usage</h2>
                <hr />
                <div className='inner-section-1'>
                    <p>You can easily create and send notifications with just a few lines of code.</p>
                    <p>Below is a simple example of how to create a basic notification:</p>
                    <CodeBlock code={code} pydroid={`# Testing with "android-notify==1.60.10.dev0" on pydroid
from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.button import Button
from android_notify import Notification
from android_notify.core import asks_permission_if_needed


class AndroidNotifyDemoApp(App):
    def build(self):
        layout = BoxLayout(orientation='vertical', spacing=10, padding=20)
        layout.add_widget(Button(
            text="Ask Notification Permission",
            on_release=self.request_permission
        ))
        layout.add_widget(Button(
            text="Send Notification",
            on_release=self.send_notification
        ))
        return layout

    def request_permission(self, *args):
        # Callback for NotificationHandler.asks_permission not Available on Pyroid3
        asks_permission_if_needed(legacy=True)

    def send_notification(self, *args):
        Notification(
            title="Hello from Android Notify",
            message="This is a basic notification."
        ).send()


if __name__ == "__main__":
    AndroidNotifyDemoApp().run()`} />


                </div>
            </section>
            <span className='flex next-page-btns-box space-between'>
            <Link className='next-page-btn' to='/'>
                <ChevronLeft />
                <span>
                    <p className='next-txt'>Previous</p>
                    <p className='page-name'>Home</p>
                </span>
            </Link>
            <Link className='next-page-btn' to='/components'>
                <span>
                    <p className='next-txt'>Next</p>
                    <p className='page-name'>Components</p>
                </span>
                <ChevronRight />
            </Link>
            </span>

        </div>
    )
}
