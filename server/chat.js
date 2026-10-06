import "dotenv/config";
import express from "express";
import { google } from "@ai-sdk/google";
import { streamText, convertToModelMessages } from "ai";

import { AI_MODEL, SYSTEM_PROMPT } from "../src/lib/aiConfig.js";

const app = express();
const PORT = 3001;

// Allow Express to receive JSON requests from our React frontend.
app.use(express.json());

// AI chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    // Convert the UI messages from the browser into the format
    // Gemini expects.
    const modelMessages = await convertToModelMessages(messages);

    // Start Gemini's response as a stream.
    const result = streamText({
      model: google(AI_MODEL),
      system: SYSTEM_PROMPT,
      messages: modelMessages,
    });

    // Send the stream back to the React client.
    return result.pipeUIMessageStreamToResponse(res);
  } catch (error) {
    console.error("Chat API error:", error);

    return res.status(500).json({
      error: "Something went wrong while generating the response.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`AI Career Coach server running at http://localhost:${PORT}`);
});