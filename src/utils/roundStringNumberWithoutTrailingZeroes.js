/**
 * Converts num to a decimal string (if it isn't one already) and then rounds it
 * to at most dp decimal places.
 *
 * For explanation of why you'd want to perform rounding operations on a String
 * rather than a Number, see http://stackoverflow.com/a/38676273/1709587
 *
 * @param {(number|string)} num
 * @param {number} dp
 * @return {string}
 */
export function roundStringNumberWithoutTrailingZeroes(num, dp) {
  if (arguments.length != 2) throw new Error("2 arguments required");

  num = String(num);
  if (num.indexOf("e+") != -1) {
    // Can't round numbers this large because their string representation
    // contains an exponent, like 9.99e+37
    throw new Error("num too large");
  }
  if (num.indexOf(".") == -1) {
    // Nothing to do
    return num;
  }
  if (num[0] == "-") {
    return "-" + roundStringNumberWithoutTrailingZeroes(num.slice(1), dp);
  }

  var parts = num.split("."),
    beforePoint = parts[0],
    afterPoint = parts[1],
    shouldRoundUp = afterPoint[dp] >= 5,
    finalNumber;

  afterPoint = afterPoint.slice(0, dp);
  if (!shouldRoundUp) {
    finalNumber = beforePoint + "." + afterPoint;
  } else if (/^9+$/.test(afterPoint)) {
    // If we need to round up a number like 1.9999, increment the integer
    // before the decimal point and discard the fractional part.
    // We want to do this while still avoiding converting the whole
    // beforePart to a Number (since that could cause loss of precision if
    // beforePart is bigger than Number.MAX_SAFE_INTEGER), so the logic for
    // this is once again kinda complicated.
    // Note we can (and want to) use early returns here because the
    // zero-stripping logic at the end of
    // roundStringNumberWithoutTrailingZeroes does NOT apply here, since
    // the result is a whole number.
    if (/^9+$/.test(beforePoint)) {
      return "1" + beforePoint.replaceAll("9", "0");
    }
    // Starting from the last digit, increment digits until we find one
    // that is not 9, then stop
    var i = beforePoint.length - 1;
    while (true) {
      if (beforePoint[i] == "9") {
        beforePoint =
          beforePoint.substr(0, i) + "0" + beforePoint.substr(i + 1);
        i--;
      } else {
        beforePoint =
          beforePoint.substr(0, i) +
          (Number(beforePoint[i]) + 1) +
          beforePoint.substr(i + 1);
        break;
      }
    }
    return beforePoint;
  } else {
    // Starting from the last digit, increment digits until we find one
    // that is not 9, then stop
    var i = dp - 1;
    while (true) {
      if (afterPoint[i] == "9") {
        afterPoint = afterPoint.substr(0, i) + "0" + afterPoint.substr(i + 1);
        i--;
      } else {
        afterPoint =
          afterPoint.substr(0, i) +
          (Number(afterPoint[i]) + 1) +
          afterPoint.substr(i + 1);
        break;
      }
    }

    finalNumber = beforePoint + "." + afterPoint;
  }

  // Remove trailing zeroes from fractional part before returning
  return finalNumber.replace(/0+$/, "");
}
