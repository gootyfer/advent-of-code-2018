const fs = require('fs');
const guardTimer = require('./guardTimer');

fs.readFile('input.txt', 'utf8', (err, data) => {
  const records = data.trim().split('\n');
  console.log(records.length);

  const guardDays = guardTimer.parse(records);
  const result = guardTimer.getMostSleepyMinuteAndGuardId(guardDays);
  const [guardId, minute] = result.split('@');

  console.log(
    `The guard is ${guardId} and minute is ${minute}, then final result is ${guardId *
      minute}`
  );
});
