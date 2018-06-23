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
  const merged = _.zip(normBoard, normPiece)
    .map(([rowB, rowA]) => (
      _.zip(rowB, rowA)
        .map(([cellB, cellA]) => (
          isOccupiedCell(cellA)
            ? (isOccupiedCell(cellB) ? '*' : cellA)
            : cellB
        ))
        .join('')
    ));
  const hasConflict = _.some(merged, row => _.includes(row, '*'));
  return hasConflict ? false : merged;
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

const shift = (piece, [deltaX, deltaY]) => (
  shiftDown(shiftRight(piece, deltaX), deltaY)
);

const flip = (piece) => (
  _.reverse(piece)
);

const rotateOnce = (piece) => {
  const width = _.max(_.map(piece, _.size));
  const height = _.size(piece);
  const normPiece = _.map(piece, _.toArray);

  return _.times(width).map(x => (
    _.times(height).map(y => (
      normalizeCell(normPiece[height - 1 - y][x])
    )).join('')
  ));
};

const rotate = (piece, times = 1) => (
  _.reduce(_.times(times), rotateOnce, piece)
);

const regions = (board) => {
  const width = _.max(_.map(board, _.size));
  const height = _.size(board);
  let nextRegion = 'a';

  return _.times(height).reduce((accRegions, y) => {
    return _.concat(accRegions, _.times(width).reduce((accRow, x) => {
      const cell = board[y][x];
      if (isOccupiedCell(cell)) return accRow + '.';

      const regionLeft = _.last(accRow) || '.';
      if (regionLeft !== '.') return accRow + regionLeft;

      const regionUp = _.get(_.last(accRegions) || '', x) || '.';
      if (regionUp !== '.') return accRow + regionUp;

      const res = accRow + nextRegion;
      nextRegion = String.fromCharCode(nextRegion.charCodeAt() + 1);
      return res;
    }, ''));
  }, []);
};

module.exports = {
  empty,
  add,
  shiftRight,
  shiftDown,
  shift,
  flip,
  rotate,
  regions
};
