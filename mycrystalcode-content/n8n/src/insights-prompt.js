// Weekly learning loop: joins the Log, Metrics, Clicks and Sales sheets and asks Claude what to
// do more and less of. The autopilot's brief reads the newest Insights row.
const S = $('⚙️ Settings').first().json;
if ($now.setZone(S.TIMEZONE).weekday !== Number(S.INSIGHTS_WEEKDAY || 1)) return [];
const all = (n) => { try { return $(n).all().map((i) => i.json); } catch (e) { return []; } };
const log = all('Read Log').filter((r) => r.post_id);
const metrics = all('Read Metrics').filter((r) => r.post_id);
const clicks = all('Read Clicks').filter((r) => r.post_id);
const sales = all('Read Sales').filter((r) => r.date || r.utm_content);
const byPost = {};
log.forEach((r) => { byPost[r.post_id] = { post_id: r.post_id, lang: r.lang, format: r.format, pillar: r.pillar, formula: r.formula, cta_tier: r.cta_tier, hook: r.hook, platforms: [] }; });
metrics.forEach((m) => { if (byPost[m.post_id]) byPost[m.post_id].platforms.push(m); });
clicks.forEach((c) => { if (byPost[c.post_id]) byPost[c.post_id].clicks = (byPost[c.post_id].clicks || 0) + 1; });
sales.forEach((s) => { const id = s.utm_content || s.post_id; if (byPost[id]) byPost[id].sales = (byPost[id].sales || 0) + 1; });
const rows = Object.values(byPost).slice(-60);
const prompt = `You are the growth analyst for My Crystal Code (a $8.88 / $18.88 digital self-discovery reading; Instagram + TikTok; English + Arabic).
Below are the last ${rows.length} posts with their metrics, tracked link clicks and attributed sales.
Judge each post against the account's own median (not industry benchmarks). Prioritise: sales > link clicks > profile visits > shares/sends > saves > views.
Say which formulas, pillars, hook styles and languages to do MORE and LESS of next week, and name the 3 best hooks to reuse with a new angle.
If data is too thin to conclude, say so plainly instead of guessing.
Return ONLY JSON: {"summary": string (<=600 chars), "do_more": string (<=400), "do_less": string (<=400), "top_hooks": string (<=400)}

DATA:
${JSON.stringify(rows)}`;
return [{ json: { week: $now.setZone(S.TIMEZONE).toFormat("kkkk-'W'WW"),
  llm_job: { system: 'You are a careful growth analyst. Output only the JSON requested.', prompt, temperature: 0.2, max_tokens: 3000 } } }];
