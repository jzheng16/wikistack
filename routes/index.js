const express = require('express');
const router = express.Router();


router.get('/', function (req, res) {
  res.res('res');
});

module.exports = router;
