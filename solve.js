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
    for (var y in yShifts) {
      for (var x in xShifts) {
        const partial = board.add(current, board.shift(piece, [x, y]));
        if (partial) {
          const solution = brute(partial, _.tail(pieces));
          if (solution) return solution;
        }
      }
    }
    return false;
  };

  const tryRotates = (piece) => (
    _([0, 1, 2, 3]).map(rotations => (
      tryShifts(board.rotate(piece, rotations))
    )).find()
  );

  const tryFlip = (piece) => (
    tryRotates(piece) || tryRotates(board.flip(piece))
  );

  return tryFlip(nextPiece);
};

module.exports = {
  brute
};
