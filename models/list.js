const getDBType = require("../utils/getDBType");

const prisma = getDBType();

class List {
  
  // todo - persist the user data for deployment
  async getItems(listId) {
    const items = await prisma.items.findMany({
      where: {
        listId: listId
      },
      orderBy: {
        checked: "asc",
      }
    });
    return items;
  }

  async addItem(name, listId, categoryId) {
    const item = await prisma.items.create({
      data: { name: name, listId: listId, categoryId: Number(categoryId) },
    });

    return item.id;
  }

  async updateCheck(id, checked) {
    const item = await prisma.items.update({
      where: {
        id: id,
      },
      data: {
        checked: checked == "checked",
      }
    });
    return item.checked;
  }

  async removeAllItems(listId) {
    let removed = await prisma.items.deleteMany({
      where: {
        listId: listId,
      },
    });

    return removed.count;
  }

  async updateCategoriesOrder(listId, reordered) {
    const list = await prisma.lists.findFirst({
      where: { id: listId }
    });

    for (let i = 0; i < reordered.length; i++) {
      const category = await prisma.categories.findFirst({
        where: { name: reordered[i] }
      });

      // updateFirst had issues with more than one where condition
      await prisma.category_orders.updateMany({
        where: {
          storeId: list.storeId,
          categoryId: category.id 
        },
        data: { categoryPosition: i }
      });
    }
  }
    
  async deleteItem(itemId) {
    await prisma.items.delete({
      where: {
        id: itemId
      }
    })
  }
  
  async updateStore(userId, storeId) {
    const userList = await prisma.lists.findFirst({
      where: { ownerId: userId },
    });

    await prisma.lists.update({
      where: { id: userList.id },
      data: { storeId: storeId },
    });
  }

  async findListByUser(userId) {
    const list = await prisma.lists.findFirst({
      where: { ownerId: userId },
    });

    return list;
  }
}

module.exports = List;
