# Caesar cipher CLI tool
* Description: https://github.com/rolling-scopes-school/basic-nodejs-2021Q2/blob/master/descriptions/caesar-cipher-cli-tool.md
* Cross-check criteria: https://github.com/rolling-scopes-school/basic-nodejs-2021Q2/blob/master/cross-check/caesar-cipher-cli-tool.md

## How to work with the program

### Install

- Fork and/or clone repo your machine as:
    > git clone git@github.com:Sulton-Ali/ceaser-cipher-cli-tool.git
    
- Go to root directory: 
    > cd ceaser-cipher-cli-tool
- Run: 
    > git checkout ceaser-cipher-cli-tool
  - if have error, run
    > git checkout ceaser-cipher-cli-tool --force
- Install dependencies:
    > npm install

- Add global command ceaser-cli
    > npm link
                       
and program ready to use

### Usage

### Following commands and options:
- Commands:
    > ceaser-cli

- Options: 
  > -V, --version          output the version number

  > -a, --action < action >  action what does app must do (choices: "encode", "decode")

  > -s, --shift < shift >    value indicating how much to shift

  > -i, --input [ input ]    path to input file

  > -o, --output [ output ]  path to output file

  > -h, --help             display help for command

example: ceaser-cli --version

- if provided all options, program read input file and write result into output file
- Example
    - input.txt: 
        > This is secret. Message about "_" symbol!
        >

            > ceaser-cli --action encode --shift 10 --input input.txt --output output.txt

    - output.txt:
        > Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!

- if input and/or output file empty, data will enter and/or show  in console (for terminate process use Ctrl + C )
    >

        > ceaser-cli --action encode --shift 10
        > hello
        > olssv
        > ^C

## Developer: Jalolov Sultonali 
- Sulton-Ali (github)
- @JSS_9377 (telegram)
- Sultonali#5739 (Discord)