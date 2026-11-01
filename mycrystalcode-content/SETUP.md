# Setup: My Crystal Code content autopilot

About 2–3 hours the first time. Then, twice a day (18:00 and 22:30 Dubai), a branded carousel or
reel is written, checked, rendered and published to Instagram and TikTok by itself. You get a
Telegram preview with a private **stop link**; if you do nothing, it publishes after 3 hours.

```
Queue (Google Sheet) ─► AI writes 1 post from a formula ─► Gate A (limits + claims blocklist)
   ─► AI compliance check ─► render: Gotenberg (slides) / reels: Azure voice + CogVideoX clip + mcc-reel
   ─► AI visual QA ─► Telegram preview + stop link ─► wait 3 h ─► kill switch + veto re-check
   ─► Upload-Post (Instagram + TikTok) ─► Log ─► daily metrics ─► Monday review feeds the next posts
any failed gate → one corrective rewrite on the fallback model → else "held" + Telegram alert
```

## 1. What it costs (prices checked on the vendors' own pages, Nov 2026)

| Part | Service | Monthly |
|---|---|---|
| Server (n8n + Gotenberg + mcc-reel) | **Oracle Cloud Always Free** ARM VM (or any 2 vCPU / 4 GB VPS, ~$6–12) | $0 |
| Public HTTPS address | **Cloudflare Tunnel** (free) | $0 |
| Writing, visual check, weekly review | **Z.ai GLM-4.7-Flash / GLM-4.6V-Flash** (listed free on docs.z.ai) | $0 |
| Compliance check + rewrite fallback | **Claude Haiku 5.5 / Sonnet 5.5** (Anthropic API) | ~$1–3 |
| Voiceover (EN + Gulf Arabic) | **Azure AI Speech free tier**: 0.5M neural characters/month (~30 reels use < 25k) | $0 |
| AI video clip per reel | **CogVideoX-3** on Z.ai, $0.20 per 10-second clip | ~$6 for 30 reels |
| Publishing to Instagram + TikTok | **Upload-Post** Basic (public TikTok posting from day one) | ~$16 (annual) / $24 |
| Google Sheet, Telegram | free | $0 |
| **Total** | | **~$23–33** |

Upload-Post is the one part with no free equivalent: posting publicly to TikTok without it needs
your own TikTok app approved in TikTok's audit (weeks, not guaranteed). Its free tier (10
uploads/month) is enough to test everything first.

## 2. Accounts and keys

| Service | What to do | Goes into |
|---|---|---|
| **Z.ai** | Sign up at z.ai, create an API key | Credential "Z.ai" |
| **Anthropic** | console.anthropic.com → API key, add $5 credit | Credential "Anthropic" |
| **Azure** | portal.azure.com → create a **Speech** resource, pricing tier **Free F0**, note the key and region | Credential "Azure Speech", Settings `AZURE_REGION` |
| **Upload-Post** | Sign up, connect your **Instagram Business** account and **TikTok**, create an API key and a profile | Credential "Upload-Post", Settings `UPLOADPOST_USER` |
| **Telegram** | @BotFather → `/newbot` → token | Credential "Telegram" |
| **Google** | One spreadsheet (step 4) | Credential "Google Sheets" |

## 3. Run the stack

On the server (Oracle: create an "Ampere A1" VM with Ubuntu, 2 OCPU / 12 GB is plenty, then install Docker):

```bash
git clone <this repo> && cd mycrystalcode-content/stack
cp .env.example .env          # set N8N_HOST and N8N_ENCRYPTION_KEY (openssl rand -hex 32)
docker compose up -d
```

HTTPS without opening ports, with Cloudflare Tunnel (free; your domain's DNS on Cloudflare):

```bash
# on the server, once:
cloudflared tunnel login
cloudflared tunnel create mcc
cloudflared tunnel route dns mcc n8n.mycrystalcode.com
cloudflared tunnel run --url http://localhost:5678 mcc     # or install it as a service
```

(Already have a server with a public IP? Caddy works too: `n8n.mycrystalcode.com { reverse_proxy 127.0.0.1:5678 }`.)
Gotenberg and mcc-reel stay private inside Docker.

## 4. Create the Google Sheet

One spreadsheet with eight tabs named exactly: **Control, Queue, Log, Insights, Metrics, Clicks,
Sales, Vetoes**. For each: `File → Import → Upload` the matching CSV from `n8n/sheet-templates/`
("Replace current sheet"). The Queue is pre-filled with the 14-day calendar (2–15 Nov 2026); rows
marked `manual` (R05 screen recording, R06 founder to camera) are skipped by the autopilot.

**Control starts with `global_enabled = FALSE`.** Nothing posts until you flip it.

## 5. Import the workflows

n8n → **Workflows → Import from File**, once per file in `n8n/workflows/`:

1. `01-mcc-content-autopilot.json` — the pipeline
2. `02-mcc-analytics-learning.json` — daily metrics + Monday review
3. `03-mcc-kill-switch.json` — `/pause`, `/resume`, `/status` in Telegram
4. `04-mcc-links.json` — click tracker for story/DM links + the veto stop link

In **each** workflow open **⚙️ Settings** and fill the `PASTE_…` values and `N8N_PUBLIC_URL`
(your HTTPS address). `TELEGRAM_CHAT_ID`: message your bot, open
`https://api.telegram.org/bot<TOKEN>/getUpdates`, copy `chat.id`; `ADMIN_TELEGRAM_IDS` is `from.id`.

## 6. Credentials (n8n → Credentials → Add)

| Credential type | Name it | Fields | Used by |
|---|---|---|---|
| Header Auth | Z.ai | Name `Authorization`, Value `Bearer <z.ai key>` | every "· GLM" node, the CogVideoX nodes |
| Anthropic | Anthropic | API key | every "· Claude" node |
| Header Auth | Azure Speech | Name `Ocp-Apim-Subscription-Key`, Value `<key>` | Voiceover (Azure) |
| Header Auth | Upload-Post | Name `Authorization`, Value `Apikey <key>` | Upload-Post nodes, Fetch analytics |
| Telegram | MCC bot | bot token | all Telegram nodes |
| Google Sheets OAuth2 | Google Sheets | sign in | every Sheets node |
| Header Auth | ElevenLabs / fal.ai | only if you switch to them | — |

Open each node with a red warning and pick its credential.

## 7. The switches in ⚙️ Settings

| Setting | Default | Options |
|---|---|---|
| `COPY_PROVIDER` / `QA_PROVIDER` / `INSIGHTS_PROVIDER` | `glm` (free) | `claude` |
| `COMPLIANCE_PROVIDER` | `claude` (Haiku, cents) | `glm` — not recommended: this is the safety gate |
| `COPY_FALLBACK_PROVIDER` | `claude` | the corrective second draft uses this model |
| `TTS_PROVIDER` | `azure` (voices `en-US-AvaMultilingualNeural`, `ar-AE-FatimaNeural`) | `elevenlabs`; other Gulf voices: `ar-AE-HamdanNeural`, `ar-SA-ZariyahNeural`, `ar-SA-HamedNeural` |
| `VIDEO_PROVIDER` | `cogvideox` ($0.20/reel) | `fal` (Veo/Kling, ~$1–2.50), `none` (animated brand frames only, $0) |
| `APPROVAL_MODE` | `veto` — publishes after `VETO_MINUTES` (180) unless you open the stop link | `approve` (you tap ✅ on every post), `none` (no preview at all) |
| `TIKTOK_POST_MODE` | `DIRECT_POST` (public) | `MEDIA_UPLOAD` (lands in TikTok drafts) |

Every post is labelled AI-generated on both platforms (`is_ai_generated`), TikTok's "promoting my
own business" disclosure is on (`brand_organic_toggle`), and captions end with the disclaimer.

## 8. First test (nothing gets published)

1. Set `APPROVAL_MODE` to `approve` for the first runs. Control tab: `global_enabled` = `TRUE`.
2. Click **Run now (test)** in the autopilot. A Telegram preview arrives within a few minutes.
3. Press **❌ Reject**. The Queue row now says `rejected`.
4. Read the execution: every gate shows what it checked, and each "· parse" node shows which model answered.

Test a reel (put `reel` in a Queue row's format), the kill switch (`/pause test`, run again — it stops
at the gate), and the veto: set `APPROVAL_MODE` back to `veto` and `VETO_MINUTES` to `2`, run, open
the stop link — the post is not published.

## 9. Go live

- [ ] `APPROVAL_MODE` = `veto`, `VETO_MINUTES` = `180`; activate workflows 01–04
- [ ] Website: keep UTMs (or rely on the link tracker); commit a launch-price end date or leave `LAUNCH_END_DATE` empty
- [ ] UAE Advertiser Permit question answered for the account/founder
- [ ] Listen to the Arabic voice once with a native speaker (switch voices in Settings if needed)
- [ ] Bio links: `https://<your n8n>/webhook/go?p=bio&s=instagram&m=bio&d=home` (`s=tiktok` for TikTok, add `&l=ar` for Arabic)

Your daily routine is now optional: glance at the Telegram previews; open the stop link only if a
post looks wrong. `/pause` stops everything.

**Risk you are accepting with veto mode.** The compliance team recommended a person approve every
post (all Arabic posts for at least 90 days), because one bad Arabic post can get the account
restricted in the UAE. Veto mode keeps every automatic gate (blocklist, AI compliance, visual QA)
and gives you a window to stop a post, but nothing waits for you. If you won't read the previews
for the first weeks, consider `APPROVAL_MODE` = `approve` for Arabic until you've seen ~30 good ones.

## 10. Verified while building, and what still needs a live check

Verified: all four workflows import into n8n **2.45.7**; the Code-node features they rely on, a
retry loop's run handling, a JSON body sent as a prebuilt string, and a raw SSML body were executed in
that n8n; slides render through a real **Gotenberg 8** (Arabic, transparent reel frames, fail-closed
images); `mcc-reel` built real MP4s; `n8n/test` passes 10/10. API field names were taken from the
vendors' current docs (Upload-Post, Z.ai, Azure, Instagram) in Nov 2026.

Needs your accounts to confirm on the first run: real responses from GLM, Claude, Azure, CogVideoX and
Upload-Post; how GLM-4.7-Flash writes Arabic (switch `COPY_PROVIDER` to `claude` if it reads weaker);
Telegram previews.

## 11. Changing things

- Brand facts, prices, rules, formulas: edit the sources (`01-brand-brief.md`, `agency/*`, `n8n/src/*.js`,
  `templates/mcc-slide.html`), then `python3 n8n/build_workflows.py` and re-import.
- Tests: `cd n8n/test && npm install && node run-tests.js` (`GOTENBERG_URL=http://localhost:3000` to render through Gotenberg).
- **Prices** must agree with the site's `shared/commerce/tierPrices.ts` in three places: the template
  (`PRICES`), Gate A (`PRICES`) and the brief.
- Preview a slide deck without n8n: `node tools/render-preview.js examples/deck-same-behavior.en.json out/`.
