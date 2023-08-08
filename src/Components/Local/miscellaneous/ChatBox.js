import { Box } from "@mui/material";
import { ChatState } from "../../../Context/ChatProvider"


export const ChatBox = () => {
  const {selectedChat} = ChatState();
  return (
    <Box
      display="flex"
      width="63%"
      alignItems="center"
      flexDirection="column"
      bgcolor="white"
      borderRadius="5px"
      height="585px"
      p={3}
      sx={{
        "@media (max-width: 600px)": {
          display: selectedChat ? "flex" : "none",
          width: "100%",
        },
      }}
    >
      Single Chat
    </Box>
  );
}
