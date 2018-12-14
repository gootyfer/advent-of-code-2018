const getNextChart = (chart, elves) => {
  const nextRecipe = chart[elves[0]] + chart[elves[1]];
  if (nextRecipe < 10) chart.push(nextRecipe);
  else chart.push(1, nextRecipe % 10);
  elves[0] = (elves[0] + chart[elves[0]] + 1) % chart.length;
  elves[1] = (elves[1] + chart[elves[1]] + 1) % chart.length;
  if (elves[0] === elves[1]) console.log('COLISSSION');
};

const findTenRecipeScoreAfter = times => {
  const chart = [3, 7];
  const elves = [0, 1];
  while (chart.length < times + 10) {
    getNextChart(chart, elves);
  }
  return chart.slice(times, times + 10).join('');
};

const findPattern = (chart, pattern) =>
  chart.slice(-(pattern.length + 1)).includes(pattern);

const findNumberOfRecipesBefore = pattern => {
  const chart = [3, 7];
  const elves = [0, 1];
  let i = 0;
  console.time();
  while (!findPattern(chart, pattern) && i++ < 20000000) {
    getNextChart(chart, elves);
  }
  console.timeEnd();
  console.log('length', chart.length);

  return chart.join('').indexOf(pattern);
};

module.exports = {
  getNextChart,
  findTenRecipeScoreAfter,
  findNumberOfRecipesBefore,
};
