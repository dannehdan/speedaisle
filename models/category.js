const getDBType = require("../utils/getDBType");

const prisma = getDBType();

const categories = [
  "Fruit & Veg",
  "Bakery",
  "Fridge",
  "Frozen",
  "Food Cupboard",
  "Household"
];

class Category {
  async populateTable() {
    const valid = await prisma.categories.findFirst({
      where: { name: "Fruit & Veg" },
    });

    if (valid) {
      return;
    } else {
      await prisma.categories.createMany({
        data: categories.map((item, index) => ({
          name: item,
          id: index,
        })),
      });
    }
  }
}

module.exports = { Category: Category, categories: categories };
