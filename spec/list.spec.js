const List = require("../models/list");
const { 
  findItemById, 
  itemIsChecked, 
  getListIdFromItem, 
  countItemsInList 
} = require("./db_helpers");

const getDBType = require("../utils/getDBType");

const prisma = getDBType();

beforeEach(async () => {
  await prisma.items.deleteMany({
    where: {}
  });
});

describe("List model", function () {
  it("empty when created", async () => {
    const list = new List();
    expect(await list.getItems()).toEqual([]);
  });

  it("adds an item to DB", async () => {
    const list = new List();
    const id = await list.addItem("banana", 1, "0");
    expect(await findItemById(id)).toEqual("banana");
  });

  it("item added to the db is unchecked by default", async () => {
    const list = new List();
    const id = await list.addItem("apple", 1, "0");
    expect(await itemIsChecked(id)).toEqual(false);
  });

  it("item added to the db can be checked", async () => {
    const list = new List();
    const id = await list.addItem("grapes", 1, "0");
    
    expect(await list.updateCheck(id, "checked")).toEqual(true);
    expect(await itemIsChecked(id)).toEqual(true);
  });

  // TODO: Add test for removing 1 item from list
  // it ("delete individual items", () => {
  //   const list = new List()
  //   list.removeItems()
  //   list.addItem("apple", 1, "0")
  //   list.deleteItem("apple")
  //   expect(list.getItems()).resolves.toEqual([])
  // })
  
  it("removes all items from list in db", async () => {
    const list = new List();
    const id = await list.addItem("oranges", 1, "0");
    const listId = await getListIdFromItem(id);

    expect(await countItemsInList(listId)).toEqual(await list.removeItems(listId));
    expect(await countItemsInList(listId)).toEqual(0);
  });
});
