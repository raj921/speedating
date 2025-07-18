import React, { useState, useEffect } from 'react';
import { VideoOff, MicOff, Users, Clock, Heart, X, Settings, Search, CheckCircle } from 'lucide-react';

interface Participant {
  id: number;
  name: string;
  age: number;
  image: string;
  isCurrentMatch: boolean;
  hasCamera: boolean;
  hasMicrophone: boolean;
  location: string;
  timezone: string;
}

interface LiveEventRoomProps {
  eventId: number;
  onLeaveRoom: () => void;
}

const mockParticipants: Participant[] = [
  {
    id: 1,
    name: "Sarah",
    age: 28,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    isCurrentMatch: true,
    hasCamera: true,
    hasMicrophone: true,
    location: "New York, NY",
    timezone: "UTC-05:00"
  },
  {
    id: 2,
    name: "Michael",
    age: 32,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    isCurrentMatch: false,
    hasCamera: true,
    hasMicrophone: false,
    location: "Los Angeles, CA",
    timezone: "UTC-08:00"
  }
];

// Add mock attendee data for sidebar (expand as needed)
const mockAttendees = [
  {
    id: 1,
    name: "Sarah",
    age: 28,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    location: "New York, NY",
    timezone: "UTC-05:00",
    state: "NY",
    city: "New York",
    online: true,
    verified: true,
    joinedAt: "2024-07-01T10:00:00Z"
  },
  {
    id: 2,
    name: "Michael",
    age: 32,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    location: "Los Angeles, CA",
    timezone: "UTC-08:00",
    state: "CA",
    city: "Los Angeles",
    online: false,
    verified: true,
    joinedAt: "2024-07-01T09:00:00Z"
  },
  {
    id: 3,
    name: "Emma",
    age: 26,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    location: "London, UK",
    timezone: "UTC+00:00",
    state: "",
    city: "London",
    online: true,
    verified: false,
    joinedAt: "2024-07-01T11:00:00Z"
  }
];

export default function LiveEventRoom({ onLeaveRoom }: LiveEventRoomProps) {
  const [timeRemaining, setTimeRemaining] = useState(180); // 3 minutes in seconds
  const [currentParticipant, setCurrentParticipant] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [liked, setLiked] = useState(false);

  // Attendee sidebar/filter state
  const [attendeeSearch, setAttendeeSearch] = useState("");
  const [filterTimezone, setFilterTimezone] = useState("");
  const [filterState, setFilterState] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [filterAge, setFilterAge] = useState<[number, number]>([18, 80]);
  const [sortBy, setSortBy] = useState("recent");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          // Move to next participant
          setCurrentParticipant(curr => (curr + 1) % mockParticipants.length);
          setLiked(false);
          return 180; // Reset to 3 minutes
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Filtering and sorting logic
  const filteredAttendees = mockAttendees
    .filter(a =>
      (!attendeeSearch || a.name.toLowerCase().includes(attendeeSearch.toLowerCase())) &&
      (!filterTimezone || a.timezone === filterTimezone) &&
      (!filterState || a.state === filterState) &&
      (!filterCity || a.city === filterCity) &&
      (a.age >= filterAge[0] && a.age <= filterAge[1])
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "timezone") return a.timezone.localeCompare(b.timezone);
      if (sortBy === "state") return a.state.localeCompare(b.state);
      if (sortBy === "city") return a.city.localeCompare(b.city);
      // Default: most recently joined first
      return new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime();
    });

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const participant = mockParticipants[currentParticipant];

  const handleLike = () => {
    setLiked(true);
    // In a real app, this would send the like to the server
  };

  const handlePass = () => {
    // Move to next participant immediately
    setCurrentParticipant(curr => (curr + 1) % mockParticipants.length);
    setTimeRemaining(180);
    setLiked(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-white" />
            <span className="text-white font-medium">Speed Dating Event</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/20 rounded-full px-3 py-1">
            <Clock className="h-4 w-4 text-white" />
            <span className="text-white font-mono">{formatTime(timeRemaining)}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
          >
            <Settings className="h-5 w-5 text-white" />
          </button>
          <button
            onClick={onLeaveRoom}
            className="p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>

      {/* Main Video Area + Attendee Sidebar */}
      <div className="flex-1 flex relative">
        {/* Partner's Video */}
        <div className="flex-1 relative bg-gray-800">
          <img
            src={participant.image}
            alt={participant.name}
            className="w-full h-full object-cover"
          />
          
          {/* Partner Info Overlay */}
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg p-3">
            <h3 className="text-white font-semibold">{participant.name}, {participant.age}</h3>
            <p className="text-white/80 text-sm">{participant.location}</p>
            <p className="text-white/60 text-xs">{participant.timezone}</p>
          </div>

          {/* Partner's Audio/Video Status */}
          <div className="absolute top-4 right-4 flex space-x-2">
            {!participant.hasCamera && (
              <div className="bg-red-500 rounded-full p-2">
                <VideoOff className="h-4 w-4 text-white" />
              </div>
            )}
            {!participant.hasMicrophone && (
              <div className="bg-red-500 rounded-full p-2">
                <MicOff className="h-4 w-4 text-white" />
              </div>
            )}
          </div>

          {/* Match Notification */}
          {liked && (
            <div className="absolute inset-0 bg-pink-500/20 flex items-center justify-center">
              <div className="bg-white rounded-2xl p-6 text-center">
                <Heart className="h-12 w-12 text-pink-500 mx-auto mb-4 fill-current" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">You liked {participant.name}!</h3>
                <p className="text-gray-600">If they like you back, you'll match!</p>
              </div>
            </div>
          )}
        </div>
        {/* Attendee Sidebar (desktop) or slide-up (mobile) */}
        <div className={`hidden lg:block w-96 bg-white/90 border-l border-gray-200 h-full sticky top-0 z-30 transition-transform duration-300 ${sidebarOpen ? '' : ''}`}>
          <div className="sticky top-0 bg-white/95 z-40 p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-lg text-purple-900">Attendees</h3>
            <button className="lg:hidden" onClick={() => setSidebarOpen(false)}><X className="h-5 w-5" /></button>
          </div>
          {/* Filter/Sort/Search Bar */}
          <div className="sticky top-16 z-30 bg-white/95 p-4 border-b border-gray-100 space-y-3">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search attendees..."
                value={attendeeSearch}
                onChange={e => setAttendeeSearch(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <select value={filterTimezone} onChange={e => setFilterTimezone(e.target.value)} className="border border-gray-300 rounded px-2 py-1 text-xs">
                <option value="">All Timezones</option>
                <option value="UTC-05:00">UTC-05:00</option>
                <option value="UTC-08:00">UTC-08:00</option>
                <option value="UTC+00:00">UTC+00:00</option>
              </select>
              <select value={filterState} onChange={e => setFilterState(e.target.value)} className="border border-gray-300 rounded px-2 py-1 text-xs">
                <option value="">All States</option>
                <option value="NY">NY</option>
                <option value="CA">CA</option>
              </select>
              <select value={filterCity} onChange={e => setFilterCity(e.target.value)} className="border border-gray-300 rounded px-2 py-1 text-xs">
                <option value="">All Cities</option>
                <option value="New York">New York</option>
                <option value="Los Angeles">Los Angeles</option>
                <option value="London">London</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600">Age:</span>
              <input
                type="number"
                min={18}
                max={80}
                value={filterAge[0]}
                onChange={e => setFilterAge([Number(e.target.value), filterAge[1]])}
                className="w-14 border border-gray-300 rounded px-2 py-1 text-xs"
              />
              <span className="text-xs text-gray-600">to</span>
              <input
                type="number"
                min={18}
                max={80}
                value={filterAge[1]}
                onChange={e => setFilterAge([filterAge[0], Number(e.target.value)])}
                className="w-14 border border-gray-300 rounded px-2 py-1 text-xs"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600">Sort by:</span>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="border border-gray-300 rounded px-2 py-1 text-xs">
                <option value="recent">Recently Joined</option>
                <option value="name">Name</option>
                <option value="timezone">Timezone</option>
                <option value="state">State</option>
                <option value="city">City</option>
              </select>
            </div>
          </div>
          {/* Attendee List */}
          <div className="overflow-y-auto p-4 space-y-3" style={{ maxHeight: 'calc(100vh - 160px)' }}>
            {filteredAttendees.length === 0 ? (
              <div className="text-center text-gray-400 py-12">
                <Users className="h-8 w-8 mx-auto mb-2" />
                <div>No attendees match your filters.</div>
              </div>
            ) : (
              filteredAttendees.map(a => (
                <div key={a.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-purple-50 transition-colors">
                  <img src={a.image} alt={a.name} className="w-10 h-10 rounded-full border-2 border-purple-200 object-cover" />
                  <div className="flex-1">
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-sm text-gray-900">{a.name}</span>
                      {a.verified && <CheckCircle className="h-4 w-4 text-green-500" />}
                      {a.online && <span className="ml-1 bg-green-200 text-green-800 text-xs px-2 py-0.5 rounded-full">Online</span>}
                    </div>
                    <div className="text-xs text-gray-500">{a.city}{a.state ? `, ${a.state}` : ''} • {a.timezone}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        {/* Mobile sidebar toggle button */}
        <button
          className="fixed bottom-6 right-6 z-50 lg:hidden bg-purple-700 text-white rounded-full p-4 shadow-lg hover:bg-purple-800 transition-all"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Users className="h-6 w-6" />
          <span className="ml-2 font-semibold">Attendees</span>
        </button>
        {/* Mobile sidebar drawer */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-end lg:hidden" onClick={() => setSidebarOpen(false)}>
            <div className="w-full bg-white rounded-t-2xl shadow-lg p-4 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-purple-900">Attendees</h3>
                <button onClick={() => setSidebarOpen(false)}><X className="h-5 w-5" /></button>
              </div>
              {/* Filter/Sort/Search Bar (mobile) */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search attendees..."
                    value={attendeeSearch}
                    onChange={e => setAttendeeSearch(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-2">
                  <select value={filterTimezone} onChange={e => setFilterTimezone(e.target.value)} className="border border-gray-300 rounded px-2 py-1 text-xs">
                    <option value="">All Timezones</option>
                    <option value="UTC-05:00">UTC-05:00</option>
                    <option value="UTC-08:00">UTC-08:00</option>
                    <option value="UTC+00:00">UTC+00:00</option>
                  </select>
                  <select value={filterState} onChange={e => setFilterState(e.target.value)} className="border border-gray-300 rounded px-2 py-1 text-xs">
                    <option value="">All States</option>
                    <option value="NY">NY</option>
                    <option value="CA">CA</option>
                  </select>
                  <select value={filterCity} onChange={e => setFilterCity(e.target.value)} className="border border-gray-300 rounded px-2 py-1 text-xs">
                    <option value="">All Cities</option>
                    <option value="New York">New York</option>
                    <option value="Los Angeles">Los Angeles</option>
                    <option value="London">London</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600">Age:</span>
                  <input
                    type="number"
                    min={18}
                    max={80}
                    value={filterAge[0]}
                    onChange={e => setFilterAge([Number(e.target.value), filterAge[1]])}
                    className="w-14 border border-gray-300 rounded px-2 py-1 text-xs"
                  />
                  <span className="text-xs text-gray-600">to</span>
                  <input
                    type="number"
                    min={18}
                    max={80}
                    value={filterAge[1]}
                    onChange={e => setFilterAge([filterAge[0], Number(e.target.value)])}
                    className="w-14 border border-gray-300 rounded px-2 py-1 text-xs"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600">Sort by:</span>
                  <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="border border-gray-300 rounded px-2 py-1 text-xs">
                    <option value="recent">Recently Joined</option>
                    <option value="name">Name</option>
                    <option value="timezone">Timezone</option>
                    <option value="state">State</option>
                    <option value="city">City</option>
                  </select>
                </div>
              </div>
              {/* Attendee List (mobile) */}
              <div className="overflow-y-auto space-y-3" style={{ maxHeight: '50vh' }}>
                {filteredAttendees.length === 0 ? (
                  <div className="text-center text-gray-400 py-12">
                    <Users className="h-8 w-8 mx-auto mb-2" />
                    <div>No attendees match your filters.</div>
                  </div>
                ) : (
                  filteredAttendees.map(a => (
                    <div key={a.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-purple-50 transition-colors">
                      <img src={a.image} alt={a.name} className="w-10 h-10 rounded-full border-2 border-purple-200 object-cover" />
                      <div className="flex-1">
                        <div className="flex items-center gap-1">
                          <span className="font-medium text-sm text-gray-900">{a.name}</span>
                          {a.verified && <CheckCircle className="h-4 w-4 text-green-500" />}
                          {a.online && <span className="ml-1 bg-green-200 text-green-800 text-xs px-2 py-0.5 rounded-full">Online</span>}
                        </div>
                        <div className="text-xs text-gray-500">{a.city}{a.state ? `, ${a.state}` : ''} • {a.timezone}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="bg-black/50 backdrop-blur-sm p-6">
        <div className="max-w-md mx-auto flex items-center justify-center space-x-6">
          <button
            onClick={handlePass}
            className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
          >
            <X className="h-8 w-8 text-white" />
          </button>
          
          <div className="text-center">
            <div className="text-white text-sm mb-1">
              {timeRemaining > 60 ? 'Getting to know each other...' : 'Time almost up!'}
            </div>
            <div className="w-32 h-2 bg-gray-600 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-1000"
                style={{ width: `${((180 - timeRemaining) / 180) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <button
            onClick={handleLike}
            disabled={liked}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 ${
              liked 
                ? 'bg-pink-500 scale-110' 
                : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:shadow-lg hover:scale-105'
            }`}
          >
            <Heart className={`h-8 w-8 text-white ${liked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="absolute top-16 right-4 bg-white rounded-lg shadow-lg p-4 w-64">
          <h3 className="font-semibold text-gray-900 mb-4">Settings</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Camera Quality</span>
              <select className="text-sm border border-gray-300 rounded px-2 py-1">
                <option>HD (720p)</option>
                <option>Full HD (1080p)</option>
                <option>4K</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Audio Quality</span>
              <select className="text-sm border border-gray-300 rounded px-2 py-1">
                <option>Standard</option>
                <option>High</option>
                <option>Studio</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Background Blur</span>
              <input type="checkbox" className="rounded" />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Auto-advance</span>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}