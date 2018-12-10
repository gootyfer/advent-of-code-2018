const starTracker = require('./starTracker');

const stars = [
  'position=< 9,  1> velocity=< 0,  2>',
  'position=< 7,  0> velocity=<-1,  0>',
  'position=< 3, -2> velocity=<-1,  1>',
  'position=< 6, 10> velocity=<-2, -1>',
  'position=< 2, -4> velocity=< 2,  2>',
  'position=<-6, 10> velocity=< 2, -2>',
  'position=< 1,  8> velocity=< 1, -1>',
  'position=< 1,  7> velocity=< 1,  0>',
  'position=<-3, 11> velocity=< 1, -2>',
  'position=< 7,  6> velocity=<-1, -1>',
  'position=<-2,  3> velocity=< 1,  0>',
  'position=<-4,  3> velocity=< 2,  0>',
  'position=<10, -3> velocity=<-1,  1>',
  'position=< 5, 11> velocity=< 1, -2>',
  'position=< 4,  7> velocity=< 0, -1>',
  'position=< 8, -2> velocity=< 0,  1>',
  'position=<15,  0> velocity=<-2,  0>',
  'position=< 1,  6> velocity=< 1,  0>',
  'position=< 8,  9> velocity=< 0, -1>',
  'position=< 3,  3> velocity=<-1,  1>',
  'position=< 0,  5> velocity=< 0, -1>',
  'position=<-2,  2> velocity=< 2,  0>',
  'position=< 5, -2> velocity=< 1,  2>',
  'position=< 1,  4> velocity=< 2,  1>',
  'position=<-2,  7> velocity=< 2, -2>',
  'position=< 3,  6> velocity=<-1, -1>',
  'position=< 5,  0> velocity=< 1,  0>',
  'position=<-6,  0> velocity=< 2,  0>',
  'position=< 5,  9> velocity=< 1, -2>',
  'position=<14,  7> velocity=<-2,  0>',
  'position=<-3,  6> velocity=< 2, -1>',
];

describe('Marble Game', () => {
  it('parses star points', () => {
    const result = starTracker.parseStars(stars);
    expect(result[0].x).toBe(9);
    expect(result[0].y).toBe(1);
    expect(result[0].vx).toBe(0);
    expect(result[0].vy).toBe(2);
  });

  it('calculates map limits', () => {
    const parsedStars = starTracker.parseStars(stars);
    const limits = starTracker.getLimits(parsedStars);
    expect(limits.maxCoords).toEqual({ x: 15, y: 11 });
    expect(limits.minCoords).toEqual({ x: -6, y: -4 });
  });

  it('places stars on a map', () => {
    const parsedStars = starTracker.parseStars(stars);
    const limits = starTracker.getLimits(parsedStars);
    const map = starTracker.placeOnMap(parsedStars, limits);
    expect(map[0][8]).toBe('#');
    expect(map[4][0]).toBe('#');
    expect(map[0][0]).toBeUndefined();
  });

  it('moves stars 1 second', () => {
    const parsedStars = starTracker.parseStars(stars);
    const limits = starTracker.getLimits(parsedStars);
    starTracker.placeOnMap(parsedStars, limits);
    const result = starTracker.moveStars(parsedStars, limits);
    expect(result.map[0][10]).toBe('#');
  });

  it.only('moves stars 3 second', () => {
    const parsedStars = starTracker.parseStars(stars);
    const limits = starTracker.getLimits(parsedStars);
    starTracker.placeOnMap(parsedStars, limits);
    let result = starTracker.moveStars(parsedStars, limits);
    result = starTracker.moveStars(result.parsedStars, limits);
    result = starTracker.moveStars(result.parsedStars, limits);
    expect(result.map[0][10]).toBe('#');
  });
});
