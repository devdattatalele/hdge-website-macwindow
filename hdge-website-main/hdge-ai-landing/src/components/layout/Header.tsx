"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  
  // Navigation items matching the image
  const navItems = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "/pricing" }, // Updated to point to the pricing page instead of #pricing
    { name: "Changelog", href: "/changelog" },
    { name: "Contact", href: "/contact" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  };

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-md px-6 py-4 my-4 flex items-center justify-between border border-gray-400/50"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.25) 0px 10px 17px -5px"
          }}
        >
          {/* Logo and Company Name */}
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Link href="/" className="flex items-center">
              <div className="relative w-8 h-8 mr-2">
                <Image 
                  src="/logo.png" 
                  alt="HDGE AI" 
                  fill
                  style={{ objectFit: 'contain' }}
                  className="rounded-md"
                />
              </div>
              <div className="flex items-center">
                <span className="text-lg font-bold text-white mr-1">HDGE3</span>
                <span className="text-lg font-bold text-blue-400">LABS</span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav 
            className="hidden md:flex items-center space-x-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {navItems.map((item) => (
              <motion.div key={item.name} variants={itemVariants}>
                <Link 
                  href={item.href}
                  className="relative px-4 py-2 rounded-lg text-gray-300 font-medium text-sm hover:bg-white/10 transition-colors"
                  onMouseEnter={() => setActiveItem(item.name)}
                  onMouseLeave={() => setActiveItem(null)}
                >
                  {item.name}
                  {activeItem === item.name && (
                    <motion.span
                      className="absolute inset-0 rounded-lg bg-white/10"
                      layoutId="hoverBackground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          {/* Get Started Button */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
          >
            <Link href="/signup">
              <motion.button
                className="inline-flex items-center px-4 py-2 rounded-lg text-white font-medium text-sm"
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                style={{
                  background: "linear-gradient(127deg, rgb(14, 28, 41) -68%, rgb(50, 61, 104) 100%)",
                  boxShadow: "rgb(184, 193, 230) 0px 1px 2px 0px inset, rgba(46, 64, 128, 0.345) 0px 0.7px 0.7px -0.6px"
                }}
              >
                <span className="mr-2">Get Started</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            </Link>
          </motion.div>

          {/* Mobile menu button */}
          <motion.button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="4" x2="20" y1="12" y2="12"></line>
                  <line x1="4" x2="20" y1="6" y2="6"></line>
                  <line x1="4" x2="20" y1="18" y2="18"></line>
                </>
              )}
            </svg>
          </motion.button>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="absolute top-full left-0 right-0 bg-gray-900/90 backdrop-blur-md shadow-lg rounded-b-xl md:hidden mt-2 p-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <motion.nav className="flex flex-col space-y-3">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      className="px-4 py-2 rounded-lg text-gray-300 font-medium text-sm hover:bg-white/10"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </motion.a>
                  ))}
                  <motion.a
                    href="/signup"
                    className="px-4 py-2 rounded-lg text-white font-medium text-sm bg-gradient-to-r from-[#0E1C29] to-[#323D68]"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navItems.length * 0.1 }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </motion.a>
                </motion.nav>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </header>
  );
}
