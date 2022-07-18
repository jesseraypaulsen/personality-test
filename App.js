const { getItems } = require("./b5");
const calculateScore = require("@alheimsins/bigfive-calculate-score");
const getResult = require("@alheimsins/b5-result-text");
import { useState, useEffect } from "react";
import InventoryBar from "./InventoryBar";
import Container from "@mui/material/Container";
import QuestionCard from "./QuestionCard";
import Box from "@mui/material/Box";
import Header from "./Header.js";
import ManualStepper from "./ManualStepper";

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
  const [autoStep, setAutoStep] = useState(true);

  useEffect(() => {
    (() => {
      setInventory(items);
      //setSelectedItem(inventory[0]);
    })();
  }, []);

  useEffect(() => {
    console.log(selectedItem);
  }, [selectedItem]);

  const stepper = (nextIndex) => {
    const nextItem = inventory[nextIndex];
    setTimeout(() => {
      setSelectedItem(nextItem);
    }, 1000);
  };

  const toggleAutoStep = () => {
    setAutoStep((prev) => !prev);
  };

  const updateItemScore = (id, nextIndex, score) => {
    let newScore = parseInt(score);
    let freshInventory = inventory.map((item) => {
      if (item.id === id) {
        let newItem = { ...item, score: newScore };
        //change current item so that the radio button will be visibly selected,
        //before the stepper is invoked.
        setSelectedItem(newItem);
        return newItem;
      }
      return item;
    });
    setInventory(freshInventory);
    if (autoStep) {
      stepper(nextIndex);
    }
  };

  return (
    <>
      <Header
        setOpen={setOpen}
        autoStep={autoStep}
        toggleAutoStep={toggleAutoStep}
      />
      <InventoryBar
        inventory={inventory}
        open={open}
        setOpen={setOpen}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        toggleAutoStep={toggleAutoStep}
      />
      <Container
        maxWidth="sm"
        sx={{
          //backgroundColor: "primary.light"
          marginTop: "3em",
        }}
      >
        <QuestionCard
          selectedItem={selectedItem}
          updateItemScore={updateItemScore}
          key={selectedItem.id}
        />
        <ManualStepper />
      </Container>
    </>
  );
}
