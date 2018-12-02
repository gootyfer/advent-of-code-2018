module.exports = input => {
  let foundMore = [];
  let found3Times = [];
  let foundTwice = [];
  Array.from(input).reduce((acc, curr) => {
    if (acc.includes(curr)) {
      if (
        !foundTwice.includes(curr) &&
        !found3Times.includes(curr) &&
        !foundMore.includes(curr)
      )
        foundTwice.push(curr);
      else if (!found3Times.includes(curr) && !foundMore.includes(curr)) {
        found3Times.push(curr);
        foundTwice = foundTwice.filter(e => e !== curr);
      } else {
        found3Times = found3Times.filter(e => e !== curr);
        foundMore.push(curr);
      }
    }
    return acc + curr;
  });
  return {
    dup: foundTwice.length > 0,
    trip: found3Times.length > 0,
  };
};
