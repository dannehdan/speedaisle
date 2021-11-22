const getDBType = require("../utils/getDBType");

const prisma = getDBType();

class List {

  async getItems() {
    const items = await prisma.items.findMany({
      where: {},
      orderBy: {
        checked: "asc",
      },
    })

// todo - persist the user data for deployment
//   async getItems(listId = 1) {
//     const items = await prisma.items.findMany({
//       where: {
//         listId: listId
//       },
//       orderBy: {
//         checked: "asc",
//       }
//     });
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

  async removeItems(listId) {
    let removed = await prisma.items.deleteMany({
      where: {
        listId: listId,
      },
    });
    return removed.count;
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
      data: { local_store: storeId },
    });
  }

  async findList(userId) {
    const userStore = await prisma.lists.findFirst({
      where: { ownerId: userId },
    });

    return userStore;
  }
}

module.exports = List;
