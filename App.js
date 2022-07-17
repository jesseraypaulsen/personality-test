const { getItems } = require("./b5");
const calculateScore = require("@alheimsins/bigfive-calculate-score");
const getResult = require("@alheimsins/b5-result-text");
import { useState, useEffect } from "react";
import InventoryBar from "./InventoryBar";
import Container from "@mui/material/Container";
import QuestionCard from "./QuestionCard";
import Box from "@mui/material/Box";
import Header from "./Header.js";

const editText = (text) => {
  let firstChar = text.charAt(0);
  let lowerFirstChar = firstChar.toLowerCase();
  let decapText = text.slice(1);
  return "I " + lowerFirstChar + decapText + ".";
};
// arg true/false for shuffling the items
const items = getItems(true).map((item, n) => {
  item.score = null;
  item.text = editText(item.text);
  return item;
});

export function App() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    text: "",
    choices: null,
  });

  useEffect(() => {
    (() => {
      setInventory(items);
      //setSelectedItem(inventory[0]);
    })();
  }, []);

  useEffect(() => {
    console.log(selectedItem);
  }, [selectedItem]);

  const updateItemScore = (id, score) => {
    let newScore = parseInt(score);
    let freshInventory = inventory.map((item) => {
      if (item.id === id) {
        let newItem = { ...item, score: newScore };
        setSelectedItem(newItem);
        return newItem;
      }
      return item;
    });
    setInventory(freshInventory);
    findItem(id);
  };

  return (
    <>
      <Header setOpen={setOpen} />
      <InventoryBar
        inventory={inventory}
        open={open}
        setOpen={setOpen}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
      <Container
        maxWidth="sm"
        //sx={{ backgroundColor: "primary.light" }}
      >
        <QuestionCard
          selectedItem={selectedItem}
          updateItemScore={updateItemScore}
          key={selectedItem.id}
        />
      </Container>
    </>
  );
}
