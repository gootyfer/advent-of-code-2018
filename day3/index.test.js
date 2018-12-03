const comparator = require('./claimsComparator');

describe('Make a fabric suit for Santa', () => {
  it('parses claim info', () => {
    const claimText = '#1 @ 1,3: 4x4';
    const claim = comparator.parse(claimText);
    expect(claim.id).toBe(1);
    expect(claim.left).toBe(1);
    expect(claim.top).toBe(3);
    expect(claim.width).toBe(4);
    expect(claim.height).toBe(4);
    expect(claim.right).toBe(5);
    expect(claim.bottom).toBe(7);
  });

  it('calculates overlap over 2 claims that overlap (from example 1,2)', () => {
    const claim1 = '#1 @ 1,3: 4x4';
    const claim2 = '#2 @ 3,1: 4x4';
    const result = comparator.overlap(claim1, claim2);
    expect(result).toBe(true);
  });

  it('calculates overlap over 2 claims that overlap (from example 1,2), reverse order', () => {
    const claim2 = '#1 @ 1,3: 4x4';
    const claim1 = '#2 @ 3,1: 4x4';
    const result = comparator.overlap(claim1, claim2);
    expect(result).toBe(true);
  });

  it("calculates overlap over 2 claims that don't overlap (from example 1,3)", () => {
    const claim1 = '#1 @ 1,3: 4x4';
    const claim2 = '#3 @ 5,5: 2x2';
    const result = comparator.overlap(claim1, claim2);
    expect(result).toBe(false);
  });

  it("calculates overlap over 2 claims that don't overlap (from example 1,3), reverse order", () => {
    const claim2 = '#1 @ 1,3: 4x4';
    const claim1 = '#3 @ 5,5: 2x2';
    const result = comparator.overlap(claim1, claim2);
    expect(result).toBe(false);
  });

  it("calculates overlap over 2 claims that don't overlap (from example 2,3)", () => {
    const claim1 = '#2 @ 3,1: 4x4';
    const claim2 = '#3 @ 5,5: 2x2';
    const result = comparator.overlap(claim1, claim2);
    expect(result).toBe(false);
  });

  it("calculates overlap over 2 claims that don't overlap (from example 2,3), reverse order", () => {
    const claim2 = '#2 @ 3,1: 4x4';
    const claim1 = '#3 @ 5,5: 2x2';
    const result = comparator.overlap(claim1, claim2);
    expect(result).toBe(false);
  });

  it('calculates overlap over 2 claims that are the same with the same id', () => {
    const claim2 = '#2 @ 3,1: 4x4';
    const claim1 = '#2 @ 3,1: 4x4';
    const result = comparator.overlap(claim1, claim2);
    expect(result).toBe(false);
  });

  it('calculates overlap over 2 claims in the bottom left corner', () => {
    const claim1 = '#2 @ 3,2: 4x4';
    const claim2 = '#3 @ 4,1: 4x4';
    const result = comparator.overlap(claim1, claim2);
    expect(result).toBe(true);
  });

  it('calculates overlap over 2 claims in the bottom left corner, reversed', () => {
    const claim2 = '#2 @ 3,2: 4x4';
    const claim1 = '#3 @ 4,1: 4x4';
    const result = comparator.overlap(claim1, claim2);
    expect(result).toBe(true);
  });

  it('calculates overlap over 2 claims in the top right corner', () => {
    const claim1 = '#2 @ 0,1: 4x4';
    const claim2 = '#3 @ 1,0: 4x4';
    const result = comparator.overlap(claim1, claim2);
    expect(result).toBe(true);
  });

  it('calculates overlap over 2 claims in the top right corner, reverse order', () => {
    const claim2 = '#2 @ 0,1: 4x4';
    const claim1 = '#3 @ 1,0: 4x4';
    const result = comparator.overlap(claim1, claim2);
    expect(result).toBe(true);
  });

  it('calculates overlap over 2 claims in the bottom right corner', () => {
    const claim1 = '#2 @ 0,0: 2x2';
    const claim2 = '#3 @ 1,1: 2x2';
    const result = comparator.overlap(claim1, claim2);
    expect(result).toBe(true);
  });

  it('calculates overlap over 2 claims in the top bottom right corner, reverse order', () => {
    const claim2 = '#2 @ 0,0: 2x2';
    const claim1 = '#3 @ 1,1: 2x2';
    const result = comparator.overlap(claim1, claim2);
    expect(result).toBe(true);
  });

  it('calculates overlap over 2 claims in the bottom', () => {
    const claim1 = '#2 @ 0,0: 4x4';
    const claim2 = '#3 @ 0,1: 4x4';
    const result = comparator.overlap(claim1, claim2);
    expect(result).toBe(true);
  });

  it('calculates overlap over 2 claims in the bottom, reversed', () => {
    const claim2 = '#2 @ 0,0: 4x4';
    const claim1 = '#3 @ 0,1: 4x4';
    const result = comparator.overlap(claim1, claim2);
    expect(result).toBe(true);
  });

  it('calculates overlap over 2 claims in the right', () => {
    const claim1 = '#2 @ 0,0: 4x4';
    const claim2 = '#3 @ 1,0: 4x4';
    const result = comparator.overlap(claim1, claim2);
    expect(result).toBe(true);
  });

  it('calculates overlap over 2 claims in the right, reversed', () => {
    const claim2 = '#2 @ 0,0: 4x4';
    const claim1 = '#3 @ 1,0: 4x4';
    const result = comparator.overlap(claim1, claim2);
    expect(result).toBe(true);
  });

  it('adds first claim to fabric', () => {
    const claim = '#1 @ 1,3: 4x4';
    const emptyFabric = [];
    const result = comparator.addClaim(emptyFabric, claim);

    expect(result[1][3]).toBe(1);
    expect(result[1][4]).toBe(1);
    expect(result[1][5]).toBe(1);
    expect(result[1][6]).toBe(1);
    expect(result[2][3]).toBe(1);
    expect(result[3][3]).toBe(1);
    expect(result[4][3]).toBe(1);
    expect(result[1][7]).toBe(undefined);
  });

  it('adds second claim to fabric, and have overlap', () => {
    const claim1 = '#1 @ 1,3: 4x4';
    const claim2 = '#2 @ 3,1: 4x4';
    const emptyFabric = [];
    comparator.addClaim(emptyFabric, claim1);
    const result = comparator.addClaim(emptyFabric, claim2);

    expect(result[1][3]).toBe(1);
    expect(result[3][1]).toBe(2);
    expect(result[3][3]).toBe('X');
  });

  it('adds third claim to fabric, and previous overlap', () => {
    const claim1 = '#1 @ 1,3: 4x4';
    const claim2 = '#2 @ 3,1: 4x4';
    const claim3 = '#3 @ 5,5: 2x2';

    const emptyFabric = [];
    comparator.addClaim(emptyFabric, claim1);
    comparator.addClaim(emptyFabric, claim2);
    const result = comparator.addClaim(emptyFabric, claim3);

    expect(result[1][3]).toBe(1);
    expect(result[3][1]).toBe(2);
    expect(result[3][3]).toBe('X');
    expect(result[5][5]).toBe(3);
  });

  it('adds 3 claims and count overlaps', () => {
    const claim1 = '#1 @ 1,3: 4x4';
    const claim2 = '#2 @ 3,1: 4x4';
    const claim3 = '#3 @ 5,5: 2x2';

    const fabric = [];
    comparator.addClaim(fabric, claim1);
    comparator.addClaim(fabric, claim2);
    comparator.addClaim(fabric, claim3);

    const result = comparator.countFabricSquareInches(fabric, 'X');

    expect(result).toBe(4);
  });

  it('adds 3 claims and find no overlap claim', () => {
    const claims = ['#1 @ 1,3: 4x4', '#2 @ 3,1: 4x4', '#3 @ 5,5: 2x2'];

    const result = comparator.findNoOverlapClaim(claims);

    expect(result).toBe(3);
  });
});
