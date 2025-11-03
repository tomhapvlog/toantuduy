
import React, { useState, useMemo, useCallback } from 'react';
import { Page } from '../types';
import BackButton from './BackButton';

interface QuizGameProps {
  onComplete: (topicName: string, category: string, stars: number) => void;
  navigate: (page: Page) => void;
}

const generateQuestion = () => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const correctAnswer = num1 + num2;
  const options = new Set<number>();
  options.add(correctAnswer);
  while (options.size < 3) {
    const wrongAnswer = correctAnswer + (Math.floor(Math.random() * 5) + 1) * (Math.random() > 0.5 ? 1 : -1);
    if (wrongAnswer > 0 && wrongAnswer !== correctAnswer) {
      options.add(wrongAnswer);
    }
  }
  return {
    question: `${num1} + ${num2} = ?`,
    correctAnswer: correctAnswer.toString(),
    options: Array.from(options).sort(() => Math.random() - 0.5).map(String),
  };
};

const QuizGame: React.FC<QuizGameProps> = ({ onComplete, navigate }) => {
  const [questions, setQuestions] = useState(() => Array.from({ length: 5 }, generateQuestion));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false);

  const handleAnswer = (answer: string) => {
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setFeedback('Đúng rồi!');
      setScore(s => s + 1);
    } else {
      setFeedback('Chưa đúng!');
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(i => i + 1);
      } else {
        setGameOver(true);
        if (score + (answer === questions[currentQuestionIndex].correctAnswer ? 1 : 0) > 0) {
            onComplete('Game Toán Vui', 'game', score + (answer === questions[currentQuestionIndex].correctAnswer ? 1 : 0));
        }
      }
    }, 1000);
  };

  if (gameOver) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">Kết thúc!</h2>
        <p className="text-lg mb-2">Bé đã trả lời đúng {score} / {questions.length} câu.</p>
        <p className="text-4xl mb-4">🌟</p>
        <p className="text-lg">Bé nhận được {score} ngôi sao!</p>
        <button 
          onClick={() => navigate(Page.Home)}
          className="mt-6 bg-brand-primary text-white font-bold py-2 px-6 rounded-full text-lg hover:bg-green-600 transition"
        >
          Chơi lại
        </button>
        <BackButton navigate={navigate} />
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-6">🎲 Game Toán Vui</h2>
      <div className="bg-gray-50 p-6 rounded-xl text-center">
        <p className="text-sm text-gray-500">Câu {currentQuestionIndex + 1} / {questions.length}</p>
        <p className="text-4xl my-6 font-bold">{currentQuestion.question}</p>
        <div className="grid grid-cols-1 gap-4">
          {currentQuestion.options.map(option => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              disabled={!!feedback}
              className="p-4 rounded-lg shadow text-2xl font-semibold bg-white hover:bg-gray-100 transition disabled:opacity-50"
            >
              {option}
            </button>
          ))}
        </div>
        {feedback && (
          <p className={`mt-4 text-xl font-bold ${feedback === 'Đúng rồi!' ? 'text-green-500' : 'text-red-500'}`}>
            {feedback}
          </p>
        )}
      </div>
      <BackButton navigate={navigate} />
    </div>
  );
};

export default QuizGame;
