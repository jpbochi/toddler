const _ = require('lodash');

const empty = () => {
  return [
    '............',
    '............',
    '............',
    '............',
    '............',
    '............',
    '............',
    '............',
    '............',
    '............',
    '............',
    '............',
  ];
};

const isOccupiedCell = (cell) => (!!cell && (cell !== '.'));
const normalizeCell = (cell) => (isOccupiedCell(cell) ? cell : '.');

const add = (board, piece) => {
  const normBoard = _.map(board, _.toArray);
  const normPiece = _.map(piece, _.toArray);
  return _.zip(normBoard, normPiece)
    .map(([rowB, rowA]) => (
      _.zip(rowB, rowA)
        .map(([cellB, cellA]) => (
          isOccupiedCell(cellA) ? cellA : cellB
        ))
        .join('')
    ));
};

const shiftRight = (piece, delta) => (
  _.map(piece, row => (
    _.repeat('.', delta) + row
  ))
);

const shiftDown = (piece, delta) => (
  _.concat(
    _.times(delta).map(() => ''),
    piece
  )
);

const flip = (piece) => (
  _.reverse(piece)
);

const rotate = (piece) => {
  const width = _.max(_.map(piece, _.size));
  const height = _.size(piece);
  const normPiece = _.map(piece, _.toArray);

  return _.times(width).map(x => (
    _.times(height).map(y => (
      normalizeCell(normPiece[height - 1 - y][x])
    )).join('')
  ));
};

module.exports = {
  empty,
  add,
  shiftRight,
  shiftDown,
  flip,
  rotate
};
