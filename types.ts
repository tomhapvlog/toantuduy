
export enum Page {
  Home = 'HOME',
  Topics = 'TOPICS',
  TopicDetail = 'TOPIC_DETAIL',
  Achievements = 'ACHIEVEMENTS',
  ParentsCorner = 'PARENTS_CORNER',
  AiTeacher = 'AI_TEACHER',
  QuizGame = 'QUIZ_GAME',
}

export interface Achievement {
  date: string;
  lesson: string;
  category: string;
  stars: number;
  notes: string;
}

export interface Exercise {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Topic {
  id: string;
  title: string;
  emoji: string;
  description: string;
  lesson: string;
  exercises: Exercise[];
}

export interface TopicCategory {
  id: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  topics: Topic[];
}

export interface StudentProfile {
  name: string;
  grade: string;
  textbook: string;
}

export interface ChatMessage {
    role: 'user' | 'model';
    parts: { text: string }[];
}
