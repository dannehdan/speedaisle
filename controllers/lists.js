const List = require("../models/list.js");
const { Category, categories } = require("../models/category");
const list = new List();
const category = new Category();

const ListsController = {
  Show: async (req, res) => {
    await category.populateTable();
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
