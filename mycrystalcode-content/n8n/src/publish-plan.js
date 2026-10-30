// Second kill-switch read, immediately before publishing (agency/D §3.5), then one item per
// platform. Each item carries the media and the platform's own caption, title and UTM link.
const S = $('⚙️ Settings').first().json;
const rows = $input.all().map((i) => i.json).filter((r) => r.key);
const c = Object.fromEntries(rows.map((r) => [String(r.key).trim(), String(r.value ?? '').trim()]));
const on = (k) => /^(true|yes|1|on)$/i.test(c[k] || '');
const verdict = $('QA verdict').first();
const post = verdict.json.post;
const brief = $('Build brief').first().json;
if (!rows.length || !on('global_enabled')) {
  return [{ json: { skipped: true, reason: 'Kill switch tripped before publish', post } }];
}
const wanted = String(brief.row.platforms || 'instagram,tiktok').split(/[,\s]+/).filter(Boolean);
const enabled = { instagram: on('ig_enabled'), tiktok: on('tt_enabled') };
const platforms = wanted.filter((p) => enabled[p]);
const media = {};
Object.keys(verdict.binary).filter((k) => k.startsWith('slide_') || k === 'video').forEach((k) => { media[k] = verdict.binary[k]; });
return platforms.map((platform) => ({
  json: {
    platform, post,
    title: platform === 'tiktok' ? Array.from(post.hook).slice(0, 90).join('') : post.caption,
    description: post.caption,
    link: platform === 'tiktok' ? post.link_tiktok : post.link_instagram,
    tiktok_post_mode: S.TIKTOK_POST_MODE,
  },
  binary: media,
}));
