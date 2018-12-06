const areaCalculator = require('./areaCalculator');

describe('Coordinates calculator', () => {
  describe('part 1', () => {
    it('puts coordinates in a map', () => {
      const coordinates = [[1, 1], [1, 6], [8, 3], [3, 4], [5, 5], [8, 9]];
      const map = areaCalculator.createMap(coordinates);
      expect(map[1][1]).toBe(0);
      expect(map[1][6]).toBe(1);
      expect(map[8][3]).toBe(2);
      expect(map[3][4]).toBe(3);
      expect(map[5][5]).toBe(4);
      expect(map[8][9]).toBe(5);
    });

    it('calculates Manhattan distance between two points', () => {
      const result = areaCalculator.calculateDistance([1, 1], [1, 6]);
      expect(result).toBe(5);
      const result1 = areaCalculator.calculateDistance([1, 1], [0, 0]);
      expect(result1).toBe(2);
    });

    it('calculates min distance from array of distances', () => {
      const distances = [2, 7, 11, 7, 10, 17];
      const result = areaCalculator.calcualteMin(distances);
      expect(result).toBe(0);
    });
    it("calculates min distance from array and return . if there's a tie", () => {
      const distances = [2, 3, 6, 8, 2];
      const result = areaCalculator.calcualteMin(distances);
      expect(result).toBe('.');
    });

    it('calculates closest location for every point in the map', () => {
      const coordinates = [[1, 1], [1, 6], [8, 3], [3, 4], [5, 5], [8, 9]];
      const map = areaCalculator.createClosestLocationMap(coordinates);

      expect(map[0][0]).toBe(0);
      expect(map[0][4]).toBe('.');
      expect(map[0][5]).toBe(1);
    });

    it('calculate locations with infinite area', () => {
      const coordinates = [[1, 1], [1, 6], [8, 3], [3, 4], [5, 5], [8, 9]];
      const infiniteCoords = areaCalculator.getInfiniteCoords(coordinates);
      expect(infiniteCoords).toContain(0);
      expect(infiniteCoords).toContain(1);
      expect(infiniteCoords).toContain(2);
      expect(infiniteCoords).not.toContain(3);
      expect(infiniteCoords).not.toContain(4);
      expect(infiniteCoords).toContain(5);
    });

    it('calculate areas for every location', () => {
      const coordinates = [[1, 1], [1, 6], [8, 3], [3, 4], [5, 5], [8, 9]];
      const areas = areaCalculator.calculateArea(coordinates);
      expect(areas[3]).toBe(9);
      expect(areas[4]).toBe(17);
    });

    it('calculates largest area not infinite', () => {
      const coordinates = [[1, 1], [1, 6], [8, 3], [3, 4], [5, 5], [8, 9]];
      const result = areaCalculator.calculateLargestArea(coordinates);
      expect(result).toBe(17);
    });
  });
  describe('part 2', () => {
    it('calculates distance from one point to all locations', () => {
      const coordinates = [[1, 1], [1, 6], [8, 3], [3, 4], [5, 5], [8, 9]];
      const result = areaCalculator.calculateDistanceToAllCoordinates(
        [4, 3],
        coordinates
      );
      expect(result).toBe(30);
    });
    it('creates map of all distances', () => {
      const coordinates = [[1, 1], [1, 6], [8, 3], [3, 4], [5, 5], [8, 9]];
      const map = areaCalculator.crateMapOfDistances(coordinates);
      expect(map[4][3]).toBe(30);
    });
    it('calcualtes region size of the locations below 32', () => {
      const coordinates = [[1, 1], [1, 6], [8, 3], [3, 4], [5, 5], [8, 9]];
      const result = areaCalculator.calculateRegionSize(coordinates, 32);
      expect(result).toBe(16);
    });
  });
});
