const parse = claimText => {
  const parsed = claimText.split(' ');

  const left = parseInt(parsed[2].split(',')[0]);
  const top = parseInt(parsed[2].split(',')[1]);
  const width = parseInt(parsed[3].split('x')[0]);
  const height = parseInt(parsed[3].split('x')[1]);

  return {
    id: parseInt(parsed[0].slice(1)),
    left,
    top,
    width,
    height,
    right: left + width,
    bottom: top + height,
  };
};

const addClaim = (fabric, claimText) => {
  const claim = parse(claimText);

  for (let i = claim.left; i < claim.right; i++) {
    if (!fabric[i]) fabric[i] = [];
    for (let j = claim.top; j < claim.bottom; j++) {
      if (fabric[i][j]) fabric[i][j] = 'X';
      else fabric[i][j] = claim.id;
    }
  }
  return fabric;
};

const countFabricSquareInches = (fabric, value) => {
  let count = 0;
  for (let i = 0; i < fabric.length; i++) {
    if (fabric[i]) {
      for (let j = 0; j < fabric[i].length; j++) {
        if (fabric[i][j] === value) count++;
      }
    }
  }
  return count;
};

const overlap = (claim1, claim2) => {
  const c1 = parse(claim1);
  const c2 = parse(claim2);

  if (c1.id === c2.id) return false;

  if (c1.left <= c2.left) {
    return c2.top < c1.bottom && c2.left < c1.right;
  }
  return c1.top < c2.bottom && c1.left < c2.right;
};

const findNoOverlapClaim = claims => {
  let result = 0;
  claims.map(claim1 => {
    const overlaps = claims.reduce((acc, claim2) => {
      if (overlap(claim1, claim2)) return acc + 1;
      return acc;
    }, 0);
    if (overlaps < 10) console.log(claim1, overlaps);

    if (overlaps === 0) result = parse(claim1).id;
  });
  return result;
};

module.exports = {
  parse,
  addClaim,
  overlap,
  countFabricSquareInches,
  findNoOverlapClaim,
};
