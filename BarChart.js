//https://github.com/reactchartjs/react-chartjs-2
//https://devexpress.github.io/devextreme-reactive/
//https://css-tricks.com/making-a-bar-chart-with-css-grid/
//https://parceljs.org/languages/css/#css-modules
//https://parceljs.org/languages/sass
//https://glenmaddern.com/articles/css-modules   see "React example"

//import * as classes from "./barchart.module.scss";
import "./barchart.css";
export default function BarChart({ results }) {
  const resultScores = results.map((result) => result.score);
  const bar3 = resultScores[0] ? 101 - resultScores[0] : "101";
  const bar2 = "61";
  return (
    <div class="chart">
      <div
        className="bar-1"
        style={{ gridRowStart: "81", backgroundColor: "blue" }}
      ></div>
      <div
        className="bar-2"
        style={{ gridRowStart: bar2, backgroundColor: "green" }}
      ></div>
      <div
        className="bar-3"
        style={{ gridRowStart: bar3, backgroundColor: "red" }}
      ></div>
      <div className="bar-4" style={{ backgroundColor: "orange" }}></div>
      <div className="bar-5" style={{ backgroundColor: "yellow" }}></div>
    </div>
  );
}
