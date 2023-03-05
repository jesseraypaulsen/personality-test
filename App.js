import { useState, useEffect, useRef } from "react";
import Questionary from "./Questionary";
import { Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import Results from "./Results";
import FormDialog from "./FormDialog";

export function App({ inventory, processResults, generateFakeScores }) {
  const [modal, setModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [autoStep, setAutoStep] = useState(true);
  const [generate, setGenerate] = useState(false);
  const [init, setInit] = useState(true);
  const [scores, setScores] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [userList, setUserList] = useState([]);
  const [selectedItem, setSelectedItem] = useState({
    text: "",
    choices: null,
  });

  const delayEffect = useRef(true);

  const navigate = useNavigate();

  const findFirstUnansweredQuestion = (scores) => {
    const values = scores.map((score) => {
      const order = inventory.findIndex((item) => item.id === score.id) + 1;
      return { id: score.id, order };
    });

    console.log("step 1, values: ", values); //works

    // sort
    for (let n = 0; n < values.length - 1; n++) {
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

  function beginTest(scores) {
    //also note: the first instantiation of scores will be an empty array, so the first render will find scores.length to be zero no matter what.
    if (scores.length == 0) {
      console.log("1st decision path");
      setSelectedItem(inventory[0]);
    } else if (scores.length == 120) {
      console.log("2nd decision path");
      navigate("/results");
    } else {
      //find the first unanswered question. then get its id.
      console.log("3rd decision path");
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
    localStorage.setItem("currentUser", currentUser); // This should not occur when the "currentUser" key is found in the first useEffect (above). But it does anyway.
    const _scores = JSON.parse(localStorage.getItem(currentUser));
    if (_scores) {
      // scenarios: when currentUser key is found in localStorage; and Load User (dashboard)
      setScores(_scores);
    } else {
      // both User Creation scenarios, modal and dashboard
      if (generate) {
        setScores(generateFakeScores(inventory));
      } else setScores([]);
    }
  }, [currentUser]);

  useEffect(() => {
    // update localStorage each time setScore is called
    if (currentUser) {
      localStorage.setItem(currentUser, JSON.stringify(scores)); // This should not occur for Load User scenarios. But it does anyway.
      console.log("localStorage.setItem called");
    }
  }, [scores]);

  // This works only partially, because scores is updated twice with an empty array before it's finally updated with data. beginTest always gets called
  // on the second empty array update, when the length of array is zero, so it always takes the first decision path in beginTest. Why does it update
  // with an empty array twice ? The inital instantiation of the scores state accounts for the first time. But what about the second?
  // https://stackoverflow.com/q/59492626 -> How to prevent useEffect from being called the first time its dependency updates?
  // https://stackoverflow.com/a/59021795 -> "you can't control the re-running of useEffect, you have to use conditionals in useEffect"
  useEffect(() => {
    console.log("scores updated", scores);
    if (!delayEffect.current) {
      console.log("delayed effect!");
      if (init) {
        beginTest(scores);
        setInit(false);
        console.log("delayed effect!! test begins");
      }
    }
    delayEffect.current = false;
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
