//http://testsonthenet.com/Factors-facets.htm (5 factors, 30 facets)
//https://css-tricks.com/making-a-bar-chart-with-css-grid/
//the 6 facets per facet should use shades of the facet color, like Material palette
import BarChart from "./BarChart";
import DataArrayIcon from "@mui/icons-material/DataArray";

export default function Results({ processResults, inventory, scores, fill }) {
  const results = processResults(inventory, scores);
  console.log(`${JSON.stringify(results)}`);
  for (let i = 0; i < results.length; i++) {
    console.log(
      `factor: ${results[i].domain}, score: ${results[i].score}, count: ${results[i].count}`
    );
  }
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
      }}
    >
      <span
        onClick={fill}
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
        <DataArrayIcon fontSize="large" /> Generate Random Dataset
      </span>
      <BarChart results={results} />
    </div>
  );
}
