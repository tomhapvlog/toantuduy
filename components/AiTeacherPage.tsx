
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Page, ChatMessage } from '../types';
import BackButton from './BackButton';
import { getAiTeacherResponse } from '../services/geminiService';

const AiTeacherPage: React.FC<{ navigate: (page: Page) => void }> = ({ navigate }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const setupRecognition = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = 'vi-VN';
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };
      recognitionRef.current = recognition;
    }
  }, []);

  useEffect(() => {
    setupRecognition();
  }, [setupRecognition]);

  const handleToggleListen = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', parts: [{ text: input }] };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await getAiTeacherResponse(newMessages);
      const modelMessage: ChatMessage = { role: 'model', parts: [{ text: aiResponse }] };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: ChatMessage = { role: 'model', parts: [{ text: "Có lỗi xảy ra, bé thử lại sau nhé." }] };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[75vh]">
      <h2 className="text-3xl font-bold text-center mb-4">💬 Hỏi Thầy AI</h2>
      <div className="flex-grow bg-gray-100 rounded-lg p-4 overflow-y-auto mb-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Bé có câu hỏi gì về Toán không?</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} mb-3`}>
              <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-white'}`}>
                <p className="whitespace-pre-wrap">{msg.parts[0].text}</p>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start mb-3">
             <div className="max-w-xs md:max-w-md p-3 rounded-2xl bg-white">
                <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
             </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <button type="button" onClick={handleToggleListen} className={`p-3 rounded-full ${isListening ? 'bg-red-500' : 'bg-gray-200'} transition`}>
          🎤
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập câu hỏi của bé..."
          className="flex-grow p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-brand-primary"
          disabled={isLoading}
        />
        <button type="submit" className="bg-brand-primary text-white p-3 rounded-full font-bold hover:bg-green-600 transition disabled:bg-gray-400" disabled={isLoading}>
          Gửi
        </button>
      </form>
      <BackButton navigate={navigate} />
    </div>
  );
};

export default AiTeacherPage;
