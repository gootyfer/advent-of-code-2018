const fs = require('fs');
const constructionKit = require('./constructionKit');

fs.readFile('input.txt', 'utf8', (err, data) => {
  const steps = data.trim().split('\n');

  const result = constructionKit.calcualteOrder(steps);
  console.log(`The result is ${result}`);

  const workers = 5;
  const extraTime = 60;
  const time = constructionKit.calcualteTime(steps, workers, extraTime);
  console.log(`The time is ${time}`);
});
