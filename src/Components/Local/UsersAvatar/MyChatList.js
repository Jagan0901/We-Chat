import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { getSenderName, getSenderPic } from "../config/helper";


export const MyChatList = ({chat,selectedChat,setSelectedChat,loggedUser}) => {

  return (
    <>
      <List sx={{ paddingBottom: "0px" }}>
        <ListItem
          alignItems="flex-start"
          onClick={() => setSelectedChat(chat)}
          sx={{
            cursor: "pointer",
            background: `${selectedChat === chat ? "#38B2AC" : "#E8E8E8"}`,
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
              <span
                style={{
                  fontWeight: `${selectedChat === chat ? "400" : "300"}`,
                  color: `${selectedChat === chat ? "#E8E8E8" : "black"}`,
                }}
              >
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                  fontWeight={selectedChat === chat ? "700" : "400"}
                >
                  {loggedUser._id === chat.chats[chat.chats.length - 1].sender
                    ? "You"
                    : getSenderName(loggedUser, chat.users)}
                  :
                </Typography>
                {chat.chats[chat.chats.length - 1].content}
              </span>
            }
          />
        </ListItem>
      </List>
    </>
  );
};
