import { google } from "@ai-sdk/google";
import { streamText, convertToModelMessages } from "ai";

import { AI_MODEL, SYSTEM_PROMPT } from "../src/lib/aiConfig.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { messages } = req.body;

    const modelMessages = await convertToModelMessages(messages);

    const result = streamText({
      model: google(AI_MODEL),
      system: SYSTEM_PROMPT,
      messages: modelMessages,
    });

    return result.pipeUIMessageStreamToResponse(res);
  } catch (error) {
    console.error("Chat API error:", error);

    return res.status(500).json({
      error: "Something went wrong while generating the response.",
    });
  }
}