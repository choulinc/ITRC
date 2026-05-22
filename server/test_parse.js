const fs = require('fs');
const html = fs.readFileSync('../NSYSU ITRC - 活動紀錄.html', 'utf8');
const items = html.split(/(?=<h[23][^>]*>)/i);
for(let i = 0; i < 20 && i < items.length; i++) {
  const m = items[i].match(/^<h[23][^>]*>(.*?)<\/h[23]>/i);
  if(m) console.log(m[1].replace(/<[^>]+>/g, '').trim());
}
