import { createRoot } from "react-dom/client";
import { App } from "./App";
import { inventory } from "./prepareData";
const calculateScore = require("@alheimsins/bigfive-calculate-score");
const getResult = require("@alheimsins/b5-result-text");

const container = document.getElementById("app");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <App
    inventory={inventory}
    calculateScore={calculateScore}
    getResult={getResult}
  />
);
