# AI Career Coach

An AI-powered career coaching assistant that helps users explore career paths based on their goals, skills, experience, and preferences.

## Live Demo

[Open AI Career Coach](https://flyrank-capstone-git-ai-structured-akanksha-patva1.vercel.app/)

## Project Overview

AI Career Coach is a conversational web application built as a FlyRank internship capstone project.

The goal is to make career exploration more interactive and personalized. Instead of showing static career suggestions, the application uses an AI conversation to understand the user's background and provide relevant career guidance.

## Features

- Conversational AI career coaching
- Streaming AI responses
- Personalized career guidance
- Loading/thinking indicator
- Stop response button
- Auto-scroll during conversations
- Responsive mobile-friendly interface
- Input validation
- Error handling for AI requests
- Accessible UI with contrast improvements

## Tech Stack

- React
- Vite
- JavaScript
- AI SDK
- Google Gemini API
- Express
- Vitest
- Vercel

## AI Integration

The application uses Google's Gemini API through the AI SDK.

The AI is instructed to act as a career coach and use information provided by the user about:

- Career goals
- Technical skills
- Experience
- Interests
- Preferences

The response is streamed to the interface so users can see the answer as it is generated instead of waiting for the complete response.

### Security

The Google Gemini API key is stored as a server-side environment variable and is not exposed in the frontend.

Required environment variable:

```env
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key