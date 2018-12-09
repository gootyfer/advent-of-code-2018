const marbleGame = require('./marbleGame');

describe('Marble Game', () => {
  it('places marble 1 in the cicle', () => {
    const board = [0];
    const index = 0;
    const result = marbleGame.placeMarble(1, board, index);
    expect(board).toEqual([0, 1]);
    expect(result).toBe(1);
  });

  it('places marble 2 in the cicle', () => {
    const board = [0];
    let index = 0;
    index = marbleGame.placeMarble(1, board, index);
    const result = marbleGame.placeMarble(2, board, index);
    expect(board).toEqual([0, 2, 1]);
    expect(result).toBe(1);
  });

  it('places marble 3 in the cicle', () => {
    const board = [0];
    let index = 0;
    index = marbleGame.placeMarble(1, board, index);
    index = marbleGame.placeMarble(2, board, index);
    const result = marbleGame.placeMarble(3, board, index);
    expect(board).toEqual([0, 2, 1, 3]);
    expect(result).toBe(3);
  });
  it('places 22 marbles in the circle', () => {
    const board = [0];
    let index = 0;
    for (let n = 1; n < 23; n++) {
      index = marbleGame.placeMarble(n, board, index);
    }

    expect(board).toEqual([
      0,
      16,
      8,
      17,
      4,
      18,
      9,
      19,
      2,
      20,
      10,
      21,
      5,
      22,
      11,
      1,
      12,
      6,
      13,
      3,
      14,
      7,
      15,
    ]);
    expect(index).toBe(13);
  });
  it('places marble 23 in the circle', () => {
    const result = new Array(5).fill(0);
    const board = [0];
    let index = 0;
    for (let n = 1; n <= 23; n++) {
      index = marbleGame.placeMarble(n, board, index, result);
    }
    expect(board).toEqual([
      0,
      16,
      8,
      17,
      4,
      18,
      19,
      2,
      20,
      10,
      21,
      5,
      22,
      11,
      1,
      12,
      6,
      13,
      3,
      14,
      7,
      15,
    ]);
    expect(index).toBe(6);
  });

  it('simulates a game with 9 players', () => {
    const players = 9;
    const marbles = 25;
    const result = marbleGame.simulateGame(players, marbles);
    expect(result).toBe(32);
  });
  it('simulates a game with 9 players, 48', () => {
    const players = 9;
    const marbles = 48;
    const result = marbleGame.simulateGame(players, marbles);
    expect(result).toBe(63);
  });
  it('simulates a game with 1 players, 48', () => {
    const players = 1;
    const marbles = 48;
    const result = marbleGame.simulateGame(players, marbles);
    expect(result).toBe(95);
  });
  it('simulates a game with 10 players', () => {
    const players = 10;
    const marbles = 1618;
    const result = marbleGame.simulateGame(players, marbles);
    expect(result).toBe(8317);
  });
  it('simulates a game with 13 players', () => {
    const players = 13;
    const marbles = 7999;
    const result = marbleGame.simulateGame(players, marbles);
    expect(result).toBe(146373);
  });
  it('simulates a game with 17 players', () => {
    const players = 17;
    const marbles = 1104;
    const result = marbleGame.simulateGame(players, marbles);
    expect(result).toBe(2764);
  });
  it('simulates a game with 21 players', () => {
    const players = 21;
    const marbles = 6111;
    const result = marbleGame.simulateGame(players, marbles);
    expect(result).toBe(54718);
  });

  it('simulates a game with 30 players', () => {
    const players = 30;
    const marbles = 5807;
    const result = marbleGame.simulateGame(players, marbles);
    expect(result).toBe(37305);
  });
  it('simulates a game with 465 players', () => {
    const players = 465;
    const marbles = 71498;
    const result = marbleGame.simulateGame(players, marbles);
    expect(result).toBe(383475);
  });
  it.only('simulates a game with 465 players', () => {
    const players = 465;
    const marbles = 7149800;
    const result = marbleGame.simulateGame(players, marbles);
    expect(result).toBe(383475);
  });
});
