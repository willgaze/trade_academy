import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Quiz({ questions, onComplete }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (questionIndex, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length !== questions.length) {
      toast.error('Please answer all questions');
      return;
    }

    const score = questions.reduce((acc, q, index) => {
      return acc + (answers[index] === q.correctAnswer ? 1 : 0);
    }, 0);

    const percentage = Math.round((score / questions.length) * 100);
    
    setSubmitted(true);
    onComplete(percentage);

    if (percentage >= 70) {
      toast.success(`Well done! You scored ${percentage}%`);
    } else {
      toast.error(`You scored ${percentage}%. Try watching the video again.`);
    }
  };

  return (
    <div className="space-y-8 p-4">
      <h2 className="text-2xl font-bold">Quick Quiz</h2>
      {questions.map((q, questionIndex) => (
        <div key={questionIndex} className="space-y-4">
          <p className="font-medium">{q.question}</p>
          <div className="space-y-2">
            {q.options.map((option, optionIndex) => (
              <label
                key={optionIndex}
                className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer
                  ${submitted 
                    ? option === q.correctAnswer 
                      ? 'border-green-500 bg-green-500/10'
                      : answers[questionIndex] === option
                        ? 'border-red-500 bg-red-500/10'
                        : 'border-gray-700'
                    : 'border-gray-700 hover:border-white'
                  }`}
              >
                <input
                  type="radio"
                  name={`question-${questionIndex}`}
                  value={option}
                  checked={answers[questionIndex] === option}
                  onChange={() => handleAnswer(questionIndex, option)}
                  disabled={submitted}
                  className="hidden"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      {!submitted && (
        <button
          onClick={handleSubmit}
          className="w-full px-4 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-100"
        >
          Submit Answers
        </button>
      )}
    </div>
  );
} 