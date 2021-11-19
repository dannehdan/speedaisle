const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Store {
  async populateStoreInfo() {
    const valid = await prisma.stores.findFirst({
      where: { name: "Finchley Rd" },
    });

    if (valid) {
      return;
    } else {
      await prisma.stores.createMany({
        data: [
          {
            name: "Ggrn Accomdtn Rd Loc",
            latitude: 51.57204,
            longitude: -0.1972,
            address: "29-37 Golders Green Road, London, England, NW11 8EE",
          },
          {
            name: "Mornington Cres Loc",
            latitude: 51.53506,
            longitude: -0.13865,
            address: "10-12 Camden High Street, London, England, NW1 0JH",
          },
          {
            name: "Golders Grn",
            latitude: 51.57076,
            longitude: -0.19455,
            address: "614 Finchley Road, London, England, NW11 7RX",
          },
          {
            name: "Willesden Grn Loc",
            latitude: 51.5488,
            longitude: -0.22097,
            address: "92 Walm Lane, London, England, NW2 4QY",
          },
          {
            name: "Wstbrn Pk Hrw Rd Loc",
            latitude: 51.52397,
            longitude: -0.20083,
            address: "478 Harrow Road, London, England, W9 3RU",
          },
          {
            name: "Hndn Vivian Ave Loc",
            latitude: 51.58252,
            longitude: -0.23095,
            address: "2a Rundell Crescent, London, England, NW4 3DA",
          },
          {
            name: "Bishopsgarth Loc",
            latitude: 54.57802,
            longitude: -1.3607,
            address: "1-3 Marske Parade, Stockton-On-Tees, England, TS19 8XQ",
          },
          {
            name: "Westbury Loc",
            latitude: 54.55466,
            longitude: -1.29916,
            address:
              "59 Westbury Street Thornaby, Stockton-On-Tees, England, TS17 6NP",
          },
          {
            name: "Roseberry Centre Loc",
            latitude: 54.60245,
            longitude: -1.07608,
            address: "8 Roseberry Shopping Center, Redcar, England, TS10 4NY",
          },
          {
            name: "Finchley Rd",
            latitude: 51.54802,
            longitude: -0.182,
            address: "02 Centre 255 Finchley Road, London, England, NW3 6LU",
          },
        ],
      });
    }
  }
}

module.exports = Store;
