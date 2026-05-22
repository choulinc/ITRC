const fs = require('fs');
const html = fs.readFileSync('NSYSU ITRC - 活動紀錄.html', 'utf8');

const items = html.split(/<h[23][^>]*>/i);
for (let i = 1; i < items.length; i++) {
  const itemHtml = items[i];
  const titleMatch = itemHtml.match(/^(.*?)<\/h[23]>/);
  if (!titleMatch) continue;
  const rawTitle = titleMatch[1].replace(/<[^>]+>/g, '').trim();
  
  // extract images
  const images = [];
  const imgRegex = /<img [^>]*src="([^"]+)"[^>]*>/gi;
  let m;
  while ((m = imgRegex.exec(itemHtml)) !== null) {
      if (!m[1].includes('youtube.com/vi/') && !m[1].includes('youtube.com/img/') && !m[1].includes('favicon.ico')) {
          images.push(m[1]);
      }
  }
  
  console.log('---', rawTitle, '---');
  console.log(`IMAGES (${images.length}):`, images);
}
