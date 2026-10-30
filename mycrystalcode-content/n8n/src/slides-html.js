// One item per slide: the slide JSON injected into the brand template as index.html, ready for
// Gotenberg's /forms/chromium/screenshot/html route.
const TEMPLATE = /*@TEMPLATE@*/'';
const { post } = $input.first().json;
return post.slides.map((slide, i) => {
  const html = TEMPLATE.replace('__MCC_DATA__', JSON.stringify(slide).replace(/<\//g, '<\\/'));
  return { json: { n: i + 1, post_id: post.post_id }, binary: { data: { data: Buffer.from(html).toString('base64'), mimeType: 'text/html', fileName: 'index.html' } } };
});
