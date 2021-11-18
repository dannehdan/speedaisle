const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class List {
  async getItems() {
    const items = await prisma.items.findMany({ 
      where: {},
      orderBy: {
          checked: 'asc'
        }
    });

    return items;
  }

  async addItem(name, listId, categoryId) {
    await prisma.items.create({
      data: { name: name, listId: listId, categoryId: Number(categoryId) },
    });

    return [name];
  }

  async updateCheck(id, checked) {
    await prisma.items.update({
      where: {
        id: id
      },
      data: {
        checked: checked == 'checked'
      }
    });
  }

  async removeItems(listId) {
    await prisma.items.deleteMany({
      where: {
        listId: listId
      }
    });
  }
}

module.exports = List;
