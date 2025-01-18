const symbols = '0123456789abcdefghjklmnpqrstuvwxyz'.split('');

function toBase(num, base) {
  let decimal = num;
  let temp;
  let conversion = "";

  if (base > symbols.length || base <= 1) {
    throw new RangeError(`Radix must be less than ${symbols.length} and greater than 1`);
  }

  while (decimal > 0) {
    temp = Math.floor(decimal / base);
    conversion = symbols[(decimal - (base * temp))] + conversion;
    decimal = temp;
  }

  return conversion;
}

function fromBase(str, base) {
  let decimal = 0;
  let temp;
  let conversion = reverse(str);

  if (base > symbols.length || base < 2) {
    throw new RangeError(`Radix must be less than ${symbols.length} and greater than 1`);
  }

  let i = 0;

  while (conversion.length > 0) {
    temp = symbols.indexOf(conversion[0]);
    decimal += temp * Math.pow(base, i);
    conversion = conversion.slice(1);

    i++;
  }

  return decimal;
}

function reverse(str) {
  return str.split('').reverse().join('');
}

module.exports = {toBase, fromBase, reverse};
