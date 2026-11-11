# 7e.SubCount

A Chrome extension for live YouTube subscriber tracking and channel stat monitoring without requiring an API key. The popup combines brutalist typography, hard offset shadows, neon red/yellow accents, translucent glass panels, and an ambient backlight glow.

## Install in Chrome

1. Extract the `7e.SubCount.zip` file.
2. Open `chrome://extensions` in Chrome.
3. Enable **Developer mode** in the top-right corner.
4. Click **Load unpacked**.
5. Select the extracted `7e-subcount` folder containing `manifest.json`.
6. Pin **7e.SubCount** from Chrome's Extensions menu for quick access.

## Use

- Enter any YouTube `@handle` (e.g., `@MrBeast`), Channel ID (`UC...`), or direct channel URL.
- Click **TRACK** or hit **Enter** to fetch the channel data.
- **Subscribers** and upload counts automatically refresh every 10 seconds while the popup is open.
- The extension remembers your last queried channel and resumes tracking automatically on next open.

## Notes

- Operates client-side with zero API keys or Google Cloud configurations by reading public YouTube channel metadata directly.
- Counts for large channels follow YouTube's public abbreviated format (e.g., `100K`, `2.4M`, `318M`).
- The extension only requests host permissions for `youtube.com` to stream public subscriber stats; it does not collect user data, cookies, or browsing history.
