import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { DialogBox } from "./DialogBox";



export const UserProfile = ({ user }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <DialogBox
        user={user}
        open={openDialog}
        handleClose={handleDialogClose}
        isThisYourProfile = {"No"}
      />
      <Tooltip title="Profile">
        <IconButton
          onClick={handleClickOpen}
          size="large"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar alt={user.name} src={user.pic} />
        </IconButton>
      </Tooltip>
    
    </>
  );
};
