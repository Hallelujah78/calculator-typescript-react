function App() {
  console.log(parseFloat((0.1 * 0.2).toPrecision(16)));
  console.log(parseFloat((0.9999999999 * 0.9999999999).toPrecision(10)));
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
