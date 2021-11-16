var express = require('express');
var router = express.Router();

const ListsController = require('../controllers/lists');

/* GET list listing. */
// router.get('/', function(req, res, next) {
//   res.render('list/index', { title: 'Your List' });
// });
router.get('/', ListsController.Show);

module.exports = router;
