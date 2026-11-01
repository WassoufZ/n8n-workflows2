// Veto window (APPROVAL_MODE = "veto"): the post publishes automatically after VETO_MINUTES
// unless someone taps the private stop link. The nonce makes the link unguessable; the link
// tracker workflow records the tap in the Vetoes tab, and Publish plan checks it.
const S = $('⚙️ Settings').first().json;
const post = $('QA verdict').first().json.post;
const nonce = Array.from({ length: 24 }, () => 'abcdefghijkmnpqrstuvwxyz23456789'[Math.floor(Math.random() * 32)]).join('');
const minutes = Number(S.VETO_MINUTES || 180);
const at = $now.setZone(S.TIMEZONE).plus({ minutes }).toFormat('HH:mm');
const link = `${S.N8N_PUBLIC_URL.replace(/\/$/, '')}/webhook/veto?p=${encodeURIComponent(post.post_id)}&n=${nonce}`;
return [{ json: { post_id: post.post_id, nonce, minutes,
  message: `⏳ ${post.post_id} publishes automatically at ${at} (${S.TIMEZONE}).\nTo stop it, open: ${link}` } }];
