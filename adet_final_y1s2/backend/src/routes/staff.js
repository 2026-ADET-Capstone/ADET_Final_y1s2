const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// GET /staff — list, ordered by displayOrder
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM staff ORDER BY displayOrder ASC, id ASC'
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching staff:', err);
    res.status(500).json({ error: 'Failed to fetch staff' });
  }
});

// GET /staff/:id — single member
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM staff WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching staff member:', err);
    res.status(500).json({ error: 'Failed to fetch staff member' });
  }
});

module.exports = router;