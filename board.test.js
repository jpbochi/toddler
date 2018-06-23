const board = require('./board');
const animais = require('./animais');

describe('board', () => {
  it('creates empty 12x12 board', () => {
    expect(board.empty()).to.eql([
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
      '............'
    ]);
  });

  it('adds dinosauro to board 12x12 board', () => {
    expect(board.add(board.empty(), animais.dinosauro)).to.eql([
      '.....DD.....',
      '......D.....',
      '......D.....',
      '......D.....',
      '...DDDD.....',
      'DDDDDDD.....',
      '...D..D.....',
      '............',
      '............',
      '............',
      '............',
      '............'
    ]);
  });
});
