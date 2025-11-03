
import React, { useMemo } from 'react';
import { Page, Achievement } from '../types';
import BackButton from './BackButton';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AchievementsPageProps {
  achievements: Achievement[];
  navigate: (page: Page) => void;
}

const AchievementsPage: React.FC<AchievementsPageProps> = ({ achievements, navigate }) => {
  const achievementsByLesson = useMemo(() => {
    const grouped: { [key: string]: number } = {};
    achievements.forEach(ach => {
      if (!grouped[ach.lesson]) {
        grouped[ach.lesson] = 0;
      }
      grouped[ach.lesson] += ach.stars;
    });
    return grouped;
  }, [achievements]);

  const chartData = useMemo(() => {
      const dataByDate: { [key: string]: number } = {};
      let cumulativeStars = 0;
      const sortedAchievements = [...achievements].sort((a, b) => new Date(a.date.split('/').reverse().join('-')).getTime() - new Date(b.date.split('/').reverse().join('-')).getTime());
      
      sortedAchievements.forEach(ach => {
          cumulativeStars += ach.stars;
          dataByDate[ach.date] = cumulativeStars;
      });

      return Object.keys(dataByDate).map(date => ({
          date,
          'Tổng Sao': dataByDate[date],
      }));
  }, [achievements]);

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-6">🌟 Bảng Thành Tích</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-center">Biểu đồ sao theo thời gian</h3>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Tổng Sao" fill="#FFC107" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left table-auto">
          <thead className="bg-pastel-mint">
            <tr>
              <th className="p-3">Ngày</th>
              <th className="p-3">Bài học</th>
              <th className="p-3 text-center">Sao</th>
              <th className="p-3">Huy hiệu</th>
            </tr>
          </thead>
          <tbody>
            {achievements.length > 0 ? achievements.map((ach, index) => (
              <tr key={index} className="border-b">
                <td className="p-3">{ach.date}</td>
                <td className="p-3">{ach.lesson}</td>
                <td className="p-3 text-center">{ach.stars} 🌟</td>
                <td className="p-3">{achievementsByLesson[ach.lesson] >= 5 ? 'Siêu Tư Duy 🎖️' : ''}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  Bé chưa hoàn thành bài học nào. Cố gắng lên nhé!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <BackButton navigate={navigate} />
    </div>
  );
};

export default AchievementsPage;
