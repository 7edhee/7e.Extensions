# 7e.YTMoney — YouTube Earnings Estimator

A small Chrome extension that estimates potential YouTube revenue from views and an assumed RPM.

## Install in Chrome

1. Extract the `7e.YTMoney` folder.
2. Open `chrome://extensions`.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the extracted `7e.YTMoney` folder.
6. Pin **7e.YTMoney** from Chrome's Extensions menu.

## Use

1. Enter the total number of views.
2. Choose **Long-form video** or **YouTube Shorts**.
3. Select a currency.
4. Set the estimated RPM, or use the slider.
5. Click **CALCULATE ESTIMATE**.

The core formula is:

```text
Estimated earnings = (views ÷ 1,000) × RPM
```

## Important accuracy note

This extension provides an estimate only. Views alone cannot reveal exact YouTube earnings. Actual revenue depends on monetization eligibility, monetized playbacks, audience country, ad demand, content category, ad formats, Premium views, invalid traffic adjustments, taxes, and YouTube's revenue share. Use the RPM field to match the RPM shown in your own YouTube Analytics for a more useful estimate.

The extension does not log in to YouTube, access YouTube Studio, collect account data, or request browsing permissions.
