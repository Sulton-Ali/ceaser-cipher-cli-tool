const fs = require("fs");
const chalk = require("chalk");

const createReadableStream = (input) => {
  return input ? fs.createReadStream(input, "utf-8") : process.stdin;
};

const createWriteableStream = (output) => {
  return output
    ? fs.createWriteStream(output, {
        flags: "a",
      })
    : process.stdout;
};

module.exports = {
    createReadableStream,
    createWriteableStream
}
