import React, { useState, useEffect } from 'react';
import { Event, getEventById } from '../data/eventsData';
import EventDetailsModal from './EventDetailsModal';
// @ts-expect-error - types may not be available for react-hot-toast in this setup
import { toast } from 'react-hot-toast';

interface EventManagerProps {
  children: React.ReactNode;
}

const EventManager: React.FC<EventManagerProps> = ({ children }) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [joinedEvents, setJoinedEvents] = useState<string[]>([]);
  const [savedEvents, setSavedEvents] = useState<string[]>([]);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedJoinedEvents = localStorage.getItem('joinedEvents');
    const savedSavedEvents = localStorage.getItem('savedEvents');
    
    if (savedJoinedEvents) {
      setJoinedEvents(JSON.parse(savedJoinedEvents));
    }
    
    if (savedSavedEvents) {
      setSavedEvents(JSON.parse(savedSavedEvents));
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('joinedEvents', JSON.stringify(joinedEvents));
  }, [joinedEvents]);

  useEffect(() => {
    localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
  }, [savedEvents]);

  const handleEventClick = (eventId: string) => {
    const event = getEventById(eventId);
    if (event) {
      setSelectedEvent(event);
      setIsModalOpen(true);
    }
  };

  const handleJoinEvent = (eventId: string) => {
    const event = getEventById(eventId);
    if (!event) return;

    // Check if already joined
    if (joinedEvents.includes(eventId)) {
      toast.error('You have already joined this event!');
      return;
    }

    // Check if event is full
    if (event.currentParticipants >= event.maxParticipants) {
      toast.error('Sorry, this event is full!');
      return;
    }

    // Add to joined events
    setJoinedEvents(prev => [...prev, eventId]);
    
    // Update event participants (in real app, this would be an API call)
    // In a real application, you would update the participant count through an API here
    
    // Close modal
    setIsModalOpen(false);
    setSelectedEvent(null);
    
    // Show success message
    toast.success(`Successfully joined "${event.title}"!`);
    
    // Optional: Show confirmation with event details
    setTimeout(() => {
      toast.success(
        `Event details sent to your email. Join at ${event.time} on ${new Date(event.date).toLocaleDateString()}`,
        { duration: 4000 }
      );
    }, 1500);
  };

  const handleSaveEvent = (eventId: string) => {
    const event = getEventById(eventId);
    if (!event) return;

    if (savedEvents.includes(eventId)) {
      // Remove from saved events
      setSavedEvents(prev => prev.filter(id => id !== eventId));
      toast.success('Event removed from saved events');
    } else {
      // Add to saved events
      setSavedEvents(prev => [...prev, eventId]);
      toast.success('Event saved to your favorites!');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const isEventJoined = (eventId: string) => joinedEvents.includes(eventId);
  const isEventSaved = (eventId: string) => savedEvents.includes(eventId);

  // Provide context to child components
  const eventContext = {
    onEventClick: handleEventClick,
    onJoinEvent: handleJoinEvent,
    onSaveEvent: handleSaveEvent,
    isEventJoined,
    isEventSaved,
    joinedEvents,
    savedEvents
  };

  return (
    <div>
      {/* Pass context to children via props or context provider */}
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { eventContext } as unknown as React.Attributes & { eventContext: typeof eventContext });
        }
        return child;
      })}
      
      {/* Event Details Modal */}
      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onJoinEvent={handleJoinEvent}
        />
      )}
    </div>
  );
};

// Hook to use event context
export const useEventContext = () => {
  // This would be implemented with React Context in a real app
  return {
    onEventClick: () => {},
    onJoinEvent: () => {},
    onSaveEvent: () => {},
    isEventJoined: () => false,
    isEventSaved: () => false,
    joinedEvents: [],
    savedEvents: []
  };
};

export default EventManager;