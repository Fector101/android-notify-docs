// Build script: generates static HTML pages
const fs = require('fs');
const path = require('path');

const SITE_DIR = __dirname;

// --- Shared head/SEO per page ---
const META = {
  'index': {
    title: 'Android Notify — Python Notification Library for Android',
    description: 'Create rich Android notifications with Python. Simple API for progress bars, buttons, images, channels, and more in your Kivy and Flet apps.',
    keywords: 'android, notifications, python, kivy, flet, mobile development'
  },
  'getting-started': {
    title: 'Getting Started - Android Notify Docs',
    description: 'Learn how to install and use Android Notify to create rich notifications in your Kivy and Flet Python apps.',
    keywords: 'android notify, install, getting started, python, kivy, flet'
  },
  'components': {
    title: 'Components - Android Notify Docs',
    description: 'Explore notification components: images, buttons, progress bars, and text styles for Android notifications.',
    keywords: 'android notify, images, buttons, progress bars, text styles, components'
  },
  'advanced-methods': {
    title: 'Advanced Methods - Android Notify Docs',
    description: 'Channel management, custom sound, vibration, and notification identifiers for Android Notify.',
    keywords: 'android notify, channels, custom sound, vibration, identifier'
  },
  'reference': {
    title: 'API Reference - Android Notify Docs',
    description: 'Full API reference for Android Notify: Notification class, NotificationHandler, and NotificationStyles.',
    keywords: 'android notify, API, reference, documentation, methods'
  },
  'help': {
    title: 'Help - Android Notify Docs',
    description: 'How to update, debugging tips, contributing, and support for Android Notify.',
    keywords: 'android notify, help, debugging, update, contributing'
  },
  'versions': {
    title: 'Changelog - Android Notify Docs',
    description: 'Release notes and changelog for all versions of Android Notify.',
    keywords: 'android notify, changelog, releases, versions'
  }
};

function head(page) {
  const m = META[page];
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <link rel="icon" type="image/svg+xml" href="/img.svg"/>
  <title>${m.title}</title>
  <meta name="description" content="${m.description}"/>
  <meta name="keywords" content="${m.keywords}"/>
  <meta name="author" content="Fector101"/>
  <meta name="robots" content="index, follow"/>
  <meta name="application-name" content="Android Notify"/>
  <meta name="theme-color" content="#3F51B5"/>
  <meta property="og:type" content="website"/>
  <meta property="og:title" content="${m.title}"/>
  <meta property="og:description" content="${m.description}"/>
  <meta property="og:image" content="https://android-notify.vercel.app/meta.jpg"/>
  <meta property="og:url" content="https://android-notify.vercel.app/"/>
  <meta property="twitter:card" content="summary_large_image"/>
  <meta property="twitter:title" content="${m.title}"/>
  <meta property="twitter:description" content="${m.description}"/>
  <meta property="twitter:image" content="https://android-notify.vercel.app/meta.jpg"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:ital,wght@0,400;0,500;0,600;1,400&family=Fira+Code:wght@400;500;600&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-dracula.min.css"/>
  <link rel="stylesheet" href="/css/styles.css"/>
</head>
<body>`;
}

function header(currentPage) {
  return `<header>
  <a href="/"><svg class="brand" viewBox="0 0 24 24" fill="none" stroke="rgb(207,207,249)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg></a>
  <div class="css-dropdown">
    <span class="active">
      <span class="version-no">v1.60</span>
      <svg class="down-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
      <svg class="up-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>
    </span>
    <div class="opts">
      <button onclick="setCurrentVersion('1.58');showToast('Switched docs to v1.58');window.location.reload()">1.58</button>
      <button onclick="setCurrentVersion('1.59');showToast('Switched docs to v1.59');window.location.reload()">1.59</button>
      <button onclick="setCurrentVersion('1.60');showToast('Switched docs to v1.60');window.location.reload()">1.60</button>
      <a href="/versions.html" class="release-link">View all release notes</a>
    </div>
  </div>
  <p class="page-title"></p>
  <nav class="icon-nav">
    <a href="https://github.com/Fector101/android_notify" target="_blank" rel="noopener noreferrer" class="btn-link"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg></a>
    <button onclick="toggleSidebar()" class="btn-link menu-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button>
  </nav>
</header>`;
}

function sidebar(currentPage) {
  const sectionData = [
    { title: 'Getting Started', file: 'getting-started', sections: ['Introduction', 'Features', 'Installation', 'Basic Usage'] },
    { title: 'Components', file: 'components', sections: ['Images', 'Buttons', 'Progress Bars', 'Texts'] },
    { title: 'Advanced Methods', file: 'advanced-methods', sections: ['Channel Management', 'Custom Sound', 'Vibration', 'Getting Identifer'] },
    { title: 'Reference', file: 'reference', sections: ['Notification Class', 'NotificationHandler Class', 'NotificationStyles Class'] },
    { title: 'Help', file: 'help', sections: ['How to update', 'Debugging Tips', 'Contributing-Issues', 'Support Project', 'Credits'] }
  ];

  let html = '<div id="site-overview">';
  for (const group of sectionData) {
    const isActive = currentPage === group.file;
    html += `<div class="dropdown"><div class="header"><p>${group.title}</p>`;
    html += `<button><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></button>`;
    html += `</div><ol class="content" style="height:${isActive ? 'auto' : '0px'}">`;
    for (const s of group.sections) {
      const hash = '#' + s.trim().toLowerCase().replace(/ /g, '-');
      html += `<li><a href="/${group.file}.html${hash}">${s}</a></li>`;
    }
    html += '</ol></div>';
  }
  html += '</div>';
  return html;
}

const FOOTER = `<footer>
  <div style="display:flex;flex-direction:column;gap:10px;">
    <p>Thoroughly Tested and supported by <br/><a href="https://github.com/Fector101/laner">Laner</a> &amp; <a href="https://github.com/Fector101/wallpaper-carousel">The Carousel</a></p>
    <p>Last Updated: <span id="footer-date">...</span>, &copy; Fabian</p>
  </div>
  <div class="support-links-box" style="display:flex;flex-direction:column;justify-content:center;text-align:center;">
    <p>Find this project helpful?</p>
    <p>consider buying me a <a href="https://www.buymeacoffee.com/fector101">Coffee</a></p>
    <p>Or a star on <a href="https://github.com/Fector101/android_notify">GitHub.</a></p>
    <p>Your support helps maintain and improve the project.</p>
  </div>
</footer>`;

const NAV_SCRIPTS = `
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-python.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-bash.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-ini.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-toml.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-powershell.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-markup.min.js"></script>
<script src="/js/version-data.js"></script>
<script src="/js/app.js"></script>
`;

function pageWrap(page, content) {
  return `${head(page)}
${header(page)}
<main class="flex">
${sidebar(page)}
<main class="flex fd-column overflow-hidden m-auto" style="flex:1;min-height:calc(100vh - var(--header-height));">
<div class="page main-page">${content}</div>
${FOOTER}
</main>
</main>
${NAV_SCRIPTS}
</body>
</html>`;
}

function prevNext(prev, prevLabel, next, nextLabel) {
  return `<span class="flex next-page-btns-box space-between">
  <a class="next-page-btn" href="${prev}">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
    <span><p class="next-txt">Previous</p><p class="page-name">${prevLabel}</p></span>
  </a>
  <a class="next-page-btn" href="${next}">
    <span><p class="next-txt">Next</p><p class="page-name">${nextLabel}</p></span>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
  </a>
</span>`;
}

// === PAGE CONTENT ===

const PAGES = {};

PAGES['index'] = `<section class="home-hero">
  <h1>Android Notify</h1>
  <p class="tagline">A simple way to create and customize Android notifications in Kivy and Flet apps.</p>
  <a href="/versions.html#v1_60" class="version-badge">v1.60.10</a>
</section>
<section class="home-section">
  <h2>Quick Start</h2>
  ${renderInlineCodeBlock('from android_notify import Notification\n\nNotification(\n    title="Hello!",\n    message="Welcome to Android Notify"\n).send()', 'python')}
</section>
<section class="home-section">
  <h2>Documentation</h2>
  <div class="cards-grid">
    <a href="/getting-started.html" class="home-card"><svg class="card-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg><p class="card-title">Getting Started</p><p class="card-desc">Installation, basic usage, and first notification</p></a>
    <a href="/components.html" class="home-card"><svg class="card-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg><p class="card-title">Components</p><p class="card-desc">Images, buttons, progress bars, text styles</p></a>
    <a href="/advanced-methods.html" class="home-card"><svg class="card-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg><p class="card-title">Advanced Methods</p><p class="card-desc">Channels, custom sound, vibration, identifiers</p></a>
    <a href="/reference.html" class="home-card"><svg class="card-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg><p class="card-title">Reference</p><p class="card-desc">Full API reference by version</p></a>
    <a href="/help.html" class="home-card"><svg class="card-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg><p class="card-title">Help</p><p class="card-desc">Debugging, contributing, support</p></a>
  </div>
</section>
${prevNext('/help.html', 'Help', '/getting-started.html', 'Getting Started')}`;

function renderInlineCodeBlock(code, lang) {
  const escaped = code.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  return `<div class="code-block" data-code="${escaped.replace(/"/g,'&quot;')}" data-lang="${lang || 'python'}"><div class="header"><span class="title">${lang || 'python'}</span><div class="copy-buttons"><button onclick="handleCopy(this.closest('.code-block').id)" title="Copy Code" class="regular-copy-btn"><svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg><svg class="check-icon display-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><span class="btn-text">Copy</span></button></div></div><div class="content"><pre><code class="language-${lang||'python'}">${escaped}</code></pre></div></div>`;
}

PAGES['getting-started'] = `
<section class="page-section" id="introduction">
  <h2>Introduction</h2><hr/>
  <p class="reader">Android-Notify makes creating and managing Android notifications easy with <span class="code green">Python</span>.</p>
  <p class="paragraph reader">Built with Pyjnius, it interacts directly with Android's Java APIs.</p>
  <p class="paragraph">It handles all Java details so you can focus on notification content in Python, No extra APIs or services needed.</p>
  <p class="paragraph">Dependency: Pyjnius</p>
</section>
<section class="page-section" id="features">
  <h2>Features</h2><hr/>
  <ul class="inner-section-1" style="list-style:disc;">
    <details><summary><strong>Notification Components&amp;Design:</strong></summary>
      <ul style="list-style:disc;" class="inner-section-2">
        <li>Texts (<a href="/components.html#texts">texts section</a>)<ul style="list-style:disc;"><li>Simple text</li><li>Big text</li><li>Inbox-style</li><li>Sub Texts</li><li>and Colored texts.</li></ul></li>
        <li>Images (<a href="/components.html#images">images section</a>)<ul style="list-style:disc;"><li>Large icon</li><li>Big picture</li><li>Custom app icons</li><li>Colored app icons</li></ul></li>
        <li>Progress bar (<a href="/components.html#progress-bars">progress bars section</a>)<ul style="list-style:disc;"><li>Determinate</li><li>Indeterminate</li></ul></li>
        <li>Buttons (<a href="/components.html#buttons">buttons section</a>)<ul style="list-style:disc;"><li>Runtime Functions</li><li>Broadcast Actions</li></ul></li>
      </ul>
    </details>
    <details><summary><strong>Behaviours/ Runtime Functions:</strong></summary>
      <ul style="list-style:disc;" class="inner-section-2"><li>Send: normal/silent/persistent/vibrate</li><li>Update: title, message, images, progress bar</li><li>Add or Remove Buttons</li><li>Click handlers and opening app on notification click</li><li>Custom sound per and vibrate notification</li><li>Set timestamps</li><li>Clear single or all notifications</li></ul>
    </details>
    <details><summary><strong>Channels for</strong> (<a href="advanced-methods.html#channel-management">Android 8.0+</a>):</summary>
      <ul style="list-style:disc;" class="inner-section-2"><li>Create, delete, delete all</li><li>Set importance, vibration, and sound</li></ul>
    </details>
    <details><summary><strong>Permissions:</strong></summary>
      <ul style="list-style:disc;" class="inner-section-2"><li>Ask / check notification permission with callback</li></ul>
    </details>
  </ul>
</section>
<section class="page-section" id="installation">
  <h2>Installation</h2><hr/>
  <div class="inner-section-1">
    <h3 class="sub-header text-marker system">Kivy Apps</h3>
    <p>In your <span class="code">buildozer.spec</span> file include the following:</p>
    <div class="code-block" data-lang="ini"><div class="header"><span class="title">ini</span><div class="copy-buttons"><button onclick="handleCopy(this.closest('.code-block').id)" title="Copy Code" class="regular-copy-btn"><svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg><svg class="check-icon display-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><span class="btn-text">Copy</span></button></div></div><div class="content"><pre><code class="language-ini"># Ensure pyjnius is included in the build
requirements = python3, kivy, pyjnius, android-notify

# Notification Permission
android.permissions = POST_NOTIFICATIONS

# AndroidX dependency
android.gradle_dependencies = androidx.core:core:1.12.0
android.enable_androidx = True</code></pre></div></div>
    <h4 style="margin-left:5px;margin:20px 5px;">Usage without additional Gradle dependency.</h4>
    <h3 class="sub-header text-marker system">Flet Apps</h3>
    <p>Add the following to your <span class="code">pyproject.toml:</span></p>
    <div class="code-block" data-lang="toml"><div class="header"><span class="title">toml</span><div class="copy-buttons"><button onclick="handleCopy(this.closest('.code-block').id)" title="Copy Code" class="regular-copy-btn"><svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg><svg class="check-icon display-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><span class="btn-text">Copy</span></button></div></div><div class="content"><pre><code class="language-toml">[tool.flet.android]
dependencies = [
  "pyjnius","android-notify==1.60.10.dev0"
]

[tool.flet.android.permission]
"android.permission.POST_NOTIFICATIONS" = true</code></pre></div></div>
    <h3 class="sub-header text-marker system">Kivy Apps</h3>
    <p class="paragraph">Add the following to your <span class="code">buildozer.spec:</span></p>
    <div class="code-block" data-lang="ini"><div class="header"><span class="title">ini</span><div class="copy-buttons"><button onclick="handleCopy(this.closest('.code-block').id)" title="Copy Code" class="regular-copy-btn"><svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg><svg class="check-icon display-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><span class="btn-text">Copy</span></button></div></div><div class="content"><pre><code class="language-ini">requirements = python3, kivy, pyjnius, android-notify==1.60.10.dev0
android.permissions = POST_NOTIFICATIONS</code></pre></div></div>
    <h3 class="sub-header text-marker system">Pydroid 3 App</h3>
    <p class="paragraph">In pip section where you're asked to insert library name paste <span class="code">android-notify==1.60.10.dev0</span></p>
    <h3 class="sub-header text-marker system">PIP</h3>
    <p class="paragraph">You can also install the package with pip for development, testing, or IDE IntelliSense.</p>
    <div class="code-block" data-lang="bash"><div class="header"><span class="title">bash</span><div class="copy-buttons"><button onclick="handleCopy(this.closest('.code-block').id)" title="Copy Code" class="regular-copy-btn"><svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg><svg class="check-icon display-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><span class="btn-text">Copy</span></button></div></div><div class="content"><pre><code class="language-bash">pip install android-notify</code></pre></div></div>
  </div>
</section>
<section class="page-section" id="basic-usage">
  <h2>Basic Usage</h2><hr/>
  <div class="inner-section-1">
    <p>You can easily create and send notifications with just a few lines of code.</p>
    <p>Below is a simple example of how to create a basic notification:</p>
    <div class="code-block" data-lang="python"><div class="header"><span class="title">python</span><div class="copy-buttons"><button onclick="handleCopy(this.closest('.code-block').id)" title="Copy Code" class="regular-copy-btn"><svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg><svg class="check-icon display-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><span class="btn-text">Copy</span></button><button onclick="handlePydroidCopy(this.closest('.code-block').id)" title="Copy for Pydroid 3" class="pydroid-copy-btn"><svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg><svg class="check-icon display-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><span class="btn-text">Pydroid</span></button></div></div><div class="content"><pre><code class="language-python">from android_notify import Notification, NotificationHandler

# Create a simple notification
def send_notification(ans):
    Notification(
        title="Hello From Python",
        message="This is a basic notification."
    ).send()

NotificationHandler.asks_permission(send_notification)</code></pre></div></div>
  </div>
</section>
${prevNext('/index.html', 'Home', '/components.html', 'Components')}`;

// For components, advanced-methods, and reference pages, we generate version-dependent content via JS
PAGES['components'] = `<div id="page-content"></div>
<script>
(function(){
  const v = getCurrentVersion();
  const d = getMergedVersionData(v);
  const cp = d.component_page;
  const isLegacy = isLegacyVersion(v);

  let html = '<section class="page-section" id="images"><h2>Images</h2><hr/><div class="inner-section-1">';
  html += '<p>You can enhance your notifications by adding images, Images can be local or online</p>';
  html += '<p class="paragraph">For Local Images:</p><ul><li>Image path should be in relative to your <span class="code">main.py</span></li></ul>';
  html += '<p class="paragraph">For Online Images:</p><ul><li>you\'ll have to specify this requirement in your <span class="code">buildozer.spec</span> file:<br/><span class="code">android.permissions = INTERNET</span></li><li>Paths should start with <span class="code">http://</span> or <span class="code">https://</span></li></ul><br/>';
  html += '<p>You can display:</p><ul><li>A large image (Big Picture Style)</li><li>A small image (Large Icon Style)</li><li>Both large and small images together</li><li>Also custom app icons and custom colors</li></ul>';
  html += renderInlineCodeBlock(cp.big_picture_code, 'python').replace('<div class="code-block"','<div class="code-block" id="cb-bp"');
  html += renderInlineCodeBlock(cp.large_icon_code, 'python').replace('<div class="code-block"','<div class="code-block" id="cb-li"');
  html += cp.how_to_add_both_imgs;
  html += '<h3 class="app-icon-h3 sub-header">Changing Default Notification Icon [Android 8+]</h3>';
  html += isLegacy ? '<p class="paragraph">When you initialize Notification instance you can pass in file path to <span class="code">app_icon</span></p>' : '<p class="paragraph">Use <span class="code">.setSmallIcon(path)</span> to set custom notification icon</p>';
  html += '<p class="paragraph">Must use <span class="code yellow"> PNG format</span> Or Image Will display as a Black Box.</p>';
  html += renderInlineCodeBlock(cp.small_icon_code, 'python').replace('<div class="code-block"','<div class="code-block" id="cb-si"');
  html += '<p class="paragraph">You can also set custom color for the icon to match your app theme:</p>';
  html += '<p class="paragraph">Use <span class="code">.setColor(color)</span> method to set a custom color</p>';
  html += '<p class="paragraph">You can specify the color using a hex code (e.g., "#FF0000" for red).</p>';
  html += '<p>Strings <span class="code yellow">(red, green, blue)</span> work without hex code.</p>';
  const colorCode = 'from android_notify import Notification\\nnotification = Notification(\\n    title="Emergency",\\n    message="Check out now!"\\n)\\nnotification.setColor("red") # or "#FF0000"\\nnotification.send()';
  html += renderInlineCodeBlock(colorCode, 'python').replace('<div class="code-block"','<div class="code-block" id="cb-color"');
  const onlineCode = isLegacy
    ? 'from android_notify import Notification, NotificationStyles\\n\\nNotification(\\n    title="Using Online Image",\\n    message="Pass image URL as path to setBigImage",\\n    style=NotificationStyles.BIG_PICTURE,\\n    big_picture_path="https://www.python.org/static/img/python-logo.png").send()'
    : 'from android_notify import Notification\\nnotification = Notification(\\n    title="Using Online Image",\\n    message="Pass image URL as path to setBigImage"\\n)\\nnotification.setBigPicture("https://www.python.org/static/img/python-logo.png")\\nnotification.send()';
  html += renderInlineCodeBlock(onlineCode, 'python').replace('<div class="code-block"','<div class="code-block" id="cb-online"');
  html += '<p class="paragraph inner-section-1">For about Images see <a href="/advanced-methods.html">advanced methods</a> section</p>';
  html += '</div></section>';

  // Buttons
  html += '<section class="page-section" id="buttons"><h2>Buttons</h2><hr/>';
  html += '<div class="inner-section-1"><p>Allowing users to trigger specific Functions.</p>';
  html += '<ul class="paragraph inner-section-2"><li>Handle user clicks with the provided callback function</li>';
  html += '<li>Add one or more buttons using <span class="code">addButton(text, callback)</span></li>';
  html += '<li>Easily remove buttons with <span class="code">removeButtons()</span></li></ul>';
  html += '<p class="paragraph">This makes your notifications more dynamic and interactive.</p></div>';
  html += renderInlineCodeBlock(cp.buttons_code, 'python').replace('<div class="code-block"','<div class="code-block" id="cb-btns"');
  html += '<p class="paragraph inner-section-1">For Steps to Create BroadCast Buttons Visit: <a href="https://github.com/Fector101/android_notify/wiki/How-to-Use-with-Broadcast-Listener" target="_blank" rel="noopener noreferrer">android-notify-wiki</a> - make things happen without opening app.</p>';
  html += '</section>';

  // Progress Bars
  html += '<section class="page-section" id="progress-bars"><h2>Progress Bars</h2><hr/>';
  html += '<div class="inner-section-1"><p>Notifications with progress indicators are useful for showing download status, pending actions, task completion.</p>';
  html += '<ul><li>Update progress in real-time with <span class="code">updateProgressBar()</span></li>';
  html += '<li>Show an infinite progress animation with <span class="code">showInfiniteProgressBar()</span></li>';
  html += '<li>Cleanly remove the progress bar with <span class="code">removeProgressBar()</span></li></ul>';
  html += '<p>You can customize the displayed message and title while the progress bar updates.</p></div>';
  html += renderInlineCodeBlock(cp.progressbar_code, 'python').replace('<div class="code-block"','<div class="code-block" id="cb-prog"');
  html += '<div class="progress-warning-box"><h4>Update Frequency</h4><p>Android ignores updates faster than <strong>0.5 seconds</strong>. android-notify automatically handles rapid updates by cancelling old ones if a new update arrives within 1 second.</p></div>';
  html += '</section>';

  // Texts
  html += '<section class="page-section" id="texts"><h2>Texts</h2><hr/>';
  html += '<h3>Multi-Line Text</h3><div class="paragraph inner-section-2">';
  if (isLegacy) {
    html += '<p>This feature doesn\'t work properly for v1.58, No way to set message and lines together.</p><p class="paragraph">Use <span class="link-design" onclick="setCurrentVersion(\'1.59\');window.location.reload()">v1.59.3</span> for proper implementation</p>';
  } else {
    html += '<p>You can use <span class="code">addLine</span> and pass in each line, Lines will show when users click the drop down button</p>';
  }
  html += '</div>';
  html += renderInlineCodeBlock(cp.inbox_style_code, 'python').replace('<div class="code-block"','<div class="code-block" id="cb-inbox"');
  html += '<h3 class="paragraph">Big Text Style</h3>';
  html += '<p class="paragraph">When using big_text style <span class="code">message</span> acts as sub-title, Then when notification drop down button is pressed <span class="code">body</span> is revealed</p>';
  if (v !== "1.58") html += '<p class="paragraph">Use <span class="code">setBigText</span> to display string</p>';
  html += renderInlineCodeBlock(cp.big_text_style_code, 'python').replace('<div class="code-block"','<div class="code-block" id="cb-bigtext"');
  html += '<h3 class="paragraph">Sub Text</h3>';
  html += '<p class="paragraph">Sub Text is a smaller text that appears side of app name, often used to provide additional context or information, Like download seconds remaining.</p>';
  html += '<p class="paragraph">Use <span class="code">setSubText</span> to display string</p>';
  html += renderInlineCodeBlock(cp.sub_text_code || '# Not available in version: ' + v, 'python').replace('<div class="code-block"','<div class="code-block" id="cb-subtext"');
  html += '<h3 class="paragraph">Updating Title and Message</h3>';
  html += '<p class="paragraph">After sending a notification, you can update its title and message using <span class="code">updateTitle()</span> and <span class="code">updateMessage()</span> methods.</p>';
  const updateCode = 'from android_notify import Notification\\n\\nnotification = Notification(\\n    title="Processing...",\\n    message="Starting task"\\n)\\nnotification.send()\\n\\n# Update the notification after sending\\nnotification.updateTitle("Processing Complete!")\\nnotification.updateMessage("Task finished successfully")';
  html += renderInlineCodeBlock(updateCode, 'python').replace('<div class="code-block"','<div class="code-block" id="cb-update"');
  html += '<h3 class="paragraph">Colored Texts [dev]</h3>';
  html += '<ol><li class="paragraph">Create a path named <span>res/layout</span></li>';
  html += '<li class="paragraph">Copy these files using exact names';
  html += '<details><summary><span class="code">an_colored_basic_small.xml</span></summary>' + renderInlineCodeBlock(cp.an_colored_basic_small || '# Not available in version: ' + v, 'markup').replace('<div class="code-block"','<div class="code-block" id="cb-xml1"') + '</details>';
  html += '<details><summary><span class="code">an_colored_basic_large.xml</span></summary>' + renderInlineCodeBlock(cp.an_colored_basic_large || '# Not available in version: ' + v, 'markup').replace('<div class="code-block"','<div class="code-block" id="cb-xml2"') + '</details>';
  html += '</li><li class="paragraph">In your buildozer.spec file add these:<br/><p>- source.include_exts = xml and android.add_resources = res</p></li></ol>';
  html += '<p class="paragraph">Use params <span class="code">title_color</span> and/or <span class="code">message_color</span> with hex color codes to control colors.</p>';
  html += renderInlineCodeBlock(cp.colored_text_code || '# Not available in version: ' + v, 'python').replace('<div class="code-block"','<div class="code-block" id="cb-colors"');
  html += '</section>';
  html += '__PREV_NEXT__';
  document.getElementById('page-content').outerHTML = html;
})();
</script>`.replace('__PREV_NEXT__', prevNext('/getting-started.html', 'Getting Started', '/advanced-methods.html', 'Advanced Methods'));

PAGES['advanced-methods'] = `<div id="page-content"></div>
<script>
(function(){
  const v = getCurrentVersion();
  const d = getMergedVersionData(v);
  const ap = d.advanced_methods_page;
  const isLegacy = isLegacyVersion(v);
  const vibratePermissionCode = '# buildozer.spec\\nandroid.permissions = VIBRATE';
  const soundBuildozerCode = '# buildozer.spec\\nandroid.add_resources = res\\nsource.include_exts = wav';

  let html = '<section id="channel-management" class="page-section">';
  html += '<h2 class="long-title">Channel Management</h2><hr/>';
  html += '<p class="paragraph">From Android 8.0 above channels are required, android-notify use <span class="code">Default Channel</span> if no channel specified.</p>';
  html += '<p class="paragraph">You can customize the channel name and ID:</p>';
  html += '<ul class="inner-section-2 paragraph"><li>If not specified <span class="code">channel_id</span> will be auto generated from <span class="code">channel_name</span></li>';
  html += '<li>Using this format <span class="code">.lower().replace(\' \', \'_\')</span></li>';
  html += '<li>Custom Channel Name\'s Gives User ability to turn on/off specific notifications</li></ul>';
  html += renderInlineCodeBlock(ap.channel_management_code, 'python').replace('<div class="code-block"','<div class="code-block" id="cb-chan"');
  html += '<h3 id="custom-sound" style="text-decoration:underline;font-size:1.25rem;margin-top:10px;margin-bottom:0;">Custom Sound:</h3>';
  html += '<p class="paragraph">You can assign a custom sound from your app\'s <span class="code">res/raw</span> folder to a notification channel for Android 8+:</p>';
  html += '<p class="paragraph">Put your audio files (e.g. <span class="code">sneeze.wav</span>) in <span class="code">res/raw</span>, then configure <span class="code">buildozer.spec</span>:</p>';
  html += renderInlineCodeBlock(soundBuildozerCode, 'ini').replace('<div class="code-block"','<div class="code-block" id="cb-soundcfg"');
  html += renderInlineCodeBlock(ap.custom_sound_code || '# Not available in version: ' + v, 'python').replace('<div class="code-block"','<div class="code-block" id="cb-sound"');
  html += '<p class="paragraph">For devices below Android 8, use <span class="code">setSound</span> on the notification object.</p>';
  html += '<h3 id="vibration" style="text-decoration:underline;font-size:1.25rem;margin-top:10px;margin-bottom:0;">Vibration:</h3>';
  html += '<p class="paragraph">For the vibrate feature to work correctly, make sure to use version <span class="code">1.61.0</span> or later.</p>';
  html += '<p class="paragraph">You can make the phone vibrate when a notification arrives. For Android 8+, enable vibration on the channel.</p>';
  html += '<p class="paragraph">You also need to add the <span class="code">VIBRATE</span> permission in your <span class="code">buildozer.spec</span>:</p>';
  html += renderInlineCodeBlock(vibratePermissionCode, 'ini').replace('<div class="code-block"','<div class="code-block" id="cb-vibperm"');
  html += renderInlineCodeBlock(ap.vibrate_code || '# Not available in version: ' + v, 'python').replace('<div class="code-block"','<div class="code-block" id="cb-vib"');
  html += '<p class="paragraph">For the vibrate feature to work correctly, make sure to use version <span class="code">1.61.0</span> or later.</p>';
  html += '</section>';
  html += '<section id="getting-identifer" class="page-section">';
  html += '<h2 class="long-title">Getting Identifer</h2><hr/>';
  html += '<p>If you want to get the Exact Notification Clicked to Open App, you can use NotificationHandler to get unique identifier (str) <span class="code">NotificationHandler' + (isLegacy ? '.getIdentifer' : '.get_name') + '</span></p>';
  if (isLegacy) html += '<p><span class="code yellow paragraph block width-max-con" style="margin-top:15px;">In next version identifier will be changed to \'name\' and NotificationHandler.getIdentifer to NotificationHandler.get_name</span></p>';
  html += renderInlineCodeBlock(ap.getting_identifier_code, 'python').replace('<div class="code-block"','<div class="code-block" id="cb-id"');
  html += '</section>';
  html += '__PREV_NEXT__';
  document.getElementById('page-content').outerHTML = html;
})();
</script>`.replace('__PREV_NEXT__', prevNext('/components.html', 'Components', '/reference.html', 'Reference'));

PAGES['reference'] = `<div id="page-content"></div>
<script>
(function(){
  const v = getCurrentVersion();
  const d = getMergedVersionData(v);
  const NOTIFICATION_METHODS = d.reference_page.NOTIFICATION_METHODS;
  const HANDLER_METHODS = d.reference_page.HANDLER_METHODS;
  const STYLE_ATTRIBUTES = d.reference_page.STYLE_ATTRIBUTES;

  function matchesSearch(query, ...fields) {
    if (!query) return true;
    const q = query.toLowerCase();
    return fields.some(f => typeof f === 'string' && f.toLowerCase().includes(q));
  }
  function itemMatchesSearch(query, item, key) {
    if (!query) return true;
    const desc = typeof item.description === 'string' ? item.description : '';
    if (matchesSearch(query, key, item.signature, desc)) return true;
    if (item.args && item.args.length) return item.args.some(a => matchesSearch(query, a.name, a.desc));
    return false;
  }
  function renderMethodCard(method, fallback) {
    const cls = fallback ? fallback + ' ref-code' : 'ref-code';
    let html = '<div style="background-color:#232323;padding:1rem;border-radius:0.5rem;box-shadow:0 1px 2px rgba(0,0,0,0.05);transition:box-shadow 0.2s ease,transform 0.2s ease;">';
    html += '<p class="' + cls + '">' + (method.signature || fallback) + '</p>';
    html += '<p class="paragraph" style="margin-bottom:0.5rem;color:#9ca3af;">' + (method.description || '') + '</p>';
    if (method.args && method.args.length > 0) {
      html += '<dl style="padding-left:1rem;">';
      method.args.forEach(a => {
        html += '<div><dt>' + a.name + '</dt><dd>' + a.desc + '</dd></div>';
      });
      html += '</dl>';
    }
    html += '</div>';
    return html;
  }

  let html = '<h2>Reference</h2><hr/>';
  html += '<div class="ref-search-wrapper"><svg class="ref-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
  html += '<input type="search" class="ref-search-input" placeholder="Search methods, signatures, descriptions..." id="ref-search"/>';
  html += '<button class="ref-search-clear" id="ref-clear" style="display:none;">&times;</button></div>';
  html += '<p class="ref-search-count" id="ref-count" style="display:none;"></p>';
  html += '<div class="ref-no-results" id="ref-no-results" style="display:none;"><p>Try a different search term</p></div>';

  html += '<div id="ref-toc"><nav style="border-left:4px solid #2563EB;padding-left:1rem;"><h2 style="font-weight:600;margin-bottom:0.5rem;">Contents</h2>';
  html += '<ul class="inner-section-2" style="list-style:none;"><li><a href="#notification-class" style="color:#2563EB;">Notification Attributes and Methods</a></li>';
  html += '<li><a href="#notificationhandler-class" style="color:#2563EB;">NotificationHandler Methods</a></li>';
  if (STYLE_ATTRIBUTES) html += '<li><a href="#notificationstyles-class" style="color:#2563EB;">NotificationStyles</a></li>';
  html += '</ul></nav></div>';

  if (v === '1.59') {
    html += '<div class="side-note"><h2>For v1.59</h2><p class="paragraph">Methods were introduced to free up <span class="code">__init__</span> kwargs and replace direct style usage.</p></div>';
  }

  // Notification Methods
  html += '<section id="notification-class" class="page-section" data-searchable>';
  html += '<h2 style="font-size:1.25rem;font-weight:700;">Notification Attributes and Methods</h2>';
  html += '<div class="ref-methods">';
  for (const [key, m] of Object.entries(NOTIFICATION_METHODS)) {
    html += renderMethodCard(m, key);
  }
  html += '</div></section>';

  // Handler Methods
  html += '<section id="notificationhandler-class" class="page-section" data-searchable>';
  html += '<h2 style="font-size:1.25rem;font-weight:700;">NotificationHandler Methods</h2>';
  html += '<div class="ref-handlers">';
  HANDLER_METHODS.forEach(m => { html += renderMethodCard(m); });
  html += '</div></section>';

  // Styles
  if (STYLE_ATTRIBUTES) {
    html += '<section id="notificationstyles-class" class="page-section" data-searchable>';
    if (isLegacyVersion(v)) {
      html += '<h2 style="font-size:1.25rem;font-weight:700;">NotificationStyles attributes for Safely Adding Styles</h2>';
    } else {
      html += '<h2 style="font-size:1.25rem;font-weight:700;">NotificationStyles</h2>';
      html += '<p class="paragraph">All NotificationStyles attributes are <span class="code yellow" style="color:#dfdf1a;">deprecated in v1.59.3</span> they were transformed to methods for better usability.</p>';
      html += '<p>The New Methods Are: <span class="code green" style="color:#71f171;">setSmallIcon</span>, <span class="code green" style="color:#71f171;">setLargeIcon</span>, <span class="code green" style="color:#71f171;">setBigPicture</span>, <span class="code green" style="color:#71f171;">setBigText</span> and <span class="code green" style="color:#71f171;">updateProgressBar</span></p>';
    }
    html += '<div class="flex flex-wrap align-items-cen justify-content-cen styles-container">';
    STYLE_ATTRIBUTES.forEach(m => {
      html += '<div><h3 class="style-attr"><code>' + (m.signature || m.id) + '</code></h3>';
      html += '<p style="color:#9ca3af;white-space:pre-line;">' + m.description + '</p></div>';
    });
    html += '</div></section>';
  }

  html += '__PREV_NEXT__';
  document.getElementById('page-content').outerHTML = html;

  // Search functionality
  const searchInput = document.getElementById('ref-search');
  const clearBtn = document.getElementById('ref-clear');
  const countEl = document.getElementById('ref-count');
  const noResults = document.getElementById('ref-no-results');
  const tocEl = document.getElementById('ref-toc');

  searchInput.addEventListener('input', function() {
    const q = this.value;
    clearBtn.style.display = q ? 'block' : 'none';

    const allCards = document.querySelectorAll('.ref-methods > div, .ref-handlers > div, .styles-container > div');
    let matched = 0;

    // Filter notification methods
    document.querySelectorAll('.ref-methods > div').forEach((card, i) => {
      const entries = Object.entries(NOTIFICATION_METHODS);
      if (i < entries.length) {
        const [key, m] = entries[i];
        const show = itemMatchesSearch(q, m, key);
        card.style.display = show ? '' : 'none';
        if (show) matched++;
      }
    });

    // Filter handler methods
    document.querySelectorAll('.ref-handlers > div').forEach((card, i) => {
      if (i < HANDLER_METHODS.length) {
        const m = HANDLER_METHODS[i];
        const show = itemMatchesSearch(q, m, m.id);
        card.style.display = show ? '' : 'none';
        if (show) matched++;
      }
    });

    // Filter styles
    if (STYLE_ATTRIBUTES) {
      document.querySelectorAll('.styles-container > div').forEach((card, i) => {
        if (i < STYLE_ATTRIBUTES.length) {
          const m = STYLE_ATTRIBUTES[i];
          const show = itemMatchesSearch(q, m, m.id);
          card.style.display = show ? '' : 'none';
          if (show) matched++;
        }
      });
    }

    const total = Object.keys(NOTIFICATION_METHODS).length + HANDLER_METHODS.length + (STYLE_ATTRIBUTES ? STYLE_ATTRIBUTES.length : 0);

    if (q) {
      countEl.style.display = 'block';
      countEl.innerHTML = matched > 0
        ? 'Found <strong>' + matched + '</strong> of ' + total + ' results'
        : 'No results for "<strong>' + q + '</strong>"';
      noResults.style.display = matched === 0 ? 'flex' : 'none';
      tocEl.style.display = matched > 0 ? '' : 'none';
    } else {
      countEl.style.display = 'none';
      noResults.style.display = 'none';
      tocEl.style.display = '';
    }
  });

  clearBtn.addEventListener('click', function() {
    searchInput.value = '';
    searchInput.dispatchEvent(new Event('input'));
  });
})();
</script>`.replace('__PREV_NEXT__', prevNext('/advanced-methods.html', 'Advanced Methods', '/help.html', 'Help'));

PAGES['help'] = `
<section class="page-section" id="how-to-update">
  <h2>How to Update</h2><hr/>
  <p class="paragraph">When using buildozer and you want to use a new version, buildozer doesn't automatically remove old versions,</p>
  <p>You'll have to delete the old version in the .buildozer folder these are some commands to help automate the process for linux, windows and mac</p>
  <p class="paragraph">Linux</p>
  <div class="code-block" data-lang="bash"><div class="header"><span class="title">bash</span><div class="copy-buttons"><button onclick="handleCopy(this.closest('.code-block').id)" title="Copy Code" class="regular-copy-btn"><svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg><svg class="check-icon display-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><span class="btn-text">Copy</span></button></div></div><div class="content"><pre><code class="language-bash">cd .buildozer &amp;&amp; find . -type d -name "android_notify*" -print0 | xargs -0 rm -r &amp;&amp; cd ..</code></pre></div></div>
  <p class="paragraph">Windows</p>
  <div class="paragraph inner-section-2">
    <p>On PowerShell</p>
    <p class="paragraph">If command prints folder paths containing android-notify replace <span class="code">Write-Output</span> with <span class="code">Remove-Item</span></p>
    <div class="code-block" data-lang="powershell"><div class="header"><span class="title">powershell</span><div class="copy-buttons"><button onclick="handleCopy(this.closest('.code-block').id)" title="Copy Code" class="regular-copy-btn"><svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg><svg class="check-icon display-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><span class="btn-text">Copy</span></button></div></div><div class="content"><pre><code class="language-powershell">cd .buildozer
Get-ChildItem -Path . -Directory -Filter "android_notify*" | ForEach-Object { Write-Output $_.FullName }
cd ..</code></pre></div></div>
    <p class="paragraph">Git Bash (if installed)</p>
    <div class="code-block" data-lang="bash"><div class="header"><span class="title">bash</span><div class="copy-buttons"><button onclick="handleCopy(this.closest('.code-block').id)" title="Copy Code" class="regular-copy-btn"><svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg><svg class="check-icon display-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><span class="btn-text">Copy</span></button></div></div><div class="content"><pre><code class="language-bash">cd .buildozer &amp;&amp; find . -type d -name "android_notify*" -print0 | xargs -0 rm -r &amp;&amp; cd ..</code></pre></div></div>
  </div>
  <p class="paragraph">MacOS</p>
  <div class="code-block" data-lang="bash"><div class="header"><span class="title">bash</span><div class="copy-buttons"><button onclick="handleCopy(this.closest('.code-block').id)" title="Copy Code" class="regular-copy-btn"><svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg><svg class="check-icon display-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><span class="btn-text">Copy</span></button></div></div><div class="content"><pre><code class="language-bash">cd .buildozer &amp;&amp; find . -type d -name "android_notify*" -exec rm -r {} + &amp;&amp; cd ..</code></pre></div></div>
</section>
<section class="page-section" id="debugging-tips">
  <h2>Debugging Tips</h2><hr/>
  <ul class="inner-section-2"><li>Enable logs during development: Notification.logs = True</li><li>Check channel creation with Android's notification settings</li><li>Verify image paths before sending notifications</li></ul>
</section>
<section class="page-section screen-height200px flex fd-column justify-content-cen" id="contributing-issues">
  <h2>Contribution || Reporting Issues</h2><hr/>
  <p>Feel free to submit pull requests for improvements! on <a href="https://github.com/Fector101/android_notify">Github</a></p>
  <p>Or Found a bug? Please open an issue on our GitHub <a href="https://github.com/Fector101/android_notify/issues">Issues page</a></p>
</section>
<section id="credits" class="page-section screen-height200px flex fd-column justify-content-cen">
  <h2>Credits</h2><hr/>
  <ul class="inner-section-2">
    <li>Name: Fabian - fector101@yahoo.com</li>
    <li>GitHub: <a href="https://github.com/Fector101/android_notify">Android Notify Repo</a></li>
    <li>Twitter: <a href="https://twitter.com/intent/user?user_id=1246911115319263233">FabianDev_</a></li>
  </ul>
  <p class="paragraph">This Project was thoroughly Tested by the <a href="https://github.com/Fector101/Laner">Laner</a> Project - A application for Securely Transfering Files Wirelessly between your PC and Phone.</p>
  <p>Special thanks to the Kivy and Pyjnius communities for their support and contributions.</p>
</section>
<section id="support-project" class="page-section screen-height200px flex fd-column justify-content-cen">
  <h2>Support</h2><hr/>
  <p>If you find this project helpful, consider buying me a <a href="https://www.buymeacoffee.com/fector101">coffee!</a> Or Giving it a star on <a href="https://github.com/Fector101/android_notify">GitHub.</a></p>
  <p>Your support helps maintain and improve the project.</p>
</section>
${prevNext('/reference.html', 'Reference', '/getting-started.html', 'Getting Started')}`;

PAGES['versions'] = `
<h1 class="page-heading">Changelog</h1>
<p class="page-subtitle">Release notes for all versions of Android Notify</p>
<div class="legend">
  <span class="legend-item"><span class="legend-dot good"></span>New features or API</span>
  <span class="legend-item"><span class="legend-dot warning"></span>API changes or issues with advanced methods</span>
  <span class="legend-item"><span class="legend-dot bad"></span>Critical fixes</span>
</div>
<section class="versions">
  <div class="version-block">
    <h2 id="v1_60" class="version-title">Version 1.60</h2>
    <div class="version-content">
      <h3 class="version-subheading">Improvements</h3>
      <li class="good-item">Interactions in Service: A way to pass in BroadCast Reciver and Actions to Buttons</li>
      <li class="good-item">Usage without gradle dependencies: new branch <span class="code green-shade">without-androidx</span> was created, allowing usage in Pyroid3 and Flet apps. Install via <span class="code green-shade">__version__.dev0</span>.</li>
      <li class="good-item">Flet support: Beta support for Flet Python apps.</li>
      <li class="good-item">Better Logging: replaced prints with Python logger, allowing log levels.</li>
      <li class="good-item">Modularization: split package into smaller task-based structure for easier management.</li>
      <h3 class="version-subheading">Class: Notification</h3>
      <h3 class="version-subheading">New Arguments</h3>
      <li class="good-item"><span class="code">addButton</span> - receiver_name, action</li>
      <li class="good-item"><span class="code">createChannel</span> - vibrate, res_sound_name</li>
      <li class="good-item"><span class="code">setBigText</span> - title, summary</li>
      <h3 class="version-subheading">New Methods</h3>
      <li class="good-item"><span class="code">setColor</span> - color, changes app icon color using hex code.</li>
      <li class="good-item"><span class="code">setSubText</span> - text, Adds small text near the title.</li>
      <li class="good-item"><span class="code">setWhen</span> - secs_ago, to change the time the notification was created.</li>
      <li class="good-item"><span class="code">channelExists</span> - channel_id, to check if said channel exists.</li>
      <li class="good-item"><span class="code">doChannelsExist</span> - ids, returns those that do not exist.</li>
      <li class="good-item"><span class="code">setData</span> - attach a dictionary of data for later use.</li>
      <li class="good-item"><span class="code">fVibrate</span> - Trigger a standard notification vibration.</li>
      <li class="good-item"><span class="code">fill_args</span> - fills notification args without sending.</li>
      <li class="good-item">Support for devices less than Android 8</li>
      <li class="good-item"><span class="code">setVibrate</span> - pattern, defaults to a single vibration.</li>
      <li class="good-item"><span class="code">setSound</span> - res_sound_name, changes the default notification sound.</li>
      <h3 class="version-subheading">Class: NotificationHandler</h3>
      <h3 class="version-subheading">New Arguments</h3>
      <li class="good-item"><span class="code">get_name</span> - on_start must be True when called from App.on_start().</li>
      <h3 class="version-subheading">New Property</h3>
      <li class="good-item"><span class="code">data_object</span> - access data added via Notification.setData.</li>
    </div>
  </div>
  <div class="version-block">
    <h2 id="v1_59" class="version-title">Version 1.59</h2>
    <div class="version-content">
      <h3 class="version-subheading">Add new features</h3>
      <li class="good-item">Added a way to access Old Notification instance with <span class="code">Notification().id</span></li>
      <li class="good-item">methods to cancel a certain or all Notifications <span class="code">Notification().cancel()</span>, <span class="code">Notification.cancelAll</span></li>
      <li class="good-item">When setting a new component after <span class="code">Notification().send</span> use <span class="code">Notification().refresh</span></li>
      <li class="good-item">Instead of only requesting in init created <span class="code">NotificationHandler.asks_permission</span> and <span class="code">NotificationHandler.has_permission</span></li>
      <h3 class="version-subheading">Add methods working to free up __init__ kwargs</h3>
      <li class="good-item"><span class="code">setSmallIcon</span> == <span class="code yellow-shade">Notification(...,app_icon="...")</span></li>
      <li class="good-item"><span class="code">setLargeIcon</span> == <span class="code yellow-shade">Notification(...,large_icon_path="...",style=NotificationStyles.LARGE_ICON)</span></li>
      <li class="good-item"><span class="code">setBigPicture</span> == <span class="code yellow-shade">Notification(...,body="...",style=NotificationStyles.BIG_PICTURE)</span></li>
      <li class="good-item"><span class="code">setBigText</span> == <span class="code yellow-shade">Notification(...,big_picture_path="...",style=NotificationStyles.BIG_TEXT)</span></li>
      <li class="good-item">For creating channels <span class="code">Notification.createChannel(name, id, desc)</span></li>
      <li class="good-item">For deleting channels <span class="code">Notification.deleteAllChannel()</span> and <span class="code">Notification.deleteChannel(channel_id)</span></li>
      <h3 class="version-subheading">Changed</h3>
      <li class="warning-item">Notification.identifer to Notification.name</li>
      <li class="warning-item">NotificationHandler.getIdentifer to NotificationHandler.get_name</li>
    </div>
  </div>
  <div class="version-block">
    <h2 id="v1_58" class="version-title">Version 1.58</h2>
    <div class="version-content">
      <li class="warning-item">showInfiniteProgressBar Had no guard block when not on android</li>
      <li class="bad-item">NotificationHandler.getIdentifer always returned value even when app not opened from notification</li>
    </div>
  </div>
</section>`;

// === BUILD ===
for (const [name, content] of Object.entries(PAGES)) {
  const html = pageWrap(name, content);
  const filePath = path.join(SITE_DIR, name === 'index' ? 'index.html' : name + '.html');
  fs.writeFileSync(filePath, html, 'utf8');
  console.log('Built: ' + (name === 'index' ? 'index.html' : name + '.html'));
}
console.log('All pages built successfully!');
