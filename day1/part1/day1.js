// puzzle input is calories
// one item per line

import { readFileSync } from 'node:fs';

let data = []

const input = readFileSync('./day1/input.txt', 'utf-8');

// split on newline
const lines = input.split(/\r?\n/)

// for debugging
let logIndex = 0

const initialValue = 0;
lines.reduce((acc, current, index) => {

  // convert string to number or NaN
  const snack = parseInt(current);
  // if (index <= logIndex + 20) {
  //   console.table({
  //     index: index,
  //     accValue: acc,
  //     accType: typeof acc,
  //     snackValue: snack,
  //     snackType: typeof snack
  //   })
  //}

  if (isNaN(snack)) {
    data.push(acc);
    acc = initialValue;
    return acc;
  } else {
    return acc + snack;
  }
}, initialValue)

const result = Math.max(...data)

console.log(result);