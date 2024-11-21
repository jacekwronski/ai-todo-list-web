import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";
import * as React from "react";
import ChatBot from "./ChatBot";
import ChatBotVercel from "./ChatBotVercel";
import "./globals.css";

function App() {
  // return <ChatBot />;
  return <ChatBotVercel />;
}

export default App;
