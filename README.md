# NSYSU ITRC

NSYSU Investment & Trading Research Club 的官方網站與內容管理系統。前台展示社團介紹、成果、活動、參與心得與學習資源；後台提供管理員維護內容、上傳圖片與還原內容快照。

## 技術架構

- 前端：React 18、Vite、React Router、Axios、Framer Motion
- 後端：Node.js、Express
- 資料庫：Turso / LibSQL，本機開發可回退使用 SQLite
- 驗證：JWT、bcrypt
- 圖片：Cloudinary
- 部署：Vercel（前端）、Render（後端）

## 主要功能

- 社團首頁與課程資訊
- 成果發表、活動規劃與活動紀錄
- 成員、參與心得與學習資源管理
- 站內關鍵字搜尋
- JWT 管理員後台
- Cloudinary 單張與批次圖片上傳
- 內容自動快照、手動備份與還原

## 專案結構

```text
ITRC/
├── client/          # React / Vite 前端
│   ├── public/      # 靜態圖片
│   └── src/         # 頁面、元件、認證狀態與 API client
├── server/          # Express API 與資料庫邏輯
│   ├── middleware/  # JWT middleware
│   └── routes/      # 各內容模組 API
├── render.yaml      # Render 部署設定
└── README.md
```

## 本機開發

需求：Node.js 18 以上與 npm。

1. 建立根目錄的 `.env`：

```dotenv
# 使用 Turso 時填寫；兩者均留空時使用本機 SQLite
TURSO_DATABASE_URL=
TURSO_AUTH_TOKEN=

# 生產環境務必使用高強度隨機值
JWT_SECRET=

# 需要圖片上傳功能時填寫
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

2. 啟動後端：

```bash
cd server
npm install
node seed.js   # 僅在需要初始資料時執行
npm start
```

後端預設使用 `http://localhost:3001`。

3. 另開終端啟動前端：

```bash
cd client
npm install
npm run dev
```

前端開發伺服器預設使用 `http://localhost:5173`，並將 `/api` 與 `/uploads` 代理至後端。

## 環境變數

| 變數 | 使用位置 | 說明 |
| --- | --- | --- |
| `TURSO_DATABASE_URL` | Server | Turso / LibSQL 資料庫 URL |
| `TURSO_AUTH_TOKEN` | Server | Turso 驗證 token |
| `JWT_SECRET` | Server | JWT 簽章密鑰 |
| `CLOUDINARY_CLOUD_NAME` | Server | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Server | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Server | Cloudinary API secret |
| `VITE_API_URL` | Client | 生產環境 API base URL；未設定時使用 `/api` |

## 建置與部署

前端建置：

```bash
cd client
npm ci
npm run build
```

- Vercel：將 Root Directory 設為 `client`，並設定 `VITE_API_URL` 指向後端 `/api` URL。
- Render：根目錄的 `render.yaml` 已定義後端服務與必要環境變數。

## 安全注意事項

- 不要將 `.env`、token、API key 或管理員密碼提交到 Git。
- `JWT_SECRET` 在生產環境不可使用程式內的 fallback 值。
- `seed.js` 會在空資料庫建立初始管理員；部署後應立即更換憑證。
- 若憑證曾出現在 Git 歷史，應視為已曝露並進行更換。
