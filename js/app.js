// === ANDROID NOTIFY DOCS - MAIN APP JS ===

// --- Version Management ---
function getCurrentVersion() {
  return localStorage.getItem('android-notify-version') || '1.60';
}
function setCurrentVersion(v) {
  localStorage.setItem('android-notify-version', v);
  document.querySelectorAll('.version-no').forEach(el => el.textContent = 'v' + v);
}
function isLegacyVersion(v) { return v === '1.58'; }

// --- Toast ---
function showToast(msg) {
  let c = document.querySelector('.toast-container');
  if (!c) { c = document.createElement('div'); c.className = 'toast-container'; document.body.appendChild(c); }
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  c.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

// --- Clipboard ---
function copyText(text) {
  navigator.clipboard.writeText(text).catch(() => {});
}

// --- CodeBlock Rendering ---
function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function renderCodeBlock(opts) {
  const { title, code, lang = 'python', img, pydroid, has_pydroid_support = true } = opts;
  const id = 'cb-' + Math.random().toString(36).slice(2, 9);

  let html = `<div class="code-block" id="${id}" data-code="${escapeHtml(code)}" data-lang="${lang}">`;
  html += `<div class="header"><span class="title">${escapeHtml(title || lang || 'code')}</span>`;
  html += `<div class="copy-buttons">`;
  html += `<button onclick="handleCopy('${id}')" title="Copy Code" class="regular-copy-btn">`;
  html += `<svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>`;
  html += `<svg class="check-icon display-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
  html += `<span class="btn-text">Copy</span></button>`;
  if (has_pydroid_support && lang === 'python') {
    html += `<button onclick="handlePydroidCopy('${id}')" title="Copy for Pydroid 3" class="pydroid-copy-btn">`;
    html += `<svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`;
    html += `<svg class="check-icon display-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
    html += `<span class="btn-text">Pydroid</span></button>`;
  }
  html += `</div></div>`;
  html += `<div class="content">`;
  html += `<pre><code class="language-${lang}">${escapeHtml(code)}</code></pre>`;
  if (img) {
    html += `<div class="preview-container"><img src="${img}" alt="${escapeHtml(title || 'Code result')}" loading="lazy"/></div>`;
  }
  html += `</div></div>`;
  return html;
}

function handleCopy(id) {
  const block = document.getElementById(id);
  if (!block) return;
  copyText(block.dataset.code);
  showCheckIcon(block);
  showToast('Copied to clipboard');
}

function handlePydroidCopy(id) {
  const block = document.getElementById(id);
  if (!block) return;
  const code = block.dataset.code;
  const indented = code.split('\n').join('\n        ').replace("assets/imgs/profile.png", "https://i.pravatar.cc/300").replace("assets/imgs/photo.png", "https://i.pravatar.cc/300");
  const globalsSet = [...new Set(code.match(/global\s+[a-zA-Z0-9_, ]+/g) || [])];
  const globalDeclarations = globalsSet.length > 0 ? globalsSet.join('\n        ') + '\n        ' : '';
  const pydroidTemplate = `from kivy.app import App
from kivy.uix.button import Button

class MainApp(App):
    def build(self):
        return Button(text="Run Code", on_press=self.run_code,size_hint=[None,None],size=[200,100],pos_hint={"center_y":.5,"center_x":.5})


    def run_code(self, *args):
        ${globalDeclarations}${indented}

if __name__ == '__main__':
    MainApp().run()`;
  copyText(pydroidTemplate);
  showCheckIcon(block);
  showToast('Copied for Pydroid 3');
}

function showCheckIcon(block) {
  const btn = block.querySelector('.copy-buttons button');
  if (!btn) return;
  const copyIc = btn.querySelector('.copy-icon');
  const checkIc = btn.querySelector('.check-icon');
  if (copyIc) copyIc.classList.add('display-none');
  if (checkIc) checkIc.classList.remove('display-none');
  setTimeout(() => {
    if (copyIc) copyIc.classList.remove('display-none');
    if (checkIc) checkIc.classList.add('display-none');
  }, 1500);
}

// --- Sidebar ---
function initSidebar() {
  const sidebar = document.getElementById('site-overview');
  if (!sidebar) return;

  // Toggle dropdowns
  sidebar.querySelectorAll('.dropdown .header button').forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.closest('.dropdown').querySelector('.content');
      const isOpen = content.style.height !== '0px' && content.style.height !== '';
      if (isOpen) {
        content.style.height = '0px';
        btn.innerHTML = chevronDownSvg;
      } else {
        content.style.height = 'auto';
        btn.innerHTML = chevronUpSvg;
      }
    });
  });

  // Auto-open dropdown containing current hash
  const hash = window.location.hash;
  if (hash) {
    sidebar.querySelectorAll('.dropdown .content a').forEach(a => {
      if (a.getAttribute('href') && a.getAttribute('href').includes(hash)) {
        const content = a.closest('.content');
        const btn = a.closest('.dropdown').querySelector('.header button');
        if (content) content.style.height = 'auto';
        if (btn) btn.innerHTML = chevronUpSvg;
      }
    });
  }
}

// --- Scroll Spy ---
function initScrollSpy() {
  const mainContent = document.querySelector('main.flex.fd-column');
  if (!mainContent) return;
  const sections = mainContent.querySelectorAll('[id]');
  if (!sections.length) return;

  const visibleSections = new Map();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = '#' + entry.target.id;
      if (entry.target.id === 'site-overview') return;
      if (entry.isIntersecting) visibleSections.set(id, entry.intersectionRatio);
      else visibleSections.delete(id);
    });
    if (visibleSections.size > 0) {
      const mostVisible = Array.from(visibleSections.entries()).sort((a, b) => b[1] - a[1])[0][0];
      window.history.replaceState(null, '', mostVisible);
      // Update active sidebar link
      document.querySelectorAll('#site-overview a').forEach(a => {
        const href = a.getAttribute('href');
        a.classList.toggle('active', href && href.endsWith(mostVisible));
      });
    }
  }, { threshold: [0, 0.1, 0.25, 0.5], rootMargin: '-20px 0px -20px 0px' });

  sections.forEach(s => { if (s.id !== 'site-overview') observer.observe(s); });
}

// --- Scroll to Hash ---
function scrollToHash() {
  const hash = window.location.hash;
  if (hash) {
    const el = document.querySelector(hash);
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  }
}

// --- Footer Date ---
function loadFooterDate() {
  fetch('/last-updated.txt').then(r => r.text()).then(text => {
    const el = document.getElementById('footer-date');
    if (el) el.textContent = text;
  }).catch(() => {});
}

// --- Header Page Title ---
function initPageTitle() {
  const path = window.location.pathname.split('/').pop().replace('.html', '').replace(/-/g, ' ');
  const title = path.charAt(0).toUpperCase() + path.slice(1);
  const titles = {
    'index': '',
    'getting started': '',
    'components': ' - Explore the various components.',
    'advanced methods': '',
    'reference': '',
    'help': '',
    'versions': ''
  };
  const el = document.querySelector('.page-title');
  if (el) el.textContent = title + (titles[path] || '');
}

// --- Sidebar Toggle ---
function toggleSidebar() {
  const sidebar = document.getElementById('site-overview');
  if (!sidebar) return;
  const isOpen = sidebar.style.width !== '0px' && sidebar.style.width !== '';
  if (isOpen) {
    sidebar.dataset.prevWidth = sidebar.getBoundingClientRect().width || 320;
    sidebar.style.width = '0';
    sidebar.style.minWidth = '0';
  } else {
    const w = sidebar.dataset.prevWidth || 320;
    sidebar.style.width = w + 'px';
    sidebar.style.minWidth = w + 'px';
  }
}

// --- SVG Icons ---
const chevronDownSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
const chevronUpSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>';

// --- Initialize ---
document.addEventListener('DOMContentLoaded', () => {
  initPageTitle();
  initSidebar();
  initScrollSpy();
  scrollToHash();
  loadFooterDate();
  document.querySelectorAll('.version-no').forEach(el => el.textContent = 'v' + getCurrentVersion());
  // Re-highlight all code blocks
  if (typeof Prism !== 'undefined') Prism.highlightAll();
});
