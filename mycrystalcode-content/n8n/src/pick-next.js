// Picks today's assignment: the first Queue row that is due (date <= today) and still planned,
// in a language the Control sheet allows. If nothing is queued, the strategist gets a free
// assignment that alternates language and format against the last post in the Log.
// Also enforces max_posts_day from the Log (agency/D §3.4).
const S = $('⚙️ Settings').first().json;
const control = $('Kill switch gate').first().json.control;
const today = $now.setZone(S.TIMEZONE).toFormat('yyyy-MM-dd');
const log = $('Read Log').all().map((i) => i.json).filter((r) => r.post_id);
const todayCount = log.filter((r) => String(r.created_at || '').startsWith(today) && r.status !== 'rejected').length;
if (todayCount >= control.max_posts_day) return [];

const langOk = (l) => (l === 'ar' ? control.ar : control.en);
const queue = $('Read Queue').all().map((i) => i.json).filter((r) => r.id);
const due = queue.find((r) => (!r.status || r.status === 'planned') && (!r.date || String(r.date) <= today) && langOk(r.lang || 'en'));

let row;
if (due) {
  row = { id: String(due.id), date: String(due.date || today), lang: due.lang || 'en', format: due.format || '', pillar: due.pillar || '',
    formula: due.formula || '', angle: due.angle || '', cta_tier: due.cta_tier || '', platforms: due.platforms || '', notes: due.notes || '' };
} else {
  const last = log[log.length - 1] || {};
  const lang = last.lang === 'en' && control.ar ? 'ar' : control.en ? 'en' : 'ar';
  row = { id: `auto-${today}-${todayCount + 1}`, date: today, lang, format: last.format === 'carousel' ? 'reel' : 'carousel',
    pillar: '', formula: '', angle: '', cta_tier: '', platforms: '', notes: 'Auto assignment: nothing was queued.' };
}
return [{ json: { row, attempt: 1, feedback: '', today_count: todayCount } }];
