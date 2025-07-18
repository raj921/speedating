// Event data structure with real images from eventpic folder
export interface Event {
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

// Helper function to get dates relative to today
const getRelativeDate = (daysFromToday: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromToday);
  return date.toISOString().split('T')[0];
};

// Sample events data using all 29 available images with realistic dates
export const eventsData: Event[] = [
  {
    id: '1',
    title: 'Speed Dating Night - Young Professionals',
    description: 'Meet successful singles in their 20s and 30s in a fun, relaxed environment.',
    date: getRelativeDate(0),
    time: '19:00',
    location: 'Manhattan, NYC',
    category: 'speed-dating',
    price: 45,
    maxParticipants: 30,
    currentParticipants: 18,
    image: '/eventpic/WhatsApp Image 2025-06-26 at 22.02.44.jpeg',
    featured: true,
    status: 'upcoming',
    ageRange: '25-35',
    requirements: ['Professional attire', 'Valid ID'],
    host: { name: 'Sarah Johnson', avatar: '/eventpic/image.png', rating: 4.8 }
  },
  {
    id: '2',
    title: 'Wine & Dine Mixer',
    description: 'Elegant evening of wine tasting and gourmet food with sophisticated singles.',
    date: getRelativeDate(0),
    time: '18:30',
    location: 'Downtown Brooklyn',
    category: 'mixer',
    price: 65,
    maxParticipants: 40,
    currentParticipants: 25,
    image: '/eventpic/WhatsApp Image 2025-06-26 at 22.02.04.jpeg',
    featured: true,
    status: 'upcoming',
    ageRange: '28-45',
    requirements: ['Smart casual attire'],
    host: { name: 'Michael Chen', avatar: '/eventpic/image.png', rating: 4.9 }
  },
  {
    id: '3',
    title: 'Dating Workshop: Building Confidence',
    description: 'Learn essential dating skills and boost your confidence.',
    date: getRelativeDate(1),
    time: '14:00',
    location: 'Virtual Event',
    category: 'workshop',
    price: 35,
    maxParticipants: 50,
    currentParticipants: 32,
    image: '/eventpic/WhatsApp Image 2025-06-26 at 22.02.03.jpeg',
    featured: false,
    status: 'upcoming',
    ageRange: '21-50',
    requirements: ['Notebook', 'Zoom access'],
    host: { name: 'Dr. Emma Rodriguez', avatar: '/eventpic/image.png', rating: 4.7 }
  },
  {
    id: '4',
    title: 'Outdoor Adventure Dating',
    description: 'Hiking and outdoor activities for active singles.',
    date: getRelativeDate(2),
    time: '10:00',
    location: 'Central Park',
    category: 'social',
    price: 25,
    maxParticipants: 25,
    currentParticipants: 15,
    image: '/eventpic/WhatsApp Image 2025-06-26 at 22.02.23.jpeg',
    featured: false,
    status: 'upcoming',
    ageRange: '22-40',
    requirements: ['Comfortable shoes'],
    host: { name: 'Alex Thompson', avatar: '/eventpic/image.png', rating: 4.6 }
  },
  {
    id: '5',
    title: 'Premium VIP Singles Gala',
    description: 'Exclusive black-tie event for successful professionals.',
    date: getRelativeDate(3),
    time: '19:30',
    location: 'The Plaza Hotel',
    category: 'premium',
    price: 150,
    maxParticipants: 60,
    currentParticipants: 35,
    image: '/eventpic/WhatsApp Image 2025-06-26 at 22.02.42.jpeg',
    featured: true,
    status: 'upcoming',
    ageRange: '30-50',
    requirements: ['Black tie attire'],
    host: { name: 'Victoria Sterling', avatar: '/eventpic/image.png', rating: 5.0 }
  },
  {
    id: '6',
    title: 'Creative Arts & Crafts Dating',
    description: 'Paint, create, and connect with artistic souls.',
    date: getRelativeDate(4),
    time: '15:00',
    location: 'Art Studio SoHo',
    category: 'social',
    price: 40,
    maxParticipants: 20,
    currentParticipants: 12,
    image: '/eventpic/WhatsApp Image 2025-06-26 at 22.02.04 (1).jpeg',
    featured: false,
    status: 'upcoming',
    ageRange: '24-38',
    requirements: ['Creativity welcomed'],
    host: { name: 'Luna Martinez', avatar: '/eventpic/image.png', rating: 4.5 }
  },
  {
    id: '7',
    title: 'Tech Professionals Networking',
    description: 'Connect with fellow tech enthusiasts and entrepreneurs.',
    date: getRelativeDate(5),
    time: '18:00',
    location: 'WeWork Times Square',
    category: 'networking',
    price: 30,
    maxParticipants: 35,
    currentParticipants: 22,
    image: '/eventpic/WhatsApp Image 2025-06-26 at 22.02.03 (1).jpeg',
    featured: false,
    status: 'upcoming',
    ageRange: '25-42',
    requirements: ['Tech background'],
    host: { name: 'David Kim', avatar: '/eventpic/image.png', rating: 4.4 }
  },
  {
    id: '8',
    title: 'Sunday Brunch Speed Dating',
    description: 'Relaxed morning event with mimosas and brunch.',
    date: getRelativeDate(6),
    time: '11:00',
    location: 'Brooklyn Heights',
    category: 'speed-dating',
    price: 50,
    maxParticipants: 28,
    currentParticipants: 19,
    image: '/eventpic/WhatsApp Image 2025-06-26 at 22.02.03 (2).jpeg',
    featured: true,
    status: 'upcoming',
    ageRange: '26-38',
    requirements: ['Brunch attire'],
    host: { name: 'Jessica Park', avatar: '/eventpic/image.png', rating: 4.7 }
  },
  {
    id: '9',
    title: 'Fitness & Wellness Singles',
    description: 'Yoga and meditation for wellness-focused singles.',
    date: getRelativeDate(7),
    time: '17:00',
    location: 'Wellness Center',
    category: 'social',
    price: 35,
    maxParticipants: 30,
    currentParticipants: 18,
    image: '/eventpic/WhatsApp Image 2025-06-26 at 22.02.22.jpeg',
    featured: false,
    status: 'upcoming',
    ageRange: '24-40',
    requirements: ['Workout clothes'],
    host: { name: 'Ryan Martinez', avatar: '/eventpic/image.png', rating: 4.6 }
  },
  {
    id: '10',
    title: 'International Culture Exchange',
    description: 'Meet singles from diverse backgrounds and enjoy international cuisine.',
    date: getRelativeDate(8),
    time: '19:00',
    location: 'Global Culture Center',
    category: 'mixer',
    price: 45,
    maxParticipants: 45,
    currentParticipants: 28,
    image: '/eventpic/WhatsApp Image 2025-06-26 at 22.02.42 (1).jpeg',
    featured: false,
    status: 'upcoming',
    ageRange: '22-45',
    requirements: ['Cultural curiosity'],
    host: { name: 'Amara Hassan', avatar: '/eventpic/image.png', rating: 4.8 }
  },
  {
    id: '11',
    title: 'Game Night & Social',
    description: 'Board games and fun activities for playful singles.',
    date: getRelativeDate(9),
    time: '20:00',
    location: 'Game Lounge NYC',
    category: 'social',
    price: 25,
    maxParticipants: 32,
    currentParticipants: 20,
    image: '/eventpic/WhatsApp Image 2025-06-26 at 22.02.22 (1).jpeg',
    featured: false,
    status: 'upcoming',
    ageRange: '21-35',
    requirements: ['Competitive spirit'],
    host: { name: 'Marcus Johnson', avatar: '/eventpic/image.png', rating: 4.5 }
  },
  {
    id: '12',
    title: 'Book Club & Coffee Dating',
    description: 'Literary discussions and coffee tasting.',
    date: getRelativeDate(10),
    time: '16:00',
    location: 'Independent Bookstore',
    category: 'social',
    price: 20,
    maxParticipants: 18,
    currentParticipants: 11,
    image: '/eventpic/WhatsApp Image 2025-06-26 at 22.02.23 (1).jpeg',
    featured: false,
    status: 'upcoming',
    ageRange: '25-45',
    requirements: ['Love of reading'],
    host: { name: 'Sophie Chen', avatar: '/eventpic/image.png', rating: 4.9 }
  },
  {
    id: '13',
    title: 'Monday Motivation Mixer',
    description: 'Start your week with motivated singles.',
    date: getRelativeDate(11),
    time: '18:00',
    location: 'Rooftop Lounge',
    category: 'mixer',
    price: 35,
    maxParticipants: 25,
    currentParticipants: 14,
    image: '/eventpic/WhatsApp Image 2025-06-26 at 22.03.02.jpeg',
    featured: false,
    status: 'upcoming',
    ageRange: '26-40',
    requirements: ['Business casual'],
    host: { name: 'Amanda Foster', avatar: '/eventpic/image.png', rating: 4.6 }
  },
  {
    id: '14',
    title: 'Tuesday Trivia & Tapas',
    description: 'Test your knowledge while tasting delicious tapas.',
    date: getRelativeDate(12),
    time: '19:30',
    location: 'Spanish Restaurant',
    category: 'social',
    price: 40,
    maxParticipants: 30,
    currentParticipants: 22,
    image: '/eventpic/WhatsApp Image 2025-06-26 at 22.03.22.jpeg',
    featured: false,
    status: 'upcoming',
    ageRange: '25-45',
    requirements: ['Trivia enthusiasm'],
    host: { name: 'Carlos Rodriguez', avatar: '/eventpic/image.png', rating: 4.7 }
  },
  {
    id: '15',
    title: 'Wednesday Wine Walk',
    description: 'Stroll through the city while wine tasting.',
    date: getRelativeDate(13),
    time: '17:30',
    location: 'Wine District Tour',
    category: 'mixer',
    price: 55,
    maxParticipants: 20,
    currentParticipants: 16,
    image: '/eventpic/WhatsApp Image 2025-06-26 at 22.03.41.jpeg',
    featured: true,
    status: 'upcoming',
    ageRange: '28-50',
    requirements: ['Valid ID'],
    host: { name: 'Isabella Wine', avatar: '/eventpic/image.png', rating: 4.9 }
  },
  {
    id: '16',
    title: 'Thursday Jazz & Cocktails',
    description: 'Smooth jazz and craft cocktails for sophisticated singles.',
    date: getRelativeDate(14),
    time: '20:00',
    location: 'Jazz Club Manhattan',
    category: 'mixer',
    price: 60,
    maxParticipants: 35,
    currentParticipants: 24,
    image: '/eventpic/WhatsApp Image 2025-06-26 at 22.02.42 (2).jpeg',
    featured: true,
    status: 'upcoming',
    ageRange: '28-45',
    requirements: ['Smart casual'],
    host: { name: 'Miles Davis Jr.', avatar: '/eventpic/image.png', rating: 4.8 }
  },
  {
    id: '17',
    title: 'Friday Night Dance Party',
    description: 'Dance the night away with energetic singles.',
    date: getRelativeDate(15),
    time: '21:00',
    location: 'Dance Studio Brooklyn',
    category: 'social',
    price: 30,
    maxParticipants: 50,
    currentParticipants: 38,
    image: '/eventpic/WhatsApp Image 2025-06-26 at 22.03.02 (1).jpeg',
    featured: false,
    status: 'upcoming',
    ageRange: '22-38',
    requirements: ['Dancing shoes'],
    host: { name: 'DJ Sophia', avatar: '/eventpic/image.png', rating: 4.5 }
  },
  {
    id: '18',
    title: 'Saturday Cooking Class',
    description: 'Learn to cook delicious meals together.',
    date: getRelativeDate(16),
    time: '14:00',
    location: 'Culinary Institute',
    category: 'workshop',
    price: 75,
    maxParticipants: 16,
    currentParticipants: 12,
    image: '/eventpic/WhatsApp Image 2025-06-26 at 22.03.02 (2).jpeg',
    featured: false,
    status: 'upcoming',
    ageRange: '25-50',
    requirements: ['Apron provided'],
    host: { name: 'Chef Marco', avatar: '/eventpic/image.png', rating: 4.9 }
  },
  {
    id: '19',
    title: 'Sunday Yoga & Brunch',
    description: 'Morning yoga followed by healthy brunch.',
    date: getRelativeDate(17),
    time: '09:00',
    location: 'Zen Studio',
    category: 'social',
    price: 45,
    maxParticipants: 20,
    currentParticipants: 15,
    image: '/eventpic/WhatsApp Image 2025-06-26 at 22.03.03.jpeg',
    featured: false,
    status: 'upcoming',
    ageRange: '24-42',
    requirements: ['Yoga mat'],
    host: { name: 'Yogi Sarah', avatar: '/eventpic/image.png', rating: 4.7 }
  },
  {
    id: '20',
    title: 'Monday Movie Night',
    description: 'Classic films and popcorn with cinema lovers.',
    date: getRelativeDate(18),
    time: '19:00',
    location: 'Independent Cinema',
    category: 'social',
    price: 25,
    maxParticipants: 40,
    currentParticipants: 28,
    image: '/eventpic/WhatsApp Image 2025-06-26 at 22.03.22 (1).jpeg',
    featured: false,
    status: 'upcoming',
    ageRange: '21-45',
    requirements: ['Movie enthusiasm'],
    host: { name: 'Film Buff Alex', avatar: '/eventpic/image.png', rating: 4.4 }
  },
  {
    id: '21',
    title: 'Tuesday Art Gallery Tour',
    description: 'Explore contemporary art with cultured singles.',
    date: getRelativeDate(19),
    time: '18:30',
    location: 'Chelsea Art District',
    category: 'networking',
    price: 35,
    maxParticipants: 25,
    currentParticipants: 18,
    image: '/eventpic/WhatsApp Image 2025-06-26 at 22.03.22 (2).jpeg',
    featured: false,
    status: 'upcoming',
    ageRange: '26-48',
    requirements: ['Art appreciation'],
    host: { name: 'Gallery Curator Emma', avatar: '/eventpic/image.png', rating: 4.6 }
  },
  {
    id: '22',
    title: 'Wednesday Karaoke Night',
    description: 'Sing your heart out with fun-loving singles.',
    date: getRelativeDate(20),
    time: '20:30',
    location: 'Karaoke Bar',
    category: 'social',
    price: 20,
    maxParticipants: 35,
    currentParticipants: 26,
    image: '/eventpic/WhatsApp Image 2025-06-26 at 22.03.22 (3).jpeg',
    featured: false,
    status: 'upcoming',
    ageRange: '22-40',
    requirements: ['Singing courage'],
    host: { name: 'Karaoke King Mike', avatar: '/eventpic/image.png', rating: 4.3 }
  },
  {
    id: '23',
    title: 'Thursday Salsa Dancing',
    description: 'Learn salsa moves with passionate dancers.',
    date: getRelativeDate(21),
    time: '19:30',
    location: 'Latin Dance Studio',
    category: 'social',
    price: 40,
    maxParticipants: 30,
    currentParticipants: 22,
    image: '/eventpic/WhatsApp Image 2025-06-26 at 22.03.23.jpeg',
    featured: false,
    status: 'upcoming',
    ageRange: '25-45',
    requirements: ['Dance shoes'],
    host: { name: 'Salsa Instructor Rosa', avatar: '/eventpic/image.png', rating: 4.8 }
  },
  {
    id: '24',
    title: 'Friday Rooftop Networking',
    description: 'Professional networking with city views.',
    date: getRelativeDate(22),
    time: '18:00',
    location: 'Rooftop Bar Manhattan',
    category: 'networking',
    price: 50,
    maxParticipants: 40,
    currentParticipants: 31,
    image: '/eventpic/WhatsApp Image 2025-06-26 at 22.03.41 (1).jpeg',
    featured: true,
    status: 'upcoming',
    ageRange: '27-45',
    requirements: ['Business cards'],
    host: { name: 'Network Pro James', avatar: '/eventpic/image.png', rating: 4.7 }
  },
  {
    id: '25',
    title: 'Saturday Beach Volleyball',
    description: 'Active beach day with sporty singles.',
    date: getRelativeDate(23),
    time: '11:00',
    location: 'Coney Island Beach',
    category: 'social',
    price: 15,
    maxParticipants: 24,
    currentParticipants: 18,
    image: '/eventpic/WhatsApp Image 2025-06-26 at 22.03.41 (2).jpeg',
    featured: false,
    status: 'upcoming',
    ageRange: '21-35',
    requirements: ['Athletic wear'],
    host: { name: 'Beach Coach Tony', avatar: '/eventpic/image.png', rating: 4.5 }
  },
  {
    id: '26',
    title: 'Sunday Farmers Market Tour',
    description: 'Fresh produce and organic connections.',
    date: getRelativeDate(24),
    time: '10:00',
    location: 'Union Square Market',
    category: 'social',
    price: 25,
    maxParticipants: 20,
    currentParticipants: 14,
    image: '/eventpic/WhatsApp Image 2025-06-26 at 22.03.42.jpeg',
    featured: false,
    status: 'upcoming',
    ageRange: '24-50',
    requirements: ['Eco-friendly mindset'],
    host: { name: 'Organic Olivia', avatar: '/eventpic/image.png', rating: 4.6 }
  },
  {
    id: '27',
    title: 'Monday Comedy Show',
    description: 'Laugh together at stand-up comedy night.',
    date: getRelativeDate(25),
    time: '20:00',
    location: 'Comedy Club',
    category: 'social',
    price: 30,
    maxParticipants: 50,
    currentParticipants: 35,
    image: '/eventpic/WhatsApp Image 2025-06-26 at 22.04.01.jpeg',
    featured: false,
    status: 'upcoming',
    ageRange: '22-45',
    requirements: ['Sense of humor'],
    host: { name: 'Comedian Chris', avatar: '/eventpic/image.png', rating: 4.4 }
  },
  {
    id: '28',
    title: 'Tuesday Photography Walk',
    description: 'Capture the city with creative photographers.',
    date: getRelativeDate(26),
    time: '17:00',
    location: 'Brooklyn Bridge',
    category: 'workshop',
    price: 35,
    maxParticipants: 15,
    currentParticipants: 11,
    image: '/eventpic/WhatsApp Image 2025-06-26 at 22.04.02.jpeg',
    featured: false,
    status: 'upcoming',
    ageRange: '25-40',
    requirements: ['Camera or phone'],
    host: { name: 'Photo Pro Lisa', avatar: '/eventpic/image.png', rating: 4.8 }
  },
  {
    id: '29',
    title: 'Wednesday Meditation Circle',
    description: 'Find inner peace with mindful singles.',
    date: getRelativeDate(27),
    time: '18:30',
    location: 'Meditation Center',
    category: 'workshop',
    price: 25,
    maxParticipants: 20,
    currentParticipants: 16,
    image: '/eventpic/WhatsApp Image 2025-06-26 at 22.04.03 (1).jpeg',
    featured: false,
    status: 'upcoming',
    ageRange: '23-50',
    requirements: ['Open mind'],
    host: { name: 'Zen Master David', avatar: '/eventpic/image.png', rating: 4.9 }
  }
];

// Helper functions for filtering
export const getEventsByDate = (date: string): Event[] => {
  return eventsData.filter(event => event.date === date);
};

export const getEventsByCategory = (category: string): Event[] => {
  return eventsData.filter(event => event.category === category);
};

export const getEventsByDateRange = (startDate: string, endDate: string): Event[] => {
  return eventsData.filter(event => 
    event.date >= startDate && event.date <= endDate
  );
};

export const getFeaturedEvents = (): Event[] => {
  return eventsData.filter(event => event.featured);
};

export const getUpcomingEvents = (): Event[] => {
  return eventsData.filter(event => event.status === 'upcoming');
};

export const searchEvents = (query: string): Event[] => {
  const lowercaseQuery = query.toLowerCase();
  return eventsData.filter(event => 
    event.title.toLowerCase().includes(lowercaseQuery) ||
    event.description.toLowerCase().includes(lowercaseQuery) ||
    event.location.toLowerCase().includes(lowercaseQuery) ||
    event.category.toLowerCase().includes(lowercaseQuery)
  );
};

export const getEventCategories = (): string[] => {
  return [...new Set(eventsData.map(event => event.category))];
};

export const getEventById = (id: string): Event | undefined => {
  return eventsData.find(event => event.id === id);
};