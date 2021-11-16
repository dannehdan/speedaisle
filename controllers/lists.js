// require('../models/list.js');

const ListsController = {
  Show: (req, res) => {
    res.render('list/index', { title: 'Your List' });
  }
};

module.exports = ListsController;