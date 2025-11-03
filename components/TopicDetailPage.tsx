
import React, { useState } from 'react';
import { Page, Topic } from '../types';
import BackButton from './BackButton';

interface TopicDetailPageProps {
  topic: Topic;
  onComplete: (topicName: string, category: string, stars: number) => void;
  navigate: (page: Page) => void;
}

const TopicDetailPage: React.FC<TopicDetailPageProps> = ({ topic, onComplete, navigate }) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  
  const exercise = topic.exercises[currentExerciseIndex];

  const handleAnswer = (answer: string) => {
    if (feedback) return; // Prevent changing answer after submission

    setSelectedAnswer(answer);
    if (answer === exercise.correctAnswer) {
      setFeedback('Chính xác! Bé giỏi quá! 🎉');
    } else {
      setFeedback('Chưa đúng rồi, thử lại nhé!');
    }
  };

  const handleNext = () => {
    setFeedback(null);
    setSelectedAnswer(null);

    if (currentExerciseIndex < topic.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      setCompleted(true);
      onComplete(topic.title, topic.id.split('-')[0], 1);
    }
  };

  if (completed) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">Hoàn thành xuất sắc!</h2>
        <p className="text-4xl mb-4">🌟</p>
        <p className="text-lg">Bé đã nhận được 1 ngôi sao!</p>
        <button 
          onClick={() => navigate(Page.Topics)}
          className="mt-6 bg-brand-primary text-white font-bold py-2 px-6 rounded-full text-lg hover:bg-green-600 transition"
        >
          Chọn bài khác
        </button>
        <BackButton navigate={navigate} />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-4">{topic.emoji} {topic.title}</h2>
      
      <div className="bg-pastel-blue p-4 rounded-xl mb-6">
        <h3 className="font-bold text-lg mb-2">Bài học nhỏ</h3>
        <p>{topic.lesson}</p>
      </div>

      <div className="bg-gray-50 p-4 rounded-xl">
        <h3 className="font-bold text-xl mb-4">Câu hỏi {currentExerciseIndex + 1}/{topic.exercises.length}</h3>
        <p className="text-2xl mb-4">{exercise.question}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {exercise.options.map(option => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === exercise.correctAnswer;
            let buttonClass = 'bg-white hover:bg-gray-100';
            if (isSelected) {
                buttonClass = isCorrect ? 'bg-green-300' : 'bg-red-300';
            } else if (feedback && isCorrect) {
                buttonClass = 'bg-green-300';
            }

            return (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={!!feedback}
                className={`p-4 rounded-lg shadow text-xl font-semibold transition ${buttonClass}`}
              >
                {option}
              </button>
            );
          })}
        </div>
        
        {feedback && (
          <div className="mt-4 text-center">
            <p className="font-bold text-lg">{feedback}</p>
            <button onClick={handleNext} className="mt-2 bg-brand-secondary font-bold py-2 px-8 rounded-full text-lg hover:bg-yellow-500 transition">
              {currentExerciseIndex < topic.exercises.length - 1 ? 'Câu tiếp theo' : 'Hoàn thành'}
            </button>
          </div>
        )}
      </div>

      <BackButton navigate={navigate} />
    </div>
  );
};

export default TopicDetailPage;
