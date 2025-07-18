
import { Calendar, MapPin, Clock, Heart } from 'lucide-react';
import { useState } from 'react';
import { eventsData } from '../data/eventsData';

interface UpcomingEventsProps {
  onViewAllEvents?: () => void;
}

const daysOfWeek = ["All", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Function to get day of week from date string
const getDayOfWeek = (dateString: string): string => {
  const date = new Date(dateString);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[date.getDay()];
};

// Convert our events data to the format expected by this component
const adaptedEvents = eventsData.slice(0, 8).map((event) => ({
  id: parseInt(event.id),
  title: event.title,
  date: new Date(event.date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }),
  time: event.time,
  location: event.location,
  ageRange: event.ageRange,
  attendees: event.currentParticipants,
  price: event.price === 0 ? 'Free' : `$${event.price}`,
  type: event.category === 'premium' ? 'Premium' : 'Video',
  timezone: 'UTC-05:00 (Eastern)',
  country: event.location.includes('Virtual') ? 'Global' : 'United States',
  badge: event.featured ? 'Popular' : event.category === 'premium' ? 'Premium' : 'New',
  description: event.description,
  day: getDayOfWeek(event.date),
  image: event.image
}));

export default function UpcomingEvents({ onViewAllEvents }: UpcomingEventsProps) {
  const [selectedDay, setSelectedDay] = useState("All");

  const filteredEvents = selectedDay === "All"
    ? adaptedEvents
    : adaptedEvents.filter(event => event.day === selectedDay);

  const handleViewAllEvents = () => {
    if (onViewAllEvents) {
      onViewAllEvents();
    }
  };

  return (
    <section id="events" className="py-20 bg-brand-gradient-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-purple-900 mb-4">
            Featured Video Dating Events
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our upcoming live video dating events. Filter by day and discover your next match!
          </p>
        </div>
        {/* Day-of-week filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {daysOfWeek.map(day => (
            <button
              key={day}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-150 border-2 ${selectedDay === day ? 'bg-purple-700 text-white border-purple-700' : 'bg-white text-purple-700 border-purple-200 hover:bg-purple-50'}`}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </button>
          ))}
        </div>
        {/* Event grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {filteredEvents.slice(0, 4).map((event) => {
            return (
              <div
                key={event.id}
                className="relative bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden group flex flex-col"
                style={{ minHeight: 320, maxWidth: 340, margin: '0 auto' }}
              >
                {/* Overlay Header */}
                <div className="absolute top-0 left-0 w-full flex items-center px-4 py-2 bg-purple-800/80 text-white z-10" style={{backdropFilter: 'blur(2px)'}}>
                  <Heart className="h-5 w-5 mr-2 text-white" />
                  <span className="font-bold tracking-wide text-xs sm:text-sm">VIDEO MATCH PRESENTS</span>
                </div>
                {/* Event Image with fixed aspect ratio */}
                <div className="w-full aspect-[4/3] bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
                    loading="lazy"
                  />
                </div>
                {/* Event Content */}
                <div className="flex-1 flex flex-col justify-between p-4 bg-purple-900/90 text-white">
                  <div>
                    <h3 className="text-lg font-bold leading-tight mb-1">{event.title}</h3>
                    <p className="text-xs italic mb-2 opacity-80">Connect with like-minded singles</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs mt-2 opacity-90">
                    <span className="flex items-center"><Calendar className="h-4 w-4 mr-1" />{event.date}</span>
                    <span className="flex items-center"><Clock className="h-4 w-4 mr-1" />{event.time}</span>
                    <span className="flex items-center"><MapPin className="h-4 w-4 mr-1" />{event.location}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* See All Events button */}
        <div className="flex justify-center mt-8">
          <button
            className="bg-gradient-to-r from-purple-700 to-pink-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200 text-lg"
            onClick={handleViewAllEvents}
          >
            See All Events
          </button>
        </div>
      </div>
    </section>
  );
}