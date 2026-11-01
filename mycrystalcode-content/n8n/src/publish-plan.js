// Second kill-switch read, immediately before publishing (agency/D §3.5), plus the veto check,
// then one item per platform carrying the media and the platform's own Upload-Post fields
// (field names per docs.upload-post.com/api/upload-photo and /upload-video, Nov 2026).
const S = $('⚙️ Settings').first().json;
const rows = $('Re-read Control').all().map((i) => i.json).filter((r) => r.key);
const c = Object.fromEntries(rows.map((r) => [String(r.key).trim(), String(r.value ?? '').trim()]));
const on = (k) => /^(true|yes|1|on)$/i.test(c[k] || '');
const verdict = $('QA verdict').first();
const post = verdict.json.post;
const brief = $('Build brief').first().json;
if (!rows.length || !on('global_enabled')) {
  return [{ json: { skipped: true, reason: 'Kill switch tripped before publish', post } }];
}
let veto = null;
try { veto = $('Veto window').first().json; } catch (e) { veto = null; } // only in veto mode
if (veto) {
  let vetoes = [];
  try { vetoes = $('Read Vetoes').all().map((i) => i.json); } catch (e) { vetoes = []; }
  if (vetoes.some((v) => v.post_id === post.post_id && v.nonce === veto.nonce)) {
    return [{ json: { skipped: true, reason: 'Stopped with the veto link', post } }];
  }
}
const wanted = String(brief.row.platforms || 'instagram,tiktok').split(/[,\s]+/).filter(Boolean);
const enabled = { instagram: on('ig_enabled'), tiktok: on('tt_enabled') };
const media = {};
Object.keys(verdict.binary).filter((k) => k.startsWith('slide_') || k === 'video').forEach((k) => { media[k] = verdict.binary[k]; });
return wanted.filter((p) => enabled[p]).map((platform) => ({
  json: {
    platform, post,
    request_id: `${post.post_id}-${platform}`,
    // Instagram: title is the caption. TikTok photos: tiktok_title <= 90 + tiktok_description;
    // TikTok videos: tiktok_title is the caption (up to 2,200).
    title: post.caption,
    tiktok_title: post.format === 'carousel' ? Array.from(post.hook).slice(0, 90).join('') : post.caption,
    tiktok_description: post.caption,
    alt_text: post.alt_text,
    tiktok_post_mode: S.TIKTOK_POST_MODE,
    link: platform === 'tiktok' ? post.link_tiktok : post.link_instagram,
  },
  binary: media,
}));
