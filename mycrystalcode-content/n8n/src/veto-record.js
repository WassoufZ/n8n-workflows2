// Records a tap on the private "stop this post" link: /webhook/veto?p=<post_id>&n=<nonce>.
// Publish plan only honours a veto whose nonce matches the one it sent, so the link can't be guessed.
const S = $('⚙️ Settings').first().json;
const q = $input.first().json.query || {};
const post = /^[a-z0-9-]{3,60}$/i.test(String(q.p || '')) ? String(q.p) : '';
const nonce = /^[a-z0-9]{24}$/.test(String(q.n || '')) ? String(q.n) : '';
const ok = Boolean(post && nonce);
return [{ json: { ok, ts: $now.setZone(S.TIMEZONE).toISO(), post_id: post, nonce,
  html: ok ? `<h2>Stopped ✋</h2><p>${post} will not be published.</p>` : '<h2>Invalid link</h2>' } }];
