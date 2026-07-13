import { useState } from 'react'
import { Terminal } from './Terminal'
import { getInstallCode } from '../pages/versions-data/mainpage'
import './install-section.css'

const tabs = [
  { id: 'pip', label: 'PIP' },
  { id: 'kivy', label: 'Kivy' },
  { id: 'flet', label: 'Flet' },
  { id: 'pydroid', label: 'Pydroid 3' },
]

const titleMap: Record<string, string> = {
  pip: 'terminal',
  kivy: 'buildozer.spec',
  nox: 'buildozer.spec',
  flet: 'pyproject.toml',
  pydroid: 'requirements',
}

export function InstallSection() {
  const [tab, setTab] = useState('pip')
  return (
    <section className="install-section">
      <p className="install-label">Installation</p>
      <h2>One command away</h2>
      <p className="install-intro">Pick your framework and get going in seconds.</p>
      <div className="install-tabs">
        {tabs.map(t => (
          <button
            key={t.id}
            className={`install-tab${tab === t.id ? ' on' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <Terminal code={getInstallCode(tab)} title={titleMap[tab] || 'terminal'} />
    </section>
  )
}
