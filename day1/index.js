const fs = require('fs');

const results = [];
const process = (numbers, prevResult) => numbers.reduce((acc, curr) =>{
  const nextVal = acc.sum + curr;
  const found = acc.freqs.find(el => el === nextVal);
  
  if(found) results.push(found);
  return {
    freqs: [...acc.freqs, nextVal],
    sum: nextVal
  }
}, prevResult);

fs.readFile('input.txt', 'utf8', (err, data) => {

  const numbers = data
    .split('\n')
    .map(number => parseInt(number));

  
  
  
  const result = numbers.reduce((acc,curr) => acc + curr)
  
  console.log(`The final frequency is ${result}`);

  
  let processingResults = {
    freqs: [],
    sum: 0
  };
  while(results[0] === undefined){
    processingResults = process(numbers, processingResults);
    //console.log(processingResults.freqs.filter(n => n > 10000));
    console.log(processingResults.sum, processingResults.freqs.length);
  }

  console.log(`The first freq that repeats twice is ${results[0]}`);

});

