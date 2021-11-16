const List = require('../models/list');

describe('List model', function () {
  
  it('can be created', function() {
    const list = new List();
    expect(list.items).toEqual([]); 
  });
});
