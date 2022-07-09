import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function QuestionCard(props) {
  const { selectedItem } = props;
  console.log(props);
  return (
    <Card
      sx={{
        // backgroundColor: "primary.dark",
        mx: "auto",
      }}
    >
      {/* mx is margin-left and margin-right; see https://mui.com/system/the-sx-prop/#spacing */}
      <CardHeader title={selectedItem.text} titleTypographyProps={{}} />
      <CardContent>
        <RadioButtonsGroup selectedItem={selectedItem} />
      </CardContent>
    </Card>
  );
}

// {selectedItem ? (
//   <Typography variant="h4">{selectedItem.text}</Typography>
// ) : (
//   "load"
// )}
function RadioButtonsGroup(props) {
  console.log(props.selectedItem);
  const { choices } = props.selectedItem;
  return (
    <>
      {choices ? (
        <FormControl>
          <RadioGroup aria-labelledby="radio-answer" name="radio-buttons-group">
            {choices.map((choice) => {
              return (
                <FormControlLabel
                  value={choice.score}
                  control={<Radio size="small" />}
                  label={
                    <Typography variant="body2" color="text.secondary">
                      {choice.text}
                    </Typography>
                  }
                  key={choice.text}
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
