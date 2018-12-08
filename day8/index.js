const fs = require('fs');
const licenseManager = require('./licenseManager');

fs.readFile('input.txt', 'utf8', (err, data) => {
  const licenseText = data.trim();

  const metadata = licenseManager.parseTree(licenseText);

  console.log(`The metadata is ${metadata}`);

  const rootValue = licenseManager.parseTreeWithNodeValue(licenseText);

  console.log(`The rootValue is ${rootValue}`);
});
