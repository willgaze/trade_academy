import { YoutubeTranscript } from 'youtube-transcript';
import OpenAI from 'openai';

// Built lazily, and only when a key exists.
//
// This used to be `new OpenAI(process.env.OPENAI_API_KEY)` at module scope,
// which had two faults. The SDK takes an options object, not a string, so the
// key was never actually applied. And constructing at import time meant the
// SDK's own "OPENAI_API_KEY is missing" error was thrown by the import itself —
// so every lesson page returned HTTP 500 when no key was set, even though quiz
// generation is an optional extra the page does not need in order to render.
let client = null;

function getOpenAI() {
  if (!process.env.OPENAI_API_KEY) return null;
  if (!client) client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return client;
}

export async function getVideoTranscript(videoUrl) {
  try {
    const videoId = extractVideoId(videoUrl);
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    return transcript.map(t => t.text).join(' ');
  } catch (error) {
    console.error('Error fetching transcript:', error);
    return null;
  }
}

export async function generateQuizFromTranscript(transcript) {
  const openai = getOpenAI();
  if (!openai) {
    // No key configured. The lesson still renders; it just has no quiz.
    return null;
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a plumbing instructor creating quiz questions from video transcripts."
        },
        {
          role: "user",
          content: `Create 3 multiple choice questions based on this transcript: ${transcript}. Format the response as JSON with this structure: { "questions": [{ "question": "", "options": ["", "", "", ""], "correctAnswer": "" }] }`
        }
      ]
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('Error generating quiz:', error);
    return null;
  }
}

function extractVideoId(url) {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export function getVideoEmbedUrl(videoId) {
  return `https://www.youtube.com/embed/${videoId}`;
} 