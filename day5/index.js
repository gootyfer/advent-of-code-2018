const fs = require('fs');
const reactor = require('./reactor');

fs.readFile('input.txt', 'utf8', (err, data) => {
  const polymer = data.trim();

  const result = reactor.reactPolymerWithWhile(polymer.split(''));

  console.log(`The result is ${result.length}`);

  const shortest = reactor.calculateShortestReaction(polymer);

  console.log(`The shortest is ${shortest}`);
});
