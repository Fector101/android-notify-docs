import { useState, useEffect, useMemo } from "react";
import { Prism } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './codeblock.css'
import { Check, Copy, Smartphone } from "lucide-react";
import { copyText } from '../../assets/js/helper';
import { toast } from 'sonner';

function generatePydroidWrapper(code: string): string {
    const indented = code.split('\n').join('\n        ')
        .replace("assets/imgs/profile.png", "https://i.pravatar.cc/300")
        .replace("assets/imgs/photo.png", "https://i.pravatar.cc/300");
    const globalsSet = [...new Set(code.match(/global\s+[a-zA-Z0-9_, ]+/g) || [])];
    const globalDeclarations = globalsSet.length > 0 ? globalsSet.join('\n        ') + '\n        ' : '';

    return `from kivy.app import App
from kivy.uix.button import Button

class MainApp(App):
    def build(self):
        return Button(
            text="Run Code",
            on_press=self.run_code,
            size_hint=[None, None],
            size=[200, 100],
            pos_hint={"center_y": .5, "center_x": .5}
        )

    def run_code(self, *args):
        ${globalDeclarations}${indented}

if __name__ == '__main__':
    MainApp().run()`;
}

export function InlineCode({ code, className }: { code: string, className?: string }) {
    return <span className={`code ${className || ''}`}>{code}</span>
}

export function CodeBlock(
    { title, img = '', code, lang = 'python', pydroid, has_pydroid_support = true }: {
        title?: string; img?: string; code: string; lang?: string; pydroid?: string; has_pydroid_support?: boolean
    }
) {
    const [activeTab, setActiveTab] = useState<'code' | 'pydroid'>('code')
    const [fontSize, setFontSize] = useState<string>(getFontSize());
    const [copied, setCopied] = useState(false);

    const resolvedPydroid = useMemo(() => {
        if (pydroid) return pydroid;
        if (has_pydroid_support && lang === 'python' && code.trim()) {
            return generatePydroidWrapper(code);
        }
        return '';
    }, [pydroid, has_pydroid_support, lang, code]);

    const showPydroid = has_pydroid_support && lang === 'python' && !!resolvedPydroid;
    const displayCode = activeTab === 'pydroid' && showPydroid ? resolvedPydroid : code;

    function getFontSize(): string {
        return window.innerWidth < 500 ? '12px' : '16px';
    }

    useEffect(() => {
        const handleResize = () => setFontSize(getFontSize());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    function copyAction() {
        copyText(displayCode);
        setCopied(true);
        toast.success(activeTab === 'pydroid' ? 'Copied for Pydroid 3' : 'Copied');
        setTimeout(() => setCopied(false), 1500);
    }

    return (
        <div className='code-block flex fd-column width100per' tabIndex={0}>
            <div className="header">
                {showPydroid ? (
                    <div className="code-tabs">
                        <button
                            className={`code-tab${activeTab === 'code' ? ' active' : ''}`}
                            onClick={() => setActiveTab('code')}
                        >
                            In-App
                        </button>
                        <button
                            className={`code-tab${activeTab === 'pydroid' ? ' active' : ''}`}
                            onClick={() => setActiveTab('pydroid')}
                        >
                            <Smartphone size={13} />
                            Pydroid
                        </button>
                    </div>
                ) : (
                    <span className="title">{title || lang || 'code'}</span>
                )}
                <div className="copy-buttons">
                    <button onClick={copyAction} title="Copy Code" className="copy-btn">
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                        <span className="btn-text">{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                </div>
            </div>

            <div className='flex content'>
                <Prism language={lang} style={dracula} customStyle={{ margin: 0, padding: '20px', borderRadius: 0, fontSize: fontSize, overflowX: 'auto', background: 'transparent' }}>{displayCode}</Prism>
                {img && (
                    <div className="preview-container">
                        <img src={img} alt={title || 'Code result'} />
                    </div>
                )}
            </div>
        </div>
    )
}
