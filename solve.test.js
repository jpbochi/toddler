const solve = require('./solve');
const board = require('./board');
const animais = require('./animais');

describe('solve', () => {
  it('no pieces', () => {
    expect(solve.brute(board.empty(), [])).to.eql(board.empty());
  });

  it('one pieces', () => {
    expect(solve.brute(board.empty(), [animais.girafa])).to.eql([
      '..GG........',
      '...G........',
      '...G........',
      '...G........',
      '...G........',
      'GGGG........',
      '.GGG........',
      '.G.G........',
      '.G.G........',
      '............',
      '............',
      '............'
    ]);
  });

  it('two pieces', () => {
    expect(solve.brute(board.empty(), [animais.dinosauro, animais.girafa])).to.eql([
      '.....DD..GG.',
      '......D...G.',
      '......D...G.',
      '......D...G.',
      '...DDDD...G.',
      'DDDDDDDGGGG.',
      '...D..D.GGG.',
      '........G.G.',
      '........G.G.',
      '............',
      '............',
      '............'
    ]);
  });

  it('three pieces', () => {
    expect(solve.brute(board.empty(), [
      animais.dinosauro,
      animais.girafa,
      animais.hipopotamo
    ])).to.eql([
      '.....DD..GG.',
      'HHHHHHD...G.',
      'HHHHHHD...G.',
      '.H.H..D...G.',
      '...DDDD...G.',
      'DDDDDDDGGGG.',
      '...D..D.GGG.',
      '........G.G.',
      '........G.G.',
      '............',
      '............',
      '............'
    ]);
  });

  it('with rotate', () => {
    expect(solve.brute(
      [
        'X.',
        '..'
      ],
      [animais.peixe]
    )).to.eql([
      'XF',
      'FF'
    ]);
  });
});
