const reactor = require('./reactor');

describe('Reactor', () => {
  it('reacts when input pair is reactive', () => {
    const polymer = 'aA';
    const result = reactor.reactPair(...polymer.split(''));
    expect(result).toBe(true);
  });
  it('reacts when input pair is reactive with any letter', () => {
    const polymer = 'bB';
    const result = reactor.reactPair(...polymer.split(''));
    expect(result).toBe(true);
  });
  it('reacts when input pair is reactive with any letter in any order', () => {
    const polymer = 'Cc';
    const result = reactor.reactPair(...polymer.split(''));
    expect(result).toBe(true);
  });
  it('does not react when input pair is not reactive', () => {
    const polymer = 'Cd';
    const result = reactor.reactPair(...polymer.split(''));
    expect(result).toBe(false);
  });
  it('chains reactions from polymer that completely reacts', () => {
    const polymer = 'abBA';
    const result = reactor.reactPolymerWithWhile(polymer.split(''));
    expect(result).toBe('');
  });
  it('chains reactions from polymer that left unreacted', () => {
    const polymer = 'abAB';
    const result = reactor.reactPolymerWithWhile(polymer.split(''));
    expect(result).toBe('abAB');
  });
  it('chains reactions from polymer that left unreacted', () => {
    const polymer = 'aabAAB';
    const result = reactor.reactPolymerWithWhile(polymer.split(''));
    expect(result).toBe('aabAAB');
  });
  it('chains reactions from polymer that reduces not totally', () => {
    const polymer = 'dabAcCaCBAcCcaDA';
    const result = reactor.reactPolymerWithWhile(polymer.split(''));
    expect(result).toBe('dabCBAcaDA');
  });
  it('chains reactions from polymer that reduces a lot', () => {
    const polymer = 'dabAcCaBAcCcaDA';
    const result = reactor.reactPolymerWithWhile(polymer.split(''));
    expect(result).toBe('dcaDA');
  });

  it('removes units from polymer', () => {
    const polymer = 'dabAcCaCBAcCcaDA';
    const result = reactor.removeUnits(polymer, 'a');
    expect(result).toBe('dbcCCBcCcD');
  });

  it('calculates shortest reacted chain', () => {
    const polymer = 'dabAcCaCBAcCcaDA';
    const result = reactor.calculateShortestReaction(polymer);
    expect(result).toBe(4);
  });
});
