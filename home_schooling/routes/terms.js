const express = require('express');
const router = express.Router();
const { db, closeConnection } = require('../db');

router.get('/terms', (req, res) => {
  const sql = 'SELECT * FROM terms';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching terms:', err);
      res.status(500).json({ error: 'Error fetching terms' });
      return;
    }
    res.json(results);
    closeConnection();
  });
});


router.post('/terms', (req, res) => {
  const { termName } = req.body;

  if (!termName) {
    return res.status(400).json({ error: 'Term name is required' });
  }

  const sql = 'INSERT INTO terms (name) VALUES (?)';

  db.query(sql, [termName], (err, result) => {
    if (err) {
      console.error('Error adding term:', err);
      return res.status(500).json({ error: 'Error adding term' });
    }
    res.status(201).json({ message: 'Term added successfully', id: result.insertId });
    closeConnection();
  });
});


router.delete('/terms/:id', (req, res) => {
  const TermId = req.params.id;
  const sql = 'DELETE FROM terms WHERE id = ?';
  db.query(sql, [TermId], (err, results) => {
    if (err) {
      console.error('Error deleting term:', err);
      res.status(500).json({ error: 'Error deleting term' });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Term not found' });
      return;
    }
    res.json({ message: 'Term deleted successfully' });
    closeConnection();
  });
});

module.exports = router;
