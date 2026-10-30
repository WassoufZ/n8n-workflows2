// Re-attaches the beat frames (for visual QA) next to the finished video.
const inputs = $('Assemble reel inputs').first();
const binary = { video: $input.first().binary.data };
Object.keys(inputs.binary).filter((k) => k.startsWith('beat_')).forEach((k) => { binary[k] = inputs.binary[k]; });
const keys = Object.keys(binary).filter((k) => k.startsWith('beat_')).sort();
return [{ json: { post: inputs.json.post, clip_url: inputs.json.clip_url, qa_keys: keys, media_type: 'image/png' }, binary }];
