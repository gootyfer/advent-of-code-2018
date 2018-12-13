const plantEvolution = require('./plantEvolution');
describe('Plant Evolution', () => {
  const initialState = 'initial state: #..#.#..##......###...###';
  const rules = [
    '...## => #',
    '..#.. => #',
    '.#... => #',
    '.#.#. => #',
    '.#.## => #',
    '.##.. => #',
    '.#### => #',
    '#.#.# => #',
    '#.### => #',
    '##.#. => #',
    '##.## => #',
    '###.. => #',
    '###.# => #',
    '####. => #',
  ];
  it('parses initial state from input', () => {
    const result = plantEvolution.parseState(initialState);
    expect(result[0]).toBe('#');
    expect(result[1]).toBe('.');
  });
  it('parses rules', () => {
    const result = plantEvolution.parseRules(rules);
    expect(result['...##']).toBe('#');
    expect(result['.####']).toBe('#');
  });
  it('apply rules once', () => {
    const state = plantEvolution.parseState(initialState);
    const parsedRules = plantEvolution.parseRules(rules);
    const { result } = plantEvolution.applyRules(state, parsedRules);

    expect(result[3]).toBe('.');
    expect(result[4]).toBe('#');
  });
  it('apply rules 20 times', () => {
    const state = plantEvolution.parseState(initialState);
    const parsedRules = plantEvolution.parseRules(rules);
    const { result, pad } = plantEvolution.applyRulesTimes(
      state,
      parsedRules,
      20
    );
    expect(pad).toBe(2);
    expect(result[0]).toBe('#');
    expect(result[1]).toBe('.');
  });

  it('calculates result after 20 evolutions', () => {
    const state = plantEvolution.parseState(initialState);
    const parsedRules = plantEvolution.parseRules(rules);
    const result = plantEvolution.evolute(state, parsedRules, 20);
    expect(result).toBe(325);
  });

  it('prunes a result', () => {
    const state = '......#..##.....#.#...#.#..#..##.#..';
    const result = plantEvolution.prune(state);
    expect(result).toBe('#..##.....#.#...#.#..#..##.#');
  });

  it('calculate final result, example', () => {
    const gen = 117;
    const result = plantEvolution.calculateFinalResult(gen);
    expect(result).toBe(10317);
  });
  it('calculate final result, final', () => {
    const gen = 50000000000;
    const result = plantEvolution.calculateFinalResult(gen);
    expect(result).toBe(3650000001776);
  });
});
