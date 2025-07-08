const express = require('express');
const path = require('path');
const router = express.Router();

// Halaman Register
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/app.html'));
});

// Halaman Login
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/login.html'));
});

// Halaman Todos (To-do List)
router.get('/app', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/todos.html'));
});

module.exports = router;
