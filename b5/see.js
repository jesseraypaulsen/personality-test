/* This is a node script I created. It's not part of the working app. It just provides a 
simple way to see an individual data item so you can understand how the @b5-johnson-ipip-neo-pi-r
module works.

Each item is a combination of a question and one of two choice sets ("minus" or "plus").
The set of choices is decided by the 'keyed' property on each question.

To execute the script in the terminal:
node see 1
 or
node see 2
 or
node see 3
*/

const { getItems, getInfo, getChoices, getQuestions } = require("./index.js");

// accept an argument when executing node script from the command line.
const arg = process.argv.slice(2)[0];

// if the argument is 1, show the first item by itself.
if (arg == 1) {
  console.log(getItems()[0]);
}

// look at the first question by itself.
if (arg == 2) {
  console.log(getQuestions()[0]);
}

if (arg == 3) {
  console.log(getChoices());
}

if (arg == 4) {
  console.log(getInfo());
}
