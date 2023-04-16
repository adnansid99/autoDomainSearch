const fs = require('fs');

function generateUniqueWord() {
  // Load array file if it exists, or create a new empty array
  let usedWords = [];
  if (fs.existsSync('usedWords.json')) {
    usedWords = require('./usedWords.json');
  }

  // Function to generate a random 3-letter word
  function generateWord() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let word = '';
    for (let i = 0; i < 3; i++) {
      word += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return word;
  }

  // Generate a unique word and add it to the usedWords array
  let word = '';
  let attempts = 0;
  const maxAttempts = 17576; // maximum number of attempts to generate a unique word
  while ((word === '' || usedWords.includes(word)) && attempts < maxAttempts) {
    word = generateWord();
    attempts++;
  }

  if (attempts >= maxAttempts) {
    throw new Error('No unique 3-letter words available.');
  } else {
    usedWords.push(word);

    // Save the usedWords array to a file
    fs.writeFileSync('usedWords.json', JSON.stringify(usedWords));

    return word + ".com";
  }
}

module.exports = generateUniqueWord;
