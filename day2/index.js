const fs = require('fs');
const counter = require('./counter');

fs.readFile('input.txt', 'utf8', (err, data) => {
  const codes = data.trim().split('\n');
  console.log(codes.length);

  let dups = 0;
  let trips = 0;

  codes.map(code => {
    const result = counter(code);
    if (result.dup) dups++;
    if (result.trip) trips++;
  });

  console.log(`Final result is ${dups} and ${trips}, checksum ${dups * trips}`);
});
