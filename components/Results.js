import BarChart from "./BarChart";
import { Report } from "./Report"
import InfoIcon from "@mui/icons-material/Info";

export default function Results({
  scores,
  getResults,
  currentUser,
  inventory
}) {


  const results = oceanSort(getResults(scores));

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
      {/* <TempButtons scores={scores} results={results} inventory={inventory} /> */}
    </div>
  );
}

const oceanSort = (results) => ['O','C','E','A','N'].map(letter => results.find(r => r.domain == letter))


// for testing, not for production
function TempButtons({ scores, results, inventory }) {
  const truncatedResults = results.map(r => ([r.domain, r.score]))
  return (
    <div style={{ alignSelf: "center" }}>
      <button onClick={() => localStorage.clear()}>Clear Storage</button>
      <button onClick={() => console.log(localStorage)}>Show Storage</button>
      <button onClick={() => console.log(scores)}>Show Scores</button>
      <button onClick={() => console.log(truncatedResults)}>Show Final Results</button>
      <button onClick={() => console.log(inventory)}>Show Raw Inventory</button>
    </div>
  );
}
