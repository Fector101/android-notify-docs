import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router'
import { ScrollToSection } from "../ui/ScrollAssist";
import { CodeBlock } from "../ui/CodeBlock/CodeBlock";
import '../assets/css/advmethodspage.css'

const serviceSpecLine = `services = CarouselService:./android/services/wallpaper.py:foreground:foregroundServiceType=specialUse`

const permissionsLine = `android.permissions = FOREGROUND_SERVICE, FOREGROUND_SERVICE_SPECIAL_USE, POST_NOTIFICATIONS`

const serviceFileExample = `from android_notify import Notification
from android_notify.config import get_python_service
from android_notify.internal.java_classes import BuildVersion, autoclass

service = get_python_service()

foreground_type = 0
if BuildVersion.SDK_INT >= 34:
    # Required type on Android 14+ (SDK 34), 0 on older devices
    ServiceInfo = autoclass("android.content.pm.ServiceInfo")
    foreground_type = ServiceInfo.FOREGROUND_SERVICE_TYPE_SPECIAL_USE

Notification.createChannel(
    id="service_channel",
    name="Carousel Service",
    description="For Controlling and Previewing Next Wallpaper",
)

notification = Notification(
    title="Starting Carousel...",
    name="from service",
    channel_id="service_channel",
)

builder = notification.fill_args()  # build without sending
service.startForeground(notification.id, builder.build(), foreground_type)
service.setAutoRestartService(True)`

export default function ForegroundServicesPage() {
    return (
        <div className="main-page page adv-methods-page">
            <ScrollToSection />

            <section id="overview" className="page-section" tabIndex={0}>
                <h2 className="long-title">Foreground Services</h2>
                <hr />
                <p className="paragraph">A foreground service keeps running even when the app is in the background. Android forces it to show a persistent notification, and you are responsible for posting that notification yourself.</p>
                <p className="paragraph">Instead of calling <span className="code">send()</span>, you build the notification with <span className="code">fill_args()</span> (which returns the builder <strong>without dispatching it</strong>) and pass it to <span className="code">service.startForeground()</span>:</p>
                <CodeBlock title="Service File — android/services/wallpaper.py" code={serviceFileExample} has_pydroid_support={false}/>
            </section>

            <section id="register-the-service" className="page-section" tabIndex={0}>
                <h2 className="long-title">1. Register the Service in buildozer.spec</h2>
                <hr />
                <p className="paragraph">Declare the service in your <span className="code">buildozer.spec</span> with the format <span className="code">Name:path/to/service.py:foreground</span>. Append <span className="code">:foregroundServiceType=specialUse</span> so the type is written into <span className="code">AndroidManifest.xml</span> automatically:</p>
                <CodeBlock title="buildozer.spec" code={serviceSpecLine} lang='ini' has_pydroid_support={false}/>
                <p className="paragraph">The service file lives inside your <span className="code">source.dir</span> (e.g. <span className="code">app_src/android/services/wallpaper.py</span>).</p>
            </section>

            <section id="required-permissions" className="page-section" tabIndex={0}>
                <h2 className="long-title">2. Add the Required Permissions</h2>
                <hr />
                <p className="paragraph">Add <span className="code">FOREGROUND_SERVICE</span> and <span className="code">POST_NOTIFICATIONS</span>. When using the <span className="code">specialUse</span> type also add <span className="code">FOREGROUND_SERVICE_SPECIAL_USE</span>:</p>
                <CodeBlock title="buildozer.spec" code={permissionsLine} lang='ini' has_pydroid_support={false}/>
                <p className="paragraph">Other foreground service types need their matching permission, e.g. <span className="code">FOREGROUND_SERVICE_DATA_SYNC</span> for <span className="code">dataSync</span>. Declaring the type in the manifest without its permission, or starting a service without a type on Android 14+, fails with <span className="code">MissingForegroundServiceTypeException</span>.</p>
            </section>

            <section id="foreground-service-types" className="page-section" tabIndex={0}>
                <h2 className="long-title">3. Foreground Service Types [Android 14+]</h2>
                <hr />
                <p className="ref-note warn">
                    <strong>Types are needed on some Android levels.</strong> From Android 14 (SDK 34) a foreground service type must be passed as the third argument to <span className="code">startForeground()</span> and be declared in the manifest. On older devices pass <span className="code">0</span>.
                </p>
                <p className="paragraph">Pick the type that matches what the service does. <span className="code">specialUse</span> covers purposes that don't fit the other types and requires declaring why in <span className="code">FOREGROUND_SERVICE_SPECIAL_USE</span> permission. See the official Android docs:</p>
                <ul className="inner-section-2 paragraph">
                    <li><Link target='_blank' rel='noopener noreferrer' to='https://developer.android.com/about/versions/14/changes/fgs-types-required'>Android 14: Foreground service types required</Link></li>
                    <li><Link target='_blank' rel='noopener noreferrer' to='https://developer.android.com/develop/background-work/services/fgs/service-types'>Foreground service types</Link></li>
                    <li><Link target='_blank' rel='noopener noreferrer' to='https://developer.android.com/develop/background-work/services/fgs'>Foreground services overview</Link></li>
                </ul>
            </section>

            <section id="real-world-example" className="page-section" tabIndex={0}>
                <h2 className="long-title">Real-World Example</h2>
                <hr />
                <p className="paragraph">This page follows the production app <Link target='_blank' rel='noopener noreferrer' to='https://github.com/Fector101/wallpaper-carousel'>Wallpaper Carousel</Link>, which runs a foreground service for previewing and changing wallpapers. You can see the full setup (service file, buildozer.spec, p4a hook, broadcast receivers) there.</p>
                <p className="paragraph">The service file above is the exact pattern used: create a channel, fill the notification args, then call <span className="code">service.startForeground(notification.id, builder.build(), foreground_type)</span>.</p>
            </section>

            <span className='flex next-page-btns-box space-between'>
                <Link className='next-page-btn' to='/advanced-methods'>
                    <ChevronLeft />
                    <span>
                        <p className='next-txt'>Previous</p>
                        <p className='page-name'>Advanced Methods</p>
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
