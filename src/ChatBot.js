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
} from "@mui/material";
import { Buffer } from "buffer";

const ChatBot = () => {
  const [chatResponse, setChatResponse] = React.useState("");

  const handleKeyUp = async (event) => {
    event.preventDefault();
    setChatResponse("");
    if (event.key === "Enter") {
      console.log({ description: event.target.value });
      await fetch("http://localhost:4000", {
        method: "POST",
        body: JSON.stringify({ description: event.target.value }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        let responseText = "";

        response.body.pipeTo(
          new WritableStream({
            write(chunk) {
              const buffer = Buffer.from(chunk);
              responseText = `
              ${responseText}
              ${buffer.toString("utf-8")}`;
              console.log(responseText);
              setChatResponse(responseText);
            },
            close() {
              console.log("All data successfully read!");
            },
            abort(e) {
              console.error("Something went wrong!", e);
            },
          })
        );
      });
    }
  };
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
          <TextField
            onKeyUp={handleKeyUp}
            fullWidth
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
          />

          <Divider />
          <p>{chatResponse}</p>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ChatBot;
