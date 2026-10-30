# B. Platform Content System: Instagram + TikTok, English + Arabic

Prepared by: TikTok Strategist, Instagram Curator, Carousel Growth Engine, Short-Video Editing Coach, Content Creator (The Agency).
Client: My Crystal Code (MCC). Inputs: `01-brand-brief.md`, plus a read-only review of the site source: approved landing copy (EN/AR), the 12 quiz questions (EN/AR), the Crystal Library (18 live stones), the founder's approved center lessons (2026-10-11), and the report's pattern and center-state labels.
Companion files: **A** (offer, CTA lines, UTMs, comment-to-DM), **C** (layouts L1-L8, safe zones, b-roll scenes, AI prompt style), **D** (claims policy, regional rules, gates, rate limits). Where they overlap, **D wins on compliance, A on CTAs and links, C on visuals.** This document is the content system that sits between them: what to post, in which structure, with which words.

Machine-readable files (generated from the same source, so they always match this document):
- `B-formulas.json`: the 16 formulas as a JSON array (the appendix below).
- `B-strategist-data.json`: pillars, CTA tiers, the 40 bilingual hooks, variable banks (behaviors, centers, crystals, patterns, money scenarios), hashtags, keywords, posting slots and the 14-day calendar.

---

## 0. How the n8n strategist node uses this system

**Daily selection (one run per slot):**
1. **Pillar by deficit.** Compute each pillar's share of the last 14 days of posts *in this slot's language*. Pick the pillar furthest below its target share (section 1).
2. **Formula.** From that pillar's formulas, take the one whose last use is oldest, honoring the slot's format (the calendar alternates reel and carousel).
3. **Hook.** Pick from the formula's `recommended_hook_ids` (or any hook of the pillar) not used in this language in the last 21 days. Hooks marked `approved` are used verbatim; others may be lightly varied (keep the type: question, contrast, myth-flip, identity, scenario).
4. **Variable.** Pick the behavior / crystal / center / pattern / quiz question not used in this language in the last 30 days.
5. **CTA tier.** The formula default, unless a rule blocks it: never two T2/T3 posts in a row in one language; T3 only for Full-only chapters (Abundance Pattern, pattern under pressure, seven-day reset); at least 60% of each week's posts are T0/T1.
6. **Write, count, gate.** Output slide or beat fields with character counts. Anything over its limit goes back for shortening (never shrink the font, per C). Then D's compliance gate, then render.

**Post brief the node should output (example):**
```json
{"date":"2026-11-02","slot":"B","lang":"ar","platforms":["instagram"],"pillar":"P1",
 "formula_id":"C01","hook_id":"H01","cta_tier":"T1",
 "variables":{"behavior":"Struggling to say no"},
 "slides":[{"n":1,"role":"hook","layout":"L1","text":"السلوك نفسه. والأسباب مختلفة.","chars":30}],
 "caption":"…","hashtags":["#كريستال_كود","#اكتشاف_الذات","#الوعي_الذاتي"],
 "first_comment":"…","post_id":"ig_20261102_c01_a"}
```

**Hard content rules (on top of D):**
- **Transcreate, never translate.** Each post is single-language. The Arabic is written for the Gulf reader: white (pan-Gulf) MSA, Khaleeji only inside quoted speech or in the founder's own voice, no Egyptian or Levantine markers.
- **Arabic address:** follow the site. Use nominal and first-person phrasing and the written suffix ـك; no gendered imperatives outside buttons. No em dashes. Eastern Arabic numerals for counts and steps (١٢ سؤالًا، ٧ مراكز), Latin for prices ($8.88) and handles.
- **Arabic never mentions the birth chart or birth crystal,** and never uses protection, luck, evil-eye or envy framing (D 1.1, D 2.3). Stones whose shortcut is "protection" (black obsidian, shungite) are English-only.
- **Approved copy is the base.** Lines tagged `approved` in the hook bank come from the founder-approved landing copy (2026-10-23) and are never paraphrased in a way that changes meaning.
- **Lina is always labeled** "Illustrative sample · Lina is fictional" on every slide or frame that shows her pages, and in the caption.
- **No AI people.** Crystals, hands, sacred geometry, typography, sample pages and the founder herself. AI people would trigger Meta's AI-profile label and read as fake customers.
- **The method stays private.** Never explain how a reading chooses crystals ("pattern first, then stones" is off-limits). "The person comes first, the stone second" is the public line.
- **Quiz lines excluded from public posts** (they read as distress signals or drift into health):
- Q8 option 1 ('I feel a bit empty...')
- Q12 option 1 ('Something bad is about to happen.')
- Q12 option 4 ('What hurt me before is going to happen again.') as a standalone hook
- Q11 options 1 and 7 (sleep / rest) as hooks: they drift toward health
- Q9 option 5 ('Wired and buzzy') and the v2 'numb or disconnected' option

---

## 1. Content pillars

| ID | Pillar | Funnel job | Primary audience (brief segment) | Share of output | Best format | CTA tier (default / allowed) |
|---|---|---|---|---|---|---|
| P1 | **Same Behavior, Different Reasons**<br>السلوك نفسه، والأسباب مختلفة | reach | Pattern explorer (primary); Self-discovery seeker | **25%** | Reel-first (R01, R08 pattern mode) ~55%; carousels C01, C08 ~45% | T0 / T0, T1, T2 |
| P2 | **Which Line Is Yours? (the questionnaire as content)**<br>أي عبارة تشبهك؟ | reach | Self-discovery seeker (primary); Pattern explorer | **20%** | Carousel-first (C02) ~60%; reel R02 ~40% | T0 / T0, T2 |
| P3 | **The Crystal Shortcut**<br>الطريق المختصر إلى الحجر | reach | Crystal enthusiast (primary); Energy-curious | **15%** | Carousel-first (C04) ~60%; reel R03 ~40% | T1 / T1, T2 |
| P4 | **Seven Centers, Read Gently**<br>سبعة مراكز، بقراءة هادئة | trust | Energy-curious (primary); Self-discovery seeker | **15%** | Carousel C03 ~50%; reel R04 ~50% | T1 / T1, T2 |
| P5 | **Inside a Reading**<br>داخل القراءة | convert | Warm viewers from all four segments | **15%** | Carousel C05/C07 ~50%; reels R05 (screen) + R06 (founder) ~50% | T2 / T1, T2, T3 |
| P6 | **Giving, Receiving & the Abundance Pattern**<br>العطاء والتلقّي ونمط الوفرة | trust -> convert | Pattern explorer + the money angle (Full buyers) | **10%** | Reels R07, R08 ~60%; carousel C06 ~40% | T3 / T0, T3 |

**P1 · Same Behavior, Different Reasons.** Stop the scroll with a behavior everyone recognizes (saying yes, overthinking, doing it all yourself), then show that the reason behind it differs per person. This is the brand's signature idea and the honest curiosity gap: which reason is yours depends on your answers. Formulas: C01, C08, R01, C06 (alt), R06 (alt), R08 (alt). Hooks: H01-H09. Sources: landing difference block (approved); quiz Q11/Q12 lines; pattern labels (display-labels.ts).

**P2 · Which Line Is Yours? (the questionnaire as content).** Publish the real quiz questions and options (founder-written, already in both languages) as interactive mirrors. Comments with a number are the cheapest engagement there is, and every post doubles as proof that the product is specific, not a horoscope. Formulas: C02, R02, R07 (alt). Hooks: H10-H17. Sources: quizContent.en.ts / quizContent.ar.ts (Q1-Q12 + section intros).

**P3 · The Crystal Shortcut.** Turn the Crystal Library's 'what people misunderstand' and 'when it may not be what you need' sections into myth-flips: the same wish (love, protection, abundance, calm) can come from opposite places. Wins the crystal audience without a single efficacy claim and leads to 'the person first, the stone second'. Formulas: C04, R03. Hooks: H18-H24. Sources: shared/crystals/*.ts misunderstood + fit + facts + perspective sections.

**P4 · Seven Centers, Read Gently.** Teach the seven centers through the founder's approved lessons (outgrow vs. awareness, one image per center). Positions MCC as thoughtful and premium, not woo, and sets up 'you know the seven centers, but what about yours?'. Formulas: C03, R04. Hooks: H25-H30. Sources: landing centres block (approved themes); centre_lessons_en/ar (approved 2026-10-11).

**P5 · Inside a Reading.** Answer 'what do I actually get?' with zero reviews: the illustrative Lina pages, the email arriving, Lite vs Full, pay-at-the-end, and the founder saying plainly that MCC just launched. Proof of product replaces social proof. Formulas: C05, C07, R05, R06, C08 (alt). Hooks: H31-H35. Sources: landing sample/pricing/faq blocks; Lina sample pages (labeled fictional); founder on camera.

**P6 · Giving, Receiving & the Abundance Pattern.** The receiving question (compliments, help, the bill) is universal and lands strongly in Gulf hospitality culture; it bridges to the Abundance Pattern loop (need, belief, feeling, response, result), the strongest Full-only chapter. Always 'not a prediction of your financial future'. Formulas: C06, R07, R08, C01 (alt), C02 (alt), R02 (alt), R06 (alt). Hooks: H36-H40. Sources: landing receiving + abundance blocks (approved); quiz Q4/Q5.


**Funnel math.** Reach 60% (P1-P3), trust 15% plus half of P6, convert 15% plus half of P6. A zero-follower account needs reach first, but proof of product (P5) appears from Day 2, because the first objection is "what do I actually get?" (A §1).

**CTA tiers** (exact lines live in A §2; abbreviated here):

| Tier | Name | Goal | EN line (from A §2) | AR line | Link |
|---|---|---|---|---|---|
| T0 | Engage | saves, sends, comments; no link | Save this for the next time you say yes before the question is finished. | للحفظ، للمرة القادمة التي تسبق فيها «نعم» نهاية السؤال. | none |
| T1 | Follow + free value | follows, profile visits, sample/library clicks | Follow @my.crystal.code for the next one. Sample reading and the free Crystal Library: link in bio. | المزيد على ‎@my.crystal.code. عيّنة القراءة ومكتبة الكريستال المجانية: الرابط في البايو. | EN https://www.mycrystalcode.com (#sample) or /crystals<br>AR https://www.mycrystalcode.com/ar or /ar/crystals |
| T2 | MCC Lite $8.88 | first purchase (low friction) | Your 12 answers. Your 7 energy centers. MCC Lite, $8.88. Link in bio. | ١٢ إجابة، وسبعة مراكز طاقة تخصّك. كريستال كود لايت بـ $8.88. الرابط في البايو. | EN https://www.mycrystalcode.com/crystal-match<br>AR https://www.mycrystalcode.com/crystal-match?lang=ar |
| T3 | MCC Full $18.88 launch price | Full purchase / Lite-to-Full upgrade | The Abundance Pattern is inside MCC Full. $18.88 launch price (list $24.88). Link in bio. | نمط الوفرة جزء من القراءة الكاملة: $18.88 سعر الإطلاق بدلًا من $24.88. الرابط في البايو. | EN https://www.mycrystalcode.com/quiz<br>AR https://www.mycrystalcode.com/quiz?lang=ar |

Every caption ends with a soft bio-link line, even on T0 posts. The tier governs the on-slide or on-screen CTA. This reconciles A's "Lite in most posts" with a reach-first mix.

---

## 2. Carousel formulas

**Specs that apply to every carousel**
- **Canvas:** Instagram 1080×1350 (4:5) JPG; TikTok photo mode 1080×1920 JPG, re-rendered from the same field data (never letterboxed). Layouts L1-L8 and safe zones are in C §1.5 and §2.
- **Slide count 6-10.** Instagram allows 20 in the app, but the publishing API has historically capped carousels at 10 children. Every formula fits in 10, so one file works everywhere (verify on your Graph API version).
- **Slide 1 is the hook. Slide 2 is a second hook.** Instagram re-serves carousels starting at slide 2 to people who did not swipe the first time, so slide 2 must stand alone.
- **One idea per slide.** Body slides stay under about 25 words. Arabic budgets are 90% of English (C §1.6).
- **Text is composited by the renderer, never drawn by the image model.** Image models still mangle Arabic letter-joining and misspell English. The AI makes the background art only (slide 1 sets the visual DNA; the rest use C's Scene/Paper surfaces).
- **Swipe cue** on slide 1 (→ EN, ← AR). **CTA and the D footer** on the last slide.

**TikTok photo-mode adaptation (all formulas)**
- Re-render at 1080×1920. Text box x 60-940, y 160-1440. Nothing in the bottom quarter (caption and sound bar) or the right rail.
- **Title ≤ 90 characters** = the hook plus the search phrase. Description 150-600 characters, keyword first (the limit is far higher; long is not better here).
- **Cover** = slide 1. Export **JPG** (TikTok rejects PNG for photo posts).
- **Sound:** photo posts play with music. A direct post via the API can set `auto_add_music`. In D's recommended drafts mode, the human picks a calm track from the Commercial Music Library at low volume before tapping Post.
- TikTok allows 35 images, but viewers drop faster than on IG: put the payoff by slide 6 and keep 7-10.
- TikTok reads on-image text for search: put the keyword on slide 1 or 2.

### C01 · Same Behavior, Different Reasons  (السلوك نفسه، والأسباب مختلفة)

Pillar **P1 Same Behavior, Different Reasons** · funnel: reach · audience: Pattern explorer · **8 slides** · CTA default **T1** (allowed T0, T1, T2)

**Save/share trigger:** SEND: 'Send this to the friend who always says yes.' Recognition of someone else drives DM sends (IG's strongest reach signal). Secondary: comment 1/2/3.

| # | Role | Layout (C) | What goes on the slide | Max chars EN / AR |
|---|---|---|---|---|
| 1 | hook | L1 | Open loop on the shared behavior. Default headline: 'Same behavior. Different reasons.' Sub-line names it: 'Three people struggle to say no.' *Visual: Hero object: three tall crystal points side by side, one lit.* | 60 / 54 |
| 2 | rehook_scene | L2 | The behavior in one everyday second-person moment ('Someone asks for a favor. You say yes before they finish the sentence.'). Must work as a standalone hook: IG re-serves slide 2 to people who skipped slide 1. *Visual: Paper; numeral 02.* | 140 / 126 |
| 3 | reason_1 | L2 | Person one: the first reason, one sentence, plus what it may be protecting (<=10 words). Hedge with 'may'. *Visual: Numeral 01; glyph Seed of Life.* | 120 / 108 |
| 4 | reason_2 | L2 | Person two: a different reason. Same sentence shape as slide 3 so the contrast is visible. *Visual: Numeral 02; glyph Metatron's Cube.* | 120 / 108 |
| 5 | reason_3 | L2 | Person three: the third reason. *Visual: Numeral 03; glyph Transmutation.* | 120 / 108 |
| 6 | turn_summary | L5 | All three side by side. Top band repeats the behavior; then 'The behavior looks the same. The pattern behind it may be completely different.' Each card <=64 chars. *Visual: Scene; three glass cards.* | 64 / 58 |
| 7 | reflect | L4 | Question to the reader: 'Which one sounds closest: 1, 2 or 3?' plus one line on why the same advice ('just set boundaries') may fit one person and backfire for another. *Visual: Quote-question, teal orb.* | 110 / 99 |
| 8 | cta | L8 | Tier copy + 'Your context changes the interpretation.' Disclaimer footer. *Visual: CTA end card.* | 120 / 108 |

- **TikTok photo mode:** Re-render 1080x1920 from the same fields. Keep all 8 slides. Title (<=90 chars) = slide-1 headline + behavior. Put the search keyword (e.g. 'people pleasing', 'how to say no') on slide 1 or 2: TikTok reads on-image text.
- **Arabic:** Use the approved AR difference block for 'say no'. Reasons in nominal or third-person form (أحدهم / آخر / ثالث) so no gendered 'you'. Right-aligned; numerals ٠١ ٠٢ ٠٣.
- **Compliance:** Reasons are hedged ('may', 'one person'), never diagnoses of the viewer. No clinical words (anxiety, trauma, codependency, disorder).
- **Variables:** `behavior_bank`: BEHAVIOR_BANK (7 behaviors x 3 reasons, EN + AR)
- **Best hooks:** H01, H02, H05, H06, H07, H08

### C02 · Which Line Is Yours?  (أي عبارة تشبهك؟)

Pillar **P2 Which Line Is Yours? (the questionnaire as content)** · funnel: reach · audience: Self-discovery seeker · **8 slides** · CTA default **T0** (allowed T0, T2)

**Save/share trigger:** COMMENT: 'Comment your number.' Numbered options turn a passive swipe into a one-tap comment; people also tag friends ('you're a 3').

| # | Role | Layout (C) | What goes on the slide | Max chars EN / AR |
|---|---|---|---|---|
| 1 | hook | L1 | The quiz question, verbatim or trimmed to <=60 chars ('Someone offers to help you. What usually happens?'). Sub-line: 'Pick the line that feels a little too familiar.' *Visual: Scene; Cormorant italic question.* | 60 / 54 |
| 2 | frame | L2 | 'This is 1 of the 12 questions in the MCC questionnaire. No right answers. Notice which line you pause on.' *Visual: Paper.* | 140 / 126 |
| 3 | option_1 | L2 | Option 1 verbatim (founder wording) + one hedged line 'For some people, this is about...'. *Visual: Numeral 01.* | 120 / 108 |
| 4 | option_2 | L2 | Option 2 + hedged line. *Visual: Numeral 02.* | 120 / 108 |
| 5 | option_3 | L2 | Option 3 + hedged line. *Visual: Numeral 03.* | 120 / 108 |
| 6 | option_4 | L2 | Option 4 + hedged line. *Visual: Numeral 04.* | 120 / 108 |
| 7 | steady_option | L4 | The steadiest option from the same question ('I can receive it, say thank you, and let it be good.') + 'If this is you, notice what made it possible.' Keeps the post non-pathologizing. *Visual: Scene, teal orb.* | 110 / 99 |
| 8 | cta | L8 | 'Comment your number.' + 'One answer is one piece. A reading looks at all twelve together.' + tier copy. *Visual: CTA end card.* | 120 / 108 |

- **TikTok photo mode:** Re-render 1080x1920. Keep 8 slides. Title = the question. Ask for the number in the description too ('Comment 1-5').
- **Arabic:** Quote the founder's Arabic options from quizContent.ar.ts verbatim (they are first-person, so no gender issue for the reader). Hedged lines in nominal form.
- **Compliance:** Never use the excluded distress options (QUIZ_EXCLUDE). Hedged lines describe possibilities, never a verdict ('you have low self-worth' is banned).
- **Variables:** `question`: one of Q1-Q7, Q11, Q12 from quizContent.{en,ar}.ts (see exclusions); `options`: 4 options + the steadiest option
- **Best hooks:** H10, H11, H12, H13, H14, H15, H16, H17, H39

### C03 · Which Center Is Calling You?  (أي مركز يطلب انتباهك؟)

Pillar **P4 Seven Centers, Read Gently** · funnel: trust · audience: Energy-curious · **10 slides** · CTA default **T2** (allowed T1, T2)

**Save/share trigger:** SAVE: a complete 7-card reference set people come back to. Secondary: 'Comment the center you paused on.'

| # | Role | Layout (C) | What goes on the slide | Max chars EN / AR |
|---|---|---|---|---|
| 1 | hook | L1 | Approved line: 'You know about the seven energy centers. But what about yours?' or 'Which center is asking for your attention?' *Visual: Aligned Chakras glyph as hero, brand gradient.* | 60 / 54 |
| 2 | how_to_read | L2 | 'Read each card. Notice the one you pause on.' Support line: 'Reflective and spiritual, not a medical measurement.' *Visual: Paper.* | 140 / 126 |
| 3 | center_root | L6 single | Root: theme + 'You might notice...' + lesson (one line each). *Visual: Single-centre variant, no state pin.* | 160 / 144 |
| 4 | center_sacral | L6 single | Sacral: same structure. | 160 / 144 |
| 5 | center_solar_plexus | L6 single | Solar Plexus. | 160 / 144 |
| 6 | center_heart | L6 single | Heart. | 160 / 144 |
| 7 | center_throat | L6 single | Throat. | 160 / 144 |
| 8 | center_third_eye | L6 single | Third Eye. | 160 / 144 |
| 9 | center_crown | L6 single | Crown. | 160 / 144 |
| 10 | cta | L8 | 'Which one did you pause on?' + 'Your reading maps all seven from your own answers.' + tier copy + footnote. *Visual: CTA end card.* | 120 / 108 |

- **TikTok photo mode:** TikTok: merge to 8 by pairing Root+Sacral and Third Eye+Crown on two slides (L6 list variant), or keep 10: photo mode allows 35. Title: 'Which energy center is calling you?'
- **Arabic:** Use the approved AR center names and themes. Use the neutral AR lessons in CENTERS, not the feminine file, unless the post is explicitly first-person.
- **Compliance:** Mandatory L6 footnote: 'Reflective, not a medical measurement.' No 'blocked/unblocked'. Never assign a state to the viewer. No organ, illness or symptom words on any center card.
- **Variables:** `centers`: CENTERS (7, EN + AR: name, theme, 'you might notice', lesson)
- **Best hooks:** H25, H26, H27

### C04 · The Crystal Shortcut  (الطريق المختصر إلى الحجر)

Pillar **P3 The Crystal Shortcut** · funnel: reach · audience: Crystal enthusiast · **8 slides** · CTA default **T1** (allowed T1, T2)

**Save/share trigger:** SAVE + SEND: a myth-flip plus one surprising fact ('most citrine sold today began as amethyst') is classic save material; crystal people send it to the friend who buys stones for everything.

| # | Role | Layout (C) | What goes on the slide | Max chars EN / AR |
|---|---|---|---|---|
| 1 | hook | L1 | 'Before you buy {crystal} for {wish}, read this.' (or the fact as hook). *Visual: Hero crystal cut-out from the library photo, halo.* | 60 / 54 |
| 2 | shortcut | L2 | 'The common shortcut: {wish} -> {crystal}.' + 'But the same wish can come from opposite places.' (library wording) *Visual: Paper.* | 140 / 126 |
| 3 | person_a | L2 | For whom the traditional association may be exactly right (from 'misunderstood'). *Visual: Numeral 01.* | 140 / 126 |
| 4 | person_b | L2 | For whom it may deepen the very loop they want to leave. *Visual: Numeral 02.* | 140 / 126 |
| 5 | may_not_fit | L3 | 'When {crystal} may not be what you need': 2-3 items from the 'fit' section. *Visual: List, 3 items max, 56 chars each.* | 56 / 50 |
| 6 | fact | L4 | One verified fact from 'At a glance' or 'history' only (name origin, mineral, a museum-documented use). *Visual: Scene.* | 110 / 99 |
| 7 | mcc_view | L4 | Founder line: 'In My Crystal Code, the person comes first, the stone second.' *Visual: Scene, Seed of Life ghost.* | 110 / 99 |
| 8 | cta | L8 | T1: 'Read the full {crystal} page in the free Crystal Library. Link in bio.' or T2. *Visual: CTA end card.* | 120 / 108 |

- **TikTok photo mode:** Re-render 1080x1920; title = '{crystal} meaning: the shortcut most people take'. Keep 8.
- **Arabic:** Arabic library articles exist for most stones; use their wording. For black obsidian and shungite, do not use 'protection' framing in Arabic (choose another stone).
- **Compliance:** Crystals are 'associated with' / 'in contemporary crystal practice'. Never: heals, attracts, protects you from, cleanses, raises your vibration. Facts only from the stone's library file; never invent history. Do not describe how a reading chooses stones (method stays private).
- **Variables:** `crystal`: CRYSTAL_SHORTCUTS (18 live library stones); `source`: shared/crystals/<slug>.ts: misunderstood, fit, facts, perspective
- **Best hooks:** H18, H19, H20, H21, H22, H23, H24

### C05 · Sample-Reading Walkthrough  (جولة في قراءة نموذجية)

Pillar **P5 Inside a Reading** · funnel: convert · audience: Warm, all segments · **9 slides** · CTA default **T2** (allowed T1, T2, T3)

**Save/share trigger:** SAVE: 'Save this to read before you decide.' It is the product tour; pin it to the profile grid.

| # | Role | Layout (C) | What goes on the slide | Max chars EN / AR |
|---|---|---|---|---|
| 1 | hook | L1 | 'Curious what a personal reading actually looks like?' + pill 'ILLUSTRATIVE SAMPLE'. *Visual: Two-page fan of lina-01 and lina-03.* | 60 / 54 |
| 2 | what_it_is | L3 | 4 items: 12 questions in 4 sections; a private web link by email within minutes; nothing physical ships; reflective guidance, not advice. *Visual: List.* | 56 / 50 |
| 3 | page_energy_story | L7 | lina-01. Callout: 'Your energy story'. Tier badge: Lite + Full. *Visual: Mandatory label: ILLUSTRATIVE SAMPLE · LINA IS FICTIONAL.* | 34 / 31 |
| 4 | page_pattern | L7 | lina-02. Callout: 'Your pattern under pressure'. Badge: Full (previewed in Lite). *Visual: Same label.* | 34 / 31 |
| 5 | page_map | L7 | lina-03. Callout: 'Your 7 centers, mapped'. Badge: Lite (light) / Full (detailed). *Visual: Same label.* | 34 / 31 |
| 6 | page_focus | L7 | lina-04. Callout: 'Your focus centers'. Badge: Full. *Visual: Same label.* | 34 / 31 |
| 7 | page_crystals | L7 | lina-05. Callout: 'Your four-crystal protocol'. Badge: Lite + Full. *Visual: Same label.* | 34 / 31 |
| 8 | page_reset | L7 | lina-06. Callout: 'Your seven-day reset'. Badge: Full. *Visual: Same label.* | 34 / 31 |
| 9 | cta | L8 | Two price cards: Lite $8.88 / Full $18.88 launch price (list $24.88) + 'Upgrade later for the difference.' + 'Lina is fictional. Your reading depends on your answers.' *Visual: CTA end card, two cards.* | 120 / 108 |

- **TikTok photo mode:** Re-render 1080x1920 with the page at 760px wide. Keep 9. Title: 'What a personal crystal & energy-center reading looks like (sample)'.
- **Arabic:** BLOCKED for Arabic until an Arabic Lina sample is rendered (landing.ar.ts sample.pages is empty). Fallback: EN pages with the label «العيّنة بالإنجليزية حاليًا · لينا شخصية خيالية», or use C07 instead. Never mention the birth chart in Arabic.
- **Compliance:** 'Illustrative sample · Lina is fictional' on every page slide and in the caption. Tier badges must match the tier matrix exactly. Delivery is 'within minutes', never a number of minutes.
- **Variables:** `pages`: lina-01 energy story (Lite+Full), lina-02 pattern under pressure (Full; previewed in Lite), lina-03 energy-center map (Lite light / Full detailed), lina-04 focus centers (Full), lina-05 crystal protocol (Lite+Full), lina-06 seven-day reset (Full)
- **Best hooks:** H31, H32, H33, H35

### C06 · The Loop Behind It  (الحلقة التي خلفه)

Pillar **P6 Giving, Receiving & the Abundance Pattern** · funnel: convert · audience: Pattern explorer + money angle · **8 slides** · CTA default **T3** (allowed T0, T3)

**Save/share trigger:** SAVE: a named mental model (need, belief, feeling, response, result) that people want to reuse; COMMENT: 'Where does yours get stuck?'

| # | Role | Layout (C) | What goes on the slide | Max chars EN / AR |
|---|---|---|---|---|
| 1 | hook | L1 | Approved: 'What if your money block isn't where you think it is?' *Visual: Transmutation glyph hero.* | 60 / 54 |
| 2 | scene | L2 | One everyday money moment in second person ('You know what you want to charge. Then you start typing the number.'). *Visual: Paper.* | 140 / 126 |
| 3 | need | L2 | 01 A need (e.g. 'to feel safe being chosen'). *Visual: Numeral 01, loop diagram 1/5 lit.* | 100 / 90 |
| 4 | belief | L2 | 02 A belief, in quotes, first person ('If I ask for more, they'll go elsewhere.'). *Visual: 2/5 lit.* | 100 / 90 |
| 5 | feeling | L2 | 03 A feeling ('A tightness while you type the number.'). *Visual: 3/5 lit.* | 100 / 90 |
| 6 | response | L2 | 04 A response ('You lower the price before anyone asks.'). *Visual: 4/5 lit.* | 100 / 90 |
| 7 | result | L4 | 05 A result that quietly confirms the belief. Then: 'Where does yours get stuck: recognizing, committing, asking, or receiving?' *Visual: Loop closes.* | 110 / 99 |
| 8 | cta | L8 | Single offer card Full + mandatory line: 'It's not a prediction of your financial future. It's a different way to understand your relationship with money.' *Visual: CTA end card, single offer.* | 140 / 126 |

- **TikTok photo mode:** Re-render 1080x1920. Keep 8. Title: 'Your money block might not be where you think'.
- **Arabic:** Approved AR abundance block exists (حاجة، معتقد، شعور، استجابة، نتيجة). Scenario in Gulf context works well (the bill, family support, setting a price).
- **Compliance:** Mandatory: 'not a prediction of your financial future' + 'not financial advice'. No income figures, no 'attract', 'manifest', 'abundance flows', '8.88 is lucky'. The illustrative loop is labeled 'An example' and never presented as a real person.
- **Variables:** `scenario`: SCENARIO_BANK_MONEY; `loop`: A need -> a belief -> a feeling -> a response -> a result (approved)
- **Best hooks:** H36, H37, H38, H39, H40

### C07 · How Deep Do You Want to Go? (Lite vs Full)  (ما العمق الذي يناسبك؟)

Pillar **P5 Inside a Reading** · funnel: convert · audience: Warm, deciding · **7 slides** · CTA default **T2** (allowed T2, T3)

**Save/share trigger:** SAVE: a decision aid ('save this for when you're ready'). Pin to profile.

| # | Role | Layout (C) | What goes on the slide | Max chars EN / AR |
|---|---|---|---|---|
| 1 | hook | L1 | '$8.88 or $18.88: how deeply would you like to explore?' *Visual: Two price glyphs.* | 60 / 54 |
| 2 | same_start | L2 | 'Both start with the same 12 questions. You pay only at the end. Your reading arrives as a private link by email within minutes.' *Visual: Paper.* | 140 / 126 |
| 3 | lite | L3 | Lite: energy story & snapshot; 7 center cards (lighter); 4-crystal protocol; birth chart + birth crystal (EN only). 'Best if you want an introduction.' *Visual: List.* | 56 / 50 |
| 4 | full | L3 | Full: 7 detailed center cards + cross-center balance; focus centers; pattern under pressure; the Abundance Pattern; seven-day reset; final message. 'Best if a pattern keeps repeating.' *Visual: List, 5 items.* | 56 / 50 |
| 5 | difference | L2 | One line: 'Deeper pattern sections and the seven-day reset belong to Full.' (EN may add: 'The birth chart belongs to Lite.') *Visual: Paper.* | 140 / 126 |
| 6 | no_lose | L2 | 'Start with Lite. Upgrade later for the difference.' + 'Full is $18.88 at launch (list $24.88).' *Visual: Paper.* | 140 / 126 |
| 7 | cta | L8 | Two-card price block + fit note: 'Not a diagnosis or a verdict. A personalized starting point.' *Visual: CTA end card.* | 120 / 108 |

- **TikTok photo mode:** Re-render 1080x1920. Keep 7. Title: 'Lite or Full? What each reading includes'.
- **Arabic:** Arabic version drops the birth chart and birth crystal entirely (UAE astrology-advertising rule, D 2.3). Lite in AR: energy story, 7 lighter center cards, 4-crystal protocol.
- **Compliance:** Prices and contents must match the tier matrix. Launch-price deadline only if the owner has committed to a date (A §2).
- **Variables:** `tiers`: landing pricing block (verified tier matrix)
- **Best hooks:** H34, H32, H35

### C08 · Pattern Profile: The {Pattern} in 5 Quiet Moments  ({النمط} في خمس لحظات صغيرة)

Pillar **P1 Same Behavior, Different Reasons** · funnel: reach · audience: Pattern explorer · **9 slides** · CTA default **T2** (allowed T0, T2, T3)

**Save/share trigger:** SEND + TAG: 'Send this to the {Pattern} in your life.' Identity labels are the most shared format in self-discovery.

| # | Role | Layout (C) | What goes on the slide | Max chars EN / AR |
|---|---|---|---|---|
| 1 | hook | L1 | 'The {Pattern}, in 5 quiet moments.' Sub: 'A pattern, not a verdict.' *Visual: Owned glyph per pattern.* | 60 / 54 |
| 2 | definition | L2 | One plain-language line on what this pattern tends to look like (seed from the quiz line). *Visual: Paper.* | 140 / 126 |
| 3 | moment_1 | L2 | 'You may notice...' moment 1: tiny, specific, everyday. *Visual: Numeral 01.* | 100 / 90 |
| 4 | moment_2 | L2 | Moment 2. *Visual: Numeral 02.* | 100 / 90 |
| 5 | moment_3 | L2 | Moment 3. *Visual: Numeral 03.* | 100 / 90 |
| 6 | moment_4 | L2 | Moment 4. *Visual: Numeral 04.* | 100 / 90 |
| 7 | moment_5 | L2 | Moment 5. *Visual: Numeral 05.* | 100 / 90 |
| 8 | protect_and_steady | L4 | 'What it may be protecting: {need}.' + 'The steadier version can sound like: {steady quiz line}.' *Visual: Scene.* | 110 / 99 |
| 9 | cta | L8 | 'A post can't tell you if this is your pattern. Your 12 answers can.' + T2 (or T3: 'your pattern under pressure is a chapter of MCC Full'). *Visual: CTA end card.* | 120 / 108 |

- **TikTok photo mode:** Re-render 1080x1920. Keep 9. Title: 'The Over Giver in 5 quiet moments'.
- **Arabic:** Use the neutral form «نمط العطاء المُفرِط» etc. (PATTERNS.ar_public) instead of the gendered persona labels, unless the founder approves a feminine-only post.
- **Compliance:** Labels are patterns, never diagnoses or personality verdicts. Exclude 'The Exhausted One' from the public rotation (burnout drifts into health).
- **Variables:** `pattern`: PATTERNS (7 real report labels from display-labels.ts)
- **Best hooks:** H09, H03, H04


---

## 3. Reel formulas

All reels are 1080×1920, H.264, 30fps, loudness -14 LUFS, peaks ≤ -1 dBFS. Visual language, captions, grade and the 12 b-roll scenes follow C §3. Timings below are for EN. Arabic VO runs about 5-10% shorter for the same meaning, so hold the end card a little longer rather than adding words.

**Which reels need what**

| Reel | Length | Production | AI-only possible? | Founder needed? |
|---|---|---|---|---|
| R01 Three People, One Behavior | 28s | ai_full | Yes | No |
| R02 The Question on Screen (1 of 12) | 18s | ai_full | Yes | No |
| R03 Before You Buy {Crystal} | 26s | ai_full | Yes | Optional (hands only) |
| R04 One Center, One Lesson | 24s | ai_full | Yes | No |
| R05 Watch a Reading Open | 40s | screen_capture | Yes (screen recording + template) | No |
| R06 Founder Note | 40s | founder | No | Yes |
| R07 The Receiving Test | 20s | ai_full | Yes | No |
| R08 The Loop (need, belief, feeling, response, result) | 26s | ai_full | Yes | No |

Six of the eight formulas run with no founder at all. The founder reel (R06) is the single biggest trust asset for a brand with zero reviews: aim for one per week, batch-filmed.

### R01 · Three People, One Behavior  (ثلاثة أشخاص، سلوك واحد)

Pillar **P1 Same Behavior, Different Reasons** · funnel: reach · **28s** · CTA default **T0** (allowed T0, T1) · **Fully AI (faceless)**

- **Production:** Faceless. Three tall crystal points stand in for the three people (no AI humans). Image-to-video for the crystals, text-on-motion template for type, TTS voiceover.
- **Voiceover:** Warm, unhurried, low-mid female voice; 140-150 wpm EN. AR: calm white MSA, no Egyptian/Levantine markers.
- **Audio:** Original VO + licensed ambient pad at -22 dB; ends on a loop point.
- **Save/share trigger:** Comment 1/2/3; sends to friends.

| Time (s) | Beat | On-screen text | Voiceover | Visual / b-roll |
|---|---|---|---|---|
| 0.0-1.5 | hook | '3 people can't say no.' (<=7 words) | 'Three people can't say no.' | Dark stage, three crystal points; a light snaps onto the first (motion in the first 0.5s). |
| 1.5-4.0 | setup | 'Same behavior.' | 'Same behavior.' | Slow push-in across all three. |
| 4.0-10.0 | reason_1 | Reason 1, max 2 caption lines | Reason 1, one sentence. | Crystal 1 glows violet; others dim. |
| 10.0-16.0 | reason_2 | Reason 2 | Reason 2. | Crystal 2 glows. |
| 16.0-22.0 | reason_3 | Reason 3 | Reason 3. | Crystal 3 glows teal. |
| 22.0-26.0 | turn | 'Different reasons.' | 'The behavior looks the same. The pattern behind it may be completely different.' | All three lit, aura bloom. |
| 26.0-28.0 | cta_loop | 'Which one are you? 1, 2 or 3?' | (silence or 'Which one are you?') | Cut back to the opening frame for a seamless loop. |

- **Arabic:** Use the approved AR 'say no' reasons; other behaviors from BEHAVIOR_BANK.reasons_ar.
- **Compliance:** No AI human faces; crystals as stand-ins. AI label on.
- **Best hooks:** H01, H02, H05, H07

### R02 · The Question on Screen (1 of 12)  (سؤال واحد من ١٢)

Pillar **P2 Which Line Is Yours? (the questionnaire as content)** · funnel: reach · **18s** · CTA default **T0** (allowed T0, T2) · **Fully AI (faceless)**

- **Production:** Text-on-motion over one ambient b-roll loop (C §3 scenes 4, 7 or 10). Fully templated; the only variables are question + 4 options.
- **Voiceover:** Optional. Variant A: VO reads the question only. Variant B: no VO, ambient music only (better for silent scrollers). Test both.
- **Audio:** Ambient bed; TikTok drafts: human may pick a calm Commercial Music Library track.
- **Save/share trigger:** Comment your number.

| Time (s) | Beat | On-screen text | Voiceover | Visual / b-roll |
|---|---|---|---|---|
| 0.0-1.5 | hook | The question, trimmed to <=7 words ('Someone compliments you. You say...?') | Reads the question. | Ink drop blooming (scene 7), hard cut on beat. |
| 1.5-3.0 | frame | 'Pick one.' | - | Scene continues. |
| 3.0-12.0 | options | 4 numbered options, ~2.2s each, verbatim from the quiz | - (or reads each) | Options fade in (0.6s), one at a time. |
| 12.0-15.5 | turn | 'The one you paused on is worth noticing.' | Same line. | Slow push-in. |
| 15.5-18.0 | cta | 'Comment your number · 1 of 12 questions' | - | Loop back to the question frame. |

- **Arabic:** Use the AR quiz wording verbatim. Arabic captions: max 4 words / 24 chars per line (C §3).
- **Compliance:** QUIZ_EXCLUDE applies. If using Q9/Q10 (body), add on-screen: 'Reflective, not medical.'
- **Best hooks:** H10, H11, H13, H14, H15, H16, H17, H27

### R03 · Before You Buy {Crystal}  (قبل شراء {الحجر})

Pillar **P3 The Crystal Shortcut** · funnel: reach · **26s** · CTA default **T1** (allowed T1, T2) · **Fully AI (faceless)**

- **Production:** Image-to-video from the stone's library photo (slow rotation, rack focus). Optional upgrade: founder's hands placing the stone on linen (no face needed).
- **Voiceover:** Curious, lightly conspiratorial ('here's what most people miss'), still calm.
- **Audio:** Original VO + soft bed.
- **Save/share trigger:** Save for the fact; send to the friend who buys stones for everything.

| Time (s) | Beat | On-screen text | Voiceover | Visual / b-roll |
|---|---|---|---|---|
| 0.0-1.5 | hook | 'Before you buy {crystal} for {wish}...' | Same line. | Macro of the stone turning, light passing through (scene 1/2). |
| 1.5-6.0 | shortcut | '{wish} -> {crystal}?' | 'The common shortcut is: {wish}, so {crystal}.' | Rack focus. |
| 6.0-12.0 | person_a | Person A line | 'For one person, that may be exactly right...' | Stone on linen, warm light. |
| 12.0-18.0 | person_b | Person B line | 'For another, it can deepen the very loop they want to leave.' | Same stone, cooler light. |
| 18.0-22.5 | fact | One verified fact | Reads the fact. | Close macro. |
| 22.5-26.0 | mcc_view_cta | 'The person first. The stone second.' + 'Crystal Library: link in bio' | 'In My Crystal Code, the person comes first, the stone second.' | Pull back; logo end card. |

- **Arabic:** Pick stones with Arabic library articles. No 'protection' stones in AR.
- **Compliance:** Same crystal rules as C04. AI label on.
- **Best hooks:** H18, H19, H20, H22, H24

### R04 · One Center, One Lesson  (مركز واحد، درس واحد)

Pillar **P4 Seven Centers, Read Gently** · funnel: trust · **24s** · CTA default **T1** (allowed T1, T2) · **Fully AI (faceless)**

- **Production:** Metaphor b-roll per center (tree, flowing water, sunlight on a sprout, breath of light, ripple, still water, sky over desert) via image-to-video; quote typography from the template.
- **Voiceover:** Slow, reflective, almost read-aloud; leave 0.5s pauses between lines.
- **Audio:** VO + soft pad; no beat cuts.
- **Save/share trigger:** SAVE: 'Save this for the day you need it.' Quote reels are shared to Stories.

| Time (s) | Beat | On-screen text | Voiceover | Visual / b-roll |
|---|---|---|---|---|
| 0.0-1.5 | hook | The center's image line, shortened ('A tree doesn't stand firm because the wind is still.') | Same line. | Center's metaphor b-roll (e.g. tree in wind). |
| 1.5-6.0 | name | 'The {Center} center: {theme}.' | Same. | Aligned Chakras glyph, the center's node glowing. |
| 6.0-12.0 | outgrow | 'The belief it asks you to outgrow:' + a shortened outgrow quote | Reads the quote softly. | Metaphor b-roll, darker grade. |
| 12.0-19.0 | awareness | 'The awareness it invites:' + shortened awareness line | Reads it. | Same scene, light rising. |
| 19.0-24.0 | cta | 'Save this for the day you need it.' + small 'Reflective, not medical.' | - | End card. |

- **Arabic:** Use the founder's Arabic (centre_lessons_ar) for first-person lines; neutral nominal forms for second-person ones.
- **Compliance:** Footnote 'Reflective, not a medical measurement.' No religious framing of 'meaning' (Crown): keep it 'within this spiritual view'.
- **Best hooks:** H28, H29, H30, H25

### R05 · Watch a Reading Open  (شاهد القراءة وهي تُفتح)

Pillar **P5 Inside a Reading** · funnel: convert · **40s** · CTA default **T2** (allowed T2, T3) · **Screen capture (faceless, no AI people)**

- **Production:** Screen recording of the real Lina sample (phone frame), plus a staged inbox notification (blurred). No face. Recorded once, re-cut many times.
- **Voiceover:** Clear, friendly guide; plain words ('this part shows...').
- **Audio:** VO + light bed.
- **Save/share trigger:** Save to decide later; profile pin candidate.

| Time (s) | Beat | On-screen text | Voiceover | Visual / b-roll |
|---|---|---|---|---|
| 0.0-1.5 | hook | 'What a personal reading actually looks like' + 'Illustrative sample' | 'This is what a reading looks like.' | Phone lights up with the reading's first page. |
| 1.5-6.0 | how | '12 questions -> a private link in your inbox' | 'It starts with 12 questions about how life has actually been feeling.' | Scene 9 (phone on nightstand). |
| 6.0-14.0 | energy_story | 'Your energy story' | Explains the section in one sentence. | Slow scroll. |
| 14.0-20.0 | pattern | 'Your pattern under pressure (Full)' | One sentence. | Scroll, pause 1s on the heading. |
| 20.0-26.0 | map | 'Your 7 centers, mapped' | One sentence. | Scroll. |
| 26.0-32.0 | crystals | 'Your four-crystal protocol' | One sentence. | Scroll. |
| 32.0-36.0 | reset | 'Your seven-day reset (Full)' | One sentence. | Scroll. |
| 36.0-40.0 | cta | 'Lite $8.88 · Full $18.88 launch price' + 'Lina is fictional.' | 'Start with Lite and upgrade later for the difference.' | End card. |

- **Arabic:** Until an Arabic sample exists: AR variant records the Arabic questionnaire (/ar -> quiz) instead, with the pay-at-the-end line, and shows EN pages only with «العيّنة بالإنجليزية حاليًا».
- **Compliance:** 'Illustrative sample · Lina is fictional' visible the whole time. No invented delivery time; 'within minutes'.
- **Best hooks:** H31, H32, H33

### R06 · Founder Note  (كلمة من المؤسِّسة)

Pillar **P5 Inside a Reading** · funnel: convert · **40s** · CTA default **T2** (allowed T1, T2) · **Needs the founder on camera**

- **Production:** Founder on camera. Batch 6 clips in one 90-minute session: natural window light, eye-level, lav mic, 4K30, modest styling. Variants: 'We just launched', 'Why I built this', 'Reply to a comment', 'I took my own reading' (labeled as hers).
- **Voiceover:** Her own voice, conversational, not scripted-sounding. Open mid-sentence; no 'hi guys'.
- **Audio:** Natural voice; no music or a very low bed (-26 dB).
- **Save/share trigger:** Trust builder; follow + profile visit.

| Time (s) | Beat | On-screen text | Voiceover | Visual / b-roll |
|---|---|---|---|---|
| 0.0-1.5 | hook | 'We just launched. No reviews yet.' | Says it to camera. | Close-up, eyes to lens, already mid-gesture. |
| 1.5-8.0 | turn | 'So here's exactly what you get.' | 'So instead of reviews, I'll show you exactly what you get.' | Holds phone with the sample. |
| 8.0-20.0 | what | 'Answer -> Decode -> Discover' | Explains the 12 questions and the private reading. | Cutaways to the sample (R05 footage). |
| 20.0-30.0 | what_it_isnt | 'Not medical. Not a prediction. Nothing ships.' | States what MCC is not, in her words. | Back to face. |
| 30.0-40.0 | cta | 'Questions first. Pay at the end.' | 'Start with Lite, and upgrade later for the difference if you want more.' | End card. |

- **Arabic:** Record an Arabic version in her natural register (Gulf-friendly white Arabic). Founder approves her own captions.
- **Compliance:** No outcome promises in unscripted speech: brief the founder with the D never-say list. If AI-free, the caption still follows D's footer rule as the owner decides.
- **Best hooks:** H35, H03, H31

### R07 · The Receiving Test  (اختبار التلقّي)

Pillar **P6 Giving, Receiving & the Abundance Pattern** · funnel: trust · **20s** · CTA default **T0** (allowed T0, T3) · **Fully AI (faceless)**

- **Production:** Hands only (no faces): two hands reaching for a bill on a café table; a hand offering a small gift. Gulf café styling for AR (karak cups, modest sleeves).
- **Voiceover:** Light, knowing smile in the voice.
- **Audio:** VO + soft bed; tiny 'ding' on each option is allowed (one sound effect, low).
- **Save/share trigger:** Comment your number; tag the friend who always wins the bill fight.

| Time (s) | Beat | On-screen text | Voiceover | Visual / b-roll |
|---|---|---|---|---|
| 0.0-1.5 | hook | 'Someone insists on paying the bill.' | Same line. | Two hands reach for the bill at once. |
| 1.5-12.0 | options | 4 options from Q5, numbered: 'No, no, it's fine.' / 'Accept, then feel you owe them.' / 'Accept, but wonder what they want.' / 'Say thank you and let it be good.' | Reads each, quick. | Hands react per option. |
| 12.0-17.0 | turn | 'You know how to give. But what happens when it's your turn to receive?' | Same line (approved). | Slow push-in on an open palm. |
| 17.0-20.0 | cta | 'Comment your number.' | - | Loop to the bill frame. |

- **Arabic:** Gulf adaptation: the quoted reply can be Khaleeji («لا لا، ما له داعي») while narration stays white MSA. Options from the AR Q5 wording.
- **Compliance:** No money outcomes; it's about receiving, not wealth. If CTA = T3: add 'not a prediction of your financial future'.
- **Best hooks:** H39, H40, H36, H11

### R08 · The Loop (need, belief, feeling, response, result)  (الحلقة)

Pillar **P6 Giving, Receiving & the Abundance Pattern** · funnel: convert · **26s** · CTA default **T3** (allowed T0, T3) · **Fully AI (faceless)**

- **Production:** Kinetic typography on the scene background; a five-node loop diagram draws itself. Mode 'money' (P6) or mode 'pattern' (P1, e.g. pulling back when things go well).
- **Voiceover:** Measured, one beat per line, slight pause before 'Round again.'
- **Audio:** VO + pulse-like pad; each node lands on a soft downbeat.
- **Save/share trigger:** Save the model; comment where yours gets stuck.

| Time (s) | Beat | On-screen text | Voiceover | Visual / b-roll |
|---|---|---|---|---|
| 0.0-1.5 | hook | 'A need. A belief. A feeling. A response. A result.' | Fast read of the five words. | Words snap into a circle. |
| 1.5-5.0 | scenario | 'You're about to send your price.' | Same. | Cursor blinking in a message field (blurred UI). |
| 5.0-8.0 | need | 'A need: to feel safe being chosen.' | Reads. | Node 1 lights. |
| 8.0-11.0 | belief | 'A belief: if I ask for more, they'll go.' | Reads. | Node 2. |
| 11.0-14.0 | feeling | 'A feeling: tight chest, fast typing.' | Reads. | Node 3. |
| 14.0-17.0 | response | 'A response: lower it before they ask.' | Reads. | Node 4. |
| 17.0-20.0 | result | 'A result: overworked, underpaid.' | Reads. | Node 5. |
| 20.0-23.5 | turn | 'The result confirms the belief. Round again.' | Same. | Loop closes and spins once. |
| 23.5-26.0 | cta | Money mode: 'The Abundance Pattern · MCC Full' + 'Not a prediction of your financial future.' Pattern mode: 'Where does yours get stuck?' | - | End card. |

- **Arabic:** Use the approved AR loop words. In pattern mode the scenario is from BEHAVIOR_BANK.
- **Compliance:** Money mode: both disclaimers on screen and in caption. Example loop is illustrative, never 'a client'.
- **Best hooks:** H38, H37, H08


### 3.9 Current best practice we apply (late 2026; re-check quarterly)

**Hooks (0-1.5s)**
- **Triple hook:** on-screen text (≤ 7 words EN), the spoken line, and visible motion in the first half-second. The first frame is the cover: no logo intro, no black frame, no "hi".
- **Promise a structure:** "3 people", "5 quiet moments", "1 of 12". A countable promise earns the watch.
- **Use the audience's own words.** The quiz lines are first-person and specific ("I accept, but immediately feel like I need to give something back"); they feel overheard, not marketed.
- **No fear or deficiency hooks** ("Your heart chakra is blocked", "signs something's wrong with you"). They break the brand voice and D's rules, and both platforms limit their reach.
- **Test hooks, not bodies.** Instagram Trial Reels show a reel to non-followers first, which is ideal for a new account. On TikTok, post hook variants in the same slot on different days. Change one variable at a time (A §4).

**On-screen captions**
- **Burned in, from the script.** We already have the exact words, and platform speech recognition is weakest in Arabic. Turn platform auto-captions off where burned-in captions exist, so they don't double up.
- Phrase-level, max 2 lines, 5 words / 28 characters per line in EN and 4 words / 24 characters in AR. Each caption stays ≥ 0.9s. Calm 0.6s fade; no word-by-word bounce (off-brand for "premium, calm").
- Everything inside C's universal box (x 90-900, y 270-1248).

**Length**
- Question and test reels: 15-20s, built to loop (last frame matches the first). Story reels: 24-30s. Walkthrough and founder: 35-45s.
- Completion and rewatches matter more than length. Cut every beat that does not earn its place.

**Audio: original voiceover over trending sounds**
- **Original VO is the default.** It carries the brand voice, and both platforms transcribe speech for search, so the spoken hook is also SEO.
- **API reality:** the Instagram publishing API cannot attach Instagram library music, and a TikTok video upload cannot attach catalog sounds. So the licensed bed is mixed into the file (your own library, royalty-free with commercial terms, or AI music with commercial rights). Mix VO at -12 to -6 dB and the bed at -24 to -18 dB.
- **Trending audio:** business accounts only get the commercial libraries on both platforms, and chasing trends fights the calm brand. Exception: in TikTok drafts mode, the human may add a quiet Commercial Music Library track under the VO on hero posts.
- **Arabic TTS:** check pronunciation of العَجُز، الضفيرة الشمسية، كريستال كود before the first batch, and keep a pronunciation dictionary in the TTS node.

**AI and originality**
- AI label on (TikTok AIGC, Instagram "AI info"), C2PA metadata kept, "Made with AI" in the caption footer (D).
- Native renders per platform. Never upload a TikTok download (watermark) to Instagram; both platforms demote watermarked or unoriginal reposts.

**Posting times** (starting hypotheses; after Day 14, replace them with each account's "most active times" data)

| Slot | Language | UTC (n8n cron) | Local | Why |
|---|---|---|---|---|
| A | EN | 14:00 ±20 min (`0 14 * * *`) | 14:00 London · 09:00 New York · 17:00 Riyadh · 18:00 Dubai | Gulf English speakers after work, UK afternoon, US morning |
| B | AR | 18:30 ±20 min (`30 18 * * *`) | 21:30 Riyadh/Doha/Kuwait · 22:30 Dubai/Muscat | Gulf prime time is roughly 21:00-00:30 local |

- The slots are 4.5 hours apart, which satisfies D's ≥ 4h spacing. Set the n8n workflow timezone explicitly to UTC.
- **Gulf week:** Saudi Arabia, Qatar, Kuwait, Bahrain and Oman rest Friday-Saturday; the UAE rests Saturday-Sunday, with a short Friday. Friday evening and Saturday evening are strong for Arabic. Never post into Friday midday prayer time (slot B is far from it).
- **Clock changes:** UTC slots drift against London and New York when daylight saving starts (US 14 Mar 2027, UK 28 Mar 2027): slot A becomes 10:00 New York / 15:00 London. Keep the cron in UTC and re-check.
- **Ramadan** (expected to begin around 8 Feb 2027, moon-sighting dependent): move slot B to about 20:30 UTC (23:30 Riyadh, after taraweeh). Change the time, not the theme: D bans tying crystals or energy to Ramadan or worship.
- **Week 3 test:** if A's UTM data shows the English buyers are mostly in the US, test slot A at 21:00 UTC (16:00 New York) and move slot B to 16:30 UTC (19:30 Riyadh).

---

## 4. Hook bank: 40 hooks, English and Arabic

Hooks are tagged by pillar and type so the learning loop can rank hook *types*, not just individual lines. The Arabic is adapted, not translated: it moves to nominal or first-person phrasing to avoid gendered "you", swaps stones where English uses "protection", and uses Gulf speech only inside quotes (H39).

| ID | Pillar | Type | Source | English | Arabic (adapted) | Note |
|---|---|---|---|---|---|---|
| H01 | P1 | contrast | approved | Same behavior. Different reasons. | السلوك نفسه. والأسباب مختلفة. | Signature line; C01/R01. |
| H02 | P1 | open_loop | approved idea | Three people can't say no. Not one of them for the same reason. | ثلاثة أشخاص يصعب عليهم قول «لا». ولا أحد منهم للسبب نفسه. |  |
| H03 | P1 | question | approved | You know what you do. But do you know what's driving it? | نعرف ما نفعله. لكن هل نعرف ما الذي يحرّكه؟ | AR uses the site's first-person plural. |
| H04 | P1 | question | approved | You notice the pattern. But what keeps it going? | النمط واضح لك. لكن ما الذي يُبقيه مستمرًا؟ |  |
| H05 | P1 | myth_flip | new | People-pleasing isn't one pattern. It's at least three. | إرضاء الآخرين ليس نمطًا واحدًا، بل ثلاثة على الأقل. | Search keyword: people pleasing / إرضاء الآخرين. |
| H06 | P1 | myth_flip | new | Overthinking every decision? The decision might not be the problem. | تفكير زائد قبل كل قرار؟ ربما القرار نفسه ليس المشكلة. | Search keyword: overthinking / التفكير الزائد. |
| H07 | P1 | quote | quiz Q11 | "It's easier if I just do it myself." Same sentence, three different reasons. | «أسهل أن أنجزه بنفسي». الجملة نفسها، وثلاثة أسباب مختلفة. |  |
| H08 | P1 | question | quiz Q11 | Ever pull back right when things start going well? | في اللحظة التي تبدأ فيها الأمور بالتحسّن، يأتي التراجع. لماذا؟ | AR in nominal form: no gendered 'you'. |
| H09 | P1 | identity | report labels | The Over Giver, in 5 quiet moments. | نمط العطاء المُفرِط في خمس لحظات صغيرة. | Template: swap {Pattern} from PATTERNS. |
| H10 | P2 | question | quiz Q12 | When no one is listening, which thought has been loudest lately? | حين لا يسمعك أحد، أي فكرة كانت الأعلى صوتًا مؤخرًا؟ | Use only the non-distress options. |
| H11 | P2 | scenario | quiz Q5 | Someone compliments you. What's the first thing out of your mouth? | أحدهم يمدحك. ما أول جملة تخرج منك؟ |  |
| H12 | P2 | invitation | quiz section D | Pick the line that feels a little too familiar. | أي عبارة تبدو مألوفة أكثر من اللازم؟ |  |
| H13 | P2 | question | quiz Q2 | When life hits you, how long until you feel like yourself again? | حين تعصف بك الحياة، كم من الوقت يلزم للعودة إلى نفسك؟ |  |
| H14 | P2 | scenario | quiz Q3 | Someone brings their bad mood into the room. How long does it stay with you? | شخص يدخل بمزاجه الثقيل إلى المكان. كم يبقى أثره معك؟ |  |
| H15 | P2 | scenario | quiz Q11 | Someone asks what you want, and you freeze a little. Familiar? | «ماذا أريد؟» سؤال يبدو بسيطًا، إلى أن يُطرح عليّ. | AR first person. |
| H16 | P2 | question | quiz Q1 | Honestly: how has this week actually been? | بصراحة: كيف كان هذا الأسبوع فعلًا؟ | Good Sunday/Monday post. |
| H17 | P2 | question | quiz Q6 | When you need to say what you really feel, what usually happens? | حين يحين وقت قول ما في القلب فعلًا، ماذا يحدث عادةً؟ |  |
| H18 | P3 | myth_flip | library | Before you buy rose quartz for love, read this. | قبل شراء الكوارتز الوردي «من أجل الحب»، هذه الفكرة أولًا. | Search: rose quartz meaning / معنى الكوارتز الوردي. |
| H19 | P3 | myth_flip | library | Citrine isn't a money magnet. Here's what it actually stands for. | السترين ليس مغناطيسًا للمال. وهذا ما يرمز إليه فعلًا. | Negates the claim; never imply the opposite. |
| H20 | P3 | quote | library | "I need protection, so I need black obsidian." Not so fast. | «أمتصّ طاقة الجميع، إذن أحتاج إلى التورمالين الأسود». ليس بهذه البساطة. | AR deliberately swaps stone + wish: no 'protection' framing in Arabic. |
| H21 | P3 | contrast | library | The same crystal can be exactly right for one person and the opposite of what another needs. | الحجر نفسه قد يناسب شخصًا تمامًا، ويكون عكس ما يحتاجه شخص آخر. |  |
| H22 | P3 | myth_flip | library | A busy mind doesn't always need amethyst. | العقل المزدحم لا يحتاج دائمًا إلى الجمشت. |  |
| H23 | P3 | question | approved | What if choosing a crystal started with understanding yourself? | ماذا لو بدأ اختيار الكريستال بفهم الذات؟ |  |
| H24 | P3 | curiosity_fact | library | Most citrine sold today started out as amethyst. | معظم السترين المُباع اليوم بدأ جمشتًا. | From the amethyst article facts. |
| H25 | P4 | question | approved | You know about the seven energy centers. But what about yours? | مراكز الطاقة السبعة معروفة. لكن ماذا عن مراكزك أنت؟ |  |
| H26 | P4 | statement | approved | Seven centers. Seven dimensions of your experience. | سبعة مراكز. سبعة أبعاد لتجربتك. |  |
| H27 | P4 | statement | quiz section C | Your body often knows what your mind is still trying to explain. | جسدك يعرف غالبًا ما لا يزال عقلك يحاول تفسيره. | Add 'Reflective, not medical.' on screen. |
| H28 | P4 | image | centre lessons | A tree doesn't stand firm because the wind is still. | الشجرة لا تثبت لأن الريح ساكنة، بل لأن جذورها عميقة. | Root. |
| H29 | P4 | myth_flip | centre lessons | Your Throat center isn't only about speaking up. | مركز الحلق لا يتعلّق بالكلام وحده. | Throat: honesty with yourself first, listening as much as speaking. |
| H30 | P4 | image | centre lessons | The heart is like the breath: it can't live on breathing out alone. | القلب كالنَّفَس: لا يعيش بالزفير وحده. | Heart. |
| H31 | P5 | question | approved | Curious what a personal reading actually looks like? | كيف تبدو القراءة الشخصية فعلًا؟ | AR needs the Arabic sample (or the EN-sample label). |
| H32 | P5 | statement | new | 12 questions. One private reading. Here's what's inside. | ١٢ سؤالًا. قراءة خاصة واحدة. وهذا ما بداخلها. |  |
| H33 | P5 | curiosity | sample | Lina isn't real. Her reading shows you what a real one looks like. | لينا شخصية خيالية، لكن قراءتها تُظهر شكل القراءة الحقيقي. | Always 'illustrative sample'. |
| H34 | P5 | choice | approved pricing | $8.88 or $18.88: how deeply would you like to explore? | $8.88 أم $18.88؟ ما العمق الذي يناسبك في الاستكشاف؟ |  |
| H35 | P5 | transparency | new | We just launched. No reviews yet. So here's exactly what you get. | أطلقنا للتو، ولا مراجعات بعد. لذلك هذا بالضبط ما تتضمّنه القراءة. | Founder reel R06. |
| H36 | P6 | question | approved | You know how to give. But what happens when it's your turn to receive? | العطاء سهل عليك. لكن ماذا يحدث حين يأتي دورك في التلقّي؟ |  |
| H37 | P6 | question | approved | What if your money block isn't where you think it is? | ماذا لو كانت نقطة التعثّر في علاقتك بالمال بمكان غير الذي تتوقعه؟ | Money: disclaimer mandatory. |
| H38 | P6 | statement | approved | A need. A belief. A feeling. A response. A result. | حاجة. معتقد. شعور. استجابة. نتيجة. |  |
| H39 | P6 | quote | quiz Q5 | "No, no, it's fine." Why is that the first thing we say when someone offers help? | «لا لا، ما له داعي». لماذا هي أول ما نقوله حين يعرض أحدهم المساعدة؟ | AR quote in Khaleeji, narration in white MSA. |
| H40 | P6 | scenario | new (Gulf) | Someone insists on paying the bill. What happens inside you? | أحدهم يصرّ على دفع الفاتورة. ماذا يحدث في داخلك؟ | The 'bill fight' is a strong Gulf receiving moment. |

Use with a formula: P1 hooks pair with C01, C08, R01, R08; P2 with C02, R02; P3 with C04, R03; P4 with C03, R04; P5 with C05, C07, R05, R06; P6 with C06, R07, R08.

---

## 5. Caption and hashtag system

### 5.1 Caption structure (both platforms, both languages)
1. **Line 1, the keyword hook.** Restate the hook with the pillar's main search phrase, ≤ 125 characters (Instagram cuts off around there; TikTok shows one or two lines). Write it like a search result, because public posts from professional Instagram accounts can now appear in Google results.
2. **Body.** 2-5 short lines, one idea, the brand voice (warm, curious questions over claims). EN in second person; AR in nominal or first-person form.
3. **Participation prompt.** "Which one: 1, 2 or 3?" / "Which center did you pause on?" / "Where does yours get stuck?"
4. **CTA line** for the tier (section 1), then the soft bio-link line.
5. **Required labels, when they apply:** "Illustrative sample · Lina is fictional" (sample posts); "Not a prediction of your financial future. Not financial advice." (money posts); D's footer on every post: *Reflective guidance, not medical, psychological, or financial advice. Made with AI.* / *إرشاد تأملي، وليس نصيحة طبية أو نفسية أو مالية. صُنع بمساعدة الذكاء الاصطناعي.*
6. **Hashtags:** 3-5 (below).

**Length per surface**

| Surface | English | Arabic | Notes |
|---|---|---|---|
| IG carousel | 90-200 words | 70-170 words | Mini-article: carousels earn saves and search |
| IG reel | 40-100 words | 35-90 words | The reel carries the message; the caption adds the keyword and the prompt |
| TikTok video | 150-600 characters | 150-600 characters | Keyword in the first sentence; say it in the VO too |
| TikTok photo mode | Title ≤ 90 characters + 150-600 characters | Same | Title = hook + keyword |

### 5.2 Keyword SEO
- **Instagram search** reads the caption, the profile **Name** field, on-screen text and alt text; hashtags are now a minor signal (and capped at 5 per post). Set the Name field to a searchable phrase, for example "My Crystal Code · Crystal & Chakra Reading"; put the Arabic phrase in the bio.
- **TikTok search** reads the caption, on-screen text (OCR), the spoken words and hashtags. Put the exact phrase in the first caption sentence, on slide 1 or 2 (or the hook text), and in the first 3 seconds of VO.
- **Arabic search** behaves differently. People type hamza-less and colloquial forms, so write hashtags hamza-less (#ارضاء_الاخرين), and use both the common term «الشاكرات» and the brand term «مراكز الطاقة». Target «معنى حجر …» (meaning), never «فوائد» (benefits), which implies effects.

| Pillar | EN search phrases | AR search phrases |
|---|---|---|
| P1 | people pleasing; how to say no; overthinking; setting boundaries; why do I always say yes | إرضاء الآخرين؛ كيف أقول لا؛ التفكير الزائد؛ وضع الحدود؛ فهم الذات |
| P2 | self discovery questions; self reflection questions; journal prompts; know yourself | أسئلة لاكتشاف الذات؛ أسئلة عميقة؛ تأمل ذاتي؛ اكتشاف الذات |
| P3 | {stone} meaning; crystal meanings; which crystal is right for me; crystals for beginners | معنى حجر {stone_ar}؛ معاني الأحجار؛ أي حجر يناسبني؛ الكريستال |
| P4 | 7 chakras explained; chakra meaning; {center} chakra; energy centers | الشاكرات السبع؛ مراكز الطاقة؛ معنى الشاكرات؛ شاكرا {center_ar} |
| P5 | chakra reading; crystal reading; personalized reading; what is my crystal | قراءة شخصية؛ قراءة مراكز الطاقة؛ كريستال كود |
| P6 | relationship with money; hard to receive compliments; money mindset; accepting help | علاقتي بالمال؛ صعوبة تقبّل المديح؛ التلقي؛ تقدير الذات |

### 5.3 Hashtag sets per pillar
Use the core set and swap in one rotation tag per post. Replace `{stone}`, `{stone_ar}`, `{center}` with the post's variable (for example #rosequartz, #الكوارتز_الوردي, #heartchakra).

| Pillar | EN core set (use 3-5) | EN rotation | AR core set (use 3-5) | AR rotation |
|---|---|---|---|---|
| P1 | #peoplepleaser #howtosayno #selfawareness #patterns #mycrystalcode | #overthinking #boundaries #innerwork #selfdiscovery | #كريستال_كود #اكتشاف_الذات #الوعي_الذاتي #ارضاء_الاخرين #تطوير_الذات | #التفكير_الزائد #فهم_الذات #وعي |
| P2 | #selfdiscovery #selfreflection #journalprompts #mycrystalcode | #knowyourself #innerwork #reflection | #كريستال_كود #اكتشاف_الذات #تأمل_ذاتي #اسئلة_عميقة | #فهم_الذات #وعي |
| P3 | #crystals #crystalmeanings #{stone} #crystaltok #mycrystalcode | #crystalcollection #crystallibrary #crystalcommunity | #كريستال_كود #الكريستال #معاني_الاحجار #{stone_ar} | #احجار_كريمة #احجار_طبيعية |
| P4 | #chakras #energycenters #sevenchakras #spiritualwellness #mycrystalcode | #chakrameaning #{center}chakra #selfdiscovery | #كريستال_كود #مراكز_الطاقة #الشاكرات #الشاكرات_السبع | #وعي #اكتشاف_الذات |
| P5 | #mycrystalcode #crystalreading #chakrareading #selfdiscovery | #personalizedreading #energyreading | #كريستال_كود #قراءة_شخصية #مراكز_الطاقة #اكتشاف_الذات | #الشاكرات |
| P6 | #relationshipwithmoney #receiving #selfworth #mycrystalcode | #moneymindset #peoplepleaser #giving | #كريستال_كود #علاقتي_بالمال #التلقي #تقدير_الذات | #العطاء #الوعي_المالي |

**Never use** (claims, health, astrology or Gulf-sensitive): #crystalhealing #chakrahealing #healingcrystals #energyhealing #manifestmoney #moneymagnet #lawofattraction #manifestation #anxietyrelief #depression #therapy #mentalhealth #astrology #horoscope #العلاج_بالطاقة #العلاج_بالاحجار #جلب_الرزق #جلب_الحظ #العين_والحسد #الابراج #علم_الفلك_الروحي #طاقة_شفائية

### 5.4 First-comment strategy
- **No automated comments.** D bans engagement automation, so the strategist node *drafts* the first comment, and the human who approves the post publishes and pins it within 5 minutes (IG and TikTok).
- **What it says, by tier:**
  - T0: restate the participation prompt, plus one bonus line not in the post ("The fourth reason we cut from slide 6: …"). Bonus lines give people a reason to open the comments, which extends dwell time.
  - T1: point to the free asset ("The full rose quartz page is in the free Crystal Library. Link in bio.").
  - T2/T3: the pay-last line ("The 12 questions come first; you only pay when you're ready to see your reading."). On TikTok, add the Arabic route as plain text: "mycrystalcode.com/ar" (A).
- **DM keyword (PATTERN / نمط):** only once the owner approves A's comment-to-DM flow against D's rule. It is user-initiated and must run on official Meta tooling. TikTok has no equivalent; use video replies.
- **Never** put a required disclaimer only in a comment.
- **Reply rules for the first hour:** reply in the commenter's language; never diagnose ("sounds like your throat center is blocked" is banned); no prices in public replies beyond "link in bio"; on TikTok, answer the best question with a video reply (an R06 variant).

---

## 6. 14-day starter calendar (Mon 2 Nov - Sun 15 Nov 2026)

Two posts a day: slot A in English and slot B in Arabic. Odd days pair an English reel with an Arabic carousel; even days the reverse, so each language gets both formats every day.

**Routing.** D caps Weeks 1-2 at one post per platform per day. During Days 1-14, each post therefore goes to **one** platform: 2 posts a day across Instagram and TikTok, which is what the brief asks for. The rotation (last column) gives each platform both languages and both formats every 4 days. From Day 15, each new post goes to both platforms (≤ 2 a day per platform, D), and the Day 1-14 posts are re-run on the platform that did not get them (re-rendered natively).

| Day | Date | Slot A · EN · 14:00 UTC | Slot B · AR · 18:30 UTC | Warm-up routing (A / B) |
|---|---|---|---|---|
| 1 | Mon 11-02 | **R01** reel · P1 · H02 · T0<br>Struggling to say no (approved three reasons) | **C01** carousel · P1 · H01 · T1<br>Struggling to say no (approved AR block) | TT / IG |
| 2 | Tue 11-03 | **C05** carousel · P5 · H31 · T1<br>Lina walkthrough; pin to grid | **R02** reel · P2 · H11 · T0<br>Q5: someone compliments you | IG / TT |
| 3 | Wed 11-04 | **R02** reel · P2 · H10 · T0<br>Q12: loudest thought (options 2,3,5,6,9,10) | **C04** carousel · P3 · H24 · T1<br>Amethyst: busy-mind shortcut; slide-6 fact: most citrine began as amethyst | IG / TT |
| 4 | Thu 11-05 | **C01** carousel · P1 · H05 · T1<br>People-pleasing: three reasons | **R01** reel · P1 · H02 · T0<br>Struggling to say no | TT / IG |
| 5 | Fri 11-06 | **R05** reel · P5 · H32 · T2<br>Watch the Lina reading open | **C02** carousel · P2 · H14 · T0<br>Q3: someone's mood in your space | TT / IG |
| 6 | Sat 11-07 | **C02** carousel · P2 · H16 · T0<br>Q1: how has this week actually been | **R07** reel · P6 · H40 · T0<br>The bill fight (Gulf receiving) | IG / TT |
| 7 | Sun 11-08 | **R04** reel · P4 · H28 · T1<br>Root: the tree and the wind | **C03** carousel · P4 · H25 · T2<br>All seven centers (AR Lite copy, no birth chart) | IG / TT |
| 8 | Mon 11-09 | **C04** carousel · P3 · H18 · T1<br>Rose quartz: the love shortcut | **R03** reel · P3 · H21 · T1<br>Lapis lazuli: 'can't express yourself' | TT / IG |
| 9 | Tue 11-10 | **R07** reel · P6 · H36 · T3<br>Compliment / help offered -> Full (receiving + Abundance) | **C07** carousel · P5 · H34 · T2<br>Lite vs Full (AR, no birth chart) | TT / IG |
| 10 | Wed 11-11 | **C06** carousel · P6 · H37 · T3<br>Setting your price: the loop | **R08** reel · P1 · H08 · T0<br>Pattern mode: pulling back when things go well | IG / TT |
| 11 | Thu 11-12 | **R03** reel · P3 · H20 · T1<br>Black obsidian: the protection shortcut (EN only) | **C08** carousel · P1 · H09 · T2<br>نمط صنع السلام (Peace Keeper) in 5 moments | IG / TT |
| 12 | Fri 11-13 | **C03** carousel · P4 · H26 · T2<br>All seven centers (EN) | **R04** reel · P4 · H30 · T1<br>Heart: the breath | TT / IG |
| 13 | Sat 11-14 | **C08** carousel · P1 · H09 · T2<br>The Over Giver in 5 quiet moments | **R02** reel · P2 · H15 · T0<br>Q11: 'what do I want?' | TT / IG |
| 14 | Sun 11-15 | **R06** reel · P5 · H35 · T2<br>Founder: we just launched, here's what you get | **C02** carousel · P2 · H12 · T0<br>Q11 lines: pick the one that's too familiar | IG / TT |

28 posts. Pillars: P1 7 (25%), P2 6 (21%), P3 4 (14%), P4 4 (14%), P5 4 (14%), P6 3 (11%). Formats: reel 14, carousel 14. CTA tiers: T0 10, T1 9, T2 7, T3 2. Languages: 14 EN, 14 AR. All 16 formulas are used at least once.

**Day-by-day notes**
- **Pins.** Instagram: Day 1 C01 (*Same behavior*), Day 2 C05 (*What you get*), Day 14 R06 (*Founder*). TikTok: Day 1 R01, Day 4 C01, Day 5 R05 (*Watch a reading open*). Once A's comment-PATTERN flow is live, it replaces the *Same behavior* pin (A §4).
- **Day 3 AR (C04 amethyst):** the citrine/amethyst fact carries the save, without putting a money-associated stone in front of the Gulf audience in Week 1.
- **Days 7 and 9 AR (C03, C07):** Lite copy without the birth chart.
- **Day 9 AR:** C07 replaces the sample walkthrough because there is no Arabic Lina yet. Rendering an Arabic sample is the most valuable fix for Arabic conversion (A §0, D §4).
- **Day 11 EN (R03 black obsidian):** English-only by design ("protection" shortcut).
- **Day 14 EN (R06):** the first founder reel. If filming slips, swap in R05 and move R06 to Day 16; don't fake it with an avatar.
- **Warm start:** the founder's personal network outreach (A §4) runs alongside; the calendar does not depend on it.

---

## 7. Learning loop (what to log, what to change)

- **Log per post** (extends A's row): `post_id, platform, lang, slot, pillar, formula_id, hook_id, hook_type, variable, cta_tier, published_at`, then at 24h and 72h: views/reach, 3-second hold (or average watch %), completion, saves, sends/shares, comments, profile visits, bio taps, keyword comments, redirector clicks.
- **Read the right signal per format:** reels by hold rate and completion; carousels by saves and sends per 1,000 reach and swipe-through (IG reports it); conversion posts by profile visits, bio taps and redirector clicks.
- **Decide on medians, not benchmarks** (A's kill/scale table). After each formula has run 4 times per language, retire the bottom formula variant and give its slots to the top one.
- **Rank hook types**, not just hooks. By Day 30 we should know whether this audience prefers contrast, question, identity or myth-flip hooks, per language. Expect EN and AR to differ.
- **The strategist re-weights pillars monthly:** ±5 points maximum per month, and P5 never drops below 10%.

---

## Appendix: formulas as JSON (`B-formulas.json`)

Each object has `id`, `type` (carousel | reel), `pillar`, `slides_or_beats[]` and `cta_tier`, plus the fields the strategist and renderer need: allowed tiers, save/share trigger, variables, character limits (EN/AR), production mode, compliance notes and recommended hooks. The same file sits next to this document and validates with `python3 -m json.tool`.

```json
[
  {
    "id": "C01",
    "type": "carousel",
    "slug": "same_behavior_different_reasons",
    "name": "Same Behavior, Different Reasons",
    "name_ar": "السلوك نفسه، والأسباب مختلفة",
    "pillar": "P1",
    "alt_pillars": [
      "P6"
    ],
    "funnel_stage": "reach",
    "audience_segment": "Pattern explorer",
    "cta_tier": "T1",
    "cta_tier_allowed": [
      "T0",
      "T1",
      "T2"
    ],
    "save_share_trigger": "SEND: 'Send this to the friend who always says yes.' Recognition of someone else drives DM sends (IG's strongest reach signal). Secondary: comment 1/2/3.",
    "variables": {
      "behavior_bank": "BEHAVIOR_BANK (7 behaviors x 3 reasons, EN + AR)"
    },
    "recommended_hook_ids": [
      "H01",
      "H02",
      "H05",
      "H06",
      "H07",
      "H08"
    ],
    "ar_notes": "Use the approved AR difference block for 'say no'. Reasons in nominal or third-person form (أحدهم / آخر / ثالث) so no gendered 'you'. Right-aligned; numerals ٠١ ٠٢ ٠٣.",
    "compliance": [
      "Reasons are hedged ('may', 'one person'), never diagnoses of the viewer.",
      "No clinical words (anxiety, trauma, codependency, disorder)."
    ],
    "slide_count": 8,
    "canvas": {
      "instagram": "1080x1350 JPG",
      "tiktok_photo": "1080x1920 JPG"
    },
    "slides_or_beats": [
      {
        "n": 1,
        "role": "hook",
        "layout": "L1",
        "instruction": "Open loop on the shared behavior. Default headline: 'Same behavior. Different reasons.' Sub-line names it: 'Three people struggle to say no.'",
        "max_chars_en": 60,
        "max_chars_ar": 54,
        "visual": "Hero object: three tall crystal points side by side, one lit."
      },
      {
        "n": 2,
        "role": "rehook_scene",
        "layout": "L2",
        "instruction": "The behavior in one everyday second-person moment ('Someone asks for a favor. You say yes before they finish the sentence.'). Must work as a standalone hook: IG re-serves slide 2 to people who skipped slide 1.",
        "max_chars_en": 140,
        "max_chars_ar": 126,
        "visual": "Paper; numeral 02."
      },
      {
        "n": 3,
        "role": "reason_1",
        "layout": "L2",
        "instruction": "Person one: the first reason, one sentence, plus what it may be protecting (<=10 words). Hedge with 'may'.",
        "max_chars_en": 120,
        "max_chars_ar": 108,
        "visual": "Numeral 01; glyph Seed of Life."
      },
      {
        "n": 4,
        "role": "reason_2",
        "layout": "L2",
        "instruction": "Person two: a different reason. Same sentence shape as slide 3 so the contrast is visible.",
        "max_chars_en": 120,
        "max_chars_ar": 108,
        "visual": "Numeral 02; glyph Metatron's Cube."
      },
      {
        "n": 5,
        "role": "reason_3",
        "layout": "L2",
        "instruction": "Person three: the third reason.",
        "max_chars_en": 120,
        "max_chars_ar": 108,
        "visual": "Numeral 03; glyph Transmutation."
      },
      {
        "n": 6,
        "role": "turn_summary",
        "layout": "L5",
        "instruction": "All three side by side. Top band repeats the behavior; then 'The behavior looks the same. The pattern behind it may be completely different.' Each card <=64 chars.",
        "max_chars_en": 64,
        "max_chars_ar": 58,
        "visual": "Scene; three glass cards."
      },
      {
        "n": 7,
        "role": "reflect",
        "layout": "L4",
        "instruction": "Question to the reader: 'Which one sounds closest: 1, 2 or 3?' plus one line on why the same advice ('just set boundaries') may fit one person and backfire for another.",
        "max_chars_en": 110,
        "max_chars_ar": 99,
        "visual": "Quote-question, teal orb."
      },
      {
        "n": 8,
        "role": "cta",
        "layout": "L8",
        "instruction": "Tier copy + 'Your context changes the interpretation.' Disclaimer footer.",
        "max_chars_en": 120,
        "max_chars_ar": 108,
        "visual": "CTA end card."
      }
    ],
    "tiktok_photo_adaptation": "Re-render 1080x1920 from the same fields. Keep all 8 slides. Title (<=90 chars) = slide-1 headline + behavior. Put the search keyword (e.g. 'people pleasing', 'how to say no') on slide 1 or 2: TikTok reads on-image text."
  },
  {
    "id": "C02",
    "type": "carousel",
    "slug": "which_line_is_yours",
    "name": "Which Line Is Yours?",
    "name_ar": "أي عبارة تشبهك؟",
    "pillar": "P2",
    "alt_pillars": [
      "P6"
    ],
    "funnel_stage": "reach",
    "audience_segment": "Self-discovery seeker",
    "cta_tier": "T0",
    "cta_tier_allowed": [
      "T0",
      "T2"
    ],
    "save_share_trigger": "COMMENT: 'Comment your number.' Numbered options turn a passive swipe into a one-tap comment; people also tag friends ('you're a 3').",
    "variables": {
      "question": "one of Q1-Q7, Q11, Q12 from quizContent.{en,ar}.ts (see exclusions)",
      "options": "4 options + the steadiest option"
    },
    "recommended_hook_ids": [
      "H10",
      "H11",
      "H12",
      "H13",
      "H14",
      "H15",
      "H16",
      "H17",
      "H39"
    ],
    "ar_notes": "Quote the founder's Arabic options from quizContent.ar.ts verbatim (they are first-person, so no gender issue for the reader). Hedged lines in nominal form.",
    "compliance": [
      "Never use the excluded distress options (QUIZ_EXCLUDE).",
      "Hedged lines describe possibilities, never a verdict ('you have low self-worth' is banned)."
    ],
    "slide_count": 8,
    "canvas": {
      "instagram": "1080x1350 JPG",
      "tiktok_photo": "1080x1920 JPG"
    },
    "slides_or_beats": [
      {
        "n": 1,
        "role": "hook",
        "layout": "L1",
        "instruction": "The quiz question, verbatim or trimmed to <=60 chars ('Someone offers to help you. What usually happens?'). Sub-line: 'Pick the line that feels a little too familiar.'",
        "max_chars_en": 60,
        "max_chars_ar": 54,
        "visual": "Scene; Cormorant italic question."
      },
      {
        "n": 2,
        "role": "frame",
        "layout": "L2",
        "instruction": "'This is 1 of the 12 questions in the MCC questionnaire. No right answers. Notice which line you pause on.'",
        "max_chars_en": 140,
        "max_chars_ar": 126,
        "visual": "Paper."
      },
      {
        "n": 3,
        "role": "option_1",
        "layout": "L2",
        "instruction": "Option 1 verbatim (founder wording) + one hedged line 'For some people, this is about...'.",
        "max_chars_en": 120,
        "max_chars_ar": 108,
        "visual": "Numeral 01."
      },
      {
        "n": 4,
        "role": "option_2",
        "layout": "L2",
        "instruction": "Option 2 + hedged line.",
        "max_chars_en": 120,
        "max_chars_ar": 108,
        "visual": "Numeral 02."
      },
      {
        "n": 5,
        "role": "option_3",
        "layout": "L2",
        "instruction": "Option 3 + hedged line.",
        "max_chars_en": 120,
        "max_chars_ar": 108,
        "visual": "Numeral 03."
      },
      {
        "n": 6,
        "role": "option_4",
        "layout": "L2",
        "instruction": "Option 4 + hedged line.",
        "max_chars_en": 120,
        "max_chars_ar": 108,
        "visual": "Numeral 04."
      },
      {
        "n": 7,
        "role": "steady_option",
        "layout": "L4",
        "instruction": "The steadiest option from the same question ('I can receive it, say thank you, and let it be good.') + 'If this is you, notice what made it possible.' Keeps the post non-pathologizing.",
        "max_chars_en": 110,
        "max_chars_ar": 99,
        "visual": "Scene, teal orb."
      },
      {
        "n": 8,
        "role": "cta",
        "layout": "L8",
        "instruction": "'Comment your number.' + 'One answer is one piece. A reading looks at all twelve together.' + tier copy.",
        "max_chars_en": 120,
        "max_chars_ar": 108,
        "visual": "CTA end card."
      }
    ],
    "tiktok_photo_adaptation": "Re-render 1080x1920. Keep 8 slides. Title = the question. Ask for the number in the description too ('Comment 1-5')."
  },
  {
    "id": "C03",
    "type": "carousel",
    "slug": "which_center_is_calling_you",
    "name": "Which Center Is Calling You?",
    "name_ar": "أي مركز يطلب انتباهك؟",
    "pillar": "P4",
    "alt_pillars": [],
    "funnel_stage": "trust",
    "audience_segment": "Energy-curious",
    "cta_tier": "T2",
    "cta_tier_allowed": [
      "T1",
      "T2"
    ],
    "save_share_trigger": "SAVE: a complete 7-card reference set people come back to. Secondary: 'Comment the center you paused on.'",
    "variables": {
      "centers": "CENTERS (7, EN + AR: name, theme, 'you might notice', lesson)"
    },
    "recommended_hook_ids": [
      "H25",
      "H26",
      "H27"
    ],
    "ar_notes": "Use the approved AR center names and themes. Use the neutral AR lessons in CENTERS, not the feminine file, unless the post is explicitly first-person.",
    "compliance": [
      "Mandatory L6 footnote: 'Reflective, not a medical measurement.'",
      "No 'blocked/unblocked'. Never assign a state to the viewer.",
      "No organ, illness or symptom words on any center card."
    ],
    "slide_count": 10,
    "canvas": {
      "instagram": "1080x1350 JPG",
      "tiktok_photo": "1080x1920 JPG"
    },
    "slides_or_beats": [
      {
        "n": 1,
        "role": "hook",
        "layout": "L1",
        "instruction": "Approved line: 'You know about the seven energy centers. But what about yours?' or 'Which center is asking for your attention?'",
        "max_chars_en": 60,
        "max_chars_ar": 54,
        "visual": "Aligned Chakras glyph as hero, brand gradient."
      },
      {
        "n": 2,
        "role": "how_to_read",
        "layout": "L2",
        "instruction": "'Read each card. Notice the one you pause on.' Support line: 'Reflective and spiritual, not a medical measurement.'",
        "max_chars_en": 140,
        "max_chars_ar": 126,
        "visual": "Paper."
      },
      {
        "n": 3,
        "role": "center_root",
        "layout": "L6 single",
        "instruction": "Root: theme + 'You might notice...' + lesson (one line each).",
        "max_chars_en": 160,
        "max_chars_ar": 144,
        "visual": "Single-centre variant, no state pin."
      },
      {
        "n": 4,
        "role": "center_sacral",
        "layout": "L6 single",
        "instruction": "Sacral: same structure.",
        "max_chars_en": 160,
        "max_chars_ar": 144,
        "visual": ""
      },
      {
        "n": 5,
        "role": "center_solar_plexus",
        "layout": "L6 single",
        "instruction": "Solar Plexus.",
        "max_chars_en": 160,
        "max_chars_ar": 144,
        "visual": ""
      },
      {
        "n": 6,
        "role": "center_heart",
        "layout": "L6 single",
        "instruction": "Heart.",
        "max_chars_en": 160,
        "max_chars_ar": 144,
        "visual": ""
      },
      {
        "n": 7,
        "role": "center_throat",
        "layout": "L6 single",
        "instruction": "Throat.",
        "max_chars_en": 160,
        "max_chars_ar": 144,
        "visual": ""
      },
      {
        "n": 8,
        "role": "center_third_eye",
        "layout": "L6 single",
        "instruction": "Third Eye.",
        "max_chars_en": 160,
        "max_chars_ar": 144,
        "visual": ""
      },
      {
        "n": 9,
        "role": "center_crown",
        "layout": "L6 single",
        "instruction": "Crown.",
        "max_chars_en": 160,
        "max_chars_ar": 144,
        "visual": ""
      },
      {
        "n": 10,
        "role": "cta",
        "layout": "L8",
        "instruction": "'Which one did you pause on?' + 'Your reading maps all seven from your own answers.' + tier copy + footnote.",
        "max_chars_en": 120,
        "max_chars_ar": 108,
        "visual": "CTA end card."
      }
    ],
    "tiktok_photo_adaptation": "TikTok: merge to 8 by pairing Root+Sacral and Third Eye+Crown on two slides (L6 list variant), or keep 10: photo mode allows 35. Title: 'Which energy center is calling you?'"
  },
  {
    "id": "C04",
    "type": "carousel",
    "slug": "the_crystal_shortcut",
    "name": "The Crystal Shortcut",
    "name_ar": "الطريق المختصر إلى الحجر",
    "pillar": "P3",
    "alt_pillars": [],
    "funnel_stage": "reach",
    "audience_segment": "Crystal enthusiast",
    "cta_tier": "T1",
    "cta_tier_allowed": [
      "T1",
      "T2"
    ],
    "save_share_trigger": "SAVE + SEND: a myth-flip plus one surprising fact ('most citrine sold today began as amethyst') is classic save material; crystal people send it to the friend who buys stones for everything.",
    "variables": {
      "crystal": "CRYSTAL_SHORTCUTS (18 live library stones)",
      "source": "shared/crystals/<slug>.ts: misunderstood, fit, facts, perspective"
    },
    "recommended_hook_ids": [
      "H18",
      "H19",
      "H20",
      "H21",
      "H22",
      "H23",
      "H24"
    ],
    "ar_notes": "Arabic library articles exist for most stones; use their wording. For black obsidian and shungite, do not use 'protection' framing in Arabic (choose another stone).",
    "compliance": [
      "Crystals are 'associated with' / 'in contemporary crystal practice'. Never: heals, attracts, protects you from, cleanses, raises your vibration.",
      "Facts only from the stone's library file; never invent history.",
      "Do not describe how a reading chooses stones (method stays private)."
    ],
    "slide_count": 8,
    "canvas": {
      "instagram": "1080x1350 JPG",
      "tiktok_photo": "1080x1920 JPG"
    },
    "slides_or_beats": [
      {
        "n": 1,
        "role": "hook",
        "layout": "L1",
        "instruction": "'Before you buy {crystal} for {wish}, read this.' (or the fact as hook).",
        "max_chars_en": 60,
        "max_chars_ar": 54,
        "visual": "Hero crystal cut-out from the library photo, halo."
      },
      {
        "n": 2,
        "role": "shortcut",
        "layout": "L2",
        "instruction": "'The common shortcut: {wish} -> {crystal}.' + 'But the same wish can come from opposite places.' (library wording)",
        "max_chars_en": 140,
        "max_chars_ar": 126,
        "visual": "Paper."
      },
      {
        "n": 3,
        "role": "person_a",
        "layout": "L2",
        "instruction": "For whom the traditional association may be exactly right (from 'misunderstood').",
        "max_chars_en": 140,
        "max_chars_ar": 126,
        "visual": "Numeral 01."
      },
      {
        "n": 4,
        "role": "person_b",
        "layout": "L2",
        "instruction": "For whom it may deepen the very loop they want to leave.",
        "max_chars_en": 140,
        "max_chars_ar": 126,
        "visual": "Numeral 02."
      },
      {
        "n": 5,
        "role": "may_not_fit",
        "layout": "L3",
        "instruction": "'When {crystal} may not be what you need': 2-3 items from the 'fit' section.",
        "max_chars_en": 56,
        "max_chars_ar": 50,
        "visual": "List, 3 items max, 56 chars each."
      },
      {
        "n": 6,
        "role": "fact",
        "layout": "L4",
        "instruction": "One verified fact from 'At a glance' or 'history' only (name origin, mineral, a museum-documented use).",
        "max_chars_en": 110,
        "max_chars_ar": 99,
        "visual": "Scene."
      },
      {
        "n": 7,
        "role": "mcc_view",
        "layout": "L4",
        "instruction": "Founder line: 'In My Crystal Code, the person comes first, the stone second.'",
        "max_chars_en": 110,
        "max_chars_ar": 99,
        "visual": "Scene, Seed of Life ghost."
      },
      {
        "n": 8,
        "role": "cta",
        "layout": "L8",
        "instruction": "T1: 'Read the full {crystal} page in the free Crystal Library. Link in bio.' or T2.",
        "max_chars_en": 120,
        "max_chars_ar": 108,
        "visual": "CTA end card."
      }
    ],
    "tiktok_photo_adaptation": "Re-render 1080x1920; title = '{crystal} meaning: the shortcut most people take'. Keep 8."
  },
  {
    "id": "C05",
    "type": "carousel",
    "slug": "sample_reading_walkthrough",
    "name": "Sample-Reading Walkthrough",
    "name_ar": "جولة في قراءة نموذجية",
    "pillar": "P5",
    "alt_pillars": [],
    "funnel_stage": "convert",
    "audience_segment": "Warm, all segments",
    "cta_tier": "T2",
    "cta_tier_allowed": [
      "T1",
      "T2",
      "T3"
    ],
    "save_share_trigger": "SAVE: 'Save this to read before you decide.' It is the product tour; pin it to the profile grid.",
    "variables": {
      "pages": "lina-01 energy story (Lite+Full), lina-02 pattern under pressure (Full; previewed in Lite), lina-03 energy-center map (Lite light / Full detailed), lina-04 focus centers (Full), lina-05 crystal protocol (Lite+Full), lina-06 seven-day reset (Full)"
    },
    "recommended_hook_ids": [
      "H31",
      "H32",
      "H33",
      "H35"
    ],
    "ar_notes": "BLOCKED for Arabic until an Arabic Lina sample is rendered (landing.ar.ts sample.pages is empty). Fallback: EN pages with the label «العيّنة بالإنجليزية حاليًا · لينا شخصية خيالية», or use C07 instead. Never mention the birth chart in Arabic.",
    "compliance": [
      "'Illustrative sample · Lina is fictional' on every page slide and in the caption.",
      "Tier badges must match the tier matrix exactly.",
      "Delivery is 'within minutes', never a number of minutes."
    ],
    "slide_count": 9,
    "canvas": {
      "instagram": "1080x1350 JPG",
      "tiktok_photo": "1080x1920 JPG"
    },
    "slides_or_beats": [
      {
        "n": 1,
        "role": "hook",
        "layout": "L1",
        "instruction": "'Curious what a personal reading actually looks like?' + pill 'ILLUSTRATIVE SAMPLE'.",
        "max_chars_en": 60,
        "max_chars_ar": 54,
        "visual": "Two-page fan of lina-01 and lina-03."
      },
      {
        "n": 2,
        "role": "what_it_is",
        "layout": "L3",
        "instruction": "4 items: 12 questions in 4 sections; a private web link by email within minutes; nothing physical ships; reflective guidance, not advice.",
        "max_chars_en": 56,
        "max_chars_ar": 50,
        "visual": "List."
      },
      {
        "n": 3,
        "role": "page_energy_story",
        "layout": "L7",
        "instruction": "lina-01. Callout: 'Your energy story'. Tier badge: Lite + Full.",
        "max_chars_en": 34,
        "max_chars_ar": 31,
        "visual": "Mandatory label: ILLUSTRATIVE SAMPLE · LINA IS FICTIONAL."
      },
      {
        "n": 4,
        "role": "page_pattern",
        "layout": "L7",
        "instruction": "lina-02. Callout: 'Your pattern under pressure'. Badge: Full (previewed in Lite).",
        "max_chars_en": 34,
        "max_chars_ar": 31,
        "visual": "Same label."
      },
      {
        "n": 5,
        "role": "page_map",
        "layout": "L7",
        "instruction": "lina-03. Callout: 'Your 7 centers, mapped'. Badge: Lite (light) / Full (detailed).",
        "max_chars_en": 34,
        "max_chars_ar": 31,
        "visual": "Same label."
      },
      {
        "n": 6,
        "role": "page_focus",
        "layout": "L7",
        "instruction": "lina-04. Callout: 'Your focus centers'. Badge: Full.",
        "max_chars_en": 34,
        "max_chars_ar": 31,
        "visual": "Same label."
      },
      {
        "n": 7,
        "role": "page_crystals",
        "layout": "L7",
        "instruction": "lina-05. Callout: 'Your four-crystal protocol'. Badge: Lite + Full.",
        "max_chars_en": 34,
        "max_chars_ar": 31,
        "visual": "Same label."
      },
      {
        "n": 8,
        "role": "page_reset",
        "layout": "L7",
        "instruction": "lina-06. Callout: 'Your seven-day reset'. Badge: Full.",
        "max_chars_en": 34,
        "max_chars_ar": 31,
        "visual": "Same label."
      },
      {
        "n": 9,
        "role": "cta",
        "layout": "L8",
        "instruction": "Two price cards: Lite $8.88 / Full $18.88 launch price (list $24.88) + 'Upgrade later for the difference.' + 'Lina is fictional. Your reading depends on your answers.'",
        "max_chars_en": 120,
        "max_chars_ar": 108,
        "visual": "CTA end card, two cards."
      }
    ],
    "tiktok_photo_adaptation": "Re-render 1080x1920 with the page at 760px wide. Keep 9. Title: 'What a personal crystal & energy-center reading looks like (sample)'."
  },
  {
    "id": "C06",
    "type": "carousel",
    "slug": "the_loop_behind_it",
    "name": "The Loop Behind It",
    "name_ar": "الحلقة التي خلفه",
    "pillar": "P6",
    "alt_pillars": [
      "P1"
    ],
    "funnel_stage": "convert",
    "audience_segment": "Pattern explorer + money angle",
    "cta_tier": "T3",
    "cta_tier_allowed": [
      "T0",
      "T3"
    ],
    "save_share_trigger": "SAVE: a named mental model (need, belief, feeling, response, result) that people want to reuse; COMMENT: 'Where does yours get stuck?'",
    "variables": {
      "scenario": "SCENARIO_BANK_MONEY",
      "loop": "A need -> a belief -> a feeling -> a response -> a result (approved)"
    },
    "recommended_hook_ids": [
      "H36",
      "H37",
      "H38",
      "H39",
      "H40"
    ],
    "ar_notes": "Approved AR abundance block exists (حاجة، معتقد، شعور، استجابة، نتيجة). Scenario in Gulf context works well (the bill, family support, setting a price).",
    "compliance": [
      "Mandatory: 'not a prediction of your financial future' + 'not financial advice'.",
      "No income figures, no 'attract', 'manifest', 'abundance flows', '8.88 is lucky'.",
      "The illustrative loop is labeled 'An example' and never presented as a real person."
    ],
    "slide_count": 8,
    "canvas": {
      "instagram": "1080x1350 JPG",
      "tiktok_photo": "1080x1920 JPG"
    },
    "slides_or_beats": [
      {
        "n": 1,
        "role": "hook",
        "layout": "L1",
        "instruction": "Approved: 'What if your money block isn't where you think it is?'",
        "max_chars_en": 60,
        "max_chars_ar": 54,
        "visual": "Transmutation glyph hero."
      },
      {
        "n": 2,
        "role": "scene",
        "layout": "L2",
        "instruction": "One everyday money moment in second person ('You know what you want to charge. Then you start typing the number.').",
        "max_chars_en": 140,
        "max_chars_ar": 126,
        "visual": "Paper."
      },
      {
        "n": 3,
        "role": "need",
        "layout": "L2",
        "instruction": "01 A need (e.g. 'to feel safe being chosen').",
        "max_chars_en": 100,
        "max_chars_ar": 90,
        "visual": "Numeral 01, loop diagram 1/5 lit."
      },
      {
        "n": 4,
        "role": "belief",
        "layout": "L2",
        "instruction": "02 A belief, in quotes, first person ('If I ask for more, they'll go elsewhere.').",
        "max_chars_en": 100,
        "max_chars_ar": 90,
        "visual": "2/5 lit."
      },
      {
        "n": 5,
        "role": "feeling",
        "layout": "L2",
        "instruction": "03 A feeling ('A tightness while you type the number.').",
        "max_chars_en": 100,
        "max_chars_ar": 90,
        "visual": "3/5 lit."
      },
      {
        "n": 6,
        "role": "response",
        "layout": "L2",
        "instruction": "04 A response ('You lower the price before anyone asks.').",
        "max_chars_en": 100,
        "max_chars_ar": 90,
        "visual": "4/5 lit."
      },
      {
        "n": 7,
        "role": "result",
        "layout": "L4",
        "instruction": "05 A result that quietly confirms the belief. Then: 'Where does yours get stuck: recognizing, committing, asking, or receiving?'",
        "max_chars_en": 110,
        "max_chars_ar": 99,
        "visual": "Loop closes."
      },
      {
        "n": 8,
        "role": "cta",
        "layout": "L8",
        "instruction": "Single offer card Full + mandatory line: 'It's not a prediction of your financial future. It's a different way to understand your relationship with money.'",
        "max_chars_en": 140,
        "max_chars_ar": 126,
        "visual": "CTA end card, single offer."
      }
    ],
    "tiktok_photo_adaptation": "Re-render 1080x1920. Keep 8. Title: 'Your money block might not be where you think'."
  },
  {
    "id": "C07",
    "type": "carousel",
    "slug": "how_deep_lite_vs_full",
    "name": "How Deep Do You Want to Go? (Lite vs Full)",
    "name_ar": "ما العمق الذي يناسبك؟",
    "pillar": "P5",
    "alt_pillars": [],
    "funnel_stage": "convert",
    "audience_segment": "Warm, deciding",
    "cta_tier": "T2",
    "cta_tier_allowed": [
      "T2",
      "T3"
    ],
    "save_share_trigger": "SAVE: a decision aid ('save this for when you're ready'). Pin to profile.",
    "variables": {
      "tiers": "landing pricing block (verified tier matrix)"
    },
    "recommended_hook_ids": [
      "H34",
      "H32",
      "H35"
    ],
    "ar_notes": "Arabic version drops the birth chart and birth crystal entirely (UAE astrology-advertising rule, D 2.3). Lite in AR: energy story, 7 lighter center cards, 4-crystal protocol.",
    "compliance": [
      "Prices and contents must match the tier matrix.",
      "Launch-price deadline only if the owner has committed to a date (A §2)."
    ],
    "slide_count": 7,
    "canvas": {
      "instagram": "1080x1350 JPG",
      "tiktok_photo": "1080x1920 JPG"
    },
    "slides_or_beats": [
      {
        "n": 1,
        "role": "hook",
        "layout": "L1",
        "instruction": "'$8.88 or $18.88: how deeply would you like to explore?'",
        "max_chars_en": 60,
        "max_chars_ar": 54,
        "visual": "Two price glyphs."
      },
      {
        "n": 2,
        "role": "same_start",
        "layout": "L2",
        "instruction": "'Both start with the same 12 questions. You pay only at the end. Your reading arrives as a private link by email within minutes.'",
        "max_chars_en": 140,
        "max_chars_ar": 126,
        "visual": "Paper."
      },
      {
        "n": 3,
        "role": "lite",
        "layout": "L3",
        "instruction": "Lite: energy story & snapshot; 7 center cards (lighter); 4-crystal protocol; birth chart + birth crystal (EN only). 'Best if you want an introduction.'",
        "max_chars_en": 56,
        "max_chars_ar": 50,
        "visual": "List."
      },
      {
        "n": 4,
        "role": "full",
        "layout": "L3",
        "instruction": "Full: 7 detailed center cards + cross-center balance; focus centers; pattern under pressure; the Abundance Pattern; seven-day reset; final message. 'Best if a pattern keeps repeating.'",
        "max_chars_en": 56,
        "max_chars_ar": 50,
        "visual": "List, 5 items."
      },
      {
        "n": 5,
        "role": "difference",
        "layout": "L2",
        "instruction": "One line: 'Deeper pattern sections and the seven-day reset belong to Full.' (EN may add: 'The birth chart belongs to Lite.')",
        "max_chars_en": 140,
        "max_chars_ar": 126,
        "visual": "Paper."
      },
      {
        "n": 6,
        "role": "no_lose",
        "layout": "L2",
        "instruction": "'Start with Lite. Upgrade later for the difference.' + 'Full is $18.88 at launch (list $24.88).'",
        "max_chars_en": 140,
        "max_chars_ar": 126,
        "visual": "Paper."
      },
      {
        "n": 7,
        "role": "cta",
        "layout": "L8",
        "instruction": "Two-card price block + fit note: 'Not a diagnosis or a verdict. A personalized starting point.'",
        "max_chars_en": 120,
        "max_chars_ar": 108,
        "visual": "CTA end card."
      }
    ],
    "tiktok_photo_adaptation": "Re-render 1080x1920. Keep 7. Title: 'Lite or Full? What each reading includes'."
  },
  {
    "id": "C08",
    "type": "carousel",
    "slug": "pattern_profile",
    "name": "Pattern Profile: The {Pattern} in 5 Quiet Moments",
    "name_ar": "{النمط} في خمس لحظات صغيرة",
    "pillar": "P1",
    "alt_pillars": [
      "P5"
    ],
    "funnel_stage": "reach",
    "audience_segment": "Pattern explorer",
    "cta_tier": "T2",
    "cta_tier_allowed": [
      "T0",
      "T2",
      "T3"
    ],
    "save_share_trigger": "SEND + TAG: 'Send this to the {Pattern} in your life.' Identity labels are the most shared format in self-discovery.",
    "variables": {
      "pattern": "PATTERNS (7 real report labels from display-labels.ts)"
    },
    "recommended_hook_ids": [
      "H09",
      "H03",
      "H04"
    ],
    "ar_notes": "Use the neutral form «نمط العطاء المُفرِط» etc. (PATTERNS.ar_public) instead of the gendered persona labels, unless the founder approves a feminine-only post.",
    "compliance": [
      "Labels are patterns, never diagnoses or personality verdicts.",
      "Exclude 'The Exhausted One' from the public rotation (burnout drifts into health)."
    ],
    "slide_count": 9,
    "canvas": {
      "instagram": "1080x1350 JPG",
      "tiktok_photo": "1080x1920 JPG"
    },
    "slides_or_beats": [
      {
        "n": 1,
        "role": "hook",
        "layout": "L1",
        "instruction": "'The {Pattern}, in 5 quiet moments.' Sub: 'A pattern, not a verdict.'",
        "max_chars_en": 60,
        "max_chars_ar": 54,
        "visual": "Owned glyph per pattern."
      },
      {
        "n": 2,
        "role": "definition",
        "layout": "L2",
        "instruction": "One plain-language line on what this pattern tends to look like (seed from the quiz line).",
        "max_chars_en": 140,
        "max_chars_ar": 126,
        "visual": "Paper."
      },
      {
        "n": 3,
        "role": "moment_1",
        "layout": "L2",
        "instruction": "'You may notice...' moment 1: tiny, specific, everyday.",
        "max_chars_en": 100,
        "max_chars_ar": 90,
        "visual": "Numeral 01."
      },
      {
        "n": 4,
        "role": "moment_2",
        "layout": "L2",
        "instruction": "Moment 2.",
        "max_chars_en": 100,
        "max_chars_ar": 90,
        "visual": "Numeral 02."
      },
      {
        "n": 5,
        "role": "moment_3",
        "layout": "L2",
        "instruction": "Moment 3.",
        "max_chars_en": 100,
        "max_chars_ar": 90,
        "visual": "Numeral 03."
      },
      {
        "n": 6,
        "role": "moment_4",
        "layout": "L2",
        "instruction": "Moment 4.",
        "max_chars_en": 100,
        "max_chars_ar": 90,
        "visual": "Numeral 04."
      },
      {
        "n": 7,
        "role": "moment_5",
        "layout": "L2",
        "instruction": "Moment 5.",
        "max_chars_en": 100,
        "max_chars_ar": 90,
        "visual": "Numeral 05."
      },
      {
        "n": 8,
        "role": "protect_and_steady",
        "layout": "L4",
        "instruction": "'What it may be protecting: {need}.' + 'The steadier version can sound like: {steady quiz line}.'",
        "max_chars_en": 110,
        "max_chars_ar": 99,
        "visual": "Scene."
      },
      {
        "n": 9,
        "role": "cta",
        "layout": "L8",
        "instruction": "'A post can't tell you if this is your pattern. Your 12 answers can.' + T2 (or T3: 'your pattern under pressure is a chapter of MCC Full').",
        "max_chars_en": 120,
        "max_chars_ar": 108,
        "visual": "CTA end card."
      }
    ],
    "tiktok_photo_adaptation": "Re-render 1080x1920. Keep 9. Title: 'The Over Giver in 5 quiet moments'."
  },
  {
    "id": "R01",
    "type": "reel",
    "slug": "three_people_one_behavior",
    "name": "Three People, One Behavior",
    "name_ar": "ثلاثة أشخاص، سلوك واحد",
    "pillar": "P1",
    "alt_pillars": [],
    "funnel_stage": "reach",
    "audience_segment": "Pattern explorer",
    "cta_tier": "T0",
    "cta_tier_allowed": [
      "T0",
      "T1"
    ],
    "save_share_trigger": "Comment 1/2/3; sends to friends.",
    "variables": {
      "behavior_bank": "BEHAVIOR_BANK"
    },
    "recommended_hook_ids": [
      "H01",
      "H02",
      "H05",
      "H07"
    ],
    "ar_notes": "Use the approved AR 'say no' reasons; other behaviors from BEHAVIOR_BANK.reasons_ar.",
    "compliance": [
      "No AI human faces; crystals as stand-ins.",
      "AI label on."
    ],
    "duration_s": 28,
    "canvas": "1080x1920 MP4 H.264, 30fps, -14 LUFS",
    "production_mode": "ai_full",
    "production_note": "Faceless. Three tall crystal points stand in for the three people (no AI humans). Image-to-video for the crystals, text-on-motion template for type, TTS voiceover.",
    "voiceover_style": "Warm, unhurried, low-mid female voice; 140-150 wpm EN. AR: calm white MSA, no Egyptian/Levantine markers.",
    "audio": "Original VO + licensed ambient pad at -22 dB; ends on a loop point.",
    "slides_or_beats": [
      {
        "t": "0.0-1.5",
        "role": "hook",
        "on_screen_text": "'3 people can't say no.' (<=7 words)",
        "voiceover": "'Three people can't say no.'",
        "visual": "Dark stage, three crystal points; a light snaps onto the first (motion in the first 0.5s).",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      },
      {
        "t": "1.5-4.0",
        "role": "setup",
        "on_screen_text": "'Same behavior.'",
        "voiceover": "'Same behavior.'",
        "visual": "Slow push-in across all three.",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      },
      {
        "t": "4.0-10.0",
        "role": "reason_1",
        "on_screen_text": "Reason 1, max 2 caption lines",
        "voiceover": "Reason 1, one sentence.",
        "visual": "Crystal 1 glows violet; others dim.",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      },
      {
        "t": "10.0-16.0",
        "role": "reason_2",
        "on_screen_text": "Reason 2",
        "voiceover": "Reason 2.",
        "visual": "Crystal 2 glows.",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      },
      {
        "t": "16.0-22.0",
        "role": "reason_3",
        "on_screen_text": "Reason 3",
        "voiceover": "Reason 3.",
        "visual": "Crystal 3 glows teal.",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      },
      {
        "t": "22.0-26.0",
        "role": "turn",
        "on_screen_text": "'Different reasons.'",
        "voiceover": "'The behavior looks the same. The pattern behind it may be completely different.'",
        "visual": "All three lit, aura bloom.",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      },
      {
        "t": "26.0-28.0",
        "role": "cta_loop",
        "on_screen_text": "'Which one are you? 1, 2 or 3?'",
        "voiceover": "(silence or 'Which one are you?')",
        "visual": "Cut back to the opening frame for a seamless loop.",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      }
    ]
  },
  {
    "id": "R02",
    "type": "reel",
    "slug": "the_question_on_screen",
    "name": "The Question on Screen (1 of 12)",
    "name_ar": "سؤال واحد من ١٢",
    "pillar": "P2",
    "alt_pillars": [
      "P6"
    ],
    "funnel_stage": "reach",
    "audience_segment": "Self-discovery seeker",
    "cta_tier": "T0",
    "cta_tier_allowed": [
      "T0",
      "T2"
    ],
    "save_share_trigger": "Comment your number.",
    "variables": {
      "question": "quiz Q1-Q7, Q11, Q12 (minus QUIZ_EXCLUDE)"
    },
    "recommended_hook_ids": [
      "H10",
      "H11",
      "H13",
      "H14",
      "H15",
      "H16",
      "H17",
      "H27"
    ],
    "ar_notes": "Use the AR quiz wording verbatim. Arabic captions: max 4 words / 24 chars per line (C §3).",
    "compliance": [
      "QUIZ_EXCLUDE applies.",
      "If using Q9/Q10 (body), add on-screen: 'Reflective, not medical.'"
    ],
    "duration_s": 18,
    "canvas": "1080x1920 MP4 H.264, 30fps, -14 LUFS",
    "production_mode": "ai_full",
    "production_note": "Text-on-motion over one ambient b-roll loop (C §3 scenes 4, 7 or 10). Fully templated; the only variables are question + 4 options.",
    "voiceover_style": "Optional. Variant A: VO reads the question only. Variant B: no VO, ambient music only (better for silent scrollers). Test both.",
    "audio": "Ambient bed; TikTok drafts: human may pick a calm Commercial Music Library track.",
    "slides_or_beats": [
      {
        "t": "0.0-1.5",
        "role": "hook",
        "on_screen_text": "The question, trimmed to <=7 words ('Someone compliments you. You say...?')",
        "voiceover": "Reads the question.",
        "visual": "Ink drop blooming (scene 7), hard cut on beat.",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      },
      {
        "t": "1.5-3.0",
        "role": "frame",
        "on_screen_text": "'Pick one.'",
        "voiceover": "-",
        "visual": "Scene continues.",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      },
      {
        "t": "3.0-12.0",
        "role": "options",
        "on_screen_text": "4 numbered options, ~2.2s each, verbatim from the quiz",
        "voiceover": "- (or reads each)",
        "visual": "Options fade in (0.6s), one at a time.",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      },
      {
        "t": "12.0-15.5",
        "role": "turn",
        "on_screen_text": "'The one you paused on is worth noticing.'",
        "voiceover": "Same line.",
        "visual": "Slow push-in.",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      },
      {
        "t": "15.5-18.0",
        "role": "cta",
        "on_screen_text": "'Comment your number · 1 of 12 questions'",
        "voiceover": "-",
        "visual": "Loop back to the question frame.",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      }
    ]
  },
  {
    "id": "R03",
    "type": "reel",
    "slug": "before_you_buy",
    "name": "Before You Buy {Crystal}",
    "name_ar": "قبل شراء {الحجر}",
    "pillar": "P3",
    "alt_pillars": [],
    "funnel_stage": "reach",
    "audience_segment": "Crystal enthusiast",
    "cta_tier": "T1",
    "cta_tier_allowed": [
      "T1",
      "T2"
    ],
    "save_share_trigger": "Save for the fact; send to the friend who buys stones for everything.",
    "variables": {
      "crystal": "CRYSTAL_SHORTCUTS"
    },
    "recommended_hook_ids": [
      "H18",
      "H19",
      "H20",
      "H22",
      "H24"
    ],
    "ar_notes": "Pick stones with Arabic library articles. No 'protection' stones in AR.",
    "compliance": [
      "Same crystal rules as C04.",
      "AI label on."
    ],
    "duration_s": 26,
    "canvas": "1080x1920 MP4 H.264, 30fps, -14 LUFS",
    "production_mode": "ai_full",
    "production_note": "Image-to-video from the stone's library photo (slow rotation, rack focus). Optional upgrade: founder's hands placing the stone on linen (no face needed).",
    "voiceover_style": "Curious, lightly conspiratorial ('here's what most people miss'), still calm.",
    "audio": "Original VO + soft bed.",
    "slides_or_beats": [
      {
        "t": "0.0-1.5",
        "role": "hook",
        "on_screen_text": "'Before you buy {crystal} for {wish}...'",
        "voiceover": "Same line.",
        "visual": "Macro of the stone turning, light passing through (scene 1/2).",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      },
      {
        "t": "1.5-6.0",
        "role": "shortcut",
        "on_screen_text": "'{wish} -> {crystal}?'",
        "voiceover": "'The common shortcut is: {wish}, so {crystal}.'",
        "visual": "Rack focus.",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      },
      {
        "t": "6.0-12.0",
        "role": "person_a",
        "on_screen_text": "Person A line",
        "voiceover": "'For one person, that may be exactly right...'",
        "visual": "Stone on linen, warm light.",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      },
      {
        "t": "12.0-18.0",
        "role": "person_b",
        "on_screen_text": "Person B line",
        "voiceover": "'For another, it can deepen the very loop they want to leave.'",
        "visual": "Same stone, cooler light.",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      },
      {
        "t": "18.0-22.5",
        "role": "fact",
        "on_screen_text": "One verified fact",
        "voiceover": "Reads the fact.",
        "visual": "Close macro.",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      },
      {
        "t": "22.5-26.0",
        "role": "mcc_view_cta",
        "on_screen_text": "'The person first. The stone second.' + 'Crystal Library: link in bio'",
        "voiceover": "'In My Crystal Code, the person comes first, the stone second.'",
        "visual": "Pull back; logo end card.",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      }
    ]
  },
  {
    "id": "R04",
    "type": "reel",
    "slug": "one_center_one_lesson",
    "name": "One Center, One Lesson",
    "name_ar": "مركز واحد، درس واحد",
    "pillar": "P4",
    "alt_pillars": [],
    "funnel_stage": "trust",
    "audience_segment": "Energy-curious",
    "cta_tier": "T1",
    "cta_tier_allowed": [
      "T1",
      "T2"
    ],
    "save_share_trigger": "SAVE: 'Save this for the day you need it.' Quote reels are shared to Stories.",
    "variables": {
      "center": "CENTERS (image, outgrow from centre_lessons, awareness)"
    },
    "recommended_hook_ids": [
      "H28",
      "H29",
      "H30",
      "H25"
    ],
    "ar_notes": "Use the founder's Arabic (centre_lessons_ar) for first-person lines; neutral nominal forms for second-person ones.",
    "compliance": [
      "Footnote 'Reflective, not a medical measurement.'",
      "No religious framing of 'meaning' (Crown): keep it 'within this spiritual view'."
    ],
    "duration_s": 24,
    "canvas": "1080x1920 MP4 H.264, 30fps, -14 LUFS",
    "production_mode": "ai_full",
    "production_note": "Metaphor b-roll per center (tree, flowing water, sunlight on a sprout, breath of light, ripple, still water, sky over desert) via image-to-video; quote typography from the template.",
    "voiceover_style": "Slow, reflective, almost read-aloud; leave 0.5s pauses between lines.",
    "audio": "VO + soft pad; no beat cuts.",
    "slides_or_beats": [
      {
        "t": "0.0-1.5",
        "role": "hook",
        "on_screen_text": "The center's image line, shortened ('A tree doesn't stand firm because the wind is still.')",
        "voiceover": "Same line.",
        "visual": "Center's metaphor b-roll (e.g. tree in wind).",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      },
      {
        "t": "1.5-6.0",
        "role": "name",
        "on_screen_text": "'The {Center} center: {theme}.'",
        "voiceover": "Same.",
        "visual": "Aligned Chakras glyph, the center's node glowing.",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      },
      {
        "t": "6.0-12.0",
        "role": "outgrow",
        "on_screen_text": "'The belief it asks you to outgrow:' + a shortened outgrow quote",
        "voiceover": "Reads the quote softly.",
        "visual": "Metaphor b-roll, darker grade.",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      },
      {
        "t": "12.0-19.0",
        "role": "awareness",
        "on_screen_text": "'The awareness it invites:' + shortened awareness line",
        "voiceover": "Reads it.",
        "visual": "Same scene, light rising.",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      },
      {
        "t": "19.0-24.0",
        "role": "cta",
        "on_screen_text": "'Save this for the day you need it.' + small 'Reflective, not medical.'",
        "voiceover": "-",
        "visual": "End card.",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      }
    ]
  },
  {
    "id": "R05",
    "type": "reel",
    "slug": "watch_a_reading_open",
    "name": "Watch a Reading Open",
    "name_ar": "شاهد القراءة وهي تُفتح",
    "pillar": "P5",
    "alt_pillars": [],
    "funnel_stage": "convert",
    "audience_segment": "Warm, all segments",
    "cta_tier": "T2",
    "cta_tier_allowed": [
      "T2",
      "T3"
    ],
    "save_share_trigger": "Save to decide later; profile pin candidate.",
    "variables": {
      "sections": "the six Lina pages"
    },
    "recommended_hook_ids": [
      "H31",
      "H32",
      "H33"
    ],
    "ar_notes": "Until an Arabic sample exists: AR variant records the Arabic questionnaire (/ar -> quiz) instead, with the pay-at-the-end line, and shows EN pages only with «العيّنة بالإنجليزية حاليًا».",
    "compliance": [
      "'Illustrative sample · Lina is fictional' visible the whole time.",
      "No invented delivery time; 'within minutes'."
    ],
    "duration_s": 40,
    "canvas": "1080x1920 MP4 H.264, 30fps, -14 LUFS",
    "production_mode": "screen_capture",
    "production_note": "Screen recording of the real Lina sample (phone frame), plus a staged inbox notification (blurred). No face. Recorded once, re-cut many times.",
    "voiceover_style": "Clear, friendly guide; plain words ('this part shows...').",
    "audio": "VO + light bed.",
    "slides_or_beats": [
      {
        "t": "0.0-1.5",
        "role": "hook",
        "on_screen_text": "'What a personal reading actually looks like' + 'Illustrative sample'",
        "voiceover": "'This is what a reading looks like.'",
        "visual": "Phone lights up with the reading's first page.",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      },
      {
        "t": "1.5-6.0",
        "role": "how",
        "on_screen_text": "'12 questions -> a private link in your inbox'",
        "voiceover": "'It starts with 12 questions about how life has actually been feeling.'",
        "visual": "Scene 9 (phone on nightstand).",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      },
      {
        "t": "6.0-14.0",
        "role": "energy_story",
        "on_screen_text": "'Your energy story'",
        "voiceover": "Explains the section in one sentence.",
        "visual": "Slow scroll.",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      },
      {
        "t": "14.0-20.0",
        "role": "pattern",
        "on_screen_text": "'Your pattern under pressure (Full)'",
        "voiceover": "One sentence.",
        "visual": "Scroll, pause 1s on the heading.",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      },
      {
        "t": "20.0-26.0",
        "role": "map",
        "on_screen_text": "'Your 7 centers, mapped'",
        "voiceover": "One sentence.",
        "visual": "Scroll.",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      },
      {
        "t": "26.0-32.0",
        "role": "crystals",
        "on_screen_text": "'Your four-crystal protocol'",
        "voiceover": "One sentence.",
        "visual": "Scroll.",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      },
      {
        "t": "32.0-36.0",
        "role": "reset",
        "on_screen_text": "'Your seven-day reset (Full)'",
        "voiceover": "One sentence.",
        "visual": "Scroll.",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      },
      {
        "t": "36.0-40.0",
        "role": "cta",
        "on_screen_text": "'Lite $8.88 · Full $18.88 launch price' + 'Lina is fictional.'",
        "voiceover": "'Start with Lite and upgrade later for the difference.'",
        "visual": "End card.",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      }
    ]
  },
  {
    "id": "R06",
    "type": "reel",
    "slug": "founder_note",
    "name": "Founder Note",
    "name_ar": "كلمة من المؤسِّسة",
    "pillar": "P5",
    "alt_pillars": [
      "P6",
      "P1"
    ],
    "funnel_stage": "convert",
    "audience_segment": "Warm, all segments",
    "cta_tier": "T2",
    "cta_tier_allowed": [
      "T1",
      "T2"
    ],
    "save_share_trigger": "Trust builder; follow + profile visit.",
    "variables": {
      "angle": "launch transparency | why I built this | comment reply | my own reading"
    },
    "recommended_hook_ids": [
      "H35",
      "H03",
      "H31"
    ],
    "ar_notes": "Record an Arabic version in her natural register (Gulf-friendly white Arabic). Founder approves her own captions.",
    "compliance": [
      "No outcome promises in unscripted speech: brief the founder with the D never-say list.",
      "If AI-free, the caption still follows D's footer rule as the owner decides."
    ],
    "duration_s": 40,
    "canvas": "1080x1920 MP4 H.264, 30fps, -14 LUFS",
    "production_mode": "founder",
    "production_note": "Founder on camera. Batch 6 clips in one 90-minute session: natural window light, eye-level, lav mic, 4K30, modest styling. Variants: 'We just launched', 'Why I built this', 'Reply to a comment', 'I took my own reading' (labeled as hers).",
    "voiceover_style": "Her own voice, conversational, not scripted-sounding. Open mid-sentence; no 'hi guys'.",
    "audio": "Natural voice; no music or a very low bed (-26 dB).",
    "slides_or_beats": [
      {
        "t": "0.0-1.5",
        "role": "hook",
        "on_screen_text": "'We just launched. No reviews yet.'",
        "voiceover": "Says it to camera.",
        "visual": "Close-up, eyes to lens, already mid-gesture.",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      },
      {
        "t": "1.5-8.0",
        "role": "turn",
        "on_screen_text": "'So here's exactly what you get.'",
        "voiceover": "'So instead of reviews, I'll show you exactly what you get.'",
        "visual": "Holds phone with the sample.",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      },
      {
        "t": "8.0-20.0",
        "role": "what",
        "on_screen_text": "'Answer -> Decode -> Discover'",
        "voiceover": "Explains the 12 questions and the private reading.",
        "visual": "Cutaways to the sample (R05 footage).",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      },
      {
        "t": "20.0-30.0",
        "role": "what_it_isnt",
        "on_screen_text": "'Not medical. Not a prediction. Nothing ships.'",
        "voiceover": "States what MCC is not, in her words.",
        "visual": "Back to face.",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      },
      {
        "t": "30.0-40.0",
        "role": "cta",
        "on_screen_text": "'Questions first. Pay at the end.'",
        "voiceover": "'Start with Lite, and upgrade later for the difference if you want more.'",
        "visual": "End card.",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      }
    ]
  },
  {
    "id": "R07",
    "type": "reel",
    "slug": "the_receiving_test",
    "name": "The Receiving Test",
    "name_ar": "اختبار التلقّي",
    "pillar": "P6",
    "alt_pillars": [
      "P2"
    ],
    "funnel_stage": "trust",
    "audience_segment": "Pattern explorer",
    "cta_tier": "T0",
    "cta_tier_allowed": [
      "T0",
      "T3"
    ],
    "save_share_trigger": "Comment your number; tag the friend who always wins the bill fight.",
    "variables": {
      "scenario": "bill | compliment | help offered | gift",
      "options": "Q5 options"
    },
    "recommended_hook_ids": [
      "H39",
      "H40",
      "H36",
      "H11"
    ],
    "ar_notes": "Gulf adaptation: the quoted reply can be Khaleeji («لا لا، ما له داعي») while narration stays white MSA. Options from the AR Q5 wording.",
    "compliance": [
      "No money outcomes; it's about receiving, not wealth.",
      "If CTA = T3: add 'not a prediction of your financial future'."
    ],
    "duration_s": 20,
    "canvas": "1080x1920 MP4 H.264, 30fps, -14 LUFS",
    "production_mode": "ai_full",
    "production_note": "Hands only (no faces): two hands reaching for a bill on a café table; a hand offering a small gift. Gulf café styling for AR (karak cups, modest sleeves).",
    "voiceover_style": "Light, knowing smile in the voice.",
    "audio": "VO + soft bed; tiny 'ding' on each option is allowed (one sound effect, low).",
    "slides_or_beats": [
      {
        "t": "0.0-1.5",
        "role": "hook",
        "on_screen_text": "'Someone insists on paying the bill.'",
        "voiceover": "Same line.",
        "visual": "Two hands reach for the bill at once.",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      },
      {
        "t": "1.5-12.0",
        "role": "options",
        "on_screen_text": "4 options from Q5, numbered: 'No, no, it's fine.' / 'Accept, then feel you owe them.' / 'Accept, but wonder what they want.' / 'Say thank you and let it be good.'",
        "voiceover": "Reads each, quick.",
        "visual": "Hands react per option.",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      },
      {
        "t": "12.0-17.0",
        "role": "turn",
        "on_screen_text": "'You know how to give. But what happens when it's your turn to receive?'",
        "voiceover": "Same line (approved).",
        "visual": "Slow push-in on an open palm.",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      },
      {
        "t": "17.0-20.0",
        "role": "cta",
        "on_screen_text": "'Comment your number.'",
        "voiceover": "-",
        "visual": "Loop to the bill frame.",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      }
    ]
  },
  {
    "id": "R08",
    "type": "reel",
    "slug": "the_loop",
    "name": "The Loop (need, belief, feeling, response, result)",
    "name_ar": "الحلقة",
    "pillar": "P6",
    "alt_pillars": [
      "P1"
    ],
    "funnel_stage": "convert",
    "audience_segment": "Pattern explorer + money angle",
    "cta_tier": "T3",
    "cta_tier_allowed": [
      "T0",
      "T3"
    ],
    "save_share_trigger": "Save the model; comment where yours gets stuck.",
    "variables": {
      "mode": "money | pattern",
      "scenario": "SCENARIO_BANK_MONEY or BEHAVIOR_BANK"
    },
    "recommended_hook_ids": [
      "H38",
      "H37",
      "H08"
    ],
    "ar_notes": "Use the approved AR loop words. In pattern mode the scenario is from BEHAVIOR_BANK.",
    "compliance": [
      "Money mode: both disclaimers on screen and in caption.",
      "Example loop is illustrative, never 'a client'."
    ],
    "duration_s": 26,
    "canvas": "1080x1920 MP4 H.264, 30fps, -14 LUFS",
    "production_mode": "ai_full",
    "production_note": "Kinetic typography on the scene background; a five-node loop diagram draws itself. Mode 'money' (P6) or mode 'pattern' (P1, e.g. pulling back when things go well).",
    "voiceover_style": "Measured, one beat per line, slight pause before 'Round again.'",
    "audio": "VO + pulse-like pad; each node lands on a soft downbeat.",
    "slides_or_beats": [
      {
        "t": "0.0-1.5",
        "role": "hook",
        "on_screen_text": "'A need. A belief. A feeling. A response. A result.'",
        "voiceover": "Fast read of the five words.",
        "visual": "Words snap into a circle.",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      },
      {
        "t": "1.5-5.0",
        "role": "scenario",
        "on_screen_text": "'You're about to send your price.'",
        "voiceover": "Same.",
        "visual": "Cursor blinking in a message field (blurred UI).",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      },
      {
        "t": "5.0-8.0",
        "role": "need",
        "on_screen_text": "'A need: to feel safe being chosen.'",
        "voiceover": "Reads.",
        "visual": "Node 1 lights.",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      },
      {
        "t": "8.0-11.0",
        "role": "belief",
        "on_screen_text": "'A belief: if I ask for more, they'll go.'",
        "voiceover": "Reads.",
        "visual": "Node 2.",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      },
      {
        "t": "11.0-14.0",
        "role": "feeling",
        "on_screen_text": "'A feeling: tight chest, fast typing.'",
        "voiceover": "Reads.",
        "visual": "Node 3.",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      },
      {
        "t": "14.0-17.0",
        "role": "response",
        "on_screen_text": "'A response: lower it before they ask.'",
        "voiceover": "Reads.",
        "visual": "Node 4.",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      },
      {
        "t": "17.0-20.0",
        "role": "result",
        "on_screen_text": "'A result: overworked, underpaid.'",
        "voiceover": "Reads.",
        "visual": "Node 5.",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      },
      {
        "t": "20.0-23.5",
        "role": "turn",
        "on_screen_text": "'The result confirms the belief. Round again.'",
        "voiceover": "Same.",
        "visual": "Loop closes and spins once.",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      },
      {
        "t": "23.5-26.0",
        "role": "cta",
        "on_screen_text": "Money mode: 'The Abundance Pattern · MCC Full' + 'Not a prediction of your financial future.' Pattern mode: 'Where does yours get stuck?'",
        "voiceover": "-",
        "visual": "End card.",
        "caption_limits": {
          "en": "2 lines, 5 words / 28 chars per line",
          "ar": "2 lines, 4 words / 24 chars per line"
        }
      }
    ]
  }
]
```
