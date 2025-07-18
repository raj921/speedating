
import { Calendar, Clock, MapPin, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// Sample event data (reuse from UpcomingEvents or import if shared)
const events = [
  {
    id: 1,
    title: "Young Professionals Video Dating",
    date: "March 15, 2024",
    time: "7:00 PM - 9:30 PM",
    location: "Virtual Event Room",
    ageRange: "25-35",
    attendees: 32,
    price: "$25",
    type: "Video",
    timezone: "UTC-05:00 (Eastern)",
    country: "United States",
    badge: "Popular",
    description: "Meet ambitious young professionals in a fun, fast-paced video event!",
    day: "Friday"
  },
  {
    id: 2,
    title: "Singles Mixer Video Event",
    date: "March 18, 2024",
    time: "8:00 PM - 10:00 PM",
    location: "Global Video Room",
    ageRange: "28-40",
    attendees: 48,
    price: "$30",
    type: "Video",
    timezone: "UTC+00:00 (London)",
    country: "Global",
    badge: "New",
    description: "A global mixer for singles looking to connect across borders.",
    day: "Monday"
  },
  {
    id: 3,
    title: "Coffee Chat Video Dating",
    date: "March 22, 2024",
    time: "2:00 PM - 4:00 PM",
    location: "Afternoon Video Lounge",
    ageRange: "30-45",
    attendees: 24,
    price: "$20",
    type: "Video",
    timezone: "UTC-08:00 (Pacific)",
    country: "United States",
    badge: "Limited Spots",
    description: "Relaxed afternoon video chats for coffee lovers and singles.",
    day: "Friday"
  },
  {
    id: 4,
    title: "International Video Dating",
    date: "March 25, 2024",
    time: "9:00 PM - 11:00 PM",
    location: "Global Connection Room",
    ageRange: "25-45",
    attendees: 60,
    price: "$35",
    type: "Global",
    timezone: "Multiple",
    country: "Global",
    badge: "Popular",
    description: "Connect with singles worldwide in this international event!",
    day: "Monday"
  }
];

const eventImageMap: { [key: string]: string } = {
  'Young Professionals Video Dating': 'WhatsApp Image 2025-06-26 at 22.02.04 (1).jpeg',
  'Singles Mixer Video Event': 'WhatsApp Image 2025-06-26 at 22.02.22 (1).jpeg',
  'Coffee Chat Video Dating': 'WhatsApp Image 2025-06-26 at 22.02.23 (1).jpeg',
  'International Video Dating': 'WhatsApp Image 2025-06-26 at 22.02.42 (1).jpeg',
};

const eventImages = [
  "WhatsApp Image 2025-06-26 at 22.02.04 (1).jpeg",
  "WhatsApp Image 2025-06-26 at 22.02.04.jpeg",
  "WhatsApp Image 2025-06-26 at 22.02.22 (1).jpeg",
  "WhatsApp Image 2025-06-26 at 22.02.22.jpeg",
  "WhatsApp Image 2025-06-26 at 22.02.23 (1).jpeg",
  "WhatsApp Image 2025-06-26 at 22.02.23.jpeg",
  "WhatsApp Image 2025-06-26 at 22.02.42 (1).jpeg",
  "WhatsApp Image 2025-06-26 at 22.02.42 (2).jpeg",
  "WhatsApp Image 2025-06-26 at 22.02.42.jpeg",
  "WhatsApp Image 2025-06-26 at 22.02.44.jpeg",
  "WhatsApp Image 2025-06-26 at 22.03.02 (1).jpeg",
  "WhatsApp Image 2025-06-26 at 22.03.02 (2).jpeg",
  "WhatsApp Image 2025-06-26 at 22.03.02.jpeg",
  "WhatsApp Image 2025-06-26 at 22.03.03.jpeg",
  "WhatsApp Image 2025-06-26 at 22.03.22 (1).jpeg",
  "WhatsApp Image 2025-06-26 at 22.03.22 (2).jpeg",
  "WhatsApp Image 2025-06-26 at 22.02.03 (1).jpeg",
  "WhatsApp Image 2025-06-26 at 22.02.03 (2).jpeg"
];

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
// eventTypes array removed per simplified filter design

export default function EventsPage() {
  const [selectedDay, setSelectedDay] = useState("");
  const navigate = useNavigate();

  const filteredEvents = events.filter(event => {
    if (selectedDay && event.day !== selectedDay) return false;
    return true;
  });

  return (
    <section className="py-16 bg-brand-gradient-soft min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-purple-900 mb-2">All Events</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Browse and filter all upcoming video dating events. Use the filters to find events by day, type, or search by name.</p>
        </div>
        {/* Filters - sticky on scroll */}
        <div className="sticky top-4 z-20 bg-white/90 rounded-xl shadow p-4 mb-8 flex gap-4 items-center">
          <span className="font-medium text-gray-700">Day:</span>
          <select
            value={selectedDay}
            onChange={e => setSelectedDay(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
          >
            <option value="">All</option>
            {daysOfWeek.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>
        {/* Event Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <Heart className="h-12 w-12 text-purple-200 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-purple-900 mb-2">No events found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters or search to see more events.</p>
            </div>
          ) : (
            filteredEvents.map((event, idx) => {
              const img = eventImageMap[event.title] || `/events/${eventImages[idx % eventImages.length]}`;
              return (
                <div
                  key={event.id}
                  className="relative bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden group flex flex-col cursor-pointer hover:scale-105"
                  style={{ minHeight: 340, maxWidth: 340, margin: '0 auto' }}
                  onClick={() => navigate(`/events/${event.id}`)}
                >
                  {/* Overlay Header */}
                  <div className="absolute top-0 left-0 w-full flex items-center px-4 py-2 bg-purple-800/80 text-white z-10" style={{backdropFilter: 'blur(2px)'}}>
                    <Heart className="h-5 w-5 mr-2 text-white" />
                    <span className="font-bold tracking-wide text-xs sm:text-sm">LIGHTNING SPEED DATE MATCH PRESENTS</span>
                  </div>
                  {/* Event Image with fixed aspect ratio */}
                  <div className="w-full aspect-[4/3] bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img
                      src={img.startsWith('/events/') ? img : `/events/${img}`}
                      alt={event.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
                      loading="lazy"
                    />
                  </div>
                  {/* Event Content */}
                  <div className="flex-1 flex flex-col justify-between p-4 bg-purple-900/90 text-white">
                    <div>
                      <h3 className="text-lg font-bold leading-tight mb-1">{event.title}</h3>
                      <p className="text-xs italic mb-2 opacity-80">At the comfort of your own home or office</p>
                    </div>
                    <div className="flex items-center gap-3 text-xs mt-2 opacity-90">
                      <span className="flex items-center"><Calendar className="h-4 w-4 mr-1" />{event.date}</span>
                      <span className="flex items-center"><Clock className="h-4 w-4 mr-1" />{event.time}</span>
                      <span className="flex items-center"><MapPin className="h-4 w-4 mr-1" />{event.location}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
} 