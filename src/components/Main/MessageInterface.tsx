import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import MessageInterfaceChannels from "./MessageInterfaceChannels";
import Scroll from "./Scroll";
import { useParams } from "react-router-dom";
import { Server } from "../../@types/server.d";
import useChatWebSocket from "../../services/chatService";

interface SendMessageData {
  type: string;
  message: string;
  [key: string]: any;
}

interface ServerChannelProps {
  data: Server[];
}

interface Message {
  sender: string;
  content: string;
  timestamp: string;
}

const messageInterface = (props: ServerChannelProps) => {
  const { data } = props;
  const theme = useTheme();

  const { serverId, channelId } = useParams();

  const { newMessage, message, setMessage, sendJsonMessage } = useChatWebSocket(
    channelId || "",
    serverId || ""
  );

  const server_name = data?.[0]?.name ?? "Server";

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (message) {
        sendJsonMessage({
          type: "message",
          message: message.trim(),
        } as SendMessageData);
        setMessage(""); // Clear the message field after sending
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendJsonMessage({
      type: "message",
      message,
    } as SendMessageData);
  };

  function formatTimeStamp(timestamp: string): string {
    const date = new Date(Date.parse(timestamp));
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${formattedDate} at ${formattedTime}`;
  }

  return (
    <>
      <MessageInterfaceChannels data={data} />
      {channelId == undefined ? (
        <Box
          sx={{
            overflow: "hidden",
            p: { xs: 0 },
            height: `calc(80vh)`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h4"
              fontWeight={700}
              letterSpacing={"-0.5px"}
              sx={{ px: 5, maxWidth: "600px" }}
            >
              Welcome to {server_name}
            </Typography>
            <Typography>{data?.[0]?.description ?? "This is our home"}</Typography>
          </Box>
        </Box>
      ) : (
        <>
          <Scroll>
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              {newMessage.map((msg: Message, index: number) => {
                return (
                  <ListItem key={index} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="user image" />
                    </ListItemAvatar>
                    <ListItemText
                      primaryTypographyProps={{
                        fontSize: "12px",
                        variant: "body2",
                      }}
                      primary={
                        <>
                          <Typography
                            component="span"
                            variant="body1"
                            color="text.primary"
                            sx={{ display: "inline", fontW: 600 }}
                          >
                            {msg.sender}
                          </Typography>
                          <Typography component="span" variant="caption" color="textSecondary">
                            {" at "}
                            {formatTimeStamp(msg.timestamp)}
                          </Typography>
                        </>
                      }
                      secondary={
                        <>
                          <Typography
                            variant="body1"
                            style={{
                              wordWrap: "break-word", // Enables breaking of long words
                              whiteSpace: "pre-wrap", // Preserves spaces and line breaks
                              marginRight: "50px", //
                            }}
                            sx={{
                              display: "block",
                              lineHeight: 1.2,
                              fontWeight: 400,
                              letterSpacing: "-0.2px",
                            }}
                            component="span"
                            color="text.primary"
                          >
                            {msg.content}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                );
              })}
            </List>
          </Scroll>
          <Box sx={{ position: "sticky", bottom: 0, width: "95%" }}>
            <form
              onSubmit={handleSubmit}
              style={{
                bottom: 0,
                right: 0,
                padding: "1rem",
                backgroundColor: theme.palette.background.default,
                zIndex: 1,
              }}
            >
              <Box sx={{ display: "flex" }}>
                <TextField
                  fullWidth
                  multiline
                  value={message}
                  minRows={1}
                  maxRows={4}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setMessage(e.target.value)}
                  sx={{ flexGrow: 1 }}
                />
              </Box>
            </form>
          </Box>
        </>
      )}
    </>
  );
};
export default messageInterface;
