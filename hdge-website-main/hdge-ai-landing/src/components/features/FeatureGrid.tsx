"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ChatbotDisplay from "./ChatbotDisplay";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export default function FeatureGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const chatbotRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeCard, setActiveCard] = useState(0);

  // Add this useEffect to sync activeCard with scroll position
 
  // Animation for feature cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-8");
          }
        });
      },
      { threshold: 0.1 }
    );

    const featureCards = document.querySelectorAll(".feature-card");
    featureCards.forEach((card) => {
      card.classList.add("opacity-0", "translate-y-8", "transition-all", "duration-700");
      observer.observe(card);
    });

    return () => {
      featureCards.forEach((card) => {
        observer.unobserve(card);
      });
    };
  }, []);

  // Horizontal scrolling animation for feature tags
  useEffect(() => {
    const animateScroll = () => {
      setScrollPosition((prevPosition) => {
        // Reset when it reaches a certain point to create infinite loop effect
        if (prevPosition <= -1000) {
          return 0;
        }
        return prevPosition - 1.5; // Adjust speed here
      });
    };

    const animationId = setInterval(animateScroll, 30);
    return () => clearInterval(animationId);
  }, []);

  // Feature tags for the scrolling animation
  const featureTags = [
    "24/7 Support", "Smart Analytics", "Personalized Responses", "Workflow Automation",
    "Real-time Insights", "Seamless Integration", "Customer Retention", "Data-Driven",
    "Cost-Effective", "Increased Efficiency",
    "Instant Resolution", "AI-Powered Assistance", "Scalable Solutions", "Intelligent Routing",
    "Enhanced Productivity", "Multi-Platform Support", "Proactive Engagement", "Customizable Workflows",
    "Actionable Recommendations", "Automated Reporting", "Dynamic Query Handling", "Optimized Operations",
    "User-Centric Design", "Predictive Analytics", "Adaptive Learning", "Seamless Collaboration",
    "Effortless Deployment", "Smart Knowledge Base", "Continuous Improvement", "Frictionless User Experience"
];

  // Duplicate tags to create seamless loop
  const allTags = [...featureTags, ...featureTags];

  // Content for the sticky scroll section with chatbot
  const conversationExplorerContent = [
    {
      title: "Track conversation quality",
      description: "Monitor agent performance and customer satisfaction scores. Our AI-powered analytics help you understand what's working and what needs improvement.",
      content: (
        <div className="h-full w-full flex items-center justify-center rounded-lg overflow-hidden shadow-xl">
          <ChatbotDisplay />
        </div>
      ),
    },
    {
      title: "Identify common issues",
      description: "Use AI to categorize and cluster similar customer problems. Quickly spot trends and recurring issues to address them proactively.",
      content: (
        <div className="h-full w-full flex items-center justify-center rounded-lg overflow-hidden shadow-xl">
          <ChatbotDisplay />
        </div>
      ),
    },
    {
      title: "Optimize response times",
      description: "Analyze response times and identify bottlenecks in your process. Improve efficiency and customer satisfaction with faster, more accurate responses.",
      content: (
        <div className="h-full w-full flex items-center justify-center rounded-lg overflow-hidden shadow-xl">
          <ChatbotDisplay />
        </div>
      ),
    },
    {
      title: "AI-powered insights",
      description: "Leverage advanced machine learning to extract actionable insights from your customer conversations. Make data-driven decisions to improve your service.",
      content: (
        <div className="h-full w-full flex items-center justify-center rounded-lg overflow-hidden shadow-xl">
          <ChatbotDisplay />
        </div>
      ),
    },
  ];

  return (
    <>
      <section ref={sectionRef} className="py-20 md:py-32 bg-gradient-dark overflow-hidden" id="features">
        <div className="container mx-auto px-4">
          {/* Updated heading section to be left-aligned */}
          <div className="mb-16">
            <Badge variant="outline" className="mb-4 border-blue-500 text-blue-400 py-1 px-3">Features</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Powerful AI Features</h2>
            <p className="text-lg text-gray-300 max-w-3xl">
              Enhance your customer support experience with our comprehensive suite of AI-powered tools
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="feature-card bg-gray-900 border-gray-800 hover:border-blue-500 transition-all duration-300 transform-gpu"
              >
                <CardContent className="p-6 relative z-10">
                  <div className="mb-4 text-blue-400">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Both scrolling feature tags sections moved together after the features grid */}
          <div className="mt-16 space-y-8">
            {/* First scrolling feature tags (moved from above) */}
            <div className="w-full overflow-hidden mask-gradient-x">
              <div 
                className="flex gap-8 py-2" 
                style={{ 
                  transform: `translateX(${scrollPosition}px)`,
                  width: "max-content"
                }}
              >
                {allTags.map((tag, index) => (
                  <div 
                    key={index} 
                    className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full whitespace-nowrap"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Second scrolling feature tags */}
            <div className="w-full overflow-hidden mask-gradient-x">
              <div 
                className="flex gap-8 py-2" 
                style={{ 
                  transform: `translateX(${-scrollPosition}px)`,
                  width: "max-content"
                }}
              >
                {[...featureTags, ...featureTags].map((tag, index) => (
                  <div 
                    key={index} 
                    className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full whitespace-nowrap"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={chatbotRef} className="py-12 md:py-20 bg-black overflow-hidden" id="conversationExplorer">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Text content on the left */}
            <div className="lg:w-[40%]">
              <Badge variant="outline" className="mb-4 border-blue-500 text-blue-400 py-1 px-3">Conversation Explorer</Badge>
              <h2 className="text-2xl md:text-4xl font-bold mb-4 text-white">Analyze customer conversations at scale</h2>
              <p className="text-base text-gray-300">
                Uncover patterns, identify issues, and track sentiment to improve your customer experience.
                HdgeAI helps you understand what your customers are saying and how they're feeling.
              </p>
              
              {/* Added CTA button */}
              <button className="mt-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 flex items-center">
                Get Started
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            {/* Window on the right - adjusted to be less elongated */}
            <div className="lg:w-[60%] relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg opacity-0 group-hover:opacity-100 animate-pulse transition-all duration-500"></div>
              <div className="relative w-full max-w-[900px] mx-auto">
                {/* Enhanced glow effects */}
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-2xl"></div>
                
                {/* Safari-like window - adjusted proportions */}
                <div className="relative bg-[#0A0F1C] backdrop-blur-xl rounded-xl border border-gray-800/50 shadow-2xl overflow-hidden">
                  {/* Window header with improved styling */}
                  <div className="bg-[#0F1629] px-3 py-2 border-b border-gray-800">
                    <div className="flex items-center">
                      <div className="flex space-x-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                      </div>
                      <div className="mx-auto text-xs text-gray-400 bg-[#1C2333] px-3 py-0.5 rounded-full flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        hdgeai.space/features
                      </div>
                    </div>
                  </div>

                  {/* Content area - adjusted width */}
                  <div className="flex flex-col lg:flex-row h-[550px] w-full">
                    {/* Features list with improved styling */}
                    <div className="lg:w-[45%] p-4 border-r border-gray-800 overflow-y-auto scrollbar-hide">
                      <div className="space-y-3">
                        {conversationExplorerContent.map((item, index) => (
                          <div 
                            key={index}
                            className={`p-3 rounded-lg transition-all duration-300 cursor-pointer ${
                              index === activeCard 
                                ? 'bg-gradient-to-r from-[#1C2333] to-[#1C2333]/80 border border-blue-500/20 shadow-lg shadow-blue-500/5' 
                                : 'hover:bg-[#1C2333]/50'
                            }`}
                            onClick={() => setActiveCard(index)}
                          >
                            <h3 className="text-base font-semibold text-white mb-1">{item.title}</h3>
                            <p className="text-xs text-gray-400 leading-relaxed">{item.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Chatbot display with improved styling */}
                    <div className="lg:w-[55%] p-3 bg-[#0A0F1C]">
                      <div className="h-full rounded-lg overflow-hidden">
                        <ChatbotDisplay featureIndex={activeCard} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// Features array remains unchanged
const features = [
  {
    title: "24/7 Customer Support",
    description: "Provide instant support to your customers any time of day, resolving issues faster and improving satisfaction.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
        <path d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2"></path>
        <path d="M12 2v20"></path>
        <path d="M2 12h20"></path>
        <path d="M20 18.6 18.6 17"></path>
        <path d="M20 5.4 18.6 7"></path>
        <path d="M4 18.6 5.4 17"></path>
        <path d="M4 5.4 5.4 7"></path>
      </svg>
    ),
  },
  {
    title: "Smart Data Tracking",
    description: "Automatically track and analyze customer data to identify trends and make data-driven decisions.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
        <path d="m22 12-9-9-2 2 7 7-7 7 2 2z"></path>
        <path d="M11 5 2 14l9 9"></path>
        <path d="m19 12-7-7"></path>
        <path d="m19 12-7 7"></path>
      </svg>
    ),
  },
  {
    title: "Personalized Responses",
    description: "Deliver tailored responses based on customer history, preferences, and behavior patterns.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
        <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2"></path>
        <rect width="18" height="18" x="3" y="3" rx="2"></rect>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    ),
  },
  {
    title: "Workflow Automation",
    description: "Streamline operations by automating repetitive tasks and processes, allowing your team to focus on high-value work.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
        <path d="M12 22v-5"></path>
        <path d="M9 8V2"></path>
        <path d="M15 8V2"></path>
        <path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8"></path>
        <path d="M12 17v-5"></path>
      </svg>
    ),
  },
  {
    title: "Real-time Analytics",
    description: "Monitor performance metrics and customer interactions in real-time to quickly identify and address issues.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
        <path d="M2 12h20"></path>
        <path d="M2 20h20"></path>
        <path d="M2 4h20"></path>
        <path d="M6 12v8"></path>
        <path d="M14 12v8"></path>
        <path d="M10 4v16"></path>
        <path d="M18 4v16"></path>
      </svg>
    ),
  },
  {
    title: "Seamless Integration",
    description: "Easily integrate with your existing tools and systems, from CRM to helpdesk software, for a unified workflow.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
        <path d="M16.5 9.4 7.5 4.21"></path>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <path d="M3.27 6.96 12 12.01l8.73-5.05"></path>
        <path d="M12 22.08V12"></path>
      </svg>
    ),
  },
];

// Update the features rendering part
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {features.map((feature, index) => (
    <Card 
      key={index}
      className="bg-black/40 backdrop-blur-sm border border-gray-800 hover:border-blue-500/50 transition-all duration-300 relative overflow-hidden"
    >
      <GlowingEffect 
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
      />
      <CardContent className="p-6 relative z-10">
        <div className="mb-4 text-blue-400">{feature.icon}</div>
        <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
        <p className="text-gray-400">{feature.description}</p>
      </CardContent>
    </Card>
  ))}
</div>
