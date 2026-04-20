This folder contains a minimal Chrome (Chromium) extension scaffold converted from the PWAsForFirefox project.

What was added:
- manifest.json converted to Manifest V3 (service worker + action)

Important next steps to obtain a working Chrome extension:
1) Bundle the ES modules used in the original extension (background.js, utils.js, etc.) into a single service worker file. The repository currently contains ES module source under extension/src which assumes Parcel for building a Firefox add-on. Chrome MV3 requires a single service worker file (or properly bundled module).

2) Add the webextension polyfill (webextension-polyfill) or translate browser.* calls to chrome.*. Example: npm install --save webextension-polyfill

3) Update build scripts in extension/package.json to support a Chrome build target (e.g. using Parcel or webpack) that outputs the service worker to extension-chrome/src/background.js and copies static files to a dist folder.

4) Test locally by loading the unpacked extension in chrome://extensions (Developer mode).

If you'd like, continue and I can:
- Create a Parcel/webpack build pipeline to produce a Chrome-compatible build and wire it into package.json
- Convert the background module into a bundled service worker and push the changes

Tell me which of the above to do next.
