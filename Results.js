//http://testsonthenet.com/Factors-facets.htm (5 factors, 30 facets)
//https://css-tricks.com/making-a-bar-chart-with-css-grid/
//the 6 facets per facet should use shades of the facet color, like Material palette
import BarChart from "./BarChart";
import DataArrayIcon from "@mui/icons-material/DataArray";
import { getUserKeys } from "./data-access.js";
import { useState } from "react";

export default function Results({
  scores,
  getResults,
  fill,
  empty,
  clearStorage,
  currentUser,
  setCurrentUser,
}) {
  const results = getResults(scores);

  //TODO: get hard-coded data and localStorage separately, aggregate them into the same component state.

  for (let i = 0; i < results.length; i++) {
    console.log(
      `factor: ${results[i].domain}, score: ${results[i].score}, count: ${results[i].count}`
    );
  }

  const [generate, setGenerate] = useState(false);
  const [newUsername, setNewUsername] = useState(null);

  /*

  Because localStorage stores key-value pairs, to store a javascript object we need to serialize it first:

  localStorage.setItem('user', JSON.stringify(user));

  Then to retrieve it from the store and convert to an object again:

  var user = JSON.parse(localStorage.getItem('user'));

  */
  //const resultScores = results.map((result) => result.score);
  /*
     {  domain
        title
        shortDescription
        description
        scoreText
        score
        count
        score
        facets: { facet, title, text, score, count, scoreText }
     }

     Each of the five result objects has a max score of 120 (24*5).
     Each has 24 questions, and each question has a max score of 5.
  */

  return (
    <div
      className="dashboard"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "3em",
      }}
    >
      <h1>{currentUser}</h1>
      <DataButton />
      <UserSelectionMenu
        setCurrentUser={setCurrentUser}
        currentUser={currentUser}
      />
      <button onClick={clearStorage} style={{ alignSelf: "center" }}>
        Clear Storage
      </button>
      <NewUserForm
        setNewUsername={setNewUsername}
        newUsername={newUsername}
        setGenerate={setGenerate}
        setCurrentUser={setCurrentUser}
        generate={generate}
        fill={fill}
        empty={empty}
      />
      <BarChart results={results} />
    </div>
  );
}

function UserSelectionMenu({ setCurrentUser, currentUser }) {
  /*return (
    <div style={{ display: "flex", alignSelf: "center", gap: "1em" }}>
      <select>
        {getUserKeys().map((key) => (
          <option>{key}</option>
        ))}
        ;
      </select>
    </div>
  );*/

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignSelf: "center" }}
    >
      {getUserKeys().map((key) => (
        <div>
          {key}
          {key === currentUser ? (
            <i>current</i>
          ) : (
            <>
              <button onClick={(e) => setCurrentUser(key)}>Load</button>{" "}
              <button
                onClick={(e) => {
                  localStorage.removeItem(key);
                  console.log(`erased ${key}`, localStorage);
                }}
              >
                Erase
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

function NewUserForm({
  setNewUsername,
  newUsername,
  setGenerate,
  setCurrentUser,
  generate,
  fill,
  empty,
}) {
  return (
    <form onSubmit={(e) => e.preventDefault()} style={{ alignSelf: "center" }}>
      <fieldset>
        <legend>Create a new user</legend>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1em",
          }}
        >
          <input
            type="text"
            placeholder="type username here..."
            onChange={(e) => setNewUsername(e.target.value)}
          ></input>
          <button
            onClick={() => {
              const userKeys = getUserKeys();
              const testUsername = userKeys.find((key) => key === newUsername);
              if (testUsername) {
                alert("that name is already used");
                return;
              }
              if (newUsername) {
                setCurrentUser(newUsername);
                if (generate)
                  fill(); // when score changes, the scores are inserted into localStorage with currentUser as the key (see App.js)
                else empty();
              }
            }}
          >
            OK
          </button>
          <div style={{ display: "flex" }}>
            <input
              type="checkbox"
              value="generate"
              name="generator"
              onChange={(e) => setGenerate(e.target.checked)}
            ></input>
            <label for="generator">Generate Data</label>
          </div>
        </div>
      </fieldset>
    </form>
  );
}

function DataButton() {
  return (
    <span
      onClick={eraser}
      style={{
        backgroundColor: "coral",
        alignSelf: "flex-start",
        cursor: "pointer",
        border: "2px solid black",
        display: "flex",
        alignItems: "center",
        padding: "0.5em",
        margin: "1em",
      }}
    >
      <DataArrayIcon fontSize="large" /> Erase this User{" "}
      {/* If the select menu changes currentUser, then this button makes sense.
        But now the problem is that you have to decide what user to display after you click it. */}
    </span>
  );
}

function eraser(e) {
  const item = document.querySelector("select").value;
  localStorage.removeItem(item);
  console.log(localStorage);
}
