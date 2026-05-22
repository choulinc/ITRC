const fs = require('fs');
const html = fs.readFileSync('NSYSU ITRC - 活動紀錄.html', 'utf8');

const items = html.split(/<h[23][^>]*>/i);
for (let i = 1; i < items.length; i++) {
  const itemHtml = items[i];
  const titleMatch = itemHtml.match(/^(.*?)<\/h[23]>/);
  if (!titleMatch) continue;
  const rawTitle = titleMatch[1].replace(/<[^>]+>/g, '').trim();
  
  const urls = itemHtml.match(/https:\/\/lh3\.googleusercontent\.com\/sitesv\/[a-zA-Z0-9_\-]+/g) || [];
  const uniqueUrls = Array.from(new Set(urls));
  
  console.log('---', rawTitle, '---');
  console.log(`IMAGES (${uniqueUrls.length}):`);
  // console.log(uniqueUrls);
}
