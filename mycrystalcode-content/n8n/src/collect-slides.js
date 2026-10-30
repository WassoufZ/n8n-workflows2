// Gathers the 8 rendered JPEGs onto one item (slide_1..slide_8) and builds a contact-sheet page
// for the Telegram approval preview.
const items = $input.all();
const binary = {};
const thumbs = [];
for (let i = 0; i < items.length; i++) {
  binary[`slide_${i + 1}`] = items[i].binary.data;
  const buf = await this.helpers.getBinaryDataBuffer(i, 'data');
  thumbs.push(`<img src="data:image/jpeg;base64,${buf.toString('base64')}">`);
}
const sheet = `<!doctype html><html><head><meta charset="utf-8"><style>
body{margin:0;background:#0a0a1a;width:1080px}div{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;padding:8px}
img{width:100%;display:block;border-radius:6px}</style></head><body><div>${thumbs.join('')}</div>
<script>Promise.all([...document.images].map(i=>i.decode())).then(()=>document.body.setAttribute('data-ready','1'))</script></body></html>`;
binary.data = { data: Buffer.from(sheet).toString('base64'), mimeType: 'text/html', fileName: 'index.html' };
return [{ json: { post: $('Format?').first().json.post, slide_count: items.length }, binary }];
