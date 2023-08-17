import ScrollableFeed from "react-scrollable-feed"
import { ChatState } from "../../Context/ChatProvider"
import { isSameSenderMargin, isSameUser } from "./config/helper";




export const DisplayChat = ({messages}) => {
    const {user} = ChatState();
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }}>
            <span
              style={{
                backgroundColor: `${
                  m.sender === user._id ? "#B9F5D0" : "white"
                }`,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
}
