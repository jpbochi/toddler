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

module.exports = {
  empty,
  add,
  shiftRight,
  shiftDown
};
