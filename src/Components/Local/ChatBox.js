import { Box } from "@mui/material";
import { ChatState } from "../../Context/ChatProvider"
import { SingleChat } from "./SingleChat";


export const ChatBox = () => {
  const {selectedChat} = ChatState();
  return (
    <Box
      display="flex"
      width="65%"
      alignItems="center"
      flexDirection="column"
      bgcolor="white"
      borderRadius="5px"
      height="616px"
      p={1}
      sx={{
        "@media (max-width: 600px)": {
          display: selectedChat ? "flex" : "none",
          width: "100%",
        },
      }}
    >
      <SingleChat/>
    </Box>
  );
}
