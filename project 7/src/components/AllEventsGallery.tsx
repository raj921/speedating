import { useMemo, useEffect } from 'react';
import { ArrowLeft, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Types
type GalleryImage = {
  path: string;
  day: string;
  filename: string;
};

// Array of all day folders
const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;

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
    'WhatsApp Image 2025-06-26 at 22.03.03.jpeg'
  ],
  friday: [
    'WhatsApp Image 2025-06-26 at 22.03.22 (1).jpeg',
    'WhatsApp Image 2025-06-26 at 22.03.22 (2).jpeg',
    'WhatsApp Image 2025-06-26 at 22.03.22 (3).jpeg',
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

export default function AllEventsGallery() {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Generate all image paths
  const allImages = useMemo<GalleryImage[]>(() => {
    const images: GalleryImage[] = [];
    
    days.forEach(day => {
      const dayImages = DAY_IMAGES[day] || [];
      dayImages.forEach(filename => {
        images.push({
          path: `/eventpic/${day}/${filename}`,
          day,
          filename
        });
      });
    });
    
    return images;
  }, []);

  // Handle image loading errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, fallbackPath: string) => {
    const target = e.target as HTMLImageElement;
    if (target.src !== fallbackPath) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`Failed to load image: ${target.src}`);
      }
      target.src = fallbackPath;
    } else {
      target.style.display = 'none';
    }
  };

  // Handle successful image load
  const handleImageLoad = (path: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Successfully loaded: ${path}`);
    }
  };

  return (
    <div className="min-h-screen bg-brand-gradient-soft pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-purple-700 hover:text-purple-900 font-semibold transition-colors text-lg z-10"
            aria-label="Back to events"
          >
            <ArrowLeft className="h-6 w-6 mr-2" aria-hidden="true" />
            Back to Events
          </button>
          
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-purple-900 mb-2">All Events Gallery</h1>
            <p className="text-xl text-gray-600">{allImages.length} events</p>
          </div>
          
          <div className="w-24" aria-hidden="true" />
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allImages.map((image, index) => (
            <div
              key={`${image.day}-${index}`}
              className="group relative rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-102 cursor-pointer overflow-hidden bg-white min-h-[300px]"
            >
              <div className="relative w-full h-full flex items-center justify-center bg-gray-50 p-2">
                <img
                  src={image.path}
                  alt={`${image.day} event ${index + 1}`}
                  className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  onError={(e) => handleImageError(e, '/placeholder-event.jpg')}
                  onLoad={() => handleImageLoad(image.path)}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: 'auto',
                    height: 'auto',
                    display: 'block'
                  }}
                />
                
                <div className="absolute top-4 left-4 right-4">
                  <div 
                    className="flex items-center bg-black/70 backdrop-blur-md rounded-full px-4 py-2 shadow-lg w-max mx-auto"
                    aria-hidden="true"
                  >
                    <Heart className="h-4 w-4 mr-2 text-white" />
                    <span className="text-sm font-bold text-white">
                      {image.day.charAt(0).toUpperCase() + image.day.slice(1)} Event
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}