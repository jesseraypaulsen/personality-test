import BarChartIcon from "@mui/icons-material/BarChart";
import ListIcon from "@mui/icons-material/List";
import InfoIcon from "@mui/icons-material/Info";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Switch from "@mui/material/Switch";

export default function Header({ setOpen, autoStep, toggleAutoStep }) {
  return (
    <AppBar sx={{ position: "static" }}>
      <Toolbar sx={{ justifyContent: "space-evenly" }}>
        <Tooltip title="Inventory">
          <ListIcon
            fontSize="large"
            onClick={() => setOpen(true)}
            sx={{ cursor: "pointer" }}
          />
        </Tooltip>
        <Typography variant="h3">O.C.E.A.N. Personality Test</Typography>
        <Tooltip title="Results">
          <BarChartIcon
            fontSize="large"
            color={true ? "disabled" : "primary"}
            sx={{ cursor: "pointer" }}
          />
        </Tooltip>
        <Tooltip title="Auto-step">
          <Switch
            checked={autoStep}
            onChange={toggleAutoStep}
            color="default"
          />
        </Tooltip>
        <Tooltip title="Info">
          <a
            href="https://en.wikipedia.org/wiki/Big_Five_personality_traits"
            target="_blank"
            rel="noopener"
          >
            <InfoIcon fontSize="large" sx={{ cursor: "pointer" }} />
          </a>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
