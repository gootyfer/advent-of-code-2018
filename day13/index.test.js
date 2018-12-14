const mineExplorer = require('./MineExplorer');
const input = [
  '/->-\\        ',
  '|   |  /----\\',
  '| /-+--+-\\  |',
  '| | |  | v  |',
  '\\-+-/  \\-+--/',
  '  \\------/   ',
];

const input2 = [
  '/>-<\\  ',
  '|   |  ',
  '| /<+-\\',
  '| | | v',
  '\\>+</ |',
  '  |   ^',
  '  \\<->/',
];

describe('Mine explorer', () => {
  it('parses initial map', () => {
    const result = mineExplorer.parseTrack(input);
    expect(result.map[0][0]).toBe('/');
    expect(result.map[0][2]).toBe('-');
    expect(result.carts).toHaveLength(2);
  });
  it('get next position for a cart', () => {
    const state = mineExplorer.parseTrack(input);
    const result = mineExplorer.getNextPosition(state.carts[0]);
    expect(result).toEqual([0, 3]);
    const result2 = mineExplorer.getNextPosition(state.carts[1]);
    expect(result2).toEqual([4, 9]);
  });
  it('moves the cart', () => {
    const { map, carts } = mineExplorer.parseTrack(input);
    mineExplorer.moveCarts(map, carts);
    expect(carts[0].x).toBe(0);
    expect(carts[0].y).toBe(3);
    expect(carts[0].arrow).toBe('>');
  });
  it('finds the first collision', () => {
    const result = mineExplorer.findFirstCollision(input);
    expect(result).toEqual([3, 7]);
  });
  it.only('finds the last cart', () => {
    const result = mineExplorer.findLastCart(input2);
    expect(result).toEqual([6, 4]);
  });
});
