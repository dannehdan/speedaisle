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
    const listId = 1;
    await list.addItem(req.body.item, listId, req.body.category);
    res.redirect("/list");
  },

  Check: async(req, res) => {
    await list.updateCheck(req.body.postId, req.body.checked);
  },

  Clean: async(req, res) => {
    const listId = 1;
    await list.removeItems(listId);
    res.redirect("/list");
  },

  ShowOrder: (req, res) => {
    res.render('list/categoriesorder', { title: 'Reorder categories', categories: categories });
  },

  ChangeOrder: async (req, res) => {
    // TODO: save to the DB
    const listId = 1;
    console.log("New order:\n", req.body.reordered);
    await list.updateCategoriesOrder(listId, req.body.reordered);
    res.json({result: 'done!'});
  }
};

module.exports = ListsController;
