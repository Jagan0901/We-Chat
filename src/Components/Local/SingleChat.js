import { ChatState } from "../../Context/ChatProvider";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {getSenderName ,getSenderFull } from "./config/helper";
import CircularProgress from "@mui/material/CircularProgress";
import { UserProfile } from "../MUI Files/UserProfile";
import { Box } from '@mui/material';
import { useEffect, useState } from "react";
import { FormControl } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { API } from "../../api";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { DisplayChat } from "./DisplayChat";



export const SingleChat = () => {
  const [loading,setLoading]       = useState(false);
  const [messages,setMessages]     = useState([]);
  const [newMessage,setNewMessage] = useState();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {user, selectedChat, setSelectedChat} = ChatState();

  const fetchMessages = ()=>{
    if(!selectedChat) return;
     setLoading(true);
     fetch(`${API}/messages/${selectedChat._id}`,{
      method:"GET",
      headers:{"x-auth-token" : `${user.token}`}
     }).then((res)=> res.json())
       .then((res)=>{
        if(res.error){
          setError(true);
          setErrorMessage(res.error);
          setLoading(false);
          return;
        }
        
        setMessages(res.chats);
        setLoading(false);
       })
       .catch((err)=>{
        setError(true);
        setErrorMessage(err.message);
        setLoading(false);
       })
  }
  
  useEffect(()=> fetchMessages(),[selectedChat]);

  const sendMessage = ()=>{
    if(!newMessage) return;
    const message = {
      userId:user._id,
      content:newMessage
    };
    setNewMessage("");
    fetch(`${API}/messages/send/${selectedChat._id}`,{
      method:"PUT",
      body: JSON.stringify(message),
      headers: {"Content-type" : "application/json", "x-auth-token" : `${user.token}`}
    }).then((res)=> res.json())
      .then((res)=>{
        
        if(res.error){
          setError(true);
          setErrorMessage(res.error);
          return;
        };
        // console.log(res.chats);
        // fetchMessages();
        setMessages([...messages,(res.chats[(res.chats.length)-1])]);
      })
      .catch((err)=>{
        setError(true);
        setErrorMessage(err.message);
      })
  };

  const sendMessageKeyDown = (event)=>{
    if(event.key === "Enter"){
      sendMessage();
    }
  };


  const typingHandler = (e)=>{
    setNewMessage(e.target.value)
  };
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
          <>
            <Box
              padding={2}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                background: "#E8E8E8",
                width: "97%",
                height: "100%",
                borderRadius: "5px",
              }}
            >
              {loading ? (
                <CircularProgress
                  size={70}
                  color="success"
                  sx={{
                    alignSelf: "center",
                    margin: "auto",
                  }}
                />
              ) : (
                <div className="messages">
                  <DisplayChat messages={messages}/>
                </div>
              )}

              <FormControl
                margin="dense"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
                onKeyDown={sendMessageKeyDown}
                required
              >
                <OutlinedInput
                  placeholder="Enter a message"
                  onChange={typingHandler}
                  sx={{ width: "100%", background: "#E0E0E0" }}
                  value={newMessage}
                />
                <Button
                  variant="text"
                  color="success"
                  endIcon={<SendIcon />}
                  onClick={sendMessage}
                ></Button>
              </FormControl>
            </Box>
          </>
        </>
      ) : (
        <>
          <img
            src="https://i.pinimg.com/564x/20/c7/b9/20c7b95a27cfea71b75250b2d1b053c3.jpg"
            alt="WeChat"
            style={{ width: "100%", height: "100%" }}
          />
        </>
      )}
      <Snackbar
        open={error}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        onClose={() => setError(false)}
      >
        <Alert
          severity="error"
          sx={{ width: "100%" }}
          variant="filled"
          elevation={6}
          onClose={() => setError(false)}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
