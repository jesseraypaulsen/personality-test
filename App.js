import { useState, useEffect } from "react";
import InventoryBar from "./InventoryBar";
import Container from "@mui/material/Container";
import QuestionCard from "./QuestionCard";
import Header from "./Header.js";
import ManualStepper from "./ManualStepper";

// inventory should be props not state. only put id and score in state.
// selectedItem should be a regular variable, not state.
// index should be computed on each render, and then used to get selectedItem.

export function App({ inventory, calculateScore, getResult }) {
  const [scores, setScores] = useState([]);
  const [open, setOpen] = useState(false);
  const [autoStep, setAutoStep] = useState(true);
  const [selectedItem, setSelectedItem] = useState({
    text: "",
    choices: null,
  });

  useEffect(() => {
    console.log(selectedItem);
  }, [selectedItem]);

  useEffect(() => {
    console.log(`scores: ${JSON.stringify(scores)}`);
  }, [scores]);

  //function that finds out if score exists or not, using id
  const isScored = (id) => {
    return scores.find((score) => score.id === id) ? true : false;
  };

  const nextStep = (id) => {
    let currIndex = inventory.findIndex((item) => item.id === id);
    let nextItem = inventory[currIndex + 1];
    if (currIndex < 120) setSelectedItem(nextItem);
  };

  const backStep = (id) => {
    let currIndex = inventory.findIndex((item) => item.id === id);
    let prevItem = inventory[currIndex - 1];
    if (currIndex > 0) setSelectedItem(prevItem);
  };

  const toggleAutoStep = () => {
    setAutoStep((prev) => !prev);
  };

  uniqByKeepLast = (data) => {
    return [...new Map(data.map((x) => [x.id, x])).values()];
  };

  const updateItemScore = (id, score) => {
    let newScore = parseInt(score);

    const newScores = uniqByKeepLast([...scores, { id, value: newScore }]);
    setScores(newScores);

    if (autoStep) {
      setTimeout(() => {
        nextStep(id);
      }, 1000);
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
        setAutoStep={setAutoStep}
        isScored={isScored}
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
          scores={scores}
        />
        <ManualStepper
          nextStep={() => nextStep(selectedItem.id)}
          backStep={() => backStep(selectedItem.id)}
        />
      </Container>
    </>
  );
}
