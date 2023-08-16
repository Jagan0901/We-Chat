import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Logout from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";
import { ChatState } from "../../Context/ChatProvider";
import { DialogBox } from "./DialogBox";
import { useNavigate } from 'react-router-dom';




function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  const result = `${name.split(" ")[1][0]}`!=='undefined' ? `${name.split(" ")[0][0]}${name.split(" ")[1][0]}` : `${name.split(" ")[0][0]}`;
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: result,
  };
}

export const AccountMenu = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const {user} = ChatState();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = ()=>{
    setOpenDialog(false);
  }

  const logoutHandler = ()=>{
    localStorage.removeItem("userInfo");
    navigate("/");
    window.location.reload();
  }
  return (
    <>
      <DialogBox
        user={user}
        open={openDialog}
        handleClose={handleDialogClose}
        isThisYourProfile={"yes"}
      />
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="large"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar
            sx={{ width: 50, height: 50 }}
            {...stringAvatar(`${user.name} `)}
          />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClickOpen}>
          <Avatar alt={user.name} src={user.pic} />
          Profile
        </MenuItem>
        <Divider />

        <MenuItem onClick={logoutHandler}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
