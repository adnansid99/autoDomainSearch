const randomWords = require("random-words");

function generateWord(length) {
  const word = randomWords({ exactly: 1, maxLength: length })[0];
  return word + ".com";
}

module.exports = generateWord;
