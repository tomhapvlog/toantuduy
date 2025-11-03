
import React from 'react';
import { Page } from '../types';

interface HomePageProps {
  navigate: (page: Page) => void;
  studentName: string;
}

const HomePage: React.FC<HomePageProps> = ({ navigate, studentName }) => {
  const menuItems = [
    { page: Page.QuizGame, label: 'Chơi Game Toán', icon: '🎲', color: 'bg-green-200' },
    { page: Page.Topics, label: 'Bài Tập Tư Duy', icon: '🧩', color: 'bg-blue-200' },
    { page: Page.AiTeacher, label: 'Hỏi Thầy AI', icon: '💬', color: 'bg-yellow-200' },
    { page: Page.Achievements, label: 'Bảng Thành Tích', icon: '🌟', color: 'bg-red-200' },
    { page: Page.ParentsCorner, label: 'Góc Phụ Huynh', icon: '👨‍👩‍👧', color: 'bg-purple-200' },
  ];

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-2">Xin chào {studentName} 👋</h2>
      <p className="text-lg mb-6">Sẵn sàng khám phá Toán tư duy chưa nào?</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {menuItems.map(item => (
          <button
            key={item.page}
            onClick={() => navigate(item.page)}
            className={`p-4 rounded-xl shadow-md flex flex-col items-center justify-center text-lg font-semibold transition-transform transform hover:scale-105 ${item.color}`}
          >
            <span className="text-4xl mb-2">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
