// mcc-reel: a tiny FFmpeg sidecar that assembles 1080x1920 reels for the n8n workflow.
//
// POST /reel  (multipart/form-data)
//   frames      1..N image files (PNG/JPEG, 1080x1920), in order. Rendered by Gotenberg from
//               templates/mcc-slide.html, so Arabic shaping matches the carousels exactly.
//   durations   JSON array of seconds per frame, e.g. [2.5, 3, 3, 4]. Default 3s each.
//   audio       optional voiceover (mp3/wav). The last frame is held until the audio ends.
//   clip        optional AI b-roll video (mp4). When present, frames are rendered with a
//               transparent background (`overlay: true` in the slide JSON) and laid over it.
//   clip_url    alternative to `clip`: an https URL to fetch it from (e.g. a fal.ai result).
// Response: video/mp4 (H.264 + AAC, 30 fps, faststart).
//
// GET /health -> 200 "ok"
'use strict';
const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');
const Busboy = require('busboy');

const PORT = Number(process.env.PORT || 3900);
const MAX_BYTES = 200 * 1024 * 1024;
const FPS = 30;
const FADE = 0.35;

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args);
    let out = '', err = '';
    p.stdout.on('data', (d) => { out += d; });
    p.stderr.on('data', (d) => { err += d; });
    p.on('close', (code) => (code === 0 ? resolve(out) : reject(new Error(`${cmd} exited ${code}: ${err.slice(-2000)}`))));
  });
}

async function mediaDuration(file) {
  const out = await run('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', file]);
  return parseFloat(out) || 0;
}

function parseUpload(req, dir) {
  return new Promise((resolve, reject) => {
    const fields = {}, frames = [], files = {}, writes = [];
    let total = 0;
    const bb = Busboy({ headers: req.headers, limits: { fileSize: MAX_BYTES } });
    bb.on('field', (name, val) => { fields[name] = val; });
    bb.on('file', (name, stream, info) => {
      const ext = path.extname(info.filename || '') || (name === 'audio' ? '.mp3' : name === 'clip' ? '.mp4' : '.png');
      const target = path.join(dir, `${name}-${frames.length}-${Date.now()}${ext}`);
      if (name === 'frames' || name === 'frames[]') frames.push(target); else files[name] = target;
      stream.on('data', (d) => { total += d.length; if (total > MAX_BYTES) req.destroy(new Error('upload too large')); });
      writes.push(new Promise((ok, ko) => stream.pipe(fs.createWriteStream(target)).on('finish', ok).on('error', ko)));
    });
    bb.on('error', reject);
    bb.on('close', () => Promise.all(writes).then(() => resolve({ fields, frames, files }), reject));
    req.pipe(bb);
  });
}

async function download(url, target) {
  if (!/^https:\/\//.test(url)) throw Object.assign(new Error('clip_url must be https'), { status: 400 });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`clip download failed: HTTP ${res.status}`);
  fs.writeFileSync(target, Buffer.from(await res.arrayBuffer()));
}

async function buildReel({ fields, frames, files }, dir) {
  if (!frames.length) throw Object.assign(new Error('at least one frame is required'), { status: 400 });
  if (!files.clip && fields.clip_url) {
    files.clip = path.join(dir, 'clip-url.mp4');
    await download(fields.clip_url, files.clip);
  }
  let durations = [];
  try { durations = JSON.parse(fields.durations || '[]'); } catch { throw Object.assign(new Error('durations must be a JSON array'), { status: 400 }); }
  durations = frames.map((_, i) => Math.max(1, Number(durations[i]) || 3));

  // Hold the last frame until the voiceover finishes.
  if (files.audio) {
    const audioLen = await mediaDuration(files.audio);
    const sum = durations.reduce((a, b) => a + b, 0);
    if (audioLen > sum) durations[durations.length - 1] += audioLen - sum + 0.4;
  }
  const total = durations.reduce((a, b) => a + b, 0);
  const overlayMode = Boolean(files.clip);

  const args = ['-y'];
  // Input 0: the background (AI clip, looped and cropped, or the brand scene colour).
  if (overlayMode) args.push('-stream_loop', '-1', '-i', files.clip);
  else args.push('-f', 'lavfi', '-i', `color=c=0x0a0a1a:s=1080x1920:r=${FPS}:d=${total.toFixed(2)}`);
  frames.forEach((f, i) => args.push('-framerate', String(FPS), '-loop', '1', '-t', durations[i].toFixed(2), '-i', f));
  if (files.audio) args.push('-i', files.audio);

  const parts = [];
  parts.push(overlayMode
    ? `[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=${FPS},trim=0:${total.toFixed(2)},setpts=PTS-STARTPTS[bg]`
    : '[0:v]null[bg]');
  let start = 0;
  frames.forEach((_, i) => {
    const d = durations[i];
    // Opaque slides get a slow push-in (Ken Burns); transparent overlays stay still over moving video.
    const motion = overlayMode ? '' : `scale=1188:2112,zoompan=z='min(1.08,1+0.0008*on)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1080x1920:fps=${FPS},`;
    parts.push(`[${i + 1}:v]${motion}format=rgba,fade=t=in:st=0:d=${FADE}:alpha=1,fade=t=out:st=${(d - FADE).toFixed(2)}:d=${FADE}:alpha=1,setpts=PTS-STARTPTS+${start.toFixed(2)}/TB[f${i}]`);
    start += d;
  });
  let prev = 'bg';
  frames.forEach((_, i) => { parts.push(`[${prev}][f${i}]overlay=eof_action=pass:format=auto[v${i}]`); prev = `v${i}`; });
  parts.push(`[${prev}]format=yuv420p[vout]`);

  const out = path.join(dir, 'reel.mp4');
  args.push('-filter_complex', parts.join(';'), '-map', '[vout]');
  if (files.audio) args.push('-map', `${frames.length + 1}:a`, '-c:a', 'aac', '-b:a', '160k');
  args.push('-t', total.toFixed(2), '-r', String(FPS), '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out);
  await run('ffmpeg', args);
  return out;
}

http.createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/health') { res.end('ok'); return; }
  if (req.method !== 'POST' || req.url !== '/reel') { res.writeHead(404).end('not found'); return; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mcc-reel-'));
  try {
    const file = await buildReel(await parseUpload(req, dir), dir);
    res.writeHead(200, { 'Content-Type': 'video/mp4', 'Content-Length': fs.statSync(file).size });
    fs.createReadStream(file).pipe(res).on('close', () => fs.rmSync(dir, { recursive: true, force: true }));
  } catch (e) {
    fs.rmSync(dir, { recursive: true, force: true });
    res.writeHead(e.status || 500, { 'Content-Type': 'application/json' }).end(JSON.stringify({ error: e.message }));
  }
}).listen(PORT, () => console.log(`mcc-reel listening on ${PORT}`));
