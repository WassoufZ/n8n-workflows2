// Model router, step 2: normalises the GLM (OpenAI-style) or Claude response into
// { output: <parsed JSON or null>, llm: { provider, model, ok, error, usage } }.
// Unparseable output is null, which every gate treats as a fail (fail closed).
const REQ = /*@REQ_NODE@*/'';
const req = $(REQ).first().json;
const r = $input.first().json || {};
let text = '';
if (Array.isArray(r.choices)) text = r.choices[0]?.message?.content || '';
else if (Array.isArray(r.content)) text = r.content.filter((c) => c.type === 'text').map((c) => c.text).join('');
const error = r.error ? (r.error.message || JSON.stringify(r.error)).slice(0, 500) : (text ? '' : 'empty response');
let output = null;
if (text) {
  const t = text.replace(/^\s*```(?:json)?/i, '').replace(/```\s*$/, '').trim();
  const a = t.indexOf('{'), b = t.lastIndexOf('}');
  try { output = JSON.parse(a >= 0 && b > a ? t.slice(a, b + 1) : t); } catch (e) { output = null; }
}
return [{ json: { output, llm: { provider: req.provider, model: req.model, ok: Boolean(output), error: output ? '' : (error || 'response was not valid JSON'), usage: r.usage || null } } }];
