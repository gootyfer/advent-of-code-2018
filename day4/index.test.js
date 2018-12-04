const guardTimer = require('./guardTimer');

describe('Best time to sneak finder', () => {
  it('parses guard record with id', () => {
    const record = '[1518-11-01 00:00] Guard #10 begins shift';
    const recordInfo = guardTimer.parseRecord(record);
    expect(recordInfo.id).toBe(10);
    expect(recordInfo.day).toBe('01');
    expect(recordInfo.hours).toBe('00');
    expect(recordInfo.minutes).toBe('00');
  });
  it('parses guard record with sleep', () => {
    const record = '[1518-11-01 00:05] falls asleep';
    const recordInfo = guardTimer.parseRecord(record);
    expect(recordInfo.sleep).toBeTruthy();
    expect(recordInfo.awake).toBeFalsy();
    expect(recordInfo.day).toBe('01');
    expect(recordInfo.hours).toBe('00');
    expect(recordInfo.minutes).toBe('05');
  });

  it('parses guard record with sleep', () => {
    const record = '[1518-11-01 00:25] wakes up';
    const recordInfo = guardTimer.parseRecord(record);
    expect(recordInfo.sleep).toBeFalsy();
    expect(recordInfo.awake).toBeTruthy();
    expect(recordInfo.day).toBe('01');
    expect(recordInfo.hours).toBe('00');
    expect(recordInfo.minutes).toBe('25');
  });

  it('parses records from 1 guard day', () => {
    const records = [
      '[1518-11-01 00:00] Guard #10 begins shift',
      '[1518-11-01 00:05] falls asleep',
      '[1518-11-01 00:25] wakes up',
      '[1518-11-01 00:30] falls asleep',
      '[1518-11-01 00:55] wakes up',
    ];
    const parsedRecords = records.map(guardTimer.parseRecord);
    const guardDay = guardTimer.parseOneDay(parsedRecords);
    expect(guardDay.id).toBe(10);
    expect(guardDay.sleep).toBe(45);
  });

  it('parses records from several guard days', () => {
    const records = [
      '[1518-11-01 00:00] Guard #10 begins shift',
      '[1518-11-01 00:05] falls asleep',
      '[1518-11-01 00:25] wakes up',
      '[1518-11-01 00:30] falls asleep',
      '[1518-11-01 00:55] wakes up',
      '[1518-11-01 23:58] Guard #99 begins shift',
      '[1518-11-02 00:40] falls asleep',
      '[1518-11-02 00:50] wakes up',
      '[1518-11-03 00:05] Guard #10 begins shift',
      '[1518-11-03 00:24] falls asleep',
      '[1518-11-03 00:29] wakes up',
      '[1518-11-04 00:02] Guard #99 begins shift',
      '[1518-11-04 00:36] falls asleep',
      '[1518-11-04 00:46] wakes up',
      '[1518-11-05 00:03] Guard #99 begins shift',
      '[1518-11-05 00:45] falls asleep',
      '[1518-11-05 00:55] wakes up',
    ];
    const guardDays = guardTimer.parse(records);

    expect(guardDays[0].id).toBe(10);
    expect(guardDays[0].sleep).toBe(45);
    expect(guardDays[0].day).toBe('01');
    expect(guardDays[1].id).toBe(99);
    expect(guardDays[1].sleep).toBe(10);
    expect(guardDays[1].day).toBe('02');
    expect(guardDays[2].id).toBe(10);
    expect(guardDays[2].sleep).toBe(5);
    expect(guardDays[2].day).toBe('03');
    expect(guardDays[3].id).toBe(99);
    expect(guardDays[3].sleep).toBe(10);
    expect(guardDays[3].day).toBe('04');
    expect(guardDays[4].id).toBe(99);
    expect(guardDays[4].sleep).toBe(10);
    expect(guardDays[4].day).toBe('05');
  });

  it('calculates the most sleepy guard from records', () => {
    const records = [
      '[1518-11-01 00:00] Guard #10 begins shift',
      '[1518-11-01 00:05] falls asleep',
      '[1518-11-01 00:25] wakes up',
      '[1518-11-01 00:30] falls asleep',
      '[1518-11-01 00:55] wakes up',
      '[1518-11-01 23:58] Guard #99 begins shift',
      '[1518-11-02 00:40] falls asleep',
      '[1518-11-02 00:50] wakes up',
      '[1518-11-03 00:05] Guard #10 begins shift',
      '[1518-11-03 00:24] falls asleep',
      '[1518-11-03 00:29] wakes up',
      '[1518-11-04 00:02] Guard #99 begins shift',
      '[1518-11-04 00:36] falls asleep',
      '[1518-11-04 00:46] wakes up',
      '[1518-11-05 00:03] Guard #99 begins shift',
      '[1518-11-05 00:45] falls asleep',
      '[1518-11-05 00:55] wakes up',
    ];
    const guardDays = guardTimer.parse(records);
    const guardId = guardTimer.getMostSleepyGuard(guardDays);

    expect(guardId).toBe(10);
  });

  it('calculates the most sleepy minute for a guard', () => {
    const records = [
      '[1518-11-01 00:00] Guard #10 begins shift',
      '[1518-11-01 00:05] falls asleep',
      '[1518-11-01 00:25] wakes up',
      '[1518-11-01 00:30] falls asleep',
      '[1518-11-01 00:55] wakes up',
      '[1518-11-01 23:58] Guard #99 begins shift',
      '[1518-11-02 00:40] falls asleep',
      '[1518-11-02 00:50] wakes up',
      '[1518-11-03 00:05] Guard #10 begins shift',
      '[1518-11-03 00:24] falls asleep',
      '[1518-11-03 00:29] wakes up',
      '[1518-11-04 00:02] Guard #99 begins shift',
      '[1518-11-04 00:36] falls asleep',
      '[1518-11-04 00:46] wakes up',
      '[1518-11-05 00:03] Guard #99 begins shift',
      '[1518-11-05 00:45] falls asleep',
      '[1518-11-05 00:55] wakes up',
    ];
    const guardDays = guardTimer.parse(records);
    const minute = guardTimer.getMostSleepyMinute(guardDays, 10);

    expect(minute).toBe(24);
  });

  it('orders the records', () => {
    const unorderedRecords = [
      '[1518-11-01 00:05] falls asleep',
      '[1518-11-02 00:40] falls asleep',
      '[1518-11-01 00:25] wakes up',
      '[1518-11-01 00:30] falls asleep',
      '[1518-11-01 00:00] Guard #10 begins shift',
      '[1518-11-01 00:55] wakes up',
      '[1518-11-01 23:58] Guard #99 begins shift',
      '[1518-11-03 00:29] wakes up',
      '[1518-11-02 00:50] wakes up',
      '[1518-11-03 00:05] Guard #10 begins shift',
      '[1518-11-03 00:24] falls asleep',
      '[1518-11-05 00:55] wakes up',
      '[1518-11-04 00:02] Guard #99 begins shift',
      '[1518-11-04 00:36] falls asleep',
      '[1518-11-04 00:46] wakes up',
      '[1518-11-05 00:03] Guard #99 begins shift',
      '[1518-11-05 00:45] falls asleep',
    ];

    const parsedRecords = unorderedRecords.map(guardTimer.parseRecord);
    const orderedRecords = guardTimer.orderRecords(parsedRecords);

    expect(orderedRecords[0].id).toBe(10);
    expect(orderedRecords[0].month).toBe('11');
    expect(orderedRecords[0].day).toBe('01');
  });

  it('calculates most sleepy guard and minute with unordered the records', () => {
    const unorderedRecords = [
      '[1518-11-01 00:05] falls asleep',
      '[1518-11-02 00:40] falls asleep',
      '[1518-11-01 00:25] wakes up',
      '[1518-11-01 00:30] falls asleep',
      '[1518-11-01 00:00] Guard #10 begins shift',
      '[1518-11-01 00:55] wakes up',
      '[1518-11-01 23:58] Guard #99 begins shift',
      '[1518-11-03 00:29] wakes up',
      '[1518-11-02 00:50] wakes up',
      '[1518-11-03 00:05] Guard #10 begins shift',
      '[1518-11-03 00:24] falls asleep',
      '[1518-11-05 00:55] wakes up',
      '[1518-11-04 00:02] Guard #99 begins shift',
      '[1518-11-04 00:36] falls asleep',
      '[1518-11-04 00:46] wakes up',
      '[1518-11-05 00:03] Guard #99 begins shift',
      '[1518-11-05 00:45] falls asleep',
    ];

    const guardDays = guardTimer.parse(unorderedRecords);
    const guardId = guardTimer.getMostSleepyGuard(guardDays);
    expect(guardId).toBe(10);
    const minute = guardTimer.getMostSleepyMinute(guardDays, guardId);
    expect(minute).toBe(24);
  });

  it('calculates the most sleepy minute for any guard', () => {
    const records = [
      '[1518-11-01 00:00] Guard #10 begins shift',
      '[1518-11-01 00:05] falls asleep',
      '[1518-11-01 00:25] wakes up',
      '[1518-11-01 00:30] falls asleep',
      '[1518-11-01 00:55] wakes up',
      '[1518-11-01 23:58] Guard #99 begins shift',
      '[1518-11-02 00:40] falls asleep',
      '[1518-11-02 00:50] wakes up',
      '[1518-11-03 00:05] Guard #10 begins shift',
      '[1518-11-03 00:24] falls asleep',
      '[1518-11-03 00:29] wakes up',
      '[1518-11-04 00:02] Guard #99 begins shift',
      '[1518-11-04 00:36] falls asleep',
      '[1518-11-04 00:46] wakes up',
      '[1518-11-05 00:03] Guard #99 begins shift',
      '[1518-11-05 00:45] falls asleep',
      '[1518-11-05 00:55] wakes up',
    ];
    const guardDays = guardTimer.parse(records);
    const result = guardTimer.getMostSleepyMinuteAndGuardId(guardDays);

    expect(result).toBe('99@45');
  });
});
