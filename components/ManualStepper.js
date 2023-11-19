import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

export default function ManualStepper({ nextStep, backStep, autoStep }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Button onClick={backStep}>
        <KeyboardArrowLeft fontSize="large" />
        Back
      </Button>
      <Button onClick={nextStep}>
        Next
        <KeyboardArrowRight fontSize="large" />
      </Button>
    </Box>
  );
}
