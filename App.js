import { useState, useEffect } from "react";
import Questionary from "./Questionary";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";

export function App({ inventory }) {
  const [scores, setScores] = useState([]);
  const [open, setOpen] = useState(false);
  const [autoStep, setAutoStep] = useState(true);
  const [selectedItem, setSelectedItem] = useState({
    text: "",
    choices: null,
  });

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
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            inventory={inventory}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            isScored={isScored}
            setOpen={setOpen}
            autoStep={autoStep}
            toggleAutoStep={toggleAutoStep}
            open={open}
            setAutoStep={setAutoStep}
          />
        }
      >
        <Route
          index
          element={
            <Questionary
              selectedItem={selectedItem}
              updateItemScore={updateItemScore}
              scores={scores}
              nextStep={nextStep}
              backStep={backStep}
            />
          }
        />
      </Route>
    </Routes>
  );
}
