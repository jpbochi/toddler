const _ = require('lodash');
const board = require('./board');

const brute = (current, pieces) => {
  const width = _.max(_.map(current, _.size));

  const nextPiece = _.head(pieces);
  if (!nextPiece) {
    return current;
  }

  const pieceWidth = _.max(_.map(nextPiece, _.size));

  const withShiftRight = _(_.times(width - pieceWidth + 1))
    .map(x => (
      board.add(current, board.shiftRight(nextPiece, x))
    ))
    .find();
  if (withShiftRight) {
    return brute(withShiftRight, _.tail(pieces));
  }

  return false;
};

module.exports = {
  brute
};
