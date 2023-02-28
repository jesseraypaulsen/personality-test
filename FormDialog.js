import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
//https://mui.com/material-ui/react-dialog/#form-dialogs

export default function FormDialog({
  modal,
  setModal,
  setCurrentUser,
  setUserList,
}) {
  const [username, setUsername] = useState();
  const handleClose = () => {
    setModal(false);
  };

  const startTest = () => {
    setCurrentUser(username);
    setUserList((prev) => [...prev, username]);
    handleClose();
  };

  return (
    <div>
      <Dialog open={modal} onClose={handleClose}>
        <DialogTitle>Personality Test: Enter your name first</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To take the personality test, please enter your name.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="username"
            fullWidth
            variant="standard"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={startTest}>Take the Test</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
