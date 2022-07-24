//https://github.com/reactchartjs/react-chartjs-2
//https://devexpress.github.io/devextreme-reactive/react/chart/docs/guides/series/#bar-series
//https://css-tricks.com/making-a-bar-chart-with-css-grid/
//https://parceljs.org/languages/css/#css-modules
//https://parceljs.org/languages/sass
//https://glenmaddern.com/articles/css-modules   see "React example"

//import * as classes from "./barchart.module.scss";
import "./barchart.css";
/* I was going to use a library (above), but the data is too simple for those tools. 
The common use case is plotting a thing that changes over time -- where each bar
is an instance of the same thing over time, and often its a grouping of things.
This data is not distributed over time. It's just the tallied scores distributed over 
five factors. 
Importing Sass files results in "segmentation fault (core dumped)." It breaks the
app, and stalls the terminal command-line such that you have to kill it and start a 
new one. This is a problem in Node.js and Parcel. I don't know how to fix it so I'm 
using JavaScript, in a departure from the css-tricks article (above).  */

export default function BarChart({ results }) {
  const colors = ["yellow", "orange", "blue", "green", "red"];
  return (
    <div class="chart">
      {results[0]
        ? results.map((result, i) => {
            return (
              <div
                className={`bar-${i + 1}`}
                style={{
                  gridRowStart: 101 - result.score,
                  backgroundColor: colors[i],
                }}
              ></div>
            );
          })
        : null}
    </div>
  );
}

// export default function BarChart({ results }) {
//   const resultScores = results.map((result) => result.score);
//   const bar3 = resultScores[0] ? 101 - resultScores[0] : "101";
//   const bar2 = "61";
//   return (
//     <div class="chart">
//       <div
//         className="bar-1"
//         style={{ gridRowStart: "81", backgroundColor: "blue" }}
//       ></div>
//       <div
//         className="bar-2"
//         style={{ gridRowStart: bar2, backgroundColor: "green" }}
//       ></div>
//       <div
//         className="bar-3"
//         style={{ gridRowStart: bar3, backgroundColor: "red" }}
//       ></div>
//       <div className="bar-4" style={{ backgroundColor: "orange" }}></div>
//       <div className="bar-5" style={{ backgroundColor: "yellow" }}></div>
//     </div>
//   );
// }
