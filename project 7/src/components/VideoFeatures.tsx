
import { Video, Shield, Clock, Heart, Users, Zap } from 'lucide-react';

const features = [
  {
    icon: Video,
    title: "HD Video Calls",
    description: "Crystal clear video quality for authentic face-to-face conversations"
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "Verified profiles and moderated environment for your safety"
  },
  {
    icon: Clock,
    title: "3-Minute Dates",
    description: "Perfect timing to spark interest without pressure"
  },
  {
    icon: Heart,
    title: "Smart Matching",
    description: "AI-powered compatibility matching based on your preferences"
  },
  {
    icon: Users,
    title: "Group Events",
    description: "Join themed video dating events with like-minded singles"
  },
  {
    icon: Zap,
    title: "Instant Connections",
    description: "Match immediately and continue chatting if you both swipe right"
  }
];

export default function VideoFeatures() {
  return (
    <section className="py-20 bg-brand-gradient-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Video Speed Dating?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of online dating with real-time video conversations that create genuine connections
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-slate-600 to-gray-700 rounded-2xl flex items-center justify-center mb-6">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}