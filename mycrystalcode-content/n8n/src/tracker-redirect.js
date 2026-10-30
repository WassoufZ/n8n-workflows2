// Click tracker for story/DM/bio links (agency/A §3): /webhook/go?p=<post_id>&s=<instagram|tiktok>
// &m=<story|dm|bio>&d=<home|lite|full|sample|crystals>&l=<en|ar>. Logs the click, then 302s to
// the site with UTMs, so clicks are countable even before the site keeps UTMs.
const S = $('⚙️ Settings').first().json;
const q = $input.first().json.query || {};
const clean = (v, re, dflt) => (re.test(String(v || '')) ? String(v) : dflt);
const post = clean(q.p, /^[a-z0-9-]{3,60}$/i, 'unknown');
const source = clean(q.s, /^(instagram|tiktok)$/, 'instagram');
const medium = clean(q.m, /^(story|dm|bio|comment)$/, 'bio');
const lang = clean(q.l, /^(en|ar)$/, 'en');
const dest = clean(q.d, /^(home|lite|full|sample|crystals)$/, 'home');
const PATHS = { home: lang === 'ar' ? '/ar' : '/', lite: '/crystal-match', full: '/quiz', sample: lang === 'ar' ? '/ar' : '/#sample', crystals: lang === 'ar' ? '/ar/crystals' : '/crystals' };
const path = PATHS[dest];
const [base, hash] = path.split('#');
const params = new URLSearchParams({ ...(lang === 'ar' && !base.startsWith('/ar') ? { lang: 'ar' } : {}), utm_source: source, utm_medium: medium, utm_campaign: 'mcc_tracker', utm_content: post, utm_term: lang });
const location = `${S.SITE}${base}?${params}${hash ? '#' + hash : ''}`;
return [{ json: { ts: $now.setZone(S.TIMEZONE).toISO(), post_id: post, source, medium, lang, dest, location } }];
