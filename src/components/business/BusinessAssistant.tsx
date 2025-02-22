
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Send, X, Loader2, Building2, LineChart, CheckCircle, Mic, MicOff, ThumbsUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: string;
  content: string;
  type: 'user' | 'bot';
  timestamp: Date;
  category?: 'strategy' | 'insight' | 'recommendation' | 'analysis' | 'feedback' | 'quiz';
}

interface QuizState {
  isActive: boolean;
  currentQuestion: number;
  answers: Record<string, string>;
}

export const BusinessAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [quizState, setQuizState] = useState<QuizState>({ 
    isActive: false, 
    currentQuestion: 0,
    answers: {}
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      addBotMessage(
        "Hello! I'm your AI Business Assistant. I can help you with:\n\n" +
        "📊 Business strategy and planning\n" +
        "💼 Product recommendations\n" +
        "🎯 Personalized solutions (take our quiz!)\n" +
        "🎤 Voice commands available\n" +
        "💬 Feedback and support\n\n" +
        "How can I assist you today?",
        'insight'
      );
    }
  }, []);

  const startVoiceRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onstart = () => {
        setIsListening(true);
        toast({
          title: "Listening",
          description: "Speak now...",
        });
      };
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        handleUserMessage(transcript);
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast({
          title: "Error",
          description: "Could not recognize speech. Please try again.",
          variant: "destructive",
        });
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
    } else {
      toast({
        title: "Not Supported",
        description: "Voice recognition is not supported in your browser.",
        variant: "destructive",
      });
    }
  };

  const startProductQuiz = () => {
    setQuizState({
      isActive: true,
      currentQuestion: 0,
      answers: {}
    });
    
    addBotMessage(
      "Let's find the perfect solution for you! First question:\n\n" +
      "What's your primary business goal?\n" +
      "1️⃣ Increase revenue\n" +
      "2️⃣ Improve efficiency\n" +
      "3️⃣ Expand market reach\n" +
      "4️⃣ Enhance customer service\n\n" +
      "Just type the number or describe your goal!",
      'quiz'
    );
  };

  const collectFeedback = () => {
    addBotMessage(
      "I'd love to hear your thoughts! 💭\n\n" +
      "How was your experience with our services today?\n" +
      "• Excellent 🌟\n" +
      "• Good 👍\n" +
      "• Could be better 🤔\n" +
      "• Not satisfied 😔\n\n" +
      "Feel free to add any specific comments!",
      'feedback'
    );
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

  const handleUserMessage = async (message: string) => {
    setIsProcessing(true);
    
    if (message.toLowerCase().includes('quiz') || message.toLowerCase().includes('survey')) {
      startProductQuiz();
      setIsProcessing(false);
      return;
    }

    if (message.toLowerCase().includes('feedback')) {
      collectFeedback();
      setIsProcessing(false);
      return;
    }

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
          context: 'business'
        }
      });

      if (error) throw error;

      if (data?.response) {
        addBotMessage(data.response, 'insight');
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "I apologize, but I couldn't process your request. Please try again.",
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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/80 backdrop-blur-lg rounded-lg shadow-xl border border-gray-200">
        <div className="p-4 border-b bg-black text-white rounded-t-lg flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            <h3 className="font-semibold">AI Business Assistant</h3>
          </div>
          <div className="flex items-center gap-2">
            {messages.length > 0 && (
              <>
                <button
                  onClick={collectFeedback}
                  className="hover:text-gray-300 transition-colors p-2"
                  title="Give Feedback"
                >
                  <ThumbsUp className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setMessages([])}
                  className="hover:text-gray-300 transition-colors p-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>

        <div className="h-[500px] overflow-y-auto p-4">
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
                {message.type === 'bot' && message.category === 'strategy' && (
                  <LineChart className="w-4 h-4 text-blue-500 inline mr-2" />
                )}
                {message.type === 'bot' && message.category === 'recommendation' && (
                  <CheckCircle className="w-4 h-4 text-green-500 inline mr-2" />
                )}
                {message.content}
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
            <Button
              onClick={startVoiceRecognition}
              className={`${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-gray-200 hover:bg-gray-300'
              } text-black`}
              disabled={isProcessing}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </Button>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about business solutions, take our quiz, or give feedback..."
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
      </div>
    </div>
  );
};
