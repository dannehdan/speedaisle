const List = require("../models/list");
const Store = require("../models/store");

const list = new List();
const store = new Store();

const LocationController = {
  Show: async (req, res) => {
    const stores = await store.getStores();
    const currentStore = await store.getCurrentStore();

    res.render("location/index", {
      stores: stores,
      currentStore: currentStore,
    });
  },
  Update: async (req, res) => {
    const newStore = await store.getNewStore(req.body["new-location"]);

    const userId = req.cookies.userId;

    list.updateStore(userId, newStore.id);

    const stores = await store.getStores();
    const currentStore = await store.getCurrentStore(newStore.id);

    res.render("location/index", {
      stores: stores,
      currentStore: currentStore,
    });
  },
};

module.exports = LocationController;
