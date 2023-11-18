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
  data.calculateResult = altCalculateResult;
  const results = getResult({ scores: calculateScore(data), lang: "en" });
  return results;
};

/* 
This replaces the default function in node_modules/@alheimsins/bigfive-calculate-score/reduce-factors.js .
With the default function only a score of 72 is neutral.. 71 and below is low and 73 and above are high.
This is obviously ridiculous. With this function, all scores ranging from 58 to 86 are neutral. All scores
ranging from 24 to 47 are low. All scores ranging from 87 to 120 are high. It's not possible to score lower
than 24 for any given domain because the lowest possible score for any given answer is 1, and each domain has
24 test items.
 
*/
function altCalculateResult(score, count) {
    const average = score / count
    let result = 'neutral'
    if (average > 3.6) {
      result = 'high'
    } else if (average < 2.4) {
      result = 'low'
    }
    return result
}

/*

Each domain value is the sum of all the scores within that domain. However when it comes to generating data for test purposes, 
I think it's a good idea to start with a domain value, and then randomly derive scores for all the items in that domain. This 
ensures that the test values are more realistic. Because when each score is generated with just a simple random number generator, 
the resulting domain values are all too close to the middle. Whereas real human results often seem to gather in relatively extreme 
highs and lows. I find it useful to think about combinations of low, neutral, and high.. with 5 domains, this yields 3^5, or 273, 
possible combinations.

Each score is an integer ranging from 1 to 5.
There are 24 scores for each domain.
The lowest possible domain value is 24, the highest is 120.

To generate a dataset you need the raw inventory supplied by the b5 module, and you need an array like this:
[ [ "E", 120 ], [ "C", 69 ], [ "O", 73 ], [ "N", 81 ], [ "A", 24 ] ]

 */

export const generateFakeScores = function (inventory) {
  const scoresPerDomain = selectDomainInput().map(v => ({ domain: v[0], scores: computeRandomSet(v[1]) }))

  return inventory.map((item) => {
    return {
      id: item.id,
      value: scoresPerDomain.find(s => s.domain == item.domain).scores.pop()
    }
  });
};


const selectDomainInput = () => {
  const items = [
    // [["O", 120], ["C", 72], ["E", 24], ["A", 72], ["N", 120]],
    [["O", 24], ["C", 72], ["E", 58], ["A", 86], ["N", 120]],
  ]
  //https://stackoverflow.com/a/5915122
  return items[items.length * Math.random() | 0]
}

//https://www.geeksforgeeks.org/how-to-generate-random-number-in-given-range-using-javascript/

function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//https://stackoverflow.com/a/60219212
//Generate random numbers, each within a given range, that sum to a pre-defined value N.

function randomSet(size, min, max, sum) {
  if (min * size > sum || max * size < sum) return false;

  var set = [];
  for (; size > 1; size--) {
    var randy = randomNumber(min, max);
    while (min * (size - 1) > sum - randy || max * (size - 1) < sum - randy) {
      randy = randomNumber(min, max);
    }
    set.push(randy);
    sum -= randy;
  }
  set.push(sum);

  return set;
}

function computeRandomSet(domainVal) {
  var myRandomSet = randomSet(24, 1, 5, domainVal);
  console.log(myRandomSet);
  console.log("SUM: " + myRandomSet.reduce((a, b) => a + b, 0));
  return myRandomSet
}