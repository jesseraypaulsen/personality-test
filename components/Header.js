import ListIcon from "@mui/icons-material/List"; //https://mui.com/material-ui/material-icons/
import BarChartIcon from "@mui/icons-material/BarChart";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Switch from "@mui/material/Switch";
import { Link } from "react-router-dom";

export default function Header({ setOpen, autoStep, toggleAutoStep, len }) {
  return (
    <AppBar sx={{ position: "static" }}>
      <Toolbar sx={{ justifyContent: "space-evenly" }}>
        <Tooltip title="Inventory">
          <Link to="questionary">
            <ListIcon
              fontSize="large"
              onClick={() => setOpen(true)}
              sx={{ cursor: "pointer" }}
            />
          </Link>
        </Tooltip>
        <Tooltip title="Results">
          <Link to="results">
            <BarChartIcon
              fontSize="large"
              // color={len < 120 ? "disabled" : ""}
              sx={{ cursor: "pointer" }}
            />
          </Link>
        </Tooltip>
        <Tooltip title="Auto-step">
          <Switch
            checked={autoStep}
            onChange={toggleAutoStep}
            color="default"
          />
        </Tooltip>
        <Tooltip title="Users">
          <Link to="users">
            <ManageAccountsIcon fontSize="large" sx={{ cursor: "pointer"}} />
          </Link>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
