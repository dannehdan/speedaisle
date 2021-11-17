const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const categories = [
  "Fruits & Vegs",
  "Bakery",
  "Fridge",
  "Frozen",
  "Food Cupboard",
  "Household",
];

class Category {
  async populateTable() {
    const valid = await prisma.categories.findFirst({
      where: { name: "Fruits & Vegs" },
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
