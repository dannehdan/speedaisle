const getDBType = require("../utils/getDBType");

const prisma = getDBType();

module.exports = { 
  findItemById: async (itemId) => {
    const item = await prisma.items.findFirst({
      where: { id: itemId }
    });
    return item.name;
  },
  itemIsChecked: async (itemId) => {
    const item = await prisma.items.findFirst({
      where: { id: itemId }
    });
    return item.checked;
  },
  getListIdFromItem: async (itemId) => {
    const item = await prisma.items.findFirst({
      where: { id: itemId }
    });
    return item.listId;
  },
  countItemsInList: async (listId) => {
    const items = await prisma.items.findMany({
      where: { listId: listId }
    });
    return items.length;
  }
}