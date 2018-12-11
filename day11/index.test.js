const powerCalculator = require('./powerCalculator');

describe('Power Calculator', () => {
  it('calculates power for one cell', () => {
    const cell = [3, 5];
    const serialNumber = 8;
    const result = powerCalculator.getPowerCell(cell, serialNumber);
    expect(result).toBe(4);
  });
  it('calculates power for a 3x3 cell', () => {
    const cell = [33, 45];
    const serialNumber = 18;
    const calculatedPowers = powerCalculator.calculatePowers(serialNumber);
    const result = powerCalculator.getPowerCellGridFromCalculatedPowers(
      cell,
      calculatedPowers,
      3
    );
    expect(result).toBe(29);
  });
  it('calculates largest 3x3 power cell', () => {
    const serialNumber = 18;
    const result = powerCalculator.getMaxGridFromCalculatedPowers(
      serialNumber,
      3
    );
    expect(result.cell).toEqual([33, 45, 3]);
  });
  it('calculates largest 3x3 power cell, example 2', () => {
    const serialNumber = 42;
    const result = powerCalculator.getMaxGridFromCalculatedPowers(
      serialNumber,
      3
    );
    expect(result.cell).toEqual([21, 61, 3]);
  });
  it('calculates largest 3x3 power cell, puzzle input', () => {
    const serialNumber = 5791;
    const result = powerCalculator.getMaxGridFromCalculatedPowers(
      serialNumber,
      3
    );
    expect(result.cell).toEqual([20, 68, 3]);
  });
  it('calculates largest 16x16 power cell', () => {
    const serialNumber = 18;
    const result = powerCalculator.getMaxGridFromCalculatedPowers(
      serialNumber,
      16
    );
    expect(result.cell).toEqual([90, 269, 16]);
    expect(result.max).toBe(113);
  });
  it('calculates largest 12x12 power cell', () => {
    const serialNumber = 42;
    const result = powerCalculator.getMaxGridFromCalculatedPowers(
      serialNumber,
      12
    );
    expect(result.cell).toEqual([232, 251, 12]);
    expect(result.max).toBe(119);
  });
});
