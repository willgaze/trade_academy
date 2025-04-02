'use client';

import { useState, useEffect } from 'react';
import VideoPlayer from '@/components/VideoPlayer';
import Quiz from '@/components/Quiz';
import toast from 'react-hot-toast';

export default function LessonPage({ params }) {
  const [lesson, setLesson] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLesson() {
      try {
        const response = await fetch(`/api/lessons/${params.id}`);
        if (!response.ok) throw new Error('Failed to fetch lesson');
        const data = await response.json();
        setLesson(data);
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to load lesson');
      } finally {
        setLoading(false);
      }
    }

    fetchLesson();
  }, [params.id]);

  const handleQuizGenerated = (quizData) => {
    setQuiz(quizData.questions);
  };

  const handleQuizComplete = async (score) => {
    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'temp-user-id', // Replace with actual user ID from auth
          lessonId: params.id,
          score,
        }),
      });

      if (!response.ok) throw new Error('Failed to save progress');
      
      setCompleted(true);
      toast.success('Progress saved!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to save progress');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-500">Lesson not found</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{lesson.title}</h1>
            <p className="text-gray-400 mt-2">{lesson.description}</p>
          </div>

          <VideoPlayer 
            videoUrl={lesson.videoUrl} 
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