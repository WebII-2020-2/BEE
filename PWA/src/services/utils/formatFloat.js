export default (number) =>
  number ? number.toFixed(2).toString().replace('.', ',') : 0;
