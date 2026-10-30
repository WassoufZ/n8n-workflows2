// Gathers the 5 rendered beat frames onto one item (beat_1..beat_5) with their durations.
const items = $input.all();
const post = $('Format?').first().json.post;
const binary = {};
items.forEach((it, i) => { binary[`beat_${i + 1}`] = it.binary.data; });
return [{ json: { post, durations: JSON.stringify(post.beats.map((b) => Number(b.seconds) || 3)) }, binary }];
