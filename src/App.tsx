import { useState, useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { Toaster } from 'sonner'
import { Menu, X, Copy, Check, ChevronDown, Bell, Zap, Image, BarChart3, Type, Radio, Volume2, Vibrate, Shield, Search, ArrowRight, Github } from 'lucide-react'

import bigPicImg from './assets/imgs/bigpicturenoti.jpg'
import largeIconImg from './assets/imgs/largeicon.jpg'
import btnsImg from './assets/imgs/btns.jpg'
import progressImg from './assets/imgs/progress.jpg'
import customIconImg from './assets/imgs/custom_icon.jpg'
import customColorImg from './assets/imgs/custom_color_icon.jpg'
import onlineImg from './assets/imgs/online-img.jpg'
import subTextImg from './assets/imgs/sub-text.jpg'
import inboxGif from './assets/imgs/inbox_text.gif'
import bigTextGif from './assets/imgs/big_text.gif'
import progressGif from './assets/imgs/progressbar.gif'

import { VERSIONS, getInstallCode, getQuickstart, getCode, getRefData } from './data'
import type { Version } from './data'

const COLOR_ICON_CODE = [
  'from android_notify import Notification',
  'notification = Notification(title="Emergency!", message="Check out now!")',
  'notification.setColor("red")  # or "#FF0000"',
  'notification.send()',
].join('\n')

const ONLINE_IMG_CODE = [
  'from android_notify import Notification',
  'notification = Notification(title="Using Online Image", message="Pass image URL")',
  'notification.setBigPicture("https://www.python.org/static/img/python-logo.png")',
  'notification.send()',
].join('\n')

const UPDATE_TEXT_CODE = [
  'from android_notify import Notification',
  '',
  'notification = Notification(title="Processing...", message="Starting task")',
  'notification.send()',
  '',
  'notification.updateTitle("Processing Complete!")',
  'notification.updateMessage("Task finished successfully")',
].join('\n')

export default function App() {
  const [version, setVersion] = useState<Version>('1.60')
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <Toaster position="top-right" theme="dark" />
      <Nav version={version} setVersion={setVersion} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <HeroSection />
        <FeaturesSection />
        <InstallSection />
        <ComponentsSection version={version} />
        <ApiSection version={version} />
        <ChangelogSection />
      </main>
      <footer className="footer">
        <span>Android Notify &middot; Built by <a href="https://github.com/Fector101" target="_blank" rel="noopener noreferrer">Fector101</a></span>
        <span><a href="https://github.com/Fector101/android_notify" target="_blank" rel="noopener noreferrer">GitHub</a></span>
      </footer>
      <Analytics />
    </>
  )
}

/* ═══ NAV ═══ */
function Nav({ version, setVersion, menuOpen, setMenuOpen }: { version: Version; setVersion: (v: Version) => void; menuOpen: boolean; setMenuOpen: (v: boolean) => void }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  const links = [
    { label: 'Features', href: '#features' },
    { label: 'Install', href: '#install' },
    { label: 'Components', href: '#components' },
    { label: 'API', href: '#api' },
    { label: 'Changelog', href: '#changelog' },
  ]
  const navLinksCls = "nav-links" + (menuOpen ? " open" : "")
  return (
    <nav className="nav" style={scrolled ? { borderBottomColor: 'rgba(255,255,255,0.06)' } : undefined}>
      <a href="#top" className="nav-logo">
        <div className="nav-logo-icon"><Bell size={15} /></div>
        Android Notify
      </a>
      <div className={navLinksCls}>
        {links.map(l => (
          <a key={l.href} href={l.href} className="nav-link" onClick={() => setMenuOpen(false)}>{l.label}</a>
        ))}
        <select value={version} onChange={e => setVersion(e.target.value as Version)}
          style={{ background: 'var(--surface2)', color: 'var(--amber)', border: '1px solid var(--surface3)', borderRadius: '6px', padding: '.3rem .5rem', fontFamily: 'var(--font-mono)', fontSize: '.78rem', cursor: 'pointer' }}>
          {VERSIONS.map(v => <option key={v} value={v}>v{v}</option>)}
        </select>
        <a href="https://github.com/Fector101/android_notify" target="_blank" rel="noopener noreferrer" className="nav-cta">GitHub</a>
      </div>
      <button className="nav-mobile" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </nav>
  )
}

/* ═══ HERO ═══ */
function HeroSection() {
  return (
    <section className="hero" id="top">
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />
      <div className="hero-content">
        <span className="hero-badge">v1.60.10 &middot; Stable</span>
        <h1>Rich notifications, <em>simple Python</em></h1>
        <p className="hero-sub">
          One library to create, customize, and manage Android notifications from Python.
          Progress bars, buttons, images, channels — all in a few lines of code.
        </p>
        <div className="hero-btns">
          <a href="#install" className="btn btn-amber">Get Started <ArrowRight size={15} /></a>
          <a href="https://github.com/Fector101/android_notify" target="_blank" rel="noopener noreferrer" className="btn btn-outline"><Github size={15} /> Star on GitHub</a>
        </div>
        <div className="hero-code">
          <Terminal code={getQuickstart()} title="quickstart.py" />
        </div>
      </div>
    </section>
  )
}

/* ═══ FEATURES BENTO ═══ */
function FeaturesSection() {
  const cards = [
    { icon: <Zap size={18} />, color: 'amber', title: 'Send Anywhere', desc: 'Normal, silent, persistent, or vibrate — dispatch notifications your way.' },
    { icon: <Image size={18} />, color: 'sky', title: 'Images', desc: 'Big pictures, large icons, custom app icons, colored overlays. Local or online.', wide: true },
    { icon: <BarChart3 size={18} />, color: 'emerald', title: 'Progress Bars', desc: 'Determinate and indeterminate bars with real-time updates.' },
    { icon: <Type size={18} />, color: 'violet', title: 'Rich Text', desc: 'Inbox-style, big text, sub text, colored text layouts.', wide: true },
    { icon: <Radio size={18} />, color: 'rose', title: 'Channels', desc: 'Create, manage, and customize notification channels for Android 8+.' },
    { icon: <Volume2 size={18} />, color: 'amber', title: 'Custom Sound', desc: 'Assign unique sounds from your app resources per channel.' },
    { icon: <Vibrate size={18} />, color: 'sky', title: 'Vibration', desc: 'Custom vibration patterns. Force vibrate for emergencies.' },
    { icon: <Shield size={18} />, color: 'emerald', title: 'Permissions', desc: 'Ask and check notification permission with callbacks.' },
  ]
  return (
    <section className="section" id="features">
      <p className="section-label">Features</p>
      <h2>Everything you need</h2>
      <p className="section-intro">A complete toolkit for Android notifications from Python.</p>
      <div className="bento bento-4">
        {cards.map((c, i) => {
          const cardCls = "bento-card" + (c.wide ? " wide" : "")
          return (
            <div key={i} className={cardCls}>
              <div className={"card-icon " + c.color}>{c.icon}</div>
              <div className="card-title">{c.title}</div>
              <div className="card-desc">{c.desc}</div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* ═══ INSTALL ═══ */
function InstallSection() {
  const [tab, setTab] = useState('pip')
  const tabs = [
    { id: 'pip', label: 'PIP' },
    { id: 'kivy', label: 'Kivy' },
    { id: 'flet', label: 'Flet' },
    { id: 'pydroid', label: 'Pydroid 3' },
  ]
  const titleMap: Record<string, string> = { pip: 'terminal', kivy: 'buildozer.spec', nox: 'buildozer.spec', flet: 'pyproject.toml', pydroid: 'requirements' }
  return (
    <section className="section" id="install" style={{ background: 'var(--surface)', borderRadius: '20px', margin: '3rem auto', maxWidth: '1060px' }}>
      <p className="section-label">Installation</p>
      <h2>One command away</h2>
      <p className="section-intro">Pick your framework and get going in seconds.</p>
      <div className="tabs">
        {tabs.map(t => {
          const tabCls = "tab" + (tab === t.id ? " on" : "")
          return <button key={t.id} className={tabCls} onClick={() => setTab(t.id)}>{t.label}</button>
        })}
      </div>
      <Terminal code={getInstallCode(tab)} title={titleMap[tab] || 'terminal'} />
    </section>
  )
}

/* ═══ COMPONENTS ═══ */
function ComponentsSection({ version }: { version: Version }) {
  const isLegacy = version === '1.58'
  const subTextAvailable = version === '1.60'
  return (
    <section className="section" id="components">
      <p className="section-label">Components</p>
      <h2>Build stunning notifications</h2>
      <p className="section-intro">Mix and match images, buttons, progress bars, and text styles.</p>

      <h3 style={{ marginBottom: '.75rem' }}>Images</h3>
      <p style={{ marginBottom: '1rem' }}>Enhance notifications with local or online images. Paths relative to main.py. For online images add android.permissions = INTERNET.</p>
      <div className="bento bento-2" style={{ marginBottom: '2rem' }}>
        <div className="bento-card wide">
          <div className="card-title">Big Picture Style</div>
          <Terminal code={getCode('big_picture', version)} img={bigPicImg} />
        </div>
        <div className="bento-card">
          <div className="card-title">Large Icon</div>
          <Terminal code={getCode('large_icon', version)} img={largeIconImg} />
        </div>
        <div className="bento-card">
          <div className="card-title">Custom App Icon</div>
          <p style={{ fontSize: '.82rem', marginBottom: '.5rem' }}>Must use PNG format or image displays as black box.</p>
          <Terminal code={getCode('small_icon', version)} img={customIconImg} />
        </div>
      </div>

      <div className="bento-card wide" style={{ marginBottom: '2rem' }}>
        <div className="card-title">Coloured App Icon</div>
        <p style={{ fontSize: '.82rem', marginBottom: '.5rem' }}>Use .setColor(color) with hex codes or color names.</p>
        <Terminal code={COLOR_ICON_CODE} img={customColorImg} />
      </div>

      <div className="bento-card wide" style={{ marginBottom: '2rem' }}>
        <div className="card-title">Online Image</div>
        <Terminal code={ONLINE_IMG_CODE} img={onlineImg} />
      </div>

      <h3 style={{ margin: '2rem 0 .75rem' }}>Buttons</h3>
      <p style={{ marginBottom: '1rem' }}>Add interactive buttons with callback functions.</p>
      <Terminal code={getCode('buttons', version)} img={btnsImg} />

      <h3 style={{ margin: '2rem 0 .75rem' }}>Progress Bars</h3>
      <p style={{ marginBottom: '1rem' }}>Real-time progress with updateProgressBar(), infinite animation with showInfiniteProgressBar(), and clean removal with removeProgressBar().</p>
      <Terminal code={getCode('progressbar', version)} img={isLegacy ? progressImg : progressGif} />
      <div className="warn-box">
        <h4>Update Frequency</h4>
        <p>Android ignores updates faster than 0.5 seconds. android-notify handles rapid updates automatically.</p>
      </div>

      <h3 style={{ margin: '2rem 0 .75rem' }}>Texts</h3>
      <div className="bento bento-2" style={{ marginBottom: '1.5rem' }}>
        <div className="bento-card">
          <div className="card-title">Inbox Style</div>
          <p style={{ fontSize: '.82rem', marginBottom: '.5rem' }}>{isLegacy ? 'Use message with newline characters.' : 'Use addLine() for each line.'}</p>
          <Terminal code={getCode('inbox', version)} img={inboxGif} />
        </div>
        <div className="bento-card">
          <div className="card-title">Big Text</div>
          <p style={{ fontSize: '.82rem', marginBottom: '.5rem' }}>{isLegacy ? 'Use body parameter.' : 'Use setBigText().'}</p>
          <Terminal code={getCode('big_text', version)} img={bigTextGif} />
        </div>
      </div>

      {subTextAvailable && (
        <div className="bento-card wide" style={{ marginBottom: '1.5rem' }}>
          <div className="card-title">Sub Text</div>
          <p style={{ fontSize: '.82rem', marginBottom: '.5rem' }}>Small text near the app name — great for context like remaining time.</p>
          <Terminal code={getCode('sub_text', version)} img={subTextImg} />
        </div>
      )}

      <div className="bento-card wide">
        <div className="card-title">Update Text After Sending</div>
        <Terminal code={UPDATE_TEXT_CODE} />
      </div>
    </section>
  )
}

/* ═══ API REFERENCE ═══ */
function ApiSection({ version }: { version: Version }) {
  const data = getRefData(version)
  const [q, setQ] = useState('')
  const [openCards, setOpenCards] = useState<Record<string, boolean>>({})
  const match = (s?: string) => !q || (s || '').toLowerCase().includes(q.toLowerCase())
  const methods = Object.entries(data.methods).filter(([k, m]) =>
    match(k) || match(m.signature) || match(m.description) || (m.args || []).some(a => match(a.name) || match(a.desc))
  )
  const handlers = data.handlers.filter(h => match(h.id) || match(h.signature) || match(h.description))
  const toggle = (key: string) => setOpenCards(p => {
    const next = { ...p }
    next[key] = !next[key]
    return next
  })

  return (
    <section className="section" id="api" style={{ background: 'var(--surface)', borderRadius: '20px', margin: '3rem auto', maxWidth: '1060px' }}>
      <p className="section-label">API Reference</p>
      <h2>Complete API</h2>
      <p className="section-intro">All methods, arguments, and descriptions for v{version}.</p>
      <div className="ref-search">
        <Search size={16} />
        <input type="search" placeholder="Search methods, arguments, descriptions..." value={q} onChange={e => setQ(e.target.value)} />
      </div>
      {methods.length > 0 && (
        <>
          <h3 style={{ margin: '1.5rem 0 .75rem', fontSize: '1rem' }}>Notification</h3>
          <div className="api-grid">
            {methods.map(([k, m]) => {
              const cls = "api-card" + (openCards[k] ? " open" : "")
              return (
                <div key={k} className={cls}>
                  <div className="api-head" onClick={() => toggle(k)}>
                    <span className="api-sig">{m.signature || k}</span>
                    <ChevronDown size={14} className="api-chevron" />
                  </div>
                  <div className="api-body">
                    <div className="api-inner">
                      <p className="api-desc">{m.description}</p>
                      {m.args && m.args.length > 0 && (
                        <dl className="api-args">
                          {m.args.map(a => <div key={a.name}><dt>{a.name}</dt><dd>{a.desc}</dd></div>)}
                        </dl>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
      {handlers.length > 0 && (
        <>
          <h3 style={{ margin: '1.5rem 0 .75rem', fontSize: '1rem' }}>NotificationHandler</h3>
          <div className="api-grid">
            {handlers.map(h => {
              const cls = "api-card" + (openCards[h.id] ? " open" : "")
              return (
                <div key={h.id} className={cls}>
                  <div className="api-head" onClick={() => toggle(h.id)}>
                    <span className="api-sig">{h.signature}</span>
                    <ChevronDown size={14} className="api-chevron" />
                  </div>
                  <div className="api-body">
                    <div className="api-inner">
                      <p className="api-desc">{h.description}</p>
                      {h.args && h.args.length > 0 && (
                        <dl className="api-args">
                          {h.args.map(a => <div key={a.name}><dt>{a.name}</dt><dd>{a.desc}</dd></div>)}
                        </dl>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </section>
  )
}

/* ═══ CHANGELOG ═══ */
function ChangelogSection() {
  return (
    <section className="section" id="changelog">
      <p className="section-label">Changelog</p>
      <h2>Version history</h2>
      <div className="legend" style={{ marginTop: '1rem' }}>
        <span className="legend-item"><span className="legend-pip" style={{ background: 'var(--emerald)' }} /> New feature</span>
        <span className="legend-item"><span className="legend-pip" style={{ background: 'var(--amber)' }} /> API change</span>
        <span className="legend-item"><span className="legend-pip" style={{ background: 'var(--rose)' }} /> Fix</span>
      </div>
      <div className="timeline">
        <div className="tl-item">
          <div className="tl-dot green" />
          <div className="tl-ver">1.60</div>
          <div className="tl-section">Improvements</div>
          <ul className="tl-list">
            <li className="green">Broadcast receiver support for buttons in service</li>
            <li className="green">Without-AndroidX branch for Pydroid3 and Flet apps</li>
            <li className="green">Flet support (beta)</li>
            <li className="green">Better logging with Python logger</li>
            <li className="green">Modularized package structure</li>
          </ul>
          <div className="tl-section">New Methods</div>
          <ul className="tl-list">
            <li className="green"><code>setColor</code> — app icon color via hex code</li>
            <li className="green"><code>setSubText</code> — small text near title</li>
            <li className="green"><code>setWhen</code> — custom creation timestamp</li>
            <li className="green"><code>channelExists</code> / <code>doChannelsExist</code></li>
            <li className="green"><code>setData</code> — attach data dictionary</li>
            <li className="green"><code>fVibrate</code> — force vibration for emergencies</li>
            <li className="green"><code>fill_args</code> — fill args without sending</li>
            <li className="green"><code>setVibrate</code> / <code>setSound</code> for pre-Android 8</li>
          </ul>
        </div>
        <div className="tl-item">
          <div className="tl-dot green" />
          <div className="tl-ver">1.59</div>
          <ul className="tl-list">
            <li className="green">Access old notification instance via <code>.id</code></li>
            <li className="green"><code>cancel()</code> / <code>cancelAll()</code> methods</li>
            <li className="green"><code>refresh()</code> to update sent notifications</li>
            <li className="green"><code>asks_permission</code> / <code>has_permission</code> on handler</li>
            <li className="green">New methods: setSmallIcon, setLargeIcon, setBigPicture, setBigText</li>
            <li className="green">Channel management: createChannel, deleteChannel, deleteAllChannel</li>
            <li className="amber">Renamed: identifer to name, getIdentifer to get_name</li>
          </ul>
        </div>
        <div className="tl-item">
          <div className="tl-dot amber" />
          <div className="tl-ver">1.58</div>
          <ul className="tl-list">
            <li className="amber">showInfiniteProgressBar had no Android guard block</li>
            <li className="red">getIdentifer always returned value even without notification tap</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ═══ TERMINAL COMPONENT ═══ */
function Terminal({ code, title, img }: { code: string; title?: string; img?: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  if (!code) return null
  const btnCls = "term-btn" + (copied ? " copied" : "")
  return (
    <div className="terminal">
      {img && <img src={img} alt="" className="img-preview" loading="lazy" />}
      <div className="terminal-bar">
        <div className="terminal-dots">
          <span className="terminal-dot r" />
          <span className="terminal-dot y" />
          <span className="terminal-dot g" />
        </div>
        {title && <span className="terminal-title">$ {title}</span>}
        <div className="terminal-actions">
          <button className={btnCls} onClick={copy}>
            {copied ? <><Check size={11} /> Copied</> : <><Copy size={11} /> Copy</>}
          </button>
        </div>
      </div>
      <pre><code>{code}</code></pre>
    </div>
  )
}
