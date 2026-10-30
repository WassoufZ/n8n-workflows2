#!/usr/bin/env node
// Renders a carousel JSON file through templates/mcc-slide.html to PNGs, the same way the
// n8n workflow's renderer does: inject the slide JSON, wait for body[data-ready], screenshot.
//   node tools/render-preview.js examples/deck-same-behavior.en.json out/
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

async function main() {
  const [deckPath, outDir = 'out'] = process.argv.slice(2);
  if (!deckPath) throw new Error('usage: render-preview.js <deck.json> [outDir]');
  const template = fs.readFileSync(path.join(__dirname, '..', 'templates', 'mcc-slide.html'), 'utf8');
  const deck = JSON.parse(fs.readFileSync(deckPath, 'utf8'));
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
  for (const [i, slide] of deck.slides.entries()) {
    const data = { lang: deck.lang, total: deck.slides.length, index: i + 1, ...slide };
    // Offline previews: MCC_SAMPLE_DIR points at a local copy of the site's /sample pages.
    if (process.env.MCC_SAMPLE_DIR && data.image && data.image.includes('/sample/')) {
      const local = path.join(process.env.MCC_SAMPLE_DIR, path.basename(data.image));
      data.image = 'data:image/webp;base64,' + fs.readFileSync(local).toString('base64');
    }
    const html = template.replace('__MCC_DATA__', JSON.stringify(data).replace(/<\//g, '<\\/'));
    const height = slide.layout === 'reel_cover' ? 1920 : 1350;
    await page.setViewportSize({ width: 1080, height });
    await page.setContent(html, { waitUntil: 'networkidle' });
    await page.waitForSelector('body[data-ready="1"]', { timeout: 30000 });
    const file = path.join(outDir, `${deck.id}-${String(i + 1).padStart(2, '0')}-${slide.layout}.png`);
    // Overlay beats keep their alpha channel, matching Gotenberg's omitBackground=true.
    await page.screenshot({ path: file, clip: { x: 0, y: 0, width: 1080, height }, omitBackground: Boolean(slide.overlay) });
    console.log(file);
  }
  await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
