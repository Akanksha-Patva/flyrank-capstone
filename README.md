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


## Deployment & Operations Checklist

Before each production deployment:

- [x] Tests pass
- [x] Production build succeeds
- [x] Environment variables configured in Vercel
- [x] API key kept server-side
- [x] Responsive UI checked
- [x] AI streaming tested
- [x] Error/loading states checked
- [x] Lighthouse audit completed
- [x] Accessibility issue identified and improved
- [x] Live deployment verified

### Safe Failure

If the AI service is unavailable or an API request fails, the application should show an error state rather than silently failing.

### Rollback

Vercel keeps previous deployments available. If a new production deployment introduces a critical issue, the previous known-good deployment can be restored.

### Monitoring

Production deployments can be monitored through the Vercel deployment dashboard and deployment logs.

## Reflection

This project helped me understand how a frontend application can integrate a real AI capability instead of using AI only as a visual feature.

One of the biggest learning areas was streaming AI responses and handling loading, stopping, scrolling, and error states around an asynchronous AI interaction.

I also improved my understanding of production readiness through testing, accessibility auditing, performance testing, environment-variable security, Git workflows, and Vercel deployment.

A future version could include authentication, saved conversations, career-specific learning roadmaps, job-market data, and downloadable career reports.