import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah & Mike",
    age: "Met through video dating",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    text: "We had our first video date during lockdown and instantly clicked! Two years later, we're married. Video dating felt so natural and authentic - like meeting in person but safer.",
    rating: 5
  },
  {
    id: 2,
    name: "Jessica & David",
    age: "Long-distance video dating success",
    image: "https://images.unsplash.com/photo-1521577352947-9bb58764b69a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    text: "Living in different cities, we never would have met without video dating. The 3-minute format was perfect to break the ice, and we've been together for 18 months now!",
    rating: 5
  },
  {
    id: 3,
    name: "Amanda & Ryan",
    age: "Matched on first video event",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    text: "I was nervous about video dating, but the platform made it so easy and fun. We matched on my very first event and have been inseparable ever since!",
    rating: 5
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-20 bg-brand-gradient-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Love Stories That Started Here
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real couples, real stories, real happiness. See how VideoMatch has brought thousands of people together.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
            <div className="flex items-center justify-center mb-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-rose-400 fill-current" />
              ))}
            </div>

            <blockquote className="text-xl sm:text-2xl text-gray-700 text-center mb-8 leading-relaxed">
              "{testimonials[currentIndex].text}"
            </blockquote>

            <div className="flex items-center justify-center space-x-4">
              <img
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="text-center">
                <div className="font-bold text-gray-900 text-lg">
                  {testimonials[currentIndex].name}
                </div>
                <div className="text-gray-600">
                  {testimonials[currentIndex].age}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentIndex ? 'bg-slate-500' : 'bg-gray-300'
              }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}