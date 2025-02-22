
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Send, X, Loader2, Building2, LineChart, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: string;
  content: string;
  type: 'user' | 'bot';
  timestamp: Date;
  category?: 'strategy' | 'insight' | 'recommendation' | 'analysis';
}

export const BusinessAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
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
        "Hello! I'm your Business Assistant. I can help you with:\n\n" +
        "📊 Business strategy and planning\n" +
        "💼 Enterprise solutions\n" +
        "📈 Market analysis and insights\n" +
        "🤝 Partnership opportunities\n\n" +
        "How can I assist you with your business needs today?",
        'insight'
      );
    }
  }, []);

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
            <h3 className="font-semibold">Business Assistant</h3>
          </div>
          {messages.length > 0 && (
            <button
              onClick={() => setMessages([])}
              className="hover:text-gray-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
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
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about business solutions..."
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
