// Model router, step 1: turns the stage's `llm_job` into a request body for the provider chosen
// in ⚙️ Settings (<STAGE>_PROVIDER: "glm" = Z.ai free Flash models, "claude" = Anthropic).
// The copywriter's corrective second draw switches to COPY_FALLBACK_PROVIDER, so a free-tier
// outage or a weak first draft gets a second opinion from the other model.
const STAGE = /*@STAGE@*/'';
const S = $('⚙️ Settings').first().json;
const item = $input.first();
const job = item.json.llm_job;
if (!job || !job.prompt) throw new Error(`${STAGE}: no llm_job.prompt on the input item`);
let provider = String(S[`${STAGE}_PROVIDER`] || 'claude').toLowerCase();
if (STAGE === 'COPY' && Number(job.attempt) >= 2 && S.COPY_FALLBACK_PROVIDER) provider = String(S.COPY_FALLBACK_PROVIDER).toLowerCase();
const images = job.images || [];
const model = provider === 'glm'
  ? (images.length ? S.GLM_VISION_MODEL : S.GLM_TEXT_MODEL)
  : (STAGE === 'COPY' ? S.CLAUDE_COPY_MODEL : S.CLAUDE_CHECK_MODEL);

const glm = {
  model,
  messages: [
    { role: 'system', content: job.system },
    { role: 'user', content: images.length
      ? [...images.map((im) => ({ type: 'image_url', image_url: { url: `data:${im.media_type};base64,${im.data}` } })), { type: 'text', text: job.prompt }]
      : job.prompt },
  ],
  temperature: job.temperature ?? 0.7,
  max_tokens: job.max_tokens || 8000,
  ...(images.length ? {} : { response_format: { type: 'json_object' } }),
};
const claude = {
  model, system: job.system, max_tokens: job.max_tokens || 8000, temperature: job.temperature ?? 0.7,
  messages: [{ role: 'user', content: images.length
    ? [...images.map((im) => ({ type: 'image', source: { type: 'base64', media_type: im.media_type, data: im.data } })), { type: 'text', text: job.prompt }]
    : job.prompt }],
};
return [{ json: { provider, model, stage: STAGE, body: JSON.stringify(provider === 'glm' ? glm : claude) }, binary: item.binary }];
