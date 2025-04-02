'use client';

import { useState } from 'react';
import VideoPlayer from '@/components/VideoPlayer';
import Quiz from '@/components/Quiz';

// This would come from your database in a real app
const SAMPLE_LESSON = {
  id: 1,
  title: 'Introduction to Push-Fit Plumbing',
  description: 'Learn the basics of push-fit fittings and how to use them correctly.',
  videoUrl: 'https://www.youtube.com/watch?v=SAMPLE_VIDEO_ID',
};

export default function LessonPage({ params }) {
  const [quiz, setQuiz] = useState(null);
  const [completed, setCompleted] = useState(false);

  const handleQuizGenerated = (quizData) => {
    setQuiz(quizData.questions);
  };

  const handleQuizComplete = (score) => {
    setCompleted(true);
    // In a real app, you'd save this progress to your database
    console.log(`Lesson completed with score: ${score}%`);
  };

  return (
    <main className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{SAMPLE_LESSON.title}</h1>
            <p className="text-gray-400 mt-2">{SAMPLE_LESSON.description}</p>
          </div>

          <VideoPlayer 
            videoUrl={SAMPLE_LESSON.videoUrl} 
            onQuizGenerated={handleQuizGenerated}
          />

          {quiz && (
            <div className="mt-8 border border-gray-800 rounded-lg">
              <Quiz 
                questions={quiz} 
                onComplete={handleQuizComplete}
              />
            </div>
          )}

          {completed && (
            <div className="p-4 bg-green-500/10 border border-green-500 rounded-lg">
              <h3 className="font-semibold text-green-400">
                Lesson Completed!
              </h3>
              <p className="text-gray-400 mt-2">
                Move on to the next lesson or review this one again.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 