// Kill switch, read at the start of every run (agency/D §3.5). Fail closed: a missing or
// unreadable Control sheet stops the run, and so does global_enabled != TRUE.
// Control sheet columns: key | value. Keys: global_enabled, ig_enabled, tt_enabled,
// en_enabled, ar_enabled, max_posts_day, paused_reason.
const rows = $input.all().map((i) => i.json).filter((r) => r.key);
if (!rows.length) throw new Error('Control sheet is empty or unreadable: refusing to run (fail closed).');
const c = Object.fromEntries(rows.map((r) => [String(r.key).trim(), String(r.value ?? '').trim()]));
const on = (k) => /^(true|yes|1|on)$/i.test(c[k] || '');
const control = {
  global: on('global_enabled'), instagram: on('ig_enabled'), tiktok: on('tt_enabled'),
  en: on('en_enabled'), ar: on('ar_enabled'), max_posts_day: Number(c.max_posts_day || 1), paused_reason: c.paused_reason || '',
};
if (!control.global) return []; // paused: end quietly
if (!control.instagram && !control.tiktok) return [];
return [{ json: { control } }];
