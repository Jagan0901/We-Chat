import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export const UserListItem = ({ user, handleFunction }) => {
  return (
    <>
      <List sx={{paddingBottom: "0px"}}>
        <ListItem alignItems="flex-start" onClick={handleFunction} sx={{cursor:'pointer', ":hover":{backgroundColor:'#38B2AC',color:'white'},backgroundColor:'#E8E8E8'}}>
          <ListItemAvatar>
            <Avatar alt={user.name} src={user.pic} />
          </ListItemAvatar>
          <ListItemText
            primary={user.name}
            secondary={
              <span >
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                  fontWeight="450"
                >
                  Email
                </Typography>
                {`: ${user.email}`}
              </span>
            }
          />
        </ListItem>
      </List>
    </>
  );
};
