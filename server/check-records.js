const db = require('./db');

async function check() {
    try {
        const res = await db.execute("SELECT id, title, description, image_url FROM activities WHERE semester='114-1' AND type='record'");
        for (const row of res.rows) {
            console.log(`[ID: ${row.id}] ${row.title}`);
            console.log(`image_url:`, row.image_url);
            console.log(`description:`, row.description);
            console.log('---');
        }
    } catch (e) {
        console.error(e);
    }
}

check();
