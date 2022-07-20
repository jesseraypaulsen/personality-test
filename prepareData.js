import getItems from "./b5";

const editText = (text) => {
  let firstChar = text.charAt(0);
  let lowerFirstChar = firstChar.toLowerCase();
  let decapText = text.slice(1);
  return "I " + lowerFirstChar + decapText + ".";
};
// arg true/false for shuffling the items
export const inventory = getItems(true).map((item, n) => {
  item.score = null;
  item.text = editText(item.text);
  return item;
});
