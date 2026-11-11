const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const video = document.getElementById('backgroundVideo');
const hero = document.querySelector('.hero-carousel');
const heroTop = document.getElementById('heroTop');
const heroBottom = document.getElementById('heroBottom');

// Edit this list to add or remove your own quick links.
const QUICK_LINKS = [
  { name: 'YouTube', url: 'https://www.youtube.com', mark: 'YT' },
  { name: 'YouTube Studio', url: 'https://studio.youtube.com', mark: 'YS' },
  { name: 'Instagram', url: 'https://www.instagram.com', mark: 'IG' },
  { name: 'Gmail', url: 'https://mail.google.com', mark: 'GM' },
  { name: 'Google Drive', url: 'https://drive.google.com', mark: 'DR' },
  { name: 'X / Twitter', url: 'https://x.com', mark: 'X' }
];

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const query = searchInput.value.trim();
  if (query) window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
});

const heroSlides = [
  ['What are you', 'looking for?'],
  ['Where will you', 'go next?'],
  ['What will you', 'discover?'],
  ['Keep your eyes', 'on the road.']
];
let heroIndex = 0;

function rotateHero() {
  hero.classList.remove('is-changing');
  void hero.offsetWidth;
  hero.classList.add('is-changing');
  heroIndex = (heroIndex + 1) % heroSlides.length;
  setTimeout(() => {
    heroTop.textContent = heroSlides[heroIndex][0];
    heroBottom.textContent = heroSlides[heroIndex][1];
  }, 230);
}

function updateDate() {
  const now = new Date();
  document.getElementById('dayName').textContent = now.toLocaleDateString(undefined, { weekday: 'long' });
  document.getElementById('dateText').textContent = now.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

function renderQuickLinks() {
  const list = document.getElementById('quickLinks');
  QUICK_LINKS.forEach((link) => {
    const item = document.createElement('a');
    item.className = 'recent-item';
    item.href = link.url;
    item.title = `Open ${link.name}`;

    const mark = document.createElement('span');
    mark.className = 'recent-favicon';
    mark.textContent = link.mark;
    mark.setAttribute('aria-hidden', 'true');

    const details = document.createElement('span');
    details.className = 'recent-details';
    const title = document.createElement('span');
    title.className = 'recent-title';
    title.textContent = link.name;
    const url = document.createElement('span');
    url.className = 'recent-url';
    url.textContent = new URL(link.url).hostname.replace(/^www\./, '');
    details.append(title, url);
    item.append(mark, details);
    list.appendChild(item);
  });
}

video.addEventListener('error', () => {
  document.querySelector('.scene').classList.add('video-fallback');
});

updateDate();
renderQuickLinks();
setInterval(updateDate, 60000);
setInterval(rotateHero, 4200);
