# My Crystal Code — AI content engine for Instagram & TikTok

Reels and carousels for [mycrystalcode.com](https://www.mycrystalcode.com), in English and Arabic,
written, checked, rendered and published by n8n on autopilot, with a Telegram preview and stop link.
Runs for roughly $23–33 a month (free GLM models, free Azure voices, $0.20 AI clips, Upload-Post).

**Start here:** [`00-PLAYBOOK.md`](00-PLAYBOOK.md) (the strategy) → [`SETUP.md`](SETUP.md) (getting it running).

| Path | What it is |
|---|---|
| `00-PLAYBOOK.md` | One-page strategy merged from the five specialist reports |
| `01-brand-brief.md` | Brand, offer, prices, audiences, voice, visual identity — the source every prompt uses |
| `agency/` | The five specialist reports (growth, platform content, design, compliance, stack) and the formula/hook data |
| `templates/mcc-slide.html` | The single slide template: 8 carousel layouts + reel frames, EN/AR, site brand tokens |
| `examples/` | Example decks (JSON) and rendered previews (`preview-*.jpg`) |
| `n8n/workflows/` | **Import these into n8n**: autopilot, analytics & weekly review, kill switch, links (click tracker + veto stop link) |
| `n8n/src/` | The Code-node scripts (readable source of the workflow logic) |
| `n8n/build_workflows.py` | Rebuilds `n8n/workflows/` from the sources above |
| `n8n/sheet-templates/` | CSVs for the control Google Sheet, Queue pre-filled with the 14-day calendar |
| `n8n/test/` | Runs the workflow's Code nodes against stubs and renders the slides |
| `stack/` | Docker Compose: n8n + Gotenberg + `mcc-reel` (FFmpeg reel assembler) |
| `tools/render-preview.js` | Render any deck JSON to PNGs locally |

Built on ideas from this repository's existing workflows (short-form video pipeline 1282/1805,
Blotato/Upload-Post publishers 1178/1973, Telegram approval 1878, Airtable brand-context captions
1261), rebuilt from scratch: in this collection the AI nodes of those files are stripped placeholders,
so they cannot run as-is.
