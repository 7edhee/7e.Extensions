# 7e.Ping

A Chrome extension for live latency checks and on-demand download speed testing. The popup combines brutalist typography, hard offset shadows, acid green/orange accents, translucent glass panels, and a subtle grain texture.

## Install in Chrome

1. Extract the `7e.Ping.zip` file.
2. Open `chrome://extensions` in Chrome.
3. Enable **Developer mode** in the top-right corner.
4. Click **Load unpacked**.
5. Select the extracted `7e.Ping` folder containing `manifest.json`.
6. Pin **7e.Ping** from Chrome's Extensions menu for quick access.

## Use

- **Latency** checks automatically on popup open and every 5 seconds.
- **Download** click **RUN TEST** to download a 5 MB test payload and estimate Mbps.
- The test uses Google for latency and Cloudflare for the speed payload.

## Notes

Results depend on the network, browser scheduling, VPN, and the test servers. This is a practical estimate, not a certified ISP measurement. The extension does not request browsing-history or website permissions.
