import { useState, useEffect } from "react";
import Questionary from "./Questionary";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Results from "./Results";

export function App({ inventory, processResults, generateFakeScores }) {
  const [scores, setScores] = useState([]);
  const [currentUser, setCurrentUser] = useState("Lorenzo");
  const [open, setOpen] = useState(false);
  const [autoStep, setAutoStep] = useState(true);
  const [selectedItem, setSelectedItem] = useState({
    text: "",
    choices: null,
  });

  /* 
  TODO: if localStorage is empty, display modal with prompt for a username, along with message.
  if localStorage is not empty, display modal that shows current username and mentions the Dashboard to switch users.
  the dashboard's BarChart should render what the select menu tells it to. The selection menu must be controlled.
  */

  useEffect(() => {
    console.log("localStorage: ", localStorage);
    // update localStorage each time setScore is called
    if (currentUser) localStorage.setItem(currentUser, JSON.stringify(scores));
  }, [scores]);

  const clearStorage = () => {
    localStorage.clear();
    console.log("localStorage: ", localStorage);
  };

  const getResults = (scores) => processResults(inventory, scores);

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

  const uniqByKeepLast = (data) => {
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

  const fill = () => {
    const fakeScores = generateFakeScores(inventory);
    setScores(fakeScores);
  };
  //generateFakeScores(inventory, (values) => setScores(values));
  //this causes infinite renders, because the function executes every time the component
  //is rendered, and it changes state causing a render.
  console.log(`scores.length is ${scores.length}`);
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
            len={scores.length}
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
        <Route
          path="questionary"
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
        <Route
          path="results"
          element={
            <Results
              scores={scores}
              getResults={getResults}
              fill={fill}
              clearStorage={clearStorage}
            />
          }
        />
      </Route>
    </Routes>
  );
}
