let refreshInterval = null;

document.addEventListener('DOMContentLoaded', () => {
  const queryInput = document.getElementById('query-input');
  const trackBtn = document.getElementById('track-btn');
  const statusMsg = document.getElementById('status-message');
  const channelCard = document.getElementById('channel-card');

  // Load last queried channel
  chrome.storage.local.get(['lastTarget'], (data) => {
    if (data.lastTarget) {
      queryInput.value = data.lastTarget;
      startTracking(data.lastTarget);
    }
  });

  // Handle Search / Track Button
  trackBtn.addEventListener('click', () => {
    const rawTarget = queryInput.value.trim();
    if (!rawTarget) {
      statusMsg.innerText = "ERROR // INPUT IS EMPTY";
      return;
    }
    chrome.storage.local.set({ lastTarget: rawTarget });
    startTracking(rawTarget);
  });

  // Enter key trigger
  queryInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') trackBtn.click();
  });

  function startTracking(target) {
    if (refreshInterval) clearInterval(refreshInterval);
    statusMsg.innerText = "FETCHING PUBLIC FEED...";
    scrapeYouTube(target);

    // Live refresh loop every 10 seconds
    refreshInterval = setInterval(() => {
      scrapeYouTube(target);
    }, 10000);
  }

  function resolveUrl(input) {
    if (input.startsWith('http://') || input.startsWith('https://')) {
      return input;
    }
    if (input.startsWith('UC') && input.length === 24) {
      return `https://www.youtube.com/channel/${input}`;
    }
    const cleanHandle = input.startsWith('@') ? input : `@${input}`;
    return `https://www.youtube.com/${cleanHandle}`;
  }

  async function scrapeYouTube(rawTarget) {
    const targetUrl = resolveUrl(rawTarget);

    try {
      // Force English to keep subscriber regex patterns consistent
      const res = await fetch(targetUrl, {
        headers: { 'Accept-Language': 'en-US,en;q=0.9' }
      });

      if (!res.ok) {
        statusMsg.innerText = `STATUS: ${res.status} // TARGET NOT FOUND`;
        channelCard.classList.add('hidden');
        return;
      }

      const html = await res.text();
      const parsedData = extractChannelInfo(html, rawTarget);

      if (!parsedData || !parsedData.subCount) {
        statusMsg.innerText = "SYS_ERR // UNABLE TO EXTRACT METRICS";
        channelCard.classList.add('hidden');
        return;
      }

      renderData(parsedData);
    } catch (err) {
      statusMsg.innerText = "SYS_ERR // NETWORK ERROR";
      channelCard.classList.add('hidden');
    }
  }

  function extractChannelInfo(html, fallbackHandle) {
    // 1. Channel Title
    const titleMatch = html.match(/<meta property="og:title" content="([^"]+)">/i)
                    || html.match(/<title>([^<]+) - YouTube<\/title>/i);
    const title = titleMatch ? titleMatch[1] : fallbackHandle;

    // 2. Avatar URL
    const avatarMatch = html.match(/<meta property="og:image" content="([^"]+)">/i)
                     || html.match(/<link rel="image_src" href="([^"]+)">/i);
    const avatar = avatarMatch ? avatarMatch[1] : '';

    // 3. Handle / Tag
    const urlMatch = html.match(/<meta property="og:url" content="([^"]+)">/i);
    let handle = fallbackHandle.startsWith('@') ? fallbackHandle : `@${fallbackHandle}`;
    if (urlMatch && urlMatch[1].includes('@')) {
      handle = '@' + urlMatch[1].split('@')[1];
    }

    // 4. Subscriber Count (supports exact or abbreviated like '318M')
    let subCount = null;
    const subRegexPatterns = [
      /"subscriberCountText":\s*\{[^}]*"(?:simpleText|label)":\s*"([^"]+)"/i,
      /"content":\s*"([0-9.,KMBkmb]+\s+subscribers?)"/i,
      /([0-9.,]+[KMBkmb]?)\s+subscribers/i
    ];

    for (const pattern of subRegexPatterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        subCount = match[1].replace(/\s*subscribers?/i, '').trim();
        break;
      }
    }

    // 5. Video count
    let videoCount = 'N/A';
    const vidPatterns = [
      /"videoCountText":\s*\{[^}]*"(?:simpleText|label)":\s*"([^"]+)"/i,
      /"content":\s*"([0-9.,KMBkmb]+\s+videos?)"/i,
      /([0-9.,]+[KMBkmb]?)\s+videos/i
    ];

    for (const pattern of vidPatterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        videoCount = match[1].replace(/\s*videos?/i, '').trim();
        break;
      }
    }

    return { title, avatar, handle, subCount, videoCount };
  }

  function renderData(data) {
    statusMsg.innerText = "STREAM_ONLINE // 200 OK";
    channelCard.classList.remove('hidden');

    if (data.avatar) {
      document.getElementById('channel-avatar').src = data.avatar;
    }
    document.getElementById('channel-title').innerText = data.title;
    document.getElementById('channel-handle').innerText = data.handle;
    document.getElementById('sub-count').innerText = data.subCount || 'HIDDEN';
    document.getElementById('video-count').innerText = data.videoCount;
    document.getElementById('sync-status').innerText = 'LIVE';
  }
});
