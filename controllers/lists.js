const List = require("../models/list.js");
const { Category, categories } = require("../models/category");
const list = new List();
const category = new Category();

const ListsController = {
  Show: async (req, res) => {
    await category.populateTable();
    const items = await list.getItems();

    res.render("list/index", { title: "Your List", items: items });
  },

  Add: async (req, res) => {
    await list.addItem(req.body.item, 1, req.body.category);
    res.redirect("/list");
  },
};

module.exports = ListsController;
