//https://react-chartjs-2.js.org/examples/vertical-bar-chart
//https://devexpress.github.io/devextreme-reactive/react/chart/docs/guides/series/#bar-series
//https://css-tricks.com/making-a-bar-chart-with-css-grid/

import "./barchart.css";
/* I was going to use a library (above), but the data is too simple for those tools. 
The common use case is plotting a thing that changes over time -- where each bar
is an instance of the same thing over time, and often its a grouping of things (see example above).
This data is not distributed over time. It's just the tallied scores distributed over 
five factors. 
Importing Sass files results in "segmentation fault (core dumped)." It breaks the
app, and stalls the terminal command-line such that you have to kill it and start a 
new one. This is a problem in Node.js and Parcel. 
I've used Sass in Parcel before with no trouble. Maybe there's a conflict with MUI? 
I don't know how to fix it so I'm using JavaScript to create the effect from the css-tricks 
article (above) instead of Sass. 
*/

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
                  gridRowStart: 121 - result.score,
                  backgroundColor: colors[i],
                }}
              ></div>
            );
          })
        : null}
    </div>
  );
}
