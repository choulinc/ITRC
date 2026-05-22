const fs = require('fs');
const db = require('./db');

const html = fs.readFileSync('../NSYSU ITRC - 活動紀錄.html', 'utf8');
const items = html.split(/(?=<h[23][^>]*>)/i); // keep the delimiter

const mapping = [
  { match: '9/26', title: '迎新社課' },
  { match: '10/3', title: '投資與交易的本質' },
  { match: '10/17', title: '投資技術分析' },
  { match: '10/21', title: '2025永續金融科技創新投資國際論壇' },
  { match: '10/31', title: '加密貨幣：Web3.0與交易策略' },
  { match: '11/7', title: '估值與投資' },
  { match: '11/14', title: '基本面分析的經驗分享' },
  { match: '11/21', title: 'STO證券型代幣發行' },
  { match: '12/5', title: '期末成果發表及媒合會' }
];

async function run() {
  // Wait for db init
  await new Promise(r => setTimeout(r, 1500));

  let currentTitle = null;
  let currentImages = [];

  for (let i = 0; i < items.length; i++) {
    const itemHtml = items[i];
    
    // Check if this item starts a new activity
    const headingMatch = itemHtml.match(/^<h[23][^>]*>(.*?)<\/h[23]>/i);
    if (headingMatch) {
      const text = headingMatch[1].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
      
      const foundMapping = mapping.find(m => text.includes(m.match));
      if (foundMapping) {
        // We hit a new activity. Save the previous one if it exists.
        if (currentTitle && currentImages.length > 0) {
          console.log(`Saving ${currentImages.length} images for ${currentTitle}`);
          await updateActivityImages(currentTitle, currentImages);
        }
        
        currentTitle = foundMapping.title;
        currentImages = [];
      }
    }
    
    if (currentTitle) {
      const urls = itemHtml.match(/https:\/\/lh3\.googleusercontent\.com\/sitesv\/[a-zA-Z0-9_\-]+/g) || [];
      // append =w1280 to get high-res images
      const mapped = urls.map(url => url + '=w1280');
      currentImages.push(...mapped);
    }
  }

  // Save the last one
  if (currentTitle && currentImages.length > 0) {
    console.log(`Saving ${currentImages.length} images for ${currentTitle}`);
    await updateActivityImages(currentTitle, currentImages);
  }

  console.log('Done!');
  process.exit(0);
}

async function updateActivityImages(title, images) {
  // remove duplicates
  const uniqueUrls = Array.from(new Set(images));
  
  // fetch existing
  const existing = await db.execute({
    sql: `SELECT * FROM activities WHERE title LIKE ? AND semester = '114-1' AND type = 'record'`,
    args: [`%${title}%`]
  });
  
  if (existing.rows.length > 0) {
    const id = existing.rows[0].id;
    await db.execute({
      sql: `UPDATE activities SET image_url = ? WHERE id = ?`,
      args: [JSON.stringify(uniqueUrls), id]
    });
  } else {
    console.log('Not found in DB:', title);
  }
}

run();
