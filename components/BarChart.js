/* 

https://css-tricks.com/making-a-bar-chart-with-css-grid/

The data is too simple for any of the popular Barchart libraries. In the common usage for barcharts, each bar
is an instance of the same thing as it changes over time. This data is not distributed over time. It's just the tallied 
scores distributed over five factors. 

*/

import "../styles/barchart.css";

export default function BarChart({ results }) {
  const colors = ["yellow", "orange", "blue", "green", "red"];
  results.forEach(r => {
    const modifiedScore = r.score - 24
    console.log(r.domain, r.score, '->', modifiedScore)
  })
  return (
    <div class="chart">
      {results[0]
        ? results.map((result, i) => {
            return (
              <div
                className={`bar-${i + 1}`}
                style={{
                  gridRowStart: 96 - (result.score - 24),
                  backgroundColor: colors[i],
                }}
              ></div>
            );
          })
        : null}
      {results[0]
        ? results.map((result, i) => {
            return <div className={`label-${i + 1}`}>{result.domain}</div>;
          })
        : null}
    </div>

  );
}
