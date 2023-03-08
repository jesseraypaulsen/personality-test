import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Drawer from "@mui/material/Drawer";
import DoneIcon from "@mui/icons-material/Done";

export default function BasicList({
  inventory,
  open,
  setOpen,
  selectedItem,
  setSelectedItem,
  setAutoStep,
  isScored,
}) {
  const closeDrawer = () => {
    setOpen(false);
  };
  const handleListItemClick = (event, item) => {
    setSelectedItem(item);
    setAutoStep(false);
    closeDrawer();
  };
  return (
    <>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
        >
          <List>
            {inventory.map((item) => {
              return (
                <ListItem disablePadding key={item.id}>
                  <ListItemButton
                    onClick={(event) => handleListItemClick(event, item)}
                    selected={selectedItem.id === item.id}
                  >
                    {isScored(item.id) ? (
                      <>
                        <ListItemText>
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
