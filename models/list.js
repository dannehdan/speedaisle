const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class List {
  getItems() {
    return [];
  }

  async addItem(name, listId, categoryId) {
    await prisma.items.create({
      data: { name: name, listId: listId, categoryId: Number(categoryId) },
    });

    return [name];
  }
}

module.exports = List;
