# 7e.VideoTab

A Chrome New Tab extension that uses the supplied video as a cinematic full-screen background behind a search landing page.

## Install

1. Extract `7e.VideoTab.zip`.
2. Open `chrome://extensions` in Chrome.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the extracted `7e.VideoTab` folder.
6. Open a new tab to see the landing page.

## Included features

- Full-screen looping video background
- Google web search form
- Live date display
- Quick-links panel for YouTube, YouTube Studio, Instagram, Gmail, Google Drive, and X
- Rotating hero headline carousel
- Glass search panel with brutalist styling
- Silent, optimized background loop for fast loading
- Responsive layout for smaller windows

## Video optimization

The supplied 1280×720 video was exported as an H.264 MP4 with no audio track because it is used as a background and Chrome new-tab pages should begin silently. It uses browser-friendly `yuv420p`, `faststart` metadata, and a quality-focused 1 Mbps encode to reduce file size while keeping the original resolution and smooth 30 fps playback.

To customize the services, edit the `QUICK_LINKS` array near the top of `newtab.js`.
