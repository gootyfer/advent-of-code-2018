const fs = require('fs');
const comparator = require('./claimsComparator');

fs.readFile('input.txt', 'utf8', (err, data) => {
  const claims = data.trim().split('\n');
  console.log(claims.length);

  const fabric = [];
  claims.map(claim => {
    comparator.addClaim(fabric, claim);
  });
  const result = comparator.countFabricSquareInches(fabric, 'X');

  console.log(`Final result is ${result}`);
});
