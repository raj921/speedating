
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, Calendar, MapPin, Clock } from 'lucide-react';

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

export default function EventDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find(e => e.id === Number(id));
  const img = event && (eventImageMap[event.title] || `/events/${eventImages[(event.id - 1) % eventImages.length]}`);

  if (!event) {
    return (
      <section className="py-16 bg-brand-gradient-soft min-h-screen flex flex-col items-center justify-center">
        <Heart className="h-12 w-12 text-purple-200 mb-4" />
        <h2 className="text-2xl font-bold text-purple-900 mb-2">Event Not Found</h2>
        <p className="text-gray-600 mb-6">Sorry, we couldn't find the event you're looking for.</p>
        <button
          className="bg-gradient-to-r from-purple-700 to-pink-500 text-white px-6 py-2 rounded-full font-semibold shadow hover:scale-105 transition-all"
          onClick={() => navigate('/events')}
        >
          Back to Events
        </button>
      </section>
    );
  }

  return (
    <section className="py-16 bg-brand-gradient-soft min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          className="mb-6 bg-gradient-to-r from-purple-700 to-pink-500 text-white px-6 py-2 rounded-full font-semibold shadow hover:scale-105 transition-all"
          onClick={() => navigate('/events')}
        >
          Back to Events
        </button>
        <div className="relative bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Overlay Header */}
          <div className="absolute top-0 left-0 w-full flex items-center px-4 py-2 bg-purple-800/80 text-white z-10" style={{backdropFilter: 'blur(2px)'}}>
            <Heart className="h-5 w-5 mr-2 text-white" />
            <span className="font-bold tracking-wide text-xs sm:text-sm">LIGHTNING SPEED DATE MATCH PRESENTS</span>
          </div>
          {/* Event Image */}
          <div className="w-full aspect-[4/3] bg-gray-100 flex items-center justify-center overflow-hidden">
            <img
              src={img && !img.startsWith('/events/') ? `/events/${img}` : img}
              alt={event.title}
              className="object-cover w-full h-full"
              loading="lazy"
            />
          </div>
          <div className="p-6 bg-purple-900/90 text-white">
            <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
            <p className="mb-4 text-sm opacity-90">{event.description}</p>
            <div className="flex flex-wrap gap-4 mb-4 text-xs opacity-90">
              <span className="flex items-center"><Calendar className="h-4 w-4 mr-1" />{event.date}</span>
              <span className="flex items-center"><Clock className="h-4 w-4 mr-1" />{event.time}</span>
              <span className="flex items-center"><MapPin className="h-4 w-4 mr-1" />{event.location}</span>
              <span className="flex items-center">Age: {event.ageRange}</span>
              <span className="flex items-center">Attendees: {event.attendees}</span>
              <span className="flex items-center">Price: {event.price}</span>
              <span className="flex items-center">Type: {event.type}</span>
              <span className="flex items-center">Timezone: {event.timezone}</span>
              <span className="flex items-center">Country: {event.country}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 