"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}
interface ChatBotProps {
  demoMode?: boolean;
}

export default function ChatBot({ demoMode = false }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(demoMode);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Add initial bot message when chat is first opened
  useEffect(() => {
    if ((isOpen && messages.length === 0) || demoMode) {
      setMessages([
        {
          id: "welcome",
          text: "Hi devdatta, welcome to HDGEBOT 👋\n\nYou are now speaking with HDGE AI Agent. I can do much more than chatbots you've seen before.\nTell me as much as you can about your question and I'll do my best to help you in an instant.",
          sender: "bot",
          timestamp: new Date()
        }
      ]);
    }
  }, [isOpen, messages.length, demoMode]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Logo SVG Component
  const LogoSVG = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 100 100" 
      width="40" 
      height="40" 
      className="fill-current text-white"
    >
      <rect 
        x="5" 
        y="5" 
        width="90" 
        height="90" 
        rx="15" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="5"
      />
      <circle cx="30" cy="50" r="10" fill="currentColor" />
      <circle cx="70" cy="50" r="10" fill="currentColor" />
      <path 
        d="M30,50 Q50,70 70,50" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="5" 
        strokeLinecap="round"
      />
    </svg>
  );

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for your message! This is a demo of the HdgeAI chatbot interface. In a real implementation, this would connect to your AI backend.",
        sender: "bot",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  // Render function for messages with glassmorphism effect
  const renderMessage = (message: Message) => {
    const isUser = message.sender === "user";
    return (
      <div
        key={message.id}
        className={`mb-4 flex ${isUser ? "justify-end" : "justify-start"}`}
      >
        {!isUser && (
          <div className="w-8 h-8 rounded-full bg-gray-800/50 mr-2 flex-shrink-2 overflow-hidden backdrop-blur-sm flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 100 100" 
              width="30" 
              height="30" 
              className="fill-current text-white"
            >
              <rect 
                x="5" 
                y="5" 
                width="90" 
                height="90" 
                rx="15" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="5"
              />
              <circle cx="30" cy="50" r="10" fill="currentColor" />
              <circle cx="70" cy="50" r="10" fill="currentColor" />
              <path 
                d="M30,50 Q50,70 70,50" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="5" 
                strokeLinecap="round"
              />
            </svg>
          </div>
        )}
        <div
          className={`
            max-w-[80%] 
            rounded-2xl 
            p-3 
            text-sm 
            bg-opacity-30 
            backdrop-blur-lg 
            border 
            ${isUser 
              ? "bg-blue-500 border-blue-600 text-white rounded-tr-none" 
              : "bg-gray-500 border-gray-600 text-white rounded-tl-none"
            }
          `}
        >
          <div className="whitespace-pre-wrap">{message.text}</div>
          <div className="text-xs mt-1 opacity-70">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    );
  };

  // Render function for chat window
  const renderChatWindow = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-24 right-6 w-[400px] h-[600px] bg-black/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 flex flex-col overflow-hidden"
      style={{ zIndex: 9998 }}
    >
      {/* Chat header with glassmorphism */}
      <div className="bg-black/30 backdrop-blur-lg p-4 flex items-center border-b border-white/10">
        <button className="mr-3 text-white hover:opacity-70 transition">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="flex items-center">
          <div className="mr-3">
            <LogoSVG />
          </div>
          <div>
            <div className="text-white text-sm font-medium">HdgeAI.space</div>
            <div className="text-xs text-green-500 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"></span>
              Online
            </div>
          </div>
        </div>
      </div>
      
      {/* Messages area with improved scrolling */}
      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar bg-transparent">
        {messages.map(renderMessage)}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area with glassmorphism */}
      <div className="p-3 bg-black/30 backdrop-blur-lg border-t border-white/10">
        <div className="flex items-center bg-white/10 backdrop-blur-lg rounded-full px-3 py-2">
          {/* Mic button */}
          <button className="text-white/70 hover:text-white mr-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" stroke="currentColor" strokeWidth="2"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="12" y1="19" x2="12" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          
          {/* Text input */}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 bg-transparent text-white placeholder-white/50 text-sm py-1 px-2 focus:outline-none"
          />
          
          {/* Attachment button */}
          <button className="text-white/70 hover:text-white mx-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          {/* Send button */}
          <button
            onClick={handleSendMessage}
            className="text-white/70 hover:text-white"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );

  // Floating chat button
  const renderFloatingButton = () => (
    <div 
      className="fixed bottom-6 right-6 z-50"
      style={{ zIndex: 9999 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white flex items-center justify-center shadow-2xl hover:bg-white/20 transition-all duration-300"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <LogoSVG />
        )}
      </button>
    </div>
  );

  // Conditional rendering based on demo mode
  if (demoMode) {
    return (
      <div className="w-full h-full">
        {renderChatWindow()}
      </div>
    );
  }

  return (
    <>
      {renderFloatingButton()}
      <AnimatePresence>
        {isOpen && renderChatWindow()}
      </AnimatePresence>
    </>
  );
}