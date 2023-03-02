import { useState, useEffect } from "react";
import Questionary from "./Questionary";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Results from "./Results";
import FormDialog from "./FormDialog";

export function App({ inventory, processResults, generateFakeScores }) {
  const [scores, setScores] = useState([]);
  //const [loading, setLoading] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [userList, setUserList] = useState([]);
  const [modal, setModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [autoStep, setAutoStep] = useState(true);
  const [selectedItem, setSelectedItem] = useState({
    text: "",
    choices: null,
  });

  const findFirstUnansweredQuestion = (scores) => {
    const values = scores.map((score) => {
      const order = inventory.findIndex((item) => item.id === score.id) + 1;
      return { id: score.id, order };
    });

    console.log("step 1, values: ", values); //works

    // sort
    for (let n = 0; n < values.length - 1; n++) {
      console.log("looping over values...", n);
      console.log("and...", values[n].order, values[n + 1]);
      if (values[n + 1].order < values[n].order) {
        let swap = values[n + 1];
        values[n + 1] = values[n];
        values[n] = swap;
      }
    }

    console.log("step 2, sorted values: ", values);

    // find and return first unanswered question
    for (let n = 0; n < values.length - 1; n++) {
      if (values[n + 1].order - values[n].order > 1) {
        return values[n].order + 1;
      }
    }
  };

  function start(scores) {
    //also note: the first instantiation of scores will be an empty array, so the first render will find scores.length to be zero no matter what.
    if (scores.length == 0) setSelectedItem(inventory[0]);
    else if (scores.length == 120) {
      //route to Results
    } else {
      //find the first unanswered question. then get its id.
      const i = findFirstUnansweredQuestion(scores);
      setSelectedItem(inventory[i]);
    }
  }

  useEffect(() => {
    /* If localStorage is storing a username from a previous session, then there should also be 
    a "currentUser" property in localStorage. So this test checks localStorage to verify that it 
    has at least 2 properties. If localStorage has less than two properties, then the modal will 
    block further interaction until a name is supplied. */
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
    const _scores = JSON.parse(localStorage.getItem(currentUser)) || [];
    setScores(_scores);
    //start(_scores);
  }, [currentUser]);

  useEffect(() => {
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
      <FormDialog
        modal={modal}
        setModal={setModal}
        setCurrentUser={setCurrentUser}
        setUserList={setUserList}
      />
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
    </>
  );
}
