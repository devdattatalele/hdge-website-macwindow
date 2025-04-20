"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  return (
    <main className="min-h-screen bg-black pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-blue-500 text-blue-400 py-1 px-3">Pricing</Badge>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white">Simple, transparent pricing</h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Choose the plan that's right for your business. All plans include a free trial.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center items-center mb-12">
          <span className={`mr-3 text-lg ${billingPeriod === "monthly" ? "text-white" : "text-gray-400"}`}>Monthly</span>
          <button
            onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "yearly" : "monthly")}
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-800 transition-colors focus:outline-none"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-blue-500 transition-transform ${
                billingPeriod === "yearly" ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span className={`ml-3 text-lg ${billingPeriod === "yearly" ? "text-white" : "text-gray-400"}`}>Yearly</span>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border text-card-foreground shadow bg-gray-900 border-gray-800 hover:border-blue-500 transition-all duration-300"
          >
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3 text-white">Basic</h3>
              <div className="mb-6">
                <div className="text-4xl font-bold text-white">
                  {billingPeriod === "monthly" ? "$50" : "$500"}
                  <span className="text-lg text-gray-400 font-normal">/{billingPeriod === "monthly" ? "month" : "year"}</span>
                </div>
                {billingPeriod === "yearly" && (
                  <div className="text-sm text-green-400 mt-1">Save $100</div>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  "AI Integrated Chatbot",
                  "500 Monthly Tickets",
                  "100 Monthly Agent Chats",
                  "Access to basic website FAQs and product descriptions",
                  "Basic Workflow Automation",
                  "Email Support"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white">
                Start Free Trial
              </Button>
              <p className="text-xs text-center text-gray-500 mt-3">14-day trial. No credit card required.</p>
            </div>
          </motion.div>

          {/* Agentic AI Plan */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-xl border text-card-foreground shadow bg-gray-800 border-blue-500 hover:border-blue-400 transition-all duration-300 transform scale-105 z-10"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-bold text-white">Agentic AI</h3>
                <Badge className="bg-blue-500 text-white">Popular</Badge>
              </div>
              <div className="mb-6">
                <div className="text-4xl font-bold text-white">
                  {billingPeriod === "monthly" ? "$100" : "$1000"}
                  <span className="text-lg text-gray-400 font-normal">/{billingPeriod === "monthly" ? "month" : "year"}</span>
                </div>
                {billingPeriod === "yearly" && (
                  <div className="text-sm text-green-400 mt-1">Save $200</div>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  "AI Integrated Chatbot",
                  "1500 Monthly Tickets",
                  "300 Monthly Agent Chats",
                  "Full Website Data Access",
                  "Advanced Workflow Automation",
                  "Priority Email & Chat Support",
                  "Proactive Messaging"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white">
                Start Free Trial
              </Button>
              <p className="text-xs text-center text-gray-500 mt-3">14-day trial. No credit card required.</p>
            </div>
          </motion.div>

          {/* Personalized SaaS Plan */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-xl border text-card-foreground shadow bg-gray-900 border-gray-800 hover:border-blue-500 transition-all duration-300"
          >
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3 text-white">Personalized SaaS</h3>
              <div className="mb-6">
                <div className="text-4xl font-bold text-white">
                  Contact Us
                </div>
                <div className="text-sm text-gray-400 mt-1">Custom pricing</div>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  "Customized AI Chatbot",
                  "Custom Ticket & Chat Limits",
                  "Full Data Integration",
                  "Advanced & Customized Automation",
                  "Dedicated Account Manager",
                  "Prioritized Support",
                  "Custom Branding"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white">
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {[
              {
                question: "How long is the free trial?",
                answer: "All plans come with a 14-day free trial. No credit card required to start."
              },
              {
                question: "What happens when I exceed my monthly limits?",
                answer: "If you exceed your monthly ticket or chat limits, you'll be charged a small fee for each additional item. We'll notify you before this happens."
              },
              {
                question: "Can I upgrade or downgrade my plan?",
                answer: "Yes, you can change your plan at any time. If you upgrade, you'll be charged the prorated difference. If you downgrade, you'll receive credit toward your next billing cycle."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-2">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Still have questions?</h2>
          <p className="text-gray-400 mb-6">Our team is here to help you find the perfect plan for your business.</p>
          <div className="flex justify-center space-x-4">
            <Button className="bg-blue-600 hover:bg-blue-500 text-white">
              Contact Sales
            </Button>
            <Link href="/terms" passHref>
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                View Terms of Service
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}