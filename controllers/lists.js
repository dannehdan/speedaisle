// require('../models/list.js');
const categories = [
  'Fruits & Vegs',
  'Bakery',
  'Fridge',
  'Frozen',
  'Food Cupboard',
  'Household',
];

const ListsController = {
  Show: (req, res) => {
    res.render('list/index', { title: 'Your List' });
  },

  Add: (req, res) => {
    res.send(`You added ${req.body.item} to the ${categories[req.body.category]} category`);
  }
};

module.exports = ListsController;