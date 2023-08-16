import { ChatState } from "../../Context/ChatProvider";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {getSenderName ,getSenderFull } from "./helper";
// import { AccountMenu } from "../MUI Files/AccountMenu";
import { UserProfile } from "../MUI Files/UserProfile";
import { Box } from '@mui/material';



export const SingleChat = () => {
   const {user, selectedChat, setSelectedChat} = ChatState();
  return (
    <>
      {selectedChat ? (
        <>
          <div className="single-chat">
            <>
              <UserProfile user={getSenderFull(user, selectedChat.users)} />
              {getSenderName(user, selectedChat.users)}

              <div className="empty"></div>

              <IconButton
                onClick={() => setSelectedChat("")}
                sx={{
                  display: "none",
                  "@media (max-width: 600px)": {
                    display: "flex",
                  },
                }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>
              {/* <AccountMenu user={getSenderFull(user, selectedChat.users)} /> */}
              {/* <UserProfile user={getSenderFull(user, selectedChat.users)} /> */}
            </>
            {/* <UserProfile user={getSenderFull(user, selectedChat.users)} /> */}
          </div>
          <Box
            padding={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              background: "#E8E8E8",
              width: "100%",
              height: "100%",
              borderRadius: "5px",
            }}
          >Messages Here</Box>
        </>
      ) : (
        <>
          <img
            src="https://i.pinimg.com/564x/20/c7/b9/20c7b95a27cfea71b75250b2d1b053c3.jpg"
            alt="WeChat"
          />
        </>
      )}
    </>
  );
}
