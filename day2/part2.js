// part 2

// second column is round outcome
// x == ;ose
// y == draw
// z == win


import { readFileSync } from 'node:fs';

let data = []

const input = readFileSync('./day2/input.txt', 'utf-8');
const lines = input.split(/\r?\n/)

const makeRounds = (round => {
  // round == [opponent.move, outcome to match move to]
  const opponentMove = round[0];
  const desiredOutcome = round[1]

  const opponent = decrypt(opponentMove);
  const you = generateMove(opponent, desiredOutcome);

  const matchup = {
    opponent: opponent,
    you: you
  }

  return matchup;
});

const decrypt = (move => {
  if (move == 'A') {
    return {
      move: 'A',
      score: 1
    }
  } else if (move == 'B') {
    return {
      move: 'B',
      score: 2
    }
  } else {
    return {
      move: 'C',
      score: 3,
    }
  }
})

const generateMove = (opponent, outcome) => {
  // x == lose
  // y == draw
  // z == win
  let yourMove;

  if (outcome == 'Y') {
    yourMove = opponent;
  // just going to hardcode this, could probably do something smart with mapping the scores
  } else if (outcome == 'Z') {
    if (opponent.move == "C") {
      yourMove = decrypt('A')
    } else if (opponent.move == "A") {
      yourMove = decrypt('B');
    } else {
      yourMove = decrypt('C')
    }
  } else if (outcome == 'X'){
    if (opponent.move == "C") {
      yourMove = decrypt('B')
    } else if (opponent.move == "A") {
      yourMove = decrypt('C');
    } else {
      yourMove = decrypt('A')
    }
  }
  return yourMove;
}

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