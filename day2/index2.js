const fs = require('fs');
const { finder } = require('./comparator');

fs.readFile('input.txt', 'utf8', (err, data) => {
  const codes = data.trim().split('\n');
  console.log(codes.length);

  const result = finder(codes);

  console.log(`Final result is ${result}`);
});
