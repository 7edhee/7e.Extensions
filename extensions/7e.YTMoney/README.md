# 7e.YTMoney — YouTube Earnings Estimator

A Chrome extension that estimates YouTube revenue from views and an assumed RPM. When you open a YouTube video or Shorts page, it also detects the video title, channel, views, likes, comments, and estimated revenue in a small on-page panel.

## Install in Chrome

1. Extract the `7e.YTMoney` folder.
2. Open `chrome://extensions`.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the extracted `7e.YTMoney` folder.
6. Pin **7e.YTMoney** from Chrome's Extensions menu.
7. Open or refresh a YouTube video or Shorts page.

## Features

- Popup calculator for views, content type, currency, and RPM
- Automatic details panel on YouTube video and Shorts pages
- Detects title, channel, views, likes, and comments when YouTube exposes them in the page
- Estimates long-form or Shorts revenue using your saved RPM
- Detects navigation between YouTube videos without needing a page refresh
- Saves your long-form RPM, Shorts RPM, and currency locally for the on-page estimate
- Refresh and close controls on the video panel

The core formula is:

```text
Estimated earnings = (views ÷ 1,000) × RPM
```

## Important accuracy note

This extension provides an estimate only. Views alone cannot reveal exact YouTube earnings. Actual revenue depends on monetization eligibility, monetized playbacks, audience country, ad demand, content category, ad formats, Premium views, invalid traffic adjustments, taxes, and YouTube's revenue share. Use the RPM field to match the RPM shown in your own YouTube Analytics for a more useful estimate.

The extension reads visible YouTube page information on `www.youtube.com` only. It does not log in to YouTube, access private YouTube Studio data, or send video details to a server.

## Open-source notice

This extension is open source and may be used, modified, and redistributed under
the MIT License in `LICENSE`.
