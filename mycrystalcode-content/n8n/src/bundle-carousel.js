// Re-attaches the slides (HTTP nodes only return their own response) and adds the contact sheet.
const collected = $('Collect slides').first();
const binary = { ...collected.binary, sheet: $input.first().binary.data };
delete binary.data;
const keys = Object.keys(binary).filter((k) => k.startsWith('slide_')).sort((a, b) => Number(a.split('_')[1]) - Number(b.split('_')[1]));
return [{ json: { post: collected.json.post, qa_keys: keys, media_type: 'image/jpeg' }, binary }];
