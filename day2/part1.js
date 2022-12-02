// part 1

// first column is the opponent
// a = rock (1) --> x?
// b = paper (2) --> y?
// c = scissors (3) --> z?

// winner = highest score
// score is the shape you played + 6 if winning / 3 if draw / 0 if lost

import { readFileSync } from 'node:fs';

let data = []

const input = readFileSync('./day2/input.txt', 'utf-8');
const lines = input.split(/\r?\n/)

const makeRounds = (round => {
  const matchup = {
    opponent: decrypt(round[0]),
    you: decrypt(round[1])
  }
  return matchup;
});

const decrypt = (move => {
  if (move == 'A' || move == 'X') {
    return {
      move: 'rock',
      score: 1
    }
  } else if (move == 'B' || move == "Y") {
    return {
      move: 'paper',
      score: 2
    }
  } else {
    return {
      move: 'scissors',
      score: 3,
    }
  }
})

const rounds = lines.forEach(match => {
  const round = match.split(' ')
  data.push(makeRounds(round))
})

const determineScore = (round) => {
  // draw
  if (round.opponent.move === round.you.move) {
    return 3;
  } else if (round.opponent.score == 3 && round.you.score == 1 || round.opponent.score + 1 == round.you.score) {
    return 6;
  } else return 0;
}

const calculateRound = (round) => {
  let score = round.you.score;
  score += determineScore(round)

  return score;
}

let totalScore = 0;
data.forEach(round => {
  totalScore += calculateRound(round)
})

console.log(totalScore);