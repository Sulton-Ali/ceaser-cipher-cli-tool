#!/usr/bin/env node
const fs = require("fs");
const { pipeline } = require("stream");
const { Command, Option } = require("commander");
const chalk = require("chalk");
const { prompt } = require("inquirer");
const CipherTransform = require("./cipher");

const program = new Command();

program.version("1.0.0").description("Ceaser cipher CLI tool");

program
  // .command("ceaser-cli")
  .addOption(
    new Option(
      "-a, --action <action>",
      "action what does app must do"
    ).choices(["encode", "decode"])
  )
  .option("-s, --shift <shift>", "value indicating how much to shift")
  .option("-i, --input [input]", "path to input file")
  .option("-o, --output [output]", "path to output file")
  .description("Crypto CLI: encode or decode")
  .action(({ action, shift, input, output }) => {
    process.stderr.setEncoding("UTF-8");
    process.stdin.setEncoding("utf8");
    process.stdout.setEncoding("utf8");

    try {
      fs.accessSync(input, fs.constants.F_OK | fs.constants.R_OK);
    } catch (error) {
      process.stderr.write(chalk.red(error));
      process.exit(1);
    }

    try {
      fs.accessSync(output, fs.constants.F_OK | fs.constants.W_OK);
    } catch (error) {
      process.stderr.write(chalk.red(error));
      process.exit(1);
    }

    const inputStream = input
      ? fs.createReadStream(input, "utf-8")
      : process.stdin;
    const outputStream = output
      ? fs.createWriteStream(output, {
          flags: "a",
        })
      : process.stdout;

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

    let cipherTransform = new CipherTransform(action, Number(shift));

    pipeline(inputStream, cipherTransform, outputStream, (err) => {
      if (err) {
        console.log(chalk.red("Pipeline failed: "), err);
      }
      console.log(chalk.green("Pipeline succeeded"));
    });
  });

program.parse(process.argv);
