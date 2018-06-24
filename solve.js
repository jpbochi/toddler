const _ = require('lodash');
const board = require('./board');

const brute = (current, pieces, areaOfSmallerPiece = 0) => {
  const width = _.max(_.map(current, _.size));
  const height = _.size(current);

  const nextPiece = _.head(pieces);
  if (!nextPiece) {
    return current;
  }

  const otherPieces = _.tail(pieces);
  areaOfSmallerPiece = areaOfSmallerPiece || _(otherPieces)
    .map(board.areas)
    .map(areas => _.omit(areas, '.'))
    .map(_.values)
    .map(_.head)
    .min() || 0;

  const areas = _.values(board.areas(board.regions(current)));
  if (_.min(areas) < areaOfSmallerPiece) { // assuming no space is left unoccupied
    return false;
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
          const solution = brute(partial, otherPieces, areaOfSmallerPiece);
          if (solution) return solution;
        }
      }
    }
    return false;
  };

  const tryRotates = (piece) => {
    for (var rotations in [0, 1, 2, 3]) {
      const solution = tryShifts(board.rotate(piece, rotations));
      if (solution) return solution;
    }
    return false;
  };

  const tryFlip = (piece) => (
    tryRotates(piece) || tryRotates(board.flip(piece))
  );

  return tryFlip(nextPiece);
};

module.exports = {
  brute
};
