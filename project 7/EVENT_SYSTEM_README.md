# VideoMatch Event System

## Overview

The VideoMatch event system provides a comprehensive platform for managing and displaying dating events with advanced filtering capabilities. The system uses real images from the `eventpic` folder and implements both day-based filtering in the main page and comprehensive filtering in the events page.

## Components Structure

### 1. Main Components

#### `EventsMainPage.tsx`
- **Purpose**: Main container component that manages navigation between upcoming events and all events view
- **Features**: 
  - State management for view switching
  - Seamless transitions between views
  - Proper navigation handling

#### `UpcomingEvents.tsx`
- **Purpose**: Displays featured events with day-based filtering on the main page
- **Features**:
  - Day-of-week filtering (All, Monday, Tuesday, etc.)
  - Shows up to 4 events per view
  - Integration with real event data
  - "See All Events" button functionality

#### `AllEventsPage.tsx`
- **Purpose**: Comprehensive events page with advanced filtering
- **Features**:
  - Search functionality
  - Category filtering
  - Price range filtering
  - Date filtering
  - Sorting options
  - Responsive design
  - Filter clearing

#### `DailyEventsSection.tsx`
- **Purpose**: Alternative daily events view with calendar-style day selection
- **Features**:
  - 7-day calendar view
  - Day-specific event filtering
  - Enhanced visual design
  - Smooth animations

### 2. Data Management

#### `eventsData.ts`
- **Purpose**: Centralized event data management
- **Contains**:
  - Event interface definition
  - Sample events data (12 events)
  - Helper functions for filtering
  - Real images from eventpic folder

### 3. UI Components

#### `EventCard.tsx`
- **Purpose**: Reusable event card component
- **Features**:
  - Event image display
  - Category badges
  - Price display
  - Progress bars
  - Host information
  - Action buttons

## Event Data Structure

```typescript
interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: 'speed-dating' | 'mixer' | 'workshop' | 'networking' | 'social' | 'premium';
  price: number;
  maxParticipants: number;
  currentParticipants: number;
  image: string;
  featured: boolean;
  status: 'upcoming' | 'live' | 'completed' | 'cancelled';
  ageRange: string;
  requirements: string[];
  host: {
    name: string;
    avatar: string;
    rating: number;
  };
}
```

## Features

### 1. Day-Based Filtering (Main Page)
- **Location**: UpcomingEvents component
- **Functionality**: 
  - Filter events by day of the week
  - Show events for specific days
  - "All" option to show all events
  - Smooth transitions between filtered views

### 2. Advanced Filtering (All Events Page)
- **Search**: Text-based search across titles, descriptions, and locations
- **Category**: Filter by event type (speed-dating, mixer, workshop, etc.)
- **Price Range**: Filter by price brackets (Free, Under $30, $30-60, etc.)
- **Date Range**: Filter by time periods (Today, Tomorrow, This Week, This Month)
- **Sorting**: Sort by date, price, popularity, or name

### 3. Visual Enhancements
- **Real Images**: Uses actual images from the eventpic folder
- **Category Colors**: Color-coded categories for easy identification
- **Progress Bars**: Visual representation of event capacity
- **Featured Events**: Special highlighting for important events
- **Host Information**: Display host details and ratings

## Image Management

### Images Location
- **Source**: `/Users/rajkumar/Downloads/backup-7.12.2023_14-46-56_videomatch/eventpic/`
- **Public Access**: `project 7/public/eventpic/`
- **Usage**: Images are referenced as `/eventpic/[filename]`

### Image Types
- **Main Image**: `image.png` - Used as default/fallback
- **Event Images**: 32+ WhatsApp images from June 26, 2025
- **Format**: JPEG images (1600x900 aspect ratio)

## Implementation Details

### 1. State Management
- Uses React hooks for local state management
- Maintains filter states across components
- Handles view transitions smoothly

### 2. Responsive Design
- Mobile-first approach
- Responsive grid layouts
- Adaptive filtering interface
- Touch-friendly interactions

### 3. Performance Optimizations
- Lazy loading for images
- Efficient filtering algorithms
- Memoized components where applicable
- Smooth animations and transitions

## Usage

### Basic Integration
```tsx
import EventsMainPage from './components/EventsMainPage';

function App() {
  return (
    <div>
      <EventsMainPage />
    </div>
  );
}
```

### Day-Based Filtering
```tsx
// In UpcomingEvents.tsx
const filteredEvents = selectedDay === "All"
  ? adaptedEvents
  : adaptedEvents.filter(event => event.day === selectedDay);
```

### Advanced Filtering
```tsx
// In AllEventsPage.tsx
const applyFilters = () => {
  let filtered = [...eventsData];
  
  // Apply search, category, price, and date filters
  if (searchQuery) filtered = searchEvents(searchQuery);
  if (selectedCategory !== 'all') filtered = filtered.filter(event => event.category === selectedCategory);
  // ... additional filters
};
```

## Customization

### Adding New Event Categories
1. Update the `category` type in `eventsData.ts`
2. Add corresponding colors in `getCategoryColor` functions
3. Update filter options in `AllEventsPage.tsx`

### Adding New Images
1. Place images in `public/eventpic/` folder
2. Update event data to reference new images
3. Ensure proper image optimization for web

### Extending Filtering
1. Add new filter state variables
2. Implement filter logic in `applyFilters` function
3. Add UI controls for new filters

## Future Enhancements

### Planned Features
- **Event Registration**: Full registration workflow
- **Payment Integration**: Stripe/PayPal integration
- **User Profiles**: Enhanced user management
- **Event Reviews**: Post-event feedback system
- **Calendar Integration**: Google Calendar sync
- **Push Notifications**: Event reminders

### Technical Improvements
- **Database Integration**: Replace static data with API calls
- **Real-time Updates**: WebSocket integration for live data
- **Advanced Search**: ElasticSearch integration
- **Analytics**: Event performance tracking
- **A/B Testing**: Component optimization

## Troubleshooting

### Common Issues
1. **Images not loading**: Check that images are in `public/eventpic/` folder
2. **Filter not working**: Verify filter state management
3. **Navigation issues**: Check component mounting and state transitions

### Performance Issues
- Optimize image sizes for web
- Implement virtual scrolling for large event lists
- Use React.memo for expensive components

## Support

For questions or issues with the event system, please refer to:
- Component documentation
- Type definitions in `eventsData.ts`
- Example implementations in existing components

---

*Built with React, TypeScript, and Tailwind CSS*