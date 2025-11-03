
import React from 'react';

interface StarProgressBarProps {
  totalStars: number;
  maxStars: number;
}

const StarProgressBar: React.FC<StarProgressBarProps> = ({ totalStars, maxStars }) => {
  const progressPercentage = Math.min((totalStars / maxStars) * 100, 100);

  return (
    <div className="my-4">
      <div className="flex justify-between items-center mb-1 text-lg font-semibold">
        <span>Tiến độ Sao</span>
        <span>🌟 {totalStars} / {maxStars}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-6">
        <div
          className="bg-yellow-400 h-6 rounded-full transition-all duration-500 ease-out text-right pr-2 text-white font-bold"
          style={{ width: `${progressPercentage}%` }}
        >
          {progressPercentage > 10 ? `${Math.round(progressPercentage)}%` : ''}
        </div>
      </div>
    </div>
  );
};

export default StarProgressBar;
