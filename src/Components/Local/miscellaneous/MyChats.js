import { useEffect, useState } from "react";
import { ChatState } from "../../../Context/ChatProvider"
import { API } from "../../../api";
import { Box } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { ChatLoading } from './../ChatLoading';
import { MyChatList } from "../UsersAvatar/MyChatList";
import Stack from "@mui/material/Stack";



export const MyChats = () => {
  const [loggedUser,setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [info, setInfo] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");

  const fetchChats = ()=>{
    const id = user._id
    const userData = {
      loggedInUserId:id
    };

    fetch(`${API}/chats/getUsers`,{
      method :"POST",
      body :JSON.stringify(userData),
      headers : {"Content-type" : "application/json", "x-auth-token" : user.token}
    })
      .then((res)=>res.json())
      .then((res)=>{
        if(res.error){
          setError(true);
          setErrorMessage(res.error);
        }else if(res.message){
          setInfo(true);
          setInfoMessage(res.message);
        }else{
          setChats(res);
        }
      }).catch((err)=>{
        setError(true);
        setErrorMessage(err.message);
      })
  };
  console.log(chats);

  useEffect(()=> {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  },[]);
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        backgroundColor="white"
        borderRadius="5px"
        borderwidth="1px"
        width="30%"
        height="565px"
        sx={{
          padding: 3,
          "@media (max-width: 600px)": {
            display: selectedChat ? "none" : "flex",
            width: "100%",
          },
        }}
      >
        <Box
          fontSize="22px"
          width="100%"
          sx={{
            "@media (max-width: 600px)": {
              fontSize: "20px",
            },
          }}
        >
          {" "}
          My Chats
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          padding={3}
          bgcolor="#F8F8F8"
          width="100%"
          height="100%"
          borderRadius="large"
          overflowy="hidden"
        >
          {chats ? (
            <Stack >
              {chats?.map((chat) => (
                <MyChatList
                 key={chat._id}
                 chat = {chat}
                 selectedChat = {selectedChat}
                 setSelectedChat={setSelectedChat}
                 loggedUser={loggedUser}
                />
              ))}
            </Stack>
          ) : (
            <ChatLoading />
          )}
        </Box>
      </Box>

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
      <Snackbar
        open={info}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        onClose={() => setInfo(false)}
      >
        <Alert
          severity="info"
          sx={{ width: "100%" }}
          variant="filled"
          elevation={6}
          onClose={() => setInfo(false)}
        >
          {infoMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
