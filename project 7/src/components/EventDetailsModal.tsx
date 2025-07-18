import React from 'react';
import { X, Calendar, Clock, MapPin, Users, Star, Share2, Heart, AlertCircle } from 'lucide-react';
import { Event } from '../data/eventsData';
import { 
  formatEventDate, 
  formatEventTime, 
  getEventStatus, 
  getEventStatusColor, 
  getEventStatusText,
  getEventTimeLeft 
} from '../utils/eventHelpers';

interface EventDetailsModalProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
  onJoinEvent: (eventId: string) => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ 
  event, 
  isOpen, 
  onClose, 
  onJoinEvent 
}) => {
  if (!isOpen) return null;

  const status = getEventStatus(event);
  const statusColor = getEventStatusColor(status);
  const statusText = getEventStatusText(status);
  const timeLeft = getEventTimeLeft(event);

  const handleJoinClick = () => {
    onJoinEvent(event.id);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Join me at this amazing event: ${event.title}`,
        url: window.location.href
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-64 object-cover rounded-t-3xl"
          />
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              onClick={handleShare}
              className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all"
            >
              <Share2 className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={onClose}
              className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>
          
          {/* Event Status Badge */}
          <div className="absolute bottom-4 left-4">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor}`}>
              {statusText}
            </span>
          </div>
          
          {/* Featured Badge */}
          {event.featured && (
            <div className="absolute top-4 left-4">
              <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold flex items-center">
                <Star className="w-4 h-4 mr-1" />
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Title and Category */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h1>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${getCategoryColor(event.category)}`}>
                  {event.category.replace('-', ' ').toUpperCase()}
                </span>
                <span className="text-lg font-bold text-gray-900">
                  {event.price === 0 ? 'Free' : `$${event.price}`}
                </span>
              </div>
            </div>
          </div>

          {/* Event Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Left Column - Event Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-700">{formatEventDate(event.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-700">{formatEventTime(event.time)}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-700">{event.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-700">
                      {event.currentParticipants}/{event.maxParticipants} participants
                    </span>
                  </div>
                </div>
              </div>

              {/* Age Range */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Age Range</h3>
                <p className="text-gray-700">{event.ageRange} years old</p>
              </div>

              {/* Time Left */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Time Left</h3>
                <p className="text-gray-700 font-medium">{timeLeft}</p>
              </div>
            </div>

            {/* Right Column - Additional Info */}
            <div className="space-y-6">
              {/* Host Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Host</h3>
                <div className="flex items-center space-x-4">
                  <img
                    src={event.host.avatar}
                    alt={event.host.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{event.host.name}</p>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm text-gray-600">{event.host.rating} rating</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Capacity Progress */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Capacity</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Spots filled</span>
                    <span>{Math.round((event.currentParticipants / event.maxParticipants) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${getCategoryColor(event.category)}`}
                      style={{ width: `${(event.currentParticipants / event.maxParticipants) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {event.maxParticipants - event.currentParticipants} spots remaining
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About This Event</h3>
            <p className="text-gray-700 leading-relaxed">{event.description}</p>
          </div>

          {/* Requirements */}
          {event.requirements && event.requirements.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h3>
              <ul className="space-y-2">
                {event.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <AlertCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleJoinClick}
              disabled={status === 'full'}
              className={`flex-1 py-4 px-8 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 ${
                status === 'full'
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:from-rose-600 hover:to-pink-600'
              }`}
            >
              {status === 'full' ? 'Event Full' : 'Join Event'}
            </button>
            <button className="flex items-center justify-center px-6 py-4 border-2 border-gray-300 rounded-xl text-gray-700 hover:border-gray-400 transition-all">
              <Heart className="w-5 h-5 mr-2" />
              Save Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;