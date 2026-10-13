import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router'
import { ScrollToSection } from "../ui/ScrollAssist";
import { CodeBlock } from "../ui/CodeBlock/CodeBlock";
import '../assets/css/advmethodspage.css'

const serviceSpecLine = `services = CarouselService:./android/services/wallpaper.py:foreground:foregroundServiceType=specialUse`

const permissionsLine = `android.permissions = FOREGROUND_SERVICE, FOREGROUND_SERVICE_SPECIAL_USE, POST_NOTIFICATIONS`

const startServiceExample = `# ./main.py
from android import mActivity
from jnius import autoclass

context = mActivity.getApplicationContext()
service_name = "CarouselService"
service = autoclass(context.getPackageName() + '.Service' + service_name.capitalize())
service.start(mActivity, "")
`
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

builder = notification.fill_args()  # fill args into the builder (nothing posted yet)
service.startForeground(notification.id, builder.build(), foreground_type)
service.setAutoRestartService(True)

# Your service logic goes here
# Example: while True: do_something()
import time

fmt = lambda s: f"{int(s//3600)}h {int((s%3600)//60)}m {int(s%60)}s"
start = time.time()
END_TIME = 6 * 3600
while True:
    elapsed = time.time() - start
    if elapsed >= END_TIME:
        notification.updateTitle(f"Total runtime {fmt(elapsed)}")
        break
    notification.updateTitle(f"Running for {fmt(elapsed)}")
    time.sleep(1)
`

export default function ForegroundServicesPage() {
    return (
        <div className="main-page page adv-methods-page foreground-services-page">
            <ScrollToSection />

            <section id="overview" className="page-section" tabIndex={0}>
                <h2 className="long-title large-title">Foreground Services</h2>
                {/* <hr /> */}
                <p className="paragraph">A foreground service keeps running even when the app is in the background. Android requires a persistent notification.</p>
                <p className="paragraph">Instead of calling <span className="code">send()</span>, call <span className="code">fill_args()</span> to fill the notification's arguments into a builder without posting it, then pass <span className="code">builder.build()</span> to <span className="code">service.startForeground()</span>:</p>
            </section>

            <section id="register-the-service" className="page-section" tabIndex={0}>
                <h2 className="long-title underline">1. Register the Service in buildozer.spec</h2>
                <p className="paragraph">Declare the service in your <span className="ode">buildozer.spec</span> with the format <span className="code">Name:path/to/service.py:foreground</span>. Appending <span className="code">:foregroundServiceType=specialUse</span> as it's type, types are required from android 14+</p>
                <CodeBlock title="buildozer.spec" code={serviceSpecLine} lang='ini' has_pydroid_support={false}/>
            </section>

            <section id="required-permissions" className="page-section" tabIndex={0}>
                <h2 className="long-title underline">2. Add the Required Permissions</h2>
                <p className="paragraph">Add <span className="code">FOREGROUND_SERVICE</span> and <span className="code">POST_NOTIFICATIONS</span>. When using the <span className="code">specialUse</span> type also add <span className="code">FOREGROUND_SERVICE_SPECIAL_USE</span>:</p>
                <CodeBlock title="buildozer.spec" code={permissionsLine} lang='ini' has_pydroid_support={false}/>
                <p className="paragraph">Other foreground service types need their matching permission, e.g. <span className="code">FOREGROUND_SERVICE_DATA_SYNC</span> for <span className="code">dataSync</span>. Declaring the type in the manifest without its permission, or starting a service without a type on Android 14+, fails with <span className="code">MissingForegroundServiceTypeException</span>.</p>
            </section>

            <section id="start-service" className="page-section" tabIndex={0}>
                <h2 className="long-title underline">3. Start the Service</h2>
                <p className="paragraph">Call the service from your main process:</p>
                <CodeBlock title="Python Code" code={startServiceExample} lang='python' has_pydroid_support={false}/>
            </section>

            <section id="running-the-service" className="page-section" tabIndex={0}>
                <h2 className="long-title underline">4. Running the Service</h2>
                <p className="paragraph">Then in your service file you can promote the service to a foreground service and run your long task:</p>
                <CodeBlock title="Service File — android/services/wallpaper.py" code={serviceFileExample} has_pydroid_support={false}/>
            </section>

            <section id="add-buttons" className="page-section" tabIndex={0}>
                <h2 className="long-title underline">5. Add Buttons (Bonus)</h2>
                <p className="paragraph">In a Java file you can either:</p>
                <ol className="paragraph list-decimal ml-[20px]">
                    <li>Route Broadcast listener to your service process -  <Link target='_blank' rel='noopener noreferrer' to='https://github.com/Fector101/android_notify/wiki/Routing-Broadcast-listener-to-Python'>broadcast buttons with python listener</Link> (Recommended)</li>
                    <li className='mt-[10px]'>Have it send a OSC (network requests) to your service server -  <Link target='_blank' rel='noopener noreferrer' to='https://github.com/Fector101/android_notify/wiki/How-to-Use-Buttons-to-Communicate-with-Service'>broadcast buttons with python-osc</Link>  </li>
                </ol>
                <p className="paragraph">To see logs on a plugged in device <span className="code">adb logcat | grep -E "python|CarouselService|CarouselReceiver"</span></p>
                
            </section>

            <section id="foreground-service-types" className="page-section" tabIndex={0}>
                <h2 className="long-title">Foreground Service Types [Android 14+]</h2>
                <hr />
                <p className="paragraph"><strong>Types are needed on some Android levels.</strong> From Android 14 (SDK 34) a foreground service type must be passed as the third argument to <span className="code">startForeground()</span> and be declared in the manifest. On older devices pass <span className="code">0</span>.</p>
                <p className="paragraph">Pick the type that matches what the service does. <span className="code">specialUse</span> covers purposes that don't fit the other types and requires declaring why in <span className="code">FOREGROUND_SERVICE_SPECIAL_USE</span> permission.</p>
                <p className="paragraph">See the official Android docs:</p>
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
                <Link className='next-page-btn' to='/notification-control'>
                    <ChevronLeft />
                    <span>
                        <p className='next-txt'>Previous</p>
                        <p className='page-name'>Notification Control</p>
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
