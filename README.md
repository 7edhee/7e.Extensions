# 7e.Extensions

A collection of small, self-contained Chrome extensions built with Manifest V3. Each extension lives in its own directory under `extensions/` and can be loaded independently as an unpacked extension.

[![Manifest V3](https://img.shields.io/badge/Manifest-V3-4f46e5)](https://developer.chrome.com/docs/extensions/develop/migrate/what-is-mv3)
[![License: MIT](https://img.shields.io/badge/License-MIT-059669.svg)](LICENSE)
[![Extensions](https://img.shields.io/badge/Extensions-5-2563eb)](#extensions)

## Extensions

| Extension | Purpose | Version | Permissions |
| --- | --- | --- | --- |
| [`7e.Ext`](extensions/7e.Ext/) | Quick access to saved websites from the browser toolbar | `1.0.0` | None |
| [`7e.Ping`](extensions/7e.Ping/) | Live latency checks and on-demand download-speed estimates | `1.0.0` | None |
| [`7e.SubCount`](extensions/7e.SubCount/) | Live YouTube subscriber-count tracker | `1.1.0` | Storage; YouTube host access |
| [`7e.VideoTab`](extensions/7e.VideoTab/) | A cinematic video-backed search landing page for new tabs | `1.0.0` | None |
| [`7e.YTMoney`](extensions/7e.YTMoney/) | YouTube earnings estimator based on views and RPM assumptions | `1.0.0` | Storage; YouTube host access |

For extension-specific behavior, setup notes, and permissions, see the README inside each extension directory.

## Install an extension locally

No build step or package manager is required for the source directories.

1. Clone the repository:

   ```bash
   git clone https://github.com/7edhee/7e.Extensions.git
   cd 7e.Extensions
   ```

2. Open `chrome://extensions/` in Chrome.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select one directory from `extensions/`.
6. After editing an extension, return to `chrome://extensions/` and click **Reload** on its card.

The repository also contains ZIP packages beside selected extensions. The project landing page automatically exposes the newest matching ZIP when one is available.

`7e.VideoTab` replaces the New Tab page while enabled. Disable it from `chrome://extensions/` to restore Chrome's default New Tab page.

## Repository layout

```text
.
├── .github/workflows/
│   └── validate-extensions.yml
├── extensions/
│   ├── 7e.Ext/
│   │   ├── manifest.json
│   │   └── popup.*
│   ├── 7e.Ping/
│   │   ├── icons/
│   │   ├── manifest.json
│   │   └── popup.*
│   ├── 7e.SubCount/
│   │   ├── manifest.json
│   │   └── popup.*
│   ├── 7e.VideoTab/
│   │   ├── assets/
│   │   ├── manifest.json
│   │   └── newtab.*
│   └── 7e.YTMoney/
│       ├── manifest.json
│       ├── popup.*
│       └── content.*
├── scripts/
│   └── validate_extensions.py
├── index.html
├── LICENSE
└── README.md
```

Keep extension assets, manifests, and documentation inside the corresponding directory so each package remains independently loadable.

## Live package downloads

The root [`index.html`](index.html) checks the current `extensions/` tree from GitHub and adds a **Download ZIP** button beside each extension card when a package is available. Upload another `.zip` package inside an extension directory and the matching card will recognize it automatically after GitHub updates the `main` branch.

The website also includes a live **Download Intel** panel. It reads GitHub's public release API and totals `download_count` for release assets, including per-extension counts. Branch-file downloads are not exposed by GitHub's public API, so the panel shows a clear no-release state until ZIPs are published as GitHub release assets.

## Validation

Run the repository checks locally with:

```bash
python3 scripts/validate_extensions.py
```

The same check runs automatically through GitHub Actions for pushes and pull requests.

## Privacy and permissions

Review each manifest before installing. `7e.SubCount` and `7e.YTMoney` request YouTube host access because they interact with YouTube pages. `7e.SubCount` and `7e.YTMoney` also use Chrome storage. The other extensions declare no Chrome permissions. Do not add credentials, cookies, API keys, or other secrets to the repository.

## Contributing

Bug reports, documentation improvements, and focused pull requests are welcome. Before opening a pull request:

1. Keep changes scoped to the extension or documentation they affect.
2. Run `python3 scripts/validate_extensions.py`.
3. Load the affected extension from its directory in Chrome.
4. Check the browser console and extension error panel for errors.
5. Verify that unrelated extension directories are unchanged.
6. Describe manual testing steps and any permission or network behavior in the pull request.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the contribution checklist.

## License

This repository is distributed under the [MIT License](LICENSE). Individual extension directories may include their own license copy for distribution convenience.
