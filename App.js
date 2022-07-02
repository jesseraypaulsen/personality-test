const { getItems } = require("./b5");
const calculateScore = require("@alheimsins/bigfive-calculate-score");
const getResult = require("@alheimsins/b5-result-text");
import { useState, useEffect } from "react";
import InventoryBar from "./InventoryBar";

// arg true/false for shuffling the items
const items = getItems(true).map((item) => {
  item.score = null;
  return item;
});

export function App() {
  const [inventory, setInventory] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentItem, setCurrentItem] = useState(1);

  useEffect(() => {
    (async () => {
      await setInventory(items);
      console.log(inventory);
    })(); // using async IIFE because setState is asynchronous
  }, []);
  return <InventoryBar items={items} />;
}
