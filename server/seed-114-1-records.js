const db = require('./db');

const records = [
  {
    type: 'record',
    semester: '114-1',
    title: '迎新社課',
    date: '2025年09月26日',
    speaker: '',
    description: '',
    video_url: '',
    image_url: '[]'
  },
  {
    type: 'record',
    semester: '114-1',
    title: '投資與交易的本質',
    date: '2025年10月03日',
    speaker: '張大恒',
    description: '[簡報](https://drive.google.com/file/d/1l3f0ReBwmTv-Caov7qlaQinoZksbFmKA/view?usp=sharing)\n\n學歷： 國立中山大學金融創新產業碩士\n經歷： 高雄銀行 OBU 國際聯貸實習生、中山大學管理顧問及產業研究社社長',
    video_url: 'https://youtu.be/scXY1pAv6vs?si=OTfH4s6z51kQrLx-',
    image_url: '[]'
  },
  {
    type: 'record',
    semester: '114-1',
    title: '投資技術分析',
    date: '2025年10月17日',
    speaker: '王昭文 教授',
    description: '[簡報](https://docs.google.com/document/d/1_da3NGCjWYUgw41wbrIksx69B0aeTtqwPU4bkD3r9zA/edit?tab=t.0)\n\n[影片](https://youtu.be/7R_mrpCPikY)\n[影片2](https://youtu.be/NFafzTNCltU)\n[影片3](https://youtu.be/oIdZBH7uuOs)\n[影片4](https://youtu.be/Drv9Yx0RsFU)\n[影片5](https://youtu.be/-MN2FDLKoDQ)\n[影片6](https://youtu.be/468_1tTByHc)\n[影片7](https://youtu.be/ZJNNokg6p8U)\n[影片8](https://youtu.be/AOwc1MN_s4E)\n[影片9](https://youtu.be/U7rzCCCTWMs)\n\n國立中山大學國際金融研究學院\n國際資產管理研究所所長\n學歷：國立政治大學金融學系博士\n經歷：\n• 華南金控股份有限公司董事\n• 國立中山大學亞太區工商管理碩士(APMBA)主任\n• 國立中山大學財務管理學系系主任',
    video_url: '',
    image_url: '[]'
  },
  {
    type: 'record',
    semester: '114-1',
    title: '2025永續金融科技創新投資國際論壇',
    date: '2025年10月21日',
    speaker: '李捷副教授, 簡憶伶襄理, 邱冠鈞講師',
    description: '[企劃書](https://docs.google.com/document/d/1bsoNHgbJMR2mxwtg_kbBrPBlZ9_MJzZ9/edit)\n\n李捷副教授 - 國立中山大學資訊管理學系\n簡憶伶襄理 - 國泰綜合證券數位資產部\n邱冠鈞講師 - 國泰綜合證券數位資產部',
    video_url: '',
    image_url: '[]'
  },
  {
    type: 'record',
    semester: '114-1',
    title: '加密貨幣：Web3.0與交易策略',
    date: '2025年10月31日',
    speaker: '陳容俊',
    description: '經歷：\n• OURBIT商務發展業務',
    video_url: '',
    image_url: '[]'
  },
  {
    type: 'record',
    semester: '114-1',
    title: '估值與投資',
    date: '2025年11月07日',
    speaker: 'FREDDY CHEN',
    description: '[簡報](https://drive.google.com/file/d/1VqPkSBwiSKcZFReFi0UBuaJdVTnJVEnV/view?usp=sharing)\n\n[影片1](https://www.youtube.com/watch?v=aSh3xviOrOw)\n[影片2](https://www.youtube.com/watch?v=q6zXaQkLJbU)\n\n經歷：\n• 前國內券商軟體產業分析師\n• 政大企研所畢業',
    video_url: '',
    image_url: '[]'
  },
  {
    type: 'record',
    semester: '114-1',
    title: '基本面分析的經驗分享',
    date: '2025年11月14日',
    speaker: '余鎮文 副教授',
    description: '[簡報](https://drive.google.com/file/d/1r5GT0CtnH_I-j0JNdkeM1chV8cYlE1TV/view?usp=sharing)\n\n長庚大學醫務管理學系\n經歷：\n• 前 JPMorgan Asset Management Executive Director (執行董事)',
    video_url: '',
    image_url: '[]'
  },
  {
    type: 'record',
    semester: '114-1',
    title: 'STO證券型代幣發行',
    date: '2025年11月21日',
    speaker: '簡憶伶 襄理',
    description: '[YouTube 影片 2](https://youtu.be/iv773GXhCwA)\n\n國泰綜合證券數位資產部\n經歷：\n• 國泰綜合證券數位資產部襄理',
    video_url: 'https://youtu.be/r7RJ0yn7Wls',
    image_url: '[]'
  },
  {
    type: 'record',
    semester: '114-1',
    title: '期末成果發表及媒合會',
    date: '2025年12月05日',
    speaker: '',
    description: '[影片2](https://youtu.be/_ilRSNrIbpU)\n[影片3](https://youtu.be/ABMgPnrqbCs)\n[影片4](https://youtu.be/SYXBqODVtWA)\n[影片5](https://youtu.be/gp-iZAUMxBg)\n[影片6](https://youtu.be/jjhISyFXMdw)',
    video_url: 'https://youtu.be/DR1KMieMmzc',
    image_url: '[]'
  }
];

async function seed() {
  console.log('Seeding 114-1 activities...');
  for (const r of records) {
    // try to find by title and semester
    const existing = await db.execute({
      sql: `SELECT * FROM activities WHERE title LIKE ? AND semester = ? AND type = ?`,
      args: [`%${r.title}%`, r.semester, r.type]
    });
    if (existing.rows.length > 0) {
      console.log(`Updating existing record: ${r.title}`);
      const id = existing.rows[0].id;
      // Preserve existing image_url if present and not empty
      const currImg = existing.rows[0].image_url;
      const imgToUse = (currImg && currImg !== '[]' && currImg !== '') ? currImg : r.image_url;

      await db.execute({
        sql: `UPDATE activities SET date = ?, speaker = ?, description = ?, video_url = ?, image_url = ? WHERE id = ?`,
        args: [r.date, r.speaker, r.description, r.video_url, imgToUse, id]
      });
    } else {
      console.log(`Inserting new record: ${r.title}`);
      await db.execute({
        sql: `INSERT INTO activities (type, semester, title, date, speaker, description, video_url, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [r.type, r.semester, r.title, r.date, r.speaker, r.description, r.video_url, r.image_url]
      });
    }
  }
  console.log('Done!');
  process.exit(0);
}

seed();
