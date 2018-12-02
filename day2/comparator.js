const comparator = (s1, s2) => {
  let diff = 0;
  const arr1 = s1.split('');
  s2.split('').map((n2, i) => {
    if (arr1[i] !== n2) diff++;
  });
  return diff;
};

const commonChars = (s1, s2) => {
  let result = '';
  const arr1 = s1.split('');
  s2.split('').map((n2, i) => {
    if (arr1[i] !== n2) result = s1.slice(0, i) + s1.slice(i + 1);
  });
  return result;
};

const finder = arr => {
  let result = [];
  arr.map(el => {
    arr.reduce((acc, curr) => {
      if (comparator(el, curr) === 1) result = [el, curr];
    });
  });
  return commonChars(...result);
};

module.exports = {
  comparator,
  commonChars,
  finder,
};
