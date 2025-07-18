import  { useState, useMemo } from 'react';
import { ArrowLeft, Calendar, Search, Filter, Heart, Grid, List } from 'lucide-react';
import { eventsData } from '../data/eventsData';
import { useNavigate } from 'react-router-dom';

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

export default function AllEventsGallery() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [selectedDay, setSelectedDay] = useState('All');
  const [sortBy, setSortBy] = useState<'date' | 'price' | 'popularity'>('date');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'large'>('large');
  const navigate = useNavigate();

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

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-brand-gradient-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBack}
            className="flex items-center text-purple-700 hover:text-purple-900 font-semibold transition-colors text-lg"
          >
            <ArrowLeft className="h-6 w-6 mr-2" />
            Back to Events
          </button>
          
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-purple-900 mb-2">
              All Events Gallery
            </h1>
            <p className="text-xl text-gray-600">
              {filteredAndSortedEvents.length} of {eventsData.length} events
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-white rounded-full p-1 shadow-lg">
            <button
              onClick={() => setViewMode('large')}
              className={`p-2 rounded-full transition-all ${
                viewMode === 'large' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <List className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-full transition-all ${
                viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Grid className="h-5 w-5" />
            </button>
          </div>
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
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center text-purple-700 hover:text-purple-900 font-semibold text-lg"
            >
              <Filter className="h-5 w-5 mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            
            {(selectedCategory !== 'All' || selectedPriceRange !== 'All' || selectedDay !== 'All' || searchTerm) && (
              <button
                onClick={clearFilters}
                className="text-gray-600 hover:text-gray-800 font-medium text-lg"
              >
                Clear All Filters
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

              {/* Category & Price filters removed per design update */}

              {/* Sort filter removed */}
            </div>
          )}
        </div>

        {/* Events Gallery - Complete Images No Text Cropping */}
        {filteredAndSortedEvents.length > 0 ? (
          <div className={`gap-8 ${
            viewMode === 'large' 
              ? 'grid grid-cols-1 md:grid-cols-2' 
              : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {filteredAndSortedEvents.map((event) => {
              const eventDay = getDayOfWeek(event.date);
              const isToday = eventDay === currentDay;
              
              return (
                <div
                  key={event.id}
                  className={`group relative rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 cursor-pointer overflow-hidden bg-white ${
                    isToday ? 'ring-4 ring-green-400' : ''
                  }`}
                >
                  {/* Complete Image Container - No Text Cropping */}
                  <div className={`relative w-full flex items-center justify-center bg-gray-50 rounded-3xl ${
                    viewMode === 'large' ? 'h-[600px] md:h-[500px]' : 'h-[400px]'
                  }`}>
                    <img
                      src={event.image}
                      alt={event.title}
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Lightning Speed Date Match Presents */}
                    <div className="absolute top-6 left-6 right-6 flex items-center justify-center opacity-95 z-10">
                      <div className="flex items-center bg-black/70 backdrop-blur-md rounded-full px-6 py-3 shadow-lg">
                        <Heart className="h-5 w-5 mr-3 text-white" />
                        <span className="text-sm md:text-base font-bold text-white">LIGHTNING SPEED DATE MATCH PRESENTS</span>
                        {isToday && (
                          <span className="ml-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                            TODAY
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <Calendar className="h-20 w-20 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-600 mb-4">
              No events found
            </h3>
            <p className="text-lg text-gray-500 mb-8">
              Try adjusting your filters to find more events
            </p>
            <button
              onClick={clearFilters}
              className="bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-lg"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}