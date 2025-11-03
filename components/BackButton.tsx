
import React from 'react';
import { Page } from '../types';

interface BackButtonProps {
  navigate: (page: Page) => void;
}

const BackButton: React.FC<BackButtonProps> = ({ navigate }) => {
  return (
    <div className="mt-8 text-center">
      <button
        onClick={() => navigate(Page.Home)}
        className="bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-full hover:bg-gray-300 transition"
      >
        ↩️ Quay lại Trang Chủ
      </button>
    </div>
  );
};

export default BackButton;
