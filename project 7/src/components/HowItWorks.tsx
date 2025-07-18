
import { UserPlus, Heart, Video, Play } from 'lucide-react';

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create Your Profile",
    description: "Sign up in 30 seconds, add your photos, and set your dating preferences to find compatible matches."
  },
  {
    number: "02",
    icon: Video,
    title: "Join Video Speed Dating",
    description: "Enter a live video room and have 3-minute face-to-face conversations with potential matches."
  },
  {
    number: "03",
    icon: Heart,
    title: "Match & Continue",
    description: "If you both like each other, instantly match and continue your conversation in a private chat!"
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-brand-gradient-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From profile to perfect match in three simple steps. Start your video dating journey today.
          </p>
        </div>

        {/* Demo Video Section */}
        <div className="text-center mb-16">
          <div className="relative max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-slate-600 to-gray-700 rounded-2xl p-1">
              <div className="bg-gray-900 rounded-xl aspect-video flex items-center justify-center">
                <button className="bg-white/20 backdrop-blur-sm rounded-full p-6 hover:bg-white/30 transition-all duration-300 group">
                  <Play className="h-12 w-12 text-white group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
            <p className="text-gray-600 mt-4">Watch a 2-minute demo of how video speed dating works</p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-20 left-1/2 w-full h-0.5 bg-gradient-to-r from-pink-300 to-purple-300 transform translate-x-1/2"></div>
              )}
              
              {/* Step Content */}
              <div className="relative">
                <div className="mx-auto w-20 h-20 bg-gradient-to-r from-slate-600 to-gray-700 rounded-full flex items-center justify-center mb-6 relative z-10">
                  <step.icon className="h-10 w-10 text-white" />
                </div>
                
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-rose-400 rounded-full flex items-center justify-center text-sm font-bold text-white z-20">
                  {step.number}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-slate-600 to-gray-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
            Start Video Dating Now
          </button>
        </div>
      </div>
    </section>
  );
}