// Gathers the 5 rendered beat frames onto one item (beat_1..beat_5) with their durations, and
// prepares the voiceover request: SSML for Azure (free tier, Gulf Arabic voices) or plain text
// for ElevenLabs.
const S = $('⚙️ Settings').first().json;
const items = $input.all();
const post = $('Format?').first().json.post;
const binary = {};
items.forEach((it, i) => { binary[`beat_${i + 1}`] = it.binary.data; });
const AR = post.lang === 'ar';
const xml = (s) => String(s).replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]));
const voice = AR ? S.AZURE_VOICE_AR : S.AZURE_VOICE_EN;
const locale = voice.split('-').slice(0, 2).join('-');
// A slightly slower, calm read matches the brand voice (agency/C §3: reading pace <= 3 words/s).
const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${locale}"><voice name="${xml(voice)}"><prosody rate="-6%">${xml(post.voiceover)}</prosody></voice></speak>`;
return [{ json: { post, durations: JSON.stringify(post.beats.map((b) => Number(b.seconds) || 3)), ssml }, binary }];
