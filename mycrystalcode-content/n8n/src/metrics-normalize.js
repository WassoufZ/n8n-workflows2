// Normalises whatever the analytics endpoint returns into one Metrics row per post+platform.
// Unknown shapes are kept raw, so nothing is silently lost while the endpoint is being wired.
const S = $('⚙️ Settings').first().json;
const posts = $('Posts to measure').all();
const pick = (o, keys) => { for (const k of keys) { const v = k.split('.').reduce((a, p) => (a == null ? a : a[p]), o); if (v != null && v !== '') return Number(v) || 0; } return ''; };
return $input.all().map((res, i) => {
  const p = posts[i].json; const r = res.json || {};
  return { json: {
    key: `${p.post_id}|${p.platform}`, post_id: p.post_id, platform: p.platform, measured_at: $now.setZone(S.TIMEZONE).toISO(), age_days: p.age_days,
    views: pick(r, ['views', 'video_views', 'plays', 'metrics.views']), reach: pick(r, ['reach', 'metrics.reach']),
    likes: pick(r, ['likes', 'like_count', 'metrics.likes']), comments: pick(r, ['comments', 'comments_count', 'metrics.comments']),
    shares: pick(r, ['shares', 'share_count', 'metrics.shares']), saves: pick(r, ['saved', 'saves', 'metrics.saved']),
    profile_visits: pick(r, ['profile_visits', 'metrics.profile_visits']), follows: pick(r, ['follows', 'metrics.follows']),
    raw: JSON.stringify(r).slice(0, 1500),
  } };
});
