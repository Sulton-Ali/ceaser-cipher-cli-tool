const fs = require("fs");
const os = require("os");
const { pipeline } = require("stream");
const { Command, Option } = require("commander");
const chalk = require("chalk");
const { prompt } = require("inquirer");
const CipherTransform = require("./cipher");

const program = new Command();

program.version("1.0.0").description("Ceaser cipher CLI tool");

program
  .command("my_ceaser_cli")
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

    let inputFileAccess = true;
    try {
      fs.accessSync(
        input,
        fs.constants.R_OK
      );
    } catch (error) {
      inputFileAccess = false;
    }

    let outputFileAccess = true;
    try {
      fs.accessSync(
        output,
        fs.constants.W_OK
      );
    } catch (error) {
      outputFileAccess = false;
    }

    const inputStream = input && inputFileAccess
      ? fs.createReadStream(input, "utf-8")
      : process.stdin;
    const outputStream = output && outputFileAccess
      ? fs.createWriteStream(output)
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

    let cipherTransform = new CipherTransform(
      action,
      action === "encode" ? Number(shift) : -Number(shift)
    );

    process.stdin.once('readable', () => {
      var chunk = process.stdin.read();
      if (chunk !== null) {
        process.stdout.write(`data: ${chunk}`);
      }
    });

    pipeline(
      inputStream,
      cipherTransform,
      outputStream,
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  });

program.parse(process.argv);
