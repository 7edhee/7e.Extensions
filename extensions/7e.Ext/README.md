# 7e.Ext — Chrome Web Launcher

A small Chrome extension that displays your saved websites and opens each one in a new tab.

## Add your websites

1. Open `websites.js` in a text editor.
2. Add entries inside the `WEBSITES` array:

```js
const WEBSITES = [
  { name: "Google", url: "https://www.google.com" },
  { name: "YouTube", url: "https://www.youtube.com" },
  { name: "My website", url: "https://example.com" }
];
```

3. Save the file.
4. In Chrome, open `chrome://extensions`.
5. Enable **Developer mode** using the switch in the top-right corner.
6. Click **Load unpacked**.
7. Select the `7e.Ext` folder.
8. Click the extension icon in Chrome's toolbar to see your websites.

## Updating the extension

After changing `websites.js`, return to `chrome://extensions` and click the **Reload** button on the 7e Web Launcher card. Then reopen the extension popup.

## Notes

- URLs must begin with `https://` or `http://`.
- The extension opens each website in a new browser tab.
- No website data or browsing history is collected.

## Open-source notice

This extension is open source and may be used, modified, and redistributed under
the MIT License in `LICENSE`.
