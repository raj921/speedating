import React, { useState, useEffect } from 'react';
import { Calendar, Heart } from 'lucide-react';
import { eventsData } from '../data/eventsData';
import { useNavigate } from 'react-router-dom';

const daysOfWeek = ["All", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Function to get day of week from date string
const getDayOfWeek = (dateString: string): string => {
  const date = new Date(dateString);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[date.getDay()];
};

// Function to get current day
const getCurrentDay = (): string => {
  const today = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[today.getDay()];
};

export default function TodaysEvents() {
  const [selectedDay, setSelectedDay] = useState<string>("All");
  const [currentDay] = useState<string>(getCurrentDay());
  const navigate = useNavigate();

  // Set initial filter to current day
  useEffect(() => {
    setSelectedDay(currentDay);
  }, [currentDay]);

  // Convert events data with day information
  const adaptedEvents = eventsData.map((event) => ({
    ...event,
    id: parseInt(event.id),
    day: getDayOfWeek(event.date),
  }));

  // Filter events based on selected day
  const filteredEvents = selectedDay === "All" 
    ? adaptedEvents 
    : adaptedEvents.filter(event => event.day === selectedDay);

  const displayEvents = filteredEvents;

  const handleViewAllEvents = () => {
    navigate('/all-events');
  };

  return (
    <section id="events" className="py-20 bg-brand-gradient-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Calendar className="h-4 w-4 mr-2" />
            Today is {currentDay}
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-purple-900 mb-6">
            Events
          </h2>
        </div>

        {/* Day Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {daysOfWeek.map(day => {
            const dayEvents = day === "All" ? adaptedEvents : adaptedEvents.filter(event => event.day === day);
            const isToday = day === currentDay;
            
            return (
              <button
                key={day}
                className={`relative px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 border-2 ${
                  selectedDay === day 
                    ? 'bg-purple-700 text-white border-purple-700 shadow-lg scale-105' 
                    : 'bg-white text-purple-700 border-purple-200 hover:bg-purple-50 hover:border-purple-300'
                }`}
                onClick={() => setSelectedDay(day)}
              >
                <span className="flex items-center">
                  {day}
                  {isToday && (
                    <span className="ml-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  )}
                </span>
                {dayEvents.length > 0 && (
                  <span className={`absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                    selectedDay === day ? 'bg-pink-500 text-white' : 'bg-purple-600 text-white'
                  }`}>
                    {dayEvents.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Events Grid - Complete Images No Cropping */}
        {displayEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {displayEvents.map((event) => (
              <div
                key={event.id}
                className="group relative rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 cursor-pointer overflow-hidden bg-white"
              >
                {/* Complete Image Container - No Text Cropping */}
                <div className="relative w-full h-[500px] md:h-[400px] lg:h-[500px] flex items-center justify-center bg-gray-50 rounded-3xl">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  
                  {/* Lightning Speed Date Match Presents */}
                  <div className="absolute top-6 left-6 right-6 flex items-center justify-center opacity-95 z-10">
                    <div className="flex items-center bg-black/70 backdrop-blur-md rounded-full px-6 py-3 shadow-lg">
                      <Heart className="h-5 w-5 mr-3 text-white" />
                      <span className="text-sm md:text-base font-bold text-white">LIGHTNING SPEED DATE MATCH PRESENTS</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No events for {selectedDay}
            </h3>
            <button
              onClick={() => setSelectedDay("All")}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              View All Events
            </button>
          </div>
        )}

        {/* View All Events Button */}
        {displayEvents.length > 0 && (
          <div className="text-center">
            <button
              onClick={handleViewAllEvents}
              className="bg-gradient-to-r from-purple-700 to-pink-600 text-white px-12 py-5 rounded-full font-bold text-xl shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 transform"
            >
              View All Events Gallery
            </button>
          </div>
        )}
      </div>
    </section>
  );
}