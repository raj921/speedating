import { Event } from '../data/eventsData';

// Utility functions for event handling
export const formatEventDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatEventTime = (timeString: string): string => {
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};

export const getEventStatus = (event: Event): 'filling-fast' | 'available' | 'almost-full' | 'full' => {
  const fillPercentage = (event.currentParticipants / event.maxParticipants) * 100;
  
  if (fillPercentage >= 100) return 'full';
  if (fillPercentage >= 90) return 'almost-full';
  if (fillPercentage >= 70) return 'filling-fast';
  return 'available';
};

export const getEventStatusColor = (status: string): string => {
  switch (status) {
    case 'full': return 'text-red-600 bg-red-100';
    case 'almost-full': return 'text-orange-600 bg-orange-100';
    case 'filling-fast': return 'text-yellow-600 bg-yellow-100';
    case 'available': return 'text-green-600 bg-green-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

export const getEventStatusText = (status: string): string => {
  switch (status) {
    case 'full': return 'Event Full';
    case 'almost-full': return 'Almost Full';
    case 'filling-fast': return 'Filling Fast';
    case 'available': return 'Available';
    default: return 'Unknown';
  }
};

export const getEventsForToday = (events: Event[]): Event[] => {
  const today = new Date().toISOString().split('T')[0];
  return events.filter(event => event.date === today);
};

export const getEventsForTomorrow = (events: Event[]): Event[] => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowString = tomorrow.toISOString().split('T')[0];
  return events.filter(event => event.date === tomorrowString);
};

export const getEventsThisWeek = (events: Event[]): Event[] => {
  const today = new Date();
  const weekEnd = new Date(today);
  weekEnd.setDate(today.getDate() + 7);
  
  const todayString = today.toISOString().split('T')[0];
  const weekEndString = weekEnd.toISOString().split('T')[0];
  
  return events.filter(event => event.date >= todayString && event.date <= weekEndString);
};

export const isEventUpcoming = (event: Event): boolean => {
  const eventDate = new Date(event.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return eventDate >= today;
};

export const getEventTimeLeft = (event: Event): string => {
  const eventDateTime = new Date(`${event.date}T${event.time}`);
  const now = new Date();
  const timeDiff = eventDateTime.getTime() - now.getTime();
  
  if (timeDiff < 0) return 'Event has passed';
  
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} left`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} left`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} left`;
  
  return 'Starting soon';
};

export const generateEventShareUrl = (event: Event): string => {
  return `${window.location.origin}/event/${event.id}`;
};

export const generateEventShareText = (event: Event): string => {
  return `Check out this amazing event: ${event.title} on ${formatEventDate(event.date)} at ${formatEventTime(event.time)}. Join me at VideoMatch!`;
};