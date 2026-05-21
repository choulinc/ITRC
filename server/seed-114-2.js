const db = require('./db');

async function seedSemester114_2() {
    console.log('Waiting for database to initialize...');
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
        // ==================== Activity Plans (活動規劃) ====================
        const plans = [
            { semester: '114-2', type: 'plan', date: '2026年03月06日（五）', title: '社課介紹 + 破冰遊戲', speaker: '投資交易研究社幹部' },
            { semester: '114-2', type: 'plan', date: '2026年03月13日（五）', title: '用 AI 從零打造投資系統：交易不是誰最準，而是誰最能重複做對的事', speaker: '潘靜慶 董事長' },
            { semester: '114-2', type: 'plan', date: '2026年03月15日（日）', title: '加密貨幣與區塊鏈聯合講座', speaker: 'Jesi，幣修學分共同創辦人' },
            { semester: '114-2', type: 'plan', date: '2026年03月20日（五）', title: '創業投資實務：揭開私募創投基金的神秘面紗', speaker: '張廷緯 講師' },
            { semester: '114-2', type: 'plan', date: '2026年04月17日（五）', title: '第二季國際情勢與投資看法', speaker: '張坤城 研究員' },
            { semester: '114-2', type: 'plan', date: '2026年04月24日（五）', title: 'ETF 因子投資與市場發展趨勢', speaker: '郭治昌 經理' },
            { semester: '114-2', type: 'plan', date: '2026年04月25日（六）', title: 'WorldQuant BRAIN 自動化研究工作坊', speaker: 'You-Lin Wu / BRAIN Senior Researcher' },
            { semester: '114-2', type: 'plan', date: '2026年04月26日（日）', title: '從投顧視角看 PCB 產業鏈發展與未來展望', speaker: '廖婉婷 總經理' },
            { semester: '114-2', type: 'plan', date: '2026年05月08日（五）', title: '上億資金怎麼管？質化主觀式的投組管理實務', speaker: '羅鈞源 協理' },
            { semester: '114-2', type: 'plan', date: '2026年05月15日（五）', title: '中山投研 × 兆豐證券 Coffee Chat：證券業實務與職涯對談', speaker: '兆豐證券高管' },
            { semester: '114-2', type: 'plan', date: '2026年05月22日（五）', title: '快閃交易競賽：技術分析與短線交易', speaker: '張大恒 社長' },
            { semester: '114-2', type: 'plan', date: '2026年05月29日（五）', title: '期末學術成果發表競賽', speaker: '鄭義 副教授' },
        ];

        console.log('Inserting 114-2 plans...');
        for (const p of plans) {
            await db.execute({
                sql: 'INSERT INTO activities (type, semester, date, title, speaker, description) VALUES (?, ?, ?, ?, ?, ?)',
                args: [p.type, p.semester, p.date, p.title, p.speaker, p.description || null]
            });
        }
        console.log(`✓ ${plans.length} plans inserted`);

        // ==================== Activity Records (活動紀錄) ====================
        const records = [
            {
                semester: '114-2', type: 'record',
                date: '2026年03月06日（五）',
                title: '社課介紹 + 破冰遊戲',
                speaker: '投資交易研究社幹部',
                description: `本次活動為投資交易研究社 114-2 學期的第一堂社課，主要目的為介紹 ITRC 的社團定位、社課內容、投資交易相關課程安排，以及本學期即將進行的活動。活動中也安排破冰遊戲，讓社員彼此認識，找到理想的比賽隊友，建立後續參與課程、實作與競賽的基礎。

時間：16:10–18:00
地點：管 CM1037
內容：社團介紹、社課說明、破冰互動`
            },
            {
                semester: '114-2', type: 'record',
                date: '2026年03月13日（五）',
                title: '用 AI 從零打造投資系統：交易不是誰最準，而是誰最能重複做對的事',
                speaker: '潘靜慶 董事長',
                description: `本次社課聚焦於 AI 與投資交易系統的結合，邀請潘靜慶董事長從實務角度分享如何將 AI 應用於投資交易。課程強調成功交易並非依靠單次神準判斷，而是建立一套能夠持續運作、重複執行且有紀律的策略系統。

講者帶領社員理解 AI 投資系統的建構邏輯，包含如何透過 AI 與數據分析協助投資人建立更有紀律的交易方式，並說明量化交易與系統交易背後的核心思維。

講師背景：添高智能董事長、前匯豐商銀副總、前安聯投信協理、前 JPMorgan 經理

時間：16:10–18:00
地點：管 CM1037
主題重點：AI 投資系統、量化交易、系統交易、投資紀律`
            },
            {
                semester: '114-2', type: 'record',
                date: '2026年03月15日（日）',
                title: '加密貨幣與區塊鏈聯合講座',
                speaker: 'Jesi，幣修學分共同創辦人',
                description: `本次活動為中山投研與多校合作籌辦的 Finxuni 計畫聯合講座，由中正大學主辦，邀請幣修學分共同創辦人 Jesi 擔任講師。活動主題聚焦於加密貨幣與區塊鏈，帶領社員認識加密貨幣領域、區塊鏈基礎概念與產業應用。

本次講座採線上形式進行，社團社員可免費參與。透過跨校合作與聯合講座形式，讓社員有機會接觸更多加密貨幣相關知識，也拓展對金融科技領域的理解。

時間：15:00–17:00
地點：Google Meet 線上
主題重點：加密貨幣、區塊鏈、金融科技`
            },
            {
                semester: '114-2', type: 'record',
                date: '2026年03月20日（五）',
                title: '創業投資實務：揭開私募創投基金的神秘面紗',
                speaker: '張廷緯 講師',
                description: `本次社課邀請張廷緯講師，帶領社員深入了解創業投資與私募基金的實務運作。課程內容包含創投產業的工作內容、私募基金如何運作、投資人如何評估新創企業價值，以及創投基金在金融產業中的角色。

本次活動特別適合未來想進入投資、創投或金融產業的同學參與，能幫助社員更清楚理解產業實際工作模式與新創投資評估方式。

時間：19:30–21:30
地點：Google Meet 線上
主題重點：VC、創投、私募基金、新創估值、金融職涯`
            },
            {
                semester: '114-2', type: 'record',
                date: '2026年04月17日（五）',
                title: '第二季國際情勢與投資看法',
                speaker: '張坤城 研究員',
                description: `本次社課主題為國際情勢與投資市場分析，邀請張坤城研究員擔任講師。講者從宏觀經濟與國際局勢出發，分析近期市場受到國際情勢、利率政策與資金流動影響下的投資環境變化。

課程希望協助社員理解「現在市場正在發生什麼」以及「應該如何看待市場變化」。講者也分享在不同市場環境下的投資思維與策略，使社員能從宏觀角度建立更完整的市場觀察能力。

講師背景：現任美好投顧資深研究員，具多家券商與投顧實務經驗

時間：16:10–18:00
地點：管 CM1037
主題重點：國際情勢、美股、台股、利率政策、資金流動、投資策略`
            },
            {
                semester: '114-2', type: 'record',
                date: '2026年04月24日（五）',
                title: 'ETF 因子投資與市場發展趨勢',
                speaker: '郭治昌 經理',
                description: `本次社課邀請證券分公司經理人郭治昌經理，分享 ETF 因子投資與市場發展趨勢。課程從「不知道該買哪一檔股票」、「資訊太多不知道怎麼用」、「想投資卻沒有方法」等常見投資困境出發，帶領社員理解如何用系統化方式建立投資邏輯。

課程內容包含因子投資、ETF 選股邏輯、台灣 ETF 市場現況與未來發展趨勢。透過本次活動，社員能理解 ETF 不只是被動追蹤市場的工具，也能透過不同因子設計反映特定投資策略，進一步建立自己的投資組合。

時間：16:10–18:00
地點：管 CM1037
主題重點：ETF、因子投資、台灣 ETF 市場、投資組合建構`
            },
            {
                semester: '114-2', type: 'record',
                date: '2026年04月25日（六）',
                title: 'WorldQuant BRAIN 自動化研究工作坊',
                speaker: 'You-Lin Wu / BRAIN Senior Researcher',
                description: `本次工作坊由 WorldQuant BRAIN 與中山大學投資交易研究社合辦，邀請 BRAIN Senior Researcher You-Lin Wu 擔任主講。活動主題聚焦於如何使用程式碼進行自動化投資研究，並透過 WorldQuant BRAIN 平台尋找 Alpha。

課程內容包含自動化研究流程入門、使用 BRAIN API 加速 Alpha 尋找，以及 2026 International Quant Championship（IQC）競賽準備攻略。活動採實作導向，鼓勵參與者自備筆電，實際理解如何結合程式設計、金融資料與量化研究流程。

時間：09:00–13:00
地點：中山大學管理學院 4036 教室
主題重點：WorldQuant BRAIN、BRAIN API、自動化研究、Alpha、IQC 競賽`
            },
            {
                semester: '114-2', type: 'record',
                date: '2026年04月26日（日）',
                title: '從投顧視角看 PCB 產業鏈發展與未來展望',
                speaker: '廖婉婷 總經理',
                description: `本次活動為中山投研與多校合作籌辦的 Finxuni 計畫聯合講座，由中正大學主辦，邀請統一投顧廖婉婷總經理擔任講者。課程從投顧視角出發，分享 PCB 產業鏈的發展脈絡與未來展望。

本次講座採 Google Meet 線上形式進行，社員可免費參加，非社員則需報名繳費。透過本次活動，社員能接觸到產業研究與投顧實務觀點，了解如何從產業鏈角度分析企業與市場機會。

時間：15:00–17:00
地點：Google Meet 線上
講師：廖婉婷 總經理，統一投顧
主題重點：PCB 產業鏈、產業研究、投顧視角、未來展望`
            },
            {
                semester: '114-2', type: 'record',
                date: '2026年05月08日（五）',
                title: '上億資金怎麼管？質化主觀式的投組管理實務',
                speaker: '羅鈞源 協理',
                description: `本次社課邀請中盈投資金融投資部協理羅鈞源，分享質化主觀式投資組合管理實務。課程從法人機構 Buy-side 操盤手的角度出發，討論如何建立一套能夠面對市場漲跌的強韌投資組合，以及管理大規模資金時需要具備的核心能力。

講者分享其多年 Buy-side 職涯經驗，說明如何從管理三億台幣起步，透過「核心重倉」與「動態調整」逐步建立個人操盤風格。課程也提到國際證照如 CFA、CAIA、CIIA，以及個股研究報告架構與專業投資分析師養成。

時間：16:10–18:00
地點：管 CM1037
主題重點：Buy-side、投組管理、質化投資、個股研究、CFA、資金管理`
            },
            {
                semester: '114-2', type: 'record',
                date: '2026年05月15日（五）',
                title: '中山投研 × 兆豐證券 Coffee Chat：證券業實務與職涯對談',
                speaker: '兆豐證券高管',
                description: `本次活動為中山投研與兆豐證券合作舉辦的 Coffee Chat，主題聚焦於證券業實務視野與金融職涯探索。活動不同於一般講座，更強調面對面交流，讓社員有機會近距離向業界高階主管請教、提問與建立職涯方向。

活動內容包含第一手證券業實務洞察、高階主管職涯經驗分享、職涯探索的關鍵引導與人脈啟蒙。透過與業界人士互動，社員能更了解證券業的工作內容、產業現況與未來職涯可能性。

時間：16:10–18:10
地點：中山大學圖資大樓 11F 雷科國際會議廳
主題重點：證券業、職涯對談、金融職涯、業界交流`
            },
            {
                semester: '114-2', type: 'record',
                date: '2026年05月22日（五）',
                title: '快閃交易競賽：技術分析與短線交易',
                speaker: '張大恒 社長',
                description: `本次活動為模擬投資交易實戰課，主題為快閃交易競賽、技術分析與短線交易。活動讓社員一邊學習技術分析，一邊體驗短線交易的刺激感，並透過競賽形式將投資觀念實際應用於模擬交易情境。

課程內容包含技術分析與短線交易實戰技巧、快閃交易賽，以及 OKX Orbit 平台支援的市場評論、直播討論與加密貨幣交易體驗。講師張大恒具備校園股神競賽與模擬交易賽經驗，帶領社員從實戰角度理解短線交易策略。

主題重點：技術分析、短線交易、快閃交易賽、模擬交易、加密貨幣交易
其他：前 50 位完成指定流程者可獲免費餐點`
            },
            {
                semester: '114-2', type: 'record',
                date: '2026年05月29日（五）',
                title: '期末學術成果發表競賽',
                speaker: '鄭義 副教授',
                description: `本次活動為 114-2 學期的期末學術成果發表競賽，也是本學期社課與模擬交易訓練的總結。全體社員分組進行交易策略設計、投資組合建構或總經／產業研究，並於期末進行成果發表。

本次競賽採分組發表形式，每組需進行 10 分鐘簡報與 3 分鐘 QA。評分構面包含邏輯建構與商業洞察、研究佐證與風險控管、情境推演與部位管理、專業表現與 QA 答辯。

虛擬交易期間：03月16日–05月22日
期末發表日期：05月29日
時間：16:10–19:00
發表形式：每組 10 分鐘簡報 + 3 分鐘 QA
評審：鄭義 副教授

競賽獎項：最佳績效獎、最佳成果獎、最佳創意獎

評分構面：邏輯建構與商業洞察、研究佐證與風險控管、情境推演與部位管理、專業展現與 QA 答辯`
            },
        ];

        console.log('Inserting 114-2 records...');
        for (const r of records) {
            await db.execute({
                sql: 'INSERT INTO activities (type, semester, date, title, speaker, description) VALUES (?, ?, ?, ?, ?, ?)',
                args: [r.type, r.semester, r.date, r.title, r.speaker, r.description || null]
            });
        }
        console.log(`✓ ${records.length} records inserted`);

        // Verify
        const countResult = await db.execute("SELECT semester, type, COUNT(*) as count FROM activities GROUP BY semester, type ORDER BY semester, type");
        console.log('\n--- Activity counts by semester & type ---');
        countResult.rows.forEach(r => console.log(`  ${r.semester} | ${r.type} | ${r.count} items`));

        console.log('\n--- Seed 114-2 completed ---');
        process.exit(0);
    } catch (err) {
        console.error('Seed Error:', err);
        process.exit(1);
    }
}

seedSemester114_2();
