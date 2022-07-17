import BarChartIcon from "@mui/icons-material/BarChart";
import ListIcon from "@mui/icons-material/List";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

export default function Header({ setOpen }) {
  return (
    <AppBar sx={{ position: "static" }}>
      <Toolbar sx={{ justifyContent: "space-evenly" }}>
        <Box sx={{ border: "1px solid black" }}>
          <Tooltip title="Inventory">
            <ListIcon
              fontSize="large"
              onClick={() => setOpen(true)}
              sx={{ cursor: "pointer" }}
            />
          </Tooltip>
          <Tooltip title="Results">
            <BarChartIcon
              fontSize="large"
              color={true ? "disabled" : "primary"}
              sx={{ cursor: "pointer" }}
            />
          </Tooltip>
        </Box>
        <Typography>O.C.E.A.N. Personality Test</Typography>
      </Toolbar>
    </AppBar>
  );
}
