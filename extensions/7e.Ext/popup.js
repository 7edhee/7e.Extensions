(() => {
  const list = document.getElementById("websiteList");
  const emptyState = document.getElementById("emptyState");
  const siteCount = document.getElementById("siteCount");

  const websites = Array.isArray(window.WEBSITES) ? window.WEBSITES : [];
  const validWebsites = websites.filter((site) => {
    if (!site || typeof site.name !== "string" || typeof site.url !== "string") return false;
    try {
      const parsed = new URL(site.url);
      return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
      return false;
    }
  });

  siteCount.textContent = `${validWebsites.length} ${validWebsites.length === 1 ? "site" : "sites"}`;
  emptyState.hidden = validWebsites.length !== 0;

  validWebsites.forEach((site) => {
    const card = document.createElement("article");
    card.className = "website-card";

    const icon = document.createElement("div");
    icon.className = "site-icon";
    icon.textContent = site.name.trim().charAt(0) || "W";
    icon.setAttribute("aria-hidden", "true");

    const details = document.createElement("div");
    details.className = "site-details";

    const name = document.createElement("p");
    name.className = "site-name";
    name.textContent = site.name.trim();
    name.title = site.name.trim();

    const url = document.createElement("p");
    url.className = "site-url";
    url.textContent = site.url;
    url.title = site.url;

    details.append(name, url);

    const button = document.createElement("button");
    button.className = "open-button";
    button.type = "button";
    button.textContent = "Open";
    button.addEventListener("click", () => {
      chrome.tabs.create({ url: site.url });
    });

    card.append(icon, details, button);
    list.append(card);
  });
})();
