const parseStars = stars =>
  stars.map(star => {
    const parsed = star.match(/position=<(.+), (.+)> velocity=<(.+), (.+)>/);
    return {
      x: parseInt(parsed[1].trim()),
      y: parseInt(parsed[2].trim()),
      vx: parseInt(parsed[3].trim()),
      vy: parseInt(parsed[4].trim()),
    };
  });

const getLimits = coordinates => {
  return coordinates.reduce(
    (acc, coord) => {
      const { maxCoords, minCoords } = acc;
      if (coord.x > maxCoords.x) maxCoords.x = coord.x;
      if (coord.y > maxCoords.y) maxCoords.y = coord.y;
      if (coord.x < minCoords.x) minCoords.x = coord.x;
      if (coord.y < minCoords.y) minCoords.y = coord.y;

      return { maxCoords, minCoords };
    },
    {
      maxCoords: {
        x: coordinates[0].x,
        y: coordinates[0].y,
      },
      minCoords: {
        x: coordinates[0].x,
        y: coordinates[0].y,
      },
    }
  );
};

const placeOnMap = (parsedStars, limits) => {
  const map = [];
  parsedStars.map(star => {
    const normalizedPoint = {
      x: star.x - limits.minCoords.x,
      y: star.y - limits.minCoords.y,
    };
    if (!map[normalizedPoint.y]) map[normalizedPoint.y] = [];
    map[normalizedPoint.y][normalizedPoint.x] = '#';
  });
  //drawMap(map, limits);

  return map;
};

const moveStars = parsedStars => {
  const movedStars = parsedStars.map(star => {
    star.x += star.vx;
    star.y += star.vy;
    return star;
  });
  const limits = getLimits(movedStars);

  const normalizedLimits = {
    y: limits.maxCoords.x - limits.minCoords.x + 1,
    x: limits.maxCoords.y - limits.minCoords.y + 1,
  };

  return {
    map: placeOnMap(movedStars, limits),
    parsedStars: movedStars,
    limits: normalizedLimits,
  };
};

const drawMap = (map, limits) => {
  let str = '';
  console.log(limits);

  for (let x = 0; x < limits.x; x++) {
    for (let y = 0; y < limits.y; y++) {
      str += map[x] && map[x][y] ? '#' : '.';
    }
    str += '\n';
  }
  console.log(str);
};

module.exports = {
  parseStars,
  getLimits,
  placeOnMap,
  moveStars,
  drawMap,
};
