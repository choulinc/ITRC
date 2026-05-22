const db = require('./db');
const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: '../.env' });
const https = require('https');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function downloadImageToBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to fetch image, status code: ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function uploadToCloudinary(buffer) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'itrc_activities' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    uploadStream.end(buffer);
  });
}

async function run() {
  await new Promise(r => setTimeout(r, 1500)); // wait for db init

  const res = await db.execute('SELECT id, title, image_url FROM activities WHERE type="record"');
  for (const row of res.rows) {
    if (!row.image_url) continue;
    let urls = [];
    try {
      urls = JSON.parse(row.image_url);
      if (!Array.isArray(urls)) urls = [row.image_url];
    } catch (e) {
      urls = [row.image_url];
    }

    const needsUpdate = urls.some(u => u.includes('lh3.googleusercontent.com'));
    if (!needsUpdate) continue;

    console.log(`Processing '${row.title}' (${urls.length} images)...`);
    const newUrls = [];
    for (const url of urls) {
      if (url.includes('lh3.googleusercontent.com')) {
        try {
          console.log(`  Downloading ${url.substring(0, 50)}...`);
          const buffer = await downloadImageToBuffer(url);
          console.log(`  Uploading to Cloudinary...`);
          const secureUrl = await uploadToCloudinary(buffer);
          newUrls.push(secureUrl);
        } catch (e) {
          console.error(`  Error processing image: ${e.message}`);
          newUrls.push(url); // keep original if failed
        }
      } else {
        newUrls.push(url);
      }
    }

    await db.execute({
      sql: 'UPDATE activities SET image_url = ? WHERE id = ?',
      args: [JSON.stringify(newUrls), row.id]
    });
    console.log(`✅ Updated '${row.title}' with Cloudinary URLs.`);
  }
  
  console.log('Done uploading all images to Cloudinary!');
  process.exit(0);
}

run();
