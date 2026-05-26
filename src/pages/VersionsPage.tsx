import { nanoid } from 'nanoid'
import { ScrollToSection } from '../ui/ScrollAssist';
import './../assets/css/versionspage.css'

type SectionType = 'good' | 'warning' | 'bad' | ''

const TYPE_TITLES: Record<string, { label: string; className: string }> = {
    good: { label: 'Added', className: 'good' },
    warning: { label: 'Changed', className: 'warning' },
    bad: { label: 'Fixed', className: 'bad' },
}

function VersionBlock({ version, sections }: { version: string; sections: { msg: React.ReactNode; type: SectionType }[] }) {
    const groups = {
        good: sections.filter(s => s.type === 'good'),
        warning: sections.filter(s => s.type === 'warning'),
        bad: sections.filter(s => s.type === 'bad'),
        neutral: sections.filter(s => s.type === ''),
    }

    return (
        <div className="version-block">
            <h2 className="version-title">Version {version}</h2>
            <div className="version-content">
                {(['good', 'warning', 'bad', 'neutral'] as const).map(type => {
                    const items = groups[type]
                    if (!items.length) return null
                    const info = TYPE_TITLES[type]
                    return (
                        <div key={type} className="version-group">
                            {info && <h3 className={`group-title ${info.className}`}>{info.label}</h3>}
                            <ul>
                                {items.map(({ msg }) => (
                                    <li key={nanoid()}>{msg}</li>
                                ))}
                            </ul>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default function VersionsPage() {
    return (
        <div className="page main-page versions-page flex fd-column">
            <ScrollToSection />
            <section className="versions">
                <VersionBlock
                    version="1.60"
                    sections={[
                        { msg: 'Improvements', type: '' },

                        { msg: 'Interactions in Service: A way to pass in BroadCast Reciver and Actions to Buttons', type: 'good' },

                        { msg: <>Usage without gradle dependencies: new branch <span className="code green-shade">without-androidx</span> was created, allowing usage in Pyroid3 and Flet apps. Install via <span className="code green-shade">__version__.dev0</span>.</>, type: 'good' },

                        { msg: 'Flet support: Beta support for Flet Python apps.', type: 'good' },

                        { msg: 'Better Logging: replaced prints with Python logger, allowing log levels.', type: 'good' },

                        { msg: 'Modularization: split package into smaller task-based structure for easier management.', type: 'good' },


                        { msg: <>Class: <span className="code">Notification</span></>, type: '' },

                        { msg: 'New Arguments', type: '' },
                        { msg: <><span className="code">addButton</span> - receiver_name, action</>, type: 'good' },
                        { msg: <><span className="code">createChannel</span> - vibrate, res_sound_name</>, type: 'good' },
                        { msg: <><span className="code">setBigText</span> - title, summary</>, type: 'good' },

                        { msg: 'New Methods', type: '' },
                        { msg: <><span className="code">setColor</span> - color, changes app icon color using hex code.</>, type: 'good' },
                        { msg: <><span className="code">setSubText</span> - text, Adds small text near the title.</>, type: 'good' },
                        { msg: <><span className="code">setWhen</span> - secs_ago, to change the time the notification was created.</>, type: 'good' },
                        { msg: <><span className="code">channelExists</span> - channel_id, to check if said channel exists.</>, type: 'good' },
                        { msg: <><span className="code">doChannelsExist</span> - ids, returns those that do not exist.</>, type: 'good' },
                        { msg: <><span className="code">setData</span> - attach a dictionary of data for later use.</>, type: 'good' },
                        { msg: <><span className="code">fVibrate</span> - force vibration even if disabled in device settings.</>, type: 'good' },
                        { msg: <><span className="code">fill_args</span> - fills notification args without sending.</>, type: 'good' },

                        { msg: 'Support for devices less than Android 8', type: 'good' },
                        { msg: <><span className="code">setVibrate</span> - pattern, defaults to a single vibration.</>, type: 'good' },
                        { msg: <><span className="code">setSound</span> - res_sound_name, changes the default notification sound.</>, type: 'good' },


                        { msg: <>Class: <span className="code">NotificationHandler</span></>, type: '' },

                        { msg: 'New Arguments', type: '' },
                        { msg: <><span className="code">get_name</span> - on_start must be True when called from App.on_start().</>, type: 'good' },

                        { msg: 'New Property', type: '' },
                        { msg: <><span className="code">data_object</span> - access data added via Notification.setData.</>, type: 'good' },
                    ]}
                />
                <VersionBlock version="1.59" sections={[
                    { msg: 'Add new features', type: '' },
                    { msg: <>Added a way to access Old Notification instance with <span className="code">Notification().id</span> </>, type: 'good' },
                    { msg: <>methods to cancel a certain or all Notifications<span className="code">Notification().cancel()</span>, <span className="code">Notification.cancelAll</span>, For if old instance not available and need to cancel one use id with <span className="code">Notification.cancel(_id)</span></>, type: 'good' },
                    { msg: <>When setting a new component after <span className="code">Notification().send</span>  use <span className="code">Notification().refresh</span> </>, type: 'good' },
                    { msg: <>Instead of only requesting in init created <span className="code">NotificationHandler.asks_permission</span> and <span className="code">NotificationHandler.has_permission</span> </>, type: 'good' },
                    { msg: 'Add methods working to free up __init__ kwargs [parsing out `style` attribute]', type: '' },
                    { msg: <><span className="code">setSmallIcon</span> == <span className="code yellow-shade">Notification(...,app_icon="...") </span></>, type: 'good' },
                    { msg: <><span className="code">setLargeIcon</span> == <span className="code yellow-shade">Notification(...,large_icon_path="...",style=NotificationStyles.LARGE_ICON)</span></>, type: 'good' },
                    { msg: <><span className="code">setBigPicture</span> == <span className="code yellow-shade">Notification(...,body="...",style=NotificationStyles.BIG_PICTURE)</span></>, type: 'good' },
                    { msg: <><span className="code">setBigText</span> == <span className="code yellow-shade">Notification(...,big_picture_path="...",style=NotificationStyles.BIG_TEXT)</span></>, type: 'good' },
                    { msg: <>For creating channels <span className="code">Notification.createChannel(name, id, desc</span> </>, type: 'good' },
                    { msg: <>For deleting channels <span className="code">Notification.deleteAllChannel()</span> and <span className="code">Notification.deleteChannel(channel_id)</span> </>, type: 'good' },
                    { msg: 'Changed ', type: '' },
                    { msg: '`Notification.identifer` to `Notification.name`', type: 'warning' },
                    { msg: '`NotificationHandler.getIdentifer` to `NotificationHandler.get_name`', type: 'warning' },
                ]} />
                <VersionBlock version="1.58" sections={[
                    { msg: '`showInfiniteProgressBar` Had no guard block when not on android', type: 'warning' },
                    { msg: '`NotificationHandler.getIdentifer` always returned value even when app not opened from notification', type: 'bad' },
                ]} />
            </section>

        </div>
    )
}



