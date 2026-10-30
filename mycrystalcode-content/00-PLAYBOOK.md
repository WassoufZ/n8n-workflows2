# My Crystal Code — Social Content Playbook (IG + TikTok, EN + AR)

The one-page synthesis of five specialist reviews (from the open-source
[agency-agents](https://github.com/msitarzewski/agency-agents) roster). The detail behind every line
is in `agency/`:

| File | Team | Use it for |
|---|---|---|
| `agency/A-growth-offer.md` | Growth Hacker · Offer Strategist · Behavioral Nudge | Offer ladder, CTAs, funnel tracking, 30-day sprint, kill/scale rules |
| `agency/B-platform-content.md` (+ `B-formulas.json`, `B-strategist-data.json`) | TikTok Strategist · Instagram Curator · Carousel Growth Engine · Short-Video Coach · Content Creator | Pillars, 8 carousel + 8 reel formulas, 40 EN/AR hooks, hashtags, 14-day calendar |
| `agency/C-design-system.md` | Brand Guardian · Visual Storyteller · Image Prompt Engineer · Inclusive Visuals | Social design system, safe zones, Arabic rules, AI image/video prompts, visual QA |
| `agency/D-compliance-governance.md` | Marketing Compliance · Creative Strategist · Automation Governance | Claims policy (EN/AR), platform + UAE rules, approval gates, kill switch, audit log |
| `agency/E-autopilot-stack.md` | Multi-Platform Publisher · Video Optimization · Orchestrator | The October 2026 tool stack, APIs, costs |

## 1. What we are selling (and what content must make obvious)

A **personalized digital reading** built from 12 questions, delivered by email in minutes.
Lite **$8.88**, Full **$18.88** (launch price, list $24.88). Nothing physical ships. You pay
**after** the questionnaire. Bilingual English/Arabic.

The five reasons a viewer won't buy, and the content answer to each (A §1):
1. *"What do I actually get?"* → show the real sample pages (Lina, always labelled fictional).
2. *"Generic AI horoscope stuff."* → show the specific questions; say plainly that AI writes from your answers.
3. *"Never heard of you."* → founder face/voice, honest "we're new, no reviews yet".
4. *"$18 for a PDF?"* → lead with Lite $8.88; upgrade later for the difference.
5. *"Crystals don't do anything."* → lead with patterns, crystals as symbolic companions.

## 2. Offer ladder and CTAs

| Tier | Ask | Where it points | Share of posts |
|---|---|---|---|
| T0 Engage | save / send / comment 1-2-3 | no link | reach posts |
| T1 Follow + free value | follow, see the sample / Crystal Library | `/` or `/crystals` | trust posts |
| T2 **Lite $8.88** (default paid CTA) | "link in bio" | `/crystal-match` | ~70% of paid CTAs |
| T3 Full $18.88 | money, pattern-under-pressure, 7-day reset only | `/quiz` | the rest |

Urgency only with a real, published end date for the launch price (set `LAUNCH_END_DATE`).

## 3. Content system

Six pillars (B): **P1** Same Behavior, Different Reasons (25%) · **P2** Which Line Is Yours? — built on the
real quiz questions (20%) · **P3** The Crystal Shortcut (15%) · **P4** Seven Centers, Read Gently (15%) ·
**P5** Inside a Reading (15%) · **P6** Giving, Receiving & the Abundance Pattern (10%).
16 formulas (C01–C08 carousels, R01–R08 reels); R05 (screen recording) and R06 (founder to camera)
are made by hand, the rest by the autopilot.

Cadence: two slots a day — **English 18:00 Dubai**, **Arabic 22:30 Dubai** (prime time in the Gulf).
Weeks 1–2 warm-up: each post goes to one platform (the queue's `platforms` column); from Day 15 every
post goes to both.

## 4. Look and feel

Every slide is unmistakably MCC (C §1): night-scene background with purple/teal auras, Cormorant
headline with a gradient last word, one owned geometry mark, teal mono eyebrow, cream "report page"
slides. Arabic uses El Messiri / IBM Plex Sans Arabic, right-to-left, Eastern digits for counters,
Latin digits for prices. AI imagery: hands and objects, no faces, no religious symbols, no generated
text. Previews: `examples/preview-*.jpg`.

## 5. Non-negotiable rules (D)

- Never: heal / cure / treat / anxiety / depression / attract money / manifest / destiny / guarantee /
  testimonials or review counts that don't exist / fake urgency.
- **Arabic and anything aimed at the UAE/GCC: no astrology, horoscopes or birth chart at all.** No magic,
  evil eye, envy or fate. (UAE advertising standards prohibit astrology advertising.)
- Every caption ends with the disclaimer + "Made with AI". AI labels on in both apps.
- A human approves every post (Telegram) — all Arabic posts for at least 90 days. TikTok posts land as
  drafts; you tap Post after checking the AI-generated and "Your brand" toggles.
- Max 2 posts a day, ≥ 4 h apart. No automated likes, comments or DMs. `/pause` stops everything.

## 6. Targets and the learning loop

30-day sprint (A §4): first sale by Day 10, 10 sales by Day 30. Planning math: ~3% of site clicks buy,
so ~330 clicks for 10 sales. **Days 1–5 the founder personally messages her own network** with the
sample and the Lite link — the first sale almost always comes from there, not the algorithm.

Judge every post against the account's own median after 72 h. Sales > link clicks > profile visits >
shares/sends > saves > views. The weekly review workflow writes "do more / do less" into the
Insights tab, and the copywriter reads it before every post.

## 7. Fixes on the website that content cannot make (owner/developer)

From reading the site code (A §0, §3) — none of these were changed:
1. **UTMs are stripped before GA4** (`client-public/src/utils/analytics.ts`), and no table stores them, so no
   sale can be traced to a post. Keep `utm_*` on landing routes, store first-touch UTMs in Stripe
   payment metadata, set `VITE_GA4_MEASUREMENT_ID`. Until then, the link tracker workflow counts clicks.
2. **The Arabic page has no sample reading.** Render an Arabic Lina sample — the biggest single lever for
   Arabic sales (and it unlocks the C05 carousel in Arabic).
3. **No reminder for people who finish the quiz but don't pay.** Add one email with consent.
4. **Commit to an end date** for the launch price, or don't use urgency.
5. Test the full purchase inside the Instagram and TikTok in-app browsers.
6. Confirm whether the account/founder needs a **UAE Advertiser Permit** (mandatory since ~Feb 2026).
