import { motion } from 'framer-motion';

const onlineResources = [
    {
        name: '公開資訊觀測站',
        nameEn: 'Market Observation Post System',
        url: 'https://mops.twse.com.tw/mops/#/web/home',
        description: '臺灣證券市場公開資訊查詢系統，提供上市櫃公司財務報表、重大訊息及股東會資訊。',
        icon: '📊',
        color: '#4d7ea8'
    },
    {
        name: 'FRED',
        nameEn: 'Federal Reserve Economic Data',
        url: 'https://fred.stlouisfed.org/',
        description: '美國聯邦儲備銀行聖路易分行經濟數據庫，提供超過 80 萬筆經濟時間序列資料。',
        icon: '📈',
        color: '#2e7d32'
    },
    {
        name: 'IMF eLibrary',
        nameEn: 'International Monetary Fund',
        url: 'https://www.elibrary.imf.org/',
        description: '國際貨幣基金組織電子圖書館，涵蓋全球經濟研究、政策分析與統計數據。',
        icon: '🌐',
        color: '#1565c0'
    },
    {
        name: 'CFA Institute',
        nameEn: 'Chartered Financial Analyst',
        url: 'https://www.cfainstitute.org/',
        description: '全球金融分析師認證機構，提供投資管理與財務分析的專業學習資源。',
        icon: '🎓',
        color: '#6a1b9a'
    },
    {
        name: 'JY 價值筆記',
        nameEn: 'JY Value Notes',
        url: 'https://jyvalue.com/',
        description: '台灣金融證照考古題下載與學習筆記平台，適合準備各類金融證照考試。',
        icon: '📝',
        color: '#e65100'
    }
];

const offlineResources = [
    {
        title: '原則',
        titleEn: 'Principles',
        author: 'Ray Dalio（瑞・達利歐）',
        cover: 'https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/078/07/0010780073.jpg&v=5a0e1438k&w=348&h=348',
        description: '全球最大避險基金橋水基金創辦人的生活與工作原則，闡述系統化決策的思維框架。'
    },
    {
        title: '持續買進',
        titleEn: 'Just Keep Buying',
        author: 'Nick Maggiulli（尼克・馬朱利）',
        cover: 'https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/096/47/0010964766.jpg&v=6414be62k&w=348&h=348',
        description: '以數據驅動的方法證明，持續投入市場是累積財富最有效的策略。'
    },
    {
        title: '投資金律',
        titleEn: 'The Four Pillars of Investing',
        author: 'William J. Bernstein（威廉・乔恩斯坦）',
        cover: 'https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/091/78/0010917894.jpg&v=625d38d1k&w=348&h=348',
        description: '從投資理論、歷史、心理與產業四大支柱，建構完整的投資知識體系。'
    },
    {
        title: '漫步華爾街',
        titleEn: 'A Random Walk Down Wall Street',
        author: 'Burton G. Malkiel（乔頓・墨基爾）',
        cover: 'https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/092/62/0010926260.jpg&v=62c05ccek&w=348&h=348',
        description: '投資經典之作，以隨機漫步理論闡述市場效率與指數投資的優勢。'
    },
    {
        title: '金錢心理學',
        titleEn: 'Dollars and Sense',
        author: 'Dan Ariely & Jeff Kreisler',
        cover: 'https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/078/97/0010789740.jpg&v=5a93a8bek&w=348&h=348',
        description: '行為經濟學大師揭示人們在金錢決策中的非理性行為與心理偏誤。'
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function ResourcesPage() {
    return (
        <>
            {/* Hero Banner */}
            <section className="resources-hero">
                <div className="resources-hero-overlay" />
                <motion.div
                    className="resources-hero-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1>學習資源</h1>
                    <p>精選線上與線下資源，助你建構投資知識體系</p>
                </motion.div>
            </section>

            {/* Online Resources */}
            <section className="resources-section">
                <motion.div
                    className="resources-section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="resources-section-badge">🌐 ONLINE</span>
                    <h2>線上學習資源 <span className="resources-en">Online Resources</span></h2>
                    <p className="resources-section-desc">常用的投資研究與數據查詢平台</p>
                </motion.div>

                <motion.div
                    className="online-resources-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {onlineResources.map((resource, idx) => (
                        <motion.a
                            key={idx}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="online-resource-card"
                            variants={itemVariants}
                            whileHover={{ y: -6, boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }}
                        >
                            <div className="online-resource-icon" style={{ background: resource.color + '15', color: resource.color }}>
                                <span>{resource.icon}</span>
                            </div>
                            <div className="online-resource-body">
                                <h3>{resource.name}</h3>
                                <span className="online-resource-en">{resource.nameEn}</span>
                                <p>{resource.description}</p>
                            </div>
                            <div className="online-resource-arrow">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                                </svg>
                            </div>
                        </motion.a>
                    ))}
                </motion.div>
            </section>

            {/* Offline Resources */}
            <section className="resources-section resources-section-alt">
                <motion.div
                    className="resources-section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="resources-section-badge offline-badge">📚 OFFLINE</span>
                    <h2>線下學習資源 <span className="resources-en">Offline Resources</span></h2>
                    <p className="resources-section-desc">社團推薦必讀的投資經典書籍</p>
                </motion.div>

                <motion.div
                    className="offline-resources-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {offlineResources.map((book, idx) => (
                        <motion.div
                            key={idx}
                            className="book-card"
                            variants={itemVariants}
                            whileHover={{ y: -8 }}
                        >
                            <div className="book-cover-wrapper">
                                <div className="book-cover-shadow" />
                                <img
                                    src={book.cover}
                                    alt={book.title}
                                    className="book-cover-img"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div className="book-cover-fallback" style={{ display: 'none' }}>
                                    <span className="book-cover-emoji">📖</span>
                                    <span className="book-cover-title">{book.title}</span>
                                </div>
                            </div>
                            <div className="book-info">
                                <h3 className="book-title">{book.title}</h3>
                                <span className="book-title-en">{book.titleEn}</span>
                                <span className="book-author">{book.author}</span>
                                <p className="book-desc">{book.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>
        </>
    );
}
