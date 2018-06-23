const _ = require('lodash');
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

  it('with flip', () => {
    expect(solve.brute(
      [
        'XX.',
        'X..',
        'X..'
      ],
      [animais.caracol]
    )).to.eql([
      'XXO',
      'XOO',
      'XOO'
    ]);
  });

  it('camel after elephant', () => {
    expect(solve.brute(
      [
        'EEEEEE.',
        'EEEEEE.',
        'EEEE.E.',
        'E..E.E.',
        'E..E.E.',
        '.......',
        '.......'
      ],
      [animais.camelo]
    )).to.eql([
      'EEEEEE.',
      'EEEEEE.',
      'EEEEMEM',
      'E..EMEM',
      'E..EMEM',
      '...MMMM',
      '..MM.M.'
    ]);
  });

  it.skip('elephant and camel', () => {
    expect(solve.brute(
      [
        '........',
        '........',
        '........',
        '........',
        '........',
        '........',
        '........'
      ],
      [animais.elefante, animais.camelo]
    )).to.eql([
      'EEEEEE.',
      'EEEEEE.',
      'EEEEMEM',
      'E..EMEM',
      'E..EMEM',
      '...MMMM',
      '..MM.M.'
    ]);
  });

  it.skip('with several', () => {
    expect(solve.brute(board.empty(), _.take(_.values(animais), 5))).to.eql(['???']);
  });

  it.skip('all', () => {
    expect(solve.brute(board.empty(), _.values(animais))).to.eql(['???']);
  });
});
