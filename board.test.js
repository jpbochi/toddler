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

  it('adds two pieces', () => {
    const withDino = board.add(board.empty(), animais.dinosauro);
    expect(board.add(withDino, animais.ursoBranco)).to.eql([
      'BBBB.DD.....',
      'BBB...D.....',
      'B.B...D.....',
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

  it('adds with conflict', () => {
    const withDino = board.add(board.empty(), animais.dinosauro);
    expect(board.add(withDino, animais.elefante)).to.eql(false);
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

  it('shifts pato right and down', () => {
    expect(board.shift(animais.pato, [2, 3])).to.eql([
      '',
      '',
      '',
      '....PP',
      '..PPP',
      '..PPP'
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

  it('rotates girafa', () => {
    expect(board.rotate(animais.girafa)).to.eql([
      '...G.....',
      'GGGG.....',
      '..GG....G',
      'GGGGGGGGG',
    ]);
  });

  it('rotates twice girafa', () => {
    expect(board.rotate(animais.girafa, 2)).to.eql([
      'G.G.',
      'G.G.',
      'GGG.',
      'GGGG',
      'G...',
      'G...',
      'G...',
      'G...',
      'GG..'
    ]);
  });

  it('rotates camelo', () => {
    expect(board.rotate(animais.camelo, 3)).to.eql([
      'M....',
      'MM...',
      '.MMMM',
      'MM...',
      '.MMMM'
    ]);
  });

  it('finds simple regions', () => {
    expect(board.regions([
      'M....',
      'MM...',
      '.MMMM',
      'MM...',
      '.MMMM'
    ])).to.eql([
      '.aaaa',
      '..aaa',
      'b....',
      '..ccc',
      'd....'
    ]);
  });
});
