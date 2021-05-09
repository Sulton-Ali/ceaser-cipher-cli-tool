const { Transform } = require('stream');

class CipherTransform extends Transform {

  constructor(action, shift) {
    super();
    this.action = action;
    this.shift = shift;
  }

  encodeSymbol(item, shift) {
    const itemCode = item.charCodeAt(0);
    if (65 <= itemCode && 90 >= itemCode) {
      const currentShift = (((itemCode - 65) + (shift % 26)) % 26);
      const codePoint = currentShift >= 0 ? (65 + currentShift) : (65 + currentShift + 26);
      return String.fromCodePoint(codePoint);
    }

    if (97 <= itemCode && 122 >= itemCode) {
      const currentShift = (((itemCode - 97) + (shift % 97)) % 26);
      const codePoint = currentShift >= 0 ? (97 + currentShift) : (97 + currentShift + 26);
      return String.fromCodePoint(codePoint);
    }
    return item;
  }

  _transform(chunk, encoding, callback) {
    try {
      let arr = chunk.toString().split('');
      let resultArr = arr.map(item => {
        return this.action === 'encode' ? this.encodeSymbol(item, this.shift) : this.encodeSymbol(item, -this.shift);
      });
      callback(null, resultArr.join(''));
    } catch (e) {
      callback(e);
    }
  }
}

module.exports = CipherTransform;