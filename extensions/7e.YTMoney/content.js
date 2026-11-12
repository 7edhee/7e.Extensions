(() => {
  const PANEL_ID = 'seven-e-ytmoney-panel';
  let lastUrl = location.href;
  let refreshTimer;

  const currencySymbols = { USD: '$', INR: '₹', EUR: '€', GBP: '£' };
  const defaults = { rpm: 4, shortsRpm: 0.08, currency: 'USD' };

  function clean(text) {
    return (text || '').replace(/\s+/g, ' ').trim();
  }

  function textFrom(selectors) {
    for (const selector of selectors) {
      const element = document.querySelector(selector);
      const value = clean(element?.textContent || element?.getAttribute('aria-label'));
      if (value) return value;
    }
    return '';
  }

  function parseViews(value) {
    const text = clean(value).toLowerCase().replace(/,/g, '');
    const match = text.match(/([\d.]+)\s*([kmb])?/i);
    if (!match) return 0;
    const multiplier = { k: 1e3, m: 1e6, b: 1e9 }[match[2]] || 1;
    return Math.round(Number(match[1]) * multiplier);
  }

  function getDetails() {
    const title = textFrom(['h1.ytd-watch-metadata yt-formatted-string', 'h1.ytd-video-primary-info-renderer', 'meta[name="title"]']) || document.title.replace(/ - YouTube$/, '');
    const channel = textFrom(['ytd-channel-name a', '#owner ytd-channel-name', 'meta[itemprop="author"]']);
    const rawViews = textFrom(['ytd-video-view-count-renderer', '#info ytd-video-view-count-renderer', 'meta[itemprop="interactionCount"]']);
    const views = parseViews(rawViews) || Number(document.querySelector('meta[itemprop="interactionCount"]')?.content || 0);
    const likes = textFrom(['#top-level-buttons-computed ytd-toggle-button-renderer:nth-child(1)', '#segmented-like-button button', 'ytd-menu-renderer ytd-toggle-button-renderer']);
    const comments = textFrom(['ytd-comments-header-renderer #count', '#count.ytd-comments-header-renderer']);
    const isShort = location.pathname.startsWith('/shorts');
    return { title, channel, views, rawViews: rawViews || 'Views unavailable', likes: likes || 'Not visible', comments: comments || 'Not visible', isShort, url: location.href };
  }

  function formatMoney(value, currency) {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency, maximumFractionDigits: 2 }).format(Number.isFinite(value) ? value : 0);
  }

  function render(details, settings) {
    let panel = document.getElementById(PANEL_ID);
    if (!panel) {
      panel = document.createElement('aside');
      panel.id = PANEL_ID;
      panel.innerHTML = `<div class="seven-header"><span class="seven-brand"><b>7e</b> YTMONEY</span><button class="seven-close" type="button" aria-label="Close">×</button></div><div class="seven-title"></div><div class="seven-channel"></div><div class="seven-stats"><div><small>VIEWS</small><strong class="seven-views"></strong></div><div><small>LIKES</small><strong class="seven-likes"></strong></div><div><small>COMMENTS</small><strong class="seven-comments"></strong></div></div><div class="seven-estimate"><small>ESTIMATED REVENUE</small><strong class="seven-money"></strong><span class="seven-formula"></span></div><div class="seven-note">Estimate only · based on your saved RPM</div><button class="seven-refresh" type="button">REFRESH DETAILS</button>`;
      document.documentElement.appendChild(panel);
      panel.querySelector('.seven-close').addEventListener('click', () => panel.remove());
      panel.querySelector('.seven-refresh').addEventListener('click', () => update(true));
    }
    const rpm = details.isShort ? Number(settings.shortsRpm ?? defaults.shortsRpm) : Number(settings.rpm ?? defaults.rpm);
    const currency = settings.currency || defaults.currency;
    const earnings = details.views > 0 ? (details.views / 1000) * rpm : 0;
    panel.querySelector('.seven-title').textContent = details.title || 'YouTube video';
    panel.querySelector('.seven-channel').textContent = details.channel ? `@ ${details.channel}` : 'Channel unavailable';
    panel.querySelector('.seven-views').textContent = details.views ? details.views.toLocaleString() : details.rawViews;
    panel.querySelector('.seven-likes').textContent = details.likes;
    panel.querySelector('.seven-comments').textContent = details.comments;
    panel.querySelector('.seven-money').textContent = details.views ? formatMoney(earnings, currency) : '—';
    panel.querySelector('.seven-formula').textContent = details.views ? `${details.views.toLocaleString()} views × ${formatMoney(rpm, currency)} RPM` : 'Views not detected yet';
  }

  function update(force = false) {
    if (!force && !location.pathname.startsWith('/watch') && !location.pathname.startsWith('/shorts')) return;
    chrome.storage.local.get(defaults, (settings) => render(getDetails(), settings));
  }

  function watchNavigation() {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      if (location.pathname.startsWith('/watch') || location.pathname.startsWith('/shorts')) {
        clearTimeout(refreshTimer);
        refreshTimer = setTimeout(() => update(true), 900);
      } else document.getElementById(PANEL_ID)?.remove();
    }
  }

  update(true);
  setInterval(watchNavigation, 700);
  setInterval(() => update(false), 5000);
})();
