import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export const DialogBox = ({user, open, handleClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

 
  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Your Profile"}</DialogTitle>
        <DialogContent>
          <img style={{height:'280px',width:'280px', borderRadius:'50%', objectFit:'cover'}}  src={user.pic} alt={user.name} />
        </DialogContent>
        <DialogContent>
          <DialogContentText>
            Name: {user.name}
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <DialogContentText>
            Email: {user.email}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
