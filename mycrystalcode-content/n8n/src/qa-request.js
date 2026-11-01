// Gate B (agency/C §5): a vision model checks the rendered slides or reel frames against the
// brand-guardian checklist. Builds a provider-neutral llm_job for the model router; the binaries
// are passed through so later nodes can still publish them.
const item = $input.first();
const { post, qa_keys: keys, media_type: mediaType } = item.json;
const CHECKLIST = /*@QA_CHECKLIST@*/'';
const images = [];
for (const key of keys) {
  const buf = await this.helpers.getBinaryDataBuffer(0, key);
  images.push({ media_type: mediaType, data: buf.toString('base64') });
}
const expected = post.format === 'carousel'
  ? post.slides.map((s, i) => `Slide ${i + 1} [${s.layout}]: ${JSON.stringify(s)}`).join('\n')
  : post.beats.map((b, i) => `Frame ${i + 1}: ${b.text}`).join('\n');
const prompt = `You are My Crystal Code's brand guardian. The ${keys.length} images above are the rendered ${post.format === 'carousel' ? 'carousel slides (1080x1350)' : 'reel text frames (1080x1920; transparent areas will show video)'} of one ${post.lang === 'ar' ? 'Arabic' : 'English'} post, in order.

Expected content (asterisks mark the gradient-emphasis words, they are not printed):
${expected}

Evaluate the whole set against each checklist item. Items marked [H] are hard; [S] are soft. Skip items that cannot apply to this format and mark them pass.
${CHECKLIST}

Answer ONLY with JSON, no prose and no code fences:
{"items":[{"id":"B1","pass":true,"note":""}],"verdict":"pass|fail"}
verdict is "fail" if any [H] item fails or two or more [S] items fail.`;
return [{ json: { post, llm_job: { system: 'You are a meticulous visual brand reviewer. Output only the JSON requested.', prompt, images, temperature: 0, max_tokens: 3000 } }, binary: item.binary }];
