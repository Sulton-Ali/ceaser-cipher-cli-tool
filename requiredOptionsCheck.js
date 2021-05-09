const chalk = require("chalk");

const requiredOptionsCheck = (action, shift) => {
  if (!action || !shift) {
    if (!action) process.stderr.write(chalk.red("Action is required!"));
    if (!shift) process.stderr.write(chalk.red("Shift is required!"));
    process.exit(1);
  }

  if (isNaN(shift)) {
    process.stderr.write(chalk.red("The shift amount must be a number!"));
    process.exit(1);
  }

  if (shift.split("").includes(".")) {
    process.stderr.write(chalk.red("The shift must be a integer number!"));
    process.exit(1);
  }
};

module.exports = requiredOptionsCheck;