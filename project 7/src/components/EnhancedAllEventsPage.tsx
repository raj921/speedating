import React, { useState, useMemo } from 'react';
import { ArrowLeft, Calendar, Search, Filter, Heart } from 'lucide-react';
import { eventsData } from '../data/eventsData';

interface EnhancedAllEventsPageProps {
  onBack: () => void;
}

// Category & price arrays removed per simplified filter design
const daysOfWeek = ['All', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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

export default function EnhancedAllEventsPage({ onBack }: EnhancedAllEventsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [selectedDay, setSelectedDay] = useState('All');
  const [sortBy, setSortBy] = useState<'date' | 'price' | 'popularity'>('date');
  const [showFilters, setShowFilters] = useState(false);

  const currentDay = getCurrentDay();

  // Filter and sort events
  const filteredAndSortedEvents = useMemo(() => {
    const filtered = eventsData.filter(event => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        event.title.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;

      // Price filter
      const matchesPrice = selectedPriceRange === 'All' || 
        (selectedPriceRange === 'Free' && event.price === 0) ||
        (selectedPriceRange === '$1-$30' && event.price > 0 && event.price <= 30) ||
        (selectedPriceRange === '$31-$60' && event.price > 30 && event.price <= 60) ||
        (selectedPriceRange === '$61-$100' && event.price > 60 && event.price <= 100) ||
        (selectedPriceRange === '$100+' && event.price > 100);

      // Day filter
      const eventDay = getDayOfWeek(event.date);
      const matchesDay = selectedDay === 'All' || eventDay === selectedDay;

      return matchesSearch && matchesCategory && matchesPrice && matchesDay;
    });

    // Sort events
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'price':
          return a.price - b.price;
        case 'popularity':
          return b.currentParticipants - a.currentParticipants;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, selectedPriceRange, selectedDay, sortBy]);

  // Get events by day for quick stats
  const eventsByDay = useMemo(() => {
    const stats: { [key: string]: number } = {};
    daysOfWeek.slice(1).forEach(day => {
      stats[day] = eventsData.filter(event => getDayOfWeek(event.date) === day).length;
    });
    return stats;
  }, []);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedPriceRange('All');
    setSelectedDay('All');
    setSortBy('date');
  };

  return (
    <div className="min-h-screen bg-brand-gradient-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-purple-700 hover:text-purple-900 font-semibold transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Events
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-purple-900 mb-2">
              All Events
            </h1>
            <p className="text-gray-600">
              {filteredAndSortedEvents.length} events found
            </p>
          </div>

          <div className="w-24"></div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center text-purple-700 hover:text-purple-900 font-semibold"
            >
              <Filter className="h-5 w-5 mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            
            {(selectedCategory !== 'All' || selectedPriceRange !== 'All' || selectedDay !== 'All' || searchTerm) && (
              <button
                onClick={clearFilters}
                className="text-gray-600 hover:text-gray-800 font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Day Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Day</label>
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  {daysOfWeek.map(day => (
                    <option key={day} value={day}>
                      {day} {day !== 'All' && eventsByDay[day] ? `(${eventsByDay[day]})` : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category & Price filters removed */}

              {/* Sort filter removed */}
            </div>
          )}
        </div>

        {/* Events Grid - Large Images */}
        {filteredAndSortedEvents.length > 0 ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedEvents.map((event) => {
              const eventDay = getDayOfWeek(event.date);
              const isToday = eventDay === currentDay;
              
              return (
                <div
                  key={event.id}
                  className={`group rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden transform hover:-translate-y-3 hover:scale-105 cursor-pointer ${
                    isToday ? 'ring-4 ring-green-400' : ''
                  }`}
                >
                  {/* Large Event Image */}
                  <div className="relative h-96 md:h-80 lg:h-96 overflow-hidden rounded-3xl">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Minimal Top Badge */}
                    <div className="absolute top-6 left-6 right-6 flex items-center justify-between opacity-90">
                      <div className="flex items-center bg-black/40 backdrop-blur-sm rounded-full px-4 py-2">
                        <Heart className="h-4 w-4 mr-2 text-white" />
                        <span className="text-sm font-bold text-white">VIDEO MATCH</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {isToday && (
                          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                            TODAY
                          </span>
                        )}
                        <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                          event.featured ? 'bg-red-500 text-white' :
                          event.category === 'premium' ? 'bg-yellow-400 text-black' :
                          'bg-green-500 text-white'
                        }`}>
                          {event.featured ? 'Popular' : event.category === 'premium' ? 'Premium' : 'New'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No events found
            </h3>
            <button
              onClick={clearFilters}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}