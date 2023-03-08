import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./components/App";
import { inventory, processResults, generateFakeScores } from "./prepareData";

const container = document.getElementById("app");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <App
      inventory={inventory}
      processResults={processResults}
      generateFakeScores={generateFakeScores}
    />
  </BrowserRouter>
);
