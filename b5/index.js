/* This file is a slightly modified version of index.js from @alheimsins/b5-johnson-120-ipip-neo-pi-r .
Parcel does not allow variables in CommonJS require statements, so I had to modify it.
To further simplify things I extracted only the English data.*/

const { knuthShuffle } = require("knuth-shuffle");

module.exports.getItems = (shuffle = false) => {
  let choices, questions;
  try {
    questions = require(`./questions.json`);
    choices = require(`./choices`);
  } catch (error) {
    throw new Error("Inventory not found. Try another language input.");
  }

  const inventory = shuffle === true ? knuthShuffle(questions) : questions;

  return inventory.map((question, i) =>
    Object.assign(question, { num: ++i, choices: choices[question.keyed] })
  );
};

module.exports.getInfo = () => ({
  name: "Johnson's IPIP NEO-PI-R",
  id: "johnson-120-ipip-neo-pi-r",
  shortId: "b5-120",
  time: 10,
  questions: 120,
  note: "Recommended",
  //languages,
});

module.exports.getChoices = () => {
  let choices;
  try {
    choices = require(`./choices`);
  } catch (error) {
    throw new Error("Choices not found. Try another language input.");
  }
  return choices;
};

module.exports.getQuestions = () => {
  let questions;
  try {
    questions = require(`./questions`);
  } catch (error) {
    throw new Error("Questions not found. Try another language input.");
  }
  return questions;
};
