# D. Compliance and Automation Governance: My Crystal Code Social Pipeline

**Prepared by:** The Agency (Healthcare Marketing Compliance, Ad Creative Strategist, Automation Governance Architect)
**Scope:** n8n pipeline that generates and posts AI-made reels and carousels to Instagram and TikTok in English and Arabic, selling MCC Lite ($8.88) and MCC Full ($18.88 launch / $24.88 list).
**Sources of truth:** `01-brand-brief.md`, the site's `legal.en.ts`, `landing.en.ts`, `landing.ar.ts`. Platform and regulatory findings come from web research done on 2026-10-30 (see Sources). **This is not legal advice.** Items marked UNCERTAIN need confirmation from UAE counsel or the current official text before launch.

---

## 0. Headline verdict

| Question | Verdict |
|---|---|
| Fully autonomous posting, both languages, from day one | **REJECT** |
| English, low-risk templates, automated gates and a human spot-check | **APPROVE AS PILOT** (30 days) |
| Arabic/GCC content | **PARTIAL AUTOMATION ONLY**: generation is automated, but a human approves every post for at least the first 90 days |
| Promoting the **birth chart / astrology** to Arabic or UAE audiences | **DO NOT PUBLISH** (see 2.3) |

**The biggest risk is regulatory, not technical.** The UAE National Media Council advertising guide states that "any advertising for witchcraft, sorcery and astrology shall not be allowed". Separately, health-related adverts need prior approval. MCC Lite's birth chart feature is therefore the one product element that should never appear in content aimed at the UAE or GCC.

---

## 1. Claims policy for the content generator

### 1.1 Core rules

The generator speaks the way the site does: as a **mirror, not a prescription**.

- **Allowed verbs:** explore, reflect, notice, consider, wonder, invite, map, decode (your patterns), may, might, can help you think about.
- **Forbidden verbs and framings:**
  - Health claims: heal, cure, treat, fix, diagnose, detox.
  - Energy claims: unblock or cleanse (as a physical effect), "protect you from".
  - Outcome claims: attract or manifest (as a cause of outcomes), predict, reveal your destiny or fate, guarantee, transform your life.
  - Pressure: "you need this", fear-based "or else".
- **Crystals** are always "symbolic companions" or "intentional reminders". They are never an active agent that does something to the body, mind, money or luck.
- **Energy centers** are "a reflective and spiritual framework, not medical measurements or diagnoses".
- **Money:** The Abundance Pattern is "a different way to understand your relationship with money", and is "not a prediction of your financial future".
- **Proof:** Proof is "see the sample", never "see the results". With no customer reviews yet, content must contain no testimonials, review counts, "bestseller" claims or "join thousands". Lina is always labeled "illustrative sample, fictional person".
- **Urgency** must be true and specific. "Launch price $18.88 (regularly $24.88)" is fine. "Ends tonight" is allowed only if a real end date is set in config. Fake countdowns and "only 3 left" are never allowed for a digital product.
- **Mandatory caption footer (every post):**
  - EN: *Reflective guidance, not medical, psychological, or financial advice. Made with AI.*
  - AR: *إرشاد تأملي، وليس نصيحة طبية أو نفسية أو مالية. صُنع بمساعدة الذكاء الاصطناعي.*
- **Audience:** write for adults only. Never show minors, school settings or teen slang.
- **Never** quote the Quran, hadith or religious figures. Never tie crystals or energy to worship, Ramadan rituals, prayer, ruqyah, the evil eye or envy (al-'ayn / hasad). Never use national symbols or leaders.

### 1.2 English: never say / say instead (34 pairs)

| # | Never say | Say instead |
|---|---|---|
| **Wellness / health** |||
| 1 | Amethyst heals insomnia. | Some people keep amethyst by the bed as a calm, symbolic reminder to slow down. |
| 2 | Crystals cure headaches / pain. | Crystals in MCC are symbolic companions, not remedies. |
| 3 | Unblock your chakras to fix your health. | Explore how your answers map to the seven energy centers, as a reflective framework. |
| 4 | Your blocked throat chakra is causing your thyroid issues. | Energy-center readings are reflective and spiritual, not medical measurements or diagnoses. |
| 5 | Detox negative energy from your body. | Notice where you hold back, and what that pattern might be protecting. |
| 6 | Black tourmaline protects you from negativity. | Black tourmaline is traditionally associated with grounding. Use it as a reminder of a boundary you choose. |
| 7 | A natural alternative to medicine. | A self-reflection experience. It does not replace professional care. |
| **Mental health** |||
| 8 | Heal your anxiety in 7 days. | A seven-day reset: small reflective practices built around your answers. |
| 9 | Crystals for depression. | (Do not post. Route "depression" topics to a human. No product tie-in.) |
| 10 | Stop overthinking for good. | You notice the overthinking. What might be keeping it going? |
| 11 | Cheaper than therapy. | Reflective guidance, not therapy. |
| 12 | We diagnose your personality. | A mirror for your patterns, not a definitive verdict. |
| 13 | Your trauma is stored in your sacral chakra. | Some patterns repeat in how we give and receive. Your reading explores yours. |
| 14 | Fix your people-pleasing. | Same behavior, different reasons. Explore what drives yours. |
| **Money / abundance** |||
| 15 | Attract money with citrine. | Citrine is traditionally linked with confidence. Some use it as a reminder of an intention. |
| 16 | Manifest $10k this month. | What happens when it's time to ask for more? The Abundance Pattern explores that moment. |
| 17 | Remove your money block and get rich. | What if your money block isn't where you think it is? |
| 18 | This reading will change your finances. | It's not a prediction of your financial future. It's a different way to understand your relationship with money. |
| 19 | The universe will send you abundance. | Explore the beliefs behind how you spend, price, save and receive. |
| 20 | Wealth code / millionaire mindset unlocked. | A need → a belief → a feeling → a response → a result. See your loop. |
| **Astrology certainty** |||
| 21 | Your birth chart reveals your destiny. | Your birth chart and birth crystal are a symbolic lens for reflection. (EN only. Never in AR/GCC.) |
| 22 | The stars predict your 2027. | (Do not post. No forecasts, ever.) |
| 23 | Mercury retrograde is ruining your week. | (Do not post. No fear-based transit content.) |
| 24 | Scorpios are toxic in love. | (Do not post. No sign-based judgements.) |
| 25 | We know who you really are. | Your reading starts from your answers, not a generic description. |
| **Guarantees / outcomes** |||
| 26 | 100% accurate. | Each reading depends on the responses you provide. |
| 27 | Guaranteed results or your money back. | If something goes wrong with your reading on our side, contact support and we'll make it right. |
| 28 | Life-changing / it will transform you. | An invitation to look at your patterns from a new angle. |
| 29 | Thousands of readers love it. | See selected pages from an illustrative sample reading. |
| 30 | Lina found her purpose with MCC. | Meet Lina, a fictional sample. Here is what a reading looks like. |
| **Urgency / pressure** |||
| 31 | LAST CHANCE, ends tonight! (no real date) | Launch price: $18.88 (regularly $24.88). |
| 32 | If you don't do this now, you'll stay stuck. | Whenever you're ready to explore, your reading takes about 12 questions. |
| 33 | Only 5 readings left today! | Delivered by email within minutes. |
| **AI / transparency** |||
| 34 | Hand-written by our spiritual masters. | Built with an AI pipeline from your 12 answers, designed by the founder. |

### 1.3 Arabic: never say / say instead (18 pairs)

The Arabic generator copies the site's established terms: كريستال كود, مراكز الطاقة, نمط الوفرة, إرشاد تأملي. The **sihr/qadar/'ayn** lines (rows 4, 5 and 14 to 16) carry the most risk.

| # | Never say | Say instead |
|---|---|---|
| 1 | الكريستال يشفي القلق. | قد يكون الكريستال تذكيرًا رمزيًا بلحظة هدوء تختارها لنفسك. |
| 2 | يعالج الأرق والاكتئاب. | (لا يُنشر. يُحال إلى مراجعة بشرية.) |
| 3 | افتح شاكراتك المغلقة وتخلّص من الطاقة السلبية. | استكشف محاور مراكز الطاقة السبعة كإطار تأملي لفهم أنماطك. |
| 4 | حجر يحميك من الحسد والعين. | حجر تختاره كرفيق رمزي يذكّرك بنيّتك، لا كوسيلة حماية. |
| 5 | سحر الكريستال وطاقته الخارقة. | جمال الكريستال ومعانيه الرمزية التقليدية. |
| 6 | الطاقة المسدودة سبب مرضك. | تفسيرات مراكز الطاقة تأملية وروحية، وليست قياسات طبية ولا تشخيصًا. |
| 7 | بديل عن العلاج النفسي. | إرشاد تأملي، وليس نصيحة طبية أو نفسية أو مالية. |
| 8 | اجذب المال بحجر السترين. | ما الذي يحدث حين يحين وقت طلب المزيد؟ نمط الوفرة يستكشف هذه اللحظة. |
| 9 | قانون الجذب سيضاعف دخلك. | ليست تنبؤًا بمستقبلك المالي، بل طريقة مختلفة لفهم علاقتك بالمال. |
| 10 | تخلّص من عقدة المال وكن ثريًا. | ماذا لو كانت نقطة التعثّر في علاقتك بالمال بمكان غير الذي تتوقعه؟ |
| 11 | نتائج مضمونة ١٠٠٪. | كل قراءة تعتمد على إجاباتك أنت. |
| 12 | تشخيص دقيق لشخصيتك. | مرآة تأملية لأنماطك، لا حكم نهائي على شخصيتك. |
| 13 | آلاف الأشخاص غيّرت القراءة حياتهم. | شاهد صفحات من قراءة نموذجية توضيحية لشخصية خيالية. |
| 14 | خريطتك الفلكية تكشف مستقبلك. | (لا يُنشر للجمهور العربي/الخليجي. لا ذكر للأبراج أو الخريطة الفلكية.) |
| 15 | اكتشف قدرك المكتوب. | اكتشف ما الذي قد يحرّك أنماطك المتكررة. |
| 16 | الكون سيحقق أمنياتك. | ما الخطوة الصغيرة التي تختارها اليوم؟ |
| 17 | العرض ينتهي الليلة! آخر فرصة! | سعر الإطلاق: ‎18.88$‎ بدلًا من ‎24.88$‎. |
| 18 | إن لم تبدأ الآن ستبقى عالقًا. | حين تكون مستعدًا للاستكشاف، قراءتك بانتظارك. |

---

## 2. Platform and regional policy risks

### 2.1 Instagram (Meta)

| Risk | What it means for MCC | Mitigation | Confidence |
|---|---|---|---|
| **AI disclosure ("AI info" label)** | Meta applies "AI info" when it detects industry signals (C2PA/IPTC) or when the creator discloses AI use. Photorealistic AI video or audio is expected to be disclosed. | Turn on the AI label for every AI-made reel. Keep C2PA metadata from the generator; never strip it. Also add "Made with AI" to the caption. | Medium (secondary sources) |
| **"AI-generated profile" label (announced 2026-08-31)** | Accounts that feature AI-generated *people* without the profile label get reduced reach. AI graphics and caption help do not trigger it. | Prefer people-free visuals: crystals, sacred geometry, the sample pages, typography. If synthetic people or presenters are used regularly, apply the profile label. | Medium (TechCrunch) |
| **Recommendations Guidelines** | Content with "exaggerated health claims, such as miracle cures" is not recommended (left out of Explore/Reels). The bar is stricter than the Community Guidelines. | The claims policy above. Any health word is a blocker. | High (Instagram Help) |
| **Ads: "Unrealistic outcomes"** | Applies if posts are boosted. Bans get-rich-quick and health-outcome claims. Meta has removed some spiritual/religious *interest targeting*, but has not banned astrology content. | Do not boost money-angle posts until a human has reviewed them. | High |
| **API limits** | 50 API-published posts per rolling 24h. A carousel counts as 1. Check usage via `content_publishing_limit`. Requires a Professional account. | The pipeline cap (Section 3.4) sits far below this limit. | High (Meta dev docs) |
| **Branded content** | MCC promoting its own product needs no "Paid partnership" tag. That tag is required once a paid creator or UGC partner posts for MCC, and it needs MCC's approval in the tool. | If creators are used later, use the tool and check for a UAE permit (2.3). | High |
| **Links** | Caption links are not clickable. Repetitive link or DM pushes read as spam. | Use the bio link only, one CTA per post, and no automated DMs or comments. | High |

### 2.2 TikTok

| Risk | What it means for MCC | Mitigation | Confidence |
|---|---|---|---|
| **AIGC label** | Realistic AI-generated or significantly AI-edited content must carry the "AI-generated content" label. TikTok also auto-labels via C2PA Content Credentials and, per 2026 vendor reports, watermark and classifier detection. Unlabeled realistic AIGC can be removed. | Set the AIGC disclosure on every post. If the Content Posting API exposes an AIGC flag, set it; otherwise the human sets it in-app. Keep C2PA. | Medium. Official text not fetched; **UNCERTAIN** whether the API exposes the flag |
| **Content Posting API audit** | Unaudited clients can post only to **private** accounts, with at most 5 users per 24h. Passing the audit requires UX in which the account owner sees and consents to each post. Per-creator Direct Post cap is roughly 15/day, shared across apps. | **Recommended:** use upload-to-drafts (inbox) mode. n8n uploads the video; a human opens TikTok, checks the AIGC and commercial toggles, and taps Post. This is also the human gate. | Medium-High |
| **Commercial content disclosure** | Posts promoting your own business should use the "Your brand" / "Promotional content" disclosure. A third-party paid creator uses "Paid partnership". TikTok says this does not reduce distribution. | Toggle on for every post with a price or CTA. | High (TikTok Ads Help) |
| **Health misinformation** | False or misleading treatment/prevention claims count as "moderate-harm" misinformation, which leads to removal or ineligibility for the For You feed. | Claims policy above. | High |
| **Astrology / paranormal** | No specific ban found. Prediction and fear content still risks "misleading" enforcement. | No forecasts and no fear-based transit content. | **UNCERTAIN** |
| **Links** | Bio link availability depends on account type. | Use a Business account and a single bio link to `mycrystalcode.com` and `/ar`. | **UNCERTAIN** (thresholds change) |

### 2.3 UAE / GCC

1. **Astrology advertising is prohibited in the UAE.** The NMC advertising guide (u.ae) lists it among its content standards: "any advertising for witchcraft, sorcery and astrology shall not be allowed". Sorcery is also a criminal matter, and UAE prosecutors warn against "practising, promoting or assisting" it.
   - **Action:** never advertise the birth chart or birth crystal in Arabic content, in content geo-relevant to the UAE/GCC, or in any paid or boosted post.
   - English organic posts may mention the birth chart only as a "symbolic lens", with no predictions.
   - Never use the words سحر (magic), طلاسم (talismans), تعويذة (charm/spell), or anything that implies a supernatural effect.
   - **UNCERTAIN:** it is unclear which instrument now carries this rule (the 2012 decision, the 2020 standards, or Media Law 55/2023 and its 20 standards). The ban should be treated as live until counsel confirms otherwise.
2. **The 20 media content standards (Media Law No. 55 of 2023, published May 2025).** Standard 1 is respect for the divine and for Islamic and other beliefs. Fines are reported at up to AED 1M (some outlets say AED 2M).
   - **Action:** the "respect" rules in 1.1 apply. AI visuals for Arabic content must be modest, and must contain no alcohol or religious symbols used decoratively.
3. **Health adverts need prior approval** from the competent authority (NMC guide). Keeping every post free of health claims keeps MCC outside that regime. This is a further reason the health blocklist is non-negotiable.
4. **Advertiser Permit (mandatory since ~1 Feb 2026).** Individuals who advertise on social media, paid or unpaid, need a permit from the UAE Media Council and must display the permit number on their profile. The regulator may have been renamed the National Media Authority (one report).
   - **UNCERTAIN:** it is unclear whether a company promoting its *own* product on its *own* account needs it, and how this applies to a founder based in the UAE.
   - **Action:** before launch, the founder confirms with the Media Council or counsel whether `@my.crystal.code` (or the founder personally, if she appears on camera) needs a permit. Any paid UAE creator must hold one.
5. **Saudi Arabia (Mawthooq licence, GAMR).** Any paid Saudi creator needs a licence. Treat KSA content to the same astrology and religious standard as the UAE.
6. **Religious sensitivity.** Major Sunni fatwa bodies, including Egypt's Dar al-Ifta, hold that believing in horoscopes or fortune-telling contradicts the faith, while distinguishing astrology from astronomy. Amulets for protection (tama'im) are similarly sensitive. Respectful Arabic framing should:
   - lead with **self-reflection and the questionnaire** ("your answers, not the stars")
   - present crystals as aesthetic and symbolic objects
   - claim no hidden knowledge, no protection, no luck, and no fate.
   - **UNCERTAIN:** no UAE awqaf ruling specific to crystals or "energy" was found. The safe reading applies.
7. **AI labeling law.** No UAE statute specifically mandating labels on AI-generated ads was found. Deepfakes of real people fall under the Cybercrimes Law (Decree-Law 34/2021). If EU viewers are targeted, EU AI Act Article 50 deployer disclosure has applied since 2 Aug 2026. Platform labels plus a caption disclosure cover both.

---

## 3. Automation governance

### 3.1 Audit evaluation (summary)

| Dimension | Assessment |
|---|---|
| Time savings | High. Daily bilingual content would otherwise take about 15 to 25 h/month. |
| Data criticality | **High reputational and regulatory risk.** One bad Arabic post can trigger an account strike, a UAE complaint, or community backlash at this early stage. |
| Dependency risk | High: LLM, image/video generator, Meta Graph API, TikTok API (audit-gated), and storage. |
| Scalability | Volume is not the goal. The pipeline must stay deliberately throttled. |

### 3.2 Gates per stage (n8n standard: trigger, validation, logic, action, audit, error, fallback)

| Stage | Gate | Type |
|---|---|---|
| 1. Topic selection | Topic must come from an **approved topic library** (patterns, centers, crystal meanings, sample walkthroughs, founder/method). Banned topics include depression, trauma, illness, forecasts, transits, religion, and the birth chart in AR. | Automated (allowlist) |
| 2. Script/caption generation | Generator system prompt contains Section 1. Temperature ≤ 0.7. | Automated |
| 3. Deterministic blocklist | Regex on caption, on-screen text and hashtags, EN+AR (e.g. `heal\|cure\|treat\|anxiety\|depress\|guarantee\|manifest\|attract money\|destiny\|يشفي\|يعالج\|علاج\|مضمون\|سحر\|الحسد\|العين\|قدر\|ابراج\|أبراج\|فلك`). A hit fails the post; there is no auto-fix. | Automated, fail-closed |
| 4. LLM compliance check | Prompt in 3.3. Malformed JSON counts as a fail. If `fixed_caption` is used, it **must be re-checked** in a second pass, and the max is 2 loops. | Automated, fail-closed |
| 5. Visual check | Vision model plus rules: no minors, no realistic people unless labeled, no religious symbols or text, modest styling in AR, no before/after, Lina pages carry the "Illustrative sample" overlay. | Automated, plus human for AR |
| 6. Disclosure assembly | Footer present, AI label flag = true, commercial toggle = true, CTA URL in allowlist (`mycrystalcode.com`, `/ar`, `/quiz`, `/crystal-match`, `/crystals`), and the price matches `tierPrices` config. | Automated |
| 7. **Human approval** | Required for: **all Arabic posts** (≥ 90 days), all money/Abundance posts, any new template or hook, any post with realistic people or voices, any boost or paid spend, and every TikTok post (drafts mode). Approve or reject in Telegram/Slack with a preview. | Human |
| 8. Publish | Kill-switch re-read immediately before the publish node. Rate limiter. Idempotency key = `post_id`. | Automated |
| 9. Post-publish monitor | At +1h and +24h: post still live? Warnings? Comment keyword scan (e.g. `haram\|حرام\|scam\|نصب\|suicide\|انتحار`). Crisis or self-harm comments are routed to a human immediately. Never auto-reply to those. | Automated + human |
| 10. Graduation | A template may auto-post (EN only) after **30 consecutive human approvals with no edits** and zero platform warnings. It is demoted on the first incident. | Governance |

### 3.3 Compliance-check prompt (paste into the n8n LLM node; set temperature 0 and JSON output mode)

```text
You are the compliance gate for My Crystal Code (MCC), which sells a personalized DIGITAL self-reflection reading
(12-question questionnaire + optional birth details -> AI-written web report: energy centers/chakras, patterns,
beliefs, 4-crystal protocol, 7-day reset; Full tier adds "The Abundance Pattern" about money). Nothing physical ships.
Zero customers so far. Audience: adults, English and Arabic, including UAE/GCC.

INPUT
platform: {{$json.platform}}            // instagram | tiktok
language: {{$json.language}}            // en | ar
format: {{$json.format}}                // reel | carousel
caption: {{$json.caption}}
on_screen_text: {{$json.on_screen_text}}
hashtags: {{$json.hashtags}}
visual_description: {{$json.visual_description}}
cta_url: {{$json.cta_url}}
offer_config: {{$json.offer_config}}    // {lite:8.88, full:18.88, full_list:24.88, launch_end_date: null|ISO}

RULES (severity in brackets). Check caption, on_screen_text, hashtags and visual_description.
R1 [blocker] Health/medical: no claim or implication that crystals, chakras/energy centers or the reading heal,
   cure, treat, prevent, detox, diagnose or relieve any physical or mental condition (anxiety, depression,
   insomnia, pain, trauma, illness). No "alternative to therapy/medicine".
R2 [blocker] Money: no claim that anything attracts, manifests or guarantees money, wealth, income or luck. No
   prediction of financial outcomes. The Abundance Pattern may only be framed as exploring one's relationship with money.
R3 [blocker] Prediction/fate: no forecasts, destiny, fate, "the stars decide", transit fear, zodiac judgements.
   If language = ar: ANY mention of astrology, horoscopes, zodiac, birth chart (أبراج، فلك، خريطة فلكية، طالع) is a blocker.
R4 [blocker] Religion/supernatural: no Quran/hadith, religious figures, worship/Ramadan tie-ins, magic/sorcery
   (سحر، طلاسم، تعويذة), protection from evil eye/envy (العين، الحسد), or crystals as amulets/protection.
R5 [blocker] Fake proof: no testimonials, reviews, customer counts, ratings, "bestseller", "thousands", or
   stories presented as real. "Lina" must be labeled fictional/illustrative sample.
R6 [major] Guarantees/absolutes: "100%", "guaranteed", "always works", "life-changing", "transform your life".
R7 [major] Urgency: only true urgency. "Ends tonight/last chance/only X left" is allowed ONLY if
   offer_config.launch_end_date is set and matches. Prices must equal offer_config.
R8 [major] Fear/pressure: no "you'll stay stuck/broken unless you buy", no shame, no targeting distress.
R9 [major] Disclosure: caption must end with the footer
   en: "Reflective guidance, not medical, psychological, or financial advice. Made with AI."
   ar: "إرشاد تأملي، وليس نصيحة طبية أو نفسية أو مالية. صُنع بمساعدة الذكاء الاصطناعي."
R10 [major] Visual: no minors, no before/after, no realistic human presented as a real customer, no
   immodest styling when language = ar, no religious or national symbols.
R11 [minor] Voice: warm, calm, invitational, second person; questions over claims; max 1 CTA; max 5 hashtags;
   no hashtags implying health/money outcomes (#healing #manifestmoney #anxietyrelief).
R12 [minor] URL must start with https://www.mycrystalcode.com

TASK
1. List every violation. Quote the exact offending excerpt.
2. pass = true ONLY if there are zero blocker and zero major issues in the ORIGINAL content.
3. fixed_caption: rewrite the caption (same language, same voice, keep the hook's curiosity) so it would pass all
   rules, and append the footer (R9). If a violation lives in on_screen_text or visual_description, you
   cannot fix it here: still return your best fixed_caption, and add issue with "requires_regeneration": true.
   If the topic itself is banned (R1 mental-health condition as the topic, R3 in Arabic), return fixed_caption "".
4. Do not invent facts, prices, dates, numbers or features not in INPUT.

OUTPUT: return ONLY this JSON, no prose, no markdown fences:
{"pass": boolean,
 "issues": [{"rule": "R1".."R12", "severity": "blocker|major|minor", "field": "caption|on_screen_text|hashtags|visual|cta_url",
             "excerpt": string, "reason": string, "requires_regeneration": boolean}],
 "fixed_caption": string}
```

**n8n wiring:**

1. Validate the result against a JSON Schema in a Code node.
2. `pass=false` with `fixed_caption` non-empty → loop once through the check again.
3. Still failing, or `requires_regeneration` → back to the generator (max 2 attempts) → otherwise park in the "Rejected" queue for a human.
4. Never publish on an LLM error or timeout.

### 3.4 Posting rate limits (well below platform caps)

| Limit | Instagram | TikTok |
|---|---|---|
| Weeks 1–2 (warm-up) | 1 post/day | 1 post/day |
| Steady state | ≤ 2/day total across EN+AR, ≤ 10/week | ≤ 2/day, ≤ 10/week |
| Spacing | ≥ 4 h between posts, ±20 min random jitter | Same |
| Duplication | Same visual asset not reposted within 30 days; captions with cosine similarity > 0.85 to the last 50 posts are rejected | Same |
| Engagement automation | **None.** No auto-likes, auto-follows, auto-comments or auto-DMs | Same |
| Platform hard caps (reference) | 50 API posts per rolling 24h | Roughly 15 Direct Posts/day per creator (UNCERTAIN); private-only until the API audit passes |

### 3.5 Kill-switch design

- **Control record.** A single `pipeline_control` row in Postgres, Airtable or a Sheet with these fields:
  - `global_enabled`, `ig_enabled`, `tt_enabled`, `en_enabled`, `ar_enabled`, `paid_enabled`
  - `max_posts_day`
  - `paused_reason`, `paused_by`, `paused_at`
- **Read twice:** at the trigger and again **immediately before each publish node**.
- **Fail closed:** if the control record cannot be read, nothing is posted.
- **Manual trip:**
  - a `/pause` command in Telegram/Slack (allowlisted user IDs), or
  - a secret-protected webhook, or
  - editing the row directly.
  - Resume requires a human with a written reason, which is logged.
- **Auto-trip conditions.** The system sets `global_enabled=false` and alerts the owner on any of these:
  1. any platform warning, strike, removal or "restricted" notice
  2. 2 compliance blockers in 24h, or more than 30% failure rate over the last 10 generations
  3. 3 consecutive publish API errors, or HTTP 4xx about policy or spam
  4. a comment-keyword spike (more than 3 flagged comments in 1h)
  5. a deviation in the prompt or model version hash, meaning an unreviewed change.
- **Takedown runbook.**
  - Remove the post within 2 h of discovery (API delete or in-app).
  - Write an incident note within 24 h.
  - Re-audit the template within 72 h.
  - Demote the template to human-gated.

### 3.6 Audit log, one row per post (retain at least 24 months)

1. **Identity:**
   - `post_id` (idempotency key), `run_id`, `workflow_name` + `version` (e.g. `PROD-SOCIAL-ReelGen-Publish-v1.0`)
   - `created_at`, `published_at`
   - `platform`, `account_handle`, `language`, `format`
   - `template_id`, `topic_id`, `risk_tier`
2. **Generation:**
   - `llm_model` + version, `prompt_version` (git hash), `temperature`, `input_hash`
   - `raw_caption`, `final_caption`, `on_screen_text`, `hashtags`, `cta_url`
3. **Assets:**
   - `asset_urls`, `asset_sha256[]`, `generator_tool` + version
   - `c2pa_present`, `contains_realistic_people`, `contains_voice_clone`
4. **Compliance:**
   - `blocklist_hits[]`
   - `compliance_json` (full LLM output, both passes), `compliance_model`
   - `vision_check_result`
5. **Disclosures:**
   - `ai_label_set` (platform), `ai_caption_disclosure`, `commercial_disclosure_set`
   - `footer_present`, `lina_label_present`
6. **Approval:**
   - `reviewer_id`, `decision`, `decided_at`, `edit_diff`, `review_notes`
7. **Publish:**
   - `kill_switch_state_at_publish`, `daily_count_at_publish`
   - `platform_media_id`, `permalink`, `api_response_code`
8. **Post-publish:**
   - `status_1h`, `status_24h`
   - `warnings[]`, `flagged_comments_count`
   - `removed_at`, `removed_by`, `removal_reason`, `incident_id`

---

## 4. Trust content before reviews exist (honest credibility)

1. **Show the actual product.** Carousels of the six Lina pages, labeled *"Illustrative sample, fictional person"* on every slide. For Arabic, state plainly that the sample is in English until an Arabic sample exists.
2. **Explain the method.**
   - Answer → Decode → Discover.
   - What the 12 questions cover (4 sections).
   - How answers map to energy-center *themes*.
   - Why crystals are framed as symbolic.
3. **Be transparent about AI.** "Your reading is written by an AI pipeline from your answers, inside a framework the founder designed. Here's what that means, and what it doesn't." This builds trust and doubles as label compliance.
4. **Founder story.** Why Salma built MCC, filmed by her (a real person, not an AI avatar), including what MCC is *not* (not therapy, not a diagnosis, not a prediction).
5. **"Is this for you?" posts.** Use the site's own "probably right for you if… / may not be the right fit if…" lists. Saying who it is not for builds trust.
6. **The Crystal Library as free value.** One stone per post: traditional associations, clearly framed as tradition, not effect.
7. **Price honesty.** Lite vs Full side-by-side, "upgrade for the difference", and the real launch discount.
8. **Privacy promise.** Payments via Stripe, analytics off by default, report links expire after 90 days, deletion on request.
9. **Build-in-public milestones** (only when true). "First reading delivered". "Arabic sample now live". "What we changed after your questions".
10. **Real testimonials only later.** Use them only with written consent, first name or initial, no outcome claims (no "it healed me"), and a record kept in the audit log.

---

## Sources

Note: WebFetch was blocked in this session (network allowlist), so the findings below come from search-result extracts rather than full primary texts. Verify the UNCERTAIN items against the originals.

- UAE NMC Advertising Guide (astrology/sorcery ban, health prior approval, social media licence): https://u.ae/-/media/Media/Media-In-UAE/NMC-AD-Guide-EN-PDF-presntation.ashx
- Al Tamimi, Media Law and Advertising Standards in the UAE: https://www.tamimi.com/law-update-articles/media-law-and-advertising-standards-in-the-uae-key-rules-and-restrictions/
- Al Tamimi, Advertising standards for the UAE: https://www.tamimi.com/law-update/february-4/articles/advertising-standards-for-the-uae/
- Gulf News, 20 media content standards: https://gulfnews.com/uae/uae-media-law-media-must-follow-20-key-standards-to-avoid-fines-of-up-to-dh1m-1.500157204
- Gulf Today, 20 binding standards (May 2025): https://www.gulftoday.ae/news/2025/05/31/uae-reveals-20-binding-standards-for-media-content-with-fines-of-up-to-dhs2-million
- Gulf News, Advertiser Permit mandatory: https://gulfnews.com/uae/new-uae-law-advertiser-permit-now-mandatory-for-influencers-and-creators-for-social-media-1.500427938
- The National, influencer licensing deadline (Jan 2026): https://www.thenationalnews.com/news/uae/2026/01/13/uae-influencers-have-two-weeks-to-sign-up-to-mandatory-licensing-scheme-what-you-need-to-know
- Pinsent Masons, UAE influencer licence deadline: https://www.pinsentmasons.com/out-law/news/uae-influencer-licence-deadline-looms
- Khaleej Times, Advertiser Permit FAQs: https://www.khaleejtimes.com/uae/new-advertiser-permit-who-needs-faqs
- Khaleej Times, UAE sorcery/witchcraft penalties: https://www.khaleejtimes.com/uae/crime/uae-laws-dh50000-fine-jail-term-for-those-engaging-in-witchcraft-and-sorcery
- Baker McKenzie, UAE deepfakes and AI: https://insightplus.bakermckenzie.com/bm/data-technology/united-arab-emirates-deepfakes-and-the-use-of-artificial-intelligence-ai-legal-issues-and-considerations
- Arab News, Saudi Mawthooq licence rules: https://www.arabnews.com/node/2176661/media
- Saudipedia, Mawthooq licence: https://saudipedia.com/en/what-is-the-mawthooq-license
- Dar al-Ifta (Egypt), palmistry and horoscopes: https://www.dar-alifta.org/en/fatwa/details/7985/are-muslims-allowed-to-believe-in-palmistry-and-horoscopes
- Amazon Ads MENA creative policy (regional norm: astrology/fortune-telling restricted): https://advertising.amazon.com/resources/ad-policy/creative-acceptance/mena
- TechCrunch, Instagram limits undisclosed AI profiles (2026-08-31): https://techcrunch.com/2026/08/31/instagram-puts-new-limits-on-undisclosed-ai-profiles/
- Instagram Help, Recommendations Guidelines: https://help.instagram.com/313829416281232
- Meta Ad Standards, Unrealistic outcomes: https://transparency.meta.com/policies/ad-standards/deceptive-content/unrealistic-outcomes
- VERIFY, platforms are not banning astrology/tarot content: https://10tv.com/article/news/verify/social-media/social-media-platforms-arent-banning-astrology-and-tarot-content-horoscope-tiktok-facebook-instagram/536-43655d1b-6c1d-4e4d-a4ef-60c5089526ba
- Meta, Instagram Content Publishing API (50 posts/24h): https://developers.facebook.com/docs/instagram-platform/content-publishing
- NBC News, TikTok auto-labels AI content via C2PA: https://www.nbcnews.com/tech/tech-news/tiktok-will-automatically-label-ai-generated-content-rcna151446
- Billo, Platform AI labeling in 2026 (vendor, unverified details): https://billo.app/blog/ai-labeling/
- TikTok Community Guidelines, Integrity and Authenticity: https://www.tiktok.com/community-guidelines/integrity-authenticity/
- TikTok, Combating harmful misinformation: https://www.tiktok.com/transparency/combating-misinformation/
- TikTok for Developers, Content Sharing Guidelines (audit, private-only, caps): https://developers.tiktok.com/doc/content-sharing-guidelines
- TikTok Ads Help, Content disclosure setting: https://ads.tiktok.com/help/article/about-the-content-disclosure-setting-for-creators
- Lewis Silkin, EU AI labelling rules for deployers (Aug 2026): https://www.lewissilkin.com/insights/2026/07/31/the-new-ai-labelling-rules-for-deployers-in-the-advertising-supply-chain
