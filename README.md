# NeatDownloadManager Extension – fixwithyuvi edition

A modified build of the **NeatDownloadManager (NDM) browser extension** that adds a
**Skip Sites** list. Sites on the list are ignored by NDM: no download capture and no
video/audio panel. Everything else works exactly like the original extension.

> **Not affiliated with Neat Download Manager.** See [Credits & Disclaimer](#credits--disclaimer).

---

## Features

- Skip any website with one click (right-click menu)
- Manage the skip list on an Options page (add / remove sites)
- Subdomains are included automatically (`example.com` also covers `files.example.com`)
- Skipped sites get no download capture and no NDM video/audio panel
- Works on Chrome, Edge, Brave and other Chromium browsers (Manifest V3)

## Requirements

- A Chromium-based browser (Chrome, Edge, Brave, Opera, Vivaldi)
- **Neat Download Manager** installed and running on your PC
  (the extension talks to it at `ws://127.0.0.1:10007`)

## Installation

1. Download this repo (**Code → Download ZIP**) or the release zip, and unzip it.
2. **Remove** the original NeatDownloadManager extension if it is installed
   (two copies will conflict).
3. Open `chrome://extensions` (Edge: `edge://extensions`, Brave: `brave://extensions`).
4. Turn on **Developer mode**.
5. Click **Load unpacked** and select the unzipped folder (the one containing `manifest.json`).
6. Pin the extension to the toolbar if you like.

Keep the folder in place. The browser loads the extension from it. If Chrome shows a
"disable developer mode extensions" prompt on startup, you can dismiss it.

## How to use

### Skip a site (quick way)
1. Open the site you want NDM to ignore.
2. Right-click anywhere on the page, or right-click the extension icon, and choose
   **Skip NeatDownloadManager on this site**, or press **Alt+Shift+S**.
3. The icon shows **SKIP** on every tab of that site.

The skip is **saved**: it stays after refresh, new tabs and browser restart.
Do the same action again (the menu now says **Resume NeatDownloadManager on this site**,
or press **Alt+Shift+S** again) to turn NDM back on for that site.

You can change the shortcut at `chrome://extensions/shortcuts`.

### Manage the list (Options page)
1. Right-click the extension icon → **Options**
   (or `chrome://extensions` → Details → Extension options).
2. Type a domain such as `example.com` and click **Add**.
3. Click **Remove** next to a site to stop skipping it.

Accepted formats: `example.com`, `www.example.com`, `https://example.com/page`,
`*.example.com`. All are saved as `example.com`.

### Other controls (from the original extension)
- **Click the toolbar icon** – turn download catching on/off globally
  (badge shows "Off" when disabled).
- **Hold the Delete key** and click a link – make NDM ignore that download once.
- **Right-click a link → Download by NeatDownloadManager** – send a link to NDM manually.
  This still works on skipped sites because you asked for it explicitly.

## How the skip list works

- The list is stored in `chrome.storage.local` under the key `skipSites`.
- `bg.js` checks every request against the list before capturing it. A request is
  ignored if any of these match a skipped site:
  - the request URL's host (for example, a file hosted on a skipped domain)
  - the page that started the request (`initiator`)
  - the current tab's page, for non-navigation requests
- When a page on a skipped site loads, the content script (`ct.js`) is told to hide
  its panel, so no NDM box appears on the page.
- Changes to the list apply to captures immediately. The panel updates on the next
  page load.

## Project structure

```
manifest.json     Extension manifest (MV3)
bg.js             Background service worker (download catching + skip list logic)
ct.js             Content script (video/audio panel on pages)
options.html      Skip Sites settings page
options.js        Settings page logic
img/              Icons
```

## What was changed from the original

| File | Change |
|------|--------|
| `bg.js` | Added skip-list helpers, context-menu item, request filtering, panel hiding |
| `options.html`, `options.js` | New files: Skip Sites settings page |
| `manifest.json` | Renamed, version 1.9.94, added Alt+Shift+S shortcut, added `options_ui`, removed `key` and `update_url` |
| `ct.js`, `img/*` | Unchanged |

The original `computed_hashes.json` and `verified_contents.json` are Chrome Web Store
integrity files and are intentionally not included.

## Troubleshooting

- **"Extension can't connect to NeatDownloadManager application"**
  Make sure the NDM desktop app is running.
- **A skipped site is still being caught**
  Check the domain on the Options page. Also check that the download isn't coming
  from a different domain (add that domain too).
- **Skip menu item is missing**
  Reload the extension on `chrome://extensions`.

## Contributing

Issues and pull requests are welcome. Please test on a Chromium browser with NDM
running before submitting changes.

## Credits & Disclaimer

- Original extension: **NeatDownloadManager Extension** by **Javad Motallebi**
  – <https://www.neatdownloadmanager.com/>
- Skip Sites feature and this edition: **fixwithyuvi**
- This is an unofficial, community-modified build and is provided **as is**, without warranty.
- The original extension code belongs to its author. This repository only shares the
  modification. Check the original author's terms before redistributing, and remove
  this repo if requested by the rights holder.
