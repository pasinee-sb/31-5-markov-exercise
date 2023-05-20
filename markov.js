/** Textual markov chain generator */

let fs = require("fs");
let textFromFile;

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let wordArr = this.words;

    //create empty object
    let chains = {};

    //loop through word array
    for (let i = 0; i < wordArr.length; i++) {
      let currentWord = wordArr[i];
      let nextWord = wordArr[i + 1];

      //if key:value is not already existed in the object, make one with key being the current word and value being an empty list
      if (!chains[currentWord]) {
        chains[currentWord] = [];
      }

      //if nextWord is null, push null value
      if (nextWord == null) {
        chains[currentWord].push(null);

        //else, push the next words the object value array
      } else {
        chains[currentWord].push(nextWord);
      }
    }
    // TODO
    // console.log(`This is chains ${chains}`);

    this.chains = chains;
  }

  /** return random text from chains */

  //pick random choice from array
  static choice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  makeText(numWords = 100) {
    let textMade = [];

    //Get keys array
    let keysArr = Object.keys(this.chains);

    //randomize key and then push key
    let key = MarkovMachine.choice(keysArr);
    // console.log(`This is the first key:  ${key}`);
    textMade.push(key);

    for (let i = 1; i < numWords; i++) {
      //get a random word from key chains
      let word = MarkovMachine.choice(this.chains[key]);

      // console.log(`This is text made: ${textMade}`);
      //if word is null, stop
      if (word == null) {
        // console.log(`This is randomized word : ${word}`);
        break;
        //else push that randomized word and make the word the new key
      } else {
        // console.log(`This is randomized word : ${word}`);
        textMade.push(word);
        key = word;
        // console.log(`This is new key: ${key}`);
      }
    }
    // TODO
    //Join the textMade array

    return textMade.join(" ");
  }
}

module.exports = {
  MarkovMachine,
};

// fs.readFile("eggs.txt", "utf8", function (err, data) {
//   if (err) {
//     console.log(`This is error: ${err}`);
//   } else {
//     textFromFile = data;

//     let marKoved = new MarkovMachine("the cat in the hat");
//     // let marKoved = new MarkovMachine(textFromFile);

//     return marKoved.makeText();
//   }
// });
