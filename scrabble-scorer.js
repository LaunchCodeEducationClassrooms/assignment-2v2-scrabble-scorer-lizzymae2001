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
	word = word.toLowerCase();
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
   return initialWord = input.question("Let's play some Scrabble!\n\nEnter a word to score: ");
   // console.log(oldScrabbleScorer(initialWord));
};

let simpleScore = function(word) {
  word = word.toLowerCase();
  let totalSimple = 0;
  for (let i = 0; i < word.length; i++) {
    if (word[i] !== ' '){
      totalSimple += 1;
    } else {
      totalSimple +=0;
      }
    }
  return totalSimple;
  }


let vowels = ['a', 'e', 'i', 'o', 'u']

let vowelBonusScore = function(word) {
  word = word.toLowerCase();
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
  word = word.toLowerCase();
  let scrabblePoints = 0;
  for (i = 0; i < word.length; i++){
    scrabblePoints += newPointStructure[word[i]];
  }
  return scrabblePoints;
};


const scoringAlgorithms = [
  { name: 'Simple Score', 
  description: 'Each letter is worth 1 point.', 
  scorerFunction: simpleScore 
  },
  { name: 'Bonus Vowels', 
  description: 'Vowels are 3 pts, consonants are 1 pt.', 
  scorerFunction: vowelBonusScore 
  }, 
  { name: 'Scrabble', 
  description: 'The traditional scoring algorithm', 
  scorerFunction: scrabbleScore 
  }
];

function scorerPrompt() {
  let scoreType = Number(input.question("Which scoring algorithm would you like to use?\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2: ")); 
  if (scoreType === 0 || scoreType === 1 || scoreType === 2){
   console.log(`Score for '${initialWord}': ${scoringAlgorithms[scoreType].scorerFunction(initialWord)}`);
   } else {
     console.log('Invalid input...');
     scorerPrompt();
 }
};


function transform(object) {
  let transformedObject = {};
  for(item in object){
    for (i = 0; i < object[item].length; i++){
      let key = object[item][i].toLowerCase();
      transformedObject[`${key}`] = Number(item);
    }
  }
  return transformedObject;
};

let newPointStructure = transform(oldPointStructure);

newPointStructure[' '] = 0;


function runProgram() {
   initialPrompt();
   scorerPrompt();
   transform();
  //console.log(newPointStructure);
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