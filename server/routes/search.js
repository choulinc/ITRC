const express = require('express');
const db = require('../db');

const router = express.Router();

// GET /api/search?q=keyword
router.get('/', async (req, res) => {
    const { q } = req.query;
    if (!q || q.trim().length === 0) {
        return res.json({ results: [] });
    }

    const keyword = `%${q.trim()}%`;

    try {
        const [
            sections,
            achievements,
            activities,
            experiences,
            members
        ] = await Promise.all([
            db.execute({
                sql: "SELECT 'section' as type, key as id, title, content as snippet FROM sections WHERE title LIKE ? OR content LIKE ?",
                args: [keyword, keyword]
            }),
            db.execute({
                sql: "SELECT 'achievement' as type, id, title, description as snippet FROM achievements WHERE title LIKE ? OR description LIKE ? OR category LIKE ?",
                args: [keyword, keyword, keyword]
            }),
            db.execute({
                sql: "SELECT 'activity' as type, id, title, description as snippet FROM activities WHERE title LIKE ? OR description LIKE ?",
                args: [keyword, keyword]
            }),
            db.execute({
                sql: "SELECT 'experience' as type, id, title, content as snippet FROM experiences WHERE title LIKE ? OR content LIKE ? OR author LIKE ?",
                args: [keyword, keyword, keyword]
            }),
            db.execute({
                sql: "SELECT 'member' as type, id, name as title, role as snippet FROM members WHERE name LIKE ? OR role LIKE ? OR department LIKE ?",
                args: [keyword, keyword, keyword]
            })
        ]);

        res.json({
            results: [
                ...sections.rows,
                ...achievements.rows,
                ...activities.rows,
                ...experiences.rows,
                ...members.rows
            ]
        });
    } catch (err) {
        console.error('Search error:', err);
        res.status(500).json({ error: '搜尋發生錯誤' });
    }
});

module.exports = router;
