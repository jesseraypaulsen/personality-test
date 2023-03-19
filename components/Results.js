//http://testsonthenet.com/Factors-facets.htm (5 factors, 30 facets)
//https://css-tricks.com/making-a-bar-chart-with-css-grid/
//the 6 facets per facet should use shades of the facet color, like Material palette
import BarChart from "./BarChart";
import DataArrayIcon from "@mui/icons-material/DataArray";
import { useState } from "react";
import "../styles/dashboard.css";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

export default function Results({
  scores,
  getResults,
  currentUser,
  setCurrentUser,
  userList,
  setUserList,
  generate,
  setGenerate,
}) {
  const results = getResults(scores);

  for (let i = 0; i < results.length; i++) {
    console.log(
      `factor: ${results[i].domain}, score: ${results[i].score}, count: ${results[i].count}`
    );
  }

  const [newUsername, setNewUsername] = useState(null);

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
      <h1 style={{ padding: "1em" }}>{currentUser}</h1>
      {scores.length === 120 ? (
        <BarChart results={results} />
      ) : (
        <div style={{ alignSelf: "center" }}>
          You have answered {scores.length} out of 120 questions. Your results
          will display here after you've completed all of the questions.
        </div>
      )}
      <hr
        style={{
          border: "0",
          clear: "both",
          display: "block",
          width: "96%",
          backgroundColor: "#a0a0a0",
          height: "1px",
        }}
      />{" "}
      {/*https://stackoverflow.com/a/12640013 */}
      <UserSelectionMenu
        setCurrentUser={setCurrentUser}
        currentUser={currentUser}
        userList={userList}
        setUserList={setUserList}
      />
      <NewUserForm
        setNewUsername={setNewUsername}
        newUsername={newUsername}
        generate={generate}
        setGenerate={setGenerate}
        setCurrentUser={setCurrentUser}
        userList={userList}
        setUserList={setUserList}
      />
      <TempButtons scores={scores} /> {/*for testing purposes only*/}
    </div>
  );
}

function UserSelectionMenu({
  setCurrentUser,
  currentUser,
  userList,
  setUserList,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignSelf: "center",
        gap: "1em",
        border: "1px solid black",
        padding: "1em",
      }}
    >
      <h2>All Users</h2>
      <div className="userlist">
        {userList.map((key) => (
          <div className={key === currentUser ? "active-user" : ""}>
            {/* <span style={{ flexBasis: "60%" }}>{key}</span> */}
            {/* <span>{key}</span> */}
            {/* <span style={{ flexBasis: "25ch" }}>{key}</span> */}
            {/* <span style={{ flexBasis: "255px" }}>{key}</span> */}
            {/* <span style={{ flex: "0 1 255px", minWidth: "27ch" }}>{key}</span> */}
            {/* <span style={{ flex: "0 1 255px" }}>{key}</span> */}
            {/* <span style={{ flex: "0 1 auto" }}>{key}</span> */}
            {/* <span style={{ flex: "0 1 auto", minWidth: "30ch" }}>{key}</span> */}
            <span
              style={{
                minWidth: "30ch",
                display: "flex",
                //justifyContent: "center",
                alignItems: "center",
                //textAlign: "center",
                paddingLeft: "1em",
              }}
            >
              {key}
            </span>
            <span
              disabled={key === currentUser}
              className="userlist-button"
              onClick={(e) => setCurrentUser(key)}
            >
              <SwapHorizIcon />
              {/*Load*/}
            </span>{" "}
            <span
              disabled={key === currentUser}
              className="userlist-button"
              onClick={(e) => {
                localStorage.removeItem(key);
                setUserList((prev) => [...prev.filter((user) => user !== key)]);
              }}
            >
              <PersonRemoveIcon />
              {/* Erase */}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function NewUserForm({
  setNewUsername,
  newUsername,
  generate,
  setGenerate,
  setCurrentUser,
  userList,
  setUserList,
}) {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{ alignSelf: "center", border: "1px solid black", padding: "1em" }}
    >
      <h2>Create a new user</h2>
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
          maxlength="25"
          onChange={(e) => setNewUsername(e.target.value)}
        ></input>
        <button
          onClick={() => {
            const testUsername = userList.find((key) => key === newUsername);

            if (testUsername) {
              alert("that name is already used");
              return;
            }
            if (newUsername) {
              setCurrentUser(newUsername);
              setUserList((prev) => [...prev, newUsername]);
            }
          }}
        >
          OK
        </button>
        <div style={{ display: "flex" }}>
          <input
            type="checkbox"
            value={generate}
            name="generator"
            onChange={(e) => setGenerate(e.target.checked)}
          ></input>
          <label for="generator">Generate Data</label>
        </div>
      </div>
    </form>
  );
}

// for testing, not for production
function TempButtons({ scores }) {
  return (
    <div style={{ alignSelf: "center" }}>
      <button onClick={() => localStorage.clear()}>Clear Storage</button>
      <button onClick={() => console.log(localStorage)}>Show Storage</button>
      <button onClick={() => console.log(scores)}>Show Scores</button>
    </div>
  );
}
