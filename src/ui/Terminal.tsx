import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import './terminal.css'

export function Terminal({ code, title }: { code: string; title?: string }) {
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
