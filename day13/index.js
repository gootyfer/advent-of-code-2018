const fs = require('fs');
const mineExplorer = require('./MineExplorer');

fs.readFile('input.txt', 'utf8', (err, data) => {
  const input = data.split('\n');

  //const result = mineExplorer.findFirstCollision(input);

  //console.log(`The result is ${result}`);

  const result = mineExplorer.findLastCart(input);

  console.log(`The result is ${result}`);
});
