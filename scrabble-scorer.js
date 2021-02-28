// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");
let initialWord = '';


const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {

	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `\nPoints for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }


// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //


function initialPrompt() {
   initialWord = input.question("Let's play some Scrabble!\n\nEnter a word to score: ");
   return initialWord;
   // console.log(oldScrabbleScorer(initialWord));
};

let simpleScore = function(word) {
  word = word.toUpperCase();
  let totalSimple = 0;
  for (let i = 0; i < word.length; i++) {
    totalSimple += 1;
    }
  return totalSimple;
  }


let vowels = ['A', 'E', 'I', 'O', 'U']

let vowelBonusScore = function(word) {
  word = word.toUpperCase();
  let totalBonusScore = 0;
    for (let i = 0; i < word.length; i++) {
      if (vowels.includes(word[i])) {
      totalBonusScore += 3
       } else {
       totalBonusScore += 1;
        }
      }
  return totalBonusScore;
}

function scrabbleScore(word) {
  word = word.toUpperCase();
  let scrabblePoints = 0;
  for (i = 0; i < word.length; i++){
    let letter = word[i];
    scrabblePoints += newPointStructure[letter];
  }
  return scrabblePoints;
};


const simple = {
  name: 'Simple Score',
  description: 'Each letter is worth 1 point.',
  scorerFunction: simpleScore
};

const bonus = {
  name: 'Bonus Vowels',
  description: 'Vowels are 3 pts, consonants are 1 pt.',
  scorerFunction: vowelBonusScore
};

const scrabble = {
  name: 'Scrabble',
  description: 'The traditional scoring algorithm',
  scorerFunction: scrabbleScore
};

const scoringAlgorithms = [simple, bonus, scrabble];


function scorerPrompt() {
  let scoreType = input.question("Which scoring algorithm would you like to use?\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2: "); 

  console.log(`Score for '${initialWord}': ${scoringAlgorithms[scoreType].scorerFunction(initialWord)}`);
};


function transform(oldPointStructure) {
  for(items in oldPointStructure){
    for (i = 0; i < oldPointStructure['1'].length; i++){
      oldPointStructure[oldPointStructure['1'][i]] = 1;
    }
    for (i = 0; i < oldPointStructure['2'].length; i++){
      oldPointStructure[oldPointStructure['2'][i]] = 2;
    }
    for (i = 0; i < oldPointStructure['3'].length; i++){
      oldPointStructure[oldPointStructure['3'][i]] = 3;
    }
    for (i = 0; i < oldPointStructure['4'].length; i++){
      oldPointStructure[oldPointStructure['4'][i]] = 4;
    }
    for (i = 0; i < oldPointStructure['5'].length; i++){
      oldPointStructure[oldPointStructure['5'][i]] = 5;
    }
    for (i = 0; i < oldPointStructure['8'].length; i++){
      oldPointStructure[oldPointStructure['8'][i]] = 8;
    }
    for (i = 0; i < oldPointStructure['10'].length; i++){
      oldPointStructure[oldPointStructure['10'][i]] = 10;
    }
  }
  return oldPointStructure;
};

let newPointStructure = transform(oldPointStructure);

//console.log("Scrabble scoring values for");
//console.log("letter a: ", newPointStructure.a);
//console.log("letter j: ", newPointStructure.j);
//console.log("letter z: ", newPointStructure["z"]);


function runProgram() {
   initialPrompt();
   scorerPrompt();
   transform();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};