const PING_URL = 'https://www.gstatic.com/generate_204';
const SPEED_URL = 'https://speed.cloudflare.com/__down?bytes=5000000';
const PING_INTERVAL = 5000;

const $ = (id) => document.getElementById(id);
const pingValue = $('pingValue');
const pingQuality = $('pingQuality');
const pingMeter = $('pingMeter');
const speedValue = $('speedValue');
const speedQuality = $('speedQuality');
const speedMeter = $('speedMeter');
const statusText = $('statusText');
const liveDot = $('liveDot');
const lastChecked = $('lastChecked');
const speedButton = $('speedButton');

function setStatus(text, color = '') {
  statusText.textContent = text;
  liveDot.style.background = color || 'var(--acid)';
  liveDot.style.boxShadow = `0 0 13px ${color || 'var(--acid)'}`;
}

function pingLabel(ms) {
  if (ms < 50) return 'EXCELLENT';
  if (ms < 100) return 'GOOD';
  if (ms < 180) return 'FAIR';
  return 'SLOW';
}

async function checkPing() {
  const started = performance.now();
  try {
    await fetch(`${PING_URL}?t=${Date.now()}`, { method: 'GET', cache: 'no-store', mode: 'no-cors' });
    const ms = Math.max(1, Math.round(performance.now() - started));
    pingValue.textContent = ms;
    pingQuality.textContent = pingLabel(ms);
    pingMeter.style.width = `${Math.min(100, Math.max(8, 100 - ms / 3))}%`;
    setStatus('ONLINE');
    lastChecked.textContent = `Last check: ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;
  } catch (error) {
    pingValue.textContent = '—';
    pingQuality.textContent = 'OFFLINE';
    pingMeter.style.width = '0%';
    setStatus('OFFLINE', 'var(--orange)');
    lastChecked.textContent = 'Last check: failed';
  }
}

async function runSpeedTest() {
  speedButton.disabled = true;
  speedButton.querySelector('span').textContent = 'TESTING';
  speedValue.textContent = '…';
  speedQuality.textContent = 'MEASURING';
  speedMeter.style.width = '8%';
  const started = performance.now();
  try {
    const response = await fetch(`${SPEED_URL}&t=${Date.now()}`, { cache: 'no-store' });
    if (!response.ok) throw new Error('Download failed');
    const buffer = await response.arrayBuffer();
    const seconds = (performance.now() - started) / 1000;
    const mbps = (buffer.byteLength * 8) / seconds / 1000000;
    const rounded = mbps >= 100 ? Math.round(mbps) : Math.round(mbps * 10) / 10;
    speedValue.textContent = rounded;
    speedQuality.textContent = rounded >= 100 ? 'FAST' : rounded >= 25 ? 'DECENT' : 'SLOW';
    speedMeter.style.width = `${Math.min(100, Math.max(8, rounded / 2))}%`;
  } catch (error) {
    speedValue.textContent = '—';
    speedQuality.textContent = 'FAILED';
    speedMeter.style.width = '0%';
  } finally {
    speedButton.disabled = false;
    speedButton.querySelector('span').textContent = 'RUN TEST';
  }
}

speedButton.addEventListener('click', runSpeedTest);
checkPing();
setInterval(checkPing, PING_INTERVAL);
