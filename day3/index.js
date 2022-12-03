import { readFileSync } from 'node:fs';
const input = readFileSync('input.txt', 'utf-8').split(/\r?\n/);

function generateAlphabet(capital) {
  return [...Array(26)].map((_, i) => String.fromCharCode(i + (capital ? 65 : 97)));
}
const priorities = [...generateAlphabet(false), ...generateAlphabet(true)]

const getValue = (item) => {
  return priorities.findIndex(el => el === item ? true : false) + 1
}

const searchForItem = (top, bottom) => {
  const lettersTop = [...top]
  const lettersBottom = [...bottom]
  let commonItem;
  
  // this could be more optimal
  // lettersTop.forEach(letter => {
  //   const topLetter = letter;
  //   lettersBottom.forEach(letter => {
  //     if (topLetter === letter) {
  //       commonItem = letter;
  //     }
  //   })
  // })

  // REFACTOR - does return an array instead of a string
  const common = [lettersTop, lettersBottom].reduce((acc, curr) => acc.filter(el => curr.includes(el)))

  console.log(...common);

  return {
    commonItem: commonItem,
    value: getValue(commonItem)
  }
}

// 1 item in both compartment per sack
// that item has a priority
let sacks = []

input.forEach(sack => {
  const half = Math.ceil(sack.length / 2);
  const top = sack.slice(0, half)
  const bottom = sack.slice(half, sack.length)

  const obj = {
    full: sack,
    top: top,
    bottom: bottom,
    common: searchForItem(top, bottom)
  }
  sacks.push(obj)
})

let totalValue = 0;
sacks.forEach(sack => {
  let value = sack.common.value;
  totalValue += value;
})

console.log(totalValue);

// PART 2

// groups of three
// only item type for all three elves
// if they have badge of type B, they will all have this item in their sack


const searchForBadge = (group) => {
  const bags = [[...group[0].full], [...group[1].full], [...group[2].full]]
  const badge = bags.reduce((acc, curr) => acc.filter(el => curr.includes(el)))
  return badge;
}


let groups = sacks.reduce((accumulator, current, index) => {
  const groupIndex = Math.floor(index / 3);
  if (!accumulator[groupIndex]) {
    accumulator[groupIndex] = [];
  }
  accumulator[groupIndex].push(current);

  return accumulator
}, [])

let badgeValue = 0;
groups.forEach(group => {
  const badge = searchForBadge(group);
  const value = getValue(...badge)
  badgeValue += value
})
console.log(badgeValue);