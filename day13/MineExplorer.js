const isCart = c => c === '<' || c === '>' || c === '^' || c === 'v';
const isVerticalCart = c => c === '<' || c === '>';
const TURNS = {
  LEFT: 0,
  STRAIGHT: 1,
  RIGHT: 2,
};

const parseTrack = input => {
  const carts = [];
  const map = input.slice();
  for (let x = 0; x < map.length; x++) {
    map[x] = map[x].split('');
    for (let y = 0; y < map[x].length; y++) {
      if (isCart(map[x][y])) {
        carts.push({
          x,
          y,
          arrow: map[x][y],
          nextTurn: TURNS.LEFT,
        });
        if (isVerticalCart(map[x][y])) {
          map[x][y] = '-';
        } else {
          map[x][y] = '|';
        }
      }
    }
  }
  return {
    map,
    carts,
  };
};

const getNextPosition = cart => {
  if (cart.arrow === '>') return [cart.x, cart.y + 1];
  if (cart.arrow === '<') return [cart.x, cart.y - 1];
  if (cart.arrow === '^') return [cart.x - 1, cart.y];
  if (cart.arrow === 'v') return [cart.x + 1, cart.y];
};

const isColliding = (pos, carts) =>
  !!carts.filter(c => c.x === pos[0] && c.y === pos[1]).length;

const updateCart = (cart, map, carts) => {
  const pos = getNextPosition(cart);
  if (isColliding(pos, carts)) {
    console.log('COLLISION is', pos);
    return pos;
  }
  cart.x = pos[0];
  cart.y = pos[1];

  const next = map[pos[0]][pos[1]];

  if (next === '/') {
    if (cart.arrow === '>') cart.arrow = '^';
    else if (cart.arrow === '<') cart.arrow = 'v';
    else if (cart.arrow === '^') cart.arrow = '>';
    else if (cart.arrow === 'v') cart.arrow = '<';
  } else if (next === '\\') {
    if (cart.arrow === '>') cart.arrow = 'v';
    else if (cart.arrow === '<') cart.arrow = '^';
    else if (cart.arrow === '^') cart.arrow = '<';
    else if (cart.arrow === 'v') cart.arrow = '>';
  } else if (next === '+') {
    if (cart.nextTurn === TURNS.LEFT) {
      if (cart.arrow === '>') cart.arrow = '^';
      else if (cart.arrow === '<') cart.arrow = 'v';
      else if (cart.arrow === '^') cart.arrow = '<';
      else if (cart.arrow === 'v') cart.arrow = '>';
    } else if (cart.nextTurn === TURNS.RIGHT) {
      if (cart.arrow === '>') cart.arrow = 'v';
      else if (cart.arrow === '<') cart.arrow = '^';
      else if (cart.arrow === '^') cart.arrow = '>';
      else if (cart.arrow === 'v') cart.arrow = '<';
    }
    cart.nextTurn = (cart.nextTurn + 1) % 3;
  }
};

const moveCarts = (map, carts) => {
  let collision;
  for (const cart of carts) {
    collision = updateCart(cart, map, carts);
    if (collision) return collision;
  }
};

const findIndexOfCollider = (carts, collision) => {
  for (let i = 0; i < carts.length; i++) {
    if (carts[i].x === collision[0] && carts[i].y === collision[1]) return i;
  }
};

const moveCartsWithCollisions = (map, carts) => {
  let collision;
  const toRemove = new Set();
  carts.sort((a, b) => {
    if (a.x === b.x) return a.y - b.y;
    return a.x - b.x;
  });

  for (let i = 0; i < carts.length; i++) {
    collision = updateCart(carts[i], map, carts);
    if (collision) {
      toRemove.add(i);
      toRemove.add(findIndexOfCollider(carts, collision));
    }
  }

  Array.from(toRemove)
    .sort((a, b) => b - a)
    .map(i => carts.splice(i, 1));

  //printMap(map, carts);
  if (toRemove.size > 0) {
    console.log('carts left ', carts.length);
  }
  return toRemove.size > 0;
};

const findLastCart = input => {
  const { map, carts } = parseTrack(input);

  let i = 0;
  let collision;

  // printMap(map, []);
  // printMap(map, carts);
  while (carts.length !== 1) {
    collision = moveCartsWithCollisions(map, carts);
    i++;
    if (collision) console.log('Collision at ', i);
  }
  console.log(carts[0]);
  return [carts[0].y, carts[0].x];
};

const findFirstCollision = input => {
  const { map, carts } = parseTrack(input);
  //printMap(map, []);
  //printMap(map, carts);
  let collision;
  while (!collision) {
    collision = moveCarts(map, carts);
    //printMap(map, carts);
  }
  return collision;
};

const printMap = (map, carts) => {
  var mapWithCarts = map.map(row => row.slice());

  carts.map(cart => (mapWithCarts[cart.x][cart.y] = cart.arrow));

  let acc = '';
  mapWithCarts.map(row => (acc += row.join('') + '\n'));
  console.clear();
  console.log(acc);
};

module.exports = {
  parseTrack,
  getNextPosition,
  moveCarts,
  findFirstCollision,
  findLastCart,
};
