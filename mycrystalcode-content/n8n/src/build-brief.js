// Loop entry for the copywriter: the first draw comes from "Pick next post", the single
// corrective draw comes back from "Retry?" with the issues as feedback (agency/D §3.3: one
// draw + one corrective call, then a human).
// It picks ONE formula (agency/B-formulas.json) and sends only that formula plus its pillar's
// hooks, banks and hashtags, so the prompt stays small.
const S = $('⚙️ Settings').first().json;
const input = $input.first().json;
const BRIEF = /*@BRIEF@*/'';
const POLICY = /*@POLICY@*/'';
const FORMULAS = /*@FORMULAS@*/[];
const STRATEGY = /*@STRATEGY@*/{};
const CONTRACT = /*@CONTRACT@*/'';
const COMPLIANCE_RULES = /*@COMPLIANCE@*/'';

const row = { ...input.row };
const log = $('Read Log').all().map((i) => i.json).filter((r) => r.post_id);

// Formulas that need the founder on camera or a screen recording are never auto-produced.
const autopilot = FORMULAS.filter((f) => !['founder', 'screen_capture'].includes(f.production_mode));
let formula = autopilot.find((f) => f.id === row.formula || f.slug === row.formula);
if (!formula) {
  const format = row.format || 'carousel';
  const uses = (f) => log.filter((r) => r.formula === f.id).length;
  formula = autopilot.filter((f) => f.type === format && (!row.pillar || f.pillar === row.pillar))
    .sort((a, b) => uses(a) - uses(b))[0] || autopilot.find((f) => f.type === format);
}
row.format = formula.type;
row.formula = formula.id;
row.pillar = row.pillar || formula.pillar;
if (row.lang === 'ar' && formula.id === 'C05') throw new Error('C05 needs the Arabic sample reading, which does not exist yet.');

const pillar = (STRATEGY.pillars || []).find((p) => p.id === row.pillar) || {};
const hooks = (STRATEGY.hooks || []).filter((h) => h.pillar === row.pillar || (formula.recommended_hook_ids || []).includes(h.id));
const formulaText = JSON.stringify(formula).toUpperCase();
const BANK_KEYS = { behaviors: 'BEHAVIOR', centers: 'CENTER', crystals: 'CRYSTAL', patterns: 'PATTERN', money_scenarios: 'MONEY', quiz_exclusions: 'QUIZ' };
const banks = Object.fromEntries(Object.entries(STRATEGY.banks || {}).filter(([k]) => formulaText.includes(BANK_KEYS[k] || k.toUpperCase())));
const tiers = (STRATEGY.cta_tiers || []).filter((t) => (formula.cta_tier_allowed || [formula.cta_tier]).includes(t.id));
const tags = (STRATEGY.hashtags || {})[row.pillar] || {};
const keywords = (STRATEGY.search_keywords || {})[row.pillar] || {};

const recentHooks = log.slice(-25).map((r) => `- [${r.lang}/${r.formula}] ${r.hook}`).join('\n') || '(none yet)';
const insights = $('Read Insights').all().map((i) => i.json).filter((r) => r.summary).slice(-1)[0];
const AR = row.lang === 'ar';

const prompt = `You are the in-house social copywriter for My Crystal Code (MCC), writing one ${formula.type} for Instagram and TikTok in ${AR ? 'ARABIC (Modern Standard Arabic, warm and Gulf-friendly; use the site\'s Arabic terms exactly; avoid gendered "you" where the site does)' : 'ENGLISH'}.

=== BRAND & OFFER (source of truth) ===
${BRIEF}

=== CLAIMS POLICY (non-negotiable) ===
${POLICY}

=== TODAY'S FORMULA: ${formula.id} ${formula.name} ===
${JSON.stringify(formula)}

=== PILLAR ===
${JSON.stringify(pillar)}

=== HOOK BANK FOR THIS PILLAR (adapt; the Arabic versions are written natively) ===
${JSON.stringify(hooks)}

=== CONTENT BANKS ===
${JSON.stringify(banks)}

=== CTA TIERS ALLOWED ===
${JSON.stringify(tiers)}

=== HASHTAGS & SEARCH KEYWORDS (${AR ? 'use the "ar" sets' : 'use the "en" sets'}) ===
${JSON.stringify({ hashtags: tags, keywords, banned: STRATEGY.banned_hashtags || [] })}

=== SLIDE TEMPLATE CONTRACT (the renderer's hard limits) ===
${CONTRACT}

=== PERFORMANCE INSIGHTS (latest weekly review) ===
${insights ? `${insights.summary}\nDo more: ${insights.do_more}\nDo less: ${insights.do_less}` : '(no data yet)'}

=== RECENT HOOKS (do not repeat or closely paraphrase) ===
${recentHooks}

=== ASSIGNMENT ===
language: ${row.lang}
format: ${row.format}
formula: ${row.formula}
pillar: ${row.pillar}
angle: ${row.angle || '(choose the strongest angle from the banks)'}
cta_tier: ${row.cta_tier || formula.cta_tier}
notes: ${row.notes || '-'}
${input.feedback ? `\n=== YOUR PREVIOUS DRAFT WAS REJECTED. FIX EVERY ISSUE BELOW ===\n${input.feedback}\n` : ''}
Return ONLY the JSON object the output schema describes. Set "formula" to "${row.formula}" and "pillar" to "${row.pillar}". Write all on-screen text, the hook, caption and voiceover in ${AR ? 'Arabic' : 'English'}. Do not put hashtags or the legal footer in "caption": the workflow appends them.`;

return [{ json: { ...input, row, prompt, compliance_rules: COMPLIANCE_RULES } }];
