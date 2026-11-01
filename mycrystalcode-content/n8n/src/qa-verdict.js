// Parses the vision verdict. Unparseable output counts as a fail (fail closed).
const req = $('QA request').first();
const v = $input.first().json.output;
const post = req.json.post;
if (!v || !Array.isArray(v.items)) {
  return [{ json: { ok: false, stage: 'visual_qa', post, issues: ['Visual QA returned unparseable output (treated as a fail).'] }, binary: req.binary }];
}
const failed = v.items.filter((i) => !i.pass);
return [{ json: {
  ok: v.verdict === 'pass', stage: 'visual_qa', post, qa: v,
  issues: failed.map((i) => `${i.id}: ${i.note || 'failed'}`),
}, binary: req.binary }];
