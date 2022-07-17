import BarChartIcon from "@mui/icons-material/BarChart";
import ListIcon from "@mui/icons-material/List";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

export default function Header({ setOpen }) {
  return (
    <AppBar sx={{ position: "static" }}>
      <Toolbar>
        <Box sx={{ border: "1px solid black" }}>
          <ListIcon
            fontSize="large"
            onClick={() => setOpen(true)}
            sx={{ cursor: "pointer" }}
          />
          <BarChartIcon
            fontSize="large"
            color={true ? "disabled" : "primary"}
            sx={{ cursor: "pointer" }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
