import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { getSenderName, getSenderPic } from "../helper";


export const MyChatList = ({chat,selectedChat,setSelectedChat,loggedUser}) => {
    console.log(chat);
  return (
    <>
      <List sx={{ paddingBottom: "0px" }}>
        <ListItem
          alignItems="flex-start"
          onClick={() => setSelectedChat(chat)}
          sx={{
            cursor: "pointer",
            background: `${selectedChat === chat ? "#38B2AC" : ""}`,
            color: `${selectedChat === chat ? "white" : "black"}`,
            borderRadius: "5px",
          }}
        >
          <ListItemAvatar>
            <Avatar
              alt={getSenderName(loggedUser, chat.users)}
              src={getSenderPic(loggedUser, chat.users)}
            />
          </ListItemAvatar>
          <ListItemText
            primary={getSenderName(loggedUser, chat.users)}
            secondary={
              <span>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                  fontWeight="450"
                >
                  Email
                </Typography>
                {/* {`: ${chat.email}`} */}
              </span>
            }
          />
        </ListItem>
      </List>
    </>
  );
};
