import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

export default function QuestionCard(props) {
  const { selectedItem } = props;
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
    </Card>
  );
}
