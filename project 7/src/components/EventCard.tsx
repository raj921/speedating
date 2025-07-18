import React from 'react';
import { Calendar, Clock, MapPin, Users, Star } from 'lucide-react';
import { Event } from '../data/eventsData';

interface EventCardProps {
  event: Event;
  onJoinEvent?: (eventId: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onJoinEvent }) => {
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

  const handleJoinClick = () => {
    if (onJoinEvent) {
      onJoinEvent(event.id);
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
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

        {/* Host Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img
              src={event.host.avatar}
              alt={event.host.name}
              className="w-8 h-8 rounded-full mr-2 object-cover"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">{event.host.name}</p>
              <div className="flex items-center">
                <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                <span className="text-xs text-gray-600">{event.host.rating}</span>
              </div>
            </div>
          </div>
          <span className="text-xs text-gray-500">Age: {event.ageRange}</span>
        </div>

        {/* Action Button */}
        <button 
          onClick={handleJoinClick}
          className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-rose-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          Join Event
        </button>
      </div>
    </div>
  );
};

export default EventCard;