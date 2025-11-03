
import React, { useState } from 'react';
import { StudentProfile } from '../types';
import { TEXTBOOK_SERIES } from '../constants';

interface EnrollmentPageProps {
  onSaveProfile: (profile: StudentProfile) => void;
}

const EnrollmentPage: React.FC<EnrollmentPageProps> = ({ onSaveProfile }) => {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('1');
  const [textbook, setTextbook] = useState(TEXTBOOK_SERIES[0]);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Bé vui lòng cho biết tên nhé!');
      return;
    }
    setError('');
    onSaveProfile({ name: name.trim(), grade, textbook });
  };

  return (
    <div className="text-center p-4">
      <h2 className="text-3xl font-bold mb-2">Chào mừng bé!</h2>
      <p className="text-lg mb-6 text-gray-600">Mình làm quen với nhau một chút nhé</p>
      
      <form onSubmit={handleSubmit} className="space-y-6 text-left">
        <div>
          <label htmlFor="studentName" className="block text-lg font-semibold mb-2 text-gray-700">Tên của bé là gì?</label>
          <input
            id="studentName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ví dụ: An"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary text-lg"
            aria-required="true"
          />
        </div>
        
        <div>
          <label htmlFor="studentGrade" className="block text-lg font-semibold mb-2 text-gray-700">Bé đang học lớp mấy?</label>
          <select
            id="studentGrade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary text-lg bg-white"
          >
            <option value="1">Lớp 1</option>
            <option value="2">Lớp 2</option>
            <option value="3">Lớp 3</option>
            <option value="4">Lớp 4</option>
            <option value="5">Lớp 5</option>
          </select>
        </div>

        <div>
          <label htmlFor="studentTextbook" className="block text-lg font-semibold mb-2 text-gray-700">Bé đang học bộ sách nào?</label>
          <select
            id="studentTextbook"
            value={textbook}
            onChange={(e) => setTextbook(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary text-lg bg-white"
          >
            {TEXTBOOK_SERIES.map(book => (
              <option key={book} value={book}>{book}</option>
            ))}
          </select>
        </div>

        {error && <p className="text-red-500 text-center" role="alert">{error}</p>}
        
        <div className="text-center pt-4">
          <button
            type="submit"
            className="bg-brand-primary text-white font-bold py-3 px-8 rounded-full text-xl hover:bg-green-600 transition-transform transform hover:scale-105"
          >
            Bắt đầu học thôi!
          </button>
        </div>
      </form>
    </div>
  );
};

export default EnrollmentPage;
