var express = require('express');
var router = express.Router();

/* GET list listing. */
router.get('/', function(req, res, next) {
  res.render('list/index', { title: 'Your List' });
});

module.exports = router;
