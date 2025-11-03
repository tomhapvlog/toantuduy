
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import HomePage from './components/HomePage';
import TopicsPage from './components/TopicsPage';
import TopicDetailPage from './components/TopicDetailPage';
import AchievementsPage from './components/AchievementsPage';
import ParentsCornerPage from './components/ParentsCornerPage';
import AiTeacherPage from './components/AiTeacherPage';
import QuizGame from './components/QuizGame';
import BadgeAnimation from './components/BadgeAnimation';
import StarProgressBar from './components/StarProgressBar';
import EnrollmentPage from './components/EnrollmentPage';
import { Page, Achievement, Topic, TopicCategory, StudentProfile } from './types';
import { TOPIC_CATEGORIES } from './constants';

const App: React.FC = () => {
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    try {
      const savedAchievements = localStorage.getItem('achievements');
      return savedAchievements ? JSON.parse(savedAchievements) : [];
    } catch (error) {
      console.error("Error parsing achievements from localStorage", error);
      return [];
    }
  });
  const [showBadgeAnimation, setShowBadgeAnimation] = useState(false);

  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('studentProfile');
      if (savedProfile) {
        setStudentProfile(JSON.parse(savedProfile));
      }
    } catch (error) {
      console.error("Error parsing student profile from localStorage", error);
    }
    setIsLoadingProfile(false);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('achievements', JSON.stringify(achievements));
    } catch (error) {
      console.error("Error saving achievements to localStorage", error);
    }
  }, [achievements]);

  const handleSaveProfile = (profile: StudentProfile) => {
    try {
      localStorage.setItem('studentProfile', JSON.stringify(profile));
      setStudentProfile(profile);
    } catch (error) {
      console.error("Error saving student profile to localStorage", error);
    }
  };

  const totalStars = useMemo(() => {
    return achievements.reduce((sum, ach) => sum + ach.stars, 0);
  }, [achievements]);
  
  const navigate = (page: Page) => {
    setCurrentPage(page);
  };

  const handleSelectTopic = (topic: Topic) => {
    setSelectedTopic(topic);
    setCurrentPage(Page.TopicDetail);
  };

  const addAchievement = useCallback((topicName: string, category: string, stars: number) => {
    const topicAchievements = achievements.filter(a => a.lesson === topicName);
    const oldTotalStarsForTopic = topicAchievements.reduce((sum, a) => sum + a.stars, 0);

    const newAchievement: Achievement = {
      date: new Date().toLocaleDateString('vi-VN'),
      lesson: topicName,
      category,
      stars,
      notes: ''
    };
    
    setAchievements(prev => [...prev, newAchievement]);
    
    const newTotalStarsForTopic = oldTotalStarsForTopic + stars;
    if (oldTotalStarsForTopic < 5 && newTotalStarsForTopic >= 5) {
      setShowBadgeAnimation(true);
      setTimeout(() => setShowBadgeAnimation(false), 3000);
    }
  }, [achievements]);
  
  const renderPage = () => {
    if (isLoadingProfile) {
      return <div className="text-center p-8">Đang tải...</div>;
    }

    if (!studentProfile) {
      return <EnrollmentPage onSaveProfile={handleSaveProfile} />;
    }

    switch (currentPage) {
      case Page.Home:
        return <HomePage navigate={navigate} studentName={studentProfile.name} />;
      case Page.Topics:
        return <TopicsPage topicCategories={TOPIC_CATEGORIES} onSelectTopic={handleSelectTopic} navigate={navigate} />;
      case Page.TopicDetail:
        return selectedTopic ? <TopicDetailPage topic={selectedTopic} onComplete={addAchievement} navigate={navigate} /> : <HomePage navigate={navigate} studentName={studentProfile.name}/>;
      case Page.Achievements:
        return <AchievementsPage achievements={achievements} navigate={navigate} />;
      case Page.ParentsCorner:
        return <ParentsCornerPage achievements={achievements} navigate={navigate} />;
      case Page.AiTeacher:
        return <AiTeacherPage navigate={navigate} />;
      case Page.QuizGame:
        return <QuizGame onComplete={addAchievement} navigate={navigate} />;
      default:
        return <HomePage navigate={navigate} studentName={studentProfile.name} />;
    }
  };

  return (
    <div className="bg-[#F7F3E9] min-h-screen text-gray-800">
      <div className="container mx-auto p-4 max-w-2xl">
        <header className="mb-4">
          <h1 className="text-4xl font-bold text-center text-brand-primary">Toán Tư Duy Mini</h1>
          {studentProfile && <StarProgressBar totalStars={totalStars} maxStars={50} />}
        </header>
        <main className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg">
          {renderPage()}
        </main>
      </div>
      {showBadgeAnimation && <BadgeAnimation />}
    </div>
  );
};

export default App;
