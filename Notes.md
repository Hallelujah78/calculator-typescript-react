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
  - `9----9` causes a uncaught syntax error!

## Goals for Revistiting this App

- practice using TypeScript with React
- improve the app to the point where I can include it in my portfolio
- see if using decimal.js-light can resolve the floating point math `0.30000000000000004` issue

## Todo

- examine old code and see if you can figure out what is going on!
  - is there anything worth keeping?
- think about design of new app
