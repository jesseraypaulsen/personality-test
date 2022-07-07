import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function QuestionCard(props) {
  const { selectedItem } = props;
  console.log(selectedItem);
  return (
    <Card
      sx={{
        maxWidth: 345,
        backgroundColor: "primary.dark",
        mx: "auto",
      }}
    >
      {/* mx is margin-left and margin-right; see https://mui.com/system/the-sx-prop/#spacing */}
      <CardContent>{selectedItem ? selectedItem.text : "loading"}</CardContent>
      <CardActions>
        <RadioButtonsGroup selectedItem={selectedItem} />
      </CardActions>
    </Card>
  );
}

function RadioButtonsGroup({ selectedItem }) {
  const { choices } = selectedItem;
  return (
    <FormControl>
      <RadioGroup aria-labelledby="radio-answer" name="radio-buttons-group">
        {choices.map((choice) => {
          return (
            <FormControlLabel
              value={choice.score}
              control={<Radio />}
              label={choice.text}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}
