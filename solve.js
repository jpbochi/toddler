const _ = require('lodash');
const board = require('./board');

const brute = (current, pieces) => {
  const width = _.max(_.map(current, _.size));
  const height = _.size(current);

  const nextPiece = _.head(pieces);
  if (!nextPiece) {
    return current;
  }

  const tryShifts = (piece) => {
    const pieceWidth = _.max(_.map(piece, _.size));
    const pieceHeight = _.size(piece);

    const xShifts = _.times(width - pieceWidth + 1);
    const yShifts = _.times(height - pieceHeight + 1);
    return _(yShifts).map(y => (
      _(xShifts).map(x => (
        board.add(current, board.shift(piece, [x, y]))
      )).find()
    )).find();
  };

  const tryRotates = (piece) => (
    _([0, 1, 2, 3]).map(rotations => (
      tryShifts(board.rotate(piece, rotations))
    )).find()
  );

  const solution = tryRotates(nextPiece);
  if (solution) {
    return brute(solution, _.tail(pieces));
  }
  return false;
};

module.exports = {
  brute
};
