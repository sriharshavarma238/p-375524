import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Mic, MicOff, Send, X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: string;
  content: string;
  type: 'user' | 'bot';
  timestamp: Date;
  category?: 'recommendation' | 'quiz' | 'support' | 'feedback' | 'reward';
}

interface QuizQuestion {
  question: string;
  options: string[];
}

interface UserStats {
  points: number;
  badges: string[];
  interactions: number;
}

export const ChatInterface = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<QuizQuestion | null>(null);
  const [userStats, setUserStats] = useState<UserStats>({
    points: 0,
    badges: [],
    interactions: 0
  });
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: '1',
          content: "Hi! I see you're interested in our services. How can I make your day better today? 😊 I can help with:\n\n1. Product recommendations 🎯\n2. Take a quiz to find the perfect service ✨\n3. Answer questions about our services 💡\n4. Provide technical support 🛠️\n\nJust type your question or say 'start quiz' to begin!",
          type: 'bot',
          timestamp: new Date()
        }
      ]);
    }
  }, [isOpen]);

  const askForFeedback = () => {
    const feedbackMessage = "How was your experience with our website today? Would you like to share any feedback? 💭";
    addBotMessage(feedbackMessage, 'feedback');
  };

  const handleFeedback = (feedback: string) => {
    addUserMessage(feedback);
    const response = "Thank you so much for your feedback! We'll use this to improve our services. As a token of appreciation, here's 50 points! 🌟";
    addBotMessage(response, 'reward');
    updateUserStats(50, ['feedback_contributor']);
  };

  const updateUserStats = (points: number, newBadges: string[]) => {
    setUserStats(prev => ({
      points: prev.points + points,
      badges: [...new Set([...prev.badges, ...newBadges])],
      interactions: prev.interactions + 1
    }));

    if (userStats.interactions % 5 === 0) {
      const rewardMessage = `🎉 Amazing! You've earned ${points} points and the "${newBadges[0]}" badge! Keep engaging with us for more rewards!`;
      addBotMessage(rewardMessage, 'reward');
    }
  };

  const startQuiz = () => {
    const initialQuestion: QuizQuestion = {
      question: "What's your primary goal with our services?",
      options: [
        "Improve productivity",
        "Reduce costs",
        "Scale business",
        "Enhance customer experience"
      ]
    };
    setCurrentQuiz(initialQuestion);
    addBotMessage("Great! Let's find the perfect service for you. " + initialQuestion.question, 'quiz');
  };

  const handleQuizAnswer = (answer: string) => {
    addUserMessage(answer);
    setIsProcessing(true);
    setTimeout(() => {
      const recommendation = `Based on your answer, I recommend our ${answer === 'Improve productivity' ? 'Enterprise Solutions' : 'Professional Services'} package! Would you like to learn more about it? 😊`;
      addBotMessage(recommendation, 'recommendation');
      setCurrentQuiz(null);
      setIsProcessing(false);
    }, 1500);
  };

  const addUserMessage = (content: string) => {
    const message: Message = {
      id: Date.now().toString(),
      content,
      type: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  const addBotMessage = (content: string, category?: Message['category']) => {
    const message: Message = {
      id: (Date.now() + 1).toString(),
      content,
      type: 'bot',
      timestamp: new Date(),
      category
    };
    setMessages(prev => [...prev, message]);
  };

  const processVoiceCommand = (transcript: string) => {
    addUserMessage(transcript);
    if (transcript.toLowerCase().includes('quiz') || transcript.toLowerCase().includes('survey')) {
      startQuiz();
    } else {
      handleUserMessage(transcript);
    }
  };

  const handleUserMessage = async (message: string) => {
    setIsProcessing(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat-with-ai', {
        body: {
          messages: [
            ...messages
              .filter(m => m.type !== 'bot' || !m.category)
              .map(m => ({
                role: m.type === 'user' ? 'user' : 'assistant',
                content: m.content
              })),
            { role: 'user', content: message }
          ],
          language: currentLanguage
        }
      });

      if (error) throw error;

      if (data?.response) {
        addBotMessage(data.response);
        updateUserStats(10, []);
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Sorry, I couldn't process your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSend = () => {
    if (!inputMessage.trim()) return;
    addUserMessage(inputMessage);
    handleUserMessage(inputMessage);
    setInputMessage('');
  };

  const toggleVoice = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setIsRecording(true);
        toast({
          title: "Voice Recognition Active",
          description: "Listening to your command...",
        });
        
        setTimeout(() => {
          stream.getTracks().forEach(track => track.stop());
          setIsRecording(false);
          processVoiceCommand("I'd like to take a quiz");
        }, 3000);
      } catch (error) {
        toast({
          title: "Microphone Access Denied",
          description: "Please enable microphone access to use voice commands.",
          variant: "destructive",
        });
      }
    } else {
      setIsRecording(false);
      toast({
        title: "Voice Recognition Stopped",
        description: "Voice command recording stopped.",
      });
    }
  };

  const chatPosition = isMinimized ? 'bottom-4 right-4 w-auto h-auto' : 'bottom-4 right-4 w-96 h-[600px]';

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 bg-black text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl ${
          isOpen ? 'hidden' : ''
        }`}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </button>

      <div
        className={`fixed ${chatPosition} bg-white rounded-lg shadow-xl flex flex-col transition-all duration-300 z-[100] ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
      >
        <div className="p-4 border-b flex justify-between items-center bg-black text-white rounded-t-lg">
          <h3 className="font-semibold">AI Assistant {userStats.points > 0 && `(${userStats.points} pts)`}</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="hover:text-gray-300 transition-colors"
            >
              {isMinimized ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                </svg>
              )}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:text-gray-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            <div className="px-4 py-2 border-b">
              <select
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value)}
                className="text-sm border rounded px-2 py-1"
              >
                <option value="en">English 🇺🇸</option>
                <option value="es">Español 🇪🇸</option>
                <option value="fr">Français 🇫🇷</option>
              </select>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-black text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    {message.content}
                    {message.category === 'quiz' && currentQuiz && (
                      <div className="mt-4 space-y-2">
                        {currentQuiz.options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleQuizAnswer(option)}
                            className="block w-full text-left px-3 py-2 rounded bg-white text-black hover:bg-gray-50 transition-colors"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex justify-start mb-4">
                  <div className="bg-gray-100 rounded-lg p-3">
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t">
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleVoice}
                  className={`p-2 rounded-full transition-colors ${
                    isRecording
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {isRecording ? (
                    <MicOff className="w-5 h-5" />
                  ) : (
                    <Mic className="w-5 h-5" />
                  )}
                </button>
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-black"
                  disabled={isProcessing}
                />
                <Button
                  onClick={handleSend}
                  className="bg-black text-white hover:bg-gray-800"
                  disabled={isProcessing}
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
