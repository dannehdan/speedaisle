var express = require('express');
var router = express.Router();

const ListsController = require('../controllers/lists');
const checkAuthenticated = require('../models/checkauth');

router.get('/', checkAuthenticated, ListsController.Show);
router.post('/additem', checkAuthenticated, ListsController.Add);
router.patch('/check', checkAuthenticated, ListsController.Check);
router.delete('/remove', checkAuthenticated, ListsController.Remove);
router.get('/clean', checkAuthenticated, ListsController.Clean);
router.get('/categoriesorder', checkAuthenticated, ListsController.ShowOrder);
router.patch('/categoriesorder', checkAuthenticated, ListsController.ChangeOrder);

module.exports = router;
