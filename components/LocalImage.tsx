import React, { useState, useEffect } from 'react';

const LocalImage = ({ src, alt, className = "", aos, aosDelay }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  // Fallback images if yours don't load
  const fallback = "https://images.unsplash.com/photo-1503951914875-452162b7f30a?auto=format&fit=crop&w=800&q=80";

  useEffect(() => {
    // Check if user previously uploaded a custom image
    const saved = localStorage.getItem(`custom-image-${src}`);
    if (saved) setImgSrc(saved);
  }, [src]);

  return (
    <div 
      className={`relative overflow-hidden bg-gray-100 ${className}`}
      data-aos={aos} 
      data-aos-delay={aosDelay}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 text-vibes-gold">
          <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
          </svg>
        </div>
      )}
      <img 
        src={imgSrc || fallback} 
        alt={alt} 
        className={`w-full h-full object-cover transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setIsLoading(false)}
        onError={(e) => {
          e.currentTarget.src = fallback;
          setIsLoading(false);
        }}
      />
    </div>
  );
};

export default LocalImage;
