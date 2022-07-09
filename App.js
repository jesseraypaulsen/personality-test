const { getItems } = require("./b5");
const calculateScore = require("@alheimsins/bigfive-calculate-score");
const getResult = require("@alheimsins/b5-result-text");
import { useState, useEffect } from "react";
import InventoryBar from "./InventoryBar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import ListIcon from "@mui/icons-material/List";
import QuestionCard from "./QuestionCard";

const editText = (text) => {
  let firstChar = text.charAt(0);
  let lowerFirstChar = firstChar.toLowerCase();
  let decapText = text.slice(1);
  return "I " + lowerFirstChar + decapText + ".";
};
// arg true/false for shuffling the items
const items = getItems(true).map((item, n) => {
  if (n < 10) {
    item.score = 50;
  } else {
    item.score = null;
  }

  item.text = editText(item.text);
  //console.log(item);
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
  return (
    <>
      <ListIcon fontSize="large" onClick={() => setOpen(true)} />
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
        <QuestionCard selectedItem={selectedItem} />
      </Container>
    </>
  );
}
