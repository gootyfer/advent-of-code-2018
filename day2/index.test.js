const counter = require('./counter');
const { comparator, commonChars, finder } = require('./comparator');

describe('Inventory management system', () => {
  describe('Checksum creator', () => {
    it('return no dups and no trips when there are no duplicates', () => {
      const input = 'abcdef';
      const result = counter(input);
      expect(result.dup).toBe(false);
      expect(result.trip).toBe(false);
    });

    it('returns true when there are one duplicate', () => {
      const input = 'abbcde';
      const result = counter(input);
      expect(result.dup).toBe(true);
      expect(result.trip).toBe(false);
    });

    it('returns true when there are two duplicate', () => {
      const input = 'aabcdd';
      const result = counter(input);
      expect(result.dup).toBe(true);
      expect(result.trip).toBe(false);
    });

    it('return true when there are one triplicate, no dups', () => {
      const input = 'abcccd';
      const result = counter(input);
      expect(result.trip).toBe(true);
      expect(result.dup).toBe(false);
    });

    it('return true when there are one triplicate and one duplicate', () => {
      const input = 'bababc';
      const result = counter(input);
      expect(result.dup).toBe(true);
      expect(result.trip).toBe(true);
    });

    it('return false when there are one 4 times', () => {
      const input = 'bbbba';
      const result = counter(input);
      expect(result.dup).toBe(false);
      expect(result.trip).toBe(false);
    });
  });
  describe('Codes comparator', () => {
    it('return the strings difference of 0', () => {
      const s1 = 'abcdef',
        s2 = 'abcdef';
      const result = comparator(s1, s2);
      expect(result).toBe(0);
    });
    it('return the strings difference of 1', () => {
      const s1 = 'abcdef',
        s2 = 'abcdeg';
      const result = comparator(s1, s2);
      expect(result).toBe(1);
    });
    it('return the strings difference of 2', () => {
      const s1 = 'abcdef',
        s2 = 'abcreg';
      const result = comparator(s1, s2);
      expect(result).toBe(2);
    });
    it('return common chars', () => {
      const s1 = 'fghij',
        s2 = 'fguij';
      const result = commonChars(s1, s2);
      expect(result).toBe('fgij');
    });
    it('find the codes with difference 1 from array', () => {
      const arr = [
        'abcde',
        'fghij',
        'klmno',
        'pqrst',
        'fguij',
        'axcye',
        'wvxyz',
      ];
      const result = finder(arr);
      expect(result).toBe('fgij');
    });
  });
});
