// =====================================================
//  7e.Ext — Popup Script
//  Reads WEBSITES from websites.js and renders cards.
// =====================================================

(function () {
  const list       = document.getElementById('site-list');
  const emptyState = document.getElementById('empty-state');

  // Guard: websites.js must define WEBSITES
  if (typeof WEBSITES === 'undefined' || !Array.isArray(WEBSITES)) {
    emptyState.hidden = false;
    return;
  }

  const sites = WEBSITES.filter(s => s && s.url);

  if (sites.length === 0) {
    emptyState.hidden = false;
    return;
  }

  // Build a card for each site
  sites.forEach(site => {
    const li = document.createElement('li');
    li.className = 'site-card';

    // --- Favicon ---
    const faviconWrap = document.createElement('div');
    faviconWrap.className = 'site-favicon';

    const img = document.createElement('img');
    try {
      const origin = new URL(site.url).origin;
      img.src = `https://www.google.com/s2/favicons?sz=32&domain_url=${encodeURIComponent(origin)}`;
    } catch (_) {
      img.src = '';
    }
    img.alt = '';
    img.onerror = () => {
      // Fallback: show first letter of name
      faviconWrap.innerHTML = '';
      const letter = document.createElement('span');
      letter.className = 'fallback-letter';
      letter.textContent = (site.name || site.url).charAt(0);
      faviconWrap.appendChild(letter);
    };
    faviconWrap.appendChild(img);

    // --- Info ---
    const info = document.createElement('div');
    info.className = 'site-info';

    const name = document.createElement('span');
    name.className = 'site-name';
    name.textContent = site.name || site.url;

    info.appendChild(name);

    if (site.description) {
      const desc = document.createElement('span');
      desc.className = 'site-desc';
      desc.textContent = site.description;
      info.appendChild(desc);
    } else {
      // Show cleaned-up URL as description
      const desc = document.createElement('span');
      desc.className = 'site-desc';
      try {
        desc.textContent = new URL(site.url).hostname.replace(/^www\./, '');
      } catch (_) {
        desc.textContent = site.url;
      }
      info.appendChild(desc);
    }

    // --- Open button ---
    const btn = document.createElement('button');
    btn.className = 'open-btn';
    btn.textContent = 'Open';
    btn.setAttribute('aria-label', `Open ${site.name || site.url}`);
    btn.addEventListener('click', () => {
      chrome.tabs.create({ url: site.url });
    });

    // --- Assemble ---
    li.appendChild(faviconWrap);
    li.appendChild(info);
    li.appendChild(btn);
    list.appendChild(li);
  });
})();
