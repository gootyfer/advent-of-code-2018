const parseState = state => state.match(/initial state: (.*)/)[1];

const parseRules = rules =>
  rules.reduce((obj, rule) => {
    const parsed = rule.match(/(.*) => (.)/);
    obj[parsed[1]] = parsed[2];
    return obj;
  }, {});

const pad = state => '....' + state + '....';

const pruneInit = state => (state.startsWith('..') ? state.slice(2) : state);

const sliceSize = 5;

const applyRules = (state, parsedRules) => {
  const padedState = pad(state);
  let result = '';

  for (let i = 0; i < padedState.length - sliceSize; i++) {
    result += parsedRules[padedState.slice(i, i + sliceSize)] || '.';
  }
  const prunedResult = pruneInit(result);
  return {
    result: prunedResult,
    pruned: result.length !== prunedResult.length,
  };
};

const applyRulesTimes = (state, parsedRules, times) => {
  let result = state;
  let pad = 0;
  for (let i = 0; i < times; i++) {
    const nextGen = applyRules(result, parsedRules);
    result = nextGen.result;
    //console.log(i, prune(result).length, countPlants(result));

    if (!nextGen.pruned) pad += 2;
  }

  return { result, pad };
};

const countPlants = state =>
  state.split('').reduce((sum, plant) => (plant === '#' ? sum + 1 : sum), 0);

const evolute = (state, parsedRules, times) => {
  const { result, pad } = applyRulesTimes(state, parsedRules, times);
  return calculateResult(result, pad);
};

const calculateResult = (result, pad) =>
  result
    .split('')
    .reduce((sum, plant, i) => (plant === '#' ? sum + i - pad : sum), 0);

const prune = state => state.replace(/^\.+|\.+$/g, '');

const findRepetition = (state, parsedRules, times) => {
  const generations = [];

  let result = state;
  let pad = 0;

  for (let i = 0; i < times; i++) {
    const nextGen = applyRules(result, parsedRules);
    result = nextGen.result;
    console.log(
      i + 1,
      calculateResult(result, pad),
      countPlants(result),
      prune(result).length,
      result.indexOf('#'),
      prune(result)
    );

    generations.push(prune(result).length);
    if (!nextGen.pruned) pad += 2;
  }

  return generations[generations.length - 1];
};

const calculateFinalResult = gen => {
  const state =
    '#..##.#..##.#..##.#..##.#..##.#..##.#..##.#..##.#..##.#..##.#..##.#..##.#..##.#..##.#..##.#..##.#..##.#..##.#..##.#..##.#..##.#..##.#..##.#..##.#';
  //index:117 result:10317 plants:73 length:145 pad:73
  const pad = 4 - (gen - 44);
  return calculateResult(state, pad);
};

module.exports = {
  parseState,
  parseRules,
  applyRules,
  applyRulesTimes,
  evolute,
  prune,
  findRepetition,
  calculateFinalResult,
};
