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

  it('elephant and camel', () => {
    expect(solve.brute(
      [
        '.......',
        '.......',
        '.......',
        '.......',
        '.......',
        'X......',
        'XX....X'
      ],
      [animais.elefante, animais.camelo]
    )).to.eql([
      'EEEEEE.',
      'EEEEEE.',
      'EEEEMEM',
      'E..EMEM',
      'E..EMEM',
      'X..MMMM',
      'XXMM.MX'
    ]);
  });

  it.skip('with several', () => { // 9 takes 2 hours
    expect(solve.brute(board.empty(), _.take(_.values(animais), 9))).to.eql([
      'U.GG..HHHHHH',
      'UUUGDDHHHHHH',
      'UU.GDZ.HZHCC',
      'UU.GDZ..Z..C',
      'UUUGDZZZZ.CC',
      'GGGGDDDDZZ.C',
      '.GGGDDDDDDDC',
      'EGEGDEMDMBBB',
      'EGEG.EM.M.BB',
      'E.EEEEM.MBBB',
      'EEEEEEMMMM.B',
      'EEEEEE.M.MM.'
    ]);
  });

  it.skip('all', () => {
    expect(solve.brute(board.empty(), _.values(animais))).to.eql(['???']);
  });
});
