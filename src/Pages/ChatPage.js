import { SideDrawer } from "./../Components/Local/miscellaneous/SideDrawer";
import { MyChats } from "../Components/Local/miscellaneous/MyChats";
import { ChatBox } from "./../Components/Local/miscellaneous/ChatBox";
import { Box } from "@mui/material";
import { ChatState } from "../Context/ChatProvider";




export const ChatPage = () => {
  const {user} = ChatState();
  // console.log(user);
  return (
    <div style={{width:'100%'}}>
      {user && <SideDrawer/>}

      <Box sx={{
        display:'flex',
        justifyContent:'space-between',
        w:'100%',
        h:'91.5vh',
        p:'20px'
      }}>

        {user && <MyChats/>}
        {user && <ChatBox/>} 
         
      </Box>
    </div>
  );
}
