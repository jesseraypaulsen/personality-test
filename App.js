import { useState, useEffect } from "react";
import Questionary from "./Questionary";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Results from "./Results";
import FormDialog from "./FormDialog";

export function App({ inventory, processResults, generateFakeScores }) {
  const [scores, setScores] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [userList, setUserList] = useState([]);
  const [modal, setModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [autoStep, setAutoStep] = useState(true);
  const [selectedItem, setSelectedItem] = useState({
    text: "",
    choices: null,
  });

  useEffect(() => {
    if (localStorage.length > 1) {
      const keys = Object.keys(localStorage);
      const names = keys.filter((key) => key !== "currentUser");
      const currentUserIndex = keys.findIndex((key) => key === "currentUser");
      if (currentUserIndex >= 0) {
        const _currentUser = localStorage.getItem("currentUser");
        setCurrentUser(_currentUser);
      }
      setUserList(names);
    } else {
      setModal(true);
    }
  }, []);

  useEffect(() => {
    console.log("userList changed: ", userList);
  }, [userList]);

  useEffect(() => {
    localStorage.setItem("currentUser", currentUser);
    const _scores = JSON.parse(localStorage.getItem(currentUser));
    if (_scores) setScores(_scores);
  }, [currentUser]);

  useEffect(() => {
    console.log("scores changed: ", scores);
    // update localStorage each time setScore is called
    if (currentUser) localStorage.setItem(currentUser, JSON.stringify(scores));
  }, [scores]);

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

  const empty = () => {
    setScores([]);
  };

  return (
    <>
      {modal ? (
        // <ModalPrompt setModal={setModal} />
        <FormDialog
          modal={modal}
          setModal={setModal}
          setCurrentUser={setCurrentUser}
          setUserList={setUserList}
        />
      ) : (
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
                  empty={empty}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  userList={userList}
                  setUserList={setUserList}
                />
              }
            />
          </Route>
        </Routes>
      )}
    </>
  );
}

function ModalPrompt({ setModal }) {
  return (
    <div>
      no users <button onClick={() => setModal(false)}>but click here</button>
    </div>
  );
}
