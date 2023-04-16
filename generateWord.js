const randomWords = require("random-words");

function generateRandomWord() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let word = '';

  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    word += alphabet[randomIndex];
  }

  return word + ".com";
}


module.exports = generateWord;
