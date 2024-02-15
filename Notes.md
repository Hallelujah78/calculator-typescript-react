# Revisiting My Original React Calculator

## Original Project

- original project available [here](https://calculator-gwib.netlify.app/ "react calculator app on netlify")
- original project created as part of the FreeCodeCamp (FCC) syllabus for the Front-end Development Libraries Certificate

Given that I have just finished a TypeScript course, I decided to revisit this project, hopefully improving upon it and adding TypeScript. The original project is not part of my portfolio for a number of reasons:

- the code is terrible
- it looks awful
- it passes the FCC test suite tests but there are many problems:
  - 0.1 + 0.2 is 0.30000000000000004
  - entering `0.02` resolves to `2`
    - the first number you enter cannot have a decimal point followed by any number of zeros and then another integer
    - `.00` resolves to `0`
    - `.03` resolves to `3` etc
  - `9---9` equals `0`
  - `9----9` causes an uncaught syntax error!

## Goals for Revistiting this App

- practice using TypeScript with React
- improve the app to the point where I can include it in my portfolio
- see if using decimal.js-light can resolve the floating point math `0.30000000000000004` issue in terms of displaying sensible results to the user

## Todo

- examine old code and see if you can figure out what is going on!
  - is there anything worth keeping?
- think about design of new app

## Floating Point Precision

- numbers are stored in binary in memory
- 0.1 is an infinitely recurring number when stored in binary
  - compare 1/3 converted to a decimal where the 3 recurs infinitely
  - we don't think of this infinite recurrence as a problem in decimal math
- 0.2 is the same
- for our purposes, we only care that the value displayed to the user of the calculator makes sense

## Strategy for dealing with Floating point precision

- arbitrarily limit the number of decimal places using `toPrecision()`
- [this](https://stackoverflow.com/questions/1458633/how-can-i-deal-with-floating-point-number-precision-in-javascript?noredirect=1&lq=1 "stackoverflow question and answers about floating point number precision") Stack Overflow post has some information
- from that question:

```js
function strip(number) {
  return parseFloat(number).toPrecision(12);
}
```

- this solution will round up 0.99999 repeating
  - not sure I want to do that
- 0.555555555555 + 0.444444444444 should give 0.999999999999 not 1
- the Samsung calculator on my A71 limits the number of digits
  - 15 digits total excluding the decimal point
  - only 10 digits allowed after the decimal point
  - this is allowed `555,555.555555555` - total of 15 digits
- the answers suggest limiting precision to 7 or 15 for 32 and 64 bit systems respectively
  - the A71 is 64 bit and so it makes sense that it can handle 10 places of decimals
- I am wondering what would happen if you have a 32 bit system that runs a calculator in the browser and you use `toPrecision` to more than 7 or attempt to use 15?
  - I would assume unexpected results would be displayed to the user
- should explore this by first building a very basic app that allows inputting two numbers and an operand and see what happens with various strategies
