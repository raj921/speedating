import { useState, useEffect } from 'react';
import { Calendar, Heart } from 'lucide-react';
import { eventsData } from '../data/eventsData';
import { useNavigate } from 'react-router-dom';

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Map of days to their respective images
const DAY_IMAGES: Record<string, string[]> = {
  monday: [
    'WhatsApp Image 2025-06-26 at 22.02.03 (1).jpeg',
    'WhatsApp Image 2025-06-26 at 22.02.03 (2).jpeg',
    'WhatsApp Image 2025-06-26 at 22.02.03.jpeg',
    'WhatsApp Image 2025-06-26 at 22.02.04 (1).jpeg',
    'WhatsApp Image 2025-06-26 at 22.02.04.jpeg'
  ],
  tuesday: [
    'WhatsApp Image 2025-06-26 at 22.02.22 (1).jpeg',
    'WhatsApp Image 2025-06-26 at 22.02.22.jpeg',
    'WhatsApp Image 2025-06-26 at 22.02.23 (1).jpeg',
    'WhatsApp Image 2025-06-26 at 22.02.23.jpeg'
  ],
  wednesday: [
    'WhatsApp Image 2025-06-26 at 22.02.42 (1).jpeg',
    'WhatsApp Image 2025-06-26 at 22.02.42 (2).jpeg',
    'WhatsApp Image 2025-06-26 at 22.02.42.jpeg',
    'WhatsApp Image 2025-06-26 at 22.02.44.jpeg'
  ],
  thursday: [
    'WhatsApp Image 2025-06-26 at 22.03.02 (1).jpeg',
    'WhatsApp Image 2025-06-26 at 22.03.02 (2).jpeg',
    'WhatsApp Image 2025-06-26 at 22.03.02.jpeg',
    'WhatsApp Image 2025-06-26 at 22.03.03.jpeg',
    'WhatsApp Image 2025-06-26 at 22.03.22 (1).jpeg',
    'WhatsApp Image 2025-06-26 at 22.03.22 (2).jpeg',
    'WhatsApp Image 2025-06-26 at 22.03.22 (3).jpeg'
  ],
  friday: [
    'WhatsApp Image 2025-06-26 at 22.03.22.jpeg',
    'WhatsApp Image 2025-06-26 at 22.03.23.jpeg'
  ],
  saturday: [
    'WhatsApp Image 2025-06-26 at 22.03.41 (1).jpeg',
    'WhatsApp Image 2025-06-26 at 22.03.41 (2).jpeg',
    'WhatsApp Image 2025-06-26 at 22.03.41.jpeg',
    'WhatsApp Image 2025-06-26 at 22.03.42.jpeg'
  ],
  sunday: [
    'WhatsApp Image 2025-06-26 at 22.04.01.jpeg',
    'WhatsApp Image 2025-06-26 at 22.04.02.jpeg',
    'WhatsApp Image 2025-06-26 at 22.04.03 (1).jpeg',
    'WhatsApp Image 2025-06-26 at 22.04.03.jpeg'
  ]
};

// Function to get day of week based on event ID (distributes events across days)
const getDayOfWeek = (id: number): string => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dayIndex = (id - 1) % 7; // Distribute events across days based on ID
  return days[dayIndex];
};

// Function to get a valid image path for an event
const getValidImagePath = (eventId: string, day: string): string => {
  const dayLower = day.toLowerCase();
  const dayFolder = dayLower; // Folder names are all lowercase in public/eventpic/
  
  // Get images for the specified day
  const dayImages = DAY_IMAGES[dayLower] || [];
  
  // Debug: Log the day and available images
  console.log(`Getting image for day: ${dayLower}, folder: ${dayFolder}, available images:`, dayImages);
  
  // If we have images for this day, select one based on event ID
  if (dayImages.length > 0) {
    const imageIndex = (parseInt(eventId) - 1) % dayImages.length;
    const imageName = dayImages[imageIndex];
    const imagePath = `/eventpic/${dayFolder}/${imageName}`;
    
    // Log detailed information for debugging
    console.log({
      eventId,
      day,
      dayLower,
      dayFolder,
      imageIndex,
      imageName,
      imagePath,
      fullUrl: new URL(imagePath, window.location.origin).href
    });
    
    return imagePath;
  }
  
  console.warn(`No images found for day: ${dayLower}, using fallback image`);
  // Fallback to a default image if no specific images for this day
  return '/eventpic/image.png';
};

// Function to get current day
const getCurrentDay = (): string => {
  const today = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[today.getDay()];
};

// Commented out unused function since we're not doing date-based filtering right now
// Keeping it here in case it's needed later
/*
const isSameDay = (date1: string, date2: Date): boolean => {
  const d1 = new Date(date1);
  return (
    d1.getFullYear() === date2.getFullYear() &&
    d1.getMonth() === date2.getMonth() &&
    d1.getDate() === date2.getDate()
  );
};
*/

export default function TodaysEvents() {
  const [selectedDay, setSelectedDay] = useState<string>(getCurrentDay());
  const [currentDay] = useState<string>(getCurrentDay());
  const [showAllEvents, setShowAllEvents] = useState<boolean>(false);
  const navigate = useNavigate();
  
  // Reset showAllEvents when day changes
  useEffect(() => {
    setShowAllEvents(false);
  }, [selectedDay]);

  // Set initial filter to current day if not already set
  useEffect(() => {
    if (!selectedDay) {
      setSelectedDay(currentDay);
    }
  }, [currentDay, selectedDay]);

  // Convert events data with day information based on ID
  const adaptedEvents = eventsData.map((event) => {
    const day = getDayOfWeek(parseInt(event.id));
    const imagePath = getValidImagePath(event.id, day);
    
    // Debug logging for Monday events
    if (day.toLowerCase() === 'monday') {
      const fullPath = new URL(imagePath, window.location.origin).href;
      console.log('Monday event details:', {
        id: event.id,
        title: event.title,
        day: day,
        image: imagePath,
        fullPath: fullPath,
        imageExists: false
      });
      
      // Preload the image to check if it exists
      const img = new Image();
      img.onload = () => console.log(`Image loaded: ${imagePath}`);
      img.onerror = () => console.error(`Failed to load image: ${imagePath}`);
      img.src = imagePath;
    }
    
    return {
      ...event,
      id: parseInt(event.id),
      day: day,
      image: imagePath
    };
  });
  
  // Log event distribution by day
  const eventsByDay = adaptedEvents.reduce((acc, event) => {
    acc[event.day] = (acc[event.day] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  console.log('Event distribution by day:', eventsByDay);

  // Log the current state for debugging
  console.log('Filtering events for day:', selectedDay, 'Current day:', currentDay);
  console.log('Total adapted events:', adaptedEvents.length);
  
  // Debug: Log all Monday events with detailed image path info
  const mondayEvents = adaptedEvents.filter(e => e.day.toLowerCase() === 'monday');
  console.log('All Monday events:', mondayEvents.map(e => {
    const img = new Image();
    const imagePath = e.image;
    const fullPath = new URL(imagePath, window.location.origin).href;
    
    // Check if image loads
    img.onload = () => console.log(`✅ Image exists: ${imagePath}`);
    img.onerror = () => console.error(`❌ Image not found: ${imagePath}`);
    img.src = imagePath;
    
    return {
      id: e.id,
      title: e.title,
      day: e.day,
      imagePath: imagePath,
      fullPath: fullPath,
      imageElement: img
    };
  }));
  
  // Log the exact expected paths for Monday images
  console.log('Expected Monday image paths:', DAY_IMAGES.monday.map(img => ({
    filename: img,
    path: `/eventpic/monday/${img}`,
    fullUrl: new URL(`/eventpic/monday/${img}`, window.location.origin).href
  })));
  
  const displayEvents = adaptedEvents.filter(event => {
    const isMatchingDay = event.day.toLowerCase() === selectedDay.toLowerCase();
    
    // Special debug logging for Monday events
    if (selectedDay.toLowerCase() === 'monday') {
      console.log('Monday event check:', {
        eventId: event.id,
        eventDay: event.day,
        isMatchingDay,
        image: event.image,
        title: event.title
      });
      
      // Try to create an absolute URL for the image
      try {
        const imgUrl = new URL(event.image, window.location.origin).href;
        console.log('Monday image URL:', imgUrl);
        
        // Try to load the image to check if it exists
        const img = new Image();
        img.onload = () => console.log(`Image loaded: ${event.image}`);
        img.onerror = () => console.error(`Failed to load image: ${event.image}`);
        img.src = event.image;
      } catch (e) {
        console.error('Error creating URL:', e);
      }
    }
    
    return isMatchingDay;
      });

  // Debug: Log the events being displayed
  console.log(`Displaying ${displayEvents.length} events for ${selectedDay}:`, displayEvents);
  
  // Show only 5 events initially, or all if showAllEvents is true
  const visibleEvents = showAllEvents ? displayEvents : displayEvents.slice(0, 5);
  
  const handleShowMore = () => {
    setShowAllEvents(true);
  };

  return (
    <section id="events" className="py-20 bg-brand-gradient-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Calendar className="h-4 w-4 mr-2" />
            Today is {currentDay}
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-purple-900 mb-6">
            Events
          </h2>
        </div>

        {/* Day Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {daysOfWeek.map(day => {
            const dayEvents = adaptedEvents.filter(event => event.day === day);
            const isToday = day === currentDay;
            
            return (
              <button
                key={day}
                className={`relative px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 border-2 ${
                  selectedDay === day 
                    ? 'bg-purple-700 text-white border-purple-700 shadow-lg scale-105' 
                    : 'bg-white text-purple-700 border-purple-200 hover:bg-purple-50 hover:border-purple-300'
                }`}
                onClick={() => setSelectedDay(day)}
              >
                <span className="flex items-center">
                  {day}
                  {isToday && (
                    <span className="ml-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  )}
                </span>
                {dayEvents.length > 0 && (
                  <span className={`absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                    selectedDay === day ? 'bg-pink-500 text-white' : 'bg-purple-600 text-white'
                  }`}>
                    {dayEvents.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Events Grid - Complete Images No Cropping */}
        {visibleEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {visibleEvents.map((event) => (
              <div
                key={event.id}
                className="group relative rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 cursor-pointer overflow-hidden bg-white"
              >
                {/* Complete Image Container - No Text Cropping */}
                <div className="relative w-full h-[500px] md:h-[400px] lg:h-[500px] flex items-center justify-center bg-gray-50 rounded-3xl">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  
                  {/* Videomatch.date Presents */}
                  <div className="absolute top-6 left-6 right-6 flex items-center justify-center opacity-95 z-10">
                    <div className="flex items-center bg-black/70 backdrop-blur-md rounded-full px-6 py-3 shadow-lg">
                      <Heart className="h-5 w-5 mr-3 text-white" />
                      <span className="text-sm md:text-base font-bold text-white">VIDEOMATCH.DATE PRESENTS</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No events found for {selectedDay}.</p>
        </div>
      )}
      
      {/* Show More/Show Less Button */}
      {displayEvents.length > 5 && !showAllEvents && (
        <div className="text-center mb-12">
          <button
            onClick={handleShowMore}
            className="px-8 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Show More Events ({displayEvents.length - 5} more)
          </button>
        </div>
      )}
      
      {showAllEvents && displayEvents.length > 5 && (
        <div className="text-center mb-12">
          <button
            onClick={() => setShowAllEvents(false)}
            className="px-8 py-3 bg-purple-100 text-purple-700 rounded-full font-semibold hover:bg-purple-200 transition-colors duration-200"
          >
            Show Less
          </button>
        </div>
      )}

      {/* View All Events Button */}
      <div className="text-center mt-8">
        <button
          onClick={() => navigate('/all-events')}
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          View All Events Gallery
        </button>
      </div>
      </div>
    </section>
  );
}