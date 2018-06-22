const board = require('./board');

describe('board', () => {
  it('is empty', () => {
    expect(board.create()).to.eql({});
  });
});
