const List = require("../models/list");
const Store = require("../models/store");

const list = new List();
const store = new Store();

const LocationController = {
  Show: async (req, res) => {
    const stores = await store.getAllStores();
    const curList = await list.findListByUser(req.cookies.userId)
    const currentStore = await store.getStoreById(curList.storeId);

    stores[currentStore.id - 1].selected = true;
    
    res.render("location/index", {
      stores: stores,
      currentStore: currentStore,
      loggedIn: true,
    });
  },


  Update: async (req, res) => {
    const newStore = await store.getStoreByName(req.body["new-location"]);
    const userId = req.cookies.userId;

    list.updateStore(userId, newStore.id);

    const stores = await store.getAllStores();
    const currentStore = await store.getStoreById(newStore.id);
    stores[currentStore.id - 1].selected = true;

    res.render("location/index", {
      stores: stores,
      currentStore: currentStore,
      loggedIn: true,
    });
  },
};

module.exports = LocationController;
