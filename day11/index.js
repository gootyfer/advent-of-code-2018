const powerCalculator = require('./powerCalculator');

const serialNumber = 5791;
const result = powerCalculator.getMaxPowerCellSizeGrid(serialNumber);

console.log(`The result is ${result}`);
