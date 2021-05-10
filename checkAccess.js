const fs = require("fs");
const chalk = require("chalk");

const checkInputFileAccess = (input) => {
  if (input) {
    try {
      fs.accessSync(input, fs.constants.F_OK | fs.constants.R_OK);
    } catch (error) {
      process.stderr.write(chalk.red(error));
      process.exit(1);
    }
  }
};

const checkOutputFileAccess = (output) => {
  if (output) {
    try {
      fs.accessSync(output, fs.constants.F_OK | fs.constants.W_OK);
    } catch (error) {
      process.stderr.write(chalk.red(error));
      process.exit(1);
    }
  }
};

module.exports = {
    checkInputFileAccess,
    checkOutputFileAccess
}
