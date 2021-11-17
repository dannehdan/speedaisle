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
// (async function(){
    
//     await prisma.categories.createMany({
//       data: categories.map((item, index) => ({
//         name: item,
//         id: index
//       }))
//     });
// })();

class List {
  getItems() {
    return [];
  }

  async addItem(name, listId, categoryId) {
    // await prisma.categories.createMany({
    //   data: categories.map((item, index) => ({
    //     name: item,
    //     id: index
    //   })),
    // });
    await prisma.items.create({
      data: { name: name, listId: listId, categoryId: Number(categoryId) }
    });

    return [name];
  }
}

module.exports = List;
