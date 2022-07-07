const { getItems } = require("./b5");
const calculateScore = require("@alheimsins/bigfive-calculate-score");
const getResult = require("@alheimsins/b5-result-text");
import { useState, useEffect } from "react";
import InventoryBar from "./InventoryBar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

// arg true/false for shuffling the items
const items = getItems(true).map((item, n) => {
  if (n < 10) {
    item.score = 50;
  } else {
    item.score = null;
  }

  let firstChar = item.text.charAt(0);
  let lowerFirstChar = firstChar.toLowerCase();
  let decapText = item.text.slice(1);
  let newText = "I " + lowerFirstChar + decapText + ".";
  item.text = newText;
  return item;
});

export function App() {
  const [inventory, setInventory] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentItem, setCurrentItem] = useState(1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (() => {
      setInventory(items);
      console.log(inventory);
    })();
  }, []);
  return (
    <>
      <InventoryBar inventory={inventory} open={open} setOpen={setOpen} />
      <Container maxWidth="sm" sx={{ backgroundColor: "primary.light" }}>
        <Card
          sx={{
            maxWidth: 345,
            backgroundColor: "primary.dark",
            mx: "auto",
          }}
        >
          {/* mx is margin-left and margin-right; see https://mui.com/system/the-sx-prop/#spacing */}
          {inventory[0] ? inventory[0].text : "loading"}
        </Card>
      </Container>
    </>
  );
}
