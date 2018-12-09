const marbleGame = require('./marbleGame');

const players = 465;
const marbles = 71498 * 100;

const result = marbleGame.simulateGame(players, marbles);

console.log(`The result is ${result}`);
