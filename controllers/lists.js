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

    const userId = req.cookies.userId;

    const userList = await list.findListByUser(userId);

    const currentStore = await store.getStoreById(userList.storeId);

    const items = await list.getItems(userList.id);

    const orderedCategories = await store.getStoreCategories(userList.storeId);

    const categorised = orderedCategories.map((el) => ({
      header: categories[el.categoryId],
      position: el.categoryPosition,
      items: []
    }));

    for (const item of items) {
      categorised[item.categoryId].items.push(item);
    }

    categorised.sort((c1, c2) => c1.position - c2.position);

    res.render("list/index", {
      title: "Your List",
      categorised: categorised,
      hasItems: items.length > 0,
      store: currentStore,
      loggedIn: true,
    });
  },

  Add: async (req, res) => {
    const userId = req.cookies.userId;
    const userList = await list.findListByUser(userId);
    const listId = userList.id;
    await list.addItem(req.body.item, listId, req.body.category);
    res.redirect("/list");
  },

  Check: async (req, res) => {
    await list.updateCheck(req.body.postId, req.body.checked);
  },

  Clean: async(req, res) => {
    const userId = req.cookies.userId;
    const userList = await list.findListByUser(userId);
    const listId = userList.id;
    await list.removeAllItems(listId);
    res.redirect("/list");
  },

  ShowOrder: async (req, res) => {
    const userId = req.cookies.userId;
    const userList = await list.findListByUser(userId);
    const orderedCategories = await store.getStoreCategoriesOrdered(userList.storeId)
    res.render('list/categoriesorder', { title: 'Reorder categories', categories: orderedCategories, loggedIn: true });
  },

  ChangeOrder: async (req, res) => {
    const userId = req.cookies.userId;
    const userList = await list.findListByUser(userId);
    await list.updateCategoriesOrder(userList.id, req.body.reordered);
    res.json({result: 'done!'});
  },

  Remove: async(req, res) => {
    await list.deleteItem(req.body.removeId);
  }
};

module.exports = ListsController;
