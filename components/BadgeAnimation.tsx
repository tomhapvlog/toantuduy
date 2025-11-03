
import React from 'react';

const BadgeAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <style>{`
        @keyframes badge-pop {
          0% { transform: scale(0.5) rotate(-15deg); opacity: 0; }
          60% { transform: scale(1.1) rotate(5deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        .animate-badge-pop {
          animation: badge-pop 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
        }
      `}</style>
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-center animate-badge-pop">
        <div className="text-7xl mb-4">🎖️</div>
        <h2 className="text-3xl font-bold text-brand-primary">Thật tuyệt vời!</h2>
        <p className="text-xl text-gray-700">Bé đã đạt huy hiệu "Siêu Tư Duy"!</p>
      </div>
    </div>
  );
};

export default BadgeAnimation;
