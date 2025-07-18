import React from 'react';
import { ArrowRight, Play, Video, Users, Heart } from 'lucide-react';

interface HeroProps {
  onJoinEvent: () => void;
}

export default function Hero({ onJoinEvent }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <video
          src="/5107299-uhd_3840_2160_25fps.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-900/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto animate-fadeInUp">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Meet Your Soulmate Through
          <span className="block text-brand-gradient">Video Speed Dating</span>
        </h1>
        
        <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed animate-fadeIn delay-150">
          Experience authentic connections through live video conversations. 
          Skip the endless texting and meet face-to-face in a safe, fun environment.
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2 card-smooth">
            <Video className="h-5 w-5 text-brandPink-300" />
            <span className="text-white font-medium">Live Video Dates</span>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2 card-smooth">
            <Users className="h-5 w-5 text-brandPink-300" />
            <span className="text-white font-medium">Safe Environment</span>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2 card-smooth">
            <Heart className="h-5 w-5 text-brandPink-300" />
            <span className="text-white font-medium">Real Connections</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onJoinEvent}
            className="bg-white text-slate-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center space-x-2 group"
          >
            <span>Start Video Dating Now</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="bg-transparent border-2 border-white text-white px-6 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-slate-700 transition-all duration-300 flex items-center space-x-2">
            <Play className="h-5 w-5" />
            <span>Watch How It Works</span>
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-white">25K+</div>
            <div className="text-white/80 mt-1">Video Dates</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-white">15K+</div>
            <div className="text-white/80 mt-1">Active Users</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-white">95%</div>
            <div className="text-white/80 mt-1">Match Rate</div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-sm animate-pulseSlow"></div>
      <div className="absolute bottom-32 right-16 w-16 h-16 bg-brandPink-300/20 rounded-full blur-sm animate-pulseSlow delay-75"></div>
      <div className="absolute top-1/2 right-8 w-12 h-12 bg-brandPurple-300/20 rounded-full blur-sm animate-pulseSlow delay-150"></div>
    </section>
  );
}