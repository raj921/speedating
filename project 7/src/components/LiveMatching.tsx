import React, { useState } from 'react';
import { Heart, X, Video, Star } from 'lucide-react';

const mockProfiles = [
  {
    id: 1,
    name: "Sarah",
    age: 28,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    interests: ["Travel", "Photography", "Yoga"],
    isOnline: true
  },
  {
    id: 2,
    name: "Michael",
    age: 32,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    interests: ["Cooking", "Hiking", "Music"],
    isOnline: true
  },
  {
    id: 3,
    name: "Emma",
    age: 26,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    interests: ["Art", "Reading", "Dancing"],
    isOnline: false
  }
];

export default function LiveMatching() {
  const [currentProfile, setCurrentProfile] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSwipe = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentProfile((prev) => (prev + 1) % mockProfiles.length);
      setIsAnimating(false);
    }, 300);
  };

  const profile = mockProfiles[currentProfile];

  return (
    <section className="py-20 bg-brand-gradient-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Start Matching Right Now
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See who's online and ready to video chat. Swipe to like or pass, and start a video date instantly when you match!
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className={`bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 ${isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
            {/* Profile Image */}
            <div className="relative">
              <img
                src={profile.image}
                alt={profile.name}
                className="w-full h-96 object-cover"
              />
              {profile.isOnline && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span>Online</span>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <h3 className="text-2xl font-bold text-white">{profile.name}, {profile.age}</h3>
              </div>
            </div>

            {/* Profile Info */}
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-6">
                {profile.interests.map((interest, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                    {interest}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => handleSwipe()}
                  className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
                >
                  <X className="h-8 w-8 text-gray-600" />
                </button>
                
                <button
                  onClick={() => handleSwipe()}
                  className="w-20 h-20 bg-gradient-to-r from-slate-600 to-gray-700 rounded-full flex items-center justify-center hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <Heart className="h-10 w-10 text-white fill-current" />
                </button>

                {profile.isOnline && (
                  <button className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200">
                    <Video className="h-8 w-8 text-white" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-slate-600">127</div>
              <div className="text-sm text-gray-600">Online Now</div>
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-slate-600">89%</div>
              <div className="text-sm text-gray-600">Match Rate</div>
            </div>
            <div className="bg-rose-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-rose-600">4.9</div>
              <div className="text-sm text-gray-600 flex items-center justify-center">
                <Star className="h-3 w-3 text-rose-500 fill-current mr-1" />
                Rating
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}