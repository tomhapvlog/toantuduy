
import React, { useState } from 'react';
import { Page, Topic, TopicCategory } from '../types';
import BackButton from './BackButton';

interface TopicsPageProps {
  topicCategories: TopicCategory[];
  onSelectTopic: (topic: Topic) => void;
  navigate: (page: Page) => void;
}

const TopicsPage: React.FC<TopicsPageProps> = ({ topicCategories, onSelectTopic, navigate }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(topicCategories[0]?.id || null);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-6">🧩 Bài Tập Tư Duy</h2>
      <div className="space-y-4">
        {topicCategories.map(category => (
          <div key={category.id} className={`bg-${category.color} rounded-xl shadow-md overflow-hidden`}>
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full p-4 text-left flex items-center justify-between"
            >
              <div className="flex items-center">
                <span className="text-3xl mr-4">{category.emoji}</span>
                <div>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                  <p className="text-sm">{category.description}</p>
                </div>
              </div>
              <span className={`transform transition-transform ${expandedCategory === category.id ? 'rotate-180' : 'rotate-0'}`}>
                ▼
              </span>
            </button>
            {expandedCategory === category.id && (
              <div className="p-4 bg-white/50 border-t border-gray-300">
                <ul className="space-y-2">
                  {category.topics.map(topic => (
                    <li key={topic.id}>
                      <button
                        onClick={() => onSelectTopic(topic)}
                        className="w-full text-left p-3 bg-white rounded-lg shadow hover:bg-gray-100 transition"
                      >
                        <span className="mr-2">{topic.emoji}</span>
                        {topic.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
      <BackButton navigate={navigate} />
    </div>
  );
};

export default TopicsPage;
