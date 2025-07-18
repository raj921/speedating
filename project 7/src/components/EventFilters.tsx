
import { Filter,  Clock,  Search, X } from 'lucide-react';

interface FilterOptions {
  searchTerm: string;
  ageRange: [number, number];
  location: {
    country: string;
    state: string;
    city: string;
  };
  timezone: string;
  eventType: string;
  priceRange: [number, number];
  dateRange: {
    start: string;
    end: string;
  };
}

interface EventFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onClearFilters: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

const timezones = [
  'UTC-12:00 (Baker Island)',
  'UTC-11:00 (Hawaii)',
  'UTC-10:00 (Alaska)',
  'UTC-09:00 (Pacific)',
  'UTC-08:00 (Mountain)',
  'UTC-07:00 (Central)',
  'UTC-06:00 (Eastern)',
  'UTC-05:00 (Atlantic)',
  'UTC-04:00 (Brazil)',
  'UTC-03:00 (Argentina)',
  'UTC-02:00 (Mid-Atlantic)',
  'UTC-01:00 (Azores)',
  'UTC+00:00 (London)',
  'UTC+01:00 (Paris)',
  'UTC+02:00 (Cairo)',
  'UTC+03:00 (Moscow)',
  'UTC+04:00 (Dubai)',
  'UTC+05:00 (Pakistan)',
  'UTC+06:00 (Bangladesh)',
  'UTC+07:00 (Bangkok)',
  'UTC+08:00 (Singapore)',
  'UTC+09:00 (Tokyo)',
  'UTC+10:00 (Sydney)',
  'UTC+11:00 (Solomon Islands)',
  'UTC+12:00 (New Zealand)'
];

const countries = [
  'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 
  'France', 'Spain', 'Italy', 'Netherlands', 'Sweden', 'Norway', 'Denmark',
  'Japan', 'South Korea', 'Singapore', 'India', 'Brazil', 'Mexico'
];

const usStates = [
  'California', 'New York', 'Texas', 'Florida', 'Illinois', 'Pennsylvania',
  'Ohio', 'Georgia', 'North Carolina', 'Michigan', 'New Jersey', 'Virginia',
  'Washington', 'Arizona', 'Massachusetts', 'Tennessee', 'Indiana', 'Missouri'
];

export default function EventFilters({ filters, onFiltersChange, onClearFilters, isOpen, onToggle }: EventFiltersProps) {
  const updateFilter = <K extends keyof FilterOptions>(key: K, value: FilterOptions[K]) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const updateLocationFilter = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      location: {
        ...filters.location,
        [key]: value
      }
    });
  };

  const updateDateRange = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [key]: value
      }
    });
  };

  if (!isOpen) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggle}
              className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition-colors"
            >
              <Filter className="h-5 w-5" />
              <span className="font-medium">Filters</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={filters.searchTerm}
                onChange={(e) => updateFilter('searchTerm', e.target.value)}
                className="border-0 focus:ring-0 focus:outline-none text-sm"
              />
            </div>
          </div>
          
          {(filters.searchTerm || filters.location.country || filters.timezone) && (
            <button
              onClick={onClearFilters}
              className="text-sm text-gray-500 hover:text-pink-600 transition-colors"
            >
              Clear all
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <Filter className="h-5 w-5" />
          <span>Filter Events</span>
        </h3>
        <button
          onClick={onToggle}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Events
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Event name, theme..."
              value={filters.searchTerm}
              onChange={(e) => updateFilter('searchTerm', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Age Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age Range
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.ageRange[0]}
              onChange={(e) => updateFilter('ageRange', [parseInt(e.target.value) || 18, filters.ageRange[1]])}
              className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              min="18"
              max="80"
            />
            <span className="text-gray-500">to</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.ageRange[1]}
              onChange={(e) => updateFilter('ageRange', [filters.ageRange[0], parseInt(e.target.value) || 80])}
              className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              min="18"
              max="80"
            />
          </div>
        </div>

        {/* Event Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Type
          </label>
          <select
            value={filters.eventType}
            onChange={(e) => updateFilter('eventType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            <option value="video">Video Dating</option>
            <option value="global">Global Events</option>
            <option value="themed">Themed Events</option>
            <option value="professional">Professional</option>
            <option value="casual">Casual Mixer</option>
          </select>
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <select
            value={filters.location.country}
            onChange={(e) => updateLocationFilter('country', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="">All Countries</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        {/* State (if US selected) */}
        {filters.location.country === 'United States' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State
            </label>
            <select
              value={filters.location.state}
              onChange={(e) => updateLocationFilter('state', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="">All States</option>
              {usStates.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
        )}

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City
          </label>
          <input
            type="text"
            placeholder="Enter city name"
            value={filters.location.city}
            onChange={(e) => updateLocationFilter('city', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>

        {/* Timezone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Clock className="inline h-4 w-4 mr-1" />
            Timezone
          </label>
          <select
            value={filters.timezone}
            onChange={(e) => updateFilter('timezone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="">All Timezones</option>
            {timezones.map(timezone => (
              <option key={timezone} value={timezone}>{timezone}</option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range ($)
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.priceRange[0]}
              onChange={(e) => updateFilter('priceRange', [parseInt(e.target.value) || 0, filters.priceRange[1]])}
              className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              min="0"
            />
            <span className="text-gray-500">to</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.priceRange[1]}
              onChange={(e) => updateFilter('priceRange', [filters.priceRange[0], parseInt(e.target.value) || 100])}
              className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              min="0"
            />
          </div>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Range
          </label>
          <div className="space-y-2">
            <input
              type="date"
              value={filters.dateRange.start}
              onChange={(e) => updateDateRange('start', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
            <input
              type="date"
              value={filters.dateRange.end}
              onChange={(e) => updateDateRange('end', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
        <button
          onClick={onClearFilters}
          className="text-gray-600 hover:text-pink-600 transition-colors font-medium"
        >
          Clear All Filters
        </button>
        
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-500">
            {/* This would show filtered results count */}
            Showing filtered results
          </span>
          <button
            onClick={onToggle}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}