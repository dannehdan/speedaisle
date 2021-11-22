const Store = require("../models/store");
const List = require("../models/list.js");
const { Category, categories } = require("../models/category");

const store = new Store();
const list = new List();
const category = new Category();

const ListsController = {
  Show: async (req, res) => {
    await category.populateTable();
    await store.populateStoreInfo();

    const currentStore = await store.getCurrentStore(1);

    const items = await list.getItems();
    const categorised = categories.map((category) => ({
      header: category,
      items: [],
    }));

    for (const item of items) {
      categorised[item.categoryId].items.push(item);
    }

    res.render("list/index", {
      title: "Your List",
      categorised: categorised,
      hasItems: items.length > 0,
      store: currentStore,
    });
  },

  Add: async (req, res) => {
    await list.addItem(req.body.item, 1, req.body.category);
    res.redirect("/list");
  },

  Check: async (req, res) => {
    await list.updateCheck(req.body.postId, req.body.checked);
  },

  Clean: async (req, res) => {
    await list.removeItems(1);
    res.redirect("/list");
  },
};

module.exports = ListsController;
