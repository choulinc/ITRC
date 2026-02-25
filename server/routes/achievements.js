const express = require('express');
const db = require('../db');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// GET /api/achievements
router.get('/', async (req, res) => {
    try {
        const result = await db.execute('SELECT * FROM achievements ORDER BY semester DESC, order_num ASC');
        const achievements = result.rows;
        // Group by semester
        const grouped = {};
        achievements.forEach(a => {
            if (!grouped[a.semester]) grouped[a.semester] = [];
            grouped[a.semester].push(a);
        });
        res.json({ all: achievements, grouped });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/achievements (admin)
router.post('/', authMiddleware, async (req, res) => {
    const { semester, title, category, description, link, order_num } = req.body;
    try {
        const result = await db.execute({
            sql: 'INSERT INTO achievements (semester, title, category, description, link, order_num) VALUES (?, ?, ?, ?, ?, ?)',
            args: [semester, title, category || null, description || null, link || null, order_num || 0]
        });
        const achievementResult = await db.execute({
            sql: 'SELECT * FROM achievements WHERE id = ?',
            args: [result.lastInsertRowid.toString()]
        });
        res.status(201).json(achievementResult.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT /api/achievements/:id (admin)
router.put('/:id', authMiddleware, async (req, res) => {
    const { semester, title, category, description, link, order_num } = req.body;
    try {
        await db.execute({
            sql: 'UPDATE achievements SET semester=COALESCE(?,semester), title=COALESCE(?,title), category=COALESCE(?,category), description=COALESCE(?,description), link=COALESCE(?,link), order_num=COALESCE(?,order_num) WHERE id=?',
            args: [semester ?? null, title ?? null, category ?? null, description ?? null, link ?? null, order_num ?? null, req.params.id]
        });
        const achievementResult = await db.execute({
            sql: 'SELECT * FROM achievements WHERE id = ?',
            args: [req.params.id]
        });
        if (achievementResult.rows.length === 0) return res.status(404).json({ error: '找不到此成果' });
        res.json(achievementResult.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE /api/achievements/:id (admin)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const result = await db.execute({
            sql: 'DELETE FROM achievements WHERE id = ?',
            args: [req.params.id]
        });
        if (result.rowsAffected === 0) return res.status(404).json({ error: '找不到此成果' });
        res.json({ message: '已刪除' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
