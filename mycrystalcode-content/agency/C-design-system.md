# C. My Crystal Code — Social Design System (IG / TikTok, EN + AR)

Team: Brand Guardian · Visual Storyteller · Image Prompt Engineer · Inclusive Visuals Specialist.
Sources: `01-brand-brief.md`; `client-public/src/styles/tokens.css` (canonical, Salma 2026-07-15) and `index.css`; `components/brand/*.tsx`; `components/*.svg`; `docs/brand-assets.md`; `design_handoff_landing_quiz/`; hero art; `public/sample/lina-0*.webp`.

> **Source conflicts, resolved:** the handoff README is older. It uses a 135° three-stop gradient, Tajawal and a Lite price of $4.44. **tokens.css and the brief win**: the 140° four-stop gradient, El Messiri / IBM Plex Sans Arabic, and Lite at **$8.88**. Tajawal stays inside the PDF report only.

---

## 1. Social adaptation of the brand

### 1.1 What makes it unmistakably MCC (the five signatures)
1. **Night-scene base** `#0a0a1a` with the three-aura "cosmic field" (purple top-left, teal bottom-right, violet centre) plus a sparse starfield.
2. **Cormorant Garamond headline with a gradient last word.** This copies the report ("Your Energy Center *Map.*"). EN only: Cormorant italic for questions.
3. **One owned geometry mark per slide**, drawn from Seed of Life, Flower of Life, Metatron's Cube, Transmutation or Aligned Chakras. It is always the brand SVG, never AI-drawn.
4. **Tracked uppercase mono eyebrow** in teal-light `#8fd6d0` (dark slides) or purple `#66369b` (paper slides).
5. **Report "paper" look** on content slides: `#fafaf7`, a 10px brand-gradient top rule, and a giant faint numeral.

### 1.2 Tokens for social (use these only; hex outside this list fails QA)

| Role | Dark "Scene" slide | Light "Paper" slide |
|---|---|---|
| Background | `#0a0a1a` + `--scene-base` 158° + `--aura-scene` | `#fafaf7`; panels `#f3f0ea`; cards `#ffffff` |
| Headline | `#fdfcff`; emphasis word `--display-gradient` (118°, `#ffffff→#8fd6d0→#b7a3e6→#8a6dc9`) | `#2a1f3d`; emphasis word `--brand-gradient` clipped to text |
| Body | `rgba(242,238,248,.72)` (min .72) | `#2d2d2d` |
| Muted / meta | `#b7a3e6` | `#555555` |
| Eyebrow | `#8fd6d0` | `#66369b` |
| Hairlines | `rgba(255,255,255,.12)` | `#e8e3d8` / `#d8d2c5` |
| Accent glow | `--halo-crystal`, `--orb-purple`, `--orb-teal` | `--aura-paper` at ≤12% alpha only |
| CTA warmth | `--aura-dawn` (amber/rose from the bottom), CTA slide only | — |

**Brand gradient** `linear-gradient(140deg,#180c33,#43206f 33%,#7b62bd 66%,#53b9c8)`. The tokens rule applies: **once per slide, with intent.** Use it for the top rule, the emphasis word, the CTA pill, the logo or a featured-card hairline. **Never as a full-bleed background**; large colour comes from the radial auras.

**Chakra-state palette** (care `#e2604c`, working `#e88a2d`, rising `#d9a51a`, flowing `#5cc4cc`, chips `#fae3df/#faeadb/#f9f0d9/#def2f3`) and the **chakra identity hues** (root `#c0533f`, sacral `#e88a2d`, solar `#d1a72e`, heart `#4fae7a`, throat `#3f8fc0`, third-eye `#4a3fa0`, crown `#8a6dc9`) appear **only on Layout 6**.

**Glow rule:** every halo is a brand hue blended toward warm paper or transparent. A slide fails if more than 25% of its area is a desaturated lavender-grey (approx. HSL 250–280°, S < 25%, L 70–90%).

### 1.3 Fonts

| Use | EN | AR |
|---|---|---|
| Display | Cormorant Garamond 600 (500 italic for questions) | El Messiri 600/700, never italic |
| Body | Inter 400/500/600 | IBM Plex Sans Arabic 400/500/600 |
| Meta / eyebrow / handle | Roboto Mono 500 (the pinned member of `--font-meta`; `ui-monospace` is unreliable in headless Chrome) | IBM Plex Sans Arabic 500, no uppercase |

Self-host all fonts as WOFF2 in the renderer. Use `document.fonts.ready` before the screenshot, or a tofu/fallback font will slip through.

### 1.4 Small-phone legibility (1080px canvas shown at ~360–390pt, scale ≈ 0.34)
- **Type floor: 28px** (handles and legal only). **Body floor: 34px.** Cormorant floor: 56px, because its x-height is small.
- Contrast: **body ≥ 7:1, headline ≥ 4.5:1, eyebrow/meta ≥ 4.5:1.** Measured values:
  - `#fdfcff` on `#0a0a1a`: 19:1 ✓
  - `#b7a3e6` on `#0a0a1a`: 8.8:1 ✓
  - `#8fd6d0` on `#0a0a1a`: about 11:1 ✓
  - `#66369b` on `#fafaf7`: 7.8:1 ✓
  - `#8a6dc9` on dark: 4.8:1 (headline only)
  - `#8a6dc9` on paper: 3.9:1 (≥ 72px display only)
  - **`#14b8a6` on paper: 2.4:1 ✗.** Never use teal as text on paper.
  - **White on the teal end of the brand gradient `#53b9c8`: 2.3:1 ✗.** Text may sit only over the first 66% of the gradient (stops 1–3 measure ≥ 4.8:1).
  - State colours on paper are 2.2–4.0:1, so they are **dots, bars and chips only**. Their labels stay ink.
- Text over AI imagery always gets a scrim: `linear-gradient(180deg, rgba(10,10,26,0) 0%, rgba(10,10,26,.78) 100%)` under the text block. Contrast must be measured on the darkest and lightest pixels behind the glyphs.
- Line length: EN body ≤ 42 characters per line; AR ≤ 38.

### 1.5 Safe zones (px)

| Surface | Keep clear | Text-safe box |
|---|---|---|
| **IG feed carousel 1080×1350** | Profile grid crops the cover to 3:4 = **1012×1350** (−34px each side). Carousel counter overlay top-right, about **x 930–1056, y 20–90**. Tag icon bottom-left, about **x 20–96, y 1254–1330**. | **x 96–984, y 110–1230**; footer band **y 1236–1296** |
| **IG Reels 1080×1920** | Top **270** (14%: header, camera). Bottom **672** (35%: caption, audio, username). Sides **65**. Action rail about **x 950–1080, y 1000–1700**. Feed preview crops to 4:5 = **y 285–1635**; grid crops to 3:4 = **y 240–1680**. | **x 65–950, y 270–1248** |
| **TikTok 1080×1920** | Top **160** (tabs, search). Bottom **480** (caption, sound, nav). Left **60**. Right **140** (rail about **y 760–1500**). | **x 60–940, y 160–1440** |
| **Universal reel box (use this)** | Intersection of the above plus margin | **x 90–900, y 270–1248** (810×978). Captions: **y 1030–1240**. Hook text: **y 300–720**. Cover title: **y 420–1240**. |

### 1.6 Arabic RTL rules
- Root `<html lang="ar" dir="rtl">`. Templates use **only logical properties** (`inset-inline-start`, `padding-inline`, `text-align:start`), so one template serves both languages.
- **Alignment:** EN is left-aligned except on cover, quote and CTA slides (centred). AR is right-aligned, with the same centred exceptions.
- **Mirroring:** logo and handle swap sides; the chakra spine moves to the right edge; scale and progress bars fill from the right (`transform-origin:right`); arrows and chevrons get `scaleX(-1)`; the sample-image tilt reverses (+2°). Geometry glyphs, crystals and photos **are not mirrored**.
- **Size:** El Messiri = Cormorant px × **0.82**, line-height **1.35**. Plex Arabic = Inter px × **1.0**, line-height **1.7**.
- **No letter-spacing on Arabic.** This overrides the site's 0.06–0.08em eyebrow tracking, which opens visible gaps in letter joins at 30px+. No italic and no fake uppercase. Add `padding-block:.15em` on gradient-clipped Arabic words so diacritics and descenders aren't cut.
- **Numerals** follow the site's content files:
  - Eastern Arabic-Indic (`٠١ ٠٢ ٠٣`, `٧ مراكز`, `٧ أيام`) for counters, list numbers, steps and days.
  - **Latin for prices** (`$8.88`, `$18.88`, as on the AR pricing cards), plus handles and URLs.
  - Wrap every Latin run in `<bdi>`, or use `unicode-bidi:isolate`, so `$` and `@` don't jump.
- **Character budgets:** AR text ≤ 90% of the EN character limit. The template must still fit EN limit × 1.1 to allow for feminine-form expansion.
- **Swipe cue:** the chevron follows reading direction (→ EN, ← AR). Check once on a device with Arabic UI.

---

## 2. Carousel template set (1080×1350)

**Global grid:**
- Margins: 96 inline, 110 top. Content box **888×1120** (y 110–1230). 12 columns × 52px, 24px gutters.
- Footer band y 1236–1296:
  - Logo `mcc-icon-gradient.svg` (dark slides: `mcc-icon-white.svg`) at **36×50**, at inline-start.
  - Wordmark "My Crystal Code" in Cormorant 600, 30px.
  - Handle `@my.crystal.code` in Roboto Mono 500, 28px, tracking 0.08em, at inline-end.
- Eyebrow at y 110: mono 30px, tracking 0.22em, format `02 / 08 · LABEL`. **Never place anything in the top-right 150×110** (IG counter).

**Fit-to-text contract:**
- n8n sends `{lang, layout, fields…}`. A pre-render Code node counts graphemes and assigns `data-tier="s|m|l"`, which maps to the font sizes below.
- **Text over max is rejected and sent back to the copy LLM for shortening. It is never shrunk below the floor.**
- Every text block uses `text-wrap:balance; overflow-wrap:normal; hyphens:none; widows/orphans:2`.

**Default rhythm:** 1 Scene → 2–4 Paper → 5–6 Scene → 7 Paper → 8 Scene. Never place more than 2 identical surfaces in a row.

### L1 — Cover / Hook (Scene). Must stop the scroll.
- **Background:** `#0a0a1a` + aura-scene (purple orb 1100×820 at 12%/4%, α .42; teal 1000×900 at 92%/96%, α .14) + starfield at 60%.
  - Ghost Seed of Life: 980px, stroke 0.8, opacity **.10**, centred at y 470, rotation 0–15° random.
- **Focal point:** one luminous object centred at **y 300–560** (a hero crystal cut-out with `--halo-crystal`, or the gradient Transmutation glyph at 260px). It is the brightest thing in the frame; a single bright point on near-black is what stops a thumb in a pastel wellness feed.
- **Eyebrow pill** at y 610: `.mcc-pill` style, border `rgba(138,109,201,.4)`, text `#8fd6d0`, 28px mono, max **32 chars** (for example "FOR THE PATTERN EXPLORER").
- **Headline** block y 680–1080, centred, Cormorant 600, line-height 1.04, tracking −0.01em, max 4 lines. **Last 1–3 words in `--display-gradient`.**
  - Tiers: ≤ 28 ch **132px** / 29–44 ch **112px** / 45–60 ch **96px**. **Max 60 ch.**
  - AR: El Messiri 108 / 92 / 80px, max 54 ch.
- **Sub-line** y 1100: Inter 400, 36px, `rgba(242,238,248,.72)`, max **70 ch**, 2 lines.
- **Swipe cue** y 1180: "Swipe" plus chevron, mono 28px, `#b7a3e6`.
- Footer: logo and wordmark only (no handle).
- The headline must be a **second-person question or an open loop**: "You know what you do. But do you know what's *driving it?*"

### L2 — Statement (Paper)
- 10px brand-gradient top rule (y 0–10).
- Giant numeral `02`: Cormorant 600, 360px, colour `#2a1f3d` at 6%, inline-end, y 60.
- Statement: Cormorant 600, y 260–900, start-aligned, line-height 1.1.
  - Tiers: ≤ 60 ch **88px** / 61–100 ch **72px** / 101–140 ch **60px**. **Max 140 ch.**
  - Emphasis word in `--brand-gradient`.
- Support line: Inter 400, 38px, `#2d2d2d`, max **120 ch**, y ≥ 940.
- Motif: Seed of Life 220px outline in `#66369b` at 14%, bottom inline-end corner (x 760, y 980).

### L3 — List (Paper; Scene variant allowed)
- Title: Cormorant 600, 72px, max **48 ch**, 2 lines, y 170.
- **3–5 items.** Each row is 150–190px tall with a hairline `#e8e3d8` between rows.
  - Number disc 64px: Cormorant 600, 30px, 1px border `#d8d2c5`, purple numerals; AR uses `٠١…`.
  - Item: Inter 500, 40px, `#2a1f3d`, max **56 ch**, 2 lines.
  - Optional sub-text: Inter 400, 32px, `#555`, max 60 ch.
- 5 items → 34px tier with 60 ch max.
- Motif: Aligned Chakras glyph at 64px beside the title (brand gradient, not state colours).

### L4 — Quote-question (Scene)
- Background: scene + **orb-teal** 900px centred at y 520.
- Large opening quote mark: Cormorant 600, 220px, `--display-gradient`, opacity .9, at y 200.
- Question: **Cormorant 500 italic** (AR: El Messiri 600 upright), centred, y 400–980.
  - Tiers: ≤ 70 ch **84px** / 71–110 ch **68px**. **Max 110 ch.**
- Attribution / prompt: mono 28px `#8fd6d0`, for example "SIT WITH THIS · SAVE IT FOR LATER", max 40 ch.
- No logo besides the footer.

### L5 — Split comparison: "Same behavior. Different reasons." (Scene)
- **Top band (y 140–420):**
  - Eyebrow "SAME BEHAVIOR".
  - Behaviour in Cormorant 600, 76px, max **40 ch** (for example "Struggling to say no.").
  - A **1.5px brand-gradient hairline** at y 440, spanning 888px.
- **Lower area (y 480–1200):** label "DIFFERENT REASONS" (mono 28px, `#b7a3e6`), then **3 stacked glass cards**.
  - Each card: 888×200, radius 20, `rgba(255,255,255,.04)`, 1px `rgba(255,255,255,.11)`, gap 24.
  - Left of each card: a 72px owned glyph (Seed / Metatron / Transmutation), so each "person" has a distinct mark. Faces are never used.
  - Reason: Inter 500, 38px, `#fdfcff`, max **64 ch** per card, 2 lines.
  - Leading edge: a 4px gradient accent bar (inline-start; it moves to the right in AR), echoing the quiz's selected card.
- **2-up variant:** two cards 430×560 side by side, max 90 ch each.

### L6 — Energy-center slide (Scene; the only slide allowed the state palette)
- **Spine:** vertical line at x 150 (AR: x 930), y 230–1130, 3px, opacity .55. Its gradient runs crown→root using the chakra identity hues (exact `.mcc-spine`).
- **7 nodes:** 12px core + 4px ring at 28% + 18px glow, every 150px.
- **Per row:**
  - Centre name: Cormorant 600, 44px.
  - **State chip**: a dot in the state colour plus a label in ink on a chip filled with that state colour at 16% alpha. On paper, use the `-chip` hex instead.
  - One-line note: Inter 400, 30px, `rgba(242,238,248,.72)`, max **38 ch**.
- **Single-centre variant:**
  - One node 120px with glow.
  - Name at 96px.
  - The report's **scale bar** at 888×18, radius 9: segments care→rising→flowing→working at chip tints, a white 30px pin, and labels "SHUTDOWN" / "OVER-EFFORT" (mono 26px).
  - Body at 38px, max 160 ch.
- **Mandatory footnote** (Inter 28px, `#b7a3e6`): "Reflective, not a medical measurement." / AR: "تأمّلي، وليس قياسًا طبيًا."

### L7 — Sample-reading showcase (Paper)
- Title y 130: "Inside a reading" in Cormorant 600, 72px, max 40 ch, gradient last word.
- **Frame:** the real `lina-0X.webp` at **660px wide** (1.13× of the 586px source; never above 1.25×).
  - Crop: top-anchored window 660×760 (`object-fit:cover; object-position:top`) with a 120px fade to `#fafaf7` at the bottom.
  - Card: radius 28, 1px `#d8d2c5`, shadow `0 30px 70px rgba(42,31,61,.18)`, rotation −2° (AR +2°).
  - Position: centred at x 540, y 300–1060.
  - **Two-page variant:** pages 01 and 03 at 470px wide, fanned −5°/+4°, overlapping 120px, echoing the hero-art card fan.
- **Callout chip** pointing into the page (glass, Inter 500, 30px, max 34 ch), for example "Your 7 centers, mapped."
- **Mandatory label** y 1130 (mono 28px, `#555`): "ILLUSTRATIVE SAMPLE · LINA IS FICTIONAL". AR: "عيّنة توضيحية · لينا شخصية خيالية".
- *Action for the founder:* re-export the six pages at 1172px wide (2×) for crisper social use.

### L8 — CTA / End (Scene + `--aura-dawn`)
- Logo `mcc-icon-gradient` 88×121 at y 150, with `--halo-crystal`.
- Tagline y 320: "My Crystal Code | *Decode Yours*" in Cormorant 600, 64px, gradient on "Decode Yours".
- **Price block** y 470–820, two glass cards (420×330, gap 48):
  - **Lite:** "$8.88" in Cormorant 600, 120px, `#fdfcff`; line "Your energy snapshot + 4 crystals" in Inter 30px, max 34 ch.
  - **Full:** featured card (gradient hairline via `.mcc-featured`). "$18.88" at 120px, struck "$24.88" in Inter 34px `#b7a3e6`, and "LAUNCH PRICE" in mono 26px `#8fd6d0`.
  - Single-offer variant: one card 888×300.
- **CTA pill** y 900: 640×112, radius 100. Fill: `--btn-gradient` **reversed** (`135deg,#66369b,#8a6dc9 60%,#14b8a6`), so the white label sits over purple/violet (≥ 4:1) rather than teal (2.5:1). Label: Inter 600, 40px, max 22 ch, "Begin my reading →".
- **Handle** y 1060: `@my.crystal.code` in Roboto Mono 500, **44px**, `#fdfcff`. Below it, "mycrystalcode.com · /ar" in 30px `#b7a3e6`.
- Footer: "Reflective guidance, not medical, psychological or financial advice." (Inter 26px, `rgba(242,238,248,.6)`). Legal is the only text allowed at 26px.

---

## 3. Reel visual language (1080×1920)

**Cover frame** (also exported as the custom cover):
- Scene background + ghost Flower of Life 1000px at 8%.
- Hero object centred at y 560–860.
- Title in the cover-safe band **y 900–1240**: Cormorant 600, **120px** (≤ 24 ch) or **96px** (≤ 40 ch), centred, max 3 lines, gradient last word.
- Eyebrow pill at y 860.
- Nothing essential outside **y 420–1240** (the IG 3:4 grid crop, 4:5 feed crop, and TikTok/IG UI are all satisfied).
- A series number such as "PATTERNS · 03" in mono 30px gives the grid a consistent look.

**On-screen captions:**
- Font: Inter 600, **56px** (AR: IBM Plex Sans Arabic 600, 56px), line-height 1.25, `#fdfcff`.
- Box: **x 150–900** (centre 525, clear of the right rail in both mirrored and unmirrored UI), baseline area **y 1030–1240**.
- Max **2 lines**, **5 words / 28 chars per line** (AR **4 words / 24 chars**).
- Each caption stays on screen ≥ 0.9s, at a reading pace of ≤ 3 words/s.
- Background: pill `rgba(10,10,26,.55)`, radius 20, padding 14/24; or text-shadow `0 0 24px rgba(10,10,26,.6)` on dark footage.
- **Active-word highlight:** colour shift to `#8fd6d0`. No bounce, no scale-pop, no emoji.
- Hook text (first 2s): Cormorant 600, 96px, y 300–720, max **7 words**.

**Motion style** (derived from the tokens' keyframes, so the reels move like the website):
- Ambient loops: breathe (scale 1→1.04, 6s), drift (−3% y, 24s), crystal float (−14px, 7s), ghost-geometry rotation (150s; 30s for the Transmutation chapter mark).
- Text entrances use `mcc-fadein`: opacity 0→1 and translateY 10→0 over **0.6s `cubic-bezier(0.22,1,0.36,1)`**. Stagger 80ms per line. Exits are 0.3s fades.
- Camera in AI video: slow push-in ≤ 5% per 5s, gentle parallax, macro rack focus, orbit ≤ 15°.
- **Banned:** whip pans, shakes, glitch, RGB split, speed ramps, zoom punches, flashing above 3 Hz.

**Transitions:**
1. Soft cross-dissolve, 12–16 frames at 30fps.
2. **Aura bloom:** a purple→teal radial light swells to cover the frame (0.5s) and resolves into the next shot.
3. **Transmutation wipe:** the hexagram rotates 60° while scaling 0.6→1.4 and acts as a matte. Use it for chapter breaks only, max 2 per reel.
4. Hard cut, only on a beat, for the hook→first point transition.

**Colour grade:**
- Black point lifted to `#0a0a1a` (never 0,0,0) so overlays merge with footage.
- Shadows lean ink-violet (hue ≈ 265°).
- Highlights are **warm paper** (≈ 3500–4000K, toward `#fafaf7`), never cyan-white.
- Midtone accents: purple `#66369b` / teal `#14b8a6`.
- Saturation −10% overall, skin protected (no purple cast on skin).
- Film grain 3–4%, soft halation on highlights. Purple/teal glows must stay saturated jewel tones, not grey haze.

**12 reusable b-roll scenes:**
1. Raw rose quartz turning slowly on a warm linen surface; light passing through it.
2. Macro of an amethyst geode interior with a rack focus across the points.
3. A row of four tumbled stones being placed one by one (the "four-crystal protocol").
4. Hands writing in a journal at night by a warm lamp, with a crystal beside the page.
5. Fingertips tracing a printed Seed of Life (owned SVG composited, not generated).
6. Seven soft points of light rising along a vertical line in darkness (energy centres, abstract).
7. Ink drop blooming in water in violet and teal (a pattern forming).
8. Thread unwinding from a tangled knot into a straight line (pattern metaphor).
9. Phone on a nightstand lighting up with an email notification, the screen blurred; a cup of tea steaming.
10. Sand ripples / a cymatics pattern settling into order.
11. Gulf-home morning: sheer curtain, sunlight moving across a majlis cushion and a small crystal bowl.
12. Night sky timelapse with starfield, fading into the brand aura (the bridge to the CTA end card).

---

## 4. AI image / video prompt style guide

### 4.1 Master style suffix (append to every prompt)
> `— editorial fine-art photography, deep ink-violet night atmosphere (near-black #0a0a1a to #1a0f30), warm paper-white key light around 3500K, jewel-toned royal-purple and crystal-teal rim glow that blends toward warm white, rich clean blacks, gentle 35mm film grain, soft halation, shallow depth of field, calm, intimate, premium, uncluttered, generous empty space in the {upper third | centre band} for text, {4:5 | 9:16}`

### 4.2 Negative list
Use it as a negative field where the model supports one; otherwise phrase it as "avoid …".
- **Colour:** pale lavender-grey haze, misty lilac wash, pastel fog, washed-out purple, grey glow, cyan-white highlights, neon, cyberpunk, rainbow gradients, oversaturated chakra rainbow.
- **Symbols:** Om/Aum, Buddha or deity statues, Hindu/Buddhist iconography, bindi as decoration, lotus-throne imagery, mosque, crescent, Quranic or any scripture, prayer beads/misbaha, crosses, hamsa, evil-eye charms, tarot, zodiac wheels, AI-generated sacred geometry (owned SVGs are composited instead).
- **Text:** any text, letters, fake Arabic script, logos, watermarks, signage.
- **Anatomy:** extra or fused fingers, warped hands, uncanny or waxy faces, glowing eyes, clone faces, frontal close-up faces in video.
- **Tone:** levitation, cosmic-goddess clichés, sexualised poses, orientalist "harem/desert-exotic" tropes, costume-as-prop, stock smiles, medical imagery (pills, stethoscopes, hospital), cash piles or gold coins, fear or darkness-as-threat.

### 4.3 Inclusion rules
- **Hands and partial figures are the default subject.** Faces appear only out of focus, in profile beyond 60°, or cropped below the eyes.
- Rotate across Gulf/Arab, South Asian, East Asian, African, Latina and European subjects, ages 25–60, with different body types. Name skin tone explicitly and ask for "natural, accurately exposed skin tone".
- **Gulf modest dress is depicted as everyday life.** For example: "black abaya with a loosely draped shayla, fabric falls naturally over the shoulder". Modest sleeves are the default for every subject; this suits Gulf placement. No jewellery stacks as "exotic" shorthand.
- **Interiors are specific:** contemporary Gulf apartment, majlis cushions, mashrabiya-patterned light. No desert-camel clichés.

### 4.4 Fifteen ready prompts (append the 4.1 suffix)

**Crystals**
1. *Rose quartz heart:* "A raw, unpolished rose quartz cluster on warm cream linen, single warm key light from the left, a soft violet rim glow behind it, slow dust motes in the light." Motion: *"slow 15° turntable orbit, light caustics drift across the linen."*
2. *Four-stone protocol:* "Four tumbled stones — rose quartz, citrine, blue lace agate, smoky quartz — in a gentle arc on dark slate, overhead view, each with a soft pool of warm light." Motion: *"camera pushes in 4%, light passes over each stone in turn."*
3. *Amethyst interior:* "Macro inside an amethyst geode, crystal points catching warm light, the depths falling to ink-violet, a hint of teal reflection on one facet." Motion: *"rack focus front to back, subtle sparkle on facets."*
4. *Citrine sunrise:* "A citrine point standing on a windowsill of a modern Gulf apartment at dawn, mashrabiya-patterned shadows on the wall, honey light through the stone." Motion: *"the shadow pattern slides slowly across the wall."*

**Chakra / energy (abstract, never iconographic)**

5. *Seven lights:* "Seven soft orbs of light stacked vertically in darkness, a subtle warm-to-cool progression, connected by a faint luminous thread, no human figure, no symbols." Motion: *"orbs brighten one by one from bottom to top, slow breathing pulse."*
6. *Silhouette alignment:* "A seated person seen from behind in soft shadow, modest long-sleeved clothing, a faint vertical column of warm-violet light along the spine, room in deep ink tones." Motion: *"light rises gently along the spine; fabric stays still; no face visible."*
7. *Heart-centre warmth:* "Close crop of two hands resting over the centre of the chest on a soft knit sweater, warm light glowing between the fingers, a medium-brown skin tone accurately exposed." Motion: *"slow breath rises and falls, glow pulses at 6-second rhythm."*

**Pattern metaphors**

8. *Ink bloom:* "A single drop of violet ink blooming in clear water against near-black, teal tendrils curling at the edges, macro." Motion: *"ink unfurls slowly and organises into a symmetrical bloom."*
9. *The knot:* "A tangled silk thread in deep purple on warm paper, one end pulled straight, overhead macro." Motion: *"the knot loosens and the thread glides into one straight line."*
10. *Ripples to order:* "Fine sand on a dark plate forming concentric cymatic ripples, warm grazing light." Motion: *"chaotic grains settle into a clean geometric pattern."*
11. *Two paths, same step:* "Three pairs of feet in different shoes — sandals, sneakers, low heels, diverse skin tones — paused at the same doorway threshold, warm light beyond." (pairs with L5) Motion: *"each pair hesitates, then one shifts weight forward."*

**Hands / journaling**

12. *Night journaling:* "Hands of a Gulf Arab woman, the sleeve of a black abaya visible, writing in a linen journal by a warm brass lamp, a small amethyst beside the page, the page text illegible and out of focus." Motion: *"pen moves naturally, lamp flame flickers softly, fabric drapes and moves realistically."*
13. *Morning ritual:* "An East Asian man in his 40s, hands only, placing a smoky quartz on an open notebook next to a steaming cup of karak tea, soft window light." Motion: *"steam curls upward, hand withdraws slowly."*
14. *Receiving:* "Two hands of an older Black woman, palms open and upturned, a rose quartz resting in them, warm light falling in from above." Motion: *"fingers close gently around the stone, light warms."*
15. *Reading arrives:* "A phone lying face-up on a majlis cushion, the screen a soft blurred glow in violet and teal (no readable UI), hands of a South Asian woman in a long-sleeved kurta reaching for it, evening lamp light." Motion: *"the screen brightens, the hand lifts the phone, slow push-in."*

### 4.5 Model notes
- **Flux (1.1 / Kontext):** no negative field, so append "avoid: …" in natural language. Guidance 3–3.5. Request 896×1120 (4:5) or 768×1344 (9:16), then upscale. Flux follows hex codes loosely; keep the descriptive colour words.
- **Imagen (3/4):** long natural-language prose works best. Recent versions dropped the negative-prompt parameter, so write exclusions as positive constraints ("clean blacks, no text anywhere"). Aspect presets: 3:4 for carousels (crop to 4:5), 9:16 for reels.
- **GPT-image:** strongest at following instructions but drifts toward bright, clean light. Repeat "near-black night atmosphere" and "no text, no lettering". Use the `background:opaque` and `quality:high` settings. It is the most likely to generate unwanted text, so check gate B4.
- **Kling (2.x i2v):** has a negative-prompt field, so paste 4.2 there. Use 5s clips, cfg ≈ 0.5. **The motion prompt describes motion only.** Avoid faces in frame.
- **Veo (3):** supports a negative prompt. Set audio off, or generate ambient sound with no voice or music. 8s at 9:16. Describe the physics of fabric, hair and steam.
- **Runway (Gen-4):** no negative field. The text prompt should describe **only camera and subject motion**; re-describing the image causes drift. Keep motion ≤ "slow / gentle".
- **Pipeline rule:** generate a still → run the vision QA gate → animate. Never use text-to-video for hero shots. Composite the owned geometry SVGs and all text in post, never inside the model.

---

## 5. Brand-guardian QA gate (n8n)

**Gate A — deterministic** (Code node, before render). Hard fail = regenerate copy.
- **A1** Every field ≤ its layout's max characters (EN; AR ≤ 0.9×).
- **A2** Hex values ⊂ the §1.2 allowlist; the state palette is used only when `layout == L6`.
- **A3** Computed contrast meets the §1.4 ratios for every text/background pair.
- **A4** Copy lint, all hard fail:
  - claims such as `heal|cure|treat|anxiety|depression|attract money|guarantee|manifest wealth`
  - testimonial-style quotes
  - "Lina" without the "fictional" label
- **A5** Prices exactly `$8.88`, `$18.88`, `$24.88` (struck). AR prices are Latin inside `<bdi>`.
- **A6** `lang/dir` set; fonts loaded (`document.fonts.check`) for all four families.

**Gate B — vision LLM** on the rendered PNG plus a JSON spec (layout, lang, expected text).
- Prompt: *"You are MCC's brand guardian. Evaluate this rendered slide against each item. Answer strictly as JSON."*
- Output: `{"items":[{"id":"B1","pass":true,"note":""},…],"verdict":"pass|fail"}`
- Any **[H]** fail = block and re-render. Two or more **[S]** fails = block.

| ID | Check | Sev |
|---|---|---|
| B1 | All expected text present, exact, unclipped, not overflowing its box; no ellipsis | H |
| B2 | No text, logo or key object inside the reserved zones: top-right 150×110 (carousel) / outside the universal reel box (reels) / within 34px of left/right edges (covers) | H |
| B3 | Every text line is legible at a 360px-wide thumbnail (simulate a downscale to 33%) | H |
| B4 | No stray, garbled or AI-generated text/letters/script in imagery | H |
| B5 | Arabic: right-aligned or centred as specified, letters joined (no gaps or isolated forms), no tofu boxes, `$`/`@` runs not displaced, counters in Eastern digits | H |
| B6 | Background is near-black scene or warm paper; **no pale lavender-grey or misty lilac wash covering > 25% of the slide** | H |
| B7 | Brand gradient appears at most once and never as a full-bleed background; no text sits over its teal end | S |
| B8 | Exactly one owned geometry/logo mark style used; no distorted logo (aspect 500:690 kept) | S |
| B9 | Display font is a high-contrast serif (EN) / El Messiri (AR); body is a clean sans; no system fallback look | H |
| B10 | Chakra rainbow or state colours appear only on an energy-centre slide | S |
| B11 | No religious or cultural symbols (Om, deities, crescent, scripture, hamsa, cross, prayer beads) | H |
| B12 | People: hands/partial figures dignified, correct anatomy (5 fingers), no uncanny or waxy faces, no clone faces, modest and non-sexualised, not exoticised | H |
| B13 | No medical, money-pile or fear imagery; no implied guarantee in visuals | H |
| B14 | Sample slides show the "illustrative sample / fictional" label; energy slides show the "not a medical measurement" footnote; CTA shows the disclaimer | H |
| B15 | Footer: logo and handle present and readable (except L1/L4 per spec), mirrored sides in AR | S |
| B16 | One clear focal point; text block does not compete with an equally bright image area | S |
| B17 | Glows are saturated purple/teal or warm amber; highlights warm, not cyan-white | S |
| B18 | Reels: caption ≤ 2 lines, inside y 1030–1240, readable against footage (pill or shadow present) | H |
| B19 | Cover (L1 / reel cover): headline is the largest element and reads in < 2 seconds; gradient emphasis word present | S |
| B20 | Overall impression "calm, premium, intelligent", not loud, hype-y or woo-woo (justify in the note) | S |

Log every verdict, with the slide hash, to an n8n data table. If the same B-item fails 3 times in 7 days, alert the human for a template fix, not more retries.
