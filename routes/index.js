const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/app', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/app.html'));
});

module.exports = router;
