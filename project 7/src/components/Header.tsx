import React, { useState } from 'react';
import { Menu, X, User } from 'lucide-react';
import logoImage from '../../asset/WhatsApp Image 2025-06-26 at 22.00.39.jpeg';

interface HeaderProps {
  onAuthClick: () => void;
}

export default function Header({ onAuthClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-sm fixed w-full top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
              <img 
                src={logoImage} 
                alt="Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-2xl font-bold text-brand-gradient">
              SpeedConnect
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#events" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
              Events
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
              How It Works
            </a>
            <a href="#about" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
              About
            </a>
            <a href="#faq" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
              FAQ
            </a>
            <button
              onClick={onAuthClick}
              className="bg-gradient-to-r from-slate-600 to-gray-700 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium flex items-center space-x-2"
            >
              <User className="h-4 w-4" />
              <span>Sign In</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <a href="#events" className="text-gray-700 hover:text-slate-600 transition-colors font-medium">
                Events
              </a>
              <a href="#how-it-works" className="text-gray-700 hover:text-slate-600 transition-colors font-medium">
                How It Works
              </a>
              <a href="#about" className="text-gray-700 hover:text-slate-600 transition-colors font-medium">
                About
              </a>
              <a href="#faq" className="text-gray-700 hover:text-slate-600 transition-colors font-medium">
                FAQ
              </a>
              <button
                onClick={onAuthClick}
                className="bg-gradient-to-r from-slate-600 to-gray-700 text-white px-6 py-2 rounded-full font-medium flex items-center justify-center space-x-2 w-full"
              >
                <User className="h-4 w-4" />
                <span>Sign In</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}