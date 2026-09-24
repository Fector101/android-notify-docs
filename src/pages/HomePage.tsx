import { Link } from 'react-router'
import { ChevronLeft, ChevronRight, BookOpen, Puzzle, Cpu, FileText, LifeBuoy, Activity, BellRing, Database, XCircle } from 'lucide-react';
import { ScrollToSection } from '../ui/ScrollAssist'
import { CodeBlock } from '../ui/CodeBlock/CodeBlock';
import "../assets/css/home-page.css"

const CARDS = [
    { title: 'Getting Started', desc: 'Installation, basic usage, and first notification', icon: BookOpen, to: '/getting-started' },
    { title: 'Components', desc: 'Images, buttons, progress bars, text styles', icon: Puzzle, to: '/components' },
    { title: 'Channels', desc: 'Create, read, delete channels, custom sound & vibration', icon: Cpu, to: '/channels' },
    { title: 'Notification Behaviour', desc: 'Heads-up alerts, obey user clear, tray presence', icon: BellRing, to: '/notification-behaviour' },
    { title: 'Notification Data', desc: 'Read the identifier and extra data from taps', icon: Database, to: '/notification-data' },
    { title: 'Notification Control', desc: 'Cancel notifications, timestamps, priority', icon: XCircle, to: '/notification-control' },
    { title: 'Foreground Services', desc: 'Persistent notifications for background services', icon: Activity, to: '/foreground-services' },
    { title: 'Reference', desc: 'Full API reference by version', icon: FileText, to: '/reference' },
    { title: 'Help', desc: 'Debugging, contributing, support', icon: LifeBuoy, to: '/help' },
]

const QUICK_CODE = `from android_notify import Notification

Notification(
    title="Hello!",
    message="Welcome to Android Notify"
).send()`

export default function HomePage() {
    return (
        <div className="page main-page home-page">
            <ScrollToSection />

            <section className="home-hero">
                <h1>Android Notify</h1>
                <p className="tagline">A simple way to create and customize Android notifications in Kivy and Flet apps.</p>

                <Link to="/versions#v1_61" className="version-badge">v1.61.8</Link>
            </section>

            <section className="home-section">
                <h2>Quick Start</h2>
                <CodeBlock code={QUICK_CODE} />
            </section>

            <section className="home-section">
                <h2>Documentation</h2>
                <div className="cards-grid">
                    {CARDS.map(card => (
                        <Link key={card.to} to={card.to} className="home-card">
                            <card.icon className="card-icon" size={22} />
                            <p className="card-title">{card.title}</p>
                            <p className="card-desc">{card.desc}</p>
                        </Link>
                    ))}
                </div>
            </section>

            <span className='flex next-page-btns-box space-between'>
                <Link className='next-page-btn' to='/help'>
                    <ChevronLeft />
                    <span>
                        <p className='next-txt'>Previous</p>
                        <p className='page-name'>Help</p>
                    </span>
                </Link>
                <Link className='next-page-btn' to='/getting-started'>
                    <span>
                        <p className='next-txt'>Next</p>
                        <p className='page-name'>Getting Started</p>
                    </span>
                    <ChevronRight />
                </Link>
            </span>

        </div>
    )
}
