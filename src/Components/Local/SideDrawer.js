import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { AccountMenu } from "../MUI Files/AccountMenu";
import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { ChatState } from "../../Context/ChatProvider";
import { API } from "../../api";
import { ChatLoading } from "./ChatLoading";
import { UserListItem } from "./UsersAvatar/UserListItem";
import { Loading } from "./Loading";




export const SideDrawer = () => {
  const {user, setSelectedChat, chats, setChats} = ChatState();

  const [open, setOpen] = useState(false);
  const [search,setSearch] = useState("");
  const [searchResult,setSearchResult] = useState([]);
  const [loading,setLoading] = useState(false);
  const [loadingChat,setLoadingChat] = useState(false);
  const [requiredWarning,setRequiredWarning] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [usersNotFound,setUsersNotFound] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSearch = ()=>{
    if(!search) return setRequiredWarning(true);
    setLoading(true);
    const id = user._id;
    const loggedInUser = {
      loggedInUserId:id
    };

    fetch(`${API}/users/user?search=${search}`, {
      method: "POST",
      body: JSON.stringify(loggedInUser),
      headers: { "Content-type": "application/json", "x-auth-token" : `${user.token}`}
    }).then((res)=> res.json())
      .then((res)=>{
        if(res.error){
          setError(true);
          setErrorMessage(res.error);
          setLoading(false);
        }else{
          setSearchResult(res);
          // console.log(res);
          setUsersNotFound(true);
          setLoading(false);
        }
      })
       .catch((err)=>{
        setError(true);
        setErrorMessage(err.message);
        setLoading(false);
       })
    
  };

  const accessChat = (userId)=>{
    setLoadingChat(true);
    const id = user._id;
    const data = {
      loggedInUserId: id,
      userId: userId,
    };

    fetch(`${API}/chats/singleChat`,{
      method:"POST",
      body:JSON.stringify(data),
      headers:{"Content-type": "application/json", "x-auth-token":`${user.token}`}
    })
      .then((res)=>res.json())
      .then((res)=>{
        if(res.error){
          setError(true);
          setErrorMessage(res.error);
          setLoadingChat(false);
        }else{
          if(!chats.find((c)=> c._id === res._id)) setChats([res, ...chats])
          setSelectedChat(res);
          // console.log(chats);
          setLoadingChat(false);
          handleDrawerClose();
        }
      })
      .catch((err)=>{
        setError(true);
        setErrorMessage(err.message);
        setLoadingChat(false);
      })

  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          bgcolor: "white",
          width: "100%",
          padding: "5px 10px 5px 10px",
          borderWidth: "5px",
        }}
      >
        <Tooltip title="Search Users to chat" placement="bottom-end">
          <IconButton onClick={handleDrawerOpen}>
            <PersonSearchIcon fontSize="large" />
            <span className="search-user-span" style={{ fontSize: "15px", fontWeight: "bolder" }}>
              Search User
            </span>
          </IconButton>
        </Tooltip>
        <h1 style={{ fontFamily: "Work sans" }}>We Chat</h1>
        <div>
          {/* bell icon starts*/}
          {/* bell icon ends*/}
          <AccountMenu />
        </div>
      </Box>

      {/* Temporary Drawer starts */}
      <Drawer anchor="left" open={open} onClose={handleDrawerClose}>
        <div>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        {/* Add your drawer content here */}
        <div style={{ minWidth: "250px" }}>
          <h2 style={{ textAlign: "center" }}>Search Users</h2>
          <Box sx={{ margin: "1px 10px 5px 10px" }}>
            <TextField
              id="filled-basic"
              label="Enter user name or email"
              variant="filled"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              variant="contained"
              // color="success"
              sx={{ height: "55px" }}
              // loading={loading}
              onClick={handleSearch}
            >
              Go
            </Button>
          </Box>
          {loading ? <ChatLoading/> : (
            searchResult?.map((user)=> <UserListItem key={user._id} user={user} handleFunction={()=> accessChat(user._id)}/>)
          )}
          {searchResult.length===0 && usersNotFound===true ? <p style={{textAlign:'center',fontWeight:'bolder',color:'red'}}>Users not exists.Try Another</p>:""}
        </div>

        <Snackbar
          open={requiredWarning}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          onClose={() => setRequiredWarning(false)}
        >
          <Alert
            severity="warning"
            sx={{ width: "100%" }}
            variant="filled"
            elevation={6}
            onClose={() => setRequiredWarning(false)}
          >
            Search Field should not to be empty
          </Alert>
        </Snackbar>
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
        {loadingChat && <Loading/>}
      </Drawer>
    </>
  );
}
