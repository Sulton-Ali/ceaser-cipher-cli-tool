#!/usr/bin/env node
const fs = require("fs");
const { pipeline } = require("stream");
const { Command, Option } = require("commander");
const chalk = require("chalk");
const CipherTransform = require("./cipher");
const { createReadableStream, createWriteableStream } = require('./createStream');
const requiredOptionsCheck = require('./requiredOptionsCheck');
const { checkInputFileAccess, checkOutputFileAccess } = require('./checkAccess');

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

    checkInputFileAccess(input);
    checkOutputFileAccess(output);
    
    const inputStream = createReadableStream(input);
    const outputStream = createWriteableStream(output);

    requiredOptionsCheck(action, shift);

    let cipherTransform = new CipherTransform(action, Number(shift));

    pipeline(inputStream, cipherTransform, outputStream, (err) => {
      if (err) {
        console.log(chalk.red("Pipeline failed: "), err);
      }
      console.log(chalk.green("Pipeline succeeded"));
    });
  });

program.parse(process.argv);
