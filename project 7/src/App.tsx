import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import VideoFeatures from './components/VideoFeatures';
import LiveMatching from './components/LiveMatching';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import AuthModal from './components/AuthModal';
import FAQ from './components/FAQ';

import LiveEventRoom from './components/LiveEventRoom';
import EventsPage from './components/EventsPage';
import EventDetailsPage from './components/EventDetailsPage';
import EventsMainPage from './components/EventsMainPage';
import AllEventsGallery from './components/AllEventsGallery';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ToastManager } from './components/Toast';

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isInLiveEvent, setIsInLiveEvent] = useState(false);
  const [currentEventId, setCurrentEventId] = useState<number | null>(null);

  const handleAuthClick = () => {
    setIsAuthModalOpen(true);
  };

  const handleJoinEvent = () => {
    setIsAuthModalOpen(true);
  };

  const handleLeaveLiveEvent = () => {
    setIsInLiveEvent(false);
    setCurrentEventId(null);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  if (isInLiveEvent && currentEventId) {
    return <LiveEventRoom eventId={currentEventId} onLeaveRoom={handleLeaveLiveEvent} />;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-brand-gradient-soft">
        <Header onAuthClick={handleAuthClick} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero onJoinEvent={handleJoinEvent} />
                <VideoFeatures />
                <LiveMatching />
                <EventsMainPage />
                <HowItWorks />
                <Testimonials />
                <AboutUs />
                <FAQ />
               
              </>
            }
          />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetailsPage />} />
          <Route path="/all-events" element={<AllEventsGallery />} />
        </Routes>
        <Contact/>
        <Footer/>
        
        <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
        <ToastManager />
      </div>
    </BrowserRouter>
  );
}

export default App;