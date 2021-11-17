const List = require("../models/list.js");
const list = new List();

const categories = [
  "Fruits & Vegs",
  "Bakery",
  "Fridge",
  "Frozen",
  "Food Cupboard",
  "Household",
];

const ListsController = {
  Show: (req, res) => {
    res.render("list/index", { title: "Your List" });
  },

  Add: async (req, res) => {
    await list.addItem(req.body.item, 1, req.body.category);
    res.send(
      `You added ${req.body.item} to the ${
        categories[req.body.category]
      } category`
    );
  },
};

module.exports = ListsController;
