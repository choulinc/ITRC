const db = require('./db');

async function clear1141Images() {
    try {
        console.log('Clearing image_url for 114-1 records...');
        await db.execute("UPDATE activities SET image_url = NULL WHERE semester='114-1' AND type='record'");
        console.log('Done! 114-1 records now have image_url = null.');
    } catch (e) {
        console.error('Error:', e);
    }
}

clear1141Images();
