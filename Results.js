//http://testsonthenet.com/Factors-facets.htm (5 factors, 30 facets)
//https://css-tricks.com/making-a-bar-chart-with-css-grid/
//the 6 facets per facet should use shades of the facet color, like Material palette
import { grid } from "@mui/system";
import BarChart from "./BarChart";
export default function Results({ processResults, inventory, scores }) {
  const results = processResults(inventory, scores);
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
  */
  return (
    <>
      <BarChart results={results} />
    </>
  );
}
