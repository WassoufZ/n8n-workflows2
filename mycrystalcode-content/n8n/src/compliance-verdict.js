// Combines Gate A's post with the compliance model's verdict. pass=true only with zero blocker
// and zero major issues (agency/D §3.3). A malformed verdict is a fail (fail closed).
const gate = $('Gate A: validate copy').first().json;
const v = $input.first().json.output;
if (!v || typeof v.pass !== 'boolean' || !Array.isArray(v.issues)) {
  return [{ json: { ok: false, stage: 'compliance', issues: [`Compliance check returned no valid verdict (treated as a fail): ${$input.first().json.llm?.error || 'malformed'}`], post: gate.post } }];
}
const serious = v.issues.filter((i) => i.severity === 'blocker' || i.severity === 'major');
const ok = v.pass === true && serious.length === 0;
return [{ json: {
  ok, stage: 'compliance', post: gate.post, compliance: v,
  issues: serious.map((i) => `[${i.rule} ${i.severity}] ${i.field}: "${i.excerpt}" — ${i.reason}`),
} }];
