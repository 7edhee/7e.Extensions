# Contributing

Thanks for helping improve 7e.Extensions. The repository contains independent, unpacked Chrome extensions, so changes should remain easy to review and test in isolation.

## Before you start

- Open an issue first for a larger feature or behavior change.
- Choose the smallest affected extension directory.
- Avoid committing generated archives, editor settings, credentials, or unrelated formatting changes.

## Pull request checklist

- [ ] The change is limited to the intended extension or repository documentation.
- [ ] The affected directory still contains a valid `manifest.json`.
- [ ] The extension was loaded through `chrome://extensions/` with Developer mode enabled.
- [ ] The extension was manually exercised in Chrome after the change.
- [ ] The extension error panel and browser console were checked.
- [ ] Any new permissions, external requests, or user-facing behavior are documented.
- [ ] README or other documentation is updated when behavior or installation steps change.

## Commit guidance

Use short, imperative commit subjects that explain the change, for example:

```text
Improve 7e.Ping installation notes
Clarify 7e.VideoTab privacy behavior
Fix repository installation instructions
```

Keep each commit focused and avoid mixing unrelated extension changes with documentation-only changes.
