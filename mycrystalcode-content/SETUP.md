# Setup: My Crystal Code content autopilot

About 2–3 hours the first time. You end up with: every day at 18:00 and 22:30 (Dubai) a branded
carousel or reel is written, checked, rendered and sent to your Telegram; you tap **✅ Publish**;
it goes to Instagram and lands in TikTok drafts.

```
Queue (Google Sheet) ─► Claude writes 1 post from a formula ─► Gate A (limits + claims blocklist)
   ─► Claude compliance check ─► render: Gotenberg (slides) / mcc-reel + ElevenLabs (+ fal.ai clip)
   ─► Claude vision QA ─► Telegram preview + Approve ─► kill switch re-check ─► Upload-Post ─► Log
any failed gate → one corrective rewrite → else "held" + Telegram alert
```

## 1. Accounts you need

| Service | Why | Cost (Oct 2026, verify) |
|---|---|---|
| A small VPS (2 vCPU, 4 GB) + a subdomain, e.g. `n8n.mycrystalcode.com` | runs n8n + renderers | ~$6–12/mo |
| Anthropic API key | copywriting, compliance, vision QA, weekly review | ~$10–15/mo |
| Upload-Post (Basic) | publishes to Instagram + TikTok (already TikTok-audited) | ~$16–24/mo; free tier = 10 uploads to test |
| Instagram **Business** account linked in Upload-Post; TikTok account linked | publishing | free |
| Telegram bot (talk to @BotFather → `/newbot`) | previews, approvals, alerts, `/pause` | free |
| ElevenLabs | reel voiceovers (pick one EN voice and one AR voice; have a native speaker approve the Arabic voice) | ~$5–22/mo |
| Google account | the control sheet | free |
| fal.ai (optional, premium reels only) | AI b-roll video | ~$1–2.50 per premium reel |

## 2. Run the stack

```bash
git clone <this repo> && cd mycrystalcode-content/stack
cp .env.example .env          # set N8N_HOST and N8N_ENCRYPTION_KEY (openssl rand -hex 32)
docker compose up -d
```

Put HTTPS in front of port 5678 (Telegram approvals and the link tracker need a public HTTPS URL).
The simplest is Caddy on the same VPS — `/etc/caddy/Caddyfile`:

```
n8n.mycrystalcode.com {
    reverse_proxy 127.0.0.1:5678
}
```

Gotenberg and mcc-reel are only reachable from n8n inside Docker; they are not published.

## 3. Create the Google Sheet

Create one spreadsheet with seven tabs named exactly: **Control, Queue, Log, Insights, Metrics,
Clicks, Sales**. For each, `File → Import → Upload` the matching file from `n8n/sheet-templates/`
("Replace current sheet"). The Queue is pre-filled with the agency's 14-day calendar (2–15 Nov 2026);
rows marked `manual` (R05 screen recording, R06 founder to camera) are for you to film.

**Control starts with `global_enabled = FALSE`.** Nothing posts until you flip it.
Copy the spreadsheet ID from its URL (`/d/<THIS PART>/edit`).

## 4. Import the workflows

In n8n: **Workflows → Import from File**, once per file in `n8n/workflows/`:

1. `01-mcc-content-autopilot.json` — the pipeline
2. `02-mcc-analytics-learning.json` — daily metrics + Monday review
3. `03-mcc-kill-switch.json` — `/pause`, `/resume`, `/status` in Telegram
4. `04-mcc-link-tracker.json` — click-counting redirect for stories/DMs

In **each** workflow open **⚙️ Settings** and fill the `PASTE_…` values:
`SHEET_ID`, `TELEGRAM_CHAT_ID` (send your bot a message, then open
`https://api.telegram.org/bot<TOKEN>/getUpdates` and copy `chat.id`), `ADMIN_TELEGRAM_IDS` (your own
user id, same place, `from.id`), `UPLOADPOST_USER` (the profile name in Upload-Post),
`ELEVEN_VOICE_EN` / `ELEVEN_VOICE_AR`, and `FAL_MODEL` only if you use premium reels.

## 5. Credentials (n8n → Credentials → Add)

| Credential type | Name it | Fields | Used by |
|---|---|---|---|
| Google Sheets OAuth2 | Google Sheets | sign in | every Sheets node |
| Anthropic | Anthropic | API key | the 3 Claude chains, "Vision QA (Claude)" |
| Telegram | MCC bot | bot token | all Telegram nodes |
| Header Auth | Upload-Post | Name `Authorization`, Value `Apikey <your key>` | Upload-Post nodes, Fetch analytics |
| Header Auth | ElevenLabs | Name `xi-api-key`, Value `<key>` | Voiceover |
| Header Auth | fal.ai | Name `Authorization`, Value `Key <key>` | the 3 fal nodes (premium only) |

Open each node with a red warning and pick its credential.

## 6. First test (nothing gets published)

1. Control tab: set `global_enabled` to `TRUE`.
2. In the autopilot, click **Run now (test)**. Within a few minutes you get a Telegram preview.
3. Press **❌ Reject**. Check the Queue row now says `rejected`.
4. Read the execution in n8n: each gate's output shows what it checked.

Then test a reel: put `reel` in a Queue row's `format`, run again, reject again.
Test the kill switch: send `/pause test` to the bot, run the autopilot — it stops at the gate.

## 7. Go live

Before the first real post (see `00-PLAYBOOK.md` §7 for the reasons):
- [ ] Website: keep UTMs (or rely on the link tracker), commit a launch-price end date or leave `LAUNCH_END_DATE` empty
- [ ] UAE Advertiser Permit question answered for the account/founder
- [ ] Arabic ElevenLabs voice approved by a native speaker
- [ ] Bio links: `https://n8n.mycrystalcode.com/webhook/go?p=bio&s=instagram&m=bio&d=home` (and `s=tiktok`, and `l=ar` for an Arabic link)
- [ ] Activate workflows 01–04 (toggle top right)

Daily routine (5 minutes): approve or reject in Telegram → open TikTok drafts → check
**AI-generated content** and **Your brand / promotional** toggles → Post → paste the drafted first
comment if you like. Use the story/DM link from the "✅" message for stories.

## 8. Verify these against the live docs (could not be confirmed from here)

What was verified while building: all four workflows import into n8n **2.45.7**; the Code-node
features they rely on (binary buffers, re-attaching binaries across nodes, `isExecuted`, Luxon) were
executed in that n8n; the slide pipeline renders through a real **Gotenberg 8** with the exact form
fields (including Arabic, transparent reel frames and the fail-closed broken-image path); `mcc-reel`
assembled real MP4s in both modes; `n8n/test` passes 7/7. These vendor details were not reachable
from the build environment:

1. **Upload-Post field names** beyond `user`, `platform[]`, `title`, `photos[]`, `video` (which come from
   existing working workflows): `description`, TikTok `post_mode` (`MEDIA_UPLOAD` = drafts),
   `is_aigc`, `auto_add_music`. If their docs use different names, edit the two Upload-Post nodes.
2. **Upload-Post analytics endpoint** (`UPLOADPOST_ANALYTICS_URL` and its query names). Until it is
   wired, type numbers into the Metrics tab by hand; the Monday review works either way.
3. **Claude 5.5 in n8n's Anthropic node:** if a chain errors about thinking, open its "· model" node and
   set Thinking to Adaptive (newer node versions), or switch the model to one your node lists.
4. **fal.ai model id** for premium reels (copy it from the model's page; e.g. a Veo 3.1 or Kling 3.0
   text-to-video endpoint) and its input fields in `FAL_INPUT_JSON`.
5. Instagram's API allows **10 images per carousel**; the pipeline always makes 8.

## 9. Changing things

- Brand facts, prices, rules, formulas, hooks: edit the sources (`01-brand-brief.md`, `agency/*.md|json`,
  `n8n/src/*.js`, `templates/mcc-slide.html`), then rebuild and re-import:
  ```bash
  python3 n8n/build_workflows.py
  cd n8n/test && npm install && npx playwright --version >/dev/null && node run-tests.js
  ```
  (`GOTENBERG_URL=http://localhost:3000 node run-tests.js` renders through a real Gotenberg.)
- **Prices** live in three places that must agree with the site's `shared/commerce/tierPrices.ts`:
  the template (`PRICES`), Gate A (`PRICES`) and the brief.
- Preview any slide JSON without n8n: `node tools/render-preview.js examples/deck-same-behavior.en.json out/`.
- Premium reels: set `REEL_TIER` to `premium` and fill the fal.ai settings; frames become transparent
  overlays on the AI clip.
- Auto-publish (skips Telegram approval) is off. The governance rule is: only English carousels,
  only after 30 approvals in a row with no edits — then set `AUTO_PUBLISH_EN` to `true`.
