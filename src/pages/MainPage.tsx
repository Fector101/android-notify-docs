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
                    <div className="feature-details">
                        <h3>Notification Components & Design</h3>
                        <div className="feature-body">
                            <div className="feature-item"><strong>Texts</strong><span>Simple, big text, inbox-style, sub texts, coloured texts</span></div>
                            <div className="feature-item"><strong>Images</strong><span>Large icons, big pictures, custom & coloured app icons</span></div>
                            <div className="feature-item"><strong>Progress Bars</strong><span>Determinate and indeterminate with real-time updates</span></div>
                            <div className="feature-item"><strong>Buttons</strong><span>Action buttons with callbacks and broadcast receivers</span></div>
                        </div>
                    </div>

                    <div className="feature-details">
                        <h3>Behaviours / Runtime Functions</h3>
                        <div className="feature-body">
                            <div className="feature-item"><strong>Send Modes</strong><span>Normal, silent, persistent, or vibrate</span></div>
                            <div className="feature-item"><strong>Live Updates</strong><span>Update title, message, images, and progress after sending</span></div>
                            <div className="feature-item"><strong>Buttons</strong><span>Add or remove buttons at runtime</span></div>
                            <div className="feature-item"><strong>Click Handlers</strong><span>Open app on notification click, custom callbacks</span></div>
                            <div className="feature-item"><strong>Sound & Vibration</strong><span>Custom sound and vibration per notification</span></div>
                            <div className='feature-item'><strong>Obey user Clear</strong><span>Don't show new updates after User clears notification</span></div>
                            <div className="feature-item"><strong>Timestamps & Clear</strong><span>Set timestamps, clear single or all notifications</span></div>
                        </div>
                    </div>

                    <div className="feature-details">
                        <h3>Channels <span className="feature-badge">Android 8.0+</span></h3>
                        <div className="feature-body">
                            <div className="feature-item"><strong>Manage Channels</strong><span><Link to="/advanced-methods#channel-management">Create, read, delete</Link></span></div>
                            <div className="feature-item"><strong>Configure</strong><span>Set importance, vibration, and sound</span></div>
                        </div>
                    </div>

                    <div className="feature-details">
                        <h3>Permissions</h3>
                        <div className="feature-body">
                            <div className="feature-item"><strong>Permission Handling</strong><span>Ask and check notification permission with callback</span></div>
                        </div>
                    </div>
                </div>

            </section>

            <section className="page-section" id='installation'>
                <InstallSection />
            </section>


            <section className="page-section" id='basic-usage'>
                <h2>Basic Usage</h2>
                <hr />
                <p className="intro-text">Create and send notifications with just a few lines of code.</p>
                <CodeBlock code={code} pydroid={`from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.button import Button
from android_notify import Notification, NotificationHandler


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
        NotificationHandler.asks_permission()

    def send_notification(self, *args):
        Notification(
            title="Hello from Android Notify",
            message="This is a basic notification."
        ).send()


if __name__ == "__main__":
    AndroidNotifyDemoApp().run()`} />
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
