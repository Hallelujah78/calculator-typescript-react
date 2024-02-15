import { roundStringNumberWithoutTrailingZeroes } from "./utils/roundStringNumberWithoutTrailingZeroes.js";

function App() {
  console.log(parseFloat((0.1 * 0.2).toPrecision(16)));
  console.log(parseFloat((0.9999999999 * 0.9999999999).toPrecision(10)));
  console.log(parseFloat((99999 * 0.9 * 0.1).toPrecision(15)));
  console.log(parseFloat((9999 * 0.9 * 0.1).toPrecision(15)));
  console.log(parseFloat((999 * 0.9 * 0.1).toPrecision(15)));
  console.log(parseFloat((99 * 0.9 * 0.1).toPrecision(15)));
  console.log(parseFloat((1.000000000000005).toPrecision(15))); // correct: 1.00000000000001
  console.log(parseFloat((1.0000000000000005).toPrecision(15))); // correct: 1
  console.log(parseFloat((1.000000000000005 * 2.9).toFixed(15))); // correct: 1
  console.log(parseFloat((0.001 * 0.002).toPrecision(20)));

  return (
    <div>
      <input type="text" />
      <button>=</button>
    </div>
  );
}

export default App;

// only one leading zero allowed per number
// only one decimal place per number allowed
// numbers are separated by operators
// a number can only be 15 digits long
// the maximum number of digits after the decimal is 10
