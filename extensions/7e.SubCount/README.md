# 7e.SubCount

> **Brutalist-Glassy Live YouTube Subscriber Tracker for Google Chrome.**

`7e.SubCount` is a lightweight, zero-configuration Chrome Extension (Manifest V3) designed to track YouTube channel statistics in real-time. It requires **no Google Cloud API keys**, functioning straight out of the box with a high-contrast Neo-Brutalist + Glassmorphic interface.

---

## ⚡ Features

- **Zero-API Required**: No need to configure Google Cloud Console, generate API keys, or deal with daily quota limits.
- **Brutalist-Glass Theme**: Frosted glass transparency, ambient neon glow, stark high-contrast borders, and hard tactile drop shadows.
- **Universal Channel Lookup**: Supports `@handles` (e.g. `@MrBeast`), Channel IDs (e.g. `UCX6OQ3DkcsbYNE6H8uQQuVA`), or pasted YouTube URLs.
- **Live Stream Metrics**: Auto-refreshes channel metrics at periodic intervals.
- **Local Persistence**: Automatically caches and reloads the last queried channel.

---

## 📁 Project Structure

```text
7e-subcount/
├── manifest.json      # Chrome Manifest V3 configuration
├── popup.html         # Brutalist glass UI markup
├── popup.css          # Styling & animations
├── popup.js           # Live data scraper & parser logic
├── icon.png           # Extension icon
├── README.md          # Documentation
└── LICENSE.md         # Open-source license
