import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Star, ArrowRight } from 'lucide-react';
import { getEventsByDate, Event } from '../data/eventsData';

interface DailyEventsSectionProps {
  onViewAllEvents: () => void;
}

const DailyEventsSection: React.FC<DailyEventsSectionProps> = ({ onViewAllEvents }) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [events, setEvents] = useState<Event[]>([]);
  const [weekDays, setWeekDays] = useState<Array<{ date: string; dayName: string; dayNumber: string }>>([]);

  useEffect(() => {
    // Generate next 7 days
    const days = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dateString = date.toISOString().split('T')[0];
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNumber = date.getDate().toString();
      
      days.push({
        date: dateString,
        dayName,
        dayNumber
      });
    }
    
    setWeekDays(days);
    
    // Set today as default selected date
    const todayString = today.toISOString().split('T')[0];
    setSelectedDate(todayString);
    setEvents(getEventsByDate(todayString));
  }, []);

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    const dayEvents = getEventsByDate(date);
    setEvents(dayEvents);
  };

  const formatPrice = (price: number) => {
    return price === 0 ? 'Free' : `$${price}`;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'speed-dating': 'bg-rose-500',
      'mixer': 'bg-purple-500',
      'workshop': 'bg-blue-500',
      'networking': 'bg-green-500',
      'social': 'bg-orange-500',
      'premium': 'bg-yellow-500'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500';
  };

  const getCategoryBadgeColor = (category: string) => {
    const colors = {
      'speed-dating': 'bg-rose-100 text-rose-800',
      'mixer': 'bg-purple-100 text-purple-800',
      'workshop': 'bg-blue-100 text-blue-800',
      'networking': 'bg-green-100 text-green-800',
      'social': 'bg-orange-100 text-orange-800',
      'premium': 'bg-yellow-100 text-yellow-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-brand-gradient-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Daily Events
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Find your perfect match at events happening every day
          </p>
        </div>

        {/* Day Selection */}
        <div className="mb-8">
          <div className="flex justify-center">
            <div className="flex space-x-2 sm:space-x-4 bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
              {weekDays.map((day) => (
                <button
                  key={day.date}
                  onClick={() => handleDateClick(day.date)}
                  className={`flex flex-col items-center px-3 sm:px-4 py-3 rounded-xl transition-all duration-200 ${
                    selectedDate === day.date
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className="text-sm font-medium">{day.dayName}</span>
                  <span className="text-lg font-bold">{day.dayNumber}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="mb-8">
          {events.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No events for this day</h3>
              <p className="text-gray-500">Check other days or view all events</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Event Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryBadgeColor(event.category)}`}>
                        {event.category.replace('-', ' ')}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                        {formatPrice(event.price)}
                      </span>
                    </div>
                    {event.featured && (
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold flex items-center">
                          <Star className="w-4 h-4 mr-1" />
                          Featured
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Event Details */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {event.description.length > 100 
                        ? `${event.description.substring(0, 100)}...` 
                        : event.description}
                    </p>

                    {/* Event Meta */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-sm">{event.time}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        <span className="text-sm">
                          {event.currentParticipants}/{event.maxParticipants} participants
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Spots filled</span>
                        <span>{Math.round((event.currentParticipants / event.maxParticipants) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getCategoryColor(event.category)}`}
                          style={{ width: `${(event.currentParticipants / event.maxParticipants) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-rose-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 active:scale-95">
                      Join Event
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* View All Events Button */}
        <div className="text-center">
          <button
            onClick={onViewAllEvents}
            className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
          >
            <span>View All Events</span>
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default DailyEventsSection;