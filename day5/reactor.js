const reactPair = (a, b) => Math.abs(a.charCodeAt(0) - b.charCodeAt(0)) === 32;

const reactPolymer = polymer => {
  if (!polymer.length) return '';
  for (let i = 1; i < polymer.length; i++) {
    if (reactPair(polymer[i - 1], polymer[i])) {
      if (polymer.length === 2) return '';
      return reactPolymer([
        ...polymer.slice(0, i - 1),
        ...polymer.slice(i + 1),
      ]);
    }
  }
  return polymer.join('');
};

const reactPolymerWithNoRecursion = polymer => {
  let reactedPolymer = [...polymer];
  let found = false;
  for (let i = 1; i < polymer.length; i++) {
    if (reactPair(polymer[i - 1], polymer[i])) {
      reactedPolymer = [
        ...reactedPolymer.slice(0, i - 1),
        ...reactedPolymer.slice(i + 1),
      ];
      found = true;
      break;
    }
    if (found) break;
  }
  if (reactedPolymer.length !== polymer.length)
    return reactPolymerWithNoRecursion(reactedPolymer);
  return polymer.join('');
};

const reactPolymerWithReduce = polymer => {
  let reactedPolymer = [...polymer];
  let reactions = 0;
  for (let i = 1; i < polymer.length; i++) {
    if (reactPair(polymer[i - 1], polymer[i])) {
      reactions++;
      reactedPolymer = [
        ...reactedPolymer.slice(0, i - 1 - (reactions - 1)),
        ...reactedPolymer.slice(i + 1 - (reactions - 1)),
      ];
      i++;
    }
  }
  if (reactedPolymer.length !== polymer.length)
    return reactPolymerWithReduce(reactedPolymer);
  return polymer.join('');
};

const reactOnePair = polymer => {
  for (let i = 1; i < polymer.length; i++) {
    if (reactPair(polymer[i - 1], polymer[i])) {
      return polymer.splice(i - 1, 2);
    }
  }
  return [];
};

const reactPolymerWithWhile = polymer => {
  let deleted;
  do {
    deleted = reactOnePair(polymer);
  } while (deleted.length > 0);
  return polymer.join('');
};

const removeUnits = (polymer, unit) =>
  polymer.replace(new RegExp(unit, 'gi'), '');

const calculateShortestReaction = polymer => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const results = alphabet.map(unit => {
    const improvedPolymer = removeUnits(polymer, unit);
    return reactPolymerWithWhile(improvedPolymer.split('')).length;
  });
  return Math.min(...results);
};

module.exports = {
  reactPair,
  reactPolymer,
  reactPolymerWithReduce,
  reactPolymerWithNoRecursion,
  reactPolymerWithWhile,
  removeUnits,
  calculateShortestReaction,
};
