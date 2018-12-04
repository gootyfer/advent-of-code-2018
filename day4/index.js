const fs = require('fs');
const guardTimer = require('./guardTimer');

fs.readFile('input.txt', 'utf8', (err, data) => {
  const records = data.trim().split('\n');
  console.log(records.length);

  const guardDays = guardTimer.parse(records);
  const guardId = guardTimer.getMostSleepyGuard(guardDays);
  const minute = guardTimer.getMostSleepyMinute(guardDays, guardId);

  console.log(
    `The guard is ${guardId} and minute is ${minute}, then final result is ${guardId *
      minute}`
  );
});
