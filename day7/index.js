import { readFileSync } from 'node:fs';

// const input = readFileSync('input.txt', 'utf-8').split(/\r?\n/);
const input = readFileSync('test.txt', 'utf-8').split(/\r?\n/);

let part1Total = 0;
let dirSize = 0;
let prevLine;
let maxSize = 100_000;

input.forEach((line, index, input) => {
  const parts = line.split(' ')
  // If we have a command
  if (parts[0] === '$') {
    if (prevLine === 'dir' || prevLine === 'file') {
      console.log('Current dirSize: ', dirSize);
      if (dirSize <= maxSize) {
        console.log(dirSize, 'added to total');
        part1Total += dirSize;
        console.log('New total is: ', part1Total);
        dirSize = 0;
      } else console.log('Too big to add', dirSize, '>', maxSize, '\n');
    }
    if (parts[1] === 'cd' && parts[2] !== '..') {
      console.log('Going in');
      dirSize = 0
      prevLine = 'cd'
    } else if (parts[1] === 'cd' && parts[2] === '..') {
      console.log('Going out');
      dirSize = 0;
      prevLine = 'cd';
    }
    else if (parts[1] === 'ls') {
      dirSize = 0;
      prevLine = 'ls'
    }
  }
  // If we do't have a command
  else if (!isNaN(parseInt(parts[0]))) {
    const size = parseInt(parts[0]);
    console.group();
    console.log('Current size:', dirSize, '. Value going in =', size);
    dirSize += size;
    console.log('New size:', dirSize, 'num');
    console.groupEnd();
    prevLine = 'file'
  } else prevLine = 'dir'
  // edge case
  if (index === input.length - 1 && dirSize < maxSize) part1Total += dirSize;
});

console.log('\n\n\nTOTAL: ', part1Total);