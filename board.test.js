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

  it('shifts hipopotamo right', () => {
    expect(board.shiftRight(animais.hipopotamo, 3)).to.eql([
      '...HHHHHH',
      '...HHHHHH',
      '....H.H..'
    ]);
  });

  it('shifts crocodilo down', () => {
    expect(board.shiftDown(animais.crocodilo, 2)).to.eql([
      '',
      '',
      'CCCCC',
      'C.C'
    ]);
  });

  it('flips elefante', () => {
    expect(board.flip(animais.elefante)).to.eql([
      'E..E.E',
      'E..E.E',
      'EEEE.E',
      'EEEEEE',
      'EEEEEE'
    ]);
  });
});
