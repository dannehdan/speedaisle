const Store = require("../models/store");

const store = new Store();

const LocationController = {
  Show: async (req, res) => {
    const stores = await store.getStores();

    res.render("location/index", {
      stores: stores,
    });
  },
};

module.exports = LocationController;
