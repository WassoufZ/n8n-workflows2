// One audit-log row per platform publish (agency/D §3.6, trimmed to what this pipeline knows).
const S = $('⚙️ Settings').first().json;
const plan = $('Publish plan').all();
const brief = $('Build brief').first().json;
let approval = {};
try { approval = $('Approve? (Telegram)').first().json.data || {}; } catch (e) { approval = {}; } // auto-publish path skips approval
const verdict = $('QA verdict').first().json;
const compliance = $('Compliance verdict').first().json.compliance || {};
const model = (n) => { try { const l = $(n).first().json.llm; return `${l.provider}:${l.model}`; } catch (e) { return ''; } };
return $input.all().map((res, i) => {
  const p = plan[i].json;
  const r = res.json || {};
  const ok = !r.error && r.success !== false;
  return { json: {
    post_id: p.post.post_id, queue_id: p.post.queue_id, created_at: $now.setZone(S.TIMEZONE).toISO(), platform: p.platform,
    status: ok ? (p.platform === 'tiktok' && S.TIKTOK_POST_MODE === 'MEDIA_UPLOAD' ? 'tiktok_draft' : 'published') : 'publish_error',
    lang: p.post.lang, format: p.post.format, pillar: p.post.pillar, formula: p.post.formula, cta_tier: p.post.cta_tier,
    hook: p.post.hook, caption: p.post.caption, link: p.link, attempt: brief.attempt,
    request_id: p.request_id,
    llm_model: model('Copywriter · parse'), compliance_model: model('Compliance · parse'), qa_model: model('Vision QA · parse'),
    approval_mode: S.APPROVAL_MODE, prompt_version: S.PROMPT_VERSION,
    blocklist_hits: (p.post.blocklist_hits || []).join(' | '), compliance_json: JSON.stringify(compliance).slice(0, 4000),
    vision_qa: JSON.stringify(verdict.qa || {}).slice(0, 4000), ai_caption_disclosure: 'yes', footer_present: 'yes',
    approved: approval.approved === true ? 'yes' : S.APPROVAL_MODE === 'veto' ? 'veto-window' : 'auto', upload_response: JSON.stringify(r).slice(0, 2000),
  } };
});
