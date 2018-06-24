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
    expect(solve.brute(board.empty(), [animais.dinosauro, animais.girafa], 2)).to.eql([
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
    ], 2)).to.eql([
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
      [animais.elefante, animais.camelo], 1
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

  it('with five', () => {
    expect(solve.brute(board.empty(), _.take(_.values(animais), 5), 3)).to.eql([
      '..GGEEEEEE..',
      '...GEEEEEE..',
      '...GEEEE.EDD',
      '...GE..E.E.D',
      '...GE..E.E.D',
      'GGGG.......D',
      '.GGG....DDDD',
      '.GMGMDDDDDDD',
      '.GMGM...D..D',
      '..M.M.H.H...',
      '.MMMMHHHHHH.',
      'MM.M.HHHHHH.'
    ]);
  });

  it('with six', () => { // 6 takes 2 sec
    expect(solve.brute(board.empty(), _.take(_.values(animais), 6), 3)).to.eql([
      '..GGEEEEEE..',
      '...GEEEEEE..',
      '...GEEEEMEM.',
      '...GE..EMEM.',
      '...GE..EMEM.',
      'GGGG.D.MMMM.',
      '.GGG.DMM.MHH',
      '.G.G.DZZZHHH',
      '.G.GDDD.Z.HH',
      '....DD..ZHHH',
      'D...DDZZZZHH',
      'DDDDDDD..ZHH'
    ]);
  });

  it.skip('with seven', () => { // 7 takes 4 min
    expect(solve.brute(board.empty(), _.take(_.values(animais), 7), 3)).to.eql([
      'EEEEEE....GG',
      'EEEEEEZZ...G',
      'EEEEMEMZZZZG',
      'EDDEMEMZ..ZG',
      'ED.EMEMZ..ZG',
      '.D..MMMMGGGG',
      '.D...M.MMGGG',
      '.DDDD....G.G',
      '.DDDDDDD.G.G',
      '.DU.DU.H.H..',
      '..UUUUHHHHHH',
      '.UUUUUHHHHHH'
    ]);
  });

  it.skip('with nine', () => { // done in ~2 hours~ 10 min
    expect(solve.brute(board.empty(), _.take(_.values(animais), 9), 3)).to.eql([
      'HHDDDDDDD.GG',
      'HHDZZZDD..BG',
      'HHH..ZDDBBBG',
      'HH...ZDDDBBG',
      'HHHZZZZDBBBG',
      'HHMMMMZDGGGG',
      'EEEEEMMD.GGG',
      'EEMMMM...GCG',
      'EEEEEMM..GCG',
      'EEE..UM.U.CC',
      'EEE..UUUU.C.',
      'EEEEEUUUUUCC'
    ]);
  });

  it.skip('with ten', () => { // done in 10 min (almost tied with 9 pieces!)
    expect(solve.brute(board.empty(), _.take(_.values(animais), 10), 3)).to.eql([
      'HHDDDDDDD.GG',
      'HHDZZZDD..BG',
      'HHH..ZDDBBBG',
      'HH...ZDDDBBG',
      'HHHZZZZDBBBG',
      'HHMMMMZDGGGG',
      'EEEEEMMDUGGG',
      'EEMMMMUUUG.G',
      'EEEEEMMUUG.G',
      'EEEPPPMUU...',
      'EEEPPPUUUC.C',
      'EEEEEPPCCCCC'
    ]);
  });

  it.skip('all', () => { // done in 10m6.711s
    expect(solve.brute(board.empty(), _.values(animais))).to.eql([
      'HHDDDDDDDFGG',
      'HHDZZZDDFFBG',
      'HHHOOZDDBBBG',
      'HHOOOZDDDBBG',
      'HHHZZZZDBBBG',
      'HHMMMMZDGGGG',
      'EEEEEMMDUGGG',
      'EEMMMMUUUGXG',
      'EEEEEMMUUGXG',
      'EEEPPPMUUXXX',
      'EEEPPPUUUCXC',
      'EEEEEPPCCCCC'
    ]);
  });
});
