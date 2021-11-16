var express = require('express');
var router = express.Router();

/* GET list listing. */
router.get('/', function(req, res, next) {
  res.send('Your list');
});

module.exports = router;
