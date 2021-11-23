const { PrismaClient } = require("@prisma/client");
const { categories } = require("../models/category");

const prisma = new PrismaClient();

const STORES_LIST = [
  {
    name: "Golders Green (Local) - London",
    latitude: 51.57204,
    longitude: -0.1972,
    address: "29-37 Golders Green Road, London, England, NW11 8EE",
  },
  {
    name: "Mornington Crescent (Local) - London",
    latitude: 51.53506,
    longitude: -0.13865,
    address: "10-12 Camden High Street, London, England, NW1 0JH",
  },
  {
    name: "Golders Green - London",
    latitude: 51.57076,
    longitude: -0.19455,
    address: "614 Finchley Road, London, England, NW11 7RX",
  },
  {
    name: "Willesden Green (Local) - London",
    latitude: 51.5488,
    longitude: -0.22097,
    address: "92 Walm Lane, London, England, NW2 4QY",
  },
  {
    name: "Westbourne Park (Local) - London",
    latitude: 51.52397,
    longitude: -0.20083,
    address: "478 Harrow Road, London, England, W9 3RU",
  },
  {
    name: "Hendon (Local) - London",
    latitude: 51.58252,
    longitude: -0.23095,
    address: "2a Rundell Crescent, London, England, NW4 3DA",
  },
  {
    name: "Bishopsgarth (Local) - Stockton-On-Tees",
    latitude: 54.57802,
    longitude: -1.3607,
    address: "1-3 Marske Parade, Stockton-On-Tees, England, TS19 8XQ",
  },
  {
    name: "Westbury (Local) - Stockton-On-Tees",
    latitude: 54.55466,
    longitude: -1.29916,
    address:
      "59 Westbury Street Thornaby, Stockton-On-Tees, England, TS17 6NP",
  },
  {
    name: "Roseberry Centre (Local) - Redcar",
    latitude: 54.60245,
    longitude: -1.07608,
    address: "8 Roseberry Shopping Center, Redcar, England, TS10 4NY",
  },
  {
    name: "Finchley Road - London",
    latitude: 51.54802,
    longitude: -0.182,
    address: "02 Centre 255 Finchley Road, London, England, NW3 6LU",
  }
];

class Store {
  async populateStoreInfo() {
    const valid = await prisma.stores.findFirst({
      where: { name: "Finchley Rd" },
    });

    if (valid) {
      return;
    } else {
      await prisma.stores.createMany({
        data: STORES_LIST
      });

      for (let i = 1; i <= STORES_LIST.length; i++) {
        for (let j = 0; j < categories.length; j++) {
          await prisma.category_orders.create({
            data: {
              categoryId: j,
              categoryPosition: j,
              storeId: i
            }
          })
        }
      }
    }
  }

  async getAllStores() {
    const stores = await prisma.stores.findMany({});

    return stores;
  }

  async getStoreById(storeId) {
    const currentStore = await prisma.stores.findFirst({
      where: { id: storeId }
    });

    return currentStore;
  }

  async getStoreByName(storeName) {
    const newStore = await prisma.stores.findFirst({
      where: { name: storeName }
    });

    return newStore;
  }

  async getStoreCategories(storeId) {
    const categories = await prisma.category_orders.findMany({
      where: {
        storeId: storeId
      },
      orderBy: {
        categoryId: 'asc'
      }
    })
    return categories;
  }

  async getStoreCategoriesOrdered(storeId) {
    const ordered = await prisma.category_orders.findMany({
      where: {
        storeId: storeId
      },
      orderBy: {
        categoryPosition: 'asc'
      }
    })
    for (let i = 0; i < ordered.length; i++) {
      ordered[i].name = categories[ordered[i].categoryId];
    }
    return ordered;
  }
}

module.exports = Store;
