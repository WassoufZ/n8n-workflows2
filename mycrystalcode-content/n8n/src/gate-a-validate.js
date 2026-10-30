// Gate A: deterministic checks on the copywriter's JSON, before anything is rendered or sent
// to the compliance model. Fail-closed: any issue sends the post back for one corrective draw.
// Limits follow agency/C-design-system.md §2; the blocklist and footer follow
// agency/D-compliance-governance.md §1 and §3.2. Free deterministic repairs are applied here
// (wrapping the cover's last word in *emphasis*, trimming whitespace); nothing else is rewritten.
const S = $('⚙️ Settings').first().json;
const brief = $('Build brief').first().json;
const out = $input.first().json.output || {};
const issues = [];
const AR = out.lang === 'ar';
const k = AR ? 0.9 : 1;
const len = (s) => Array.from(String(s || '').replace(/\*/g, '')).length;
const cap = (field, value, max) => {
  if (value == null || value === '') return;
  const limit = Math.floor(max * k);
  if (len(value) > limit) issues.push(`${field} is ${len(value)} characters; the limit is ${limit}. Shorten it.`);
};
const need = (field, value) => { if (!value || !String(value).trim()) issues.push(`${field} is missing.`); };

if (!['carousel', 'reel'].includes(out.format)) issues.push('format must be "carousel" or "reel".');
if (!['en', 'ar'].includes(out.lang)) issues.push('lang must be "en" or "ar".');
if (brief.row.lang && out.lang !== brief.row.lang) issues.push(`lang must be "${brief.row.lang}" as assigned.`);
if (brief.row.format && out.format !== brief.row.format) issues.push(`format must be "${brief.row.format}" as assigned.`);
// CTA tiers from agency/B: T0 engage, T1 follow + free value, T2 Lite $8.88, T3 Full $18.88.
if (!['T0', 'T1', 'T2', 'T3'].includes(out.cta_tier)) issues.push('cta_tier must be T0, T1, T2 or T3.');
need('hook', out.hook); cap('hook', out.hook, 90);
need('caption', out.caption); cap('caption', out.caption, 1800);
need('alt_text', out.alt_text);

const MIDDLE = ['statement', 'list', 'quote', 'split', 'centers', 'sample'];
const slides = Array.isArray(out.slides) ? out.slides : [];
const beats = Array.isArray(out.beats) ? out.beats : [];

if (out.format === 'carousel') {
  if (slides.length !== 8) issues.push(`A carousel has exactly 8 slides; you returned ${slides.length}.`);
  if (slides[0] && slides[0].layout !== 'cover') issues.push('Slide 1 must use layout "cover".');
  if (slides[7] && slides[7].layout !== 'cta') issues.push('Slide 8 must use layout "cta".');
  const pages = slides.filter((s) => s.layout === 'sample').map((s) => s.page);
  if (new Set(pages).size !== pages.length) issues.push('Each sample page may appear only once per carousel.');
  slides.forEach((s, i) => {
    const n = `slide ${i + 1} (${s.layout})`;
    if (i > 0 && i < 7 && !MIDDLE.includes(s.layout)) issues.push(`${n}: layout must be one of ${MIDDLE.join(', ')}.`);
    cap(`${n} eyebrow`, s.eyebrow, 32);
    switch (s.layout) {
      case 'cover':
        need(`${n} headline`, s.headline); cap(`${n} headline`, s.headline, 60); cap(`${n} sub`, s.sub, 70);
        // Repair: the gradient emphasis is a brand signature; wrap the last word if the model forgot.
        if (s.headline && !/\*[^*]+\*/.test(s.headline)) s.headline = s.headline.replace(/(\S+)\s*$/, '*$1*');
        break;
      case 'statement': need(`${n} statement`, s.statement); cap(`${n} statement`, s.statement, 140); cap(`${n} support`, s.support, 120); break;
      case 'list': {
        const items = s.items || [];
        need(`${n} title`, s.title); cap(`${n} title`, s.title, 48);
        if (items.length < 3 || items.length > 5) issues.push(`${n}: needs 3 to 5 items.`);
        items.forEach((it, j) => { need(`${n} item ${j + 1}`, it.text); cap(`${n} item ${j + 1}`, it.text, items.length === 5 ? 60 : 56); cap(`${n} item ${j + 1} sub`, it.sub, 60); });
        break;
      }
      case 'quote': need(`${n} question`, s.question); cap(`${n} question`, s.question, 110); cap(`${n} prompt`, s.prompt, 40); break;
      case 'split':
        need(`${n} behavior`, s.behavior); cap(`${n} behavior`, s.behavior, 40);
        if ((s.reasons || []).length !== 3) issues.push(`${n}: needs exactly 3 reasons.`);
        (s.reasons || []).forEach((r, j) => cap(`${n} reason ${j + 1}`, r, 64));
        break;
      case 'centers':
        cap(`${n} title`, s.title, 40);
        if (!(s.centers || []).length || s.centers.length > 7) issues.push(`${n}: needs 1 to 7 centers.`);
        (s.centers || []).forEach((c, j) => {
          if (!['care', 'working', 'rising', 'flowing'].includes(c.state)) issues.push(`${n} center ${j + 1}: state must be care, working, rising or flowing.`);
          cap(`${n} center ${j + 1} note`, c.note, 38);
          cap(`${n} center ${j + 1} body`, c.body, 160);
        });
        break;
      case 'sample':
        need(`${n} title`, s.title); cap(`${n} title`, s.title, 40); cap(`${n} callout`, s.callout, 34);
        if (!(s.page >= 1 && s.page <= 6)) issues.push(`${n}: page must be 1 to 6 (the six real sample pages).`);
        if (AR) issues.push(`${n}: there is no Arabic sample reading yet; do not use the sample layout in Arabic.`);
        break;
      case 'cta': cap(`${n} button`, s.button, 22); break;
      default: break;
    }
  });
}

if (out.format === 'reel') {
  if (beats.length !== 5) issues.push(`A reel has exactly 5 beats; you returned ${beats.length}.`);
  let total = 0;
  beats.forEach((b, i) => {
    need(`beat ${i + 1} text`, b.text); cap(`beat ${i + 1} text`, b.text, 60);
    const sec = Number(b.seconds);
    if (!(sec >= 1.5 && sec <= 6)) issues.push(`beat ${i + 1}: seconds must be between 1.5 and 6.`);
    total += sec || 0;
  });
  if (beats.length === 5 && (total < 12 || total > 30)) issues.push(`Beats add up to ${total}s; keep the reel between 12 and 30 seconds.`);
  if (beats[0] && String(beats[0].text).replace(/\*/g, '').trim().split(/\s+/).length > 7) issues.push('Beat 1 is the hook: 7 words maximum.');
  need('voiceover', out.voiceover); cap('voiceover', out.voiceover, 650);
  need('broll_prompt', out.broll_prompt);
}

const tags = (out.hashtags || []).map((t) => String(t).trim()).filter(Boolean);
if (tags.length > 5) issues.push('Use at most 5 hashtags.');
tags.forEach((t) => { if (!/^#[\p{L}\p{N}_]+$/u.test(t)) issues.push(`Hashtag "${t}" is malformed.`); });

// ---- Claims blocklist (fail-closed, no auto-fix) ----
const onScreen = [
  ...slides.flatMap((s) => [s.eyebrow, s.headline, s.sub, s.statement, s.support, s.title, s.question, s.prompt, s.behavior, s.callout, s.button,
    ...(s.items || []).flatMap((it) => [it.text, it.sub]), ...(s.reasons || []), ...(s.centers || []).flatMap((c) => [c.note, c.body])]),
  ...beats.map((b) => b.text),
].filter(Boolean).join('\n');
const allText = [onScreen, out.hook, out.caption, out.voiceover, tags.join(' ')].filter(Boolean).join('\n');
const EN_BLOCK = [
  [/\bheal(s|ing|ed|er)?\b/i, 'health claim (heal)'], [/\bcur(e|es|ed|ing)\b/i, 'health claim (cure)'],
  [/\btreat(s|ment|ing|ed)?\b/i, 'health claim (treat)'], [/\banxi(ety|ous)\b/i, 'mental-health topic (anxiety)'],
  [/\bdepress/i, 'mental-health topic (depression)'], [/\bdiagnos/i, 'diagnosis claim'], [/\bdetox/i, 'detox claim'],
  [/\bguarantee/i, 'guarantee'], [/\bmanifest(ing|ation)?\b/i, 'manifestation claim'],
  [/\battract(s|ing)?\s+(money|wealth|abundance|luck|love)/i, 'attraction claim'], [/\b(destiny|fate)\b/i, 'fate/destiny claim'],
  [/\bpredict/i, 'prediction'], [/\bprotect(s|ion)?\s+(you\s+)?(from|against)/i, 'protection claim'], [/\bevil eye\b/i, 'evil-eye reference'],
  [/\b(testimonial|reviews?|rated|bestsell|thousands of|customers (love|say))/i, 'social proof that does not exist yet'],
  [/\b(life[- ]changing|transform your life|100%)\b/i, 'absolute outcome claim'],
];
const AR_BLOCK = [
  [/يشفي|يعالج|علاج|شفاء/, 'ادعاء صحي'], [/القلق|الاكتئاب|الأرق/, 'موضوع صحة نفسية'], [/مضمون|مضمونة/, 'ضمان'],
  [/سحر|طلاسم|تعويذة/, 'سحر'], [/الحسد/, 'الحسد'], [/العين(?!\s*الثالثة)/, 'العين/الحسد'],
  [/(^|[\s،.«(])قدر(ك|ي|نا|ه)?($|[\s،.!؟»)])/, 'القدر'], [/أبراج|ابراج|برجك|فلك|طالع|خريطة\s*فلكية|الخريطة\s*الفلكية/, 'تنجيم (ممنوع للجمهور العربي)'],
  [/آلاف|تقييمات|مراجعات/, 'دليل اجتماعي غير موجود'], [/يجذب\s*المال|جذب\s*المال|قانون\s*الجذب/, 'جذب المال'],
];
const blockHits = [];
for (const [re, why] of (AR ? [...EN_BLOCK, ...AR_BLOCK] : EN_BLOCK)) {
  const m = allText.match(re);
  if (m) blockHits.push(`${why}: "${m[0].trim()}"`);
}
blockHits.forEach((h) => issues.push(`Blocked language — ${h}. Rephrase using the claims policy.`));
if (/\bLina\b/i.test(allText) && !/(fictional|illustrative)/i.test(allText)) issues.push('Lina must always be labelled as a fictional, illustrative sample.');
if (/لينا/.test(allText) && !/(خيالية|توضيحية)/.test(allText)) issues.push('لينا يجب أن تُذكر دائمًا كشخصية خيالية في عيّنة توضيحية.');

// ---- Prices and urgency must be true ----
const PRICES = ['$8.88', '$18.88', '$24.88'];
(allText.match(/\$\s?\d+(?:\.\d{2})?/g) || []).forEach((p) => { if (!PRICES.includes(p.replace(/\s/g, ''))) issues.push(`Price ${p} does not match the site (Lite $8.88, Full $18.88, list $24.88).`); });
if (!S.LAUNCH_END_DATE && /(ends (tonight|today|soon)|last chance|only \d+ left|limited time|ينتهي الليلة|آخر فرصة)/i.test(allText)) issues.push('Urgency claim without a real end date. Remove it.');

// ---- Assemble the post (only meaningful when there are no issues) ----
const today = $now.setZone(S.TIMEZONE).toFormat('yyyyMMdd');
const seq = String((brief.today_count || 0) + 1).padStart(2, '0');
const postId = `mcc-${today}-${out.format === 'reel' ? 'r' : 'c'}${seq}-${out.lang}`;
const path = out.cta_tier === 'T2' ? '/crystal-match' : out.cta_tier === 'T3' ? '/quiz' : (AR ? '/ar' : '/');
const pillar = String(out.pillar || brief.row.pillar || 'general').toLowerCase().replace(/[^a-z0-9]+/g, '-');
const utm = (platform) => `${S.SITE}${path}${path.includes('?') ? '&' : '?'}${AR && path !== '/ar' ? 'lang=ar&' : ''}utm_source=${platform}&utm_medium=social&utm_campaign=mcc_${today.slice(2, 6)}_${pillar}&utm_content=${postId}&utm_term=${out.lang}`;
const FOOTER = AR ? 'إرشاد تأملي، وليس نصيحة طبية أو نفسية أو مالية. صُنع بمساعدة الذكاء الاصطناعي.' : 'Reflective guidance, not medical, psychological, or financial advice. Made with AI.';
const caption = [String(out.caption || '').trim(), tags.join(' '), FOOTER].filter(Boolean).join('\n\n');
if (len(caption) > 2150) issues.push(`The final caption is ${len(caption)} characters with hashtags and footer; Instagram allows 2200. Shorten the caption.`);

// Deck JSON for the template: index/total, the sample page URL, and the CTA offer.
const deck = slides.map((s, i) => {
  const d = { ...s, lang: out.lang, index: i + 1, total: slides.length };
  if (s.layout === 'sample') d.image = `${S.SITE}/sample/${['lina-01-energy-story', 'lina-02-your-pattern', 'lina-03-energy-center-map', 'lina-04-focus-centers', 'lina-05-crystal-protocol', 'lina-06-seven-day-reset'][(s.page || 1) - 1]}.webp`;
  if (s.layout === 'cta') d.offer = out.cta_tier === 'T3' ? 'full' : out.cta_tier === 'T2' ? 'lite' : (s.offer || 'both');
  return d;
});

const post = {
  post_id: postId, queue_id: brief.row.id || '', lang: out.lang, format: out.format, pillar: out.pillar || brief.row.pillar || '',
  formula: out.formula || brief.row.formula || '', cta_tier: out.cta_tier, hook: String(out.hook || '').trim(),
  caption, caption_body: out.caption, hashtags: tags, alt_text: out.alt_text || '', visual_description: out.visual_description || '',
  slides: deck, beats, voiceover: out.voiceover || '', broll_prompt: out.broll_prompt || '',
  link_instagram: utm('instagram'), link_tiktok: utm('tiktok'), attempt: brief.attempt, blocklist_hits: blockHits,
};

const compliancePrompt = `${brief.compliance_rules}

INPUT
platform: instagram and tiktok
language: ${post.lang}
format: ${post.format}
caption: ${post.caption}
on_screen_text: ${onScreen}
voiceover: ${post.voiceover}
hashtags: ${tags.join(' ')}
visual_description: ${post.visual_description} ${post.broll_prompt}
cta_url: ${post.link_instagram}
offer_config: ${JSON.stringify({ lite: 8.88, full: 18.88, full_list: 24.88, launch_end_date: S.LAUNCH_END_DATE || null })}`;

return [{ json: { ok: issues.length === 0, issues, stage: 'gate_a', post, compliance_prompt: compliancePrompt } }];
