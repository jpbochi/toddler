const _ = require('lodash');
const board = require('./board');

const brute = (current, pieces) => {
  const width = _.max(_.map(current, _.size));
  const height = _.size(current);

  const nextPiece = _.head(pieces);
  if (!nextPiece) {
    return current;
  }

  const pieceWidth = _.max(_.map(nextPiece, _.size));
  const pieceHeight = _.size(nextPiece);

  const xShifts = _.times(width - pieceWidth + 1)
  const yShifts = _.times(height - pieceHeight + 1)
  const withShift = _(yShifts)
    .map(y => (
      _(xShifts)
        .map(x => board.add(current, board.shift(nextPiece, [x, y])))
        .find()
    ))
    .find();
  if (withShift) {
    return brute(withShift, _.tail(pieces));
  }

  return false;
};

module.exports = {
  brute
};
