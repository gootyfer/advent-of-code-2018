const fs = require('fs');
const comparator = require('./claimsComparator');

fs.readFile('input.txt', 'utf8', (err, data) => {
  const claims = data.trim().split('\n');
  console.log(claims.length);

  const fabric = [];
  claims.map(claim => {
    comparator.addClaim(fabric, claim);
  });

  let result;

  claims.map(claimText => {
    const claim = comparator.parse(claimText);
    const count = comparator.countFabricSquareInches(fabric, claim.id);
    if (count === claim.width * claim.height) result = claim.id;
  });

  console.log(`Final result is ${result}`);
});
