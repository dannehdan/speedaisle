const List = require("../models/list.js");
const { Category, categories } = require("../models/category");
const list = new List();
const category = new Category();

const ListsController = {
  Show: async (req, res) => {
    await category.populateTable();
    const items = await list.getItems();
    const categorised = categories.map((category) => ({
      header: category,
      items: []
    }));

    for (const item of items) {
      categorised[item.categoryId].items.push(item);
    }

    res.render("list/index", { 
      title: "Your List", 
      categorised: categorised, 
      hasItems: items.length > 0 
    });
  },

  Add: async (req, res) => {
    await list.addItem(req.body.item, 1, req.body.category);
    res.redirect("/list");
  },

  Check: async(req, res) => {
    await list.updateCheck(req.body.postId, req.body.checked);
  },

  Clean: async(req, res) => {
    await list.removeItems(1);
    res.redirect("/list");
  },

  Remove: async(req, res) => {
    await list.deleteItem(req.body.removeId)
  }
};

module.exports = ListsController;
