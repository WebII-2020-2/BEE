export default (value, withSymbol) => {
  const keyboard = value[value.length - 1];
  const codeSymbol = [32, 40, 41, 45];
  const codeNumber = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
  if (keyboard) {
    const charCode = keyboard.charCodeAt();
    if (!withSymbol && codeNumber.indexOf(charCode) !== -1) {
      return true;
    }
    if (withSymbol && codeNumber.concat(codeSymbol).indexOf(charCode) !== -1) {
      return true;
    }
  } else {
    return true;
  }
  return false;
};
