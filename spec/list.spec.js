const List = require("../models/list");

describe("List model", function () {
  // it("can be created", function () {
  //   const list = new List();
  //   expect(list.getItems()).resolves.toEqual([]);
  // });

  it("can add an item", function () {
    const list = new List();
    expect(list.addItem("banana", 1, "0")).resolves.toEqual(["banana"]);
  });

  // it ("delete individual items", () => {
  //   const list = new List()
  //   list.removeItems()
  //   list.addItem("apple", 1, "0")
  //   list.deleteItem("apple")
  //   expect(list.getItems()).resolves.toEqual([])
  // })
});
