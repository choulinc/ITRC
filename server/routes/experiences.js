const express = require('express');
const db = require('../db');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// GET /api/experiences
router.get('/', async (req, res) => {
    try {
        const result = await db.execute('SELECT * FROM experiences ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/experiences (admin)
router.post('/', authMiddleware, async (req, res) => {
    const { author, title, content } = req.body;
    if (!author || !title || !content) {
        return res.status(400).json({ error: '作者、標題、內容為必填' });
    }
    try {
        const result = await db.execute({
            sql: 'INSERT INTO experiences (author, title, content) VALUES (?, ?, ?)',
            args: [author, title, content]
        });
        const experienceResult = await db.execute({
            sql: 'SELECT * FROM experiences WHERE id = ?',
            args: [result.lastInsertRowid.toString()]
        });
        res.status(201).json(experienceResult.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT /api/experiences/:id (admin)
router.put('/:id', authMiddleware, async (req, res) => {
    const { author, title, content } = req.body;
    try {
        await db.execute({
            sql: 'UPDATE experiences SET author=COALESCE(?,author), title=COALESCE(?,title), content=COALESCE(?,content) WHERE id=?',
            args: [author, title, content, req.params.id]
        });
        const experienceResult = await db.execute({
            sql: 'SELECT * FROM experiences WHERE id = ?',
            args: [req.params.id]
        });
        if (experienceResult.rows.length === 0) return res.status(404).json({ error: '找不到此心得' });
        res.json(experienceResult.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE /api/experiences/:id (admin)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const result = await db.execute({
            sql: 'DELETE FROM experiences WHERE id = ?',
            args: [req.params.id]
        });
        if (result.rowsAffected === 0) return res.status(404).json({ error: '找不到此心得' });
        res.json({ message: '已刪除' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
