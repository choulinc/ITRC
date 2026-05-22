const fs = require('fs');
const db = require('./db');

const html = fs.readFileSync('../NSYSU ITRC - 活動紀錄.html', 'utf8');
const items = html.split(/(?:<h[23][^>]*>)/i);

let currentActivity = null;

const mapping = [
  { text: '9/26', title: '迎新社課' },
  { text: '10/3', title: '投資與交易的本質' },
  { text: '10/17', title: '投資技術分析' },
  { text: '10/21', title: '2025永續金融科技創新投資國際論壇' },
  { text: '10/31', title: '加密貨幣：Web3.0與交易策略' },
  { text: '11/7', title: '估值與投資' },
  { text: '11/14', title: '基本面分析的經驗分享' },
  { text: '11/21', title: 'STO證券型代幣發行' },
  { text: '12/5', title: '期末成果發表及媒合會' }
];

async function run() {
  for (let i = 1; i < items.length; i++) {
    const itemHtml = items[i];
    // check if this itemHtml starts with one of our dates
    // but the split removed the h2/h3. The previous h2/h3 was the split delimiter.
    // Let's use a regex that KEEPS the delimiter to find the text.
  }
}
run();
