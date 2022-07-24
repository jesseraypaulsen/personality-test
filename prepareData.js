const { getItems } = require("./b5");
const calculateScore = require("@alheimsins/bigfive-calculate-score");
const getResult = require("@alheimsins/b5-result-text");

const editText = (text) => {
  let firstChar = text.charAt(0);
  let lowerFirstChar = firstChar.toLowerCase();
  let decapText = text.slice(1);
  return "I " + lowerFirstChar + decapText + ".";
};
// arg true/false for shuffling the items
export const inventory = getItems(true).map((item, n) => {
  item.text = editText(item.text);
  return item;
});

export const processResults = function (inventory, scores) {
  const data = {};
  data.answers = scores.map((score) => {
    const item = inventory.find((item) => item.id === score.id);
    return {
      domain: item.domain,
      facet: item.facet,
      score: score.value,
    };
  });
  const results = getResult({ scores: calculateScore(data), lang: "en" });
  return results;
};

export const generateFakeScores = function (inventory) {
  return inventory.map((item) => ({
    id: item.id,
    value: randomNumber(1, 5),
  }));
};

function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//https://www.geeksforgeeks.org/how-to-generate-random-number-in-given-range-using-javascript/
