import React, { useState } from 'react';
import TodaysEvents from './TodaysEvents';
import EnhancedAllEventsPage from './EnhancedAllEventsPage';

export default function EventsMainPage() {
  const [currentView, setCurrentView] = useState<'today' | 'all'>('today');

  const handleViewAllEvents = () => {
    setCurrentView('all');
  };

  const handleBackToToday = () => {
    setCurrentView('today');
  };

  if (currentView === 'all') {
    return <EnhancedAllEventsPage onBack={handleBackToToday} />;
  }

  return (
    <div id="events">
      <TodaysEvents onViewAllEvents={handleViewAllEvents} />
    </div>
  );
}