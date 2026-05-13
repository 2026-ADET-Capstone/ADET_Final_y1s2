const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM concessions ORDER BY category ASC, displayOrder ASC, id ASC'
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching concessions:', err);
    res.status(500).json({ error: 'Failed to fetch concessions' });
  }
});

module.exports = router;