import { YoutubeTranscript } from 'youtube-transcript';
import OpenAI from 'openai';

const openai = new OpenAI(process.env.OPENAI_API_KEY);

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