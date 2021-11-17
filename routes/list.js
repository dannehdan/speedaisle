var express = require('express');
var router = express.Router();

const ListsController = require('../controllers/lists');

/* GET list listing. */
router.get('/', ListsController.Show);
router.post('/additem', ListsController.Add);

module.exports = router;
