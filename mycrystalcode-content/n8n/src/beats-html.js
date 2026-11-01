// One item per reel beat, rendered 1080x1920 with the reel_cover layout. When a video provider is
// set, the beats are transparent overlays that mcc-reel lays over the AI clip.
const TEMPLATE = /*@TEMPLATE@*/'';
const S = $('⚙️ Settings').first().json;
const { post } = $input.first().json;
const overlay = String(S.VIDEO_PROVIDER || 'none') !== 'none'; // text frames over the AI clip
return post.beats.map((b, i) => {
  const slide = { layout: 'reel_cover', lang: post.lang, index: i + 1, headline: b.text, overlay };
  const html = TEMPLATE.replace('__MCC_DATA__', JSON.stringify(slide).replace(/<\//g, '<\\/'));
  return { json: { n: i + 1, omit_background: overlay ? 'true' : 'false' }, binary: { data: { data: Buffer.from(html).toString('base64'), mimeType: 'text/html', fileName: 'index.html' } } };
});
