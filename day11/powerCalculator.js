const getPowerCell = (cell, serialNumber) => {
  const rackID = cell[0] + 10;
  const powerLevelInitial = (rackID * cell[1] + serialNumber) * rackID;
  const hundredDigit = ('' + powerLevelInitial).split('').slice(-3)[0] || 0;
  return hundredDigit - 5;
};

const addCells = (c1, c2) => {
  return [c1[0] + c2[0], c1[1] + c2[1]];
};

const sum = (a, b) => a + b;

const getPowerCellGrid = (cell, serialNumber, size) => {
  const powers = [];
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      powers.push(getPowerCell(addCells(cell, [x, y]), serialNumber));
    }
  }
  return powers.reduce(sum);
};

const getPowerCellGridFromCalculatedPowers = (cell, calculatedPowers, size) => {
  let power = 0;
  for (let x = cell[0]; x < cell[0] + size; x++) {
    for (let y = cell[1]; y < cell[1] + size; y++) {
      power += calculatedPowers[x][y];
    }
  }
  return power;
};

const calculatePowers = serialNumber => {
  const powers = [];
  for (let x = 0; x < 300; x++) {
    powers[x] = [];
    for (let y = 0; y < 300; y++) {
      powers[x][y] = getPowerCell([x, y], serialNumber);
    }
  }
  return powers;
};

const getMaxGridFromCalculatedPowers = (serialNumber, size) => {
  const calculatedPowers = calculatePowers(serialNumber);
  const powers = [];
  const cells = [];
  for (let x = 0; x < 300 - size + 1; x++) {
    for (let y = 0; y < 300 - size + 1; y++) {
      powers.push(
        getPowerCellGridFromCalculatedPowers([x, y], calculatedPowers, size)
      );
      cells.push([x, y, size]);
    }
  }

  const max = Math.max(...powers);
  const index = powers.indexOf(max);
  return { cell: cells[index], max };
};

const getMaxPower3CellGrid = serialNumber =>
  getMaxPowerCellGrid(serialNumber, 3).cell.slice(0, 2);

const getMaxPowerCellGrid = (serialNumber, size) => {
  const powers = [];
  const cells = [];
  for (let x = 1; x <= 300 - size + 1; x++) {
    for (let y = 1; y <= 300 - size + 1; y++) {
      powers.push(getPowerCellGrid([x, y], serialNumber, size));
      cells.push([x, y, size]);
    }
  }
  const max = Math.max(...powers);
  const index = powers.indexOf(max);
  return { cell: cells[index], max };
};

const getMaxPowerCellSizeGrid = serialNumber => {
  const powers = [];
  const cells = [];
  for (let size = 1; size <= 300; size++) {
    const result = getMaxGridFromCalculatedPowers(serialNumber, size);
    console.log('Calculate for size ', size);
    powers.push(result.max);
    cells.push(result.cell);
  }

  const index = powers.indexOf(Math.max(...powers));
  return cells[index];
};

module.exports = {
  getPowerCell,
  getPowerCellGrid,
  getMaxPowerCellGrid,
  getMaxPower3CellGrid,
  getMaxPowerCellSizeGrid,
  getPowerCellGridFromCalculatedPowers,
  getMaxGridFromCalculatedPowers,
  calculatePowers,
};
