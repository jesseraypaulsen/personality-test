//http://testsonthenet.com/Factors-facets.htm (5 factors, 30 facets)
//https://css-tricks.com/making-a-bar-chart-with-css-grid/
//the 6 facets per facet should use shades of the facet color, like Material palette
import BarChart from "./BarChart";
import { useState } from "react";
import "../styles/dashboard.css";
import { UserSelectionMenu } from "./UserSelectionMenu";
import { NewUserForm } from "./NewUserForm";

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
