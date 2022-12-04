// every section has a UNIQUE ID
// there are assignment overlaps
//input = list of pairs doing assignments a,b
// 2-4 means 2, 3, 4

import { readFileSync } from 'node:fs';

const inRange = (num, rangeStart, rangeEnd = 0) =>
  (rangeStart < num && num < rangeEnd) || (rangeEnd < num && num < rangeStart)

const input = readFileSync('input.txt', 'utf-8').split(/\r?\n/).reduce((acc, curr) => {
  let pair = curr.split(','); //[ '14-50', '14-50' ]

  let first = pair[0].split('-').map(el => parseInt(el)); //[ 14, 50 ]
  let second = pair[1].split('-').map(el => parseInt(el));

  let obj = {
    first: {
      start: first[0],
      end: first[1]
    },
    last: {
      start: second[0],
      end: second[1]
    }
  }

  return [...acc, obj]
}, []) //  { first: { start: 14, end: 50 }, last: { start: 14, end: 50 } },

let overlaps = 0;
input.forEach(pair => {
  if (inRange(pair.first.start, pair.last.start - 1, pair.last.end + 1) && inRange(pair.first.end, pair.last.start - 1, pair.last.end + 1) ||
    inRange(pair.last.start, pair.first.start - 1, pair.first.end + 1) && inRange(pair.last.end, pair.first.start - 1, pair.first.end + 1)) {
    overlaps += 1;
  }
});