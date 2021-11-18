const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class List {
  async getItems() {
    const items = await prisma.items.findMany({ where: {} });

    return items;
  }

  async addItem(name, listId, categoryId) {
    await prisma.items.create({
      data: { name: name, listId: listId, categoryId: Number(categoryId) },
    });

    return [name];
  }

  async updateCheck(id, checked) {
    if(checked == 'checked') {
      await prisma.items.update({
        where: {
          id: id
        },
        data: {
          checked: false
        }
      });
    } else {
      await prisma.items.update({
        where: {
          id: id
        },
        data: {
          checked: true
        }
      });
    }
  }
}

module.exports = List;
