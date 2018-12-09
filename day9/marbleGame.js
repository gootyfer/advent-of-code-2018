const placeMarble = (number, board, index, result) => {
  let nextIndex;
  if (number % 23 === 0) {
    nextIndex = (index - 7 + board.length) % board.length;
    const points = board.splice(nextIndex, 1)[0] + number;
    result[(number - 1) % result.length] += points;
  } else {
    nextIndex = (index + 2) % board.length || board.length;
    board.splice(nextIndex, 0, number);
  }
  //console.log(((number - 1) % result.length) + 1, board);
  return nextIndex;
};

const simulateGame = (players, marbles) => {
  const result = new Array(players).fill(0);
  const board = [0];
  let index = 0;
  for (let n = 1; n <= marbles; n++) {
    index = placeMarble(n, board, index, result);
  }

  return Math.max(...result);
};

module.exports = {
  placeMarble,
  simulateGame,
};
