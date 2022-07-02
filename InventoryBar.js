import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

export default function BasicList(props) {
  return (
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
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
