import { eventsData, Event } from '../data/eventsData';

// API-like interface for events
export interface EventsApiResponse {
  events: Event[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface EventsFilterParams {
  date?: string;
  day?: string;
  category?: string;
  priceMin?: number;
  priceMax?: number;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: 'date' | 'price' | 'popularity' | 'title';
  sortOrder?: 'asc' | 'desc';
}

// Function to get day of week from date string
const getDayOfWeek = (dateString: string): string => {
  const date = new Date(dateString);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[date.getDay()];
};

// Function to get current day
export const getCurrentDay = (): string => {
  const today = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[today.getDay()];
};

// Function to get today's date in YYYY-MM-DD format
export const getTodayDate = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// Main API function to get filtered events
export const getFilteredEvents = async (params: EventsFilterParams = {}): Promise<EventsApiResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));

  const {
    date,
    day,
    category,
    priceMin,
    priceMax,
    search,
    page = 1,
    limit = 12,
    sortBy = 'date',
    sortOrder = 'asc'
  } = params;

  let filteredEvents = [...eventsData];

  // Apply filters
  if (date) {
    filteredEvents = filteredEvents.filter(event => event.date === date);
  }

  if (day && day !== 'All') {
    filteredEvents = filteredEvents.filter(event => getDayOfWeek(event.date) === day);
  }

  if (category && category !== 'All') {
    filteredEvents = filteredEvents.filter(event => event.category === category);
  }

  if (priceMin !== undefined) {
    filteredEvents = filteredEvents.filter(event => event.price >= priceMin);
  }

  if (priceMax !== undefined) {
    filteredEvents = filteredEvents.filter(event => event.price <= priceMax);
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filteredEvents = filteredEvents.filter(event =>
      event.title.toLowerCase().includes(searchLower) ||
      event.description.toLowerCase().includes(searchLower) ||
      event.location.toLowerCase().includes(searchLower) ||
      event.category.toLowerCase().includes(searchLower)
    );
  }

  // Apply sorting
  filteredEvents.sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'date':
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
        break;
      case 'price':
        comparison = a.price - b.price;
        break;
      case 'popularity':
        comparison = b.currentParticipants - a.currentParticipants;
        break;
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      default:
        comparison = 0;
    }

    return sortOrder === 'desc' ? -comparison : comparison;
  });

  // Apply pagination
  const total = filteredEvents.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedEvents = filteredEvents.slice(startIndex, endIndex);

  return {
    events: paginatedEvents,
    total,
    page,
    limit,
    hasMore: endIndex < total
  };
};

// Get events for today
export const getTodaysEvents = async (): Promise<Event[]> => {
  const today = getTodayDate();
  const response = await getFilteredEvents({ date: today });
  return response.events;
};

// Get events for a specific day of the week
export const getEventsByDay = async (day: string): Promise<Event[]> => {
  const response = await getFilteredEvents({ day });
  return response.events;
};

// Get featured events
export const getFeaturedEvents = async (): Promise<Event[]> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return eventsData.filter(event => event.featured);
};

// Get events by category
export const getEventsByCategory = async (category: string): Promise<Event[]> => {
  const response = await getFilteredEvents({ category });
  return response.events;
};

// Search events
export const searchEvents = async (query: string): Promise<Event[]> => {
  const response = await getFilteredEvents({ search: query });
  return response.events;
};

// Get event statistics
export const getEventStats = async () => {
  await new Promise(resolve => setTimeout(resolve, 50));
  
  const today = getTodayDate();
  const currentDay = getCurrentDay();
  
  const todaysEvents = eventsData.filter(event => event.date === today);
  const currentDayEvents = eventsData.filter(event => getDayOfWeek(event.date) === currentDay);
  
  const eventsByDay: { [key: string]: number } = {};
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  days.forEach(day => {
    eventsByDay[day] = eventsData.filter(event => getDayOfWeek(event.date) === day).length;
  });

  const eventsByCategory: { [key: string]: number } = {};
  eventsData.forEach(event => {
    eventsByCategory[event.category] = (eventsByCategory[event.category] || 0) + 1;
  });

  return {
    total: eventsData.length,
    todaysCount: todaysEvents.length,
    currentDayCount: currentDayEvents.length,
    currentDay,
    eventsByDay,
    eventsByCategory,
    featured: eventsData.filter(event => event.featured).length,
    totalAttendees: eventsData.reduce((sum, event) => sum + event.currentParticipants, 0)
  };
};

// Get upcoming events (next 7 days)
export const getUpcomingEvents = async (days: number = 7): Promise<Event[]> => {
  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + days);
  
  const todayStr = today.toISOString().split('T')[0];
  const futureDateStr = futureDate.toISOString().split('T')[0];
  
  const response = await getFilteredEvents({
    sortBy: 'date',
    sortOrder: 'asc'
  });
  
  return response.events.filter(event => 
    event.date >= todayStr && event.date <= futureDateStr
  );
};

// Mock API endpoint simulation
export const eventsApiEndpoints = {
  // GET /api/events
  getAllEvents: (params?: EventsFilterParams) => getFilteredEvents(params),
  
  // GET /api/events/today
  getTodaysEvents: () => getTodaysEvents(),
  
  // GET /api/events/day/:day
  getEventsByDay: (day: string) => getEventsByDay(day),
  
  // GET /api/events/featured
  getFeaturedEvents: () => getFeaturedEvents(),
  
  // GET /api/events/category/:category
  getEventsByCategory: (category: string) => getEventsByCategory(category),
  
  // GET /api/events/search?q=:query
  searchEvents: (query: string) => searchEvents(query),
  
  // GET /api/events/stats
  getEventStats: () => getEventStats(),
  
  // GET /api/events/upcoming
  getUpcomingEvents: (days?: number) => getUpcomingEvents(days)
};