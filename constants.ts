
import { TopicCategory } from './types';

export const TEXTBOOK_SERIES = [
  'Cánh Diều',
  'Kết nối tri thức với cuộc sống',
  'Chân trời sáng tạo',
  'Khác'
];

export const TOPIC_CATEGORIES: TopicCategory[] = [
  {
    id: 'so-hoc',
    title: 'Số & Phép tính',
    description: 'Number Bonds, Cộng Trừ nhân chia',
    emoji: '🔢',
    color: 'pastel-blue',
    topics: [
      {
        id: 'cong-tru-1',
        title: 'Phép Cộng Trong Phạm Vi 10',
        emoji: '➕',
        description: 'Học cách cộng các số nhỏ.',
        lesson: 'Phép cộng là khi chúng ta gộp các nhóm đồ vật lại với nhau. Ví dụ, nếu bé có 2 quả táo và được cho thêm 3 quả nữa, bé sẽ có 2 + 3 = 5 quả táo!',
        exercises: [
          { id: 1, question: '2 + 5 = ?', options: ['6', '7', '8'], correctAnswer: '7' },
          { id: 2, question: '4 + 4 = ?', options: ['7', '8', '9'], correctAnswer: '8' },
          { id: 3, question: '6 + 3 = ?', options: ['9', '10', '8'], correctAnswer: '9' },
        ],
      },
      {
        id: 'nhan-chia-1',
        title: 'Làm Quen Bảng Nhân 2',
        emoji: '✖️',
        description: 'Bắt đầu với bảng cửu chương.',
        lesson: 'Phép nhân là cách cộng lặp lại một số nhiều lần. Ví dụ 2 x 3 nghĩa là lấy số 2 cộng 3 lần: 2 + 2 + 2 = 6. Dễ phải không nào?',
        exercises: [
            { id: 1, question: '2 x 4 = ?', options: ['6', '8', '10'], correctAnswer: '8' },
            { id: 2, question: '2 x 7 = ?', options: ['14', '16', '12'], correctAnswer: '14' },
            { id: 3, question: '2 x 9 = ?', options: ['16', '18', '20'], correctAnswer: '18' },
        ],
      },
    ],
  },
  {
    id: 'hinh-hoc',
    title: 'Hình học & Đo lường',
    description: 'Shapes, measurement',
    emoji: '🔺',
    color: 'pastel-mint',
    topics: [
      {
        id: 'hinh-hoc-1',
        title: 'Nhận Biết Hình Vuông',
        emoji: '🟥',
        description: 'Tìm hiểu về hình vuông.',
        lesson: 'Hình vuông là một hình đặc biệt có 4 cạnh bằng nhau và 4 góc vuông. Bé hãy thử tìm các đồ vật hình vuông xung quanh nhà mình xem!',
        exercises: [
          { id: 1, question: 'Hình vuông có mấy cạnh?', options: ['3', '4', '5'], correctAnswer: '4' },
          { id: 2, question: 'Các cạnh của hình vuông thì...', options: ['Bằng nhau', 'Không bằng nhau'], correctAnswer: 'Bằng nhau' },
          { id: 3, question: 'Cái nào sau đây thường là hình vuông?', options: ['Bánh xe', 'Cửa sổ', 'Quả bóng'], correctAnswer: 'Cửa sổ' },
        ],
      },
    ],
  },
  {
    id: 'tu-duy-logic',
    title: 'Tư duy logic',
    description: 'Puzzles, pattern finding',
    emoji: '🧠',
    color: 'pastel-yellow',
    topics: [
      {
        id: 'logic-1',
        title: 'Tìm Quy Luật Dãy Số',
        emoji: '🔍',
        description: 'Tìm số tiếp theo trong dãy.',
        lesson: 'Dãy số có quy luật là một dãy các số được sắp xếp theo một trật tự nhất định. Nhiệm vụ của bé là tìm ra quy luật đó. Ví dụ: 1, 2, 3, ... số tiếp theo là 4!',
        exercises: [
          { id: 1, question: 'Điền số tiếp theo: 2, 4, 6, 8, ?', options: ['9', '10', '12'], correctAnswer: '10' },
          { id: 2, question: 'Điền số tiếp theo: 5, 10, 15, 20, ?', options: ['25', '30', '22'], correctAnswer: '25' },
          { id: 3, question: 'Điền số tiếp theo: 9, 8, 7, 6, ?', options: ['4', '5', '3'], correctAnswer: '5' },
        ],
      },
    ],
  },
  {
    id: 'toan-loi-van',
    title: 'Bài toán có lời văn',
    description: 'Bar Model method (Singapore Math)',
    emoji: '📊',
    color: 'pastel-pink',
    topics: [
      {
        id: 'loi-van-1',
        title: 'Bài Toán Cộng Đơn Giản',
        emoji: '📝',
        description: 'Giải toán có lời văn.',
        lesson: 'Với bài toán có lời văn, chúng ta cần đọc kỹ đề bài để hiểu câu chuyện. Sau đó, tìm ra phép tính đúng để giải bài toán. Ví dụ: "An có 3 viên bi, Bình cho An thêm 2 viên. Hỏi An có tất cả mấy viên bi?". Chúng ta sẽ làm phép tính cộng: 3 + 2 = 5.',
        exercises: [
          { id: 1, question: 'Lan có 5 cái kẹo, mẹ cho thêm 3 cái. Hỏi Lan có tất cả mấy cái kẹo?', options: ['7', '8', '9'], correctAnswer: '8' },
          { id: 2, question: 'Trên cành cây có 6 con chim, bay đến thêm 2 con nữa. Hỏi có tất cả bao nhiêu con chim trên cành?', options: ['8', '7', '9'], correctAnswer: '8' },
          { id: 3, question: 'Tổ Một có 4 bạn, tổ Hai có 5 bạn. Hỏi cả hai tổ có bao nhiêu bạn?', options: ['8', '10', '9'], correctAnswer: '9' },
        ],
      },
    ],
  },
];
