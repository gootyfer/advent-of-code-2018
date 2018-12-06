const createMap = coordinates => {
  return coordinates.reduce((acc, curr, i) => {
    if (!acc[curr[0]]) acc[curr[0]] = [];
    acc[curr[0]][curr[1]] = i;
    return acc;
  }, []);
};

const calculateDistance = (p1, p2) => {
  return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
};

const calcualteMin = distances => {
  const sorted = distances.slice().sort((a, b) => a - b);
  return sorted[0] === sorted[1] ? '.' : distances.indexOf(sorted[0]);
};

const getLimits = coordinates => {
  return coordinates.reduce(
    (acc, coord) => {
      const { maxCoords, minCoords } = acc;
      if (coord[0] > maxCoords[0]) maxCoords[0] = coord[0];
      if (coord[1] > maxCoords[1]) maxCoords[1] = coord[1];
      if (coord[0] < minCoords[0]) minCoords[0] = coord[0];
      if (coord[1] < minCoords[1]) minCoords[1] = coord[1];

      return { maxCoords, minCoords };
    },
    {
      maxCoords: coordinates[0].slice(),
      minCoords: coordinates[0].slice(),
    }
  );
};

const createClosestLocationMap = coordinates => {
  const limits = getLimits(coordinates);
  const result = [];
  for (let x = 0; x <= limits.maxCoords[0]; x++) {
    result[x] = [];
    for (let y = 0; y <= limits.maxCoords[1]; y++) {
      const distances = coordinates.map(coord =>
        calculateDistance([x, y], coord)
      );
      result[x][y] = calcualteMin(distances);
    }
  }
  return result;
};

const getInfiniteCoords = coordinates => {
  const map = createClosestLocationMap(coordinates);

  const extremeCoords = [...map[0], ...map[map.length - 1]];

  for (let x = 1; x < map.length - 1; x++) {
    const row = map[x];
    extremeCoords.push(row[0]);
    extremeCoords.push(row[row.length - 1]);
  }
  return Array.from(new Set(extremeCoords)).filter(c => c !== '.');
};

const calculateArea = coordinates => {
  const map = createClosestLocationMap(coordinates);

  const result = new Array(coordinates.length).fill(0);
  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[x].length; y++) {
      const val = map[x][y];
      if (val !== '.') {
        result[val] += 1;
      }
    }
  }
  return result;
};

const calculateLargestArea = coordinates => {
  const areas = calculateArea(coordinates);

  const infiniteCoords = getInfiniteCoords(coordinates);

  return Math.max(...areas.filter((a, i) => infiniteCoords.indexOf(i) === -1));
};

const calculateDistanceToAllCoordinates = (point, coordinates) =>
  coordinates
    .map(coord => calculateDistance(coord, point))
    .reduce((acc, curr) => acc + curr);

const crateMapOfDistances = coordinates => {
  const limits = getLimits(coordinates);
  const result = [];
  for (let x = 0; x <= limits.maxCoords[0]; x++) {
    result[x] = [];
    for (let y = 0; y <= limits.maxCoords[1]; y++) {
      result[x][y] = calculateDistanceToAllCoordinates([x, y], coordinates);
    }
  }
  return result;
};

const calculateRegionSize = (coordinates, maxDistance) => {
  const map = crateMapOfDistances(coordinates);
  let result = 0;
  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[x].length; y++) {
      if (map[x][y] < maxDistance) result++;
    }
  }
  return result;
};

module.exports = {
  createMap,
  calculateDistance,
  calcualteMin,
  createClosestLocationMap,
  getInfiniteCoords,
  calculateArea,
  calculateLargestArea,
  calculateDistanceToAllCoordinates,
  crateMapOfDistances,
  calculateRegionSize,
};
