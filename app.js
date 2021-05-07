const fs = require('fs');
const { pipeline } = require('stream');
const CipherTransform = require('./cipher');

const args = [...process.argv];
const actionFlag = args[2];
const actionValue = args[3];
const shiftFlag = args[4];
const shiftValue = args[5];

// const inputFlag = args[6];
// const inputValue = args[7];
// const shiftFlag = args[8];
// const shiftValue = args[9];

if (args.includes('-a') || args.includes('--action'))

if (!actionFlag || !actionValue || !shiftFlag || !shiftValue) {
  if (!actionFlag || !actionValue) console.log('Не введен тип действие!');
  if (!shiftFlag || !shiftValue) console.log('Не введен количество сдвига!');

  process.exit(1);
}

let cipherTransform = new CipherTransform(actionValue, actionValue === 'encode' ? shiftValue : -shiftValue);

pipeline(
  fs.createReadStream('input.txt', 'utf-8'),
  cipherTransform,
  fs.createWriteStream('output.txt'),
  (err) => {
    if (err) {
      console.log(err);
    }
  }
).then(data => console.log(data))


