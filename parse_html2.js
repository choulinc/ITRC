const fs = require('fs');
const html = fs.readFileSync('NSYSU ITRC - 活動紀錄.html', 'utf8');

const items = html.split(/<h[23][^>]*>/i);
for (let i = 1; i < items.length; i++) {
  const itemHtml = items[i];
  const titleMatch = itemHtml.match(/^(.*?)<\/h[23]>/);
  if (!titleMatch) continue;
  const rawTitle = titleMatch[1].replace(/<[^>]+>/g, '').trim();
  
  // extract links
  const links = [];
  const linkRegex = /<a [^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gi;
  let m;
  while ((m = linkRegex.exec(itemHtml)) !== null) {
      links.push({ url: m[1], text: m[2].replace(/<[^>]+>/g, '').trim() });
  }

  // clean text
  const text = itemHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  
  console.log('---', rawTitle, '---');
  console.log('LINKS:');
  links.forEach(l => console.log('  ', l.text, l.url));
}
