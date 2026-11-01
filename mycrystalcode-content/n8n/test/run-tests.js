#!/usr/bin/env node
// Runs the Code nodes of the BUILT workflow (workflows/01-mcc-content-autopilot.json) in a small
// simulation of n8n's Code-node runtime ($, $input, $now, this.helpers), with the external
// services stubbed: Sheets rows, the LLM outputs (fixtures below) and Upload-Post. Gotenberg is
// replaced by a local Chromium render of the same HTML, so the slide template is exercised for real.
//   cd mycrystalcode-content/n8n/test && npm install && node run-tests.js
// Optional: GOTENBERG_URL=http://localhost:3000 renders through a real Gotenberg instead of local Chromium.
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { DateTime } = require('luxon');
const { chromium } = require('playwright');

const wf = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'workflows', '01-mcc-content-autopilot.json'), 'utf8'));
const node = (name) => wf.nodes.find((n) => n.name === name) || assert.fail(`no node ${name}`);
const settings = Object.fromEntries(node('⚙️ Settings').parameters.assignments.assignments.map((a) => [a.name, a.value]));
Object.assign(settings, { SHEET_ID: 'test', TELEGRAM_CHAT_ID: '1' });
const OUT = process.env.MCC_TEST_OUT || path.join(__dirname, 'out');
fs.mkdirSync(OUT, { recursive: true });

// ---- n8n Code-node runtime simulation ----
class Run {
  constructor() { this.out = {}; }
  set(name, items) { this.out[name] = items; return items; }
  accessor() {
    return (name) => {
      const items = this.out[name];
      return {
        get isExecuted() { return Boolean(items); },
        first: () => { if (!items) throw new Error(`Node "${name}" has not run`); return items[0]; },
        all: () => { if (!items) throw new Error(`Node "${name}" has not run`); return items; },
      };
    };
  }
  async code(name, input) {
    const src = node(name).parameters.jsCode;
    const fn = new (Object.getPrototypeOf(async function () {}).constructor)('$', '$input', '$now', 'DateTime', src);
    const helpers = { getBinaryDataBuffer: async (i, key) => Buffer.from(input[i].binary[key].data, 'base64') };
    const result = await fn.call({ helpers }, this.accessor(), { first: () => input[0], all: () => input }, DateTime.now(), DateTime);
    return this.set(name, result);
  }
}

let browser;
async function render(htmlB64, width, height, format, omit) {
  // GOTENBERG_URL set: render through the real Gotenberg API with the workflow's exact form fields.
  if (process.env.GOTENBERG_URL) {
    const form = new FormData();
    form.append('files', new Blob([Buffer.from(htmlB64, 'base64')], { type: 'text/html' }), 'index.html');
    Object.entries({ width, height, clip: 'true', format, quality: format === 'jpeg' ? '92' : '', omitBackground: String(omit),
      waitForExpression: "document.body.getAttribute('data-ready') === '1' || document.body.hasAttribute('data-error')" }).forEach(([k, v]) => v !== '' && form.append(k, String(v)));
    const res = await fetch(`${process.env.GOTENBERG_URL}/forms/chromium/screenshot/html`, { method: 'POST', body: form });
    if (!res.ok) throw new Error(`Gotenberg HTTP ${res.status}: ${await res.text()}`);
    return Buffer.from(await res.arrayBuffer());
  }
  const page = await browser.newPage({ viewport: { width, height } });
  await page.setContent(Buffer.from(htmlB64, 'base64').toString('utf8'), { waitUntil: 'networkidle' });
  await page.waitForSelector('body[data-ready="1"]', { timeout: 30000 });
  const buf = await page.screenshot({ type: format, quality: format === 'jpeg' ? 92 : undefined, clip: { x: 0, y: 0, width, height }, omitBackground: omit });
  await page.close();
  return buf;
}
const bin = (buf, mime) => ({ data: buf.toString('base64'), mimeType: mime, fileName: mime === 'image/png' ? 'f.png' : 'f.jpg' });

// ---- fixtures ----
const controlRows = [['global_enabled', 'TRUE'], ['ig_enabled', 'TRUE'], ['tt_enabled', 'TRUE'], ['en_enabled', 'TRUE'], ['ar_enabled', 'TRUE'], ['max_posts_day', '2']]
  .map(([key, value]) => ({ json: { key, value } }));
const queueRow = (over) => ({ json: { id: 'T01', date: '2026-10-01', lang: 'en', format: 'carousel', pillar: 'P1', formula: 'C01', angle: 'Struggling to say no', cta_tier: 'T2', platforms: 'instagram,tiktok', status: 'planned', ...over } });
const carouselOut = {
  lang: 'en', format: 'carousel', formula: 'C01', pillar: 'P1', cta_tier: 'T2',
  hook: "You know what you do. Do you know what's driving it?",
  caption: 'Three people struggle to say no. The behavior looks the same, the reasons do not. Which one sounds closest? Your reading starts from your answers, not a generic description. Lite is $8.88, link in bio.',
  hashtags: ['#peoplepleaser', '#howtosayno', '#selfawareness', '#mycrystalcode'],
  alt_text: 'Dark violet slide with a sacred-geometry mark and the headline about what drives your patterns.',
  visual_description: 'Brand slides: night scene, paper slides, sample reading page.',
  slides: [
    { layout: 'cover', eyebrow: 'For the pattern explorer', headline: "You know what you do. But do you know what's *driving it?*", sub: 'Three people. One habit. Three very different reasons.', glyph: 'transmutation' },
    { layout: 'split', behavior: 'Struggling to *say no.*', reasons: ['One fears disappointing someone they love.', 'Another doubts their right to make a different choice.', 'A third worries about losing control of the situation.'] },
    { layout: 'statement', eyebrow: 'The point', statement: 'The behavior looks the same. The patterns behind it may be *completely different.*', support: 'Your context changes the interpretation.' },
    { layout: 'list', eyebrow: 'Sound familiar?', title: 'When receiving feels *harder than giving*', items: [{ text: 'You deflect a compliment within seconds.' }, { text: "You say \"I'm fine\" before you've checked." }, { text: 'Help feels like a debt you need to repay.' }] },
    { layout: 'quote', eyebrow: 'Sit with this', question: 'What if the question is what *receiving* means to you?', prompt: 'Save it for later' },
    { layout: 'centers', eyebrow: 'One center', centers: [{ key: 'throat', name: 'Throat', state: 'care', note: 'Saying what you need', body: 'When this center is *calling for care*, saying what you need can feel risky.' }] },
    { layout: 'sample', eyebrow: 'See before you buy', title: 'Inside a *reading*', page: 2, callout: 'Your pattern, under pressure.' },
    { layout: 'cta' },
  ],
  beats: [], voiceover: '', broll_prompt: '',
};
const reelOut = {
  lang: 'ar', format: 'reel', formula: 'R01', pillar: 'P1', cta_tier: 'T0',
  hook: 'ثلاثة أشخاص يصعب عليهم قول «لا».',
  caption: 'السلوك نفسه، والأسباب مختلفة. أي واحد أقرب إليك؟ التعليق برقم ١ أو ٢ أو ٣.',
  hashtags: ['#كريستال_كود', '#اكتشاف_الذات', '#الوعي_الذاتي'],
  alt_text: 'إطارات نصية على خلفية بنفسجية داكنة.', visual_description: 'Text frames on the brand night scene.',
  slides: [],
  beats: [{ text: 'ثلاثة أشخاص *يصعب عليهم «لا».*', seconds: 2.5 }, { text: 'أحدهم يخشى أن *يخذل* من يحب.', seconds: 3 },
    { text: 'وآخر يشكّ في *حقّه* في خيار مختلف.', seconds: 3 }, { text: 'وثالث يقلق من *فقد السيطرة.*', seconds: 3 }, { text: 'السلوك نفسه. *والأسباب مختلفة.*', seconds: 3.5 }],
  voiceover: 'ثلاثة أشخاص يصعب عليهم قول لا. أحدهم يخشى أن يخذل من يحب، وآخر يشكّ في حقّه في خيار مختلف، وثالث يقلق من فقد السيطرة. السلوك نفسه، والأسباب مختلفة.',
  broll_prompt: 'Three pairs of feet paused at the same doorway threshold, warm light beyond; slow push-in.',
};
const passCompliance = { json: { output: { pass: true, issues: [], fixed_caption: '' } } };

async function prelude(run, queue, slot) {
  run.set('⚙️ Settings', [{ json: settings }]);
  if (slot) run.set(slot, [{ json: {} }]);
  run.set('Read Control', controlRows);
  await run.code('Kill switch gate', controlRows);
  run.set('Read Queue', queue);
  run.set('Read Log', [{ json: {} }]);
  run.set('Read Insights', [{ json: {} }]);
  return run.code('Pick next post', [{ json: {} }]);
}

const tests = [];
const test = (name, fn) => tests.push([name, fn]);

test('kill switch: paused or unreadable Control stops the run', async () => {
  const run = new Run();
  run.set('⚙️ Settings', [{ json: settings }]);
  assert.deepStrictEqual(await run.code('Kill switch gate', [{ json: { key: 'global_enabled', value: 'FALSE' } }]), []);
  await assert.rejects(run.code('Kill switch gate', [{ json: {} }]), /fail closed/);
});

test('picker: respects the slot language and the daily cap', async () => {
  const run = new Run();
  const picked = await prelude(run, [queueRow({ id: 'A1', lang: 'ar' }), queueRow({ id: 'E1', lang: 'en' })], 'Slot A · EN 14:00 UTC');
  assert.strictEqual(picked[0].json.row.id, 'E1');
  assert.strictEqual(picked[0].json.row.platforms, 'instagram,tiktok');
  const run2 = new Run();
  run2.set('⚙️ Settings', [{ json: settings }]);
  await run2.code('Kill switch gate', controlRows);
  run2.set('Read Queue', [queueRow()]);
  const today = DateTime.now().setZone(settings.TIMEZONE).toFormat('yyyy-MM-dd');
  run2.set('Read Log', [1, 2].map((i) => ({ json: { post_id: `p${i}`, created_at: `${today}T10:00:00`, status: 'published' } })));
  run2.set('Read Insights', [{ json: {} }]);
  assert.deepStrictEqual(await run2.code('Pick next post', [{ json: {} }]), [], 'cap of 2 reached');
});

test('carousel happy path: brief → gates → render → QA → publish plan → audit', async () => {
  const run = new Run();
  const picked = await prelude(run, [queueRow()]);
  const brief = await run.code('Build brief', picked);
  const prompt = brief[0].json.prompt;
  assert.match(prompt, /TODAY'S FORMULA: C01/);
  assert.ok(prompt.length < 120000, `prompt is ${prompt.length} chars`);
  console.log(`    prompt: ${prompt.length} chars (~${Math.round(prompt.length / 4)} tokens)`);
  run.set('Copywriter (Claude)', [{ json: { output: carouselOut } }]);
  const gate = await run.code('Gate A: validate copy', [{ json: { output: JSON.parse(JSON.stringify(carouselOut)) } }]);
  assert.deepStrictEqual(gate[0].json.issues, []);
  const post = gate[0].json.post;
  assert.match(post.caption, /Made with AI\.$/);
  assert.match(post.link_instagram, /\/crystal-match\?utm_source=instagram&utm_medium=social&utm_campaign=mcc_\d{4}_p1&utm_content=mcc-\d{8}-c01-en&utm_term=en/);
  assert.strictEqual(post.slides[6].image, 'https://www.mycrystalcode.com/sample/lina-02-your-pattern.webp');
  assert.strictEqual(post.slides[7].offer, 'lite');
  const cv = await run.code('Compliance verdict', [passCompliance]);
  assert.strictEqual(cv[0].json.ok, true);
  run.set('Format?', cv);

  const html = await run.code('Slides → HTML', cv);
  assert.strictEqual(html.length, 8);
  const sampleDir = process.env.MCC_SAMPLE_DIR;
  const rendered = [];
  for (const it of html) {
    let b64 = it.binary.data.data;
    if (sampleDir) {
      const s = Buffer.from(b64, 'base64').toString('utf8').replace(/https:\/\/www\.mycrystalcode\.com\/sample\/([\w-]+\.webp)/g,
        (_m, f) => `data:image/webp;base64,${fs.readFileSync(path.join(sampleDir, f)).toString('base64')}`);
      b64 = Buffer.from(s).toString('base64');
    }
    const jpg = await render(b64, 1080, 1350, 'jpeg', false);
    fs.writeFileSync(path.join(OUT, `carousel-${it.json.n}.jpg`), jpg);
    rendered.push({ json: { n: it.json.n }, binary: { data: bin(jpg, 'image/jpeg') } });
  }
  run.set('Render slide (Gotenberg)', rendered);
  const collected = await run.code('Collect slides', rendered);
  const sheetJpg = await render(collected[0].binary.data.data, 1080, 700, 'jpeg', false);
  fs.writeFileSync(path.join(OUT, 'contact-sheet.jpg'), sheetJpg);
  const sheetItem = [{ json: {}, binary: { data: bin(sheetJpg, 'image/jpeg') } }];
  const bundle = await run.code('Bundle carousel', sheetItem);
  assert.deepStrictEqual(bundle[0].json.qa_keys, ['slide_1', 'slide_2', 'slide_3', 'slide_4', 'slide_5', 'slide_6', 'slide_7', 'slide_8']);
  assert.ok(bundle[0].binary.sheet);
  const qr = await run.code('QA request', bundle);
  assert.strictEqual(qr[0].json.llm_job.images.length, 8);
  const qreq = await run.code('Vision QA · request', qr);
  const qbody = JSON.parse(qreq[0].json.body);
  assert.strictEqual(qreq[0].json.provider, 'glm');
  assert.strictEqual(qbody.model, 'glm-4.6v-flash');
  assert.strictEqual(qbody.messages[1].content.filter((c) => c.type === 'image_url').length, 8);
  assert.ok(!qbody.response_format, 'no JSON mode on vision calls');
  console.log(`    vision request: ${(qreq[0].json.body.length / 1e6).toFixed(1)} MB`);
  const qaRes = { json: { output: { items: [{ id: 'B1', pass: true, note: '' }], verdict: 'pass' } } };
  const qv = await run.code('QA verdict', [qaRes]);
  assert.strictEqual(qv[0].json.ok, true);
  assert.ok(qv[0].binary.slide_8);

  run.set('Re-read Control', controlRows);
  const plan = await run.code('Publish plan', controlRows);
  assert.deepStrictEqual(plan.map((p) => p.json.platform), ['instagram', 'tiktok']);
  assert.ok([...plan[1].json.tiktok_title].length <= 90, 'TikTok photo title <= 90');
  assert.match(plan[0].json.title, /Made with AI\.$/);
  assert.strictEqual(plan[1].json.request_id, `${post.post_id}-tiktok`);
  assert.ok(plan[0].binary.slide_1 && !plan[0].binary.sheet);
  const audit = await run.code('Audit row', plan.map(() => ({ json: { success: true } })));
  assert.deepStrictEqual(audit.map((a) => a.json.status), ['published', 'published']);
  assert.strictEqual(audit[0].json.approved, 'veto-window');
  assert.strictEqual(audit[1].json.request_id, `${post.post_id}-tiktok`);
});

test('kill switch tripped between approval and publish: nothing is published', async () => {
  const run = new Run();
  run.set('⚙️ Settings', [{ json: settings }]);
  run.set('Build brief', [{ json: { row: { platforms: '' } } }]);
  run.set('QA verdict', [{ json: { post: { post_id: 'x' } }, binary: {} }]);
  run.set('Re-read Control', [{ json: { key: 'global_enabled', value: 'FALSE' } }]);
  const plan = await run.code('Publish plan', [{ json: {} }]);
  assert.strictEqual(plan[0].json.skipped, true);
});

test('Gate A blocks claims, wrong counts, fake proof and false prices; then one retry, then hold', async () => {
  const run = new Run();
  const picked = await prelude(run, [queueRow()]);
  await run.code('Build brief', picked);
  const bad = JSON.parse(JSON.stringify(carouselOut));
  bad.slides.splice(3, 1);
  bad.caption = 'Amethyst heals anxiety. Thousands of readers love it! Only $9.99. Lina found her purpose.';
  const gate = await run.code('Gate A: validate copy', [{ json: { output: bad } }]);
  const issues = gate[0].json.issues.join('\n');
  assert.strictEqual(gate[0].json.ok, false);
  for (const re of [/exactly 8 slides/, /health claim \(heal\)/, /anxiety/, /social proof/, /\$9\.99/, /Lina must always be labelled/]) assert.match(issues, re);
  const retry = await run.code('Retry or hold', gate);
  assert.strictEqual(retry[0].json.retry, true);
  assert.strictEqual(retry[0].json.attempt, 2);
  const brief2 = await run.code('Build brief', retry);
  assert.match(brief2[0].json.prompt, /PREVIOUS DRAFT WAS REJECTED[\s\S]*health claim/);
  const hold = await run.code('Retry or hold', gate);
  assert.strictEqual(hold[0].json.retry, false);
  assert.match(hold[0].json.message, /Held for review/);
});

test('Gate A: Arabic astrology and evil-eye language is blocked; "third eye" is not', async () => {
  const run = new Run();
  const picked = await prelude(run, [queueRow({ lang: 'ar', format: 'reel', formula: 'R01' })]);
  await run.code('Build brief', picked);
  const ok = await run.code('Gate A: validate copy', [{ json: { output: { ...reelOut, caption: reelOut.caption + ' مركز العين الثالثة.' } } }]);
  assert.deepStrictEqual(ok[0].json.issues, []);
  const bad = await run.code('Gate A: validate copy', [{ json: { output: { ...reelOut, caption: 'خريطتك الفلكية تحميك من الحسد والعين.' } } }]);
  const issues = bad[0].json.issues.join('\n');
  assert.match(issues, /تنجيم/); assert.match(issues, /الحسد/);
});

test('reel path: beats render as frames, inputs assemble for mcc-reel', async () => {
  const run = new Run();
  const picked = await prelude(run, [queueRow({ lang: 'ar', format: 'reel', formula: 'R01' })]);
  await run.code('Build brief', picked);
  const gate = await run.code('Gate A: validate copy', [{ json: { output: JSON.parse(JSON.stringify(reelOut)) } }]);
  assert.deepStrictEqual(gate[0].json.issues, []);
  const cv = await run.code('Compliance verdict', [passCompliance]);
  run.set('Format?', cv);
  const beats = await run.code('Beats → HTML', cv);
  assert.strictEqual(beats.length, 5);
  const frames = [];
  for (const it of beats) {
    const png = await render(it.binary.data.data, 1080, 1920, 'png', it.json.omit_background === 'true');
    fs.writeFileSync(path.join(OUT, `reel-beat-${it.json.n}.png`), png);
    frames.push({ json: {}, binary: { data: bin(png, 'image/png') } });
  }
  run.set('Render beat (Gotenberg)', frames);
  const cb = await run.code('Collect beats', frames);
  assert.strictEqual(cb[0].json.durations, '[2.5,3,3,3,3.5]');
  assert.match(cb[0].json.ssml, /xml:lang="ar-AE"><voice name="ar-AE-FatimaNeural">/);
  assert.match(cb[0].json.ssml, /يصعب عليهم/);
  run.set('Voiceover (Azure)', [{ json: {}, binary: { data: bin(Buffer.from('ID3'), 'audio/mpeg') } }]);
  const none = await run.code('Assemble reel inputs', [{ json: {} }]);
  assert.deepStrictEqual(Object.keys(none[0].binary).sort(), ['beat_1', 'beat_2', 'beat_3', 'beat_4', 'beat_5', 'voice']);
  assert.strictEqual(none[0].json.clip_url, '');
  const failed = await run.code('Assemble reel inputs', [{ json: { task_status: 'FAIL' } }]);
  assert.strictEqual(failed[0].json.clip_url, '', 'a failed clip falls back to a standard reel');
  const ari = await run.code('Assemble reel inputs', [{ json: { task_status: 'SUCCESS', video_result: [{ url: 'https://cdn.example/clip.mp4' }] } }]);
  assert.strictEqual(ari[0].json.clip_url, 'https://cdn.example/clip.mp4');
  const br = await run.code('Bundle reel', [{ json: {}, binary: { data: bin(Buffer.from('mp4'), 'video/mp4') } }]);
  assert.deepStrictEqual(br[0].json.qa_keys, ['beat_1', 'beat_2', 'beat_3', 'beat_4', 'beat_5']);
  assert.ok(br[0].binary.video);
});

test('model router: GLM and Claude request bodies, fallback on the corrective draw', async () => {
  const run = new Run();
  run.set('⚙️ Settings', [{ json: settings }]);
  const job = { system: 'sys', prompt: 'write', temperature: 0.7, max_tokens: 12000, attempt: 1 };
  const g = await run.code('Copywriter · request', [{ json: { llm_job: job } }]);
  const gb = JSON.parse(g[0].json.body);
  assert.strictEqual(g[0].json.provider, 'glm');
  assert.strictEqual(gb.model, 'glm-4.7-flash');
  assert.deepStrictEqual(gb.response_format, { type: 'json_object' });
  assert.deepStrictEqual(gb.messages.map((m) => m.role), ['system', 'user']);
  const c = await run.code('Copywriter · request', [{ json: { llm_job: { ...job, attempt: 2 } } }]);
  const cb = JSON.parse(c[0].json.body);
  assert.strictEqual(c[0].json.provider, 'claude', 'second draw uses COPY_FALLBACK_PROVIDER');
  assert.strictEqual(cb.model, 'claude-sonnet-5-5');
  assert.strictEqual(cb.system, 'sys');
  const comp = await run.code('Compliance · request', [{ json: { llm_job: { ...job, temperature: 0 } } }]);
  assert.strictEqual(comp[0].json.provider, 'claude');
  assert.strictEqual(JSON.parse(comp[0].json.body).model, 'claude-haiku-5-5');
  assert.strictEqual(JSON.parse(comp[0].json.body).temperature, 0);
});

test('model router: parses GLM, Claude and fenced JSON; errors fail closed', async () => {
  const run = new Run();
  run.set('Copywriter · request', [{ json: { provider: 'glm', model: 'glm-4.7-flash' } }]);
  const glm = await run.code('Copywriter · parse', [{ json: { choices: [{ message: { content: '{"a":1}', reasoning_content: 'thinking...' } }] } }]);
  assert.deepStrictEqual(glm[0].json.output, { a: 1 });
  assert.strictEqual(glm[0].json.llm.model, 'glm-4.7-flash');
  const claude = await run.code('Copywriter · parse', [{ json: { content: [{ type: 'text', text: 'Here you go:\n```json\n{"b":2}\n```' }] } }]);
  assert.deepStrictEqual(claude[0].json.output, { b: 2 });
  const err = await run.code('Copywriter · parse', [{ json: { error: { message: 'rate limited' } } }]);
  assert.strictEqual(err[0].json.output, null);
  assert.match(err[0].json.llm.error, /rate limited/);
  const junk = await run.code('Copywriter · parse', [{ json: { choices: [{ message: { content: 'not json' } }] } }]);
  assert.strictEqual(junk[0].json.output, null);
  run.set('Gate A: validate copy', [{ json: { post: { post_id: 'x' } } }]);
  const cv = await run.code('Compliance verdict', err);
  assert.strictEqual(cv[0].json.ok, false, 'no verdict = fail');
});

test('veto window: stop link is honoured only with the matching nonce', async () => {
  const run = new Run();
  run.set('⚙️ Settings', [{ json: { ...settings, N8N_PUBLIC_URL: 'https://n8n.mycrystalcode.com/' } }]);
  run.set('Build brief', [{ json: { row: { platforms: 'instagram' } } }]);
  run.set('QA verdict', [{ json: { post: { post_id: 'mcc-20261102-c01-en', format: 'carousel', hook: 'h', caption: 'c' } }, binary: { slide_1: {} } }]);
  const vw = await run.code('Veto window', [{ json: {} }]);
  const { nonce, message } = vw[0].json;
  assert.match(message, new RegExp(`https://n8n\\.mycrystalcode\\.com/webhook/veto\\?p=mcc-20261102-c01-en&n=${nonce}`));
  run.set('Re-read Control', controlRows);
  run.set('Read Vetoes', [{ json: { post_id: 'mcc-20261102-c01-en', nonce: 'wrongwrongwrongwrongwron' } }]);
  let plan = await run.code('Publish plan', [{ json: {} }]);
  assert.strictEqual(plan[0].json.platform, 'instagram', 'a wrong nonce does not stop the post');
  run.set('Read Vetoes', [{ json: { post_id: 'mcc-20261102-c01-en', nonce } }]);
  plan = await run.code('Publish plan', [{ json: {} }]);
  assert.strictEqual(plan[0].json.skipped, true);
  assert.match(plan[0].json.reason, /veto/);
});

(async () => {
  browser = await chromium.launch();
  let failed = 0;
  for (const [name, fn] of tests) {
    try { await fn(); console.log(`✓ ${name}`); } catch (e) { failed++; console.log(`✗ ${name}\n    ${e.stack.split('\n').slice(0, 3).join('\n    ')}`); }
  }
  await browser.close();
  console.log(`\n${tests.length - failed}/${tests.length} passed. Renders in ${OUT}`);
  process.exit(failed ? 1 : 0);
})();
