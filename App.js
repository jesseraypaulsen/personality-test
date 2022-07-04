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
    (() => {
      setInventory(items);
      console.log(inventory);
    })();
  }, []);
  return <InventoryBar items={inventory} />;
}
