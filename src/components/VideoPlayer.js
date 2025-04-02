import { useState, useEffect } from 'react';
import { getVideoTranscript, generateQuizFromTranscript, getVideoEmbedUrl } from '@/lib/youtube';
import toast from 'react-hot-toast';

export default function VideoPlayer({ videoUrl, onQuizGenerated }) {
  const [loading, setLoading] = useState(false);
  const [videoId, setVideoId] = useState(null);

  useEffect(() => {
    const id = videoUrl?.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
    setVideoId(id);
  }, [videoUrl]);

  const handleGenerateQuiz = async () => {
    setLoading(true);
    toast.loading('Generating quiz from video content...');

    try {
      const transcript = await getVideoTranscript(videoUrl);
      if (!transcript) {
        throw new Error('Could not fetch video transcript');
      }

      const quiz = await generateQuizFromTranscript(transcript);
      if (!quiz) {
        throw new Error('Could not generate quiz');
      }

      onQuizGenerated(quiz);
      toast.success('Quiz generated successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to generate quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!videoId) {
    return <div className="p-4 text-red-500">Invalid YouTube URL</div>;
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-video w-full">
        <iframe
          src={getVideoEmbedUrl(videoId)}
          className="absolute inset-0 w-full h-full rounded-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <button
        onClick={handleGenerateQuiz}
        disabled={loading}
        className="px-4 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 disabled:opacity-50"
      >
        {loading ? 'Generating Quiz...' : 'Generate Quiz'}
      </button>
    </div>
  );
} 