import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";
import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { Buffer } from "buffer";
import { useChat } from "ai/react";
import { marked } from "marked";

const ChatBotVercel = () => {
  const [chatResponse, setChatResponse] = React.useState("");

  const { messages, input, handleInputChange, handleSubmit, data } = useChat({
    maxSteps: 3,
    api: "http://localhost:4000",
  });

  // const handleKeyUp = async (event) => {
  //   if (event.key === "Enter") {
  //     handleSubmit();
  //   }
  // };
  return (
    <Box
      display={"flex"}
      alignContent={"center"}
      alignItems={"center"}
      alignSelf={"center"}
      justifyContent={"center"}
    >
      <Card sx={{ width: "600px" }}>
        <CardHeader
          title="ToDo List Powered by AI"
          subheader="Write your list"
        />
        <CardContent>
          <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
            <form onSubmit={handleSubmit}>
              <TextField
                onChange={handleInputChange}
                fullWidth
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                value={input}
              />
            </form>

            <div className="space-y-4">
              {messages
                .filter((m) => m.content.length)
                .map((m, index) => (
                  <div key={m.id} className="whitespace-pre-wrap">
                    <div>
                      <div className="font-bold">{m.role}</div>

                      {m.content.length > 0 ? (
                        <p
                          dangerouslySetInnerHTML={{
                            __html: marked.parse(m.content),
                          }}
                        />
                      ) : (
                        <span className="italic font-light">
                          {"calling tool: " + m?.toolInvocations?.[0].toolName}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ChatBotVercel;
