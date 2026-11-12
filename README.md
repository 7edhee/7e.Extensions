# 7e.Extensions

A collection of small, self-contained Chrome extensions built with Manifest V3. Each extension lives in its own directory and can be loaded independently as an unpacked extension.

[![Manifest V3](https://img.shields.io/badge/Manifest-V3-4f46e5)](https://developer.chrome.com/docs/extensions/develop/migrate/what-is-mv3)
[![License: MIT](https://img.shields.io/badge/License-MIT-059669.svg)](LICENSE)
[![Extensions](https://img.shields.io/badge/Extensions-3-2563eb)](#extensions)

## Extensions

| Extension | Purpose | Version | Permissions |
| --- | --- | --- | --- |
| [`7e.Ext`](extensions/7e.Ext/) | Quick access to saved websites from the browser toolbar | `1.0.0` | None declared |
| [`7e.Ping`](extensions/7e.Ping/) | Live latency checks and on-demand download-speed estimates | `1.1.0` | None declared |
| [`7e.VideoTab`](extensions/7e.VideoTab/) | A cinematic video-backed search landing page for new tabs | `1.0.0` | None declared |
| [`7e.YTMoney`](extensions/7e.YTMoney/) | Used to Estimating YouTube earnings from views. | `1.0.0` | None declared |

For extension-specific behavior and customization notes, see the README inside [`7e.Ping`](extensions/7e.Ping/) and [`7e.VideoTab`](extensions/7e.VideoTab/). `7e.Ext` is documented by its manifest and in-extension interface.

## Install an extension locally

Chrome extensions in this repository are loaded directly from their source directories; no build step or package manager is required.

1. Clone the repository:

   ```bash
   git clone https://github.com/7edhee/7e.Extensions.git
   cd 7e.Extensions
   ```

2. Open `chrome://extensions/` in Chrome.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select one extension directory: `extensions/7e.Ext`, `extensions/7e.Ping`, or `extensions/7e.VideoTab`.
6. After editing an extension, return to `chrome://extensions/` and click **Reload** on its card.

`7e.VideoTab` replaces the New Tab page while it is enabled. Disable it from `chrome://extensions/` to restore Chrome's default New Tab page.

## Repository layout

```text
.
├── extensions/
│   ├── 7e.Ext/
│   │   ├── icons/
│   │   ├── manifest.json
│   │   └── popup.*
│   ├── 7e.Ping/
│   │   ├── icons/
│   │   ├── manifest.json
│   │   └── popup.*
│   └── 7e.VideoTab/
│       ├── assets/
│       ├── manifest.json
│       └── newtab.*
├── index.html
├── LICENSE
└── README.md
```

Each extension is intentionally self-contained under `extensions/`. Keep extension assets and metadata inside the corresponding directory so that it remains independently loadable.

## Live file catalog

The root [`index.html`](index.html) loads the current `extensions/` tree from GitHub and renders only published `.zip` packages with a download button. Upload a `.zip` package anywhere inside an extension directory and it will appear in the live catalog after GitHub updates the `main` branch; no manual edit to `index.html` is required.

## Privacy and permissions

The three manifests currently declare no Chrome permissions. `7e.Ping` performs network requests for its latency and download-speed checks, as described in its [extension README](extensions/7e.Ping/README.md). `7e.VideoTab` includes external quick-link destinations and a Google search form. Review each extension's source and manifest before installing modified copies.

## Contributing

Bug reports, documentation improvements, and focused pull requests are welcome. Before opening a pull request:

1. Keep changes scoped to the extension or documentation they affect.
2. Load the affected extension from its directory in Chrome.
3. Check the browser console and extension error panel for errors.
4. Verify that unrelated extension directories are unchanged.
5. Describe manual testing steps and any permission or network behavior in the pull request.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the contribution checklist.

## License

This repository is distributed under the [MIT License](LICENSE).
