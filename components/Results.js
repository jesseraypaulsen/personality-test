import BarChart from "./BarChart";
import { Report } from "./Report"
import InfoIcon from "@mui/icons-material/Info";

export default function Results({
  scores,
  getResults,
  currentUser,
}) {
  const results = getResults(scores);

  for (let i = 0; i < results.length; i++) {
    console.log(
      `factor: ${results[i].domain}, score: ${results[i].score}, count: ${results[i].count}`
    );
  }

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
      <div style={{ display: "flex", flexDirection: "column", paddingLeft: "1em"}}>
        <h2>{currentUser}</h2>
        <a
            href="https://en.wikipedia.org/wiki/Big_Five_personality_traits"
            target="_blank"
            rel="noopener"
            // style={{ alignSelf: "center"}}
          >
            <InfoIcon fontSize="large" color="action" sx={{ cursor: "pointer" }} />
        </a>
      </div>
      {scores.length === 120 ? (
        <><BarChart results={results} /><Report results={results} /></>
      ) : (
        <div style={{ alignSelf: "center" }}>
          You have answered {scores.length} out of 120 questions. Your results
          will display here after you've completed all of the questions.
        </div>
      )}
      {/* <hr
        style={{
          border: "0",
          clear: "both",
          display: "block",
          width: "96%",
          backgroundColor: "#a0a0a0",
          height: "1px",
        }}
      />{" "} */}
      {/* <TempButtons scores={scores} /> */}
      {/* <Report results={results} /> */}
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
