import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar, Clock, MapPin, Users, Star, ArrowLeft, X } from 'lucide-react';
import { eventsData, Event, getEventCategories, searchEvents } from '../data/eventsData';

interface AllEventsPageProps {
  onBack: () => void;
}

const AllEventsPage: React.FC<AllEventsPageProps> = ({ onBack }) => {
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(eventsData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedDate, setSelectedDate] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [showFilters, setShowFilters] = useState(false);

  const categories = getEventCategories();
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: 'free', label: 'Free Events' },
    { value: 'low', label: 'Under $30' },
    { value: 'medium', label: '$30 - $60' },
    { value: 'high', label: '$60 - $100' },
    { value: 'premium', label: '$100+' }
  ];

  const sortOptions = [
    { value: 'date', label: 'Date' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'popularity', label: 'Popularity' },
    { value: 'name', label: 'Name A-Z' }
  ];

  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedCategory, selectedPriceRange, selectedDate, sortBy]);

  const applyFilters = () => {
    let filtered = [...eventsData];

    // Apply search filter
    if (searchQuery) {
      filtered = searchEvents(searchQuery);
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    // Apply price range filter
    if (selectedPriceRange !== 'all') {
      filtered = filtered.filter(event => {
        switch (selectedPriceRange) {
          case 'free':
            return event.price === 0;
          case 'low':
            return event.price > 0 && event.price < 30;
          case 'medium':
            return event.price >= 30 && event.price <= 60;
          case 'high':
            return event.price > 60 && event.price <= 100;
          case 'premium':
            return event.price > 100;
          default:
            return true;
        }
      });
    }

    // Apply date filter
    if (selectedDate !== 'all') {
      const today = new Date();
      const todayString = today.toISOString().split('T')[0];
      
      filtered = filtered.filter(event => {
        switch (selectedDate) {
          case 'today':
            return event.date === todayString;
          case 'tomorrow': {
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);
            return event.date === tomorrow.toISOString().split('T')[0];
          }
          case 'this_week':
            {
              const weekEnd = new Date(today);
              weekEnd.setDate(today.getDate() + 7);
              return event.date >= todayString && event.date <= weekEnd.toISOString().split('T')[0];
            }
          case 'this_month':
            {
              const monthEnd = new Date(today);
              monthEnd.setMonth(today.getMonth() + 1);
              return event.date >= todayString && event.date <= monthEnd.toISOString().split('T')[0];
            }
          default:
            return true;
        }
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'price_low':
          return a.price - b.price;
        case 'price_high':
          return b.price - a.price;
        case 'popularity':
          return b.currentParticipants - a.currentParticipants;
        case 'name':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredEvents(filtered);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedPriceRange('all');
    setSelectedDate('all');
    setSortBy('date');
    setFilteredEvents(eventsData);
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const activeFiltersCount = [
    searchQuery !== '',
    selectedCategory !== 'all',
    selectedPriceRange !== 'all',
    selectedDate !== 'all'
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-brand-gradient-soft">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  All Events
                </h1>
                <p className="text-gray-600 mt-1">
                  {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} found
                </p>
              </div>
            </div>
            
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center px-4 py-2 bg-rose-500 text-white rounded-lg"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="ml-2 bg-white text-rose-500 text-xs rounded-full px-2 py-1">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Filters</h3>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-rose-500 hover:text-rose-600 text-sm font-medium flex items-center"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Clear All
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Events
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                >
                  {priceRanges.map(range => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                >
                  <option value="all">All Dates</option>
                  <option value="today">Today</option>
                  <option value="tomorrow">Tomorrow</option>
                  <option value="this_week">This Week</option>
                  <option value="this_month">This Month</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Events Grid */}
          <div className="flex-1">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No events found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
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
                          <Calendar className="w-4 h-4 mr-2" />
                          <span className="text-sm">{formatDate(event.date)}</span>
                        </div>
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
        </div>
      </div>
    </div>
  );
};

export default AllEventsPage;