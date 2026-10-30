// Puts the beat frames, the voiceover and (premium) the AI clip URL on one item for mcc-reel.
const beats = $('Collect beats').first();
let voice;
try { voice = $('Voiceover (ElevenLabs)').first().binary.data; } catch (e) { voice = undefined; }
if (!voice) throw new Error('Voiceover is missing: refusing to assemble a silent reel.');
let clipUrl = '';
try { clipUrl = $('fal: result').first().json.video?.url || ''; } catch (e) { clipUrl = ''; }
return [{ json: { ...beats.json, clip_url: clipUrl }, binary: { ...beats.binary, voice } }];
