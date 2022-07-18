import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

export default function ManualStepper() {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Button>
        <KeyboardArrowLeft fontSize="large" />
        Back
      </Button>
      <Button>
        Next
        <KeyboardArrowRight fontSize="large" />
      </Button>
    </Box>
  );
}
