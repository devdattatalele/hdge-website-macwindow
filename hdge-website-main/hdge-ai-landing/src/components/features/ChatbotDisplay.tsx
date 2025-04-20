"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatbotDisplayProps {
  featureIndex?: number;
}

export default function ChatbotDisplay({ featureIndex = 0 }: ChatbotDisplayProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Using react-intersection-observer
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  // Sample conversations for each feature
  const conversations = [
    // Track conversation quality
    [
      {
        id: "bot-1",
        text: "Hi there! Welcome to HdgeAI 👋\n\nHow can I help you today?",
        sender: "bot",
        timestamp: new Date(Date.now() - 120000)
      },
      {
        id: "user-1",
        text: "I'm interested in tracking our customer support quality.",
        sender: "user",
        timestamp: new Date(Date.now() - 90000)
      },
      {
        id: "bot-2",
        text: "Great! HdgeAI can help you monitor agent performance and track customer satisfaction scores. Our AI-powered analytics help you understand what's working and what needs improvement.",
        sender: "bot",
        timestamp: new Date(Date.now() - 60000)
      }
    ],
    // Other conversations for different features
    // ...
  ];

  // Update messages when featureIndex changes
  useEffect(() => {
    setMessages(conversations[featureIndex] || conversations[0]);
  }, [featureIndex]);

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
  );

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
            <LogoSVG />
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

  // Animation variants
  const chatbotVariants = {
    hidden: { 
      scale: 0.95, 
      opacity: 0,
      y: 20 
    },
    visible: { 
      scale: 1, 
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        duration: 0.4
      }
    }
  };

  return (
    <motion.div 
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={chatbotVariants}
      className="w-full h-full relative"
    >
      {/* Enhanced glow effects with better visibility */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-500/20 rounded-full blur-[80px]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/10 rounded-full blur-[60px]"></div>
      
      <div className="w-full h-full bg-[#0A0F1C]/80 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 flex flex-col overflow-hidden relative z-10">
        {/* Chat header with glassmorphism */}
        <div className="bg-black/30 backdrop-blur-lg p-3 flex items-center border-b border-white/10">
          <div className="flex items-center">
            <div className="mr-3 relative">
              <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-md animate-pulse"></div>
              <LogoSVG />
            </div>
            <div>
              <div className="text-white text-sm font-medium">HdgeAI.space</div>
              <div className="text-xs text-green-500 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-1 animate-pulse"></span>
                Online
              </div>
            </div>
          </div>
        </div>
        
        {/* Messages area with hidden scrollbar */}
        <div className="flex-1 p-4 overflow-y-auto scrollbar-hide bg-transparent">
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
              placeholder="Type your message..."
              className="flex-1 bg-transparent text-white placeholder-white/50 text-sm py-1 px-2 focus:outline-none"
              disabled
            />
            
            {/* Attachment button */}
            <button className="text-white/70 hover:text-white mx-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            {/* Send button */}
            <button className="text-white/70 hover:text-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
