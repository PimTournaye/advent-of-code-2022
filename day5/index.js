import { readFileSync } from 'node:fs';

const input = readFileSync('input.txt', 'utf-8').split(/\r?\n/);

// [G]                 [D] [R]        
// [W]         [V]     [C] [T] [M]    
// [L]         [P] [Z] [Q] [F] [V]    
// [J]         [S] [D] [J] [M] [T] [V]
// [B]     [M] [H] [L] [Z] [J] [B] [S]
// [R] [C] [T] [C] [T] [R] [D] [R] [D]
// [T] [W] [Z] [T] [P] [B] [B] [H] [P]
// [D] [S] [R] [D] [G] [F] [S] [L] [Q]
//  1   2   3   4   5   6   7   8   9 

let boxes = [
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
];

// split input into two arrays, one for the first 9 lines and one for the rest
let boxInput = input.slice(0, 8);
let moves = input.slice(9);

const inRange = (num, rangeStart, rangeEnd = 0) => (rangeStart <= num && num <= rangeEnd)

// Filling the 2D array would have faster manually, but hey here's some parsing. It works. It's not pretty. But at least I learnt something...
boxInput.forEach(line => {
  line.split('').forEach((item, index) => {
    let toArr0 = [0, 2]
    let toArr1 = [4, 6]
    let toArr2 = [8, 10]
    let toArr3 = [12, 14]
    let toArr4 = [16, 18]
    let toArr5 = [20, 22]
    let toArr6 = [24, 26]
    let toArr7 = [28, 30]
    let toArr8 = [32, 34]

    let box;

    // push the characters to the correct array depending on their index position
    if (item === '[') {
      // the current index and next two indexes are now box
      box = line.slice(index, index + 3);
      switch (true) {
        case inRange(index, ...toArr0) == true:
          boxes[0].push(box);
          break;
        case inRange(index, ...toArr1):
          boxes[1].push(box);
          break;
        case inRange(index, ...toArr2):
          boxes[2].push(box);
          break;
        case inRange(index, ...toArr3):
          boxes[3].push(box);
          break;
        case inRange(index, ...toArr4):
          boxes[4].push(box);
          break;
        case inRange(index, ...toArr5):
          boxes[5].push(box);
          break;
        case inRange(index, ...toArr6):
          boxes[6].push(box);
          break;
        case inRange(index, ...toArr7):
          boxes[7].push(box);
          break;
        case inRange(index, ...toArr8):
          boxes[8].push(box);
          break;
      }
    }
  });
})

// console.log(boxes);

moves.forEach((move, index) => {
  let instructions = move.split(' ');
  // parse all the numbers in the instructions
  let numbers = instructions.map(item => parseInt(item));
  // purge all NaNs from the array
  numbers = numbers.filter(item => !isNaN(item));

  const instruction = {
    amount: numbers[0],
    from: numbers[1] - 1,
    to: numbers[2] - 1
  }

  for (let i = 0; i < instruction.amount; i++) {

    let from = boxes[instruction.from];
    let to = boxes[instruction.to];

    const box = from.shift();
    to.unshift(box);
  }
})

const topBoxes = boxes.map(box => box[0]);
// get rid of [] from topboxes
console.log(topBoxes.join('').replace(/[\[\]]/g, ''));