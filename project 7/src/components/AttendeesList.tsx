
import { Users, MapPin, Clock, Video, MessageCircle, Heart, Filter, SortAsc } from 'lucide-react';
import { useState } from 'react';
interface Attendee {
  id: number;
  name: string;
  age: number;
  image: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  timezone: string;
  interests: string[];
  isOnline: boolean;
  joinedAt: string;
  verified: boolean;
}

interface AttendeesListProps {
  eventId: number;
  attendees: Attendee[];
  currentUserLocation?: {
    city: string;
    state: string;
    country: string;
    timezone: string;
  };
}

const mockAttendees: Attendee[] = [
  {
    id: 1,
    name: "Sarah",
    age: 28,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    location: { city: "New York", state: "NY", country: "United States" },
    timezone: "UTC-05:00 (Eastern)",
    interests: ["Travel", "Photography", "Yoga"],
    isOnline: true,
    joinedAt: "2024-03-15T10:30:00Z",
    verified: true
  },
  {
    id: 2,
    name: "Michael",
    age: 32,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    location: { city: "Los Angeles", state: "CA", country: "United States" },
    timezone: "UTC-08:00 (Pacific)",
    interests: ["Cooking", "Hiking", "Music"],
    isOnline: true,
    joinedAt: "2024-03-15T09:15:00Z",
    verified: true
  },
  {
    id: 3,
    name: "Emma",
    age: 26,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    location: { city: "London", state: "", country: "United Kingdom" },
    timezone: "UTC+00:00 (London)",
    interests: ["Art", "Reading", "Dancing"],
    isOnline: false,
    joinedAt: "2024-03-15T11:45:00Z",
    verified: true
  },
  {
    id: 4,
    name: "David",
    age: 35,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    location: { city: "Toronto", state: "ON", country: "Canada" },
    timezone: "UTC-05:00 (Eastern)",
    interests: ["Technology", "Sports", "Movies"],
    isOnline: true,
    joinedAt: "2024-03-15T08:20:00Z",
    verified: false
  },
  {
    id: 5,
    name: "Sophie",
    age: 29,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    location: { city: "Sydney", state: "NSW", country: "Australia" },
    timezone: "UTC+10:00 (Sydney)",
    interests: ["Fitness", "Beach", "Wine"],
    isOnline: true,
    joinedAt: "2024-03-15T12:00:00Z",
    verified: true
  }
];

export default function AttendeesList({ attendees = mockAttendees, currentUserLocation }: AttendeesListProps) {
  const [sortBy, setSortBy] = useState<'name' | 'age' | 'location' | 'timezone' | 'joinedAt'>('joinedAt');
  const [filterBy, setFilterBy] = useState<'all' | 'online' | 'verified' | 'sameTimezone' | 'sameCountry'>('all');
  const [showFilters, setShowFilters] = useState(false);

  const getTimezoneOffset = (timezone: string): number => {
    const match = timezone.match(/UTC([+-]\d{2}):(\d{2})/);
    if (!match) return 0;
    const hours = parseInt(match[1]);
    const minutes = parseInt(match[2]);
    return hours + (minutes / 60);
  };

  const sortedAndFilteredAttendees = attendees
    .filter(attendee => {
      switch (filterBy) {
        case 'online':
          return attendee.isOnline;
        case 'verified':
          return attendee.verified;
        case 'sameTimezone':
          return currentUserLocation ? attendee.timezone === currentUserLocation.timezone : true;
        case 'sameCountry':
          return currentUserLocation ? attendee.location.country === currentUserLocation.country : true;
        default:
          return true;
      }
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'age':
          return a.age - b.age;
        case 'location':
          return a.location.city.localeCompare(b.location.city);
        case 'timezone':
          return getTimezoneOffset(a.timezone) - getTimezoneOffset(b.timezone);
        case 'joinedAt':
          return new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime();
        default:
          return 0;
      }
    });

  const formatTimeAgo = (dateString: string): string => {
    const now = new Date();
    const joined = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - joined.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
          <Users className="h-6 w-6 text-pink-500" />
          <span>Event Attendees ({sortedAndFilteredAttendees.length})</span>
        </h3>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition-colors"
        >
          <Filter className="h-5 w-5" />
          <span>Filter & Sort</span>
        </button>
      </div>

      {showFilters && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <SortAsc className="inline h-4 w-4 mr-1" />
                Sort by
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="joinedAt">Recently Joined</option>
                <option value="name">Name (A-Z)</option>
                <option value="age">Age</option>
                <option value="location">Location</option>
                <option value="timezone">Timezone</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter className="inline h-4 w-4 mr-1" />
                Filter by
              </label>
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value as typeof filterBy)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="all">All Attendees</option>
                <option value="online">Online Now</option>
                <option value="verified">Verified Only</option>
                {currentUserLocation && (
                  <>
                    <option value="sameTimezone">Same Timezone</option>
                    <option value="sameCountry">Same Country</option>
                  </>
                )}
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedAndFilteredAttendees.map((attendee) => (
          <div key={attendee.id} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
            <div className="flex items-start space-x-3">
              <div className="relative">
                <img
                  src={attendee.image}
                  alt={attendee.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {attendee.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                )}
                {attendee.verified && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 border-2 border-white rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-900 truncate">
                    {attendee.name}, {attendee.age}
                  </h4>
                  <span className="text-xs text-gray-500">
                    {formatTimeAgo(attendee.joinedAt)}
                  </span>
                </div>
                
                <div className="flex items-center text-xs text-gray-600 mt-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span className="truncate">
                    {attendee.location.city}, {attendee.location.country}
                  </span>
                </div>
                
                <div className="flex items-center text-xs text-gray-600 mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  <span className="truncate">{attendee.timezone}</span>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-2">
                  {attendee.interests.slice(0, 2).map((interest, index) => (
                    <span key={index} className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-xs">
                      {interest}
                    </span>
                  ))}
                  {attendee.interests.length > 2 && (
                    <span className="text-xs text-gray-500">+{attendee.interests.length - 2}</span>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 mt-3">
                  <button className="flex-1 bg-pink-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-pink-600 transition-colors flex items-center justify-center space-x-1">
                    <Heart className="h-3 w-3" />
                    <span>Like</span>
                  </button>
                  
                  {attendee.isOnline && (
                    <button className="bg-blue-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-blue-600 transition-colors flex items-center space-x-1">
                      <Video className="h-3 w-3" />
                      <span>Video</span>
                    </button>
                  )}
                  
                  <button className="bg-gray-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-gray-600 transition-colors flex items-center space-x-1">
                    <MessageCircle className="h-3 w-3" />
                    <span>Chat</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedAndFilteredAttendees.length === 0 && (
        <div className="text-center py-8">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No attendees match your current filters.</p>
          <button
            onClick={() => setFilterBy('all')}
            className="text-pink-600 hover:underline mt-2"
          >
            Clear filters to see all attendees
          </button>
        </div>
      )}
    </div>
  );
}