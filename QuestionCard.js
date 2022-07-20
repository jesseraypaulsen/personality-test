import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function QuestionCard({
  selectedItem,
  setSelectedItem,
  updateItemScore,
  scores,
}) {
  return (
    <Card
      sx={{
        // backgroundColor: "primary.dark",
        mx: "auto",
      }}
      data-itemid={selectedItem.id}
    >
      {/* mx is margin-left and margin-right; see https://mui.com/system/the-sx-prop/#spacing */}
      <CardHeader title={selectedItem.text} titleTypographyProps={{}} />
      <CardContent>
        <RadioButtonsGroup
          selectedItem={selectedItem}
          updateItemScore={updateItemScore}
          scores={scores}
        />
      </CardContent>
    </Card>
  );
}

function RadioButtonsGroup({ selectedItem, updateItemScore, scores }) {
  let score = scores.find((s) => s.id === selectedItem.id);
  if (score) console.log(`the score is set to: ${score.value}`);
  let scoreCheck = score ? score.value : null;
  return (
    <>
      {selectedItem.choices ? (
        <FormControl>
          <RadioGroup
            aria-labelledby="radio-answer"
            name="radio-buttons-group"
            value={selectedItem.choice}
            onChange={(e) => {
              console.log(e.target.value);
              updateItemScore(
                selectedItem.id,
                selectedItem.num,
                e.target.value
              );
            }}
          >
            {selectedItem.choices.map((choice) => {
              return (
                <FormControlLabel
                  value={choice.score}
                  control={
                    <Radio
                      size="small"
                      //checked={choice.score == selectedItem.score}
                      //checked={choice.score == score.value}
                      checked={choice.score == scoreCheck}
                    />
                  }
                  label={
                    <Typography variant="body2" color="text.secondary">
                      {choice.text}
                    </Typography>
                  }
                  key={selectedItem.id + choice.score}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      ) : (
        <Box>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </Box>
      )}
    </>
  );
}
