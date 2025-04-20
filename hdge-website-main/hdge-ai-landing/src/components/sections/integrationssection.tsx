"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const IntegrationsSection = () => {
  const integrations = [
    { name: "Slack", icon: "/integrations/slack.svg", category: "Communication", color: "from-blue-500/20 to-green-500/20" },
    { name: "PostgreSQL", icon: "/integrations/postgresql.svg", category: "Database", color: "from-blue-500/20 to-cyan-500/20" },
    { name: "Zoho", icon: "/integrations/zoho.svg", category: "CRM", color: "from-red-500/20 to-orange-500/20" },
    { name: "Discord", icon: "/integrations/discord.svg", category: "Communication", color: "from-indigo-500/20 to-purple-500/20" },
    { name: "MongoDB", icon: "/integrations/mongodb.svg", category: "Database", color: "from-green-500/20 to-emerald-500/20" },
    { name: "Salesforce", icon: "/integrations/salesforce.svg", category: "CRM", color: "from-blue-500/20 to-sky-500/20" },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-purple-500/10 blur-3xl" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-500/20 rounded-full"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              scale: 0
            }}
            animate={{ 
              y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col items-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center px-4 py-1 mb-4 rounded-full bg-blue-500/10 border border-blue-500/20"
          >
            <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Powerful Integrations
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-center text-white mb-4"
          >
            Connect with your favorite tools
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 text-center max-w-2xl"
          >
            Seamlessly integrate HdgeAI with your existing workflow
          </motion.p>
        </div>

        {/* Central Hub Design */}
        <div className="relative max-w-6xl mx-auto mb-20">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[500px] h-[500px] rounded-full border border-blue-500/20 animate-pulse" />
            <div className="absolute w-[400px] h-[400px] rounded-full border border-purple-500/20 animate-pulse delay-75" />
            <div className="absolute w-[300px] h-[300px] rounded-full border border-cyan-500/20 animate-pulse delay-150" />
          </div>
          
          {/* Integration Cards with Connection Lines */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {integrations.map((integration, index) => (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${integration.color} rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700/50 p-6 hover:border-blue-500/50 transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 relative bg-gray-700/50 rounded-lg p-2">
                      <Image
                        src={integration.icon}
                        alt={integration.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{integration.name}</h3>
                      <p className="text-gray-400 text-sm">{integration.category}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-gray-400">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                    Connected
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced Features Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 blur-3xl" />
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Easy Setup",
                description: "Connect your tools in minutes with our simple integration process",
                icon: "⚡",
                gradient: "from-yellow-500/20 to-orange-500/20"
              },
              {
                title: "Real-time Sync",
                description: "Keep your data synchronized across all platforms automatically",
                icon: "🔄",
                gradient: "from-blue-500/20 to-cyan-500/20"
              },
              {
                title: "Secure Connection",
                description: "Enterprise-grade security for all your integrations",
                icon: "🔒",
                gradient: "from-green-500/20 to-emerald-500/20"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-6 rounded-xl border border-gray-700/50 bg-gray-800/30 backdrop-blur-sm"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;