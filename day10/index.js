const fs = require('fs');
const starTracker = require('./starTracker');

fs.readFile('input.txt', 'utf8', (err, data) => {
  const stars = data.trim().split('\n');

  const parsedStars = starTracker.parseStars(stars);
  const limits = starTracker.getLimits(parsedStars);
  starTracker.placeOnMap(parsedStars, limits);
  //IDEA: re-calculate limits and expect limits to be narrow
  let result = { parsedStars };
  const MAX = 70;
  let i = 0;
  do {
    result = starTracker.moveStars(result.parsedStars);
    i++;
  } while (result.limits.x > MAX || result.limits.y > MAX);

  starTracker.drawMap(result.map, result.limits);
  console.log(`The result is ${i}`);
});
