const constructionKit = require('./constructionKit');

describe('Sleigh construction kit', () => {
  it('parses steps to array', () => {
    const steps = [
      'Step C must be finished before step A can begin.',
      'Step C must be finished before step F can begin.',
      'Step A must be finished before step B can begin.',
      'Step A must be finished before step D can begin.',
      'Step B must be finished before step E can begin.',
      'Step D must be finished before step E can begin.',
      'Step F must be finished before step E can begin.',
    ];
    const result = constructionKit.parseSteps(steps);
    expect(result[0][0]).toBe('C');
    expect(result[0][1]).toBe('A');
  });
  it('creates tree data structure', () => {
    const steps = [
      'Step C must be finished before step A can begin.',
      'Step C must be finished before step F can begin.',
      'Step A must be finished before step B can begin.',
      'Step A must be finished before step D can begin.',
      'Step B must be finished before step E can begin.',
      'Step D must be finished before step E can begin.',
      'Step F must be finished before step E can begin.',
    ];
    const result = constructionKit.parseToTree(steps);
    expect(result['A']).toContain('C');
    expect(result['B']).toContain('A');
    expect(result['C'].size).toBe(0);
    expect(result['D']).toContain('A');
    expect(result['E']).toContain('B');
    expect(result['E']).toContain('D');
    expect(result['E']).toContain('F');
    expect(result['F']).toContain('C');
  });
  it('caclculates step name', () => {
    const steps = [
      'Step C must be finished before step A can begin.',
      'Step C must be finished before step F can begin.',
      'Step A must be finished before step B can begin.',
      'Step A must be finished before step D can begin.',
      'Step B must be finished before step E can begin.',
      'Step D must be finished before step E can begin.',
      'Step F must be finished before step E can begin.',
    ];
    const names = constructionKit.stepNames(steps);
    expect(names).toMatchObject(new Set('ABCDEF'.split('')));
  });
  it('calculates steps order', () => {
    const steps = [
      'Step C must be finished before step A can begin.',
      'Step C must be finished before step F can begin.',
      'Step A must be finished before step B can begin.',
      'Step A must be finished before step D can begin.',
      'Step B must be finished before step E can begin.',
      'Step D must be finished before step E can begin.',
      'Step F must be finished before step E can begin.',
    ];
    const result = constructionKit.calcualteOrder(steps);
    expect(result).toBe('CABDFE');
  });
  it('calculates time to finish with 2 workers and 0 extra time per task', () => {
    const steps = [
      'Step C must be finished before step A can begin.',
      'Step C must be finished before step F can begin.',
      'Step A must be finished before step B can begin.',
      'Step A must be finished before step D can begin.',
      'Step B must be finished before step E can begin.',
      'Step D must be finished before step E can begin.',
      'Step F must be finished before step E can begin.',
    ];
    const workers = 2;
    const extraTime = 0;
    const result = constructionKit.calcualteTime(steps, workers, extraTime);
    expect(result).toBe(15);
  });
});
