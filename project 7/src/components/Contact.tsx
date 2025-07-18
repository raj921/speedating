import contactImage from '../../asset/contact.png';

export default function Contact() {
  return (
    <section id="contact" className="relative py-12 sm:py-16 md:py-20 bg-brand-gradient-soft min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-indigo-100/20 to-purple-100/20"></div>
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Contact Us
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto">
            Get in touch with us - we'd love to hear from you
          </p>
        </div>

        {/* Enhanced Image Container */}
        <div className="relative group">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-indigo-400/20 to-purple-400/20 rounded-3xl blur-xl scale-105 group-hover:blur-2xl group-hover:scale-110 transition-all duration-700"></div>
          
          {/* Floating glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-3xl blur-2xl scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          
          {/* Main container with glassmorphism */}
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/50 group-hover:shadow-3xl transition-all duration-500">
            {/* Inner glow border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Image with enhanced effects */}
            <img
              src={contactImage}
              alt="Contact Us - Reach out to our team for support and inquiries"
              className="relative w-full h-auto rounded-2xl object-contain mx-auto transition-all duration-500 group-hover:scale-[1.02] group-hover:brightness-110"
              loading="lazy"
            />
            
            {/* Subtle overlay gradient */}
            <div className="absolute inset-4 sm:inset-6 rounded-2xl bg-gradient-to-t from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </div>
          
          {/* Corner accent elements */}
          <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full opacity-0 group-hover:opacity-70 transition-all duration-500 blur-sm"></div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-70 transition-all duration-500 blur-sm"></div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8 sm:mt-12">
          <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95">
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative">Get In Touch</span>
          </button>
        </div>
      </div>
    </section>
  );
}