var whois = require("whois");
const fs = require("fs");
const generateUniqueWord = require("./generateWord");

let curIndex = 0;

const dataSaver = async (domainName, wordSize) => {
  let file;

  if (fs.existsSync(`output-${wordSize}.json`)) {
    file = JSON.parse(fs.readFileSync(`output-${wordSize}.json`));
  } else {
    file = [];
  }

  file.push(domainName);

  fs.writeFile(`output-${wordSize}.json`, JSON.stringify(file), (err) => {
    if (err) {
      console.log("ERROR: ", err);
    }
  });
};

const autoDomainSearch = async (wordSize = 6, length = 10) => {
  if (curIndex < length) {
    myLookup(wordSize, length);
  }
};

const myLookup = (wordSize, length) => {
  const domainName = generateUniqueWord();

  whois.lookup(domainName, async (err, data) => {
    if (err) {
      console.error("WHO IS Server error : ", err);
    }

    if (data?.includes("No match for domain")) {
      dataSaver(domainName, wordSize);
      console.log(`${curIndex + 1}: ${domainName} is available!`);
    } else {
      console.log(`${curIndex + 1}: ${domainName} is not available.`);
    }

    curIndex = curIndex + 1;

    if (curIndex < length) {
      myLookup(wordSize, length);
    }
  });
};

module.exports = autoDomainSearch;
