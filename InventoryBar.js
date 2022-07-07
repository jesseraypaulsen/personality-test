import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Drawer from "@mui/material/Drawer";
import ListIcon from "@mui/icons-material/List";
import DoneIcon from "@mui/icons-material/Done";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export default function BasicList(props) {
  const [open, setOpen] = useState(false);
  const closeDrawer = () => {
    setOpen(false);
  };
  return (
    <>
      <ListIcon fontSize="large" onClick={() => setOpen(true)} />
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
        >
          <List>
            {props.items.map((item) => {
              return (
                <ListItem disablePadding key={item.id}>
                  <ListItemButton onClick={closeDrawer}>
                    {item.score ? (
                      <>
                        <ListItemText>
                          {/* <Box
                            sx={{ color: "text.secondary", display: "inline" }}
                          > */}
                          <Box color="text.secondary" display="inline">
                            {item.num}.{" "}
                          </Box>
                          {item.text}
                        </ListItemText>
                        <ListItemIcon>
                          <DoneIcon />
                        </ListItemIcon>
                      </>
                    ) : (
                      <ListItemText>
                        <Box
                          sx={{ color: "text.secondary", display: "inline" }}
                        >
                          {item.num}.{" "}
                        </Box>
                        {item.text}
                      </ListItemText>
                    )}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
