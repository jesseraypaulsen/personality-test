import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListIcon from "@mui/icons-material/List";
import DoneIcon from "@mui/icons-material/Done";
import { useState } from "react";

export default function BasicList(props) {
  /*why not just use boolean state and a click handler for conditional rendering of the list?
think about what you need. we want to show one question card at a time, centered on the screen.
but the list has to be scrolled. if the list is in the same layout flow as the question card,
then scrolling the list will push the card out of the viewport. we want the list to be separately
scrollable. which means the list needs to be contained by an absolute positioned element.
each layout flow context corresponding to one scrolling context (and one scrollbar).
*/
  return (
    <>
      <ListIcon fontSize="large" />
      <Box
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          border: "1px dotted cyan",
        }}
      >
        <List>
          {props.items.map((item) => {
            return (
              <ListItem disablePadding key={item.id}>
                <ListItemButton>
                  <ListItemText primary={`${item.num} - ${item.text}`} />
                  <ListItemIcon>
                    <DoneIcon sx={{ marginLeft: "1em" }} />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </>
  );
}
