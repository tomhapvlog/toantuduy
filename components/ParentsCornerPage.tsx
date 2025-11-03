
import React, { useState, useMemo } from 'react';
import { Page, Achievement } from '../types';
import BackButton from './BackButton';
import { getParentsTip } from '../services/geminiService';

interface ParentsCornerPageProps {
  achievements: Achievement[];
  navigate: (page: Page) => void;
}

const ParentsCornerPage: React.FC<ParentsCornerPageProps> = ({ achievements, navigate }) => {
  const [tip, setTip] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const weeklySummary = useMemo(() => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const recentAchievements = achievements.filter(ach => 
      new Date(ach.date.split('/').reverse().join('-')) >= oneWeekAgo
    );

    const totalStars = recentAchievements.reduce((sum, ach) => sum + ach.stars, 0);
    const topicsLearned = [...new Set(recentAchievements.map(ach => ach.lesson))];
    
    return { totalStars, topicsLearned };
  }, [achievements]);

  const handleGetTip = async () => {
    setIsLoading(true);
    const generatedTip = await getParentsTip(weeklySummary.topicsLearned);
    setTip(generatedTip);
    setIsLoading(false);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-6">👨‍👩‍👧 Góc Phụ Huynh</h2>
      
      <div className="bg-pastel-blue p-6 rounded-xl mb-6 shadow-md">
        <h3 className="text-2xl font-bold mb-3">Tổng kết tuần này</h3>
        <div className="space-y-2 text-lg">
          <p>🌟 <strong>Tổng số sao đạt được:</strong> {weeklySummary.totalStars}</p>
          <div>
            <p>📚 <strong>Các chủ đề đã học:</strong></p>
            {weeklySummary.topicsLearned.length > 0 ? (
              <ul className="list-disc list-inside ml-4">
                {weeklySummary.topicsLearned.map(topic => <li key={topic}>{topic}</li>)}
              </ul>
            ) : (
              <p className="ml-4">Tuần này bé chưa học chủ đề nào.</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <button
          onClick={handleGetTip}
          disabled={isLoading}
          className="bg-brand-primary text-white font-bold py-3 px-6 rounded-full text-lg hover:bg-green-600 transition disabled:bg-gray-400"
        >
          {isLoading ? 'Đang tạo gợi ý...' : 'Nhận gợi ý học tuần này'}
        </button>
      </div>

      {tip && (
        <div className="mt-6 bg-pastel-yellow p-4 rounded-xl shadow-inner">
          <h4 className="font-bold text-lg mb-2">Gợi ý cho Phụ huynh:</h4>
          <p className="whitespace-pre-wrap">{tip}</p>
        </div>
      )}

      <BackButton navigate={navigate} />
    </div>
  );
};

export default ParentsCornerPage;
