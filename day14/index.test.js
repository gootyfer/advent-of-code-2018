const chocolateCharts = require('./chocolateCharts');

describe('Chocolate charts', () => {
  it('calculates first board', () => {
    const chart = [3, 7];
    const elves = [0, 1];
    chocolateCharts.getNextChart(chart, elves);
    expect(chart).toEqual([3, 7, 1, 0]);
    expect(elves[0]).toBe(0);
    expect(elves[1]).toBe(1);
  });
  it('calculates second board', () => {
    const chart = [3, 7];
    const elves = [0, 1];
    chocolateCharts.getNextChart(chart, elves);
    chocolateCharts.getNextChart(chart, elves);
    expect(chart).toEqual([3, 7, 1, 0, 1, 0]);
    expect(elves[0]).toBe(4);
    expect(elves[1]).toBe(3);
  });
  it('calculates next 10 recipes after 9 recipes', () => {
    const times = 9;
    const result = chocolateCharts.findTenRecipeScoreAfter(times);
    expect(result).toEqual('5158916779');
  });
  it('calculates next 10 recipes after 5 recipes', () => {
    const times = 5;
    const result = chocolateCharts.findTenRecipeScoreAfter(times);
    expect(result).toEqual('0124515891');
  });
  it('calculates next 10 recipes after 18 recipes', () => {
    const times = 18;
    const result = chocolateCharts.findTenRecipeScoreAfter(times);
    expect(result).toEqual('9251071085');
  });
  it('calculates next 10 recipes after 2018 recipes', () => {
    const times = 2018;
    const result = chocolateCharts.findTenRecipeScoreAfter(times);
    expect(result).toEqual('5941429882');
  });
  it('calculates next 10 recipes after input recipes', () => {
    const times = 30121;
    const result = chocolateCharts.findTenRecipeScoreAfter(times);
    expect(result).toEqual('5101271252');
  });
  it('calculates number of recipes before 51589', () => {
    const pattern = '51589';
    const result = chocolateCharts.findNumberOfRecipesBefore(pattern);
    expect(result).toBe(9);
  });
  it('calculates number of recipes before 01245', () => {
    const pattern = '01245';
    const result = chocolateCharts.findNumberOfRecipesBefore(pattern);
    expect(result).toBe(5);
  });
  it('calculates number of recipes before 92510', () => {
    const pattern = '92510';
    const result = chocolateCharts.findNumberOfRecipesBefore(pattern);
    expect(result).toBe(18);
  });
  it('calculates number of recipes before 59414', () => {
    const pattern = '59414';
    const result = chocolateCharts.findNumberOfRecipesBefore(pattern);
    expect(result).toBe(2018);
  });
  it.only('calculates number of recipes before puzzle input', () => {
    const pattern = '030121';
    const result = chocolateCharts.findNumberOfRecipesBefore(pattern);
    expect(result).toBe(20287556);
  });
});
