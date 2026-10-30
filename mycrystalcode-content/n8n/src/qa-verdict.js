// Parses the vision verdict. Unparseable output counts as a fail (fail closed).
const req = $('QA request').first();
const res = $input.first().json;
const text = (res.content || []).filter((c) => c.type === 'text').map((c) => c.text).join('').trim();
let v;
try { v = JSON.parse(text.replace(/^```(json)?|```$/g, '').trim()); } catch (e) { v = null; }
const post = req.json.post;
if (!v || !Array.isArray(v.items)) {
  return [{ json: { ok: false, stage: 'visual_qa', post, issues: ['Visual QA returned unparseable output (treated as a fail).'] }, binary: req.binary }];
}
const failed = v.items.filter((i) => !i.pass);
return [{ json: {
  ok: v.verdict === 'pass', stage: 'visual_qa', post, qa: v,
  issues: failed.map((i) => `${i.id}: ${i.note || 'failed'}`),
}, binary: req.binary }];
