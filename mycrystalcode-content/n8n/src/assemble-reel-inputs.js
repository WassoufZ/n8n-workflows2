// Puts the beat frames, the voiceover and (premium) the AI clip URL on one item for mcc-reel.
// The clip URL arrives on the input item from whichever video provider ran: CogVideoX
// (video_result[0].url when task_status is SUCCESS) or fal.ai (video.url). No clip = standard reel.
const beats = $('Collect beats').first();
let voice;
for (const node of ['Voiceover (Azure)', 'Voiceover (ElevenLabs)']) {
  try { const b = $(node).first().binary; if (b && b.data) { voice = b.data; break; } } catch (e) { /* that provider did not run */ }
}
if (!voice) throw new Error('Voiceover is missing: refusing to assemble a silent reel.');
const r = $input.first().json || {};
let clipUrl = '';
if (r.task_status === 'SUCCESS' && Array.isArray(r.video_result)) clipUrl = r.video_result[0]?.url || '';
else if (r.video && r.video.url) clipUrl = r.video.url;
return [{ json: { ...beats.json, clip_url: clipUrl }, binary: { ...beats.binary, voice } }];
