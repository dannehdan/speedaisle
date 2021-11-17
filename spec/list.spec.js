const List = require('../models/list');

describe('List model', function () {
  
  it('can be created', function() {
    const list = new List();
    expect(list.getItems()).toEqual([]); 
  });

  it('can add an item', function() {
    const list = new List();
    expect(list.addItem("banana", 1, "0")).resolves.toEqual(["banana"]); 
  });
});
