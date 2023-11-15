import Container from "@mui/material/Container";
import QuestionCard from "./QuestionCard";
import ManualStepper from "./ManualStepper";

export default function Questionary({
  selectedItem,
  scores,
  updateItemScore,
  nextStep,
  backStep,
  autoStep
}) {
  return (
    <Container
      maxWidth="sm"
      sx={{
        //backgroundColor: "primary.light"
        marginTop: "3em",
      }}
    >
      <QuestionCard
        selectedItem={selectedItem}
        updateItemScore={updateItemScore}
        key={selectedItem.id}
        scores={scores}
      />
      <ManualStepper
        nextStep={() => nextStep(selectedItem.id)}
        backStep={() => backStep(selectedItem.id)}
        autoStep={autoStep}
      />
    </Container>
  );
}
