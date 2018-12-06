const fs = require('fs');
const areaCalculator = require('./areaCalculator');

fs.readFile('input.txt', 'utf8', (err, data) => {
  const coordinates = data
    .trim()
    .split('\n')
    .map(tuple => tuple.split(', ').map(s => parseInt(s)));

  const result = areaCalculator.calculateLargestArea(coordinates);
  console.log(`The result is ${result}`);

  const size = areaCalculator.calculateRegionSize(coordinates, 10000);
  console.log(`The size is ${size}`);
});
