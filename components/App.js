import { useState, useEffect, useRef } from "react";
import Questionary from "./Questionary";
import { Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import Results from "./Results";
import FormDialog from "./FormDialog";
import Users from './Users'

export function App({ inventory, processResults, generateFakeScores }) {
  const [modal, setModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [autoStep, setAutoStep] = useState(true);
  const [generate, setGenerate] = useState(false);
  const [scores, setScores] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [userList, setUserList] = useState([]);
  const [selectedItem, setSelectedItem] = useState({
    text: "",
    choices: null,
  });

  const init = useRef(true);

  const navigate = useNavigate();

  const findFirstUnansweredQuestion = (scores) => {
    const values = scores.map((score) => {
      const order = inventory.findIndex((item) => item.id === score.id) + 1;
      return { id: score.id, order };
    });

    // sort array of objects for the value of a property
    // https://stackoverflow.com/q/979256
    values.sort((a, b) => a.order - b.order);

    // find and return the index of the first unanswered question in the inventory array

    if (values[0].order > 1) return 0; // is the first question unanswered?
    else
      for (let n = 0; n < values.length - 1; n++) {
        // is there a gap between entries?
        if (values[n + 1].order - values[n].order > 1) {
          return values[n].order;
        }
      }
  };

  function beginTest(scores) {
    if (scores.length == 0) {
      setSelectedItem(inventory[0]);
    } else if (scores.length == 120) {
      navigate("/results");
    } else {
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
    if (currentUser) {
      localStorage.setItem("currentUser", currentUser); // This line is redundant when the "currentUser" key is found in the first useEffect (above).

      let _scores = JSON.parse(localStorage.getItem(currentUser));
      if (_scores) {
        // scenarios: when currentUser key is found in localStorage; and Load User (dashboard)
        setScores(_scores);
        if (init.current) {
          beginTest(_scores);
          init.current = false;
        }
      } else {
        // both User Creation scenarios, modal and dashboard

        if (generate) {
          _scores = generateFakeScores(inventory);
        } else {
          _scores = [];
        }
        setScores(_scores);

        //create {username:scores} entry in localStorage
        localStorage.setItem(currentUser, JSON.stringify(_scores));

        if (init.current) {
          beginTest(_scores);
          init.current = false;
        }
      }

      //make sure currentUser is at the top of the userList array, so that it always appears at the top on the Dashboard
      if (userList[0] !== currentUser) {
        let index = userList.findIndex((user) => user === currentUser);
        setUserList((prev) => [
          currentUser,
          ...prev.filter((user) => user !== currentUser),
        ]);
      }
    }
  }, [currentUser]);

  const getResults = (scores) => processResults(inventory, scores);

  const isScored = (id) => {
    return scores.find((score) => score.id === id) ? true : false;
  };

  const nextStep = (id) => {
    let currIndex = inventory.findIndex((item) => item.id === id);
    console.log('currIndex: ', currIndex)
    let nextItem = inventory[currIndex + 1];
    if (currIndex < 119) setSelectedItem(nextItem);
    else navigate("/results")
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

    if (currentUser)
      localStorage.setItem(currentUser, JSON.stringify(newScores));

    if (autoStep) {
      setTimeout(() => {
        nextStep(id);
      }, 500);
    }
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
                autoStep={autoStep}
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
                autoStep={autoStep}
              />
            }
          />
          <Route
            path="results"
            element={
              <Results
                scores={scores}
                getResults={getResults}
                currentUser={currentUser}
                inventory={inventory}
              />
            }
          />
          <Route
            path="users"
            element={
              <Users
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                userList={userList}
                setUserList={setUserList}
                generate={generate}
                setGenerate={setGenerate}
              />
            }
          />
        </Route>
      </Routes>
    </>
  );
}
