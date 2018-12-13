const fs = require('fs');
const plantEvolution = require('./plantEvolution');

fs.readFile('input.txt', 'utf8', (err, data) => {
  const all = data.trim().split('\n');
  const initialState = all[0];
  const rules = all.slice(2);

  const state = plantEvolution.parseState(initialState);
  const parsedRules = plantEvolution.parseRules(rules);
  const result = plantEvolution.evolute(state, parsedRules, 20);

  console.log(`The result for 20 generations is ${result}`);

  const final = plantEvolution.calculateFinalResult(50000000000);
  console.log(`The final is: ${final}`);
});
