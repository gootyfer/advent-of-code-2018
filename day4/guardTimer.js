const parseRecord = record => {
  const date = record.match(/(\d{2})-(\d{2}) (\d{2}):(\d{2})/);
  const id = record.match(/Guard #(\d+)/);
  const awake = record.match(/wakes/);
  const sleep = record.match(/asleep/);

  return {
    id: id ? parseInt(id[1]) : null,
    awake: !!awake,
    sleep: !!sleep,
    month: date[1],
    day: date[2],
    hours: date[3],
    minutes: date[4],
  };
};

const fillRange = (start, end) => {
  return Array(end - start + 1)
    .fill()
    .map((item, index) => start + index);
};

const parseOneDay = parsedRecords =>
  parsedRecords.reduce((acc, curr) => {
    if (curr.id) return { ...acc, id: curr.id, sleep: 0, sleepMinutes: [] };
    if (curr.sleep) return { ...acc, minutes: parseInt(curr.minutes) };
    if (curr.awake)
      return {
        ...acc,
        minutes: 0,
        sleep: acc.sleep + (parseInt(curr.minutes) - acc.minutes),
        sleepMinutes: [
          ...acc.sleepMinutes,
          ...fillRange(acc.minutes, parseInt(curr.minutes) - 1),
        ],
        day: curr.day,
      };
  }, {});

const timestamp = r => parseInt('' + r.month + r.day + r.hours + r.minutes);

const orderRecords = parsedRecords => {
  return parsedRecords.sort((a, b) => timestamp(a) - timestamp(b));
};

const parse = records => {
  const parsedRecords = records.map(parseRecord);
  const orderedRecords = orderRecords(parsedRecords);

  const result = [];
  const lastDay = orderedRecords.reduce((acc, curr) => {
    if (curr.id) {
      if (acc.length) result.push(parseOneDay(acc));
      return [curr];
    }
    return [...acc, curr];
  }, []);
  result.push(parseOneDay(lastDay));
  return result;
};

const getMax = object =>
  Object.keys(object).reduce((acc, curr) =>
    object[acc] >= object[curr] ? acc : curr
  );
const getMostSleepyGuard = guardDays => {
  const sleepTime = guardDays.reduce((acc, curr) => {
    if (!acc[curr.id]) acc[curr.id] = 0;
    return { ...acc, [curr.id]: acc[curr.id] + curr.sleep };
  }, {});

  return parseInt(getMax(sleepTime));
};

const getMostSleepyMinute = (guardDays, guardId) => {
  const minutes = guardDays
    .filter(guardDay => guardDay.id === guardId)
    .reduce((acc, curr) => {
      curr.sleepMinutes.map(n => {
        if (!acc[n]) {
          acc[n] = 1;
        } else {
          acc[n] += 1;
        }
      });
      return acc;
    }, {});
  return parseInt(getMax(minutes));
};

const getMostSleepyMinuteAndGuardId = guardDays => {
  const minutes = guardDays.reduce((acc, curr) => {
    curr.sleepMinutes.map(n => {
      const id = curr.id + '@' + n;
      if (!acc[id]) {
        acc[id] = 1;
      } else {
        acc[id] += 1;
      }
    });
    return acc;
  }, {});
  return getMax(minutes);
};

module.exports = {
  parseOneDay,
  parseRecord,
  parse,
  getMostSleepyGuard,
  getMostSleepyMinute,
  orderRecords,
  getMostSleepyMinuteAndGuardId,
};
