# E. Autopilot Content Stack: n8n → Instagram + TikTok (EN/AR)

**Prepared by:** The Agency (Multi-Platform Publisher, Video Optimization Specialist, Agents Orchestrator)
**Research date:** 2026-10-30
**Input:** `../01-brand-brief.md`. Solo founder, early stage, bilingual EN/AR, one IG account and one TikTok account (`@my.crystal.code`).
**Target volume:** about 2 posts/day = **60 posts/month** (planned as 30 carousels + 30 reels, each cross-posted to IG and TikTok, alternating EN/AR).

> **How to read the confidence flags**
> - **[V-src]**: verified today by reading primary source code or registry data (n8n GitHub `master`, npm registry).
> - **[V-doc]**: confirmed by an official vendor doc or page excerpt returned by web search.
> - **[3P]**: third-party blog or reseller figure, usually several sources agreeing. Treat it as an estimate.
> - **[UNVERIFIED]**: conflicting or single-source. Check it before you depend on it.
>
> This session's sandbox blocked direct page fetches to most vendor sites (developers.facebook.com, upload-post.com, etc.). Prices and limits therefore come from extended web-search snippets, not from reading each pricing page. The n8n facts were read from source code.

---

## 0. TL;DR architecture

```
Schedule Trigger (weekly) ──► Strategist Agent (Claude Opus 5.5) ──► content calendar rows (Sheet / Data table)
Schedule Trigger (daily)  ──► pick today's row
   ├─ Carousel branch: Copywriter (Sonnet 5.5, EN or AR) → JSON slides → HTML template → Gotenberg (PNG/JPEG)
   │                    → Vision QA (Sonnet 5.5) → [fail → regenerate ≤2x → human flag]
   ├─ Reel branch:     Script (Sonnet 5.5) → stills (Nano Banana 2 / reuse slides) → optional i2v clip (Veo 3.1 Lite | Kling 3.0)
   │                    → ElevenLabs v3 VO → FFmpeg/Shotstack assembly + burned captions → Vision QA on keyframes
   └─ Publish: Upload-Post verified node (IG carousel/reel + TikTok photo/video) → log post IDs
Schedule Trigger (daily)  ──► Upload-Post analytics + IG Graph insights → metrics table → weekly feedback to Strategist
```

The orchestration principle comes from the Agents Orchestrator persona: **every asset passes a QA gate before publish, retries are capped, and failures go to a human queue instead of being published.** The compliance rules in the brief (no healing or money claims, Lina labeled as fictional, no fake testimonials) belong in the QA rubric as hard-fail checks.

---

## 1. n8n as of late October 2026

### 1.1 Version
- **Current stable: n8n `2.45.7`**, published to npm 2026-10-30 (dist-tags: `latest`/`stable` = 2.45.7, `beta`/`next` = 2.46.3). **[V-src: npm registry]**
- n8n 2.0 shipped December 2025 (stable around 2025-12-15). **[3P]**
- Notable 2.x breaking change: **Execute Command node is disabled by default** from 2.0. Self-hosted users re-enable it by removing it from `NODES_EXCLUDE` (e.g. `NODES_EXCLUDE="[]"`). **[V-doc: n8n v2.0 breaking-changes page / Execute Command docs]**

### 1.2 AI node type names and typeVersions
Read from `n8n-io/n8n` `master` (commit dated 2026-10-30). The released 2.45.7 should match or be very close. **[V-src]**

| Purpose | Node (UI name) | `type` | Versions in source | Use |
|---|---|---|---|---|
| Agent (tools + parser) | AI Agent | `@n8n/n8n-nodes-langchain.agent` | 1 … 3.1, **defaultVersion 3.1** | typeVersion **3.1** |
| Simple prompt→output chain | Basic LLM Chain | `@n8n/n8n-nodes-langchain.chainLlm` | 1 … **1.9** | typeVersion **1.9** |
| Claude model sub-node | Anthropic Chat Model | `@n8n/n8n-nodes-langchain.lmChatAnthropic` | 1 … 1.6, **defaultVersion 1.6** | typeVersion **1.6** |
| OpenAI model sub-node | OpenAI Chat Model | `@n8n/n8n-nodes-langchain.lmChatOpenAi` | 1, 1.1, 1.2, **1.3** | typeVersion 1.3 |
| Gemini model sub-node | Google Gemini Chat Model | `@n8n/n8n-nodes-langchain.lmChatGoogleGemini` | 1, 1.1, 1.2 | typeVersion 1.2 |
| JSON schema enforcement | Structured Output Parser | `@n8n/n8n-nodes-langchain.outputParserStructured` | 1 … 1.3, **defaultVersion 1.3** | typeVersion **1.3** |
| Vision / file actions | Anthropic (vendor node) | `@n8n/n8n-nodes-langchain.anthropic` | 1 | Has **Image → Analyze Image** op (for slide QA) |
| HTTP calls (Gotenberg, fal, ElevenLabs, IG Graph) | HTTP Request | `n8n-nodes-base.httpRequest` | defaultVersion **4.5** | typeVersion 4.5 |
| Meta Graph helper | Facebook Graph API | `n8n-nodes-base.facebookGraphApi` | 1 (Graph versions up to v25.0 selectable) | Optional. HTTP Request is more flexible |
| Glue code | Code | `n8n-nodes-base.code` | 1, **2** | typeVersion 2 |
| Scheduling | Schedule Trigger | `n8n-nodes-base.scheduleTrigger` | up to **1.4** | |
| Waiting/polling | Wait | `n8n-nodes-base.wait` | 1, 1.1 | |
| Image tweaks | Edit Image | `n8n-nodes-base.editImage` | defaultVersion 2 | Not suitable for Arabic text (see §3) |

There is **no native first-party Instagram or TikTok publishing node** (no `nodes-base/nodes/Instagram` or `TikTok` in source). **[V-src]** Publishing goes through a verified partner node or HTTP Request.

### 1.3 Is Anthropic Claude supported natively? Yes, with three 5.5-generation gotchas
- `lmChatAnthropic` v1.6 loads the model list **dynamically from Anthropic's API** (`searchModels`), so `claude-opus-5-5`, `claude-sonnet-5-5` and `claude-haiku-5-5` appear without an n8n update. You can also type the ID by hand. Default in the node is `claude-sonnet-5`. **[V-src]**
- Options in v1.6: **Thinking Mode** (Disabled / Adaptive / Manual-deprecated), **Effort**, **Prompt Caching** (Disabled / 5 min / 1 h), Streaming, Max Tokens. Temperature/top-p are ignored on newer Claude models. **[V-src]**
- **Gotcha 1, Thinking Mode:** if you explicitly set *Disabled*, n8n sends `thinking:{type:"disabled"}`. Opus 5.5 and Sonnet 5.5 **reject that with HTTP 400**. Either leave Thinking Mode unset (the model default is adaptive) or choose **Adaptive + Effort low/medium**. **[V-src for n8n behaviour; Anthropic model docs for the 400]**
- **Gotcha 2, forced tool use:** the AI Agent option **"Force Tool Call on First Iteration"** binds `tool_choice: 'any'`. Opus 5.5 and Sonnet 5.5 **reject forced tool choice (400)**. Keep that option **off** (it defaults to false). **[V-src]**
- **Gotcha 3, structured output + thinking:** n8n PR #37954 (Sept 2026) fixed "Model output doesn't fit required format" when the Anthropic model returned content-block arrays into the Structured Output Parser. Use n8n ≥ the release containing it (2.45.x is well after). **[V-doc: GitHub PR]**
- Turn on **Prompt Caching = 1 hour** on the copywriter nodes. The brand brief and system prompt are a large stable prefix reused all day.

### 1.4 n8n Cloud vs self-hosted: what matters for this pipeline

| Capability | n8n Cloud | Self-hosted (Docker on a VPS) |
|---|---|---|
| Execute Command (FFmpeg, local scripts) | **Not available** **[V-doc]** | Available. Disabled by default in 2.x, re-enable via `NODES_EXCLUDE` |
| Community nodes | **Verified community nodes only**, enabled by the owner in the Cloud Admin Panel. Unverified npm nodes require self-hosting. **[V-doc/3P]** | Any npm community node |
| Sidecar containers (Gotenberg, ffmpeg API, Remotion) | Not possible. You must buy SaaS renderers | Docker Compose next to n8n, free |
| Executions | Starter ≈ **$24/mo monthly (≈$20 annual), ~2,500 exec/mo**. Pro ≈ $60 / ~10k **[3P, currency/prices conflict]** | Unlimited. You pay only the VPS |
| Binary data | Works, but Cloud has memory and payload ceilings. Video assembly in Cloud is impractical | Set `N8N_DEFAULT_BINARY_DATA_MODE=filesystem` (or S3) for video |
| Ops burden | None | Updates, backups, TLS (low with a 1-click image) |

**Agency call:** use **self-hosted n8n 2.45.x on a small VPS** (4 GB RAM class, roughly $6–12/mo **[UNVERIFIED pricing, varies by host]**). Run it with Docker Compose alongside **Gotenberg** and an **FFmpeg-capable n8n image** (or a tiny ffmpeg HTTP sidecar). This is the only way to get free HTML→PNG rendering with perfect Arabic shaping, plus free video assembly. For the first 60 posts/month, the Cloud Starter execution budget would also be fine, but Cloud forces you to pay for SaaS rendering and assembly, and it blocks unverified nodes.

---

## 2. Publishing

### 2.1 Instagram (official API)
- **Carousels: yes.** Three steps: create child containers (`is_carousel_item=true`), create a parent container (`media_type=CAROUSEL`, `children=<ids>`), then `media_publish`. **Max 10 items via API.** The 20-slide limit applies only in the IG app. A carousel counts as one post. **[V-doc + 3P agree on 10]**
- **Reels: yes.** `media_type=REELS` with a public `video_url`, poll `status_code` until `FINISHED`, then publish. Specs reported: MP4/MOV, H.264/HEVC + AAC, 9:16 recommended, 23–60 fps, ≤300 MB, **3 s–15 min**. Some guides still cite 90 s (likely Reels-tab eligibility). **[3P, conflicting. Keep reels 15–60 s and you're safe either way]**
- **Images: JPEG only** (PNG, WebP and HEIC are rejected). Aspect ratio 4:5 to 1.91:1. **All carousel slides are cropped to the first slide's ratio**, so render every slide at **1080×1350 (4:5)**. **[V-doc for JPEG + first-image crop; 3P for ratio range]**
- **Media must be on a publicly reachable URL** when the container is created. Containers expire after about 24 h. **[V-doc]**
- **Rate limit: 100 API-published posts per rolling 24 h** (older doc copies say 50). Query `content_publishing_limit` to check. Irrelevant at 2/day. **[V-doc, with stale 50 noted]**
- **Account and login:** an Instagram **professional** account. Two API flavours: *Instagram API with Instagram Login* (`graph.instagram.com`, **no Facebook Page needed**, Meta's recommended path) and *with Facebook Login* (`graph.facebook.com`, needs a linked Page). MCC has no Facebook presence, so Instagram Login suits it, or use an aggregator, which hides this. Some guides claim Creator accounts can't publish via API. **[UNVERIFIED]**: switch to a **Business** account to remove the doubt. Graph API v26.0 observed as current. **[3P]**
- `alt_text` is now supported on image publishing. Use it for EN and AR accessibility. **[V-doc]**

### 2.2 TikTok Content Posting API
- **Photo-mode carousels: yes.** `post/publish/content/init` with `media_type=PHOTO`, **up to 35 images**, pulled from URLs on a **domain verified in your TikTok app**. Title ≤90 UTF-16 runes, description ≤4,000. **[V-doc: TikTok photo-post reference]**
- **Two modes:** `DIRECT_POST` publishes immediately. `MEDIA_UPLOAD` sends to the creator's **inbox/drafts** to finish in-app. **[V-doc]**
- **Unaudited apps:** all posts are **forced to private (SELF_ONLY)**, the posting account must be private, and the app is capped at **5 posting users per 24 h**. Branded content can't be posted while unaudited. Public posting requires passing TikTok's **audit**. The timeline is variable and unpublished. **[V-doc]**
- Third-party-reported limits: about 6 init requests/min and about 25 posts/account/day. **[3P]**
- **Implication:** a solo business should **not** build and audit its own TikTok app. An aggregator that is already audited publishes publicly from day one. Set the AIGC disclosure flag (`is_aigc` / `isAiGenerated`) on AI-generated reels.

### 2.3 Aggregator comparison

| | **Upload-Post** | Blotato | Zernio (ex-Late/getlate) | Ayrshare | Postiz (self-host) | Buffer API |
|---|---|---|---|---|---|---|
| IG carousel | **Yes** (Upload Photos, multiple images; IMAGE/STORIES) **[V-src: node code]** | Yes (template carousels; payload not confirmed) **[3P]** | Yes (IG posts/Reels/Stories) **[3P]** | Yes (generic) **[3P]** | Image arrays documented; carousel example not confirmed **[3P]** | Not confirmed **[UNVERIFIED]** |
| TikTok photo carousel | **Yes**, with `DIRECT_POST` or `MEDIA_UPLOAD`, `auto_add_music`, `is_aigc` **[V-src]** | Yes (`content.mediaUrls`, required privacy/AIGC flags) **[V-doc/3P]** | Yes (`media_type: PHOTO`, music flag) **[3P]** | Yes (up to 35) **[3P]** | Yes per blog example (`content_posting_method`) **[3P]** | Not confirmed |
| Reels / TikTok video | Yes | Yes | Yes | Yes | Yes | Yes |
| Public TikTok from day 1 | Yes (their audited app) | Yes | Yes | Yes (claims so) | **No**: your own TikTok app → audit needed | Yes |
| Analytics API | **Yes**: node ops `getPostAnalytics`, `getPostAnalyticsByPlatformId`, `getAnalytics`, `getAudience`, `getPlatformMetrics` **[V-src]** | Yes: `/v2/posts/{id}/analytics` (cached snapshot) **[V-doc]** | Yes **[3P]** | Yes | Limited | Limited |
| n8n node | **Verified** node `n8n-nodes-upload-post.uploadPost` (v0.5.1, 2026-10-04), typeVersion 1, `usableAsTool` **[V-src + n8n integrations page]** | Verified node `@blotato/n8n-nodes-blotato` (v1.0.10) **[V-doc]** | Community `n8n-nodes-zernio` (v0.7.1), **unverified**, so not on Cloud | HTTP Request | Community `n8n-nodes-postiz` (v0.2.17, Oct 2025) | HTTP (GraphQL) |
| Price | **Free: 2 profiles / 10 uploads/mo. Basic $24/mo ($16 annual): unlimited uploads, 5 profiles** **[3P, consistent]** | $29 / $97 / $499; API not in trial **[3P]** | First 2 accounts free, then ~$6/acct. Free-tier post cap disputed (20/mo?) **[UNVERIFIED]** | $149 / $299 / $599 **[3P]** | Free software; VPS cost; TikTok audit burden | ~$5–6/channel/mo; API included **[3P]** |

**Recommendation: Upload-Post (Basic, ~$16–24/mo).** Reasons:
1. **Verified n8n node**, which installs on Cloud or self-hosted, and its code supports IG carousels, IG Reels, TikTok photo carousels (Direct Post *or* Inbox), the AIGC flag and auto-music.
2. It accepts **binary uploads** (multipart `photos[]`), so you don't need your own public image host for the IG/TikTok "public URL" requirement.
3. **Per-post analytics** in the same node closes the feedback loop without a second vendor.
4. Cheapest paid tier with unlimited uploads. The free tier (10 uploads/mo) is enough to test the pipeline end-to-end first.

*Runner-up:* **Blotato** if you also want its built-in AI media credits. *Budget fallback:* **Zernio** (2 accounts free), but it requires self-hosted n8n (unverified node) and the free-tier post cap needs confirming. **Avoid** Ayrshare (price) and Postiz for TikTok (audit burden on you).

**Draft-first safety valve (Multi-Platform Publisher persona):** for the first 2–3 weeks run TikTok in `MEDIA_UPLOAD` (inbox) mode and IG via a human-approve Wait/Form step. Switch to `DIRECT_POST` once QA pass rate holds above about 95%.

---

## 3. Carousel rendering (HTML/JSON template → JPEG)

**Hard requirement:** Arabic needs real OpenType shaping (joined letterforms, lam-alef ligatures) plus bidi/RTL. The brand fonts are El Messiri and IBM Plex Sans Arabic for AR, and Cormorant Garamond and Inter for EN. A **headless Chromium** renderer handles this correctly: Chromium shapes text with HarfBuzz and implements full bidi, and you control `dir="rtl"` and `lang="ar"` in the HTML. *(HarfBuzz/bidi behaviour is established Chromium knowledge, not re-verified today.)* Canvas/ImageMagick-style tools (n8n **Edit Image** node) do **not** do reliable Arabic shaping. Don't use them for text.

| Option | How | Arabic/RTL + custom fonts | Cost at ~300 slides/mo | Notes |
|---|---|---|---|---|
| **Gotenberg 8 (self-hosted)** | `POST /forms/chromium/screenshot/html` with `index.html` + font files; `format=jpeg\|png\|webp` **[V-doc]** | **Excellent** (Chromium). Upload .woff2 alongside (flat dir, filename refs) or `@import` Google Fonts | **$0** (runs beside n8n) | One HTTP Request per slide. Set viewport 1080×1350, `waitDelay`/`waitForExpression` for font load |
| Browserless / Playwright container | Puppeteer `screenshot` | Excellent | $0 self-hosted (or SaaS plans) | More flexible, heavier. `n8n-nodes-puppeteer` is self-host only |
| htmlcsstoimage | Hosted Chrome API | Excellent (Chrome) | ~$14–19 entry plans **[3P, conflicting]** | Best hosted option if you stay on n8n Cloud |
| Rendex (`n8n-nodes-rendex`) | Hosted HTML→PNG/JPEG | Chrome-based **[3P]** | ~$6.90/1k **[3P vendor claim]** | Cloud-installable per vendor. Young product |
| APITemplate.io | Template / HTML | Raw HTML → PDF only per one source **[3P]** | ~$29/1.5k | Weak fit |
| Placid | Visual templates | Arabic/RTL **not confirmed** | $19–39 | Visual editor fights the HTML-first brand system |
| Bannerbear | Visual templates | **RTL/Arabic supported** in V3 editor **[V-doc]** | ~$49/1k credits | Pricey; second-best for non-coders |
| Templated.io | Visual templates | not confirmed | ~$29/1k | |
| Creatomate (image) | JSON templates | not confirmed for Arabic | credit-based, highest per-minute for video **[3P]** | |
| n8n Code node | — | — | — | Can't run a browser (sandboxed task runner). Can only build the HTML string |

**Recommendation: Gotenberg 8 self-hosted.** The flow:
- Copywriter returns slide JSON.
- A Code node fills an HTML/CSS template using the brand tokens from `C-design-system.md` (gradient `#180c33→#43206f→#7b62bd→#53b9c8`, fonts per language, `dir` per language).
- HTTP Request → Gotenberg → **JPEG 1080×1350**.
- Vision QA, then Upload-Post.

Keep one template set with a `lang` switch: mirrored layout for AR, Eastern Arabic numerals optional, and a page counter on the left in RTL.

*If you insist on n8n Cloud:* use htmlcsstoimage (or Rendex) with the identical HTML templates. Then the only change is the URL of the HTTP Request.

---

## 4. Reels

### 4.1 Image models (stills / first frames)
| Model | Approx. price/image | Notes |
|---|---|---|
| **Nano Banana 2** (Google) | ~$0.04 | Best quality-per-$ per several roundups **[3P]** |
| Nano Banana Pro | ~$0.08–0.10 (4K ~$0.18) | Premium stills **[3P]** |
| GPT Image 2 (OpenAI) | token-billed (≈$0.006–0.15, varies widely) | Tops Arena leaderboard **[3P, prices conflict]** |
| Seedream 5.0 / 4.0 | ~$0.03 | Cheap, good **[3P]** |
| FLUX.2 (klein → Maxx) | ~$0.014–0.07 | Cheapest decent **[3P]** |
| Imagen 4 Ultra | ~$0.054 | **[3P]** |

Never let a model render **text** into images. All words (EN and AR) are overlaid by the HTML/caption layer.

### 4.2 Image→video models (per-second, approx.)
| Model | Price | Access | Status |
|---|---|---|---|
| **Veo 3.1 Lite** | **$0.05/s 720p, $0.08/s 1080p** | Gemini API / Vertex, fal, resellers | Launched ~Apr 2026; cheapest first-party **[3P citing Google pricing page]** |
| Veo 3.1 Fast | ~$0.10/s 720p, ~$0.12/s 1080p | Gemini API, fal, Kie.ai (cheaper reseller) | **[3P]** |
| Veo 3.1 (standard, with audio) | ~$0.40/s (4K $0.60) | Gemini API, fal | Premium **[3P, consistent]** |
| **Kling 3.0 Pro** | **$0.112/s (no audio), $0.168/s (audio)** on fal | fal.ai, PiAPI, Kling direct | Strong i2v motion **[3P, consistent]** |
| Seedance 2.0 (ByteDance) | ~$0.18–0.68/s on fal by tier | fal, BytePlus/Volcengine | **[3P, wide range]** |
| Hailuo 02 / 2.3 (MiniMax) | ~$0.28 per 6 s clip (2.3 std on fal) | fal, MiniMax | **[3P]** |
| Wan 2.6 / 3.0 | ~$0.05/s | fal, Replicate, self-host | Open weights **[3P]** |
| Runway Gen-4 | no current price found | Runway API | **[UNVERIFIED]** |
| **OpenAI Sora 2** | — | — | **Shut down 2026-09-24**. OpenAI's deprecations page lists the Videos API and sora-2/sora-2-pro with no replacement **[V-doc]**. Do not build on it. |

**Access route:** use **fal.ai** as the single video/image gateway: one API key, one HTTP Request pattern (queue submit → poll → fetch), all the models above. Use the official Gemini API for Veo if you want first-party pricing. Kie.ai and PiAPI are cheaper resellers, but SLA and ToS risk is higher. **[3P]**

### 4.3 Voiceover
| Option | Price | Arabic | Verdict |
|---|---|---|---|
| **ElevenLabs Eleven v3** | **$0.08 / 1k chars** API (v3 conversational $0.04) **[V-doc via search; older pages say $0.10]** | Arabic supported. Voice library has Saudi- and Emirati-accented voices (e.g. "Sultan", Emirati) **[3P]**. One user report of dialect drift **[3P]** | **Use it.** Blind-test 3–5 Gulf voices with a native speaker and lock one EN and one AR voice ID as brand voices |
| Gemini TTS (3.1 Flash) | ~$1/M input tokens + $20/M audio tokens **[3P]** | Only ar-EG GA, ar-001 preview **[V-doc]**. No Gulf locale | Cheap backup, Egyptian/MSA only |
| Azure Neural TTS | per-char | MSA + Gulf voices listed **[3P]** | Viable fallback |
| OpenAI TTS | — | No reliable Arabic-dialect data found **[UNVERIFIED]** | Not recommended for AR |

A 30-second VO is about 450–600 characters, so **≈ $0.04–0.05 per reel** on v3.

### 4.4 Captions and assembly
| Option | Price | Arabic captions | Fit |
|---|---|---|---|
| **Self-hosted FFmpeg** (Execute Command or sidecar) | $0 | Burn captions as **PNG overlays rendered by Gotenberg** (same shaping engine as carousels). libass+HarfBuzz also shapes Arabic **[training knowledge, not re-verified]** | **Cheap tier** |
| **Shotstack** | **$0.20–0.30/min PAYG**, down to $0.05 on volume; 20 free watermarked min/mo **[3P]** | Arabic not confirmed. Feed it pre-rendered caption PNGs to be safe | **Premium/no-ops tier** |
| JSON2Video | $49.95/mo for 200 min (TTS included) **[3P]** | not confirmed | OK alternative |
| Creatomate | ~$0.84/min at entry tier; ElevenLabs billed separately **[3P]** | not confirmed | Most expensive |
| Remotion | **Free for individuals and companies ≤3 people** **[V-doc]**. Lambda ~$0.01–0.02/min render | Full Chromium, so perfect Arabic | Best quality ceiling, but needs a React dev. Phase 2 |

Get word-level timings from ElevenLabs' `with-timestamps` endpoint, so captions sync without a separate ASR step. *(Feature from training knowledge, not re-verified today.)*

### 4.5 AI avatars / UGC (HeyGen, Captions, Arcads)
- HeyGen API is pay-as-you-go: ≈$0.0167/s (Avatar III twin) to $0.05–0.067/s (Avatar IV/V). **No free API credits since Feb 2026.** **[V-doc HeyGen blog + 3P]**
- Arcads: no public pricing, ~$110/mo for ~10 videos, **API only on Pro (~$385+/mo)**. **[3P]**
- Captions (Mirage) API: price not found. **[UNVERIFIED]**
- **Verdict: don't use now.** (1) A fake "customer" avatar collides with the brief's **no fake testimonials** rule. Synthetic UGC that reads as a real buyer is a compliance breach. (2) Cost per video is 5–20× the faceless format. (3) The brand voice is calm, premium and reflective, which suits faceless gradient/crystal visuals plus voice. Revisit only for a *clearly labeled* brand narrator, or once the founder records a consented digital twin.

### 4.6 Two reel tiers (30 s, 9:16, 1080×1920)

| Step | **Cheap tier** | **Premium tier** |
|---|---|---|
| Script + on-screen copy | Sonnet 5.5 (~$0.03) | Sonnet 5.5 (~$0.05) |
| Visuals | Reuse carousel slides + 2–3 Nano Banana 2 stills ($0–0.12), Ken-Burns/parallax in FFmpeg | 4 Nano Banana Pro stills ($0.40) → **Kling 3.0 Pro i2v 3×5 s** ($1.68) *or* Veo 3.1 Fast 1080p 2×8 s (~$1.92) |
| Optional motion accent | 1× **Veo 3.1 Lite** 8 s 720p ($0.40) | — |
| Voiceover | ElevenLabs v3 (~$0.05) | ElevenLabs v3 (~$0.05) |
| Captions + assembly | FFmpeg + Gotenberg caption PNGs ($0) | Shotstack (~$0.15) |
| Vision QA on 6 keyframes | Sonnet 5.5 (~$0.03) | Sonnet 5.5 (~$0.03) |
| **Per reel** | **≈ $0.10–0.65** | **≈ $2.20–2.60** (ultra: Veo 3.1 standard with audio, 24 s ≈ $9.60) |
| **30 reels/mo** | **≈ $3–20** | **≈ $66–78** |

**Recommendation:** start on the **cheap tier**. The approved hooks ("Same behavior. Different reasons.") are text-led, and a calm, kinetic-typography format suits the brand. Promote a reel concept to premium only after analytics show it earned above-median saves/shares.

---

## 5. LLM choice

Model IDs, confirmed in Anthropic's docs (via the claude-api reference, cached 2026-10-06) and web results. **[V-doc]**

| Model | ID | Price in/out per MTok | Role in pipeline |
|---|---|---|---|
| Claude Opus 5.5 | `claude-opus-5-5` | $4 / $20 (cache read $0.20) | **Strategist** (weekly calendar, hook angles, compliance-aware planning), Adaptive, effort `high` |
| Claude Sonnet 5.5 | `claude-sonnet-5-5` | $2 / $10 | **Copywriter EN and AR** (native AR copy, not translation), **vision QA** of slides and keyframes, effort `medium` |
| Claude Haiku 5.5 | `claude-haiku-5-5` | $0.10 / $0.50 (≤100K prompt) | Hashtags, alt text, analytics summarisation, routing/classification, effort `low` |

All three are vision-capable, with 1M context. *(Vision support assumed from the family docs. Confirm in the Models API capabilities field.)* Haiku 5.5 is cheap enough for every-image QA. Keep **Sonnet 5.5 as the QA judge** for Arabic typography and compliance, because a missed broken ligature or a "crystals heal" claim costs more than the tokens saved.

**QA prompt contract (hard fails):**
- Arabic letters disconnected or reversed
- Wrong reading order in RTL
- Text clipped or overflowing the safe zone (IG 4:5 grid crop, TikTok UI overlays)
- Off-palette colours (lavender-grey glow)
- Any health, money or guarantee claim
- "Lina" shown without a fictional label
- Text baked into AI imagery

The QA node returns `{pass:boolean, issues:[...], fix_instructions:string}` via the Structured Output Parser. On fail, loop back to the copywriter or renderer at most twice, then send to a human (Agents Orchestrator retry rule).

**n8n wiring:** Agent `@n8n/n8n-nodes-langchain.agent` v3.1, plus `lmChatAnthropic` v1.6 (model by ID, **Thinking Mode = Adaptive**, Prompt Caching = 1 h), plus `outputParserStructured` v1.3. For QA use the vendor node `@n8n/n8n-nodes-langchain.anthropic` (Image → Analyze Image) or pass binaries to the agent. Optional `fallbacks` (Anthropic's server-side refusal fallback) isn't exposed in the n8n node. **[V-src: not present]** Handle `refusal` via the node's error output instead.

**LLM monthly estimate (60 posts):**
- Strategist: 4–5 Opus runs ≈ $2–3
- Copy: 60 × ~$0.05
- QA: 60 × ~$0.04
- Retries and analytics: small

That is **≈ $10–15/mo**, before prompt-cache savings.

---

## 6. Analytics

### 6.1 Instagram (IG Media Insights, `GET /{media-id}/insights?metric=...`)
- **Available per post:** `reach`, `views` (replaced impressions/plays), `likes`, `comments`, `saved`, `shares`, `total_interactions`, `profile_visits`, `profile_activity`, `follows`. **[V-doc + connectors agree on saved/shares/reach/profile_visits]**
- **Deprecated:** `impressions` (errors for media after 2024-07-02 since 2025-04-21), `plays`, `clips_replays_count`, `ig_reels_aggregated_all_plays_count`, `video_views`. **[V-doc: Graph v21/v22 changelogs]**
- **Carousel children have no insights.** Query the parent album ID. **[V-doc]**
- **Link clicks:** IG feed posts have no clickable links. Website taps are **account-level** (user insights, e.g. profile link taps). Track conversions with **UTM-tagged bio links** (`?utm_source=instagram&utm_content=<post_id>`) in site analytics. **[account-level metric name UNVERIFIED]**

### 6.2 TikTok
- **Display API v2** (`/v2/video/query/`, `/v2/video/list/`): `view_count`, `like_count`, `comment_count`, `share_count` (up to 20 IDs/request). **No saves, reach or profile visits.** **[V-doc]**
- **TikTok API for Business (organic, v1.3)** adds reach, completion and audience data for Business accounts. Exact field names are **[UNVERIFIED]**. Use the aggregator instead.

### 6.3 n8n schedule
- **Collection:** a Schedule Trigger runs daily at an off-peak minute (e.g. 05:41 Gulf time). Fetch posts that are 24 h, 72 h and 7 d old from the posts log. For each one, call **Upload-Post `getPostAnalytics`** (both platforms, one node). Optionally call the IG Graph insights directly via HTTP Request for `saved`/`shares`/`profile_visits`. Upsert into a metrics table (Google Sheets, Postgres, or n8n Data tables **[availability on your version UNVERIFIED]**).
- **Weekly loop:** a second Schedule Trigger runs Monday. Haiku 5.5 summarises top and bottom performers by **save rate** and **share rate** (the north-star metrics for a no-testimonial, education-led brand). The summary goes into the Strategist's next calendar prompt.

---

## 7. Recommended stack

Monthly costs assume ~2 posts/day (30 carousels + 30 reels, each published to IG and TikTok).

| Component | Tool (exact) | Why | Monthly cost |
|---|---|---|---|
| Orchestrator | **n8n 2.45.x self-hosted** (Docker, small VPS) | Unlimited executions; Execute Command + sidecars allowed; any community node | ~$6–12 (VPS) **[UNVERIFIED host pricing]** (Cloud Starter alt. ~$20–24) |
| Strategist LLM | `claude-opus-5-5` via `@n8n/n8n-nodes-langchain.lmChatAnthropic` v1.6 → `.agent` v3.1 | Best planning plus compliance reasoning; weekly only | ~$2–3 |
| Copywriter EN/AR | `claude-sonnet-5-5` + `.outputParserStructured` v1.3 (Adaptive thinking, 1 h cache) | Native-quality Arabic and English at mid price | ~$3–5 |
| Vision QA | `claude-sonnet-5-5` via `@n8n/n8n-nodes-langchain.anthropic` (Analyze Image) | Catches broken Arabic shaping, crop and claims | ~$3–4 |
| Utility LLM | `claude-haiku-5-5` | Hashtags, alt text, analytics digests | <$1 |
| Carousel renderer | **Gotenberg 8** (`/forms/chromium/screenshot/html`, JPEG 1080×1350) | Chromium = correct Arabic shaping/RTL + brand webfonts; free | $0 |
| Stills | **Nano Banana 2** via fal.ai | Best quality/$ for backgrounds and first frames | ~$1–5 |
| Motion (optional) | **Veo 3.1 Lite** (cheap) / **Kling 3.0 Pro** via fal.ai (premium) | Cheapest first-party i2v / best motion per $ | $0–12 (cheap) · ~$50–60 (premium) |
| Voiceover | **ElevenLabs Eleven v3** (one locked EN + one Gulf-AR voice) | Best available Arabic incl. Gulf-accented voices | ~$2–6 |
| Assembly + captions | **FFmpeg** (self-hosted) + Gotenberg-rendered caption PNGs; **Shotstack** for premium | Free; identical Arabic shaping to carousels | $0 (cheap) · ~$5 (premium) |
| Publishing | **Upload-Post** verified node `n8n-nodes-upload-post.uploadPost` (v1) | IG carousel/Reels + TikTok photo/video, public from day 1, binary upload, analytics | $16 (annual) – $24 |
| Analytics | Upload-Post `getPostAnalytics` + IG Graph insights via `n8n-nodes-base.httpRequest` v4.5 | Saves/shares/reach/profile visits on a schedule | $0 (included) |
| Storage (optional) | Cloudflare R2 or VPS disk | Only needed if you host media URLs yourself | ~$0 **[free-tier limits not re-verified]** |
| **Total, cheap tier** | | | **≈ $40–65 / month** |
| **Total, premium reels** | | | **≈ $100–130 / month** |

---

## 8. Open items to verify before build (owner: founder, 30 min)
1. Upload-Post pricing page: Basic price and whether TikTok is on the free tier.
2. Upload-Post docs: IG carousel max via their API (expect 10) and TikTok photo max.
3. Switch the IG account to **Business** and confirm TikTok is a **Business** account. This is needed for analytics.
4. ElevenLabs Voice Library: shortlist Gulf-accent voices and run a native-speaker blind test.
5. Google Gemini pricing page: confirm the Veo 3.1 Lite and Fast rates.
6. After the first n8n run: verify `lmChatAnthropic` with `claude-sonnet-5-5` + Adaptive + Structured Output Parser parses cleanly on 2.45.7.

---

## Sources
(Accessed 2026-10-30. Items marked "source code" were read directly.)

**n8n**
- npm registry n8n dist-tags: https://registry.npmjs.org/n8n
- n8n source (Agent): https://github.com/n8n-io/n8n/blob/master/packages/@n8n/nodes-langchain/nodes/agents/Agent/Agent.node.ts
- n8n source (Anthropic Chat Model): https://github.com/n8n-io/n8n/blob/master/packages/@n8n/nodes-langchain/nodes/llms/LMChatAnthropic/LmChatAnthropic.node.ts
- n8n source (Agent V3 forced tool call): https://github.com/n8n-io/n8n/blob/master/packages/@n8n/nodes-langchain/nodes/agents/Agent/agents/ToolsAgent/V3/helpers/createAgentSequence.ts
- n8n source (Structured Output Parser): https://github.com/n8n-io/n8n/blob/master/packages/@n8n/nodes-langchain/nodes/output_parser/OutputParserStructured/OutputParserStructured.node.ts
- n8n source (Basic LLM Chain): https://github.com/n8n-io/n8n/blob/master/packages/@n8n/nodes-langchain/nodes/chains/ChainLLM/ChainLlm.node.ts
- n8n PR #37954 (Anthropic thinking / parser fix): https://github.com/n8n-io/n8n/pull/37954
- n8n v2.0 breaking changes: https://docs.n8n.io/2-0-breaking-changes/
- Execute Command docs: https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.executecommand
- Verified community nodes: https://docs.n8n.io/integrations/community-nodes/installation-and-management/install-verified-community-nodes
- n8n releases (Releasebot): https://releasebot.io/updates/n8n
- n8n 2.0 overview: https://medium.com/@databytoufik/n8n-2-0-what-actually-changed-for-workflow-builders-68faedd3bb0a
- n8n pricing roundup: https://www.activepieces.com/blog/n8n-pricing-2026-plans-free-tier-costs-explained, https://costbench.com/software/ai-automation/n8n/

**Instagram**
- Content Publishing: https://developers.facebook.com/docs/instagram-platform/content-publishing
- Instagram API with Instagram Login: https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login
- Insights on IG Login API: https://developers.facebook.com/blog/post/2025/03/24/user-and-media-insights-on-instagram-api-with-instagram-login/
- IG Media Insights reference: https://developers.secure.facebook.com/docs/instagram-api/reference/ig-media/insights
- Graph API v22 changelog (impressions → views): https://developers.facebook.com/docs/graph-api/changelog/version22.0
- Graph API v25 announcement: https://developers.facebook.com/blog/post/2026/02/18/introducing-graph-api-v25-and-marketing-api-v25/
- Reels API guide (specs): https://postproxy.dev/blog/instagram-reels-api-publishing-guide/
- Carousel 20 vs API 10: https://storrito.com/resources/how-instagrams-20-slide-carousels-work-and-what-the-new-limits-are/
- Zernio IG docs (aspect ratios): https://docs.zernio.com/platforms/instagram

**TikTok**
- Photo post reference: https://developers.tiktok.com/doc/content-posting-api-reference-photo-post
- Direct post reference: https://developers.tiktok.com/doc/content-posting-api-reference-direct-post
- Content sharing guidelines (audit): https://developers.tiktok.com/doc/content-sharing-guidelines/
- Video Query API: https://developers.tiktok.com/docs/en/tiktok-api-v2-video-query
- Audit and limits overview: https://www.outstand.so/blog/tiktok-content-posting-api, https://bundle.social/blog/tiktok-api-approval

**Aggregators**
- Upload-Post TikTok guide: https://docs.upload-post.com/guides/post-to-tiktok-api
- Upload-Post n8n integration: https://n8n.io/integrations/upload-post
- n8n-nodes-upload-post (npm, source read): https://npmjs.com/package/n8n-nodes-upload-post
- Upload-Post pricing comparison: https://www.upload-post.com/pricing-comparison/
- Upload-Post analytics API: https://www.upload-post.com/social-media-analytics-api/
- Blotato n8n node: https://help.blotato.com/api/n8n/n8n-blotato-node
- Blotato TikTok API: https://www.blotato.com/api/tiktok
- Blotato analytics: https://help.blotato.com/api/analytics
- Blotato pricing: https://www.upload-post.com/blotato-pricing/, https://aifunnelinsider.com/blotato-review/
- Zernio n8n node: https://github.com/getlatedev/n8n-nodes-late
- Zernio review: https://hypertools.so/tool/zernio
- Ayrshare pricing: https://social-api.ai/blog/ayrshare-pricing-social-media-api-2026
- Postiz API: https://docs.postiz.com/public-api/introduction
- Postiz TikTok slideshow: https://postiz.com/blog/automate-tiktok-slideshow-ai-agents-postiz
- Buffer API: https://www.outstand.so/blog/buffer-api-guide-2026

**Rendering**
- Gotenberg screenshot: https://gotenberg.dev/docs/convert-with-chromium/screenshot-html
- HTML-to-image comparisons: https://rendex.dev/compare/best-html-to-image-apis-2026, https://html2img.com/articles/bannerbear-alternatives/
- Bannerbear RTL: https://bannerbear.com/blog/new-v3-editor-features-artificial-intelligence-and-more
- n8n-nodes-puppeteer: https://npmjs.com/package/n8n-nodes-puppeteer

**Video, image and voice**
- AI video pricing: https://invideo.io/blog/ai-video-model-pricing/, https://www.teamday.ai/blog/ai-api-pricing-comparison-2026, https://devtk.ai/en/blog/ai-video-generation-pricing-2026/
- Veo pricing: https://benchlm.ai/media-pricing/veo
- Kling vs Seedance (fal): https://fal.ai/learn/tools/seedance-2-0-vs-kling-3-0
- OpenAI deprecations (Sora 2 shutdown): https://developers.openai.com/api/docs/deprecations
- Sora shutdown coverage: https://techjacksolutions.com/ai-brief/openai-videos-api-sora-2-deprecated-september-2026/
- Image model pricing: https://www.linkmodel.ai/blog/cheapest-image-api, https://atlascloud.ai/blog/guides/cheapest-ai-image-generation-api-2026
- ElevenLabs API pricing: https://elevenlabs.io/pricing/api
- ElevenLabs Arabic voices: https://www.famulor.io/voices/elevenlabs/languages/ar/accents/saudi, https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-voice-catalog-v3-conversational.html
- Gemini TTS: https://docs.cloud.google.com/text-to-speech/docs/gemini-tts
- Video editing APIs: https://www.plainlyvideos.com/blog/best-video-editing-api, https://www.wireflow.ai/blog/creatomate-pricing
- Remotion license: https://www.remotion.dev/docs/license
- Remotion Lambda cost: https://remotion.dev/docs/lambda/cost-example
- HeyGen API pricing: https://www.heygen.com/blog/ai-video-generator-pricing
- Arcads pricing: https://www.eesel.ai/en/blog/arcads-ai-pricing

**Claude**
- Opus 5.5: https://platform.claude.com/docs/en/models/opus-5-5/overview
- Sonnet 5.5: https://platform.claude.com/docs/en/models/sonnet-5-5/overview
