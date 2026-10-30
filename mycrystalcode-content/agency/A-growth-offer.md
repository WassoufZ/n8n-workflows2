# A. Growth & Offer Strategy: First Sale, Then Repeatable Sales

Prepared by: Growth Hacker, Offer & Lead Gen Strategist, Behavioral Nudge Engine (The Agency)
Client: My Crystal Code (MCC). Input: `01-brand-brief.md` plus a read-only review of the site source.
Sprint window assumed: Day 1 = Mon 2 Nov 2026, Day 30 = Tue 1 Dec 2026.

---

## 0. What we found in the site code (it changes the plan)

1. **People pay after the quiz.** `/crystal-match` and `/quiz` run all 12 questions plus the details step, and only then go to `/checkout`. That is the strongest friction-reducer the brand has, and it is true: *"The 12 questions come first. You pay only when you're ready to see your reading."*
2. **Attribution is currently broken.** `client-public/src/utils/analytics.ts` overrides GA4 `page_location` with a query-free URL on every hit (correctly, to protect `/status` tokens). As a side effect, **every `utm_*` parameter is dropped before GA4 sees it**, so GA4 cannot attribute any sale to Instagram or TikTok. No table stores inbound UTMs either (the `utm_*` columns in `drizzleSchema.ts` belong to outbound `partner_stores`). GA4 also no-ops until `VITE_GA4_MEASUREMENT_ID` is set. **Fix this before Day 1** (developer task, see section 3).
3. **Arabic deep links need `?lang=ar`.** Only `/` and `/ar` choose the language from the URL. On any other route, a new visitor gets English unless the link carries `?lang=ar` (supported by `languageFromQuery`).
4. **The Arabic page has no sample.** `landing.ar.ts` keeps `sample.pages` empty, so the "see before you buy" section is hidden at `/ar`. Arabic buyers lose the strongest proof asset. Rendering an Arabic Lina sample is the most valuable product fix for the Arabic market.
5. **The launch price has no end date.** `LAUNCH_OFFER_CENTS` runs until someone deletes the line. Urgency is truthful only after the owner commits to a public end date. When it ends, Full goes to $24.88 and the Lite-to-Full upgrade goes from $10 to $16.
6. **No follow-up for quiz completers who don't pay.** Email is collected in the quiz, but there is no abandoned-checkout email and no marketing opt-in. Content cannot fix this. It is the second developer task after attribution.
7. **There is a built-in identity system to use.** The reading names a dominant pattern from 14 archetypes, with EN and AR (masculine and feminine) labels in `shared/knowledge/labels/display-labels.ts`: *The Over Giver, The Peace Keeper, The Over Thinker, The Controller, The Walled Heart, The Exhausted One, The Comfort Zone Guardian, The Unreleased Creator, The One Without a Compass*, plus the "flowing" states. Energy centers carry four states: *Flowing Freely, Gently Rising, Calling for Care, Working Too Hard*. These are ready-made labels people will recognize themselves in, and they come from the real product.

---

## 1. Diagnosis: why a social viewer would not buy, and how content answers each reason

| # | Reason they don't buy | What content must do | Assets / formats |
|---|---|---|---|
| 1 | **"What do I actually get?"** It is digital, abstract and new. "Reading" could mean anything. | Show the product page by page, in every pillar. At least 1 in 3 posts shows a real report page. Name the deliverable in plain words: *private web link by email, minutes after purchase, 7 center cards, 4-crystal protocol, birth chart (Lite).* | Lina carousel series (6 pages, always labeled "illustrative sample, fictional reader"). A screen recording of the email arriving and the report scrolling. A "What $8.88 gets you vs. what $18.88 adds" carousel. |
| 2 | **"It's a generic horoscope / AI slop."** People expect vague statements that fit anyone. | Prove that it is specific. The 12 questions are the proof: they are unusually precise (*"When someone offers to help you, pay you, compliment you… what usually happens?"*). Run "Same behavior. Different reasons." as a signature format. Be open about AI: *"Your answers are interpreted through MCC's framework, and an AI writes your reading from them, in minutes."* Hiding it and getting found out costs more than saying it. Use the platform AI-content labels on generated visuals. | A "Question 5 of 12" reel series showing one real question and its options on screen. Three-person "same behavior" reels. |
| 3 | **Zero trust signals.** New account, no reviews, unknown seller, a payment page inside an in-app browser. | Make the person behind it visible. Founder voice or face weekly ("why I built this", "I took my own reading"). Be open about being new: *"We just launched. No reviews yet, so here is exactly what you get."* Show Stripe, the delivery email and the WhatsApp support line. Never invent proof. | Founder reel (Week 1). Pinned "What you get" post. Highlights: Sample / How it works / FAQ / عربي. |
| 4 | **Price justification.** "Why pay when free chakra quizzes exist?" | Contrast on depth, not price: *a free quiz gives you a label; MCC gives 7 center cards and a crystal protocol built from your 12 answers.* Remove risk with the upgrade rule: *start with Lite, and upgrade later for the difference, so you never pay twice.* Reduce sunk effort: *pay only at the end.* Never compare it to therapy or coaching. | "Free quiz vs. your reading" carousel. A "$8.88 then +$10" ladder graphic. |
| 5 | **Skepticism about crystals and energy.** | Don't try to convert skeptics. Select for the curious. Lead with **patterns** (overthinking, people-pleasing, trouble receiving), which everyone recognizes, and bring crystals in as "symbolic companions", in the brand's own words. Repeat the disclaimer in the caption naturally, not as a legal block. | Pattern-led hooks first. Crystal-led content goes to the crystal-enthusiast audience. |

A sixth, silent killer: **friction in in-app browsers.** The quiz ID is stored in `localStorage`. If someone moves from the Instagram browser to Safari mid-flow, checkout shows "We could not find your quiz on this device." Test the full purchase in the IG and TikTok in-app browsers on iOS and Android before Day 1.

---

## 2. Offer & CTA architecture

### The ladder
1. **Free:** posts, the DM mini-result (new), and the Crystal Library (`/crystals`).
2. **MCC Lite, $8.88: the default CTA in about 70% of posts.** It is an impulse price, there is no regret (it upgrades for the difference), and it includes the birth chart and birth crystal, which is a hook in its own right for the crystal and astrology audience.
3. **Lite to Full upgrade, $10:** already built into the report as locked previews (`upgrade_cta_click` with its source). Content supports it by showing what is locked: "the Abundance Pattern" and "your pattern under pressure".
4. **MCC Full, $18.88 launch price (list $24.88): the direct CTA in about 30% of posts.** Use it only where the content is about Full-only chapters: money / Abundance Pattern, persona pattern under pressure, the seven-day reset.

Rule for the n8n generator: `cta_tier = full` only if `pillar ∈ {abundance, pattern_under_pressure, seven_day_reset}`. Otherwise `cta_tier = lite`. The DM-keyword CTA can replace either one, on about 40% of posts during Weeks 1 and 2.

Do not give "8.88" any money or luck meaning. It is a price, not a promise.

### Launch-price urgency (only if it is real)
Recommend that the owner **publicly commit to "Launch price ends Mon 30 Nov 2026, 23:59 GST"** and then actually delete the `LAUNCH_OFFER_CENTS.full` line. The content can then say two true things: Full is $18.88 until the 30th, and *Lite buyers can upgrade for $10 until the 30th (it becomes $16 after).* Until the owner commits, content says only "launch price", with no date and no countdown. Never reset a deadline.

### New free lead magnet: the "Which pattern is running you?" DM mini-result
- **Type:** Sample + Solve. It is one real-feeling insight, given away for free.
- **Mechanic:** a viewer comments **PATTERN** (or **نمط**). They get an automatic DM with one question and 5 quick-reply buttons, adapted from the site's own receiving question (Q5). Each answer returns a short mini-result for one of 5 patterns (Over Giver, Peace Keeper, Over Thinker, Controller, Walled Heart). Each mini-result has 3 "You may notice" lines in the same format as the real report, one reflection prompt, and a link to Lite.
- **Honesty line inside the DM (required):** *"This is one question. Your reading uses twelve, so your actual pattern may be different."* That line also opens a truthful curiosity gap.
- **Standalone value:** the person gets a recognizable pattern description and a reflection prompt even if they never buy.
- **Capture:** the IG DM thread is the lead. Ask for an email only later.
- **Nurture before launch:** write the 3 DMs below, plus one follow-up 23 hours later (inside Meta's 24-hour messaging window): *"Did that one feel familiar? The full reading looks at the 4 sections behind it."* No further messages after that unless the person replies.

### Exact CTA lines

Arabic follows the site's convention of addressing every reader: nominal phrasing and the suffix ـك, no gendered imperatives. The founder should review all Arabic (the site's Arabic copy is itself still "AR DRAFT").

| Use | English | Arabic |
|---|---|---|
| Lite (default) | Your 12 answers. Your 7 energy centers. MCC Lite, $8.88. Link in bio. | ١٢ إجابة، وسبعة مراكز طاقة تخصّك. كريستال كود لايت بـ 8.88$. الرابط في البايو. |
| Risk reducer | Start with Lite. If you want the deeper reading later, you only pay the difference. | البداية مع لايت، والترقية إلى القراءة الكاملة لاحقًا بفرق السعر فقط. |
| Pay-last | The 12 questions come first. You only pay when you're ready to see your reading. | الأسئلة الاثنا عشر أولًا، والدفع فقط عند الاستعداد لرؤية قراءتك. |
| Full (money pillar) | The Abundance Pattern is inside MCC Full. $18.88 launch price (list $24.88). Link in bio. | نمط الوفرة جزء من القراءة الكاملة: 18.88$ سعر الإطلاق بدلًا من 24.88$. الرابط في البايو. |
| Full + deadline (only after commitment) | Launch price ends 30 November. After that, Full returns to $24.88. | ينتهي سعر الإطلاق في ٣٠ نوفمبر، وبعده تعود القراءة الكاملة إلى 24.88$. |
| DM magnet | Comment PATTERN and we'll send you the one question that hints at which pattern runs yours. | تعليق بكلمة «نمط» يصلك بعده سؤال واحد في الرسائل الخاصة، يلمّح إلى النمط الذي يحرّكك. |
| Sample | Swipe through real pages from a sample reading. The reader is fictional; the format is real. | صفحات من قراءة نموذجية: الشخصية خيالية، والشكل حقيقي. |
| Save / share | Save this for the next time you say yes before the question is finished. | للحفظ، للمرة القادمة التي تسبق فيها «نعم» نهاية السؤال. |
| Disclaimer tail | Reflective guidance, not medical, psychological or financial advice. | إرشاد للتأمّل، وليس نصيحة طبية أو نفسية أو مالية. |

---

## 3. Funnel mechanics

### Developer tasks before Day 1 (owner/developer, outside the content engine)
1. **Let UTMs reach GA4:** in `strippedLocation()`, keep only the `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` and `utm_term` keys from the query (they are not tokens). Do this on landing routes only, never on `/status` or `/view`.
2. **Persist first-touch UTMs** in `sessionStorage` and write them into the Stripe PaymentIntent `metadata` at checkout. Stripe then shows the source of every sale, regardless of cookie consent.
3. **Set `VITE_GA4_MEASUREMENT_ID`** and mark `payment_success` as a key event.
4. (Week 2) Add a one-email abandoned-checkout reminder for completed-but-unpaid quizzes, with a consent line on the details step.

### Link-in-bio setup
- **Instagram (5 native links, no third-party page, so no extra redirect in the in-app browser):**
  1. `Start for $8.88`: `https://www.mycrystalcode.com/?utm_source=instagram&utm_medium=bio&utm_campaign=mcc_2611_bio&utm_content=bio_en_landing&utm_term=en`
  2. `ابدأ بالعربية`: `https://www.mycrystalcode.com/ar?utm_source=instagram&utm_medium=bio&utm_campaign=mcc_2611_bio&utm_content=bio_ar_landing&utm_term=ar`
  3. `See a sample reading`: `…/?utm_source=instagram&utm_medium=bio&utm_campaign=mcc_2611_bio&utm_content=bio_en_sample&utm_term=en#sample`
  4. `Full reading: launch price`: `…/quiz?lang=en&utm_source=instagram&utm_medium=bio&utm_campaign=mcc_2611_bio&utm_content=bio_en_full&utm_term=en`
  5. `Crystal Library`: `…/crystals?utm_source=instagram&utm_medium=bio&utm_campaign=mcc_2611_bio&utm_content=bio_library`
- **TikTok:** a Business account with one bio link pointing to the landing page, using the same pattern with `utm_source=tiktok`. Put the Arabic route in the pinned comment as plain text: "mycrystalcode.com/ar".
- **Cold traffic (bio) goes to the landing page,** which has the sample and FAQ. **Warm traffic (DM, after the mini-result) goes straight to the quiz.** Testing the bio link landing-vs-quiz is an option for Week 3.

### UTM convention the n8n workflow must append
```
?utm_source={instagram|tiktok}
&utm_medium={bio|dm|story|comment}
&utm_campaign=mcc_{yymm}_{pillar}
&utm_content={post_id}
&utm_term={en|ar}
[&lang=ar   when the language is Arabic and the path is not /ar]
```
- `pillar` comes from a closed list: `patterns, receiving, centers, crystals, abundance, sample, founder, reset, library`.
- `post_id` = `{ig|tt}_{yyyymmdd}_{format}{nn}_{hook}`, for example `ig_20261103_r01_a` (r = reel, c = carousel, s = story; `a`/`b` = hook variant).
- All values are lowercase with underscores. n8n stores one row per post: `post_id, platform, lang, pillar, format, hook_variant, cta_tier, keyword, published_at, permalink`.

Caption links are not clickable on IG or TikTok, so **per-post attribution only exists through DM links and story link stickers.** Bio links carry `utm_medium=bio` and are attributed by time window.

### Click logging owned by n8n (works even before the GA4 fix)
DM and story links point to an n8n Webhook redirector, for example `https://go.mycrystalcode.com/p/{post_id}`. It logs `post_id, timestamp, user-agent class` and returns a 302 to the full UTM URL. This gives exact clicks per post with no change to the app.

### Comment-to-DM flow (Instagram)
Trigger: an IG Graph API `comments` webhook. Then match the keyword after normalizing it: `pattern|patterns|نمط|النمط|انماط`.
1. Post a public reply, rotating between 5 wordings to avoid spam flags ("Sent to your DMs." / «وصلك في الرسائل الخاصة»).
2. Send a **private reply** to the `comment_id` with the question and 5 quick replies.
3. On the quick-reply payload, send the mini-result, the honesty line, and the redirector link (`utm_medium=dm`).
4. After 23 hours, send one follow-up, only if the link was not clicked.

The Meta app needs `instagram_manage_comments` and `instagram_manage_messages` with Advanced Access (app review). **If approval isn't ready by Day 1, run the flow in ManyChat** (an official Meta partner) and let n8n handle only content and logging. Speed matters more than purity here.

**TikTok:** there is no comment-to-DM API for normal accounts. Use a pinned comment, the bio link, and "reply-to-comment" videos. The owner answers TikTok DMs by hand during the sprint. At this volume, that is high-value warm outreach.

### Measuring post to sale
The chain is: `reach → avg watch % / skip rate → saves + shares → profile visits → bio link taps | keyword comments → DM link clicks (redirector) → landing sessions (GA4, after fix) → quiz_started → quiz_completed → checkout_started → payment_success (Stripe metadata = source of truth)`.

A weekly n8n job pulls IG and TikTok insights where the APIs expose them, the redirector log and Stripe payments, and writes one row per post. Diagnostic rules:
- Clicks but no quiz starts → a **landing problem**, not a content problem.
- Starts but no completions → **friction in the quiz/details step** (birth details).
- Completions but no payments → **the price or the in-app checkout**.

---

## 4. The 30-day "first sale" sprint

**Volume math (planning assumption, to recalibrate in Week 2):** 3% of link clicks become buyers (20% start × 60% complete × 25% pay). That means **about 330 site clicks for 10 sales, or roughly 3,000 profile visits.** The plan is built to reach that.

**Targets:** first sale by Day 10. **10 sales by Day 30.** At least 1 Lite-to-Full upgrade. At least 3 consented, real buyer quotes requested.

**Warm start (Days 1–5, Rule of 100):** the founder personally messages her own network (WhatsApp, IG, the UAE community) with the sample and the Lite link. The goal is honest feedback and the first real purchases. Any quote from a friend is used only with consent and with the relationship disclosed. The first sale usually comes from here, not from the algorithm.

### Cadence
| Platform | Per week | Language split |
|---|---|---|
| Instagram | 7 reels (1 per day), 3 carousels, stories daily (3–5 frames, 1 with a link sticker carrying UTMs) | 50/50 EN/AR in Weeks 1–2, then shift toward the language with more sales |
| TikTok | 10–14 posts (2 per day: 1 EN, 1 AR); carousel "photo mode" counts | 50/50 |

Keep one account per platform. If one language takes more than 70% of sales by Day 21, plan a separate Arabic account after the sprint.

### Content order
- **Week 1, prove and recognize:** the Lina sample carousels (all 6 pages, labeled). "Same behavior. Different reasons." (3 reels, one per reason). Pattern-label reels (*"5 signs you're The Over Giver"*). A founder intro. The DM magnet launches on Day 3. Pin three posts: *What you get*, *Which pattern runs you? (comment PATTERN)*, *Who's behind this*.
- **Week 2, double down:** run 2 more posts from each of the top 2 pillars. "Question 5 of 12" series. "What $8.88 gets you." Arabic-first originals, not translations (receiving and giving lands strongly in Gulf hospitality culture). The founder posts her own real reading, labeled as hers.
- **Week 3, Full and money:** the Abundance Pattern loop (*a need → a belief → a feeling → a response → a result*) as a carousel. Pattern under pressure. The seven-day reset day by day. The Lite-to-Full "$10 to unlock" angle. The disclaimer "not a prediction of your financial future" appears on every money post.
- **Week 4, decide and close:** the launch-price deadline, if committed (Days 25–30). Real buyer reflections, if consented. Re-cut the top 5 posts of the month with new hooks.

### What to A/B test (one variable at a time, same body)
1. Hook framing: question ("Do you say yes before they finish asking?") vs. label ("The Over Giver, in 3 habits") vs. contrast ("Same behavior. Different reasons.").
2. CTA: Lite link vs. DM keyword.
3. Format: the same content as a carousel vs. a reel.
4. Language-native vs. translated Arabic.
5. On-screen text only vs. founder voiceover.

Use Instagram **Trial Reels** (shown to non-followers first) for hook tests. On TikTok, post variants on different days in the same time slot.

### Kill / scale rules
All rules are relative to the account's own rolling median, because new accounts have no benchmark. Each is evaluated after 72 hours.

| Signal | Scale | Kill / fix |
|---|---|---|
| Hook (avg watch % or 3-second hold) | ≥ 1.5× median: re-use the hook on 3 new bodies | < 0.6× median on 2 posts: retire the hook |
| Saves + shares per 1k reach | ≥ 2× median: make 3 more posts in that pillar this week | Pillar < 0.5× median across 6 posts: pause the pillar |
| Profile visits per 1k reach | ≥ 1.5× median: add a direct Lite CTA to the variants | Low profile visits but high saves: the CTA is too weak, so test DM keyword |
| Keyword comments per 1k reach | ≥ 5: make it the standing CTA for that pillar | < 1 after 5 posts: rewrite the magnet question |
| DM link CTR (clicks / mini-results sent) | ≥ 40%: healthy | < 20%: rewrite the mini-result's last line |
| Landing → quiz_started | ≥ 20% | < 10%: landing or offer issue; escalate to the owner, don't post more |
| quiz_completed → payment | ≥ 25% | < 10%: test in-app checkout and the price framing |

Sales override everything. Any post with a Stripe-attributed sale gets 3 re-cuts within 7 days.

---

## 5. Behavioral nudges for inside the content (ethical by design)

1. **Self-recognition (the core lever).** Use the reading's own "You may notice" format: *"You say yes while the question is still being asked."* / *"A compliment makes you change the subject within a sentence."* Recognition makes people save and share.
2. **Identity labels.** Use the 14 real pattern names and the 4 center states. Example: *"Which one are you: The Over Giver, The Peace Keeper or The Controller? Comment the one that stung."* For tagging: *"Send this to the Over Giver in your life."* Always frame labels as patterns, never as diagnoses.
3. **Honest curiosity gap.** Slide 1 states the behavior. The middle slides give three possible reasons. The last slide says: *"Which reason is yours depends on your answers."* The gap closes in the product, not in invented content.
4. **Endowed progress / micro-commitments.** The ladder is save → comment → answer 1 question → answer 12 → pay. In the DM: *"That was one question. The reading uses twelve."* On the site: *"You pay only at the end."*
5. **Social proof without fake testimonials.** Proof of process (the real questions, real pages, real delivery). The founder's own reading. Real counts once true ("Our first readings are out", never a made-up number). Real public comments ("this is literally me") screenshotted with permission. Consented buyer quotes later, labeled with "Individual experiences will vary."
6. **Regret reduction instead of fear.** *"Start with Lite; you never pay twice."* This works better than loss aversion for an $8.88 impulse buy.
7. **Ethical loss aversion.** Use only the real deadline, and only the real consequences (Full goes to $24.88, the upgrade to $16). Never use "your energy is blocked", "before it's too late", fake scarcity or reset countdowns.
8. **Time compression.** *"In your inbox within minutes."* This closes the gap between payment and payoff, the strongest denominator lever in the value equation for this product.

**Guardrails the n8n prompt must enforce** (reject the output if it breaks any): no heal / cure / treat / anxiety / depression / attract money / guarantee wording. "Lina" always carries "fictional/illustrative". No invented customer stories or numbers. No "blocked chakra" diagnosis of the viewer. AI visuals carry the platform AI label. Every money post includes "not a prediction of your financial future". Adults only: no school or teen framing.
